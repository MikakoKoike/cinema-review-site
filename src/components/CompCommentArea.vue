<template>
  <div class="comment-area">
    <button type="button" class="commentBtn" @click="showComment">
      Commentð£ï¸
    </button>
    <div class="commentBox" v-if="commentFlag">
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        v-model="commentContent"
      ></textarea>
      <button type="button" @click="addComment" class="commentBtn">Send</button>
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
  // ã³ã¡ã³ããã¿ã³
  private commentFlag = false;
  // ã³ã¡ã³ã
  private commentContent = "";
  //ã­ã°ã¤ã³ãã¦ããã¦ã¼ã¶ã¼
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

  // ã³ã¡ã³ãID
  private commentId = 0;
  created(): void {
    this.currentUser = this.$store.getters.getCurrentUser;
  }
  /**
   * ã³ã¡ã³ãå¥åæ¬ãè¡¨ç¤ºãã
   */
  showComment(): void {
    if (this.commentFlag === false) {
      this.commentFlag = true;
    } else if (this.commentFlag === true) {
      this.commentFlag = false;
    }
  }
  /**
   * ã³ã¡ã³ãæç¨¿
   */
  addComment(): void {
    // IDã®æ¡çª
    let newId = 0;

    if (this.currentUser.myCommentList.length !== 0) {
      newId = Number(this.currentUser.myCommentList[0].id) + 1;
    }

    this.commentId = newId;

    alert("ã³ã¡ã³ãæç¨¿");
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

<style scoped>
textarea {
  border-radius: 10px;
}

/* ã³ã¡ã³ããã¿ã³ */
.commentBtn {
  padding: 10px 40px;
  margin: 20px;
  background-color: white;
  border: solid 1px;
  transition: all 0.3s;
  cursor: pointer;
}

.commentBtn:hover {
  background-color: rgba(0, 0, 0, 0.822);
  color: white;
  text-shadow: 0 0 20px #00afec, 0 0 5px #00afec;
  font-family: "Lucida Sans", Geneva, Verdana, sans-serif;
}
</style>
