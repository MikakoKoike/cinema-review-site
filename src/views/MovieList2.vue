<template>
  <div class="movie-list">
    <!-- <div class="row">
      <p>上映作品</p>
      <div class="subTitle neon">NO<span>W S</span>HOW<span>IN</span>G</div>

      <div v-for="movie of currentMovieList" v-bind:key="movie.id">
        <div class="col s6 m3">
          <router-link v-bind:to="'/movieDetail/' + movie.id">
            <img
              class="poster"
              v-bind:src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              alt=""
            />
          </router-link>
          <div card-title>
            <h5>{{ movie.title }}</h5>
          </div>
          <div class="btn indigo lighten-1" v-on:click="saveMovie(movie.id)">
            保存
          </div>
        </div>
      </div>
    </div> -->
    <div>
      <div class="carousel">
        <a class="carousel-item" href="#one!"><img src="/img/movie.jpg" /></a>
        <a class="carousel-item" href="#two!"><img src="/img/shire.jpg" /></a>
        <a class="carousel-item" href="#three!"
          ><img src="/img/hollywoodSign.jpg"
        /></a>
        <a class="carousel-item" href="#four!"><img src="/img/thater.jpg" /></a>
      </div>

      <div class="row">
        <p>上映作品</p>
        <div class="subTitle neon">NO<span>W S</span>HOW<span>IN</span>G</div>
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
                <!-- <p>{{ movie.overview }}</p> -->
                <h5>{{ movie.title }}</h5>
              </div>
              <div class="card-action">
                <p
                  class="btn indigo lighten-1"
                  v-on:click="saveMovie(movie.id)"
                >
                  保存
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ApiMovie } from "@/types/api/apiMovie";
import { Component, Vue } from "vue-property-decorator";
import "normalize.css";
@Component
export default class XXXComponent extends Vue {
  private currentMovieList = Array<ApiMovie>();

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
}
</script>

<style scoped>
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
  height: 80px;
  padding: 10px;
}
.card-action {
  height: 50px;
}
.movie-list {
  text-align: center;
  background-color: rgba(0, 0, 0, 0.822);
}
/**タイトル */
.movie-list h5 {
  font-size: 20px;
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
  height: 420px;
  /* padding-top: 20px; */
}

/**文字を点滅させる */
.neon {
  display: inline-block;
  color: #fff;
  letter-spacing: 0.05em;

  font-size: 40px;
  text-shadow: 0 1px 30px #fb1684, 0 0 12px #fff, 2px 5px 60px #990a52;
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
</style>
