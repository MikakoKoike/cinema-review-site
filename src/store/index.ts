import createPersistedState from "vuex-persistedstate";
import { ApiMovie } from "@/types/api/apiMovie";
import { Review } from "@/types/review";
import { TimeList } from "@/types/timeList";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { Movie } from "@/types/movie";
import { Comment } from "@/types/comment";
import { User } from "@/types/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieList: Array<Movie>(), //詳細画面
    apimovieList: Array<ApiMovie>(), //一覧画面
    currentMovieId: 0,
    countWatch: 0,
    userList: new Array<User>(),
    currentUser: new User(
      0,
      "",
      "",
      "",
      new Array<Movie>(),
      new Array<Review>(),
      new Array<Comment>()
    ),
    reviewList: Array<Review>(),
  }, //end of state
  actions: {
    async asyncGetMovieList(context) {
      const response = await axios.get<{
        page: number;
        results: Array<ApiMovie>;
      }>(
        "https://api.themoviedb.org/3/discover/movie?api_key=b5408f6aa5f27ebad281342354c0e1f9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=en&with_watch_monetization_types=flatrate"
      );
      const payload = response.data;
      context.commit("showItemList", payload);
    },
    async asyncGetUserList(context) {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      const payload = response.data;
      context.commit("setUserList", payload);
    },
  },
  mutations: {
    showItemList(state, payload) {
      state.movieList = new Array<Movie>();
      for (const movie of payload.results) {
        state.movieList.push(
          new Movie(
            movie.adult,
            movie.backdrop_path,
            movie.genre_ids,
            movie.id,
            movie.original_language,
            movie.original_title,
            movie.overview,
            movie.popularity,
            movie.poster_path,
            movie.release_date,
            movie.title,
            movie.video,
            movie.vote_average,
            movie.vote_count,
            [""],
            new Array<TimeList>(),
            new Array<Review>(),
            0,
            0
          )
        );
      }
    },
    /**
     * 登録されたユーザーを情報をセットする.
     * @param state - ステイト
     * @param payload 非同期で取得するJSONデータ
     */
    setUserList(state, payload) {
      state.userList = new Array<User>();
      for (const user of payload) {
        state.userList.push(
          new User(
            user.id,
            user.username,
            user.email,
            "",
            new Array<Movie>(),
            new Array<Review>(),
            new Array<Comment>()
          )
        );
      }
    },
    /**
     * ログイン時にユーザー情報をstateにセットする.
     * @param state - ステイト
     * @param payload - ユーザー情報
     */
    setCurrentUser(state, payload) {
      state.currentUser = payload.user;
    },

    setCurrentMovieId(state, payload) {
      state.currentMovieId = payload.currentMovieId;
    },
    // countUp(state) {
    //   state.count++;
    // },
    /**
     * 見たいボタンの設定.
     */
    setCountWatch(state, payload) {
      for (const movie of state.movieList) {
        if (movie.id === payload.movieId) {
          console.log(movie);

          movie.countWatch = payload.countWatch;
          console.log(movie.countWatch);
        }
      }
    },
    /**
     * レビューの追加
     * @param state ‐state
     * @param payload -payload
     */
    addReview(state, payload) {
      const currentMovie = state.movieList.filter(
        (movie) => movie.id === payload.movieId
      )[0];
      const newReview = {
        review: new Review(
          payload.review.id,
          payload.review.userId,
          payload.review.movieId,
          payload.review.countLike,
          payload.review.postDate,
          payload.review.content,
          [],
          payload.review.countStar
        ),
      };
      currentMovie.reviewList.unshift(newReview.review);
    },

    /**
     * コメントの追加
     * @param state
     * @param payload
     */
    addComment(state, payload) {
      const newReview = state.reviewList.filter(
        (review) => review.id === payload.reviewId
      );

      const newComment = {
        comment: new Comment(
          payload.review.id,
          payload.review.userId,
          payload.review.reviewId,
          payload.review.postDate,
          payload.review.content
        ),
      };
      for (const review of newReview) {
        const replyCommentList = review.replyCommentList;
        replyCommentList.unshift(newComment.comment);
      }
    },

    /**
     * いいね数の追加
     * @param state
     * @param payload
     */
    addLike(state, payload) {
      const currentReview = state.reviewList.filter(
        (movie) => movie.id === payload.movieId
      )[0];
      const newComment = {
        comment: new Comment(
          payload.review.id,
          payload.review.userId,
          payload.review.reviewId,
          payload.review.postDate,
          payload.review.content
        ),
      };
      currentReview.replyCommentList.unshift(newComment.comment);
    },
    /**
     * ログインしているユーザーの映画リストに保存するメソッド.
     * @param state
     * @param payload
     */
    saveToMovieList(state, payload) {
      state.currentUser.myMovieList.unshift(payload.movie);
    },
  }, //end of mutations

  modules: {},
  getters: {
    getMovieList(state) {
      return state.movieList;
    },
    //渡されたジャンルIDと同じIDを返す
    getGenreById(state) {
      return (genre_ids: Array<number>) => {
        const sameGenreGroup = [];
        for (const id of genre_ids) {
          sameGenreGroup.push(
            state.movieList.filter((movie) => movie.genre_ids[0] === id)
          );
        }
        return sameGenreGroup;
      };
    },
    /**
     * 現在表示している映画のIDを取得して返す.
     * @param state
     * @returns movieID
     */
    getCurrentMovieId(state) {
      return state.currentMovieId;
    },
    /**
     * 見たいボタンを押した数を取得.
     * @param state
     * @returns 見たい数
     */
    getCount() {
      return (movie: Movie) => {
        return movie.countWatch;
      };
    },
    /**
     * detailに表示されている映画情報の取得.
     * @param state
     * @returns movieId
     */
    getcurrentMovie(state) {
      return (movieId: number) => {
        const newArray = [];
        for (const movie of state.movieList) {
          if (movie.id === movieId) {
            newArray.push(movie);
          }
        }
        return newArray[0];
      };
    },

    getStarCount(state) {
      return (reviewId: number) => {
        return (movieId: number) => {
          const newArray = [];
          for (const movie of state.movieList) {
            if (movie.id === movieId) {
              for (const review of movie.reviewList) {
                if (review.id === reviewId) {
                  newArray.push(review);
                }
              }
            }
          }
          return newArray[0];
        };
      };
    },
    /**
     * 登録されたユーザーを取得する.
     * @param state - ステイト
     * @returns 登録されたユーザーの配列
     */
    getUserList(state) {
      return state.userList;
    },
    /**
     * 登録されたユーザーを取得する.
     * @param state - ステイト
     * @returns 登録されたユーザーの配列
     */
    getCurrentUser(state) {
      return state.currentUser;
    },
  }, //end of getters

  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vuex",
      // 管理対象のステートを指定
      paths: ["count"],
      // ストレージの種類を指定
      storage: window.sessionStorage,
    }),
  ],
});
