<template>
  <div class="header">
    <!-- この部分はヘッダー -->
    <nav>
      <div class="nav-wrapper blue-grey darken-4">
        <img class="logo" src="/img/logo.png" />
        <router-link class="brand-logo" to="/topPage">
          Rakus Films
        </router-link>
        <!-- この部分がハンバーガーメニュー -->
        <a
          href="#mobile-menu"
          class="sidenav-trigger"
          data-activates="mobile-menu"
        >
          <i class="material-icons" data-target="mobile-menu">menu</i>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><router-link to="/movieList">Movie List</router-link></li>
          <li><router-link to="/movieList2">Movie List2</router-link></li>
          <li><router-link to="/myPage">My Page</router-link></li>
          <li><router-link to="/login">Sign In</router-link></li>
        </ul>
      </div>
      <ul class="sidenav grey lighten-4" id="mobile-menu">
        <li><router-link to="/movieList">Movie List</router-link></li>
        <li><router-link to="/myPage">My Page</router-link></li>
        <li><router-link to="/login">Sign In</router-link></li>
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
.header {
  background-size: cover;
  text-shadow: 0 0 20px #00afec, 0 0 5px #00afec;
}
.logo {
  width: 100px;
  height: 62px;
}
</style>
