<template>
  <div
    :class="[
      'c-input-container',
      'flex-row-center-start',
      'w100',
      size,
      disabled ? 'disabled' : '',
      errMsg ? 'error' : '',
    ]"
  >
    <slot name="l"></slot>
    <template v-if="type == 'textarea'">
      <textarea
        :id="id"
        class="c-textarea"
        :value="value"
        :maxlength="max"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder"
        @keyup="(e) => confirmed('enter', e)"
        @blur="(e) => $emit('blur', e.target.value.trim())"
      ></textarea>
      <span class="c-textarea-counter">{{ count || 0 }}/{{ max || 0 }}</span>
    </template>
    <template v-else>
      <input
        :id="id"
        class="c-input"
        :type="type"
        :value="value"
        :placeholder="placeholder"
        :disabled="disabled"
        :range="range"
        @keyup.enter="(e) => confirmed('enter', e)"
        @blur="(e) => $emit('blur', e.target.value.trim())"
      />
      <button
        :class="['enter-btn', size]"
        v-if="enterButton"
        @click="() => confirmed(errMsg ? 'clearBtn' : 'confirmBtn', null)"
      >
        <i :class="`iconfont icon-${!errMsg ? 'fangda' : 'guanbi'}`"></i>
      </button>
    </template>
    <slot name="r"></slot>
    <div
      class="errmsg-line flex-row-center-start w100 ellipsis"
      :style="`top: ${top}px`"
      v-if="errMsg"
    >
      <span class="w100 ellipsis">{{ errMsg }}</span>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";

export default defineComponent({
  name: "c-input",
  props: {
    value: {
      type: [String, Number],
      default: "", //输入框内容
    },
    type: {
      type: String,
      default: "text", //输入框类型 text文本框 number数字 password密码框 textarea文本区域
    },
    placeholder: {
      type: String,
      default: "请输入关键词搜索", //默认内容
    },
    enterButton: {
      type: Boolean,
      default: true, //是否有确认按钮
    },
    disabled: {
      type: Boolean,
      default: false, //是否禁用
    },
    size: {
      type: String,
      default: "normal", //输入框尺寸 large normal small
    },
    range: {
      type: Array,
      default: () => [0, 20], //输入内容长度限制(type=number时 表示最大值最小值的范围)
    },
    max: {
      type: Number,
      default: 0, //textarea文本内容长度限制
    },
    required: {
      type: Boolean,
      default: false, //textarea文本区域是必填
    },
    rules: {
      type: Array,
      default: () => [
        {
          reg: /[:/<>]/g,
          msg: "不能输入特殊字符 : / < >",
        },
      ],
    },
  },
  emits: ["update:value", "confirmed", "blur"],
  setup(props, { emit }) {
    let cpLock = ref(true);
    let id = ref(`input-${Math.floor(Math.random() * 10000)}`);
    let inputDom = ref(null);
    let count = ref(0);
    let top = ref(0); //错误提示文案定位
    let errMsg = ref(""); //错误提示文案

    // 监听尺寸变化 更新错误信息定位
    watch(
      () => props.size,
      () => {
        nextTick(() => {
          top.value = inputDom.value?.offsetHeight;
        });
      },
      { deep: true }
    );
    // 监听输入值的变化 进行输入条件校验及输入值更新
    watch(
      () => props.value,
      (newVal, oldVal) => {
        count.value =
          newVal?.length > props.max ? props.max : newVal?.length || 0;
        verify(newVal, oldVal);
      },
      {
        deep: true,
      }
    );

    // 输入框内容及格式校验
    function verify(newVal, oldVal) {
      const len = newVal?.trim()?.length;
      if (props.type == "number") {
        if (newVal > props.range[1]) {
          return (errMsg.value = `输入内容应在[${props.range}之间]`);
        } else if (newVal < props.range[0]) {
          return (errMsg.value = `输入内容应在[${props.range}之间]`);
        }
      } else if (props.type == "textarea" && props.required) {
        if (len <= 0) {
          return (errMsg.value = `内容不能为空`);
        }
      } else if (props.type != "textarea" && len < props.range[0]) {
        errMsg.value = `长度不能少于${props.range[0]}个字符`;
        // emit("update:value", oldVal);
        return;
      } else if (props.type != "textarea" && len > props.range[1]) {
        errMsg.value = `长度不能超过${props.range[1]}个字符`;
        // emit("update:value", newVal.slice(0, props.range[1]));
        return;
      } else {
        for (const rule of props.rules) {
          if (rule.reg.test(newVal)) {
            errMsg.value = rule.msg || "输入内容不符合规则";
            // emit("update:value", oldVal);
            break;
          }
        }
      }
      errMsg.value = "";
    }
    // 点击enter/确认按钮 确定输入框内容
    function confirmed(type, e) {
      let v = "";
      if (type == "enter") {
        v = e.target.value?.trim() || "";
      } else if (type == "confirmBtn") {
        if (inputDom.value) {
          v = inputDom.value?.value?.trim() || "";
        }
      } else if (type == "clearBtn") {
        v = "";
        emit("update:value", v);
      }
      emit("confirmed", v);
    }

    onMounted(() => {
      nextTick(() => {
        inputDom.value = document.getElementById(id.value);
        // input输入中文时，屏蔽拼音状态，防止拼音以字符个数计入，从而影响range判断和输入框传值
        if (inputDom.value) {
          top.value = inputDom.value?.offsetHeight;
          inputDom.value.addEventListener(
            "compositionstart",
            () => (cpLock.value = false)
          );
          inputDom.value.addEventListener(
            "compositionend",
            () => (cpLock.value = true)
          );
          inputDom.value.addEventListener("input", (e) => {
            setTimeout(() => {
              if (cpLock.value) emit("update:value", e.target.value);
            }, 0);
          });
        }
      });
    });
    onUnmounted(() => {
      // 组件销毁时移除输入框的事件监听
      if (inputDom.value) {
        inputDom.value.removeEventListener(
          "compositionstart",
          () => (cpLock.value = false)
        );
        inputDom.value.addEventListener(
          "compositionend",
          () => (cpLock.value = true)
        );
      }
    });

    return {
      id,
      top,
      count,
      errMsg,
      inputDom,
      confirmed,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>