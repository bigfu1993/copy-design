<template>
  <div class="c-liquid-container" :id="id" style="width: 100%; height: 100%"></div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-liquidfill";
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  nextTick,
} from "vue";
export default defineComponent({
  name: "c-liquid",
  components: {
    echarts,
  },
  props: {
    data: {
      // 百分比数值
      type: Number,
      default: 0,
    },
    waveColor: {
      type: Array,
      default: () => [
        ["rgba(115, 208, 255, 0.5)", "rgba(80, 153, 243, 0.5)"],
        ["rgba(22, 118, 224, 0.73)", "rgba(152, 241, 255, 0.73)"],
      ],
    },
    backgroundColor: {
      type: Array,
      default: () => ["rgba(2, 95, 193, 0.3)", "rgba(100, 182, 245, 0.3)"],
    },
    borderColor: {
      type: String,
      default: "rgba(2, 95, 193, 1)", //水球边框色值
    },
    labelColor: {
      type: String,
      default: "rgba(2, 95, 193, 1)", //水球中间显示文字色值
    },
    labelSize: {
      type: String,
      default: "24px", //水球中间显示文字大小
    },
    formatter: {
      type: String,
      default: null, // 水球中间显示
    },
  },
  setup(props) {
    let id = ref("");
    let myChart = null;
    watch(
      () => props.data,
      (val) => {
        if (val) {
          nextTick(() => {
            renderCharts();
          });
        }
      },
      { deep: true }
    );

    onMounted(() => {
      init();
    });

    // 初始化
    function init() {
      id.value = `c-liquid-${Math.floor(Math.random() * 10000)}`;
      nextTick(() => {
        const el = document.getElementById(id.value);
        if (el) {
          myChart = echarts.init(el);
          renderCharts();
        }
      });
    }
    // 图表渲染
    function renderCharts() {
      if (myChart) {
        let option = {
          //配置波纹双向移动 形成交叉波纹
          series: [
            {
              type: "liquidFill",
              data: [
                // data个数代表波浪数
                {
                  phase: 1,
                  value: props.data,
                  radius: "90%",
                  direction: "left",
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color:
                          props.waveColor?.[0]?.[0] ||
                          "rgba(115, 208, 255, 0.5)",
                      },
                      {
                        offset: 1,
                        color:
                          props.waveColor?.[0]?.[1] ||
                          "rgba(80, 153, 243, 0.5)",
                      },
                    ]),
                  },
                },
                {
                  value: props.data,
                  radius: "100%",
                  direction: "right",
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color:
                          props.waveColor?.[1]?.[0] ||
                          "rgba(22, 118, 224, 0.73)",
                      },
                      {
                        offset: 1,
                        color:
                          props.waveColor?.[1]?.[1] ||
                          "rgba(152, 241, 255, 0.73)",
                      },
                    ]),
                  },
                },
              ],
              backgroundStyle: {
                borderWidth: 1,
                borderColor: props.borderColor,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color:
                      props.backgroundColor?.[0] || "rgba(2, 95, 193, 0.3)",
                  },
                  {
                    offset: 1,
                    color:
                      props.backgroundColor?.[1] || "rgba(100, 182, 245, 0.3)",
                  },
                ]),
              },
              label: {
                show: true,
                formatter: props.formatter,
                textStyle: {
                  color: props.labelColor,
                  zIndex: 100,
                  fontSize: props.labelSize || "24px",
                  top: "10%",
                },
              },
              outline: {
                show: false,
              },
            },
          ],
        };
        myChart.setOption(option);
      }
    }

    return {
      id,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./css/index.less";
</style>