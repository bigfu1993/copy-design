<template>
    <div class="box">
        <div class="options">
            <div class="tree-container">
                <a-tree v-model="selectedKeys" class="filter-tree" checkable :expanded-keys="expandedKeys"
                    :auto-expand-parent="autoExpandParent" :selected-keys="selectedKeys" :checkedKeys="checkedKeys"
                    :tree-data="gData" :block-node="true" :loadData="loadChild" :replace-fields="replaceFields"
                    @check="onCheck" @select="onSelect" @expand="onExpand">
                    <template #title="item">
                        <slot :item="item" :extend="extend"></slot>
                    </template>
                </a-tree>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'c-tree'
}
</script>
<script  setup>
import { onMounted, watch } from 'vue';

let props = {
    uniKey: {
        type: String,
        default: '',
    },
    treePath: {
        type: Array,
        default: () => ['organization', 'department', 'station', 'task'],
    },
    extendList: {
        type: Object,
        default: () => { },
    },
    //all 父子子集可选 common：末级可选  none 不带有复选框 reverse 末级不可选 父级可选
    //extend: true 有扩展项 false 无扩展项
    //checkBox true 多选 false 单选
    mode: { type: String, default: 'all' },
    extend: { type: Boolean, default: false },
    defaultKeys: {
        type: Array,
        default: () => [],
    },
}
let initTree = false
let column = {}
let checkedKeys = []
let expandedKeys = []
let selectedKeys = []
let cacheData = []
let searchValue = ''
let autoExpandParent = true
let gData = []
let searchData = []
let replaceFields = {
    //替换组件中字段为数据源中的字段
    title: 'name',
    key: 'id',
    children: 'children',
}
let dataList = [] //处理后数据容器
let selectData = [] //选择数据
let customFieldsFlag = false // 是否自定义数据字段名
let num = 0
let nodeList = []
let commonSetup = ''
watch(() => props.defaultKeys, (val) => {
    initTree = true
    selectedKeys = val //回填数据
}, {
    deep: true,
    immediate: true,
})
watch(() => props.defaultKeys, (val) => {
    checkedKeys = val
    let selectData = dataList
        .filter(j => val.findIndex((item) => item == j.id) > -1)
        .map(item => (props.uniKey ? item[props.uniKey] : item.all))
    if (!initTree) {
        $emit('emitTreePanelChange', selectData)
    }
    initTree = false
}, {
    deep: true,
    immediate: true,
})
watch(() => props.defaultKeys, (val) => {
    checkedKeys = val
    let selectData = dataList
        .filter(j => val.findIndex(item => item == j.id) > -1)
        .map(item => (uniKey ? item[uniKey] : item.all))
    if (!initTree) {
        $emit('emitTreePanelChange', selectData)
    }
    initTree = false
}, {
    deep: true,
    immediate: true,
})
watch(() => props.defaultKeys, (val) => {
    loadData(val)
}, {
    deep: true,
    immediate: true,
})
function init() {
    let { current_station } = this.commonSetup
    let station_id = current_station.guid
    queryDbData({ modelId: this.treePath[0], data: { station: station_id } }).then(res => {
        res.data.list.forEach((item, i) => {
            item['pathName'] = this.treePath[0]
            item['depth'] = 0
            item['superId'] = '顶级'
            item.isLeaf = false
        })
        this.column.checkOpts = res.data.list
        this.setLeaf(this.column.checkOpts)
    })

}
//清空树
function clearTree() {
    this.expandedKeys = []
    this.selectedKeys = []
}
//扩展图标点击事件
function extendClick(e) {
    this.$emit('extendClick', e)
}
function onExpand(expandedKeys, e) {
    //展开项事件
    this.expandedKeys = expandedKeys
    this.autoExpandParent = false
}
//异步加载数据
function loadChild(node) {
    let flag = false
    let data = {}
    let key = this.treePath[node.dataRef.depth]
    data[key] = node.dataRef.guid
    if (node.dataRef.depth >= this.treePath.length - 2) {
        flag = true
    }
    queryDbData({ modelId: this.treePath[node.dataRef.depth + 1], data }).then(res => {
        console.log(res, 123)
        let { data: { list } } = res
        list.forEach((item, i) => {
            item['pathName'] = this.treePath[node.dataRef.depth + 1]
            item['depth'] = node.dataRef.depth + 1
            item.isLeaf = flag
            item['superId'] = node.dataRef.id
        })
        node.dataRef.children = list
        this.setLeaf(this.column.checkOpts)
    })
    return new Promise(resolve => {
        resolve()
    })
}

