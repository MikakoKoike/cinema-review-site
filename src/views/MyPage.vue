<template>
  <div class="mypage">
    <div class="container">
      <div class="movie-card row z-depth-3">
        <div class="row">
          <div class="col s12 card-content">
            <h4>My Page</h4>
            <p>ここにテキストが入ります。</p>
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
              <div
                class="my-movie-cred"
                v-for="movie of myMovieList"
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
              <p>
                ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
              </p>
              <p>
                ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
              </p>
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
  private currentUserList = new Array<User>();
  private loginUser = new User(
    0,
    "",
    "",
    "",
    new Array<Movie>(),
    new Array<Review>(),
    new Array<Comment>()
  );
  private myMovieList = new Array<Movie>();

  created(): void {
    this.$store.dispatch("asyncGetUserList");
    this.currentUserList = this.$store.getters.getUserList;

    this.myMovieList = this.$store.getters.getCurrentUser.myMovieList;
  }
  mounted(): void {
    //cdnのインストールが必要。mountedだとタイミングが合わないので、時間をずらした。
    setTimeout(() => {
      M.AutoInit();
    }, 200);
  }
}
</script>

<style scoped>
.movie-card {
  background-color: white;
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 10px;
  padding: 0 5px;
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
.movie-img-area{
  margin: 20px 0;
  text-align: center;
}
</style>
