<template>
    <a-tree v-model:expandedKeys="expandedKeys" v-model:checkedKeys="checkedKeys" checkable @check="onCheck"
        :selectable="selectable" :tree-data="treeData">
        <!-- 无右击事件 -->
        <template v-if="!rightAble" #title="scoped">
            <div class="node-content" :class="selectedKeys.indexOf(scoped.key) > -1 ? 'active' : ''">
                <div class="node-slot node-slot-l" :key="key + Math.random() * 1000" @click="watchData(scoped)">
                    <slot v-if="scoped.checkable" name="l" :data="scoped.data"></slot>
                </div>
                <span class="node-text" @click="selectNode(scoped)">{{ scoped.title }}</span>
                <div class="node-slot node-slot-r ml5" :key="key + Math.random() * 1000" @click="watchData(scoped)">
                    <slot v-if="scoped.checkable" name="r" :data="scoped.data"></slot>
                </div>
            </div>
        </template>
        <!-- 右击事件 -->
        <template v-if="rightAble" #title="scoped">
            <!-- 末级无右击事件 -->
            <div v-if="scoped.checkable" class="node-content"
                :class="selectedKeys.indexOf(scoped.key) > -1 ? 'active' : ''">
                <div class="node-slot node-slot-l" :key="key + Math.random() * 1000" @click="watchData(scoped)">
                    <slot v-if="scoped.checkable" name="l" :data="scoped.data"></slot>
                </div>
                <span class="node-text" @click="selectNode(scoped)">
                    {{ scoped.title }}
                </span>
                <div class="node-slot node-slot-r ml5" :key="key + Math.random() * 1000" @click="watchData(scoped)">
                    <slot v-if="scoped.checkable" name="r" :data="scoped.data"></slot>
                </div>
            </div>
            <a-dropdown :trigger="['contextmenu']" v-else>
                <div class="node-content" :class="selectedKeys.indexOf(scoped.key) > -1 ? 'active' : ''">
                    <div class="node-slot node-slot-l" :key="key + Math.random() * 1000" @click="watchData(scoped)">
                        <slot v-if="scoped.checkable" name="l" :data="scoped.data"></slot>
                    </div>
                    <span class="node-text" @click="selectNode(scoped)">
                        {{ scoped.title }}
                    </span>
                    <div class="node-slot node-slot-r ml5" :key="key + Math.random() * 1000" @click="watchData(scoped)">
                        <slot v-if="scoped.checkable" name="r" :data="scoped.data"></slot>
                    </div>
                </div>
                <template #overlay>
                    <slot name="content" :data="scoped"></slot>
                </template>
            </a-dropdown>
        </template>
    </a-tree>
</template>
<script lang="ts">
    export default {
        name: 'c-tree',
    }
</script>
<script lang="ts" setup>
    import { emit } from 'process';
    import { onMounted, ref, watch } from 'vue';
    let props = defineProps({
        //点击节点是否可选中
        selectable: {
            type: Boolean,
            default: true
        },
        //是否有右击事件
        rightAble: {
            type: Boolean,
            default: false
        },
        //末级是否需要选中
        checkable: {
            type: Boolean,
            default: false
        }
    })
    let emits = defineEmits(['checked', 'selected'])
    let selectedKeys: any = ref([])
    let selectedNodes: any = ref([])
    let key = ref(1)
    let treeData: any = ref([
        {
            title: '站一',
            key: '0-0',
            children: [
                {
                    title: '区域1',
                    key: '0-0-0',
                    children: [
                        {
                            title: '大华摄像机',
                            key: '0-0-0-0',
                        },
                        {
                            title: '海康摄像机',
                            key: '0-0-0-1',
                        },
                    ],
                },
                {
                    title: '区域2',
                    key: '0-0-1',
                    children: [{ key: '0-0-1-0', title: 'nvr5' }],
                },
            ],
        },
    ])
    //展开项
    let expandedKeys: any = ref([]);
    //选中项 checked
    let checkedKeys: any = ref([]);
    //树拆分数组对象
    let dataList: any = ref([])
    //处理数据
    function dealData(data) {
        selfData(data)
    }
    //遍历树数据
    function selfData(data) {
        data.forEach(parent => {
            parent.active = false
            if (parent.children && parent.children.length > 0) {
                parent.checkable = false
                selfData(parent.children)
            } else {
                //末级是否可以check
                parent.checkable = props.checkable
            }
        })
    }
    //checkbox选中
    function onCheck(e, ee) {
        emits('checked', checkedKeys.value, ee.checkedNodes)
    }
    //节点选中
    function selectNode(e) {
        if (selectedKeys.value[0] == e.key) {
            selectedKeys.value = []
            selectedNodes.value = []
        } else {
            selectedKeys.value = [e.key]
            selectedNodes.value = [e]
        }
        emits('selected', selectedKeys.value, selectedNodes.value)
    }
    //监听数据刷新节点状态
    function watchData(e) {
        console.log(e.data, 999);
        key.value = new Date().getTime()
    }
    onMounted(() => {
        dealData(treeData.value)
    })
</script>
<style lang="less" scoped >
.node-content {
    padding: 0 2px;

    .node-text {}

    .node-slot {
        display: inline-block;
    }

    .node-slot-l {
        margin-right: 2px;
    }

    .node-slot-r {
        // margin-left: 5px;
    }

}

.active {
    background-color: #bae7ff;
    border-radius: 2px;
}
</style>
<style>
.ant-tree-node-selected {
    background: transparent !important;
}

.ant-tree-node-content-wrapper {
    padding: 0 !important;
}
</style>