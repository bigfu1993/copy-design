<template>
    <div class="flex1 flex-column gp10 drag-wrap">
        <!-- <c-drag placement="left" :value="120">
            <div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
        </c-drag> -->
        <div class="flex" style="height:200px">
            <div class="flex1" style="background:#ddd">llll</div>
            <c-drag placement="left" :value="200">
                <div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
            </c-drag>
        </div>
        <div class="flex" style="height:200px">
            <c-drag placement="right" :value="200">
                <div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
            </c-drag>
            <div class="flex1" style="background:#ddd">rrr</div>
        </div>
        <div class="flex-column" style="height:400px">
            <div class="flex1" style="background:#ddd">ttt</div>
            <c-drag placement="top" :value="200">
                <div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
            </c-drag>
        </div>
        <div class="flex-column" style="height:400px">
            <c-drag placement="bottom" :value="200">
                <div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
            </c-drag>
            <div class="flex1" style="background:#ddd">bbb</div>
        </div>
        <!-- <c-drag placement="top" :value="200">
            <div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
        </c-drag> -->
        <!-- <c-drag placement="bottom" :value="200">
            <div>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
        </c-drag> -->
    </div>
</template>

<script>
export default {
    name: 'drag-demo'
}
</script>

<style lang="scss" scoped>

</style>