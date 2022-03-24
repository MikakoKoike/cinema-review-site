<template>
  <div>
    <span class="btn" v-on:click="countUp">
      いいね！<span>♡</span><span>{{ count }}</span>
    </span>
    <div>
    </div>
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

<style scoped></style>
