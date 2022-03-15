<template>
  <div id="app">
    <div id="nav">
      <CompHeader />
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
import M from "materialize-css/dist/js/materialize.min";
import CompHeader from "@/components/CompHeader.vue"

@Component({
  components: {
    CompHeader
  },
})
export default class App extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    //cdnのインストールが必要。mountedだとタイミングが合わないので、時間をずらした。
    setTimeout(() => {
      M.AutoInit();
    }, 100);
  }
}
</script>
<style scoped>

</style>
