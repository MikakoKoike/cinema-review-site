<template>
  <div class="movie-detail">
    <!-- <div
      v-for="(sameGenreMovieList, index) of this.$store.getters.getGenreById(
        currentMovie.genre_ids
      )"
      v-bind:key="index"
    >
      {{ sameGenreMovieList[0] }}
    </div> -->
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
        </div>
        <div class="col s6 card-content">
          <h4>Sub Title</h4>
          <p>{{ currentMovie.overview }}</p>
        </div>
        <div class="col s6 card-content">
          <h4>Sub Title</h4>
          <p>{{ currentMovie.overview }}</p>
        </div>
        <!-- レビューボタン -->
        <!-- ここで次の画面にIDを渡す -->
        <router-link v-bind:to="'/reviewEdit/' + currentMovie.id">
          <button type="button" class="reviewButton">レビューする</button>
        </router-link>
      </div>

      <div v-for="review of getcurrentMovieReview" v-bind:key="review.id">
        <div class="review-card z-depth-3">
          <div class="row">
            <div class="col s2 review-header">
              <img
                src="https://joeschmoe.io/api/v1/random"
                class="responsive-img profile-img"
              />
            </div>
            <!-- レビュー表示 -->
            <div class="col s10 review-header">
              <!-- ↓にレビューを表示させたい -->
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

              <p>ユーザーID：{{ review.userId }}</p>
              <p>投稿日時：{{ review.formatDate }}</p>
            </div>
          </div>
          <div class="col s12">
            <p>レビュー内容：{{ review.content }}</p>
            <button type="button" class="likeBtn" @click="addLike">
              いいね！<span class="likeHeart">♡</span
              ><span>{{ review.countLike }}</span>
            </button>
            <button type="button" class="commentBtn" @click="showComment">
              コメントする
            </button>
            <div class="commentBox" v-if="commentFlag">
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="10"
                v-model="commentContent"
              ></textarea>
              <button type="button" @click="addComment">投稿</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s5 comment-card z-depth-3">
          <h5>User Name</h5>
          <p>contents/contents/contents/contents/</p>
          <p>contents/contents/contents/contents/</p>
        </div>
      </div>
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
import store from "@/store";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { TimeList } from "@/types/timeList";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MovieDetail extends Vue {
  private imgUrl = "/img/eye.png";
  private isClicked = false;

  // コメントボタン
  private commentFlag = false;
  // コメント
  private commentContent = "";
  // storeの映画情報
  private storeMovie = new Movie(
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
  // いいね数
  private likeCount = 0;

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
    const MovieId = Number(this.$route.params.id);
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
    this.storeMovie = this.$store.getters.getcurrentMovie(this.currentMovie.id);
  }
  /**
   * レビューリストを取得する
   */
  get getcurrentMovieReview(): Array<Review> {
    return this.storeMovie.reviewList;
  }

  /**
   * コメント入力欄を表示する
   */
  showComment(): void {
    this.commentFlag = true;
  }

  addComment(): void {
    console.log("called");
    this.$store.commit("addComment", {
      movieId: this.currentMovie.id,
    });
  }

  addLike(): void {
    let likeCounts = this.likeCount++;
    // let reviewList = new Array<Review>();
    for (let storeReview of this.storeMovie.reviewList) {
      storeReview.countLike = likeCounts;
    }
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
  height: auto;
  border-radius: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  padding: 10px;
}
.review-header {
  background-color: white;
  width: 100%;
  height: auto;
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

/* レビューボタンのデザイン */
.reviewButton {
  padding: 10px 40px;
  margin: 20px;
  background-color: white;
  border: solid 1px;
  cursor: pointer;
  transition: all 0.3s;
}
.reviewButton:hover {
  color: white;
  font-weight: bold;
  background-color: #c5cae9;
}

/* いいねボタン */
.likeBtn {
  background-color: white;
  border: solid black 1px;
  cursor: pointer;
  margin: 20px;
}

/* コメントボタン */
.commentBtn {
  padding: 10px 40px;
  margin: 20px;
  background-color: white;
  border: solid 1px;
  transition: all 0.3s;
  cursor: pointer;
}

.commentBtn:hover {
  color: white;
  font-weight: bold;
  background-color: #c5cae9;
}
</style>
