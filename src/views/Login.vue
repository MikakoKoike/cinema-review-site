<template>
  <div id="login">
    <div class="top-wrapper">
      <div class="container">
        <div class="row login-page">
          <div class="col s12 z-depth-6 card-panel">
            <!-- <div class="error">{{ errorMessage }}</div> -->
            <form class="login-form">
              <div class="row"></div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">mail_outline</i>
                  <input
                    class="validate"
                    id="mailAddress"
                    type="email"
                    v-model="email"
                  />
                  <label
                    for="mailAddress"
                    data-error="wrong"
                    data-success="right"
                    >メールアドレス</label
                  >
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock_outline</i>
                  <input id="password" type="password" v-model="password" />
                  <label for="password">パスワード</label>
                </div>
              </div>
              <div class="row login-btn">
                <div class="col s3">
                  <button
                    class="btn purple lighten-3"
                    type="button"
                    v-on:click="signIn"
                  >
                    <span>ログイン</span>
                  </button>
                </div>

                <!-- twitterでログイン -->
                <div class="col s3">
                  <div class="snsbtniti2">
                    <a class="flowbtn11 fl_tw1" v-on:click="twitterSignIn"
                      ><i class="fab fa-twitter"></i
                      ><span>Twitterでログイン</span></a
                    >
                  </div>
                </div>
                <!-- facebookでログイン -->
                <div
                  class="fb-login-button"
                  data-width=""
                  data-size="large"
                  data-button-type="login_with"
                  data-layout="default"
                  data-auto-logout-link="false"
                  data-use-continue-as="false"
                ></div>
              </div>
              <div class="row">
                <div class="input-field col s6 m6 l6">
                  <p class="margin medium-small">
                    <router-link to="/registerUser/"
                      >会員登録はこちら</router-link
                    >
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app, analytics } from "../main";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
@Component
export default class Login extends Vue {
  email = "";
  password = "";
  loginEmail = "";
  loginPassword = "";

  // async signUp(): Promise<void> {
  //   app;
  //   analytics;
  //   const auth = getAuth();

  //   try {
  //     const response = await createUserWithEmailAndPassword(
  //       auth,
  //       this.email,
  //       this.password
  //     );
  //     console.log(response);
  //     console.log(response.user);
  //     alert("登録されました。");
  //   } catch (error) {
  //     alert("エラーが発生");
  //   }
  // }
  // async signIn(): Promise<void> {
  //   const auth = getAuth();
  //   try {
  //     const response = await signInWithEmailAndPassword(
  //       auth,
  //       this.email,
  //       this.password
  //     );

  //     console.log(response);
  //     alert("登録されました。");
  //     console.log(response.user);
  //   } catch (error) {
  //     console.log(error);
  //     alert("エラーが発生");
  //   }
  // }
  // /**
  //  * twitterでログインする.
  //  */
  // async twitterSignIn(): Promise<void> {
  //   app;
  //   analytics;
  //   const auth = getAuth();
  //   const provider = new TwitterAuthProvider();

  //   try {
  //     await signInWithPopup(auth, provider).then((result) => {
  //       const credential = TwitterAuthProvider.credentialFromResult(result);
  //       console.log(result);
  //       console.log(credential);
  //       alert("ログイン成功!!");
  //       // signInWithRedirect(auth, provider).then((user) => {
  //       //   console.log(user);
  //       // })
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
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
        this.$store.commit("setLoginUser", {
          id: 5,
          name: result.user.displayName,
          email: result.user.email,
          password: "",
        });
        this.$router.push("/registerUser");
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
