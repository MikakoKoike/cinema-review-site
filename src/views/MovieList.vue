<template>
  <div class="movie-list">
    <form method="post" class="search-form">
      <input
        id="searchItem"
        class="search-name-input"
        v-model="searchMovieString"
        autocomplete="on"
        list="currentMovieList"
        onfocus="this.select();"
      />
      <datalist id="currentMovieList">
        <div v-for="movie of currentMovieList" :key="movie.title">
          <option :value="movie.title"></option>
        </div>
      </datalist>

      <label for="searchMovie">
        <button class="btn search-btn" type="button" v-on:click="searchMovie">
          <span>検&nbsp;&nbsp;索</span>
        </button></label
      >
      <span>
        <label>
          <input
            name="searchWay"
            type="radio"
            value="movie"
            v-model="searchWay"
            checked
          />
          <span>映画</span>
        </label>
        <label>
          <input
            name="searchWay"
            type="radio"
            value="keyword"
            v-model="searchWay"
          />
          <span>キーワード</span>
        </label>
      </span>
    </form>
    <div class="container">
      <div class="row">
        <div
          class="col s12 m6"
          v-for="movie of currentMovieList"
          v-bind:key="movie.id"
        >
          <div class="movie-card z-depth-3">
            <div class="row">
              <div class="col s4 thumbnail-area">
                <router-link v-bind:to="'/movieDetail/' + movie.id">
                  <img
                    class="responsive-img movie-img"
                    v-bind:src="
                      'https://image.tmdb.org/t/p/w92' + movie.poster_path
                    "
                    alt=""
                  />
                </router-link>
                <p
                  class="btn-small indigo lighten-1"
                  v-on:click="saveMovie(movie.id)"
                >
                  保存
                </p>
              </div>
              <div class="col s7">
                <h5>{{ movie.title }}</h5>
                <p>{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ApiMovie } from "@/types/api/apiMovie";
@Component
export default class MovieList extends Vue {
  private currentMovieList = Array<ApiMovie>();
  // 検索バー
  private searchMovieString = "Let's find your favourite movie!";
  // 検索方法
  private searchWay = "";
  async created(): Promise<void> {
    // let newArray = new Array<Movie>();
    // for (let i = 1; i < 10; i++) {
    //   const responce = await axios.get(
    //     `https://api.themoviedb.org/3/discover/movie?api_key=b5408f6aa5f27ebad281342354c0e1f9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&with_original_language=en&with_watch_monetization_types=flatrate`
    //   );
    // }

    await this.$store.dispatch("asyncGetMovieList");
    this.currentMovieList = this.$store.getters.getMovieList;
  }
  /**
   * ユーザーのmyMovieリストに保存するメソッド.
   * @param - 映画のid
   */
  saveMovie(movieId: number): void {
    let targetMovie = this.$store.getters.getcurrentMovie(movieId);
    this.$store.commit("saveToMovieList", {
      movie: targetMovie,
    });
    alert("ムービーリストに保存されました！");
  }

  /**
   * 検索バーに入力された値からの絞り込み
   */
  searchMovie(): void {
    if (this.searchWay === "movie") {
      // 入力された文字列で絞り込みを行う
      this.currentMovieList = this.$store.getters.getSearchedMovieList(
        this.searchMovieString
      );
    } else if (this.searchWay === "keyword") {
      this.currentMovieList = this.$store.getters.getSearchedMovieListByKeyWord(
        this.searchMovieString
      );
    }
  }
}
</script>

<style scoped>
.searchMovies {
  padding: 10px;
}
.search-form {
  text-align: center;
}

.search-name-input {
  width: 500px;
  color: gray;
}

.search-name-input:hover {
  color: black;
}
.movie-card {
  background-color: white;
  width: 100%;
  height: 500px;
  border-radius: 10px;
  margin: 10px;
}
.movie-img {
  margin-top: 10px;
}
.thumbnail-area {
  text-align: center;
}
</style>
