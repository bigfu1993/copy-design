import { watch, ref, onMounted, onBeforeUnmount } from "vue";
export default function tableMixin({ getTableData }) {
  const id = `${Math.random() * 10000}`;
  const innerHeight = ref(0); // 内表格高度
  const viewHeight = ref(0); // 视口高度
  const filterVisible = ref(false); // 高级筛选flag
  const isLoading = ref(false); // 表格是否正在加载
  const page = ref(1); // 当前页
  const pageSize = ref(10); // 每页条数
  const total = ref(100); // 总条数
  const symbolMap = { 1: "__gt", 2: "__lt", 3: "", 4: "__gte", 5: "__lte" }; // 筛选条件map
  //   获取高度
  function getHeight() {
    const interval = setInterval(() => {
      const tableEle = document.getElementById(id.toString());
      if (tableEle) {
        clearInterval(interval);
        innerHeight.value = tableEle.clientHeight - 107;
        setTableH();
      }
    });
    viewHeight.value = window.document.body.clientHeight / 100;
  }
  function setTableH() {
    const el = document.querySelector(".ant-table-body");
    el.style.height = `${
      innerHeight.value - 80 - (filterVisible.value ? 120 : 0)
    }px`;
  }
  // 表格文本宽度
  function getTextWidth(text, font = "13px Microsoft YaHei") {
    const numberArr = font.match(/\d+/);
    if (numberArr) {
      const number = numberArr[0];
      if (
        (/\d+(\.\d+)?vh/.test(font) && +number * viewHeight.value < 12) ||
        (/\d+(\.\d+)?px/.test(font) && +number < 12)
      )
        font = font.replace(/\d+(\.\d+)?(vh|px)/, "12px");
    }
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    const canvasText = context.measureText(text);
    return Math.round(canvasText.width);
  }
  //  切换分页
  async function pageChange(curPage, pageSize) {
    page.value = curPage;
    await getTableData();
  }
  onMounted(() => {
    // getHeight();
    window.addEventListener("resize", getHeight);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("resize", getHeight);
  });

  watch(filterVisible, (val) => {
    setTableH();
  });
  return {
    id,
    isLoading,
    filterVisible,
    symbolMap,
    page,
    pageSize,
    total,
    innerHeight,
    viewHeight,
    getTextWidth,
    pageChange,
  };
}
