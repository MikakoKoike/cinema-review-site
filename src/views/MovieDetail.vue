<template>
  <div>
    <div v-for="(sameGenreMovieList, index) of this.$store.getters.getGenreById(currentMovie.genre_ids)" v-bind:key="index">
      {{ sameGenreMovieList }}
    </div>
  </div>
</template>

<script lang="ts">
import { Movie } from "@/types/movie";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MovieDetail extends Vue {
  getGenrebyId(genre_ids: Array<number>): any {
    return this.$store.getters.getGenreById(genre_ids);
  }

  //  private similarMovieList =
  private currentMovieList = Array<Movie>();
  private currentMovie = new Movie(
    false,
    "",
    [0],
    0,
    "",
    "",
    "",
    0,
    "",
    "",
    "",
    false,
    0,
    0
  );

  async created(): Promise<void> {
    const MovieId = Number(this.$route.params);
    const responce = await axios.get(
      "https://api.themoviedb.org/3/movie/634649?api_key=b5408f6aa5f27ebad281342354c0e1f9"
    );
    console.dir("responce:" + JSON.stringify(responce));
    let responceMovie = responce.data     //movie不要だった。

    console.log(responce.data.genres);
    let initGenreIds = new Array<number>();
    for(let obj of responceMovie.genres){
      initGenreIds.push(obj.id)
    }
    console.log(initGenreIds);

    this.currentMovie = new Movie(
      responceMovie.adult,
      responceMovie.backdrop_path,
      initGenreIds,
      responceMovie.id,
      responceMovie.original_language,
      responceMovie.original_title,
      responceMovie.overview,
      responceMovie.popularity,
      responceMovie.poster_path,
      responceMovie.release_date,
      responceMovie.title,
      responceMovie.video,
      responceMovie.vote_average,
      responceMovie.vote_count
    );
    console.log(this.currentMovie);
  }
}
</script>

<style scoped></style>
