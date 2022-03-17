<template>
  <div class="mypage">
    <div class="container">
      <div class="movie-card row z-depth-3">
        <div class="col s3 card-content movie-img"></div>
        <div class="col s9 card-content"></div>
        <div class="row">
        <div class="col s12">
        <ul class="tabs">
          <li class="tab col s6">
            <a href="#eatin" class="indigo-text text-darken4">eat in</a>
          </li>
          <li class="tab col s6">
            <a href="#takeout" class="indigo-text text-darken4">take out</a>
          </li>
        </ul>
        <div class="col s12" id="eatin">
            <p class="flow-text indigo-text text-darken4" id="eatin">EAT IN</p>
            <p>ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。</p>
            <p>ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。</p>
        </div>
        <div class="col s12" id="takeout">
            <p class="flow-text indigo-text text-darken4 offset-s12" id="takeout">TAKE OUT</p>
            <p>ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。</p>
            <p>ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。</p>
        </div>
      </div>
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
