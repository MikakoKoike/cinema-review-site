<template>
  <div class="similar-movie">
    <!-- 同じジャンルの映画をおすすめとして表示させる -->
    <div>
      <div class="row item">
        <h5>あなたにおすすめの作品</h5>
        <div
          class="item"
          v-for="(sameGenreMovieList, index) of sameGenreMovieGroup"
          v-bind:key="index"
        >
          <div
            class="item"
            v-for="movie of sameGenreMovieList"
            v-bind:key="movie.id"
          >
            <div class="col s6 m3 movie-genre">
              <router-link
                v-bind:to="'/movieDetail/' + movie.id"
                v-on:click="onClick"
              >
                <img
                  class="movie-poster"
                  v-bind:src="
                    'https://image.tmdb.org/t/p/w154' + movie.poster_path
                  "
                />
              </router-link>
              <div class="title">{{ movie.title }}</div>
              <div class="star">
                ★
                {{ movie.vote_average }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <router-link v-bind:to="'/movieDetail/' + currentMovieId" class="btn">
        <a href="#">作品詳細に戻る</a>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { TimeList } from "@/types/timeList";
import axios from "axios";

import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  /**
   * 表示している映画のジャンルIDと同じジャンルIDを持つ作品を表示させる.
   */
  private sameGenreMovieGroup = new Array<Array<Movie>>();
  private currentMovieId = 0;
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
    0,
    new Array<string>(),
    new Array<TimeList>(),
    new Array<Review>(),
    0,
    0
  );

  async created(): Promise<void> {
    const MovieId = Number(this.$route.params.id);
    console.log(MovieId);
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${MovieId}?api_key=b5408f6aa5f27ebad281342354c0e1f9`
    );

    let responseMovie = response.data;
    let initGenreIds = new Array<number>();
    for (let obj of responseMovie.genres) {
      initGenreIds.push(obj.id);
    }

    this.currentMovie = new Movie(
      responseMovie.adult,
      responseMovie.backdrop_path,
      initGenreIds,
      responseMovie.id,
      responseMovie.original_language,
      responseMovie.original_title,
      responseMovie.overview,
      responseMovie.popularity,
      responseMovie.poster_path,
      responseMovie.release_date,
      responseMovie.title,
      responseMovie.video,
      responseMovie.vote_average,
      responseMovie.vote_count,
      new Array<string>(),
      new Array<TimeList>(),
      new Array<Review>(),
      0,
      0
    );
    this.currentMovieId = MovieId;
    this.sameGenreMovieGroup = this.$store.getters.getGenreById(
      this.currentMovie.genre_ids
    );
  }

  backToMovieDetail(): void {
    this.$router.push(`movieDetail/${this.currentMovie.id}`);
  }
}
</script>

<style scoped>
.row {
  margin: 0;
}
h5 {
  color: aliceblue;
  text-align: center;
  text-shadow: 0 0 20px #00afec, 0 0 5px #00afec;
  margin-top: 0;
}
.star {
  color: #ffd000;
}
.title {
  color: white;
}
.similar-movie {
  background-color: #1a1b20;
}
/* .item {
  text-align: center;
} */
.movie-genre {
  text-align: center;
}
/* .movie-genre:hover { */
/* box-shadow: 10px 10px 15px -10px whitesmoke; */
/* } */
.movie-poster:hover {
  box-shadow: 5px -8px 20px #fff;
}
.btn {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  background: #000;
}

.btn a {
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

.btn a:hover {
  background: #ff21f4;
  color: #000;
  box-shadow: 0 0 50px #ff21f4;
  transition-delay: 0.5s;
}
</style>
