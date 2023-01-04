<template>
    <div class="progress-box">
        <div class="progress">
            <c-progress :percent="50" width="100"></c-progress>
        </div>
        <div class="progress-circle flex mt10">
            <c-progress class="ml10" :percent="50" width="100" mode="circle"></c-progress>
            <c-progress class="ml10" :textShow="false" :percent="50" width="110" mode="circle" strokeWidth="12"
                :strokeColor="{ startColor: 'rgba(78, 111, 250, 1)', endColor: 'rgba(255, 109, 103, 1)' }"></c-progress>
            <c-progress class="ml10" :percent="50" width="150" mode="circle" strokeWidth="20" color="red"
                :strokeColor="{ startColor: 'rgba(78, 111, 250, 1)', endColor: 'rgba(255, 109, 103, 1)' }"></c-progress>
        </div>
    </div>
</template>
<script>
export default {
    name: 'progress'
}
</script>
<style lang="less">
.progress-box {
    .progress {
        width: 200px;
    }

    .progress-circle {
        display: flex;
    }

}
</style>