<template>
  <div :class="['c-select-container', 'w100', size]" :id="id">
    <div
      class="c-select-selector flex-row-center-between"
      :style="
        disabled
          ? 'cursor: not-allowed; border: 1px solid #ccc; color: #ccc'
          : mode == 'multiple'
          ? 'cursor: text'
          : 'cursor: pointer'
      "
      @click="
        () => {
          isSearch = false;
          isOpen = !isOpen;
          isFocus = isOpen;
        }
      "
    >
      <div class="c-select-selection-item flex-row-center-start h100">
        <div
          class="c-select-tags flex-row-start"
          v-if="Array.isArray(value) && value.length"
        >
          <div class="c-select-tag flex-row-center-start plr10 mr10 ellipsis">
            <span class="mr10 ellipsis">{{
              options?.find((e) => e.value === value[0])?.label || ""
            }}</span>
            <i
              class="iconfont icon-guanbi"
              @click="
                () =>
                  handleOptionsSelect(
                    options?.find((e) => e.value === value[0])
                  )
              "
            ></i>
          </div>
          <div
            class="c-select-tag flex-row-center-start plr10"
            v-if="value.length > 1"
          >
            + {{ value.length - 1 }} ...
          </div>
        </div>
        <span
          class="ellipsis"
          v-else-if="value?.length || String(value)?.length"
        >
          {{ options?.find((e) => e.value === value)?.label || "" }}</span
        >
        <span v-else>{{ placeholder }}</span>
        <input
          class="c-select-input"
          type="text"
          :autofocus="isFocus"
          v-if="mode == 'multiple'"
          @keyup.delete="
            () => $emit('update:value', value.slice(0, value.length - 1))
          "
          @blur="() => (isFocus = false)"
        />
      </div>
      <div class="c-select-selection-icon">
        <i class="iconfont icon-fanhui"></i>
      </div>
    </div>
    <div class="c-select-dropdown w100" :style="`top: ${top}px`" v-if="isOpen">
      <div class="c-select-dropdown-search" v-if="search">
        <c-input
          :value="searchContent"
          ghost
          :size="size"
          placeholder="请输入搜索内容"
          @update:value="(e) => (searchContent = e)"
          @confirmed="handleSearchConfirmed"
          @blur="
            () => {
              isFocus = true;
              isSearch = false;
            }
          "
        ></c-input>
      </div>
      <div
        class="c-select-dropdown-list w100 scroll"
        v-if="isSearch ? searchOpts?.length : options?.length"
      >
        <div
          :class="[
            'c-select-dropdown-item',
            'flex-row-center-start',
            'cursor',
            v.disabled ? 'disabled' : '',
            (mode == 'multiple' && value?.indexOf(v.value) > -1) ||
            (mode == 'single' && v.value == value)
              ? 'selected'
              : '',
          ]"
          v-for="v in isSearch ? searchOpts : options"
          :key="v.value"
          @click="() => handleOptionsSelect(v)"
        >
          <input
            v-if="mode == 'multiple'"
            type="checkbox"
            :name="v.value"
            :checked="value?.indexOf(v.value) > -1"
            class="c-select-dropdown-item-checkbox"
          />
          <c-tooltip
            class="ellipsis"
            :title="v.label"
            placement="top"
            trigger="hover"
          >
            <span class="c-select-dropdown-item-label ellipsis">{{
              v.label
            }}</span>
          </c-tooltip>
        </div>
      </div>
      <div class="c-select-dropdown-default flex-row-center w100" v-else>
        <span>内容为空</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "c-select",
  props: {
    value: {
      type: [String, Number, Array],
      default: "", //选择框内容
    },
    options: {
      type: [Array],
      default: [], //选择框可选项
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    mode: {
      type: String,
      default: "single", //single单选 multiple多选
    },
    search: {
      type: Boolean,
      default: true, //是否可以搜索
    },
    size: {
      type: String,
      default: "normal", //选择框尺寸 large normal small
    },
    disabled: {
      type: Boolean,
      default: false, //是否禁用
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    let id = ref("");
    let top = ref(0); //下拉框菜单定位
    let isFocus = ref(false); //下拉框是否聚焦
    let isOpen = ref(false); //是否展开下拉菜单
    let isSearch = ref(false); //是否处于搜索状态
    let selectDom = ref(null); //下拉框Dom
    let searchContent = ref(""); //输入框搜索内容
    let searchOpts = ref([]); //满足搜索条件的下拉选项

    watch(
      () => props.size,
      () => {
        init();
      },
      { deep: true }
    );
    watch(
      () => isFocus.value,
      (val) => {
        let inputDom = document.querySelector(`#${id.value} .c-select-input`);
        if (inputDom) {
          if ((val || isOpen.value) && !isSearch.value) {
            inputDom.focus();
            isFocus.value = true;
          } else {
            inputDom.blur();
            isFocus.value = false;
          }
        }
      },
      { deep: true }
    );
    watch(
      () => isOpen.value,
      (val) => {
        if (val) {
          nextTick(() => {
            let searchDom = document.querySelector(
              `#${id.value} .c-input-container`
            );
            searchDom?.addEventListener("click", (e) => {
              e.stopPropagation();
              isFocus.value = false;
              isSearch.value = true;
            });
          });
        }
      },
      { deep: true }
    );

    onMounted(() => {
      searchOpts.value = JSON.parse(JSON.stringify(props.options));
      id.value = `c-select-${Math.floor(Math.random() * 10000)}`;
      init();
      nextTick(() => {
        selectDom.value?.addEventListener("click", (e) => {
          e.stopPropagation();
        });
        document.addEventListener("click", (e) => {
          e.stopPropagation();
          isOpen.value = false;
          isFocus.value = false;
        });
      });
    });

    // 下拉框定位
    function init() {
      nextTick(() => {
        selectDom.value = document.getElementById(id.value);
        top.value = selectDom.value?.offsetHeight - 1;
      });
    }
    // 选择下拉框条目
    function handleOptionsSelect(item) {
      let { value, disabled } = item;
      if (disabled) return;
      if (props.mode == "multiple") {
        try {
          if (Array.isArray(props.value)) {
            let i = props.value.findIndex((e) => e === value);
            let selections = JSON.parse(JSON.stringify(props.value));
            if (i > -1) {
              selections.splice(i, 1);
            } else {
              selections.push(value);
            }
            emit("update:value", selections);
          } else {
            throw `props.value type error, expect Array, but got ${typeof props.value}`;
          }
        } catch (error) {
          throw error;
        }
      } else {
        try {
          emit("update:value", value);
        } catch (error) {
          throw error;
        }
      }
    }
    // 下拉框搜索
    function handleSearchConfirmed(e) {
      isSearch.value = e;
      searchContent.value = e?.trim();
      searchOpts.value = [];
      props.options.forEach((v) => {
        try {
          if (String(v.label)?.indexOf(e) > -1) {
            searchOpts.value.push(v);
          }
        } catch (error) {
          throw error;
        }
      });
    }

    return {
      id,
      top,
      isOpen,
      isFocus,
      isSearch,
      searchOpts,
      searchContent,
      handleOptionsSelect,
      handleSearchConfirmed,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>