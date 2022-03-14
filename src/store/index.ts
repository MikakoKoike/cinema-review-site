import { Movie } from "@/types/movie";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movieList: Array<Movie>(),
  },
  actions: {
    async asyncGetMovieList(context) {
      const response = await axios.get<{ page: number; results: Array<Movie> }>(
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
            movie.vote_count
          )
        );
      }
    },
  },
  modules: {},
  getters: {
    getMovieList(state) {
      return state.movieList;
    },
  },
});
