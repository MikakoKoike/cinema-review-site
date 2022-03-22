<template>
  <div>
    <span  class="btn" v-on:click="countUp">
      いいね！<span >♡</span
      ><span>{{ review.countLike }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { Review } from "@/types/review";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class CompLikeButton extends Vue {
  @Prop()
  private review?:Review;
  private count = 0;
  created(): void{
    this.count = this.review?.countLike as number
  }
  countUp():void{
    console.log(this.review);
    if(!(this.review === undefined)){
      this.count++;
      this.$store.commit("", {
        
      })
    }
  }
}
</script>

<style scoped></style>
