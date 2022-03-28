<template>
  <div class="movie-list">
    <!-- カルーセル -->
    <div>
      <div class="carousel">
        <a class="carousel-item" href="#one!"><img src="/img/movie.jpg" /></a>
        <a class="carousel-item" href="#two!"><img src="/img/shire.jpg" /></a>
        <a class="carousel-item" href="#three!"
          ><img src="/img/hollywoodSign.jpg"
        /></a>
        <a class="carousel-item" href="#six!"
          ><img src="/img/lalaland.jpg"
        /></a>
        <a class="carousel-item" href="#four!"><img src="/img/thater.jpg" /></a>
        <a class="carousel-item" href="#five!"
          ><img src="/img/titanic.jpg"
        /></a>
      </div>

      <div class="row">
        <!-- <p>上映作品</p> -->
        <div class="subTitle neon">NO<span>W S</span>HOW<span>IN</span>G</div>
        <!-- 検索機能 -->
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

          <label for="searchMovie">
            <div v-on:click="searchMovie">
              <h1 class="neonText">検&nbsp;&nbsp;索</h1>
            </div>
          </label>
          <div class="searchTitle">
            <div v-on:click="showSearch">
              <h1 class="neonText">絞り込み</h1>
            </div>
          </div>

          <div class="searchByDetail" v-if="this.showFlag">
            <span @click="resetAll"> <h1 class="neonText">リセット</h1></span>
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
              <span>
                <label for="animation"> Animation （アニメ） </label></span
              >
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
              <span>
                <label for="fantasy">Fantasy （ファンタジー） </label></span
              >
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
              <span>
                <label for="romance">Romance （恋愛・ロマンス） </label></span
              >
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
              <span>
                <label for="western">Western （ウェスターン） </label></span
              >
            </div>
            <hr />
          </div>
        </form>
        <div v-for="movie of currentMovieList" v-bind:key="movie.id">
          <div class="col s12 m3">
            <div class="card">
              <div class="card-image">
                <router-link v-bind:to="'/movieDetail/' + movie.id">
                  <img
                    class="poster"
                    v-bind:src="
                      'https://image.tmdb.org/t/p/w500' + movie.poster_path
                    "
                    alt=""
                  />
                </router-link>
                <span class="card-title"></span>
              </div>
              <div class="card-content">
                <h5>{{ movie.title }}</h5>
                <div class="genreIds">
                  <p
                    id="detail"
                    class="detail action"
                    v-if="movie.genre_ids.includes(28)"
                  >
                    アクション
                  </p>
                  <p
                    id="detail"
                    class="detail adventure"
                    v-if="movie.genre_ids.includes(12)"
                  >
                    アドベンチャー
                  </p>
                  <p
                    id="detail"
                    class="detail animation"
                    v-if="movie.genre_ids.includes(16)"
                  >
                    アニメーション
                  </p>
                  <p
                    id="detail"
                    class="detail comedy"
                    v-if="movie.genre_ids.includes(35)"
                  >
                    コメディ
                  </p>
                  <p
                    id="detail"
                    class="detail crime"
                    v-if="movie.genre_ids.includes(80)"
                  >
                    暴力
                  </p>
                  <p
                    id="detail"
                    class="detail documentary"
                    v-if="movie.genre_ids.includes(99)"
                  >
                    ドキュメンタリー
                  </p>
                  <p
                    id="detail"
                    class="detail drama"
                    v-if="movie.genre_ids.includes(18)"
                  >
                    ドラマ
                  </p>
                  <p
                    id="detail"
                    class="detail family"
                    v-if="movie.genre_ids.includes(10751)"
                  >
                    家族
                  </p>
                  <p
                    id="detail"
                    class="detail fantasy"
                    v-if="movie.genre_ids.includes(14)"
                  >
                    ファンタジー
                  </p>
                  <p
                    id="detail"
                    class="detail history"
                    v-if="movie.genre_ids.includes(36)"
                  >
                    歴史
                  </p>
                  <p
                    id="detail"
                    class="detail horror"
                    v-if="movie.genre_ids.includes(27)"
                  >
                    ホラー
                  </p>
                  <p
                    id="detail"
                    class="detail music"
                    v-if="movie.genre_ids.includes(10402)"
                  >
                    音楽
                  </p>
                  <p
                    id="detail"
                    class="detail mystery"
                    v-if="movie.genre_ids.includes(9648)"
                  >
                    ミステリー
                  </p>
                  <p
                    id="detail"
                    class="detail romance"
                    v-if="movie.genre_ids.includes(10749)"
                  >
                    恋愛
                  </p>
                  <p
                    id="detail"
                    class="detail SF"
                    v-if="movie.genre_ids.includes(878)"
                  >
                    SF
                  </p>
                  <p
                    id="detail"
                    class="detail TV"
                    v-if="movie.genre_ids.includes(10770)"
                  >
                    TV映画
                  </p>
                  <p
                    id="detail"
                    class="detail thriller"
                    v-if="movie.genre_ids.includes(53)"
                  >
                    スリラー
                  </p>
                  <p
                    id="detail"
                    class="detail war"
                    v-if="movie.genre_ids.includes(10752)"
                  >
                    戦争
                  </p>
                  <p
                    id="detail"
                    class="detail western"
                    v-if="movie.genre_ids.includes(37)"
                  >
                    ウェスターン
                  </p>
                </div>
              </div>
              <div class="card-action">
                <p
                  class="btn indigo lighten-1"
                  v-on:click="saveMovie(movie.id)"
                >
                  Save
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="errorMsg" v-if="currentMovieList.length === 0">
      該当する映画が見つかりませんでした。
      <br />
      <br />
      <br />

      <img src="img\cryneko.jpg" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  </div>
