<template>
  <div>
    <span class="btn" v-on:click="countUp">
      いいね！<span>♡</span><span>{{ review.countLike }}</span>
    </span>
    <div>
      <span>{{ dummy }}</span>
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
    console.log(this.review?.countLike);
    this.count = this.review?.countLike as number;
  }
  countUp(): void {
    this.dummy++;
    console.log(this.review);
    if (this.review !== undefined) {
      this.count++;
      console.log(this.count);
      this.$store.commit("addLike", {
        movieId: this.review.movieId,
        countLike: this.count,
      });
    }
  }
}
</script>

<style scoped></style>
