<template>
  <div>
    <h3>会員登録</h3>
    <div class="container">
      <form action="">
        <div class="row">
          <div class="input-field col s12 login-form">
            <i class="material-icons prefix">person</i>
            <div class="error">{{ userNameError }}</div>
            <input type="text" id="userName" v-model="userName" />
            <label for="userName" data-error="wrong" data-success="right" v-bind:class="{ active: isActive }"
              >ユーザーネーム</label
            >
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12 login-form">
            <i class="material-icons prefix">mail_outline</i>
            <div class="error">{{ emailError }}</div>
            <input type="email" id="email" v-model="email" />
            <label for="email" data-error="wrong" data-success="right"
              >メールアドレス</label
            >
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock_outline</i>
            <div class="error">{{ passwordError }}</div>
            <input type="password" id="password" v-model="password" />
            <label for="password" data-error="wrong" data-success="right"
              >パスワード</label
            >
          </div>
        </div>
      </form>
      <a
        class="waves-light btn register-btn purple lighten-3"
        v-on:click="registerUser"
        >登録</a
      >
      <!-- Page Content goes here -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Register extends Vue {
  //ユーザーネーム
  private userName = this.$store.getters.getDisplayName;

  //ユーザーネームエラーメッセージ
  private userNameError = "";
  //メールアドレス
  private email = "";
  //メールアドレス エラーメッセージ
  private emailError = "";
  //パスワード
  private password = "";
  //パスワードエラーメッセージ
  private passwordError = "";
  //activeフラグ
  private isActive = false;
  created(): void{
    this.isActive = true;
  }
  /**
   * ユーザー登録をする.
   */
  registerUser(): void {
    //ユーザーネームのエラー
    if (this.userName === "") {
      this.userNameError = "ユーザーネームを入力してください";
    }
    //メールアドレスのエラーメッセージ
    if (this.email === "") {
      this.emailError = "メールアドレスを入力してください";
    }
    //パスワードのエラーメッセージ
    if (this.password === "") {
      this.passwordError = "パスワードを入力してください";
    } else if (this.password.length < 6 || this.password.length > 12) {
      this.passwordError = "パスワードは6文字以上12文字以下で入力してください";
    }
    //映画一覧へ遷移
    this.$router.push("/movieList");
  }
}
</script>

<style scoped>
.error {
  color: red;
}
h3 {
  text-align: center;
}
.btn {
  text-align: center;
  margin-left: 50%;
  margin-bottom: 20px;
}
</style>
