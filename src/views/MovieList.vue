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
          <input type="radio" name="years" id="1900s" value="years" />
          <span><label for="1900s">1900年代</label></span>
          <input type="radio" name="years" id="2000s" value="years" />
          <span><label for="2000s">2000年代</label></span>
        </div>
        <div class="searchBygenre">
          <hr />
          <span>ジャンル：</span>
          <input type="checkbox" name="genre" value="action" id="action" />
          <span> <label for="action"> Action(アクション）</label> </span>
          <input
            type="checkbox"
            name="genre"
            value="adventure"
            id="adventure"
          />
          <span>
            <label for="adventure"> Adventure（アドベンチャー）</label>
          </span>
          <input
            type="checkbox"
            name="genre"
            value="animation"
            id="animation"
          />
          <span> <label for="animation"> Animation （アニメ） </label></span>
          <input type="checkbox" name="genre" value="comedy" id="comedy" />
          <span> <label for="comedy"> Comedy（コメディ）</label> </span>
          <input type="checkbox" name="genre" value="crime" id="crime" />
          <span> <label for="crime"> （暴力） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="documentary"
            id="documentary"
          />
          <span>
            <label for="documentary"
              >Documentary （ドキュメンタリ）
            </label></span
          >
          <input type="checkbox" name="genre" value="drama" id="drama" />
          <span> <label for="drama">Drama （ドラマ） </label></span>
          <input type="checkbox" name="genre" value="family" id="family" />
          <span> <label for="family">Family（家族） </label></span>
          <input type="checkbox" name="genre" value="fantasy" id="fantasy" />
          <span> <label for="fantasy">Fantasy （ファンタジー） </label></span>
          <input type="checkbox" name="genre" value="history" id="history" />
          <span> <label for="history">History （歴史） </label></span>
          <input type="checkbox" name="genre" value="horror" id="horror" />
          <span> <label for="horror">Horror （ホラー） </label></span>
          <input type="checkbox" name="genre" value="music" id="music" />
          <span> <label for="music">Music （ミュージカル） </label></span>
          <input type="checkbox" name="genre" value="mystery" id="mystery" />
          <span> <label for="mystery">Mystery （ミステリー） </label></span>
          <input type="checkbox" name="genre" value="romance" id="romance" />
          <span> <label for="romance">Romance （恋愛・ロマンス） </label></span>
          <input
            type="checkbox"
            name="genre"
            value="sciencefiction"
            id="sciencefiction"
          />
          <span>
            <label for="sciencefiction">Science Fiction （SF) </label></span
          >
          <input type="checkbox" name="genre" value="tvmovie" id="tvmovie" />
          <span> <label for="tvmovie">TV Movie （TV映画） </label></span>
          <input type="checkbox" name="genre" value="thriller" id="thriller" />
          <span> <label for="thriller">Thriller （スリラー） </label></span>
          <input type="checkbox" name="genre" value="war" id="war" />
          <span> <label for="war">War （戦争） </label></span>
          <input type="checkbox" name="genre" value="western" id="western" />
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
  // 検索オプション
  private searchOptions = "";
  // 公開状況
  private releaseStatus = "";

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
    // 公開中の映画を検索する
    if (this.releaseStatus === "released") {
      this.$store.getters.getSearchedReleasedMovieList;
    } else if (this.releaseStatus === "soonReleased") {
      console.log("called soonReleased");
    } else {
      return;
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
