<template>

  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5" style="padding: 0 5px;">
        <H3>大宗商品统计</H3>
      </n-space>
      <n-space :size="5" style="padding: 0 5px;">
        <n-form ref="formRef" inline label-placement="left" label-align="right" :label-width="120" :model="SearchForm"
          style="height: 30px;">
          <n-form-item label="大宗商品名称" path="commodityItemName">
            <n-select v-model:value="searchFrom.commodityItemName" filterable placeholder="选择商品名称（可输入查询）"
              :options="commodityItemNameOptions" />
          </n-form-item>
          <n-form-item label="查询日期" path="commodityItemName">
            <n-date-picker v-model:value="range" type="datetimerange" clearable />
          </n-form-item>
          <n-form-item>
            <n-button type="info" attr-type="button" style="margin-right: 5px;" @click="() => {
              search()
            }">
              查询
            </n-button>
            <n-button type="warning" attr-type="button" @click="() => {
              searchFrom = {}
              range = [getCurrentMonthFirst(), getCurrentMonthLast()]
              search()
            }">
              重置
            </n-button>
          </n-form-item>
        </n-form>

        <!-- <n-button type="warning" >编辑</n-button> -->
      </n-space>
    </n-layout-header>

    <n-layout has-sider content-style="height: 100%">
      <n-spin :show="show" style="height:100%">
        <div id="main" style="height:100%;width: 100%;"></div>
      </n-spin>
    </n-layout>
  </n-layout>

</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  MarkLineComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
  DataZoomComponent,
  MarkLineComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);
import option from './data/eChartOptions.js'
import { getCurrentMonthLast, getCurrentMonthFirst } from './utils/index.js'
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NForm,
  NFormItem,
  NSpin,
  NDrawerContent,
  NPopconfirm,
  useMessage,
  NLayoutSider,
  NSelect,
  NDatePicker
} from 'naive-ui'
import { suppFillCommodityGetList } from './api/index.js'
import { suppCommodityItemList } from '../purchaseProgressAdmin/api';
import { format } from "date-fns";
export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NForm,
    NFormItem,
    NSpin,
    NDrawerContent,
    NPopconfirm,
    NLayoutSider,
    NSelect,
    NDatePicker
  },
  setup() {
    let myChart = {}
    const searchFrom = ref({ commodityItemName: '铜' })
    const commodityItemNameOptions = ref([])
    const show = ref(false)
    const parseQuery = (query = window.location.search.split('?')[1]) => {
      if (!query) return {}
      const strings = query.split('&');
      const res = {};
      for (let i = 0; i < strings.length; i++) {
        const str = strings[i]
        const sEq = str.indexOf('=')
        res[str.slice(0, sEq)] = str.slice(sEq + 1);
      }
      return res
    }
    if (parseQuery().commodityItemName) {
      searchFrom.value.commodityItemName = decodeURIComponent(parseQuery().commodityItemName)
      searchFrom.value.id = parseQuery().id
    }
    const range = ref([getCurrentMonthFirst(), getCurrentMonthLast()])
    const search = () => {

      let fillTimeStart = getCurrentMonthFirst(), fillTimeEnd = getCurrentMonthLast()
      if (range.value && range.value[0] && range.value[1]) {
        fillTimeStart = format(range.value[0], 'yyyy-MM-dd HH:mm:ss')
        fillTimeEnd = format(range.value[1], 'yyyy-MM-dd HH:mm:ss')
      }
      show.value = true
      suppFillCommodityGetList({ ...searchFrom.value, fillTimeStart, fillTimeEnd }).then(res => {
        console.log(res, 'option.value.option.value.option.value.')
        show.value = false
        option.value.xAxis.data = res.map(d => d.fillTime.slice(0, 10))
        option.value.series.data = res.map(d => d.commodityItemPrice)
        let maxExpenditure, minExpenditure, expenditure
        if (res[0].purchaseProductMixList.length > 0) {
          maxExpenditure = res[0].purchaseProductMixList[0].expenditurePattern * (res[0].floatRange * 0.01 + 1)
          minExpenditure = res[0].purchaseProductMixList[0].expenditurePattern * (1 - res[0].floatRange * 0.01)
          expenditure = res[0].purchaseProductMixList[0].expenditurePattern
        } else {
          maxExpenditure = 0
          minExpenditure = 0
          expenditure = 0
        }
        option.value.series.markLine.data = [
          {
            yAxis: minExpenditure
          },
          {
            yAxis: expenditure
          },
          {
            yAxis: maxExpenditure
          },
        ]
        option.value.series.name = `大宗商品 ${res[0].commodityItemName}`
        if (maxExpenditure == 0) {
          option.value.visualMap.pieces = []
        } else {
          option.value.visualMap.pieces = [
            {
              gt: 0,
              lte: minExpenditure,
              color: '#FBDB0F'
            },
            {
              gt: minExpenditure,
              lte: maxExpenditure,
              color: '#93CE07'
            },
            {
              gt: maxExpenditure,
              color: '#FD0100'
            },
          ]
        }

        myChart.setOption(option.value);
      }).finally(() => {
        show.value = false
      })
    }
    onMounted(() => {
      search()
      suppCommodityItemList({}).then(res => {
        commodityItemNameOptions.value = res.map(d => {
          return {
            label: d.commodityItemName,
            value: d.commodityItemName
          }
        })
      })
      var chartDom = document.getElementById('main');
      myChart = echarts.init(chartDom);
    })

    return {
      commodityItemNameOptions,
      searchFrom,
      myChart,
      search,
      option,
      range,
      getCurrentMonthLast,
      getCurrentMonthFirst,
      show
    }
  }
})

</script>
<style  lang='less'>
.n-spin-container {
  width: 100%;

  .n-spin-content {
    height: 100%;
  }
}
</style>