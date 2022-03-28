<template>
  <div>
    <div class="topimage">
      <img src="/img/topimage1.jpg" class="responsive-img" />
      <span>Record Your Moment.</span>
      <p>one click to record your favorite movies</p>
      <router-link to="/movieList2" class="btn">
        <a href="#">さあ、始めよう</a>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped>
/* @import url("/css/topPage.css"); */

.topimage {
  position: relative;
  display: flex;

  /* background-image: url(/img/topimage1.jpg); */
  /* 背景画像設定 */
}
.topimage span {
  position: absolute;
  color: white;
  font-size: 40px;
  margin-top: 200px;
  /* text-align: center; */
  margin-left: 50%;
}
.topimage p {
  position: absolute;
  font-size: 20px;
  margin-top: 260px;
  margin-left: 50%;

  /* margin-left: 60%; */
  color: white;
}
div {
  position: relative;
}

.btn {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  background: #000;
  /* margin-left: 310px; */
  margin-top: 300px;
  margin-left: 50%;
}

.btn a {
  /* position: absolute; */
  margin: 0 15px;
  padding: 10px 30px;
  color: #ff21f4bd;
  text-decoration: none;
  font-size: 18px;
  letter-spacing: 3px;
  overflow: hidden;
  transition: 0.5s;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
}

.btn a:hover {
  background: #ff21f4;
  color: #000;
  box-shadow: 0 0 50px #ff21f4;
  transition-delay: 0.5s;
}
</style>
