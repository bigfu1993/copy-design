<template>
    <div class="message-demo">
        <div @click="openMessage">message</div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'message-demo'
}
</script>
<script lang="ts" setup>
import { Message, File, Encrypt } from '#/index'
function openMessage() {
    Message('abc')
} 
</script>

<style lang="scss" scoped>

</style>