</template>

<script lang="ts">
import { ApiMovie } from "@/types/api/apiMovie";
import { Component, Vue } from "vue-property-decorator";
import "normalize.css";
import M from "materialize-css";
// import M from "materialize-css/dist/js/materialize.min";
@Component
export default class XXXComponent extends Vue {
  private currentMovieList = Array<ApiMovie>();
  // 検索バー
  private searchMovieString = "Let's find your favorite movie!";
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
  // メニューバーの表示
  private showFlag = false;

  mounted(): void {
    //cdnのインストールが必要。mountedだとタイミングが合わないので、時間をずらした。
    setTimeout(() => {
      M.AutoInit();
    }, 200);
  }
  /**
   * movieListを表示する.
   */
  async created(): Promise<void> {
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
      }
    }
  }
  /**
   * 入力値のリセット
   */
  resetAll(): void {
    this.searchMovieString = "";
    // 公開状況
    this.releaseStatus = "";
    // 公開年
    this.releasedYear = "";
    // ジャンル
    this.genres = [];
  }

  showSearch(): void {
    if (this.showFlag == true) {
      this.showFlag = false;
    } else {
      this.showFlag = true;
    }
  }
}
</script>

<style scoped>
.errorMsg {
  color: white;
}

/* ジャンルのアイコン */
.detail.western {
  background-color: #d99d68;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.war {
  background-color: #992529;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.thriller {
  background-color: #9d68d9;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.TV {
  background-color: #a4d968;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.SF {
  background-color: #adc5d9;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.romance {
  background-color: #e62f8b;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.mystery {
  background-color: #000ea3;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.music {
  background-color: #00a497;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.horror {
  background-color: #47266e;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.history {
  background-color: #d48244;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.fantasy {
  background-color: #f0cefd;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}

.detail.family {
  background-color: #d44495;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.drama {
  background-color: #95d444;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.documentary {
  background-color: #52b4ff;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.crime {
  background-color: #e8383d;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.comedy {
  background-color: #e8df35;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.animation {
  background-color: #35e8bb;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}
.detail.action {
  background-color: #e73562;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}

.detail.adventure {
  background-color: #e8bb35;
  color: white;
  text-shadow: none;
  border-radius: 15%;
}

/* アイコン並び替え */
#detail {
  width: auto;
  font-size: 14px;
  /* 横並びにする */
  float: left;
  margin: 0px 1px;
}

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
  color: white;
}

.search-name-input:hover {
  color: black;
}
.row {
  margin: 0;
}
.card-action p {
  size: 20px;
  vertical-align: center;
}
/* h3 {
  font-size: 20px;
  text-shadow: 0 0 20px #00afec, 0 0 5px #00afec;
} */

.card-content {
  font-size: 18px;
  height: 200px;
  padding: 10px;
}
.card-action {
  height: 100%;
  display: center;
  align-items: center;
}
.movie-list {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.822);
}
/**タイトル */
.movie-list h5 {
  font-size: 17px;
}
.movie-list p {
  font-size: 20px;
  margin-top: 0px;
  text-shadow: 0 0 20px #00afec, 0 0 5px #00afec;
  font-family: "Lucida Sans", Geneva, Verdana, sans-serif;
}
.poster:hover {
  box-shadow: 5px -8px 20px #fff;
}
/* *NOW SHOWINGの文字
 */
