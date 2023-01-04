<template>
  <div class="c-bar-container" :id="id" style="width: 100%; height: 100%"></div>
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
  name: "c-bar",
  components: {
    echarts,
  },
  props: {
    data: {
      // 图表数据
      type: Object,
      default: () => ({ dataX: [], dataS: [] }),
    },
    gridColor: {
      //网格线颜色
      type: String,
      default: "#2B478E",
    },
    textColor: {
      //坐标值颜色
      type: String,
      default: "rgba(255,255,255,0.8)",
    },
    direction: {
      // 柱状图方向：vertical竖向 horizontal横向
      type: String,
      default: "vertical",
    },
    grid: {
      // 网格布局
      type: Object,
      default: () => ({ top: 40, bottom: 20, left: "8%", right: "5%" }),
    },
  },
  setup(props) {
    let id = ref("");
    let myChart = null;
    watch(
      [() => props.data.dataX, () => props.data.dataS],
      ([valX, valS]) => {
        if (valX || valS) {
          nextTick(() => {
            renderCharts(props.data);
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
      id.value = `c-bar-${Math.floor(Math.random() * 10000)}`;
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
    function renderCharts({ dataX, dataS }) {
      if (myChart) {
        let series = [];
        let legend = [];
        if (dataS && dataS.length) {
          dataS.forEach((e) => {
            let linearColor = [
              { offset: 0, color: e?.color[0] || "#4992ff" },
              { offset: 1, color: e?.color[1] || "#02132B" },
            ];
            let linearDirection =
              props.direction == "horizontal"
                ? new echarts.graphic.LinearGradient(1, 0, 0, 0, linearColor)
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, linearColor);
            let seriesItem = {
              type: "bar",
              name: e.name || "",
              data: e.data || [],
              barWidth: "20%",
              itemStyle: {
                color: linearDirection,
                borderRadius:
                  props.direction == "horizontal"
                    ? [0, 20, 20, 0]
                    : [20, 20, 0, 0],
              },
              label: {
                show: true,
                position: props.direction == "horizontal" ? "right" : "top",
                color: props.textColor,
                fontSize: 14,
              },
            };

            legend.push(e.name);
            series.push(seriesItem);
          });
        }

        let option = {
          legend: legend?.length
            ? {
                data: legend,
                textStyle: { color: props.textColor },
              }
            : null,
          grid: props.grid,
          xAxis: {
            type: props.direction == "horizontal" ? "value" : "category",
            data: props.direction == "horizontal" ? null : dataX,
            axisLabel: { fontSize: 14, color: props.textColor },
            axisLine: {
              show: true,
              lineStyle: { color: props.gridColor, type: "solid" },
            },
            splitLine:
              props.direction == "horizontal"
                ? {
                    lineStyle: {
                      color: [props.gridColor],
                      width: 1,
                    },
                  }
                : null,
          },
          yAxis: {
            type: "value",
            type: props.direction == "horizontal" ? "category" : "value",
            data: props.direction == "horizontal" ? dataX : null,
            axisLabel: { fontSize: 14, color: props.textColor },
            axisLine: {
              show: true,
              lineStyle: { color: props.gridColor, type: "solid" },
            },
            splitLine:
              props.direction == "horizontal"
                ? null
                : {
                    lineStyle: {
                      color: [props.gridColor],
                      width: 1,
                    },
                  },
          },
          series: series,
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