<template>
  <div
    class="c-line-container"
    :id="id"
    style="width: 100%; height: 100%"
  ></div>
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
  name: "c-line",
  components: {
    echarts,
  },
  props: {
    data: {
      type: Object,
      default: () => ({ dataX: [], dataS: [] }), // 图表数据
    },
    dataZoom: {
      type: Boolean,
      default: false, //鼠标滚动横坐标缩放
    },
    gridColor: {
      type: String,
      default: "#2B478E", //网格线颜色
    },
    textColor: {
      type: String,
      default: "rgba(255,255,255, 0.8)", //坐标值颜色
    },
    lineColor: {
      type: Array,
      default: () => ["#3c76f4", "#33cda1", "#fd9b49", "#fc5785"], //折线色值
    },
    yAxisPrecision: {
      type: Number,
      default: 0, // y轴数值精度
    },
    area: {
      type: Boolean,
      default: false, //是否面积覆盖
    },
    tooltipFormatter: {
      type: Function,
      default: null, //tooltip文本数据格式化
    },
  },
  emits: ["handleDotClicked"],
  setup(props, { emit }) {
    let id = ref("");
    let myChart = null;
    watch(
      [() => props.data.dataX, () => props.data.dataS],
      ([valX, valS]) => {
        if (valX || valS) {
          nextTick(() => {
            renderCharts({ dataX: valX, dataS: valS });
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
      id.value = `c-line-${Math.floor(Math.random() * 10000)}`;
      nextTick(() => {
        const el = document.getElementById(id.value);
        if (el) {
          myChart = echarts.init(el);
          // 折线图渲染
          renderCharts(props.data);
          // 将此区域的鼠标样式变为小手
          myChart.getZr().on("mousemove", eStyle);
          // 节点点击
          myChart.getZr().on("click", handleChartClick);
          // 全局监听缩放
          window.addEventListener("resize", () => {
            myChart.resize();
          });
        }
      });
    }
    function eStyle(params) {
      var pointInPixel = [params.offsetX, params.offsetY];
      if (myChart.containPixel("grid", pointInPixel)) {
        // 将此区域的鼠标样式变为小手
        myChart.getZr().setCursorStyle("pointer");
      }
    }
    function handleChartClick(param) {
      // 获取 点击的 触发点像素坐标
      const pointInPixel = [param.offsetX, param.offsetY];
      if (myChart.containPixel("grid", pointInPixel)) {
        let xIndex = myChart.convertFromPixel(
          { seriesIndex: 0 },
          pointInPixel
        )[0];
        if (param.type == "click") {
          emit("handleDotClicked", { dataIndex: xIndex });
        }
      }
    }
    function renderCharts({ dataX, dataS }) {
      if (myChart) {
        let series = [];
        if (dataS && dataS.length) {
          dataS.forEach((e, i) => {
            let seriesItem = {
              clickable: true,
              data: [],
              type: "line",
              smooth: true,
              showSymbol: true,
              symbol: "circle", //设定为实心点
              symbolSize: 6, //设定实心点的大小
            };
            if (props.area)
              seriesItem.areaStyle = {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#4992FF", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#4992ff00", // 100% 处的颜色
                    },
                  ],
                },
              };
            if (e && e.length) seriesItem.data = JSON.parse(JSON.stringify(e));
            if (props.area) {
              let color = "";
              if (props.lineColor[i]?.length == 7) {
                color = props.lineColor[i];
              } else if (props.lineColor[i]?.length == 4) {
                color = `#${props.lineColor[i][1]}${props.lineColor[i][1]}${props.lineColor[i][2]}${props.lineColor[i][2]}${props.lineColor[i][3]}${props.lineColor[i][3]}`;
              } else {
                return console.warn("色值格式不正确");
              }
              seriesItem.areaStyle.color.colorStops = [
                {
                  offset: 0,
                  color,
                },
                {
                  offset: 1,
                  color: color + "00",
                },
              ];
            }
            series.push(seriesItem);
          });
        }

        let option = {
          color: props.lineColor,
          tooltip: {
            trigger: "axis",
            formatter: props.tooltipFormatter,
          },
          grid: {
            left: "1%",
            right: "3%",
            top: "10%",
            bottom: "10%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            axisLabel: {
              color: props.textColor,
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                width: 1,
                color: props.gridColor, //x坐标轴颜色
              },
            },
            boundaryGap: false,
            axisPointer: {
              type: "shadow",
            },
            data: dataX,
          },
          yAxis: {
            type: "value",
            axisLabel: {
              color: props.textColor,
              fontSize: 12,
              formatter: function (value, index) {
                return value.toFixed(props.yAxisPrecision);
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: props.gridColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: [props.gridColor],
                width: 1,
              },
            },
          },
          series: series,
          dataZoom: props.dataZoom
            ? [
                {
                  show: true,
                  bottom: 20,
                  realtime: true,
                  height: 10,
                  xAxisIndex: [0],
                  start: 0,
                  end: (6 / dataS?.length) * 100,
                },
                {
                  type: "inside",
                  realtime: false,
                  xAxisIndex: [0],
                  height: 15,
                  start: 0,
                  end: (6 / dataS?.length) * 100,
                },
              ]
            : [],
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