<template>
  <div class="header">
      <!-- この部分はヘッダー -->
      <nav>
        <div class="nav-wrapper orange lighten-3">
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
        <ul class="sidenav grey light-2" id="mobile-menu">
           <router-link to="/mypage"><li>マイページ</li></router-link>
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