//处理数据
function loadData(val) {
    this.dataList = []
    this.gData = val.checkOpts
    this.generateList(this.gData)
}
//根据树数据构造数组 dataList
function generateList(data) {
    //遍历数据，加父级标识
    for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const id = node[this.replaceFields.key]
        const name = node[this.replaceFields.title]
        const superId = node.superId
        const guid = node.guid
        const all = node
        this.dataList.push({
            all,
            guid,
            id,
            name,
            isParent:
                node[this.replaceFields.children] && node[this.replaceFields.children].length > 0
                    ? true
                    : false,
            superId,
            childList:
                node[this.replaceFields.children] &&
                node[this.replaceFields.children].map(item => item.id),
        }) //如果存在children添加父级标识
        if (node[this.replaceFields.children]) {
            this.generateList(node[this.replaceFields.children])
        }
    }
}
//遍历树 添加是否可选 设置checkable disabled
function setLeaf(obj) {
    let _this = this
    function add(arr, idArr, id) {
        let temp = []
        arr &&
            arr.map(item => {
                item.id = item.pathName + item.guid
                temp.indexOf(id) == -1 && id && temp.push(id)
                item.parents = [...temp, ...idArr]
                //父子级联动
                switch (_this.mode) {
                    case 'common':
                        item.checkable = item.isLeaf
                        break
                    case 'none':
                        item.checkable = false
                        break
                    case 'all':
                        item.checkable = true
                        break
                    case 'reverse':
                        item.checkable = !item.isLeaf
                        break
                    default:
                        break
                }
                //设备在线离线
                if (Reflect.has(item, 'online')) {
                    item.disabled = !item.online
                }
                if (item.children && item.id) {
                    add(item.children, item.parents, item.id)
                }
            })
    }
    add(obj, [], 0)
    return obj
}
function onCheck(e, info) {
    selectData = []
    selectedKeys = []
    info.checkedNodes.forEach(item => {
        this.selectedKeys.push(item.key)
        this.selectData.push({
            name: item.props.name,
            id: item.key,
            superId: item.props.superId,
            parents: item.props.parents,
        })
    })
    this.$forceUpdate()
    checkRule(info)
    nodeList = []
}
//检查数据父子级是否重复
function checkRule(info) {
    let checkId = info.node.dataRef.id
    let superId = info.node.dataRef.superId
    let parents = info.node.dataRef.parents
    let dataIndex = []
    this.dataList.forEach(item1 => {
        this.selectedKeys.forEach((item2, index2) => {
            if (item1.id == item2) {
                item1.childList &&
                    item1.childList.forEach((item3, index3) => {
                        this.selectedKeys.forEach((item4, index4) => {
                            if (item4 == item3) {
                                dataIndex.push(index4)
                            }
                        })
                    })
            }
        })
    })
    //父子级id同时存在 从后向前删除
    dataIndex.sort((a, b) => {
        return b - a
    })
    dataIndex.forEach(index => {
        selectedKeys.splice(index, 1)
        selectData.splice(index, 1)
    })
    //缓存已选择数据 去重
    cacheData = [...cacheData, ...selectData]
    let obj = {}
    cacheData = cacheData.reduce(function (a, b) {
        obj[b.id] ? '' : (obj[b.id] = true && a.push(b))
        return a
    }, [])
    if (!info.checked) {
        //取消选中 所有子集都要取消
        cacheData = cacheData.filter(item => item.parents.indexOf(checkId) == -1)
        //取消选中 所有关联父级都要取消
        cacheData = cacheData.filter(item => parents.indexOf(item.id) == -1)
        //取消自身节点
        cacheData = cacheData.filter(item => item.id != checkId)
    } else {
        //选中时取消所有子集
        cacheData.forEach(item => {
            cacheData = cacheData.filter(item2 => item2.parents.indexOf(item.id) < 0)
        })
    }
    selectData = cacheData.map(item => item)
    selectedKeys = selectData.map(item => item.id)
}
onMounted(() => {
    init()
})


</script>
<style lang="less">
@import './css/index.less';
</style>



