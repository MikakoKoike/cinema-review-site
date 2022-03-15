<template>
  <div>
    <div
      v-for="(sameGenreMovieList, index) of this.$store.getters.getGenreById(
        currentMovie.genre_ids
      )"
      v-bind:key="index"
    >
      {{ sameGenreMovieList }}
    </div>

    <div class="review">
      <p>レビュー</p>
      <div class="stars">
        <span>
          <input id="review01" type="radio" name="review" /><label
            for="review01"
            >★</label
          >
          <input id="review02" type="radio" name="review" /><label
            for="review02"
            >★</label
          >
          <input id="review03" type="radio" name="review" /><label
            for="review03"
            >★</label
          >
          <input id="review04" type="radio" name="review" /><label
            for="review04"
            >★</label
          >
          <input id="review05" type="radio" name="review" /><label
            for="review05"
            >★</label
          >
        </span>
      </div>
    </div>
    <button
      type="button"
      v-on:click="CountUp"
      v-bind:class="{ btn: isClicked }"
    >
      <img v-bind:src="imgUrl" />{{ Count }}
    </button>
    <p>見たい!</p>
  </div>
</template>

<script lang="ts">
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { TimeList } from "@/types/timeList";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MovieDetail extends Vue {
  private imgUrl = "/img/eye.png";
  private isClicked = false;

  get Count(): number {
    return this.$store.getters.getCount;
  }
  CountUp(): void {
    this.$store.commit("count");
    console.log("clickされた");
    this.isClicked = !this.isClicked;
  }
  /**
   * 表示している映画のジャンルIDと同じジャンルIDを持つ作品を表示させる.
   */

  getGenrebyId(genre_ids: Array<number>): any {
    return this.$store.getters.getGenreById(genre_ids);
  }
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
    const MovieId = Number(this.$route.params);
    const responce = await axios.get(
      "https://api.themoviedb.org/3/movie/634649?api_key=b5408f6aa5f27ebad281342354c0e1f9"
    );
    console.dir("responce:" + JSON.stringify(responce));

    let responceMovie = responce.data; //movie不要だった。

    console.log(responce.data.genres);
    let initGenreIds = new Array<number>();
    for (let obj of responceMovie.genres) {
      initGenreIds.push(obj.id);
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
      responceMovie.vote_count,
      new Array<string>(),
      new Array<TimeList>(),
      new Array<Review>(),
      0,
      0
    );
    console.log(this.currentMovie);
  }
}
</script>

<style scoped>
.btn {
  background-color: red;
}
.stars span {
  display: flex; /* 要素をフレックスボックスにする */
  flex-direction: row-reverse; /* 星を逆順に並べる */
  justify-content: flex-end; /* 逆順なので、左寄せにする */
}

.stars input[type="radio"] {
  display: none; /* デフォルトのラジオボタンを非表示にする */
}

.stars label {
  color: #d2d2d2; /* 未選択の星をグレー色に指定 */
  font-size: 30px; /* 星の大きさを30pxに指定 */
  padding: 0 5px; /* 左右の余白を5pxに指定 */
  cursor: pointer; /* カーソルが上に乗ったときに指の形にする */
}

.stars label:hover,
.stars label:hover ~ label,
.stars input[type="radio"]:checked ~ label {
  color: #f8c601; /* 選択された星以降をすべて黄色にする */
}
</style>
