<template>
  <div class="c-pie-container" style="width: 100%; height: 100%">
    <slot></slot>
    <div :id="id" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
export default defineComponent({
  name: "c-pie",
  components: {
    echarts,
  },
  props: {
    data: {
      // 图表数据
      type: Array,
      default: () => [],
    },
    mode: {
      //饼图类型
      type: String,
      default: "circle", // circle环形 radial辐射形
    },
    textColor: {
      type: String,
      default: "#fff", // 通用文本色值
    },
    pieColor: {
      type: Array,
      default: () => ["#3c76f4", "#33cda1", "#fd9b49", "#fc5785"], //折线色值
    },
    fontSize: {
      type: Number,
      default: 14, // 环形中心字体大小
    },
    page: {
      type: Object,
      default: () => ({
        iconColor: "#fff", // 分页器图标色值
        textColor: "#fff", // 分页器文本色值
      }),
    },
    tooltipFormatter: {
      type: Function,
      default: null, //tooltip文本数据格式化
    },
    legendPosition: {
      type: Object,
      default: () => ({ top: "auto" }), //图例方位及距离
    },
    borderRadius: {
      type: Number,
      default: 0, //环形饼图圆角大小
    },
    processColor: {
      type: String,
      default: "#5470c6", // 辐射形-进度色值
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
            renderCharts(val);
          });
        }
      },
      { deep: true }
    );

    onMounted(() => {
      init();
    });
    // 取消全局监听
    onUnmounted(() => {
      window.removeEventListener("resize", () => {});
    });

    // 初始化
    function init() {
      id.value = `c-pie-${Math.floor(Math.random() * 10000)}`;
      nextTick(() => {
        const el = document.getElementById(id.value);
        if (el) {
          myChart = echarts.init(el);
          renderCharts(props.data);
          // 全局监听缩放
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        }
      });
    }
    // 图表渲染
    function renderCharts(data) {
      if (myChart) {
        let seriesOpts = {};
        if (props.mode == "radial") {
          seriesOpts = {
            radius: "100%",
            // color: [props.processColor, "transparent"],
            hoverAnimation: false,
          };
        } else if (props.mode == "circle") {
          seriesOpts = {
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: props.borderRadius || 0,
            },
            emphasis: {
              label: {
                show: false,
              },
            },
          };
        }
        let option = {
          color: props.pieColor,
          tooltip: {
            trigger: "item",
            show: !props.mode == "radial",
            formatter: props.tooltipFormatter,
          },
          legend:
            props.mode == "radial"
              ? null
              : {
                  ...props.legendPosition,
                  type: "scroll",
                  pageIconColor: props.page?.iconColor || "#fff", //type=scroll时，设置翻页按钮颜色
                  pageTextStyle: {
                    color: props.page?.textColor || "#fff", //type=scroll时，设置翻页页码颜色
                  },
                  textStyle: {
                    color: props.textColor,
                  },
                },
          series: [
            {
              type: "pie",
              label: {
                show: false,
                // position: "center",
                // fontSize: props.fontSize,
                // fontWeight: "bold",
                // backgroundColor: "transparent",
              },
              labelLine: {
                show: false,
              },
              data: data,
              ...seriesOpts,
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