.subTitle {
  text-shadow: 0 0 20px #00afec, 0 0 5px #00afec;
  margin: 0;
  padding: 0;
}
.poster {
  width: 200px;
  height: 500px;
  /* padding-top: 20px; */
}

/**文字を点滅させる */
.neon {
  display: inline-block;
  color: #fff;
  letter-spacing: 0.05em;

  font-size: 60px;
  /* text-shadow: 0 1px 30px #fb1684, 0 0 12px #fff, 2px 5px 60px #990a52; */
  text-shadow: 0 1px 30px #ff21f4, 0 0 12px #fff, 2px 5px 60px #990a52;
}
.neon > span {
  /**点滅の速度 */
  -webkit-animation: blink 2s infinite alternate;
  animation: blink 2s infinite alternate;
}
@-webkit-keyframes blink {
  40% {
    opacity: 0.85;
  }
  42% {
    opacity: 0.4;
  }
  43% {
    opacity: 0.85;
  }
  45% {
    opacity: 0.4;
  }
  46% {
    opacity: 0.85;
  }
}
@keyframes blink {
  40% {
    opacity: 0.85;
  }
  42% {
    opacity: 0.4;
  }
  43% {
    opacity: 0.85;
  }
  45% {
    opacity: 0.4;
  }
  46% {
    opacity: 0.85;
  }
}
.carousel-item {
  width: 700px;
  height: 500px;
}
p.btn.indigo.lighten-1 {
  vertical-align: middle;
}
/* 絞り込みボタン */
.sorting-btn {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  background: #000;
}

.sorting-btn a {
  margin: 0 15px;
  padding: 10px 30px;
  color: #ff21f4bd;
  text-decoration: none;
  font-size: 20px;
  letter-spacing: 3px;
  overflow: hidden;
  transition: 0.5s;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}

.sorting-btn a:hover {
  background: #ff21f4;
  color: #000;
  box-shadow: 0 0 50px #ff21f4;
  transition-delay: 0.5s;
}
.neonText {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #bc13fe,
    0 0 82px #bc13fe, 0 0 92px #bc13fe, 0 0 102px #bc13fe, 0 0 151px #bc13fe;
}
/* 検索・絞り込みボタン */
h1 {
  font-size: 15px;
  display: inline-block;
  cursor: pointer;
  border-radius: 2rem;
  padding: 0.4em;
  box-shadow: 0 0 7px #fff, 0 0 7px #fff, 0 0 2px #bc13fe, 0 0 0.8rem #bc13fe,
    0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
}

/* ラジオボタンの色を変更 */
[type="radio"]:checked + span:after,
[type="radio"].with-gap:checked + span:after {
  background-color: #bc13fe;
  box-shadow: 0 0 7px #fff, 0 0 7px #fff, 0 0 2px #bc13fe, 0 0 0.8rem #bc13fe,
    0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
}
[type="radio"]:checked + span:after,
[type="radio"].with-gap:checked + span:before,
[type="radio"].with-gap:checked + span:after {
  border: 2px solid #bc13fe;
}
/* チェックボックスの色を変更 */
[type="checkbox"]:checked + span:not(.lever):before {
  border-right: 2px solid #bc13fe;
  border-bottom: 2px solid #bc13fe;
}
.movie-list p[data-v-0354c1be] {
  margin-top: -10px;
  font-size: 18px;
}
</style>
