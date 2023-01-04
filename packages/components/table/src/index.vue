<template>
    <div :id="id" class="table-wrapper d-flex flex-column">
        <div class="flex-row-center-between px-4 table-opts">
            <div class="flex-row-center actions">
                <!-- <a-tooltip placement="top" title="添加" @click="$emit('transInfo', { key: 'add' })" v-if="defaultAddBtn">
                    <div class="flex-center mr-3 icon-wrap add">
                        <i class="iconfont icon-zengjiatianjiajiahao cursor-pointer blue--text option"></i>
                    </div>
                </a-tooltip>
                <a-popconfirm title="确认删除记录？" ok-text="是" cancel-text="否" @confirm="handleDelete" v-if="defaultDeleBtn">
                    <a-tooltip placement="top" title="删除">
                        <div class="flex-center mr-3 icon-wrap delete">
                            <i class="iconfont icon-shanchu1 cursor-pointer blue--text option"></i>
                        </div>
                    </a-tooltip>
                </a-popconfirm> -->
                <slot></slot>
            </div>
            <div class="flex gp10">
                <c-button primary size="mini" @click="filterVisible = !filterVisible">高级筛选</c-button>
                <a-popover trigger="click" placement="bottomLeft" overlay-class-name="popover">
                    <template #content>
                        <div style="min-width: 120px">
                            <div class="filter-wrap" style="height: 340px;overflow-y: auto;">
                                <a-checkbox-group v-model:value="filterColumnsKeys" :options="filterColumns"
                                    class="flex-column">
                                </a-checkbox-group>
                            </div>
                            <div class="divider my-2"></div>
                            <div class="d-flex align-center justify-space-between px-2">
                                <a-button class="filter-btn" size="small"
                                    @click="filterColumnsKeys = originColumns.map(c => c.id)">重置</a-button>
                                <a-button class="filter-btn" size="small" disabled>确定</a-button>
                            </div>
                        </div>
                    </template>
                    <c-button primary size="mini" class="ml-4">过滤</c-button>
                </a-popover>
            </div>
        </div>
        <div class="white" style="width: 100%">
            <div class="divider"></div>
        </div>
        <div class="white py-2 px-1">
            <div v-if="filterVisible" class="filter">
                <div class="filter-content">
                    <template v-for="column in renderColumns" :key="column.id">
                        <div v-if="column.component" class="filter-item">
                            <component v-model:value="queryForm[column.id]" :is="column.component" v-bind="column.bind">
                                <template v-if="column.xType === 'select'">
                                    <a-select-option v-for="choice in column.choices" :key="choice.key"
                                        :value="choice.key">
                                        {{ choice.value }}</a-select-option>
                                </template>
                                <template v-else-if="column.xType === 'boolean'">
                                    <a-select-option :value="0">否</a-select-option>
                                    <a-select-option :value="1">是</a-select-option>
                                    <a-select-option :value="undefined">不限</a-select-option>
                                </template>
                            </component>
                        </div>
                    </template>
                </div>
                <div class="filter-opts">
                    <div class="btns">
                        <a-button size="small" style="background-color: #1684fc1a; color: #1684fc; border: none"
                            @click="filterReset">重置</a-button>
                        <a-button size="small" type="primary" @click="pageChange(1)">确定</a-button>
                        <a-button size="small" danger @click="filterVisible = false">收起</a-button>
                    </div>
                </div>
            </div>
        </div>
        <a-table :pagination="false" :scroll="{ x: '100%', y: scrollHeight || innerHeight }" :row-key="rowKey || 'name'"
            :columns="renderColumns" :data-source="dataSource" :loading="isLoading"
            :row-selection="{ fixed: 'left', onChange: rowSelect }" class="table">
            <template #bodyCell="{ column, record }">
                <slot :name="`bodyCell.${column.id}`" :column="column" :record="record">
                    <template v-if="column.xType === 'select'">
                        <span :title="column.choiceMap[record[column.id]]">
                            {{ column.choiceMap[record[column.id]] }}
                        </span>
                    </template>
                    <template v-else-if="column.xType === 'foreign'">
                        <span :title="record[column.id] && record[column.id].name">
                            {{ record[column.id] ? record[column.id].name : "" }}
                        </span>
                    </template>
                    <template v-else-if="column.xType === 'boolean'">
                        <span :title="record[column.id] ? '是' : '否'">{{ record[column.id] ? " 是" : "否" }}</span>
                    </template>
                    <template v-else-if="column.id === 'actions'">
                        <div class="d-flex justify-center align-center" style="height: 100%">
                            <template v-if="record.actions">
                                <a-tooltip v-for="action in record.actions" :key="action.id" placement="top"
                                    :title="action.tooltip">
                                    <div class="d-flex align-center justify-center cursor-pointer ml-2"
                                        style="height: 20px; border-radius: 3px" :style="{
                                            color: action.color,
                                            background: action.background || `${action.color}1a`,
                                            height: action.height || action.width,
                                            width: action.width,
                                        }" @click="doAction(action, record, column, $event)">
                                        <i v-if="action.icon" class="iconfont" :class="action.icon"
                                            :style="{ fontSize: action.iconSize }"></i>
                                        <span v-if="action.text" class="ml-1" :style="{ fontSize: action.fontSize }">{{
                                                action.text
                                        }}</span>
                                    </div>
                                </a-tooltip>
                            </template>
                        </div>
                    </template>
                    <template v-else><span :title="record[column.id]">{{ record[column.id] }}</span> </template>
                </slot>
            </template>
        </a-table>
        <!-- 分页 -->
        <a-pagination class="pagination" show-quick-jumper show-size-changer showLessItems v-model:current="page"
            v-model:pageSize="pageSize" :total="total" :show-total="total => `共 ${total} 条记录`"
            @change="(page, pageSize) => pageChange(page, pageSize)" />
    </div>
