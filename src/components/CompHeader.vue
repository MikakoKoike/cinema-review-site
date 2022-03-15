<template>
  <div class="header">
      <!-- この部分はヘッダー -->
      <nav>
        <div class="nav-wrapper indigo lighten-4">
          <a href="#" class="brand-logo">Title</a>
          <!-- この部分がハンバーガーメニュー -->
          <a href="#mobile-menu" class="sidenav-trigger" data-activates="mobile-menu">
            <i class="material-icons"  data-target="mobile-menu">menu</i>
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="#">My Page</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <ul class="sidenav grey lighten-4" id="mobile-menu">
           <li><router-link to="/mypage">マイページ</router-link></li>
           <li><router-link to="/login">ログイン</router-link></li>
           <li><router-link to="/logout">ログアウト</router-link></li>
         </ul>
      </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class CompHeader extends Vue {}
</script>

<style scoped>
.header{
  background: url(/img/bakery-1868925_1920.jpg);
  background-size: cover;
}
</style>
