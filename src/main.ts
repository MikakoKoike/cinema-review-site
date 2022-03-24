import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwm0EZ85hs4xmqtM1Yl8plonl3tLbURX0",
  authDomain: "movie-site-project-e9432.firebaseapp.com",
  projectId: "movie-site-project-e9432",
  storageBucket: "movie-site-project-e9432.appspot.com",
  messagingSenderId: "1092458822392",
  appId: "1:1092458822392:web:52842eff8f850deff8d90d",
  measurementId: "G-B72707EYRR",
};

export const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
