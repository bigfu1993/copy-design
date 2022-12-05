<template>
  <div>
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

</style>