</template>
   
<script>
export default { name: "c-table" };
</script>
<script setup >
import { message, Modal } from "ant-design-vue";
import { onBeforeMount, ref, watch, computed } from "vue";
import tableMixin from './mixin';
// import { delDatabase, getData, getDataModel } from "#/api/database";

const props = defineProps({
    defaultAddBtn: {
        type: Boolean,
        default: true,
    },
    defaultDeleBtn: {
        type: Boolean,
        default: true,
    },
    filterKeys: {
        type: Array,
        default: () => []
    },
    rowKey: {
        type: String,
        default: "",
    },
    pageSize: {
        type: Number,
        default: 0,
    },
    scrollHeight: {
        type: Number,
        default: 0,
    },
    modelId: {
        type: String,
        default: "patroldevice",
    },
    queryOpts: {
        type: Object,
        default: () => ({})
    },
    maxW: {
        type: Number,
        default: 200
    },
    actions: {
        type: Array,
        default: () => [],
    },
    outerColumns: {
        type: Object,
        default: () => ({})
    },
})
const emit = defineEmits(['tableInit', 'transInfo', 'transAction', "rowSelect", "doAction", "delSuccess"]);

// table拆分出去的固定模块
const tableModule = tableMixin({ getTableData })
let { id, isLoading, filterVisible, symbolMap, innerHeight, getTextWidth, page, pageSize, total, pageChange } = tableModule

// table主逻辑模块
const columns = ref([]); // 表头数据
const dataSource = ref([]); // 表格数据
const selectedRows = ref([]); // 当前选中的行
const queryForm = ref({}); // 高级筛选参数

