<template>
  <div>
    this is root page
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "root",
  mounted: () => {
    // document.querySelector(':root').style.setProperty('--theme', '#ff0000')
  }
};
</script>

<style lang="less" scoped>

</style>