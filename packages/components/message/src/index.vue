<template>
    <div class="c-message">
        this is pop message
    </div>
</template>

<script lang="ts">
export default { name: 'c-message' }
</script>

<script setup lang="ts">

</script>
<style lang="less" scoped>
.c-message {
    position: absolute;
    left: 50%;
    top: 50px;
    transform: translateX(-50%);
}
</style>