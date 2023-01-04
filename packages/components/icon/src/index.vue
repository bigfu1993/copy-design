<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#icon-${name}`"></use>
  </svg>
</template>

<script lang="ts">
export default { name: "c-icon", };
</script>
<script setup lang="ts" >
import "#/assets/font/iconfont/iconfont.js";
let props = defineProps({
  name: {
    type: String,
    default: ""
  }
})
</script>
<style lang="less">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
