<template>
  <div class="video-wrapper">
    <c-video url="https://192.168.1.153/stream/1/41.flv" :player-opts="{ decoder: './public/decoder.js' }"></c-video>
  </div>
</template>

<script>

export default {
  name: "exp-video",
}
</script>

<style scoped lang="less">
.video-wrapper {
  height: 300px;
  width: 500px;
}
</style>
