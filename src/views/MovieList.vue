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
      <div class="searchByDetail">
        <br />
        <span>絞り込み機能 </span>
        <div class="searchByReleaseDate">
          <hr />
          <span>公開日：</span><br />
          <input
            type="radio"
            name="releaseDate"
            id="releasedDate"
            value="released"
            v-model="releaseStatus"
          />
          <span><label for="releasedDate">公開中</label></span>
          <input
            type="radio"
            name="releaseDate"
            id="soonReleased"
            value="soonReleased"
            v-model="releaseStatus"
          />
          <span><label for="soonReleased">近日公開</label></span>
        </div>
        <div class="searchByYears">
          <hr />
          <span>年代：</span><br />
          <input
            type="radio"
            name="years"
            id="2000s"
            value="2000s"
            v-model="releasedYear"
          />
          <span><label for="2000s">2000年～2010年</label></span>
          <input
            type="radio"
            name="years"
            id="2010s"
            value="2010s"
            v-model="releasedYear"
          />
          <span><label for="2010s">2010年以降</label></span>
        </div>
        <div class="searchBygenre">
          <hr />
          <span>ジャンル：</span>
          <input
            type="checkbox"
            name="genre"
            value="28"
            id="action"
            v-model="genres"
          />
          <span> <label for="action"> Action(アクション）</label> </span>
          <input
            type="checkbox"
            name="genre"
            value="12"
            id="adventure"
            v-model="genres"
          />
          <span>
            <label for="adventure"> Adventure（アドベンチャー）</label>
          </span>
          <input
            type="checkbox"
            name="genre"
            value="16"
            id="animation"
            v-model="genres"
          />
          <span> <label for="animation"> Animation （アニメ） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="35"
            id="comedy"
            v-model="genres"
          />
          <span> <label for="comedy"> Comedy（コメディ）</label> </span>
          <input
            type="checkbox"
            name="genre"
            value="80"
            id="crime"
            v-model="genres"
          />
          <span> <label for="crime"> （暴力） </label></span>
          <input type="checkbox" name="genre" value="99" id="documentary" />
          <span>
            <label for="documentary"
              >Documentary （ドキュメンタリ）
            </label></span
          >
          <input
            type="checkbox"
            name="genre"
            value="18"
            id="drama"
            v-model="genres"
          />
          <span> <label for="drama">Drama （ドラマ） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="10751"
            id="family"
            v-model="genres"
          />
          <span> <label for="family">Family（家族） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="14"
            id="fantasy"
            v-model="genres"
          />
          <span> <label for="fantasy">Fantasy （ファンタジー） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="36"
            id="history"
            v-model="genres"
          />
          <span> <label for="history">History （歴史） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="27"
            id="horror"
            v-model="genres"
          />
          <span> <label for="horror">Horror （ホラー） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="10402"
            id="music"
            v-model="genres"
          />
          <span> <label for="music">Music （ミュージカル） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="9648"
            id="mystery"
            v-model="genres"
          />
          <span> <label for="mystery">Mystery （ミステリー） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="10479"
            id="romance"
            v-model="genres"
          />
          <span> <label for="romance">Romance （恋愛・ロマンス） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="878"
            id="sciencefiction"
            v-model="genres"
          />
          <span>
            <label for="sciencefiction">Science Fiction （SF) </label></span
          >
          <input
            type="checkbox"
            name="genre"
            value="10770"
            id="tvmovie"
            v-model="genres"
          />
          <span> <label for="tvmovie">TV Movie （TV映画） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="53"
            id="thriller"
            v-model="genres"
          />
          <span> <label for="thriller">Thriller （スリラー） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="10752"
            id="war"
            v-model="genres"
          />
          <span> <label for="war">War （戦争） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="37"
            id="western"
            v-model="genres"
          />
          <span> <label for="western">Western （ウェスターン） </label></span>
        </div>
        <hr />
      </div>
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
                <p>公開日：{{ movie.formatDate }}</p>
                <p>{{ movie.overview }}</p>
                <p>{{ movie.genre_ids }}</p>
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
  // 検索オプション
  private searchOptions = "";
  // 公開状況
  private releaseStatus = "";
  // 公開年
  private releasedYear = "";
  // ジャンル
  private genres = [];
  // エラーメッセージ
  private errorMsg = "映画が見つかりませんでした";

  /**
   * movieListを表示する.
   */
  async created(): Promise<void> {
    // let newArray = new Array<Movie>();
    // for (let i = 1; i < 10; i++) {
    //   const responce = await axios.get(
    //     `https://api.themoviedb.org/3/discover/movie?api_key=b5408f6aa5f27ebad281342354c0e1f9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&with_original_language=en&with_watch_monetization_types=flatrate`
    //   );
    // }

    await this.$store.dispatch("asyncGetMovieList");
    this.currentMovieList = this.$store.getters.getApiMovieList;
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
   * 検索機能
   */
  searchMovie(): void {
    this.currentMovieList = this.$store.getters.getApiMovieList;
    if (this.searchWay === "movie") {
      // 入力された文字列で絞り込みを行う
      this.currentMovieList = this.$store.getters.getSearchedMovieList(
        this.searchMovieString
      );
      // // 公開日でのフィルター
      // if (this.releaseStatus !== "") {
      //   if (this.releaseStatus === "released") {
      //     this.currentMovieList =
      //       this.$store.getters.getSearchedReleasedMovieList;
      //   } else if (this.releaseStatus === "soonReleased") {
      //     this.currentMovieList =
      //       this.$store.getters.getSearchedSoonReleasedMovieList;
      //   } else {
      //     console.log("中止");
      //     return;
      //   }
      // }
      // // 年代でのフィルター
      // if (this.releasedYear !== "") {
      //   if (this.releasedYear === "2000s") {
      //     this.currentMovieList = this.$store.getters.get2000sMovieList;
      //   } else if (this.releasedYear === "2010s") {
      //     this.currentMovieList = this.$store.getters.get2010sMovieList;
      //   }
      // }
      // ジャンルでのフィルター
      if (this.genres.length !== 0) {
        let idArray = (idArray: Array<number>, movieList: Array<ApiMovie>) => {
          const movielistSortByGenreId = new Array<Array<ApiMovie>>();
          const resultOfFilteredMovie = new Array<ApiMovie>();

          // ジャンルIDのチェック
          movielistSortByGenreId.push(
            movieList.filter((movie) => {
              let countTrue = 0;
              for (const genreId of movie.genre_ids) {
                for (const id of idArray) {
                  if (genreId === Number(id)) {
                    countTrue++;
                  }
                }
              }
              if (countTrue === this.genres.length) {
                return true;
              } else {
                return false;
              }
            })
          ); // end of sort
          for (const movieList of movielistSortByGenreId) {
            for (const movie of movieList) {
              resultOfFilteredMovie.push(movie);
            }
          }
          return resultOfFilteredMovie;
        }; // end of function
        this.currentMovieList = idArray(this.genres, this.currentMovieList);
      } // end of if
    } else if (this.searchWay === "keyword") {
      this.currentMovieList = this.$store.getters.getSearchedMovieListByKeyWord(
        this.searchMovieString
      );
      // 公開日でのフィルター
      if (this.releaseStatus !== "") {
        if (this.releaseStatus === "released") {
          this.currentMovieList =
            this.$store.getters.getSearchedReleasedMovieList;
        } else if (this.releaseStatus === "soonReleased") {
          this.currentMovieList =
            this.$store.getters.getSearchedSoonReleasedMovieList;
        } else {
          console.log("中止");
          return;
        }
      }
      // 年代でのフィルター
      if (this.releasedYear !== "") {
        if (this.releasedYear === "2000s") {
          this.currentMovieList = this.$store.getters.get2000sMovieList;
        } else if (this.releasedYear === "2010s") {
          this.currentMovieList = this.$store.getters.get2010sMovieList;
        }
      }
    }
  }
}
</script>

<style scoped>
.searchByDetail {
  width: 500px;
  margin: 10px auto;
}

.searchOptions {
  width: 300px;
}
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