// 原始表头数据
let originColumns = ref([])
// 当前可见的表头（过滤操作checkbox选中值）
let filterColumnsKeys = ref([])
// 过滤操作checkbox列表（通过源数据originColumns自动生成 ）
let filterColumns = computed(() => {
    return originColumns.value.map((c, i) => ({ label: c.title, value: c.id, disabled: c.disabled }))
})
// 渲染可见的表头（先根据外部传入column重写，再根据过滤条件显示）
let renderColumns = computed(() => {
    let outerColumns = props.outerColumns
    // 合并外部重写-如果外部没有重写就新增表头
    let outerKeys = Object.keys(outerColumns)
    outerKeys.forEach((o, i) => {
        if (originColumns.value.findIndex((oo, ii) => oo.id == o) < 0) {
            originColumns.value.splice(originColumns.value.length - 1, 0, outerColumns[o])
        }
    })
    // console.log(originColumns.value)
    return originColumns.value
        .map((c, i) => {
            let maxW = props.maxW // 预设最大值
            let contentMaxW = 0 // 最大列宽度
            let titleW = getTextWidth(c.title) + 80 // 默认表头宽度=文字宽度+80留白
            // 合并外部重写-如果外部重写了column则覆盖默认配置
            let overwriteColumn = Reflect.has(outerColumns, c.id) ? Object.assign(c, outerColumns[c.id]) : c
            // 计算宽度-对比表头title和内容长度，取大的值，重写column的宽度
            for (const row of dataSource.value) {
                if (row[c.id]) {
                    if (c.choices) {
                        const selected = c.choices.find((choice) => choice.key === row[c.id]);
                        contentMaxW = Math.max(getTextWidth(selected.value.toString()) + 36, contentMaxW);
                    } else if (c.related) {
                        contentMaxW = Math.max(getTextWidth(row[c.id].name.toString()) + 36, contentMaxW);
                    } else if (c.id === "actions") {
                        let tmpWidth = 0;
                        for (const action of actions.value) {
                            if (action.filter ? action.filter(row) : true) {
                                tmpWidth += getTextWidth((action.text || "").toString()) + 28;
                            }
                        }
                        contentMaxW = Math.max(tmpWidth + 36, contentMaxW);
                    } else {
                        contentMaxW = Math.max(getTextWidth(row[c.id].toString()) + 36, contentMaxW);
                    }
                }
            }
            Object.assign(overwriteColumn, { width: Math.max(maxW, titleW, contentMaxW) > maxW ? maxW : Math.max(maxW, titleW, contentMaxW) })
            // // action 额外宽度+0.5
            // if (c.id == 'actions') {
            //   Object.assign(overwriteColumn, { width: columnW + 0.5 })
            // } else {
            //   Object.assign(overwriteColumn, { width: columnW })
            // }
            return overwriteColumn
        })
        .filter((c, i) => filterColumnsKeys.value.indexOf(c.id) > -1)
})

// 合并action
let actions = computed(() => {
    let result = []
    let defaultMd = { height: "20px", width: "20px", text: '', filter: (item) => true }
    let defaultEdit = { id: "edit", icon: "icon-bianji3", tooltip: "编辑", color: "#1684fc", background: "#e3eefb" }
    let defaultDelete = { id: "delete", icon: "icon-shanchu1", tooltip: "删除", color: "#ff2222", background: "#ffe8e8" }
    let editIdx = props.actions.findIndex((k) => k.id == 'edit')
    let deleteIdx = props.actions.findIndex((k) => k.id == 'delete')
    if (editIdx < 0) {
        result.push(Object.assign({}, defaultMd, defaultEdit))
    }
    if (deleteIdx < 0) {
        result.push(Object.assign({}, defaultMd, defaultDelete))
    }
    props.actions.forEach((k) => {
        if (k.id == 'edit') {
            result.push(Object.assign({}, defaultMd, defaultEdit, k))
        } else if (k.id == 'delete') {
            result.push(Object.assign({}, defaultMd, defaultDelete, k))
        } else {
            result.push(Object.assign({}, defaultMd, k))
        }
    })
    return result
})

// 获取筛选参数
function getQueryParams() {
    const queryData = {};
    for (const item of columns.value) {
        const key = item.id;
        const value = queryForm.value[key];
        const xType = item.xType;
        if (value) {
            switch (xType) {
                case "text":
                    queryData[key + "__contains"] = value.toString();
                    break;
                case "foreign":
                case "select":
                    queryData[key + "__in"] = value.join(",");
                    break;
                case "boolean":
                    queryData[key] = value.toString();
                    break;
                case "number":
                    queryData[key + symbolMap[value[0]]] = (
                        value
                    )[1].toString();
                    break;
                case "date":
                case "time":
                case "datetime":
                    queryData[key + "__range"] = value.join(",");
                    break;
            }
        }
    }
    return queryData;
}

