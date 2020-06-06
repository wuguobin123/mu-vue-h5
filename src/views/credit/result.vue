<template>
  <div>
    <div>
      <KuStatus
        :imgUrl="imgUrl"
        title="授信申请处理中"
        content="将有工作人员联系您完成授信申请流程，请保持电话畅通"
        v-if="status === 1"
      >
        <h4>产品授信流程：</h4>
        <ul>
          <li>提交授信申请</li>
          <li>线下面签，签署相关协议</li>
          <li>资质审核</li>
          <li>授信结果</li>
        </ul>
      </KuStatus>
      <KuStatus
        imgUrl="sorry-icon.png"
        title="综合评分不足，授信失败"
        v-else-if="status === 2"
      ></KuStatus>
      <KuStatus
        :imgUrl="imgUrl"
        title="授信申请处理中"
        content="授信结果将以短信形式通知您，请您耐心等待"
        v-else-if="status === 3"
      ></KuStatus>
      <KuStatus
        imgUrl="sorroy-icon.png"
        title="抱歉，此产品仅对名单内用户开放"
        content="如有疑问请联系相关工作人员"
        v-else
      ></KuStatus>
    </div>
  </div>
</template>

<script>
import KuStatus from "../../components/kuui/status";
export default {
  data() {
    return {
      status: 1,
      imgUrl: "audit-icon.png"
    };
  },
  components: {
    KuStatus
  }
};
</script>

<style lang="scss" scoped>
$font-name: PingFangSC-Regular;
h4 {
  font-family: $font-name;
  font-size: 28px;
  color: #303236;
  letter-spacing: 0;
  margin: 130px 0px 47px 0px;
  span {
    font-family: $font-name;
    font-size: 28px;
    color: #5888f5;
    letter-spacing: 0;
    text-align: center;
    line-height: 40px;
    text-decoration: underline;
  }
}
ul li {
  font-family: $font-name;
  font-size: 26px;
  color: #5b5e66;
  letter-spacing: 0;
  margin-bottom: 18px;
  position: relative;
  padding-left: 20px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 30%;
    display: table;
    width: 10px;
    height: 10px;
    background: #5888f5;
    border-radius: 50%;
  }
}
</style>
