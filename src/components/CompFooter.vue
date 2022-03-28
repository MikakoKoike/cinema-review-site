<template>
  <div class="footer-area">
    <footer class="page-footer indigo lighten-4">
      <!-- <div class="container">
        <div class="row">
          <div class="col s12 l6">
            <h5>タイトル</h5>
            <p>
              ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
            </p>
            <p>
              ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
            </p>
          </div>
          <div class="col s12 l4 l4 offset-l2">
            <h5>タイトル</h5>
            <ul>
              <li class="grey-text text-lighten-3">
                ここにテキストが入ります。
              </li>
              <li class="grey-text text-lighten-3">
                ここにテキストが入ります。
              </li>
            </ul>
          </div>
        </div>
      </div> -->
      <div class="footer-copyright grey darken-4">
        <div class="container center-align">
          &copy; 2022 RakusFilm CORPORATION. ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class CompFooter extends Vue {}
</script>

<style scoped>
footer {
  padding-top: 0;
}
</style>