// 获取表头
async function getColumns() {
    const { data: { data, message: msg, success } } = await getDataModel(props.modelId);
    if (!success) {
        return message.error("读取数据失败：" + msg);
    }
    if (data) {
        let temp = [...data.fields, { id: "actions", type: "actions", name: "操作", align: "center" }]
        if (props.filterKeys.length) {
            filterColumnsKeys.value = props.filterKeys
        }
        originColumns.value = temp.map((column, i) => {
            let { id, type, name, title, choices, related } = column
            let dft = { id: column.id, type: column.type, title: name, align: "center" } // 通用配置
            if (props.filterKeys.length == 0) {
                filterColumnsKeys.value.push(id) // 默认展示全部列
            }
            if (id === "id") {
                return { ...dft, id: "id", disabled: true }
            } else if (id === "actions") {
                return { ...dft, fixed: "right", disabled: true }
            } else if (type === "fk") {
                return { ...dft, xType: "foreign", component: "query-page-select", bind: { mode: "multiple", allowClear: true, modelId: related, placeholder: `请选择${name}` }, related: related }
            } else if (choices) {
                const choiceMap = {};
                for (const choice of choices) choiceMap[choice.key] = choice.value;
                return { ...dft, xType: "select", component: "a-select", choices: choices, choiceMap, bind: { mode: "multiple", allowClear: true, placeholder: `请选择${name}` } }
            } else if (type === "bool") {
                return { ...dft, xType: "boolean", component: "a-select", choices: [{ key: true, value: "是" }, { key: false, value: "否" },], bind: { placeholder: name } }
            } else if (/(float)|(int)/i.test(type)) {
                return { ...dft, xType: "number", component: "compare-input", bind: { placeholder: name } }
            } else if (type === "date") {
                return { ...dft, xType: "date", component: "a-range-picker", bind: { placeholder: [`${name}开始`, `${name}结束`] } }
            } else if (type === "time") {
                return { ...dft, xType: "time", component: "a-time-range-picker", bind: { placeholder: [`${name}开始`, `${name}结束`] } }
            } else if (type === "datetime") {
                return { ...dft, xType: "datetime", component: "a-range-picker", bind: { placeholder: [`${name}开始`, `${name}结束`] } }
            } else {
                return { ...dft, xType: "text", component: "a-input", bind: { placeholder: `请输入${name}` } }
            }
        })
    } else {
        return message.warning("错误的modelId");
    }
}

// 获取列表数据
async function getTableData() {
    dataSource.value = []
    selectedRows.value = []
    isLoading.value = true;
    const {
        data: { success, message: msg, data: res },
    } = await getData(props.modelId, {
        offset: (page.value - 1) * (props.pageSize || pageSize.value),
        limit: props.pageSize || pageSize.value,
        ...props.queryOpts,
        ...getQueryParams(),
    });
    isLoading.value = false;
    if (!success) {
        return message.error("读取数据失败：" + msg);
    }
    emit("tableInit");
    total.value = res.total;
    dataSource.value = res.list.map((item) => ({
        ...item,
        actions: actions.value.filter((action) => {
            return action.filter ? action.filter(item) : true;
        }),
    }));
}
// 操作-删除
async function deleteRows(delIds) {
    if (!delIds.length) {
        return message.warning('请选择要删除的数据！')
    }
    Modal.confirm({
        title: "操作提示",
        content: "是否删除条目？",
        centered: true,
        onOk: async () => {
            const {
                data: { success, msg },
            } = await delDatabase(props.modelId, { data: delIds, });
            if (success) {
                message.success("删除成功");
                emit('transInfo', { key: 'deleteRes', status: success })
                await getTableData();
            } else {
                message.error("删除失败" + msg);
            }
        },
    });
}

// 重写datasource
function overwriteDataSource(overwriteDataSource, findFn) {
    dataSource.value = dataSource.value.map((d, i) => {
        let idx = overwriteDataSource.findIndex((dd, ii) => {
            return findFn(d, dd)
        })
        if (idx > -1) {
            let { id, ...other } = overwriteDataSource[idx]
            return Object.assign(d, other)
        } else {
            return d
        }
    })
}

// 列表复选操作
function rowSelect(rowKeys, rows) {
    selectedRows.value = rows;
    emit("rowSelect", rowKeys, rows);
}

// 重置表头筛选
function filterReset() {
    queryForm.value = {};
    pageChange(1);
}

// 批量删除操作
function handleDelete() {
    const delIds = selectedRows.value.map((row) => row.id);
    deleteRows(delIds)
}

// 操作
function doAction(action, record, column, e) {
    if (action.id === "delete") {
        // 内部处理
        deleteRows([record.id])
    } else {
        // 需要抛到外部处理
        emit("doAction", action, record, column, e);
        emit("transInfo", { key: action.id, action, record, column, e });
    }
}

// 表变更初始化
watch(() => props.modelId, async () => {
    await init();
});

// 外部扩展查询参数，初始化
watch(() => props.queryOpts, async (val, pre) => {
    console.log(val, pre)
    if (JSON.stringify(val) != JSON.stringify(pre)) {
        await init();
    }
}, { deep: true })

