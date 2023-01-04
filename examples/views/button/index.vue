<template>
    <div class="btn-wrap  flex1 gp10 flex-row">
        <div class="p10 flex1 flex-column normal">
            <h2>normal</h2>
            <div class="grid4">
                <div class="p10 flex1 flex-column gp10 normal">
                    <h3>block</h3>
                    <c-button block size="mini">mini</c-button>
                    <c-button block size="small">small</c-button>
                    <c-button block size="normal">normal</c-button>
                    <c-button block size="larger">larger</c-button>
                </div>
                <div class="p10 flex1 flex-column gp10 normal">
                    <h3>size</h3>
                    <c-button size="mini">mini</c-button>
                    <c-button size="small">small</c-button>
                    <c-button size="normal">normal</c-button>
                    <c-button size="larger">larger</c-button>
                </div>
                <div class="p10 flex1 flex-column gp10 normal">
                    <h3>shape:round</h3>
                    <c-button shape='round' size="mini">mini</c-button>
                    <c-button shape='round' size="small">small</c-button>
                    <c-button shape='round' size="normal">normal</c-button>
                    <c-button shape='round' size="larger">larger</c-button>
                </div>
                <div class="p10 flex1 flex-column gp10 normal">
                    <h3>shape:circle</h3>
                    <c-button shape='circle' size="mini"> <template #icon> <i class="iconfont icon-upload"></i>
                        </template> </c-button>
                    <c-button shape='circle' size="small"> <template #icon> <i class="iconfont icon-upload"></i>
                        </template></c-button>
                    <c-button shape='circle' size="normal"> <template #icon> <i class="iconfont icon-upload"></i>
                        </template></c-button>
                    <c-button shape='circle' size="larger"> <template #icon> <i class="iconfont icon-upload"></i>
                        </template></c-button>
                </div>
            </div>
            <div class="grid4">
                <div class="p10 flex1 flex-column gp10 normal">
                    <h3>dashed</h3>
                    <c-button dashed size="mini">mini</c-button>
                    <c-button dashed size="small">small</c-button>
                    <c-button dashed size="normal">normal</c-button>
                    <c-button dashed size="larger">larger</c-button>
                </div>
                <div class="p10 flex1 flex-column gp10 normal">
                    <h3>primary</h3>
                    <c-button primary size="mini">mini</c-button>
                    <c-button primary size="small">small</c-button>
                    <c-button primary size="normal">normal</c-button>
                    <c-button primary size="larger">larger</c-button>
                </div>
                <div class="p10 flex1 flex-column gp10 disabled">
                    <h3>disabled</h3>
                    <c-button disabled size="mini">mini</c-button>
                    <c-button disabled size="small">small</c-button>
                    <c-button disabled size="normal">normal</c-button>
                    <c-button disabled size="larger">larger</c-button>
                </div>
                <div class="p10 flex1 flex-column gp10 ghost" style="background:#e1e1e1">
                    <h3>ghost</h3>
                    <c-button ghost size="mini">mini</c-button>
                    <c-button ghost size="small">small</c-button>
                    <c-button ghost size="normal">normal</c-button>
                    <c-button ghost size="larger">larger</c-button>
                </div>
                <div class="p10 flex1 flex-column gp10 ghost" style="background:#e1e1e1">
                    <h3>ghost+dashed</h3>
                    <c-button dashed ghost size="mini">mini</c-button>
                    <c-button dashed ghost size="small">small</c-button>
                    <c-button dashed ghost size="normal">normal</c-button>
                    <c-button dashed ghost size="larger">larger</c-button>
                </div>
                <div class="p10 flex1 flex-column gp10 ghost" style="background:#e1e1e1">
                    <h3>ghost+primary</h3>
                    <c-button primary ghost size="mini">mini</c-button>
                    <c-button primary ghost size="small">small</c-button>
                    <c-button primary ghost size="normal">normal</c-button>
                    <c-button primary ghost size="larger">larger</c-button>
                </div>
                <div class="p10 flex1 flex-column gp10 ghost" style="background:#e1e1e1">
                    <h3>ghost+disabled</h3>
                    <c-button disabled primary ghost size="mini">mini</c-button>
                    <c-button disabled primary ghost size="small">small</c-button>
                    <c-button disabled primary ghost size="normal">normal</c-button>
                    <c-button disabled primary ghost size="larger">larger</c-button>
                </div>
            </div>
        </div>
        <div class="p10 flex1 flex-column gp10 icon-wrap">
            <h2>#slot</h2>
            <div class="grid4">
                <div class="p10 flex-column gp10">
                    <h3>#l</h3>
                    <c-button size="mini">
                        <template #l> <i class="iconfont icon-upload"></i> </template>
                        mini
                    </c-button>
                    <c-button size="small">
                        <template #l> <i class="iconfont icon-upload"></i> </template>
                        small
                    </c-button>
                    <c-button size="normal">
                        <template #l> <i class="iconfont icon-upload"></i> </template>
                        normal
                    </c-button>
                    <c-button size="larger">
                        <template #l> <i class="iconfont icon-upload"></i> </template>
                        larger
                    </c-button>
                </div>
                <div class="p10 flex-column gp10">
                    <h3>#r</h3>
                    <c-button size="mini">
                        <template #r> <i class="iconfont icon-upload"></i> </template>
                        mini
                    </c-button>
                    <c-button size="small">
                        <template #r> <i class="iconfont icon-upload"></i> </template>
                        small
                    </c-button>
                    <c-button size="normal">
                        <template #r> <i class="iconfont icon-upload"></i> </template>
                        normal
                    </c-button>
                    <c-button size="larger">
                        <template #r> <i class="iconfont icon-upload"></i> </template>
                        larger
                    </c-button>
                </div>
                <div class="p10 flex-column gp10">
                    <h3>#l #r</h3>
                    <c-button size="mini">
                        <template #l> <i class="iconfont icon-upload"></i> </template>
                        <template #r> <i class="iconfont icon-upload"></i> </template>
                        mini
                    </c-button>
                    <c-button size="small">
                        <template #l> <i class="iconfont icon-upload"></i> </template>
                        <template #r> <i class="iconfont icon-upload"></i> </template>
                        small
                    </c-button>
                    <c-button size="normal">
                        <template #l> <i class="iconfont icon-upload"></i> </template>
                        <template #r> <i class="iconfont icon-upload"></i> </template>
                        normal
                    </c-button>
                    <c-button size="larger">
                        <template #l> <i class="iconfont icon-upload"></i> </template>
                        <template #r> <i class="iconfont icon-upload"></i> </template>
                        larger
                    </c-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'button'
}
</script>

<style lang="less" scoped>
div {
    // border: 1px solid #ddd;
}
</style>