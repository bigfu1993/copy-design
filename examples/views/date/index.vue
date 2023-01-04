<template>
  <div class="c-date-wrap flex-row-start p20">
    <div class="left h100 flex-column-start">
      <c-date
        :value="date1"
        picker="year"
        format="YYYY"
        placeholder="请选择年份"
        @changed="handleTimeChanged"
      />
      <c-date
        :value="date1"
        picker="month"
        format="YYYY-MM"
        placeholder="请选择月份"
        @changed="handleTimeChanged"
      />
      <c-date
        :value="date1"
        picker="date"
        format="YYYY-MM-DD"
        placeholder="请选择日期"
        @changed="handleTimeChanged"
      />
      <c-date
        :value="date1"
        picker="week"
        format=""
        placeholder="请选择周"
        @changed="handleTimeChanged"
      />
      <c-date
        :value="date1"
        picker="time"
        format="YYYY-MM-DD HH:mm:ss"
        placeholder="请选择时间"
        @changed="handleTimeChanged"
      />
    </div>
    <div class="right h100 flex-column-start">
      <c-date
        :value="date2"
        mode="range"
        picker="year"
        format="YYYY"
        :placeholder="['开始年份', '结束年份']"
        @changed="handleRangeChanged"
      />
      <c-date
        :value="date2"
        mode="range"
        picker="month"
        format="YYYY-MM"
        :placeholder="['开始月份', '结束月份']"
        @changed="handleRangeChanged"
      />
      <c-date
        :value="date2"
        mode="range"
        picker="date"
        format="YYYY-MM-DD"
        :placeholder="['开始日期', '结束日期']"
        @changed="handleRangeChanged"
      />
      <c-date
        :value="date2"
        mode="range"
        picker="week"
        format=""
        :placeholder="['开始周', '结束周']"
        @changed="handleRangeChanged"
      />
      <c-date
        :value="date2"
        mode="range"
        picker="time"
        format="YYYY-MM-DD HH:mm:ss"
        :placeholder="['开始时间', '结束时间']"
        @changed="handleRangeChanged"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
export default defineComponent({
  setup() {
    let date1 = ref(dayjs("2022-12-16 16:20:45", "YYYY-MM-DD HH:mm:ss"));
    let date2 = ref([
      dayjs("2022-12-16 16:20:45", "YYYY-MM-DD HH:mm:ss"),
      dayjs("2023-06-16 18:20:45", "YYYY-MM-DD HH:mm:ss"),
    ]);
    function handleTimeChanged(e) {
      date1.value = e;
    }
    function handleRangeChanged(e) {
      date2.value = e;
    }
    return {
      date1,
      date2,
      handleTimeChanged,
      handleRangeChanged,
    };
  },
});
</script>

<style lang="less" scoped>
.c-date-wrap {
  flex-wrap: nowrap;
  width: 800px;
  height: 650px;
  background-color: #0b254d;
  .left {
    width: 35%;
    margin-right: 50px;
  }
  .right {
    width: 55%;
  }
  :deep(.c-date-container) {
    margin-bottom: 80px;
  }
}
</style>