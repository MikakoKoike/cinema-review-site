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
              <div class="col s4">
                <img
                  class="responsive-img movie-img"
                  v-bind:src="
                    'https://image.tmdb.org/t/p/w92' + movie.poster_path
                  "
                  alt=""
                />
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
import { Movie } from "@/types/movie";
@Component
export default class MovieList extends Vue {
  private currentMovieList = Array<Movie>();

  async created(): Promise<void> {
    await this.$store.dispatch("asyncGetMovieList");
    this.currentMovieList = this.$store.getters.getMovieList;
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
  margin: 20px;
}
</style>
