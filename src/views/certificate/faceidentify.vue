<template>
  <div class="outer-layout">
    <img :src="require('../../assets/imgs/face-intro.png')" />
    <label class="bottom-box" for="takeVideoId">
      <div class="disable-click">开始拍摄视频</div>
      <input
        type="file"
        accept="video/*"
        id="takeVideoId"
        capture="camcorder"
        name="faceFile"
        @change="submitVedio($event)"
      />
    </label>
  </div>
</template>

<script>
import { faceValidate } from "../../services/user";
export default {
  data() {
    return {
      identityType: this.$route.query.type
    };
  },
  methods: {
    submitVedio(e) {
      let file = e.target.files[0];
      let formdata = new FormData();
      formdata.append("video", file);
      faceValidate(formdata, this.identityType).then(res => {
        let { code } = res;
        if ("0" === code) {
          this.$router.push({
            path: "/certificate/infolist"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Medium;
.outer-layout {
  img {
    width: 100%;
    height: 100%;
  }
  .bottom-box {
    position: fixed;
    bottom: 0px;
    padding: 0px 64px 30px 64px;
    display: block;
    div {
      width: 622px;
      height: 98px;
      font-family: $font-name;
      font-size: 30px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      line-height: 98px;
      border-radius: 6px;
      background: #5888f5;
    }
    input {
      appearance: none;
      opacity: 0;
      display: none;
    }
  }
}
</style>
