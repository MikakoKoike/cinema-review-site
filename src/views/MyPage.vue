<template>
  <div class="mypage">
    <div class="container">
      <div class="movie-card row z-depth-3">
        <div class="col s3 card-content movie-img"></div>
        <div class="col s9 card-content"></div>
        <div class="col s6 card-content">
          <h4>Sub Title</h4>
        </div>
        <div class="col s6 card-content">
          <h4>Sub Title</h4>
        </div>
      </div>

      <div class="review-card z-depth-3">
        <div class="row">
          <div class="col s2 review-header">
            <img
              src="https://joeschmoe.io/api/v1/random"
              class="responsive-img profile-img"
            />
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class MyPage extends Vue {}
</script>

<style scoped>
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
  height: 280px;
  border-radius: 10px;
  margin-left: 10px;
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
</style>
