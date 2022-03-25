<template>
  <div class="theaters">
    <div class="container">
      <h2>Theater List</h2>
      <div
        class="row theater-card z-depth-3"
        v-for="(theater, index) of theaters"
        v-bind:key="index"
      >
        <div class="col s12 place-title">
          {{ theater.place }}
        </div>
        <div class="col s12">
          {{ theater.startDate }} ~ {{ theater.endDate }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TimeList } from "@/types/timeList";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  private theaters = new Array<TimeList>();
  private timeListByPlace = [
    { theater: "", timeList: [{ startDate: "", endDate: "" }] },
  ];

  async created(): Promise<void> {
    const response = await axios.get<{ theaters: Array<TimeList> }>(
      "https://demo7166221.mockable.io/review-site"
    );
    this.theaters = response.data.theaters;
    this.setTimeListByPlace();
  }

  /**
   * 場所ごとの時間リストを作るメソッド.
   */
  setTimeListByPlace(): void {
    this.timeListByPlace.splice(0, 1);
    for (let theaterData of this.theaters) {
      let newObject = {
        theater: "",
        timeList: [
          {
            startDate: "",
            endDate: "",
          },
        ],
      };
      if (this.timeListByPlace.length === 0) {
        newObject.theater = theaterData.place;
        newObject.timeList.push({
          startDate: theaterData.startDate,
          endDate: theaterData.startDate,
        });
        this.timeListByPlace.push(newObject);
      } else {
        for (let i = 0; i < this.timeListByPlace.length; i++) {
          if (this.timeListByPlace[i].theater === theaterData.place) {
            this.timeListByPlace[i].timeList.push({
              startDate: theaterData.startDate,
              endDate: theaterData.startDate,
            });
          } else {
            newObject.theater = theaterData.place;
            newObject.timeList.push({
              startDate: theaterData.startDate,
              endDate: theaterData.startDate,
            });
            this.timeListByPlace.push(newObject);
          }
        }
      }
      console.log("   3   ", this.timeListByPlace);
    }
  }
}
</script>

<style scoped>
.theater-card {
  background-color: white;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  margin: 10px;
}
.place-title {
  margin: 10px;
  border-left: 5px solid gray;
}
</style>
