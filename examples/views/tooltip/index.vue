<template>
  <div class="grid tooltip-wrapper">
    <div
      v-for="placement in placements"
      :key="placement"
    >
      <c-tooltip
        v-if="placement"
        title="placement title 111111111111111111111111111111111111"
        :placement="placement"
        trigger="hover"
      >
        <div :class="{ tips: placement }">
        {{ placement }}
        </div>
      </c-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  name: "exp-tooltip"
});
</script>
<script setup lang="ts">
const placements = [
  "", "topLeft", "top", "topRight", "",
  "leftTop", "", "", "", "rightTop",
  "left", "", "", "", "right",
  "leftBottom", "", "", "", "rightBottom",
  "", "bottomLeft", "bottom", "bottomRight", "",
];
</script>

<style scoped lang="less">
.tooltip-wrapper {
  grid-template-columns: repeat(5, 1fr);
  margin-left: 400px;
  .tips {
    text-align: center;
    border: 1px solid black;
    border-radius: 5px;
    padding: 6px 8px;
  }
}
</style>
