<template>
  <div class="movie-detail">
    <div class="container">
      <div class="movie-card row z-depth-3">
        <div class="col s3 card-content movie-img">
          <img
            class="responsive-img movie-img"
            v-bind:src="
              'https://image.tmdb.org/t/p/w154' + currentMovie.poster_path
            "
            alt=""
          />
        </div>
        <div class="col s9 card-content">
          <h4>{{ currentMovie.title }}</h4>
          <p>{{ currentMovie.overview }}</p>
          <p class="star">{{ showRate }}{{ currentMovie.vote_average }}</p>

          <button class="btn-small" v-on:click="addCountWatch">
            <i class="material-icons left">favorite</i>見たい！
            {{ currentMovie.countWatch }}
          </button>

          <p></p>
        </div>
        <div class="col s6 card-content">
          <h4>Sub Title</h4>
          <p>{{ currentMovie.overview }}</p>
        </div>
        <div class="col s6 card-content">
          <h4>Sub Title</h4>
          <p>{{ currentMovie.overview }}</p>
        </div>
      </div>

      <div class="review-card z-depth-3">
        <div class="row">
          <div class="col s2 review-header">
            <img
              src="https://joeschmoe.io/api/v1/random"
              class="responsive-img profile-img"
            />
          </div>
          <div class="col s10 review-header">
            <h4>User Name</h4>
            <p>Post Date</p>
          </div>
          <div class="col s12">
            <p>contents/contents/contents/contents/contents/</p>
            <p>contents/contents/contents/contents/contents/</p>
            <p>contents/contents/contents/contents/contents/</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col s5 comment-card z-depth-3">
          <h5>User Name</h5>
          <p>contents/contents/contents/contents/</p>
          <p>contents/contents/contents/contents/</p>
        </div>
        <div class="col s5 comment-card z-depth-3">
          <h5>User Name</h5>
          <p>contents/contents/contents/contents/</p>
          <p>contents/contents/contents/contents/</p>
        </div>
        <div class="col s5 comment-card z-depth-3">
          <h5>User Name</h5>
          <p>contents/contents/contents/contents/</p>
          <p>contents/contents/contents/contents/</p>
        </div>
        <div class="col s5 comment-card z-depth-3">
          <h5>User Name</h5>
          <p>contents/contents/contents/contents/</p>
          <p>contents/contents/contents/contents/</p>
        </div>
      </div>
      <div class="review-card z-depth-3">
        <div class="row">
          <div class="col s2 review-header">
            <img
              src="https://joeschmoe.io/api/v1/jess"
              class="responsive-img profile-img"
            />
          </div>
          <div class="col s10 review-header">
            <h4>User Name</h4>
            <p>Post Date</p>
          </div>
          <div class="col s12">
            <p>contents/contents/contents/contents/contents/</p>
            <p>contents/contents/contents/contents/contents/</p>
            <p>contents/contents/contents/contents/contents/</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s5 comment-card z-depth-3">
          <h5>User Name</h5>
          <p>contents/contents/contents/contents/</p>
          <p>contents/contents/contents/contents/</p>
        </div>
        <div class="col s5 comment-card z-depth-3">
          <h5>User Name</h5>
          <p>contents/contents/contents/contents/</p>
          <p>contents/contents/contents/contents/</p>
        </div>
        <div class="col s5 comment-card z-depth-3">
          <h5>User Name</h5>
          <p>contents/contents/contents/contents/</p>
          <p>contents/contents/contents/contents/</p>
        </div>
        <div class="col s5 comment-card z-depth-3">
          <h5>User Name</h5>
          <p>contents/contents/contents/contents/</p>
          <p>contents/contents/contents/contents/</p>
        </div>
      </div>
    </div>
    <!-- 同じジャンルの映画をおすすめとして表示させる -->
    <div class="similar-movie">
      <div class="row">
        <h5>あなたにおすすめの作品</h5>
        <div
          class="item"
          v-for="(
            sameGenreMovieList, index
          ) of this.$store.getters.getGenreById(currentMovie.genre_ids)"
          v-bind:key="index"
        >
          <div
            class="item"
            v-for="movie of sameGenreMovieList"
            v-bind:key="movie.id"
          >
            <div class="col s6 m3 movie-genre">
              <img
                class="responsive-img movie-genre"
                v-bind:src="
                  'https://image.tmdb.org/t/p/w154' + movie.poster_path
                "
              />
              <router-link
                v-bind:to="'/movieDetail/' + movie.id"
                v-on:click="onClick"
              >
                <div>{{ movie.title }}</div>
              </router-link>
              <div class="star">
                ★
                {{ movie.vote_average }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <button
      type="button"
      v-on:click="CountUp"
      v-bind:class="{ btn: isClicked }"
    >
      <img v-bind:src="imgUrl" />{{ Count }}
    </button> -->
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
  private watchCount = 0;

  get Count(): number {
    return this.$store.getters.getCount;
  }
  CountUp(): void {
    this.$store.commit("countUp");
    console.log("clickされた");
    this.isClicked = !this.isClicked;
  }

  /**
   * 映画の評価(vote_average)を★の数で表示する.
   */
  get showRate(): string {
    let rating = "";
    if (
      this.currentMovie.vote_average <= 10 &&
      9.6 <= this.currentMovie.vote_average
    ) {
      rating = "★★★★★★★★★★";
    } else if (
      this.currentMovie.vote_average >= 8.6 &&
      9.5 >= this.currentMovie.vote_average
    ) {
      rating = "★★★★★★★★★";
    } else if (
      this.currentMovie.vote_average >= 7.6 &&
      8.5 >= this.currentMovie.vote_average
    ) {
      rating = "★★★★★★★★";
    } else if (
      this.currentMovie.vote_average >= 6.6 &&
      7.5 >= this.currentMovie.vote_average
    ) {
      rating = "★★★★★★★";
    } else if (
      this.currentMovie.vote_average >= 5.6 &&
      6.5 >= this.currentMovie.vote_average
    ) {
      rating = "★★★★★★";
    } else if (
      this.currentMovie.vote_average >= 4.6 &&
      5.5 >= this.currentMovie.vote_average
    ) {
      rating = "★★★★★";
    } else if (
      this.currentMovie.vote_average >= 3.6 &&
      4.5 >= this.currentMovie.vote_average
    ) {
      rating = "★★★★";
    } else if (
      this.currentMovie.vote_average >= 2.6 &&
      3.5 >= this.currentMovie.vote_average
    ) {
      rating = "★★★";
    } else if (
      this.currentMovie.vote_average >= 1.6 &&
      2.5 >= this.currentMovie.vote_average
    ) {
      rating = "★★";
    } else if (
      this.currentMovie.vote_average >= 0.6 &&
      1.5 >= this.currentMovie.vote_average
    ) {
      rating = "★";
    } else if (
      this.currentMovie.vote_average >= 0 &&
      0.5 >= this.currentMovie.vote_average
    ) {
      rating = "";
    }
    return rating;
  }
  /**
   * 表示している映画のジャンルIDと同じジャンルIDを持つ作品を表示させる.
   */
  getGenrebyId(genre_ids: Array<number>): any {
    return this.$store.getters.getGenreById(genre_ids);
  }
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
    let MovieId = Number(this.$route.params.id);
    const responce = await axios.get(
      `https://api.themoviedb.org/3/movie/${MovieId}?api_key=b5408f6aa5f27ebad281342354c0e1f9`
    );

    let responceMovie = responce.data;
    let initGenreIds = new Array<number>();
    for (let obj of responceMovie.genres) {
      initGenreIds.push(obj.id);
    }

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
    this.currentMovieId = MovieId;
  }
  onClick(): void {
    setTimeout(() => {
      let targetId = this.$route.params.id;
      this.$store.commit("setCurrentMovieId", {
        currentMovieId: targetId,
      });
      this.$router.push("/dummyPage");
    }, 1000);
  }
  addCountWatch(): void {
    this.$store.commit("setCountWatch", {
      countWatch: this.currentMovie.countWatch,
      movieId: this.currentMovie.id,
    });
  }
}
</script>

<style scoped>
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

.movie-card {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  padding: 0 5px;
}
.card-content {
  height: 250px;
  border-radius: 10px;
  margin: 5px 0;
}
.movie-img {
  margin-top: 5px;
  text-align: center;
}
.review-card {
  background-color: white;
  width: 100%;
  height: 280px;
  border-radius: 10px;
  margin-left: 10px;
}
.review-header {
  background-color: white;
  width: 100%;
  height: 100px;
  border-radius: 10px;
}
.profile-img {
  border-radius: 1000px;
  width: 80px;
}
.comment-card {
  background-color: white;
  margin-left: 10px;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  border: 5px solid #f5f6fa;
  margin: 5px 20px;
}
.similar-movie {
  background-color: white;
  width: 100%;
  border-radius: 10px;
  margin: 10px;
  padding: 0 5px;
}
/* .item { */
/* display: flex; */
/* margin: 10px;
  padding: 10px;
  width: 200px;
}
.title {
  text-align: center; 
 } */
.star {
  color: #ffd000;
}
.movie-genre {
  text-align: center;
  border-radius: 10px;
}
h5 {
  text-align: center;
}
.btn-small {
  background-color: rgb(230, 70, 123);
}
</style>
