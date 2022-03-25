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
import {
  getYear,
  format,
  getDay,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from "date-fns";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieList: Array<Movie>(),
    apiMovieList: Array<ApiMovie>(),
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
        // "https://api.themoviedb.org/3/discover/movie?api_key=b5408f6aa5f27ebad281342354c0e1f9&language=ja-JP&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_original_language=en&with_watch_monetization_types=flatrate"
        "https://api.themoviedb.org/3/discover/movie?api_key=b5408f6aa5f27ebad281342354c0e1f9&language=ja-JP"
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
      state.apiMovieList = new Array<ApiMovie>();
      for (const movie of payload.results) {
        state.apiMovieList.push(
          new ApiMovie(
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
            movie.vote_count
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
          movie.countWatch = payload.countWatch;
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
    setComment(state, payload) {
      for (const movie of state.movieList) {
        if (movie.id == payload.movieId) {
          for (const review of movie.reviewList) {
            console.log(review);
            if (review.id == payload.reviewId) {
              review.replyCommentList.unshift(payload.comment);
            }
          }
        }
      }
    },

    /**
     * いいね数の追加
     * @param state
     * @param payload
     */
    addLike(state, payload) {
      for (const movie of state.movieList) {
        for (const review of movie.reviewList)
          if (review.id === payload.reviewId) {
            review.countLike = payload.countLike;
          }
      }
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
      state.reviewList = [...payload.reviewList];
    },
    /**
     * apiMovieではなく、Movieリストを作る.
     */
    setMovieList(state, payload) {
      state.movieList.push(payload.movie);
    },
  }, //end of mutations

  modules: {},
  getters: {
    getApiMovieList(state) {
      return state.apiMovieList;
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
        for (const movie of state.apiMovieList) {
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
    getCountWatch(state) {
      return state.movieList[0].countWatch;
      // return (movieId: number) => {
      //     let targetCount = 0;
      //     for (const movie of state.movieList) {
      //       if (movie.id === movieId) {
      //         targetCount = movie.countWatch
      //       }
      //     }
      //     return targetCount;
      // };
    },
    /**
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
    getReviewListByMovieId(state) {
      return (movieId: number) => {
        const newArray = [];
        for (const movie of state.movieList) {
          if (movie.id === movieId) {
            newArray.push(movie);
          }
        }
        return newArray.length !== 0
          ? newArray[0].reviewList
          : new Array<Review>();
      };
    },
    getCountLikeByMovieId(state) {
      return (movieId: number) => {
        const newArray = [];
        for (const movie of state.movieList) {
          if (movie.id === movieId) {
            newArray.push(movie);
          }
        }
        return newArray.length !== 0 ? newArray[0].countLike : 0;
      };
    },
    getCountWatchByMovieId(state) {
      return (movieId: number) => {
        const newArray = [];
        for (const movie of state.movieList) {
          if (movie.id === movieId) {
            newArray.push(movie);
          }
        }
        return newArray.length !== 0 ? newArray[0].countWatch : 0;
      };
    },
    /**
     * 映画を名前で部分一致検索をする.
     *
     * @param state ステート
     * @return 部分一致検索で検索された映画一覧情報
     */
    getSearchedMovieList(state) {
      return (title: string) => {
        return state.apiMovieList.filter((movie) =>
          // 大文字に変換したmovieListの映画タイトルから、大文字に変換した検索文字列を含んだものを返す。
          movie.title.toUpperCase().includes(title.toUpperCase())
        );
      };
    },

    /**
     * 概要欄の中から、該当する値を検索する.
     * @param state
     * @returns 部分一致検索で検索された映画一覧情報
     */
    getSearchedMovieListByKeyWord(state) {
      return (keyword: string) => {
        return state.apiMovieList.filter((movie) =>
          movie.overview.toUpperCase().includes(keyword.toUpperCase())
        );
      };
    },

    /**
     * 公開中の映画タイトルを検索する
     * @param state
     * @returns
     */
    getSearchedReleasedMovieList(state) {
      // 現在の日付
      const nowDate = new Date();
      // 公開日
      let releaseDate = new Date();
      // 公開中の映画
      const releasedMovies = new Array<ApiMovie>();
      for (const apiMovie of state.apiMovieList) {
        // 公開日を表示映画ぶん取得する
        releaseDate = new Date(apiMovie.release_date);
        getYear(releaseDate);
        // 公開中の映画を絞り込む
        const releasedMovieYears = getYear(releaseDate) - getYear(nowDate);

        const releasedMovieMonth = differenceInCalendarMonths(
          nowDate,
          releaseDate
        );

        // フィルターをする
        if (
          // 公開中の映画（現時点から3カ月以内の公開日の映画）
          releasedMovieYears === 0 &&
          releasedMovieMonth >= 0 &&
          releasedMovieMonth <= 3
        ) {
          releasedMovies.push(apiMovie);
        }
      }
      return releasedMovies;
    },
    /**
     * 公開予定の映画タイトルを検索する
     * @param state
     * @returns
     */
    getSearchedSoonReleasedMovieList(state) {
      // 現在の日付
      const nowDate = new Date();
      // 公開日
      let releaseDate = new Date();
      // 公開中の映画
      const releasedMovies = new Array<ApiMovie>();
      for (const apiMovie of state.apiMovieList) {
        // 公開日を表示映画ぶん取得する
        releaseDate = new Date(apiMovie.release_date);
        getYear(releaseDate);
        // 公開中の映画を絞り込む
        const releasedMovieYears = getYear(releaseDate) - getYear(nowDate);

        const releasedMovieMonth = differenceInCalendarMonths(
          nowDate,
          releaseDate
        );

        // フィルターをする
        if (
          // 公開予定の映画
          releasedMovieYears >= 0 &&
          releasedMovieMonth >= 0 &&
          releaseDate > nowDate
        ) {
          releasedMovies.push(apiMovie);
        }
      }
      return releasedMovies;
    },

    /**
     * movieIdとReviewIdから該当するレビュー記事のいいねの数を取得する
     */
    getCurrentMovieFromMovieList(state) {
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
    getMovieList(state){
      return state.movieList;
    },
    getReviewList(state){
      return state.reviewList
    }
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
