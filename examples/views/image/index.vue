<template>
  <div class="image-wrapper">
    <c-image
        url="https://192.168.1.153/store/data/pictures/1_4_a38180ca665811ed8adc0242ac140065.jpg"
        :preview="{ show: true }"
        :type="1"
    ></c-image>
  </div>
</template>

<script>
export default {
  name: "exp-image"
}
</script>

<style scoped>
.image-wrapper {
  width: 600px;
  height: 400px;
  margin-left: 600px;
}
</style>
