<template>
  <n-card class="portal-panel p-sapp" :bordered="false" title="待办信息" size="small">
    <p class="app-item" v-for="item in dataList" :key="item.id" @click="()=>handelClick(item)">
      <img style="height:32px;" src="../../../../../../public/assets/image/123.png" alt="">
      <span class="bubbles">0</span>
      <span>{{item.sysName}}</span>
    </p>
    <!-- <n-pagination v-model:page="page" :page-count="pageCount" /> -->
  </n-card>
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h, defineComponent, ref, reactive, onMounted, } from 'vue'
import { request } from '@platform/main'
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NSpace,
  useMessage
} from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import cookies from "/@/utils/cookies.js";

export default defineComponent({
  props: {
    moreUrl: {
      type: String,
      default: '/taskDetail',
    },
  },
  components: {
    NSpace,
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NForm,
    NFormItem
  },
  setup(props) {
    // 所属系统
    const sysBizCode = ref('')
    const gridComponent = ref(null)
    const router = useRouter()
    const handelClick = (item) => {
      // const token = cookies.get("token");
      // const tokenType = cookies.get("tokenType");
      // window.open(`${row.sysPcBizUrl}&token=${tokenType} ${token}`)
      window.open(item.sysUrl, 'newwindow');
    }
    const page = ref(1)
    const pageCount = ref(1)
    const dataList = ref([])
    const getData = (p) => {
      request({
        url: `portal/portalContentSysjoints/listForShow`,
        method: 'post',
        data: {
          "portalId": "1569963171545935874",
          "partCode": "dbxx"
        }
      }).then(res => {
        dataList.value = res.records
        pageCount.value = res.pages
        page.value = res.current
        console.log(dataList.value)

      })
    }
    onMounted(() => {
      getData()
    })
    return {
      gridComponent,
      sysBizCode,
      getData,
      dataList,
      pageCount,
      handelClick,
      page
    }
  }
})
</script>
<style lang='scss'>
$vxe-table-row-height-mini: 16px !default;
</style>
<style lang='less'>
.p-sapp.n-card {
  position: relative;
  padding: 20px;
  height: 400px !important;

  .n-pagination {
    position: absolute;
    bottom: 10px;
    right: 10px;

    .n-pagination-item:not(.n-pagination-item--disabled).n-pagination-item--active {
      background: #C91019;
      opacity: 1;
      border-radius: 2px;
      color: #fff;
      border: none;
    }
  }

  .n-card-header {
    padding: 0px;

    .n-card-header__main {
      font-size: 16px;
      font-family: Alibaba PuHuiTi 2.0;
      color: #C91019;
      padding-left: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1412);
      cursor: pointer;
    }
  }

  .n-card__content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    padding: 30px;
  }

  .app-item {
    box-sizing: border-box;
    width: 145px;
    height: 50px;
    margin-right: 19px;
    padding-top: 8px;
    padding-left: 8px;
    margin: 0px;
    cursor: pointer;
    position: relative;

    span.bubbles {
      position: absolute;
      font-size: 12px;
      left: 15px;
      top: 0px;
      height: 16px;
      width: 16px;
      background: #c91019;
      border-radius: 8px;
      color: #fff;
      text-align: center;
      line-height: 16px;
    }

    img {
      vertical-align: middle;
    }

    span {
      margin-left: 18px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.94);
    }
  }

  .app-item:hover {
    background: #F7E3E4;
    box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.08);
    opacity: 1;
    border-radius: 2px;
  }
}
</style>