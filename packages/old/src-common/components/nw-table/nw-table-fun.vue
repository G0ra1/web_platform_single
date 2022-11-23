<template>
  <n-config-provider abstract :theme-overrides="theme">
    <!-- 全文检索二次过滤条件 -->
    <!-- 全文检索!(table && table.searchFormActive) -->
    <template v-if="table && !table.searchFormActive">
      <!-- <n-dropdown :options="options">
        <n-button size="small">时间范围</n-button>
      </n-dropdown> -->
      <n-input-group style="width: 240px">
        <n-input placeholder="输入搜索内容" size="small" :style="{ width: '190px' }" />
        <n-button
          size="small"
          type="primary"
          ghost
          style="background: #fff;"
        >搜索</n-button>
      </n-input-group>
    </template>
    
    <template v-if="table && table.searchFormActive"><!-- 这里是高级查询条件 -->
      <n-tag
      v-for="item in (table ? table.searchFormCache.items : [])"
      :key="item.field"
      closable 
      @close="() => {}"
      style="margin-right: 5px;"> {{item.title}}: {{item.value}} </n-tag>
      <!-- <n-tag closable  @close="() => {}" style="margin-right: 5px;">
         年龄: 18 ~ 23
      </n-tag> -->
      <n-button style="margin-right: 5px;"
      v-if="table && table.searchFormCache.items.length"
      type="warning"
      size="small"
      @click="() => {
        table.resetSearch()
      }"
      >重置</n-button>
    </template>
      <!-- 高级查询触发按钮 -->
      <n-button
      ghost
      style="background: #fff;color: #000"
      size="small"
      @click="() => {
        table.toggleSearchForm()
      }"
      >高级搜索</n-button>
    
  </n-config-provider>
</template>
<script>
import {
    NButton,
    NInputGroup,
    NInput,
    NTag,
    NDropdown,
    NConfigProvider
} from 'naive-ui'
import { h, ref, reactive, defineComponent } from 'vue'
import theme from './theme.js'

export default defineComponent({
  props: [ 'table' ],
  components: {
    NButton,
    NInputGroup,
    NInput,
    NTag,
    NDropdown,
    NConfigProvider
  },
  setup (props) {
    // const nwTable = ref(null)
    // return {
    //   nwTable,
    // }
    console.log('toggleSearchForm==', props)
    const searchFormActive = ref(false)
    return {
      theme: {

      },
      options: [
        {
          label: '1天内',
          key: 'profile'
        },
        {
          label: '1周内',
          key: 'editProfile'
        },
        {
          label: '1月内',
          key: 'logout'
        },
        {
          label: '1年内',
          key: 'logout'
        },
        {
          label: '自定义',
          key: 'logout'
        }
      ]
    }
  },
  methods: {
  }
})
// 整体body用于抽屉覆盖
// const tbody = ref(null)
// const searchFormActive = ref(false)
// const collapsed = ref(true)
// const tablePage = reactive({
//   total: 0,
//   currentPage: 1,
//   pageSize: 10
// })

// const handlePageChange = () => {}
// const gridOptions = reactive({
//   size: 'mini',
//   border: false,
//   resizable: true,
//   height: 300,
//   align: null,
//   columns: [
//     { type: 'seq', width: 50 },
//     { field: 'name', title: 'app.body.label.name' },
//     { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
//     { field: 'address', title: 'Address', showOverflow: true }
//   ],
//   // toolbarConfig: {
//   //   slots: {
//   //     buttons: 'toolbar_buttons'
//   //   }
//   // },
//   data: [
//     { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
//     { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
//     { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
//     { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
//     { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
//     { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
//     { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
//     { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
//   ]
// })
// // 查询表单

// const toggleSearchForm = (active = true) => {
//   searchFormActive = active
// }
</script>

<style lang='less'>
// 表格样式
.nw-table {
  height: 100%;
  &-header {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    padding: 0 5px;
    border: 1px solid #e6e9f0;
    border-bottom: 2px solid #188ae2;
    &-left {
      // float: left;
    }
    &-right {
      // float: right;
    }
  }
  &-content {
    height: calc(~'100% - 40px')
  }
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #FFFFFF;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 5px;
  border: 1px solid #F1F1F1;
  // box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #A8A8A8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #FFFFFF;
}
</style>