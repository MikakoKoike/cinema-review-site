<template>
  <div class="comment-area">
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
</template>

<script lang="ts">
import { Comment } from "@/types/comment";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { User } from "@/types/user";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class CompCommentArea extends Vue {
  @Prop()
  private review?: Review;
  // コメントボタン
  private commentFlag = false;
  // コメント
  private commentContent = "";
  //ログインしているユーザー
  private currentUser = new User(
    0,
    "",
    "",
    "",
    new Array<Movie>(),
    new Array<Review>(),
    new Array<Comment>(),
    "",
    ""
  );

  // コメントID
  private commentId = 0;
  created(): void {
    this.currentUser = this.$store.getters.getCurrentUser;
  }
  /**
   * コメント入力欄を表示する
   */
  showComment(): void {
    this.commentFlag = true;
  }
  /**
   * コメント投稿
   */
  addComment(): void {
    // IDの採番
    let newId = 0;

    if (this.currentUser.myCommentList) {
      newId = Number(this.currentUser.myCommentList[0].id) + 1;
    }

    this.commentId = newId;

    alert("コメント投稿");
    this.$store.commit("setComment", {
      movieId: this.review?.movieId,
      reviewId: this.review?.id,
      userId: this.currentUser.id,
      comment: new Comment(
        this.commentId,
        this.currentUser.id,
        this.review?.id as number,
        new Date(),
        this.commentContent
      ),
    });
    this.$store.commit("saveToMyCommentList", {
      comment: new Comment(
        this.commentId,
        this.currentUser.id,
        this.review?.id as number,
        new Date(),
        this.commentContent
      ),
    });
  }
}
</script>

<style scoped></style>
