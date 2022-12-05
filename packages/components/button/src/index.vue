<template>
  <div class="btn">
    <slot name="l"></slot>
    is button <slot name="default"></slot>
    <slot name="r"></slot>
  </div>
</template>

<script>
export default {
  name: "c-button",
};
</script>

<style lang="less" scoped>
.btn {
  color: #0000ff;
}
</style>