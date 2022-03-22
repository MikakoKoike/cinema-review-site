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
    movieList: Array<Movie>(),
    currentMovieId: 0,
    count: 0,
    watchCount: 0,
    userList: new Array<User>(),
    currentUser: new User(
      0,
      "Alphabet",
      "",
      "",
      new Array<Movie>(),
      new Array<Review>(),
      new Array<Comment>(),
      "このアプリを使い始めて3ヶ月目に突入!"
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
    /**
     * レビューリストをAPIから取得.
     * @param context - コンテクスト
     */
    async asyncGetReviewList(context) {
      const response = await axios.get<{
        reviewList: Array<Review>;
      }>("https://demo7166221.mockable.io/reviewList");
      const payload = response.data;
      context.commit("addReviewList", payload);
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
            new Array<Comment>(),
            ""
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
      const currentMovie = state.movieList.filter(
        (movie) => movie.id === payload.movieId
      )[0];

      const currentReview = currentMovie.reviewList;
      let countLike = currentMovie.countLike;

      countLike = payload.countLike;
    },
    /**
     * ログインしているユーザーの映画リストに保存するメソッド.
     * @param state
     * @param payload
     */
    saveToMovieList(state, payload) {
      state.currentUser.myMovieList.unshift(payload.movie);
    },
    /**
     * * ログインしているユーザーのレビューリストに保存するメソッド.
     * @param state
     * @param payload
     */
    saveToReviewList(state, payload) {
      state.currentUser.myReviewList.unshift(payload.review);
    },
    /**
     * * ログインしているユーザーのレビューリストから削除するメソッド.
     * @param state - ステイト
     * @param payload - 削除するmovieのindex番号
     */
    deleteMovieFromReviewList(state, payload) {
      state.currentUser.myMovieList.splice(payload.index, 1);
    },
    /**
     * APIからレビューリストを追加する.
     *
     */
    addReviewList(state, payload) {
      for (const movie of state.movieList) {
        for (const review of payload.reviewList as Array<Review>) {
          if (Number(review.movieId) === movie.id) {
            movie.reviewList.push(review);
          }
        }
      }
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
    getCount(state) {
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
    /**
     * 映画を名前で部分一致検索をする.
     *
     * @param state ステート
     * @return 部分一致検索で検索された映画一覧情報
     */
    getSearchedMovieList(state) {
      return (title: string) => {
        return state.movieList.filter(
          (movie) =>
            movie.title.includes(title.toUpperCase()) ||
            movie.title.includes(title)
        );
      };
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
