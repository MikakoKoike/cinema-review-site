<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  created(): void {
    this.$router.push(`/movieDetail/${this.$store.getters.getCurrentMovieId}`);
  }
}
</script>

<style scoped></style>
