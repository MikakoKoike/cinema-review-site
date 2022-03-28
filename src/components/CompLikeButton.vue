<template>
  <div>
    <span class="likeBtn" v-on:click="countUp">
      Like👌<span>💗</span><span>{{ count }}</span>
    </span>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Review } from "@/types/review";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class CompLikeButton extends Vue {
  @Prop()
  private review?: Review;
  private count = 0;
  private dummy = 1;
  created(): void {
    this.count = this.review?.countLike as number;
    console.log(this.count);
  }
  countUp(): void {
    if (this.review !== undefined) {
      this.count++;
      this.$store.commit("addLike", {
        reviewId: this.review.id,
        movieId: this.review.movieId,
        countLike: this.count,
      });
    }
  }
}
</script>

<style scoped>
.likeBtn {
  padding: 10px 40px;
  margin: 20px;
  background-color: white;
  border: solid 1px;
  transition: all 0.3s;
  cursor: pointer;
}

.likeBtn:hover {
  background-color: rgba(0, 0, 0, 0.822);
  color: white;
  text-shadow: 0 0 20px #00afec, 0 0 5px #00afec;
  font-family: "Lucida Sans", Geneva, Verdana, sans-serif;
}
</style>