// 初始化
async function init() {
    // await getColumns();
    // await getTableData();
}

onBeforeMount(() => {
    init();
});

defineExpose({
    getTableData,
    overwriteDataSource,
});
</script>
  
<style scoped lang="less">
.ant-pagination-options-size-changer {
    height: 100% !important;
}

.filter-btn {
    border: none;

    &:nth-child(1) {
        background-color: #1684fc1a;
        color: #1684fc;
    }
}

.table-wrapper {
    background: #fff;
    height: 100%;
    width: 100%;

    .table-opts {
        height: 32px;
        height: 45px;
        background-color: white;

        .actions {
            .icon-wrap {
                width: 25px;
                height: 25px;
                border-radius: 5px;
                cursor: pointer;

                &.add {
                    background: #1684fcff;
                }

                &.delete {
                    background: #ff2222ff;
                }

                i {
                    font-size: 16px;
                    color: #fff;
                }
            }
        }
    }

    .filter {
        background-color: #1684fc1a;
        height: 120px;
        padding: 2px 0 2px 20px;

        ::-webkit-scrollbar-track {
            background: #e7f2ff;
        }

        .filter-content {
            overflow-y: auto;
            height: 80px;
            display: flex;
            flex-wrap: wrap;

            .filter-item {
                height: 38px;
                display: flex;
                align-items: center;
                margin-right: 20px;
                width: calc(10% - 20px);
                min-width: 150px;

                ::-webkit-scrollbar {
                    height: 0;
                    width: 0;
                }
            }
        }

        .filter-opts {
            height: 40px;
            display: flex;
            justify-content: flex-end;

            .btns {
                height: 100%;
                width: calc(10% - 20px);
                min-width: 150px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-right: 20px;
            }
        }

        :deep(.ant-input) {
            height: 24px !important;
            font-size: 13px;
        }

        :deep(.ant-select) {
            height: 24px !important;

            .ant-select-selector {
                .ant-select-selection-search {
                    input {
                        height: 100%;
                    }
                }

                .ant-select-selection-placeholder {
                    font-size: 13px;
                    line-height: 22px;
                }

                .ant-select-selection-item {
                    line-height: 22px !important;
                    font-size: 13px;
                }

                .ant-select-selection-overflow {
                    font-size: 13px;
                    height: 100%;
                    margin-top: -8px;
                    overflow-x: auto;
                    overflow-y: hidden;
                    flex-wrap: nowrap;

                    .ant-select-selection-overflow-item {
                        height: 100%;

                        .ant-select-selection-item {
                            margin: 0;
                            height: 100%;

                            .ant-select-selection-item-remove {
                                .anticon {
                                    vertical-align: 0;
                                }
                            }
                        }
                    }

                    .ant-select-selection-search-input {
                        font-size: 13px;
                        height: 100%;
                    }
                }
            }
        }

        :deep(.ant-picker) {
            height: 24px !important;
            padding: 2px;

            .ant-picker-input {
                font-size: 13px;

                input {
                    font-size: 13px;
                }
            }
        }
    }

    .table {
        flex: 1;

        :deep(.ant-spin-nested-loading) {
            :not(.ant-table-has-fix-right) .ant-table-container::after {
                box-shadow: unset;
            }

            .ant-table {
                .ant-table-header {
                    overflow-y: hidden !important;

                    .ant-table-thead {
                        tr {
                            th {
                                font-size: 13px;
                                height: 32px;
                                padding: 0 !important;
                                vertical-align: middle;
                            }
                        }

                        .ant-table-cell-fix-right {
                            right: 0 !important;
                        }

                        .ant-table-cell-scrollbar {
                            display: none;
                        }
                    }
                }

                .ant-table-body {
                    overflow-y: auto !important;

                    .ant-table-tbody {
                        tr {
                            td {
                                font-size: 13px;
                                height: 32px;
                                padding: 0 8px !important;
                                vertical-align: middle;

                                &:not(.ant-table-cell-fix-right):not(.ant-table-cell-fix-left) {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                            }
                        }

                        .ant-table-expanded-row-fixed {
                            height: 100%;
                        }
                    }
                }

                .ant-table-selection-column {
                    padding: 0.93vh 8px !important;
                }
            }
        }
    }

    .pagination {
        margin: 20px 0;
        text-align: center;

        :deep(.ant-pagination-item a) {
            text-align: center;
        }
    }
}
</style>
  