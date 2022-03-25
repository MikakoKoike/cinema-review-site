<template>
  <div class="movie-detail">
    <div class="container">
      <div class="movie-card row z-depth-3">
        <div class="col s3 card-content movie-img">
          <img
            class="responsive-img movie-img"
            v-bind:src="
              'https://image.tmdb.org/t/p/w154' + targetApiMovie.poster_path
            "
            alt=""
          />
        </div>
        <div class="col s9 card-content">
          <h4>{{ targetApiMovie.title }}</h4>
          <p>{{ targetApiMovie.overview }}</p>
          <p class="star">{{ showRate }}{{ targetApiMovie.vote_average }}</p>

          <span class="btn-small" v-on:click="addCountWatch">
            <i class="material-icons left">favorite</i>見たい！
            {{ countWatch }}
          </span>

          <p></p>
        </div>
        <div class="col s6 card-content">
          <h4>Sub Title</h4>
          <p>{{ targetApiMovie.overview }}</p>
        </div>
        <div class="col s6 card-content">
          <h4>Sub Title</h4>
          <p>{{ targetApiMovie.overview }}</p>
        </div>
        <!-- レビューボタン -->
        <!-- ここで次の画面にIDを渡す -->
        <router-link v-bind:to="'/reviewEdit/' + targetApiMovie.id">
          <button type="button" class="reviewButton">レビューする</button>
        </router-link>

        <div class="recommendation">
          <button
            class="btn-small"
            type="button"
            v-on:click="moveTosimilarMovie(currentMovieId)"
          >
            <i class="material-icons left"></i>
            あなたにおすすめの作品はこちら
          </button>
        </div>
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
              <p>レビューID：{{ review.id }}</p>
              <p>投稿日時：{{ review.formatDate }}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <p>レビュー内容：{{ review.content }}</p>

            <CompLikeButton v-bind:review="review" />

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

            <CompCommentArea v-bind:review="review" />
          </div>
        </div>
        <div class="row">
          <div
            class="col s5 push-s2 comment-card z-depth-3"
            v-for="comment of review.replyCommentList"
            v-bind:key="comment.id"
          >
            <p>ユーザーID:{{ comment.userId }}</p>
            <h5>{{ comment.content }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Comment } from "@/types/comment";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { TimeList } from "@/types/timeList";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import CompLikeButton from "@/components/CompLikeButton.vue";
import CompCommentArea from "@/components/CompCommentArea.vue";
import { ApiMovie } from "@/types/api/apiMovie";

