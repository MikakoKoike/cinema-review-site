/* eslint-disable @typescript-eslint/no-empty-function */
<template>
  <div class="home">
    <h1>登録画面</h1>
    <div>
      <span>メールドレス</span>
      <input type="email" v-model="email" />
    </div>
    <div>
      <span>パスワード</span>
      <input type="password" v-model="password" />
    </div>
    <div>
      <button v-on:click="signUp">登録する</button>
    </div>
    <h1>ログイン画面</h1>
    <div>
      <span>メールドレス</span>
      <input type="email" v-model="loginEmail" />
    </div>
    <div>
      <span>パスワード</span>
      <input type="password" v-model="loginPassword" />
    </div>
    <div>
      <button v-on:click="signIn">ログインする</button>
    </div>
    <br />
    <br />
    <button v-on:click="twitterSignIn">Twitterサインイン</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  TwitterAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app, analytics } from "../main";

@Component({})
export default class Home extends Vue {
  email = "";
  password = "";
  loginEmail = "";
  loginPassword = "";
  private count = this.$store.getters.getCount;

  onCkick(): void {
    this.count++;
    this.$store.commit("countUp", {
      count: this.count,
    });
  }

  async signUp(): Promise<void> {
    app;
    analytics;
    const auth = getAuth();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
      console.log(response);
      console.log(response.user);
      alert("登録されました。");
    } catch (error) {
      alert("エラーが発生");
    }
  }

  async signIn(): Promise<void> {
    const auth = getAuth();

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        this.loginEmail,
        this.loginPassword
      );
      console.log(response);
      alert("登録されました。");
      console.log(response.user);
    } catch (error) {
      console.log(error);
      alert("エラーが発生");
    }
  }

  async twitterSignIn(): Promise<void> {
    app;
    analytics;
    const auth = getAuth();
    const provider = new TwitterAuthProvider();

    try {
      await signInWithPopup(auth, provider).then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        console.log(result);
        console.log(credential);
        alert("ログイン成功!!");
        // signInWithRedirect(auth, provider).then((user) => {
        //   console.log(user);
        // })
      });
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
<style scoped>
@import url("/css/login.css");
</style>
