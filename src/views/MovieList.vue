<template>
  <div class="movie-list">
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
                <p class="btn indigo lighten-1" v-on:click="saveMovie(movie.id)">保存</p>
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
import axios from "axios";
import { ApiMovie } from "@/types/api/apiMovie";
@Component
export default class MovieList extends Vue {
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
  saveMovie(movieId: number): void{
    let targetMovie = this.$store.getters.getcurrentMovie(movieId);
    this.$store.commit("saveToMovieList", {
      movie: targetMovie
    });
    alert("ムービーリストに保存されました！")
  }
}
</script>

<style scoped>
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
.thumbnail-area{
  text-align: center;
}
</style>