@Component({
  components: {
    CompLikeButton,
    CompCommentArea,
  },
})
export default class MovieDetail extends Vue {
  private targetApiMovie = new Movie(
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

  //見たいボタン

  private stateCurrentMovie = new Movie(
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

  //見たいボタン
  private watchId = this.$route.params.id;
  private countWatch = 0;

  // get currentReviewList(): Array<Review> {
  //   return this.stateCurrentMovie.reviewList;
  // }

  // get getCurrentMovie(): Movie{
  //   return this.$store.getters.getcurrentMovie(this.currentMovie.id)
  // }

  // コメントボタン
  private commentFlag = false;
  // コメント
  private commentContent = "";

  // private watchCount = 0;

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
  // いいねしたレビューのID
  private currentReviewId = 0;

  /**
   * 映画の評価(vote_average)を★の数で表示する.
   */
  get showRate(): string {
    let rating = "";
    if (
      this.targetApiMovie.vote_average <= 10 &&
      9.6 <= this.targetApiMovie.vote_average
    ) {
      rating = "★★★★★★★★★★";
    } else if (
      this.targetApiMovie.vote_average >= 8.6 &&
      9.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "★★★★★★★★★";
    } else if (
      this.targetApiMovie.vote_average >= 7.6 &&
      8.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "★★★★★★★★";
    } else if (
      this.targetApiMovie.vote_average >= 6.6 &&
      7.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "★★★★★★★";
    } else if (
      this.targetApiMovie.vote_average >= 5.6 &&
      6.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "★★★★★★";
    } else if (
      this.targetApiMovie.vote_average >= 4.6 &&
      5.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "★★★★★";
    } else if (
      this.targetApiMovie.vote_average >= 3.6 &&
      4.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "★★★★";
    } else if (
      this.targetApiMovie.vote_average >= 2.6 &&
      3.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "★★★";
    } else if (
      this.targetApiMovie.vote_average >= 1.6 &&
      2.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "★★";
    } else if (
      this.targetApiMovie.vote_average >= 0.6 &&
      1.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "★";
    } else if (
      this.targetApiMovie.vote_average >= 0 &&
      0.5 >= this.targetApiMovie.vote_average
    ) {
      rating = "";
    }
    return rating;
  }
  /**
   * 表示している映画のジャンルIDと同じジャンルIDを持つ作品を表示させる.
   */
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

    const exactOrNot = (): boolean => {
      let frag = false;
      let newArray = [];
      for (let movie of this.$store.getters.getMovieList) {
        if (movie.id === MovieId) {
          newArray.push(movie);
        }
      }
      if (newArray.length >= 1 ?? false) {
        frag = true;
      }
      return frag;
    };

    this.targetApiMovie = this.$store.getters.getcurrentMovie(MovieId);

    if (!exactOrNot()) {
      this.$store.commit("setMovieList", {
        movieId: MovieId,
        movie: new Movie(
          this.targetApiMovie.adult,
          this.targetApiMovie.backdrop_path,
          this.targetApiMovie.genre_ids,
          this.targetApiMovie.id,
          this.targetApiMovie.original_language,
          this.targetApiMovie.original_title,
          this.targetApiMovie.overview,
          this.targetApiMovie.popularity,
          this.targetApiMovie.poster_path,
          this.targetApiMovie.release_date,
          this.targetApiMovie.title,
          this.targetApiMovie.video,
          this.targetApiMovie.vote_average,
          this.targetApiMovie.vote_count,
          new Array<string>(),
          new Array<TimeList>(),
          this.$store.getters.getReviewListByMovieId(MovieId) ??
            new Array<Review>(),
          this.$store.getters.getCountLikeByMovieId(MovieId) ?? 0,
          this.$store.getters.getCountWatchByMovieId(MovieId) ?? 0
        ),
      });
    }

    this.countWatch = this.$store.getters.getCountWatchByMovieId(MovieId);
    this.stateCurrentMovie = this.$store.getters.getcurrentMovie(
      this.currentMovie.id
    );
    this.currentMovieId = MovieId;
    this.storeMovie = this.$store.getters.getcurrentMovie(this.currentMovieId);
    const exactReviewOrNot = (): boolean => {
      let frag = false;
      let newArray = [];
      for (let review of this.$store.getters.getReviewList) {
        if (review.movieId == MovieId) {
          newArray.push(review);
        }
      }
      if (newArray.length >= 1 ?? false) {
        frag = true;
      }
      return frag;
    };
    if (!exactReviewOrNot()) {
      await this.$store.dispatch("asyncGetReviewList");
    }
  }
  /**
   * レビューリストを取得する
   */
  get getcurrentMovieReview(): Array<Review> {
    return this.$store.getters.getReviewListByMovieId(this.targetApiMovie.id);
  }
  /**
   * コメント投稿
   */
  addComment(): void {
    this.$store.commit("addComment", {
      comment: new Comment(-1, 0, -1, new Date(), "megumi"),
    });
  }

  /**
   * いいね機能
   */
  // getCurrentReviewId(reviewIndex: number): void {
  //   this.currentReviewId = this.currentReviewList[reviewIndex].id;
  // }

  addLike(reviewId: number): void {
    // いいね数のカウントアップ
    this.likeCount++;

    this.$store.commit("addLike", {
      movieId: this.currentMovieId,
      reviewId: reviewId,
      countLike: this.likeCount,
    });

    // 最初のいいね
    // let likeCounts = this.likeCount++;
    // for (let storeReview of this.storeMovie.reviewList) {
    //   storeReview.countLike = likeCounts;
    // }
  }

  /**
   * 見たいボタンの設定.
   */
  addCountWatch(): void {
    this.countWatch++;
    console.log(this.countWatch);
    this.$store.commit("setCountWatch", {
      countWatch: this.countWatch,
      movieId: this.targetApiMovie.id,
    });
  }
  /**
   * 見たいボタンを押した数を返す.
   */
  // get count(): number {
  //   return this.$store.getters.getCount(this.targetMovie);
  // }

  /**
   * おすすめ作品ページへ遷移.
   */
  moveTosimilarMovie(currentMovieId: number): void {
    this.$router.push(`/similarMovie/${currentMovieId}`);
  }
  // get getcurrentMovieReview(): Movie {
  //   console.log(this.$store.getters.getcurrentMovie(this.currentMovie.id));
  //   // ⇒undefined
  //   return this.$store.getters.getcurrentMovie(this.currentMovie.id);
  // }
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
  width: 100%;
  height: 100px;
  border-radius: 10px;
  border: 5px solid #f5f6fa;
  margin: 5px;
}

.similar-movie {
  background-color: white;
  width: 100%;
  border-radius: 10px;

  margin: 10px;
  padding: 0 5px;
}

.star {
  color: #ffd000;
}
.movie-genre {
  text-align: center;
  border-radius: 10px;
}
.movie-poster {
  border-radius: 10px;
}

h5 {
  text-align: center;
}
.btn-small {
  background-color: rgb(230, 70, 123);
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
.recommendation button {
  background-color: rgb(30, 190, 116);
}
</style>
