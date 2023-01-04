<template>
  <div class="c-input-wrap flex-row-start-between p10">
    <div class="left flex-column-start-between">
      <div class="flex-row-center-between">
        <c-input
          size="small"
          :value="data"
          placeholder="请输入..."
          @confirmed="handleConfirmed"
          @blur="handleConfirmed"
        />&nbsp;&nbsp;&nbsp;<span>small</span>
      </div>
      <div class="flex-row-center-between">
        <c-input
          :value="data"
          placeholder="请输入关键词..."
          @confirmed="handleConfirmed"
          @blur="handleConfirmed"
        />&nbsp;&nbsp;&nbsp;<span>normal</span>
      </div>
      <div class="flex-row-center-between">
        <c-input
          size="large"
          :value="data"
          @confirmed="handleConfirmed"
          @blur="handleConfirmed"
        />&nbsp;&nbsp;&nbsp;<span>large</span>
      </div>
    </div>
    <div class="right flex-column-start-between">
      <div class="flex-row-center-between">
        <c-input
          size="small"
          :value="data"
          :enterButton="false"
          placeholder="请输入..."
          @confirmed="handleConfirmed"
          @blur="handleConfirmed"
        />&nbsp;&nbsp;&nbsp;<span>nobtn</span>
      </div>
      <div class="flex-row-center-between">
        <c-input
          size="small"
          :value="data"
          :disabled="true"
          placeholder="请输入..."
          @confirmed="handleConfirmed"
          @blur="handleConfirmed"
        />&nbsp;&nbsp;&nbsp;<span>disabled</span>
      </div>
      <div class="flex-row-center-between">
        <c-input
          size="small"
          :value="data1"
          :range="[0, 5]"
          placeholder="请输入..."
          @update:value="(e) => (data1 = e)"
          @confirmed="handleConfirmed"
          @blur="handleConfirmed"
        />&nbsp;&nbsp;&nbsp;<span>range</span>
      </div>
    </div>
    <div class="line w100 mtb20"></div>
    <div class="bottom flex-column-start-between">
      <div class="flex-row-center-between">
        <c-input
          :value="data"
          type="number"
          :range="[0, 3]"
          placeholder="请输入关键词..."
          @update:value="(e) => (data = e)"
          @confirmed="handleConfirmed"
          @blur="handleConfirmed"
        />&nbsp;&nbsp;&nbsp;<span>number</span>
      </div>
      <div class="flex-row-center-between">
        <c-input
          :value="data"
          type="password"
          :range="[0, 3]"
          placeholder="请输入关键词..."
          @update:value="(e) => (data = e)"
          @confirmed="handleConfirmed"
          @blur="handleConfirmed"
        />&nbsp;&nbsp;&nbsp;<span>password</span>
      </div>
      <div class="flex-row-center-between">
        <c-input
          type="textarea"
          :value="data2"
          :max="30"
          :required="true"
          placeholder="请输入..."
          @update:value="(e) => (data2 = e)"
          @confirmed="handleConfirmed"
          @blur="handleConfirmed"
        />&nbsp;&nbsp;&nbsp;<span>textarea</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let data = ref("");
    let data1 = ref("");
    let data2 = ref("");

    function handleConfirmed(e) {
      // console.log(e, 2222222222);
    }

    return {
      data,
      data1,
      data2,
      handleConfirmed,
    };
  },
});
</script>

<style lang="less" scoped>
.c-input-wrap {
  width: 640px;
  height: 600px;
  flex-wrap: wrap;
  background-color: #0b254d;
  .left,
  .right {
    width: 45%;
    height: 40%;
    flex-wrap: nowrap;
    > div {
      width: 100%;
      > span {
        flex-shrink: 0;
        width: 55px;
        text-align: right;
        color: #fff;
      }
    }
  }
  .bottom {
    width: 60%;
    height: 40%;
    > div {
      width: 100%;
      > span {
        flex-shrink: 0;
        width: 65px;
        text-align: right;
        color: #fff;
      }
    }
  }
  .line {
    border: 1px solid #ccc;
  }
}
</style>