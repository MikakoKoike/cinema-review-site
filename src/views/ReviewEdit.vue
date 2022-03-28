<template>
  <div>
    <div class="title">
      <h3>レビューする</h3>
    </div>
    <div class="movieInfo">
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
    </div>
    <div class="reviewBox">
      <pre>ユーザー名：</pre>
      <div class="stars">
        <span>
          <input
            id="review01"
            type="radio"
            name="review"
            v-bind:value="5"
            v-model="starCount"
            v-on:change="countStar"
          /><label for="review01">★</label>
          <input
            id="review02"
            type="radio"
            name="review"
            value="4"
            v-model="starCount"
            @change="countStar"
          /><label for="review02">★</label>
          <input
            id="review03"
            type="radio"
            name="review"
            value="3"
            v-model="starCount"
            @change="countStar"
          /><label for="review03">★</label>
          <input
            id="review04"
            type="radio"
            name="review"
            value="2"
            v-model="starCount"
            @change="countStar"
          /><label for="review04">★</label>
          <input
            id="review05"
            type="radio"
            name="review"
            value="1"
            v-model="starCount"
            @change="countStar"
          /><label for="review05">★</label>
        </span>
      </div>
      <!-- レビュー入力欄 -->
      <textarea
        name="review"
        id="review"
        cols="30"
        rows="10"
        v-model="reviewContent"
      ></textarea>
      <router-link v-bind:to="'/movieDetail/' + currentMovie.id">
        <button type="button" @click="addReview">投稿</button>
      </router-link>
    </div>
    <!-- end of remplate -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Movie } from "@/types/movie";
import { TimeList } from "@/types/timeList";
import { Review } from "@/types/review";
import { Comment } from "@/types/comment";
import axios from "axios";
@Component
export default class XXXComponent extends Vue {
  // レビュー内容
  private reviewContent = "";
  //  レビュー投稿日時
  private postDate = new Date();
  // 現在の映画情報
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
  // ★の数
  private starCount = 0;
  // レビューID
  private reviewId = 0;
  /**
   * 渡されたIDをもとに情報を1件取得する
   *
   * @returns-Promise
   */
  async created(): Promise<void> {
    const MovieId = Number(this.$route.params.id);
    this.currentMovie =
      this.$store.getters.getCurrentMovieFromMovieList(MovieId);
  }
  /**
   * 星の数をカウントする
   */
  countStar(): void {
    console.log(this.starCount);
  }

  /**
   * レビューを追加する
   */
  addReview(): void {
    // IDの採番
    let newId = 0;
    if (this.currentMovie.reviewList.length !== 0) {
      newId = Number(this.currentMovie.reviewList[0].id) + 1;
    }
    this.reviewId = newId;
    console.log("アドレビュー");
    // レビューを追加する
    this.$store.commit("addReview", {
      movieId: this.currentMovie.id,
      review: new Review(
        this.reviewId,
        0,
        this.currentMovie.id,
        0,
        this.postDate,
        this.reviewContent,
        new Array<Comment>(),
        this.starCount
      ),
    });
    //レビューを自分のリストに追加する
    this.$store.commit("saveToReviewList", {
      review: new Review(
        this.reviewId,
        0,
        this.currentMovie.id,
        0,
        this.postDate,
        this.reviewContent,
        new Array<Comment>(),
        this.starCount
      ),
    });
    //stateのフラグをtrueにする.
    this.$store.commit("switchIsFromEditPageFrag", {
      isFromEditPage: this.$store.getters.getIsFromEditPageFrag,
    });
    this.$router.push(`/movieDetail/${this.currentMovie.id}`);
  }
}
</script>

<style scoped>
.title {
  text-align: center;
}

.movieInfo {
  text-align: center;
}

.reviewBox {
  text-align: center;
  margin: 50px auto;
  width: 500px;
}

.stars span {
  display: flex; /* 要素をフレックスボックスにする */
  flex-direction: row-reverse; /*星を逆順に並べる*/
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
  width: 80%;
  height: auto;
  border-radius: 10px;
  margin: 10px auto;
  padding: 0 5px;
}
.card-content {
  height: 250px;
  border-radius: 10px;
  margin: 10px auto;
}

.movie-img {
  margin-top: 5px;
  text-align: center;
}
</style>
