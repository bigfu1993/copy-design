<template>
  <div class="c-date-container w100">
    <a-date-picker
      class="w100"
      :value="value"
      :locale="locale"
      :format="format"
      :picker="picker == 'time' ? '' : picker"
      :show-time="picker == 'time' ? { format: format } : false"
      :placeholder="placeholder"
      @change="(e) => $emit('changed', e)"
      v-if="mode == 'date'"
    />
    <a-range-picker
      class="w100"
      :value="value"
      :locale="locale"
      :format="format"
      :picker="picker == 'time' ? '' : picker"
      :show-time="picker == 'time' ? { format: format } : false"
      :placeholder="placeholder"
      @change="(e) => $emit('changed', e)"
      v-if="mode == 'range'"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
export default defineComponent({
  name: "c-date",
  props: {
    value: {
      type: Object,
      default: "", // 时间值
    },
    mode: {
      type: String,
      default: "date", // 选择器类型 date单个时间 range时间范围
    },
    picker: {
      type: String,
      default: "time", // 时间类型 year | month | date | week | time
    },
    placeholder: {
      type: [String, Array],
      default: "", // 默认内容
    },
    format: {
      type: String,
      default: "YYYY-MM-DD HH:mm:ss", // 时间格式
    },
  },
  emits: ["changed"],
  setup() {
    return {
      locale,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./css/scoped.less";
</style>
<style lang="less">
@import "./css/index.less";
</style>