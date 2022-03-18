import createPersistedState from "vuex-persistedstate";
import { ApiMovie } from "@/types/api/apiMovie";
import { Review } from "@/types/review";
import { TimeList } from "@/types/timeList";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import { Movie } from "@/types/movie";
import { Comment } from "@/types/comment";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieList: Array<Movie>(),
    currentMovieId: 0,
    count: 0,
    watchCount: 0,
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

    setCurrentMovieId(state, payload) {
      state.currentMovieId = payload.currentMovieId;
    },
    // countUp(state) {
    //   state.count++;
    // },
    setCountWatch(state, payload) {
      const newArray = [];
      for (const movie of state.movieList) {
        if (movie.id === payload.movieId) {
          newArray.push(movie);
        }
      }
      // console.log(newArray[0].countWatch);
      newArray[0].countWatch++;
      console.log(newArray[0].countWatch);
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
      console.log(currentMovie.reviewList);
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
        // console.log(sameGenreGroup);
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
      return state.count;
    },
    /**
     * detailに表示されている映画情報の取得
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
