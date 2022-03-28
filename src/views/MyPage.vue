<template>
  <div class="mypage">
    <div class="container">
      <div class="movie-card row z-depth-3">
        <div class="row">
          <div class="col s12 card-content">
            <h4>My Page</h4>
            <div class="row">
              <div class="col s3">
                <img v-bind:src="iconImage" class="profile-img-area" />
                <!-- Modal Trigger -->
                <a class="waves-light btn modal-trigger" href="#modal1"
                  >アイコンを変更する</a
                >
                <!-- Modal Structure -->
                <div id="modal1" class="modal">
                  <div class="modal-content">
                    <h4>アイコンを選択する</h4>
                    <img
                      class="icon-img"
                      src="/img/turningRed.jpg"
                      v-on:click="option1"
                    />
                    <img
                      class="icon-img"
                      src="/img/batman.jpg"
                      v-on:click="option2"
                    />
                    <img
                      class="icon-img"
                      src="/img/doctorstrange.jpg"
                      v-on:click="option3"
                    />
                    <img
                      class="icon-img"
                      src="/img/rednotice.jpg"
                      v-on:click="option4"
                    />
                    <img
                      class="icon-img"
                      src="/img/scream.jpg"
                      v-on:click="option5"
                    />
                    <img
                      class="icon-img"
                      src="/img/spiderman.jpg"
                      v-on:click="option6"
                    />
                    <img
                      class="icon-img"
                      src="/img/sing2.jpeg"
                      v-on:click="option7"
                    />
                    <img
                      class="icon-img"
                      src="/img/encanto.jpg"
                      v-on:click="option8"
                    />
                    <img
                      class="icon-img"
                      src="/img/blacklight.jpg"
                      v-on:click="option9"
                    />
                    <img
                      class="icon-img"
                      src="/img/kimi.jpg"
                      v-on:click="option10"
                    />
                    <img
                      class="icon-img"
                      src="/img/dombledore.jpg"
                      v-on:click="option11"
                    />
                    <img
                      class="icon-img"
                      src="/img/avatar.png"
                      v-on:click="option12"
                    />
                  </div>
                  <div class="modal-footer">
                    <a
                      href="#!"
                      class="modal-close waves-effect waves-green btn-flat"
                      >戻る</a
                    >
                  </div>
                </div>
              </div>
              <div class="col s9">
                <p>ユーザー名</p>
                <h4>{{ currentUser.displayName }}</h4>
                <p>紹介文</p>
                <h5>{{ currentUser.introContent }}</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s6">
                <a href="#myMovieList" class="indigo-text text-darken4"
                  >Movie</a
                >
              </li>
              <li class="tab col s6">
                <a href="#myReviewList" class="indigo-text text-darken4"
                  >Review</a
                >
              </li>
            </ul>
            <div class="col s12" id="myMovieList">
              <p class="flow-text indigo-text text-darken4" id="eatin">
                My Movie List
              </p>
              <p class="message">{{ messageMovie }}</p>
              <div
                class="my-movie-cred"
                v-for="(movie, index) of myMovieList"
                v-bind:key="movie.id"
              >
                <div class="row">
                  <div class="col s3 movie-img-area">
                    <img
                      v-bind:src="
                        'https://image.tmdb.org/t/p/w92' + movie.poster_path
                      "
                    />
                  </div>
                  <div class="col s9 movie-info-area">
                    <h4>{{ movie.title }}</h4>
                    <p>{{ movie.overview }}</p>
                  </div>
                  <div class="col s2 offset-s10 delete-button">
                    <span
                      class="btn-small indigo lighten-3"
                      v-on:click="deleteMovie(index)"
                      >削除</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="col s12" id="myReviewList">
              <p
                class="flow-text indigo-text text-darken4 offset-s12"
                id="takeout"
              >
                My Leview List
              </p>
              <p class="message">{{ messageReview }}</p>
              <div
                class="my-review-card"
                v-for="review of myReviewList"
                v-bind:key="review.id"
              >
                <div class="row">
                  <div class="col s3 movie-img-area">
                    <img
                      v-bind:src="
                        'https://image.tmdb.org/t/p/w92' +
                        review.getMovieByID(review.movieId, movieList)
                          .poster_path
                      "
                    />
                  </div>
                  <div class="col s9 review-info-area">
                    <p>
                      レビューした映画:
                      {{ review.getMovieByID(review.movieId, movieList).title }}
                    </p>
                    <p>日時: {{ review.formatDate }}</p>
                    <p>内容: {{ review.content }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import M from "materialize-css";
import { User } from "@/types/user";
import { Movie } from "@/types/movie";
import { Review } from "@/types/review";
import { Comment } from "@/types/comment";

@Component
export default class MyPage extends Vue {
  private iconImage = this.$store.getters.getCurrentUserIconPath;
  private currentUserList = new Array<User>();
  private currentUser = new User(
    0,
    "",
    "",
    "",
    new Array<Movie>(),
    new Array<Review>(),
    new Array<Comment>(),
    "",
    ""
  );
  private myMovieList = new Array<Movie>();
  private myReviewList = new Array<Review>();
  private messageReview = "";
  private messageMovie = "";
  created(): void {
    this.currentUserList = this.$store.getters.getUserList;
    this.myMovieList = this.$store.getters.getCurrentUser.myMovieList;
    this.myReviewList = this.$store.getters.getCurrentUser.myReviewList;
    this.currentUser = this.$store.getters.getCurrentUser;
    if(this.myMovieList.length === 0){
      this.messageMovie = "保存されたMovieがありません。"
    }
    if( this.myReviewList.length === 0 ){
      this.messageReview = "保存されたレビューがありません。"
    }
  }
  mounted(): void {
    //cdnのインストールが必要。mountedだとタイミングが合わないので、時間をずらした。
    setTimeout(() => {
      M.AutoInit();
    }, 200);
  }
  get movieList(): Array<Movie> {
    return this.$store.getters.getMovieList;
  }
  deleteMovie(index: number): void {
    this.$store.commit("deleteMovieFromReviewList", {
      index: index,
    });
  }
  /**
   * アイコンを選択する.
   */

  option1(): void {
    this.iconImage = "/img/turningRed.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option2(): void {
    this.iconImage = "/img/batman.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option3(): void {
    this.iconImage = "/img/doctorstrange.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option4(): void {
    this.iconImage = "/img/rednotice.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option5(): void {
    this.iconImage = "/img/scream.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option6(): void {
    this.iconImage = "/img/spiderman.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option7(): void {
    this.iconImage = "/img/sing2.jpeg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option8(): void {
    this.iconImage = "/img/encanto.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option9(): void {
    this.iconImage = "/img/blacklight.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option10(): void {
    this.iconImage = "/img/kimi.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option11(): void {
    this.iconImage = "/img/dombledore.jpg";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
  option12(): void {
    this.iconImage = "/img/avatar.png";
    this.$store.commit("setCurrentUserIconPath", {
      iconPath: this.iconImage,
    });
  }
}
</script>

<style scoped>
.movie-card {
  background-color: white;
  /* background-color: rgba(0, 0, 0, 0.822); */
  /* background-color: #2f303a; */
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  padding: 0 5px;
  color: black;
  margin-top: 12vh;
  margin-bottom: 30vh;
}
.card-content {
  height: 250px;
  border-radius: 10px;
  margin: 5px 0;
}
.movie-img {
  margin-top: 5px;
  text-align: center;
}
.review-card {
  background-color: white;
  width: 100%;
  height: 280px;
  border-radius: 10px;
  margin-left: 10px;
}
.review-header {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.profile-img {
  border-radius: 1000px;
  width: 80px;
}
.comment-card {
  background-color: white;
  margin-left: 10px;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  border: 5px solid #f5f6fa;
  margin: 5px 20px;
}
.my-movie-cred {
  background-color: bisque;
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.movie-img-area {
  margin: 20px 0;
  text-align: center;
}
.my-review-card {
  background-color: bisque;
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.profile-img-area {
  width: 150px;
  border-radius: 1000px;
  border: 5px solid #bfe1ee;
  text-shadow: 0 0 20px #bfe1ee, 0 0 5px #bfe1ee;
}
.delete-button {
  text-align: center;
  margin-bottom: 10px;
}
.tabs .indicator {
  background-color: none;
}
.tabs .tab a.active {
  background: transparent;
}
.tabs .tab a:hover {
  background-color: #eee;
} /*Text color on hover*/
.icon-img {
  border-radius: 50%;
  width: 150px;
  border: 2px solid gray;
}
.message {
  text-align: center;
}
</style>
