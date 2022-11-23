<template>
  <n-card class="portal-panel p-processing" :bordered="false" title="安全运营" size="small">
    <div class="p-box" v-for="item in dataList">
      <div class="title" @click="()=>handel(item)">{{item.title}}</div>
      <div class="content">
        <span>发布人：{{item.applyUserName||'admin'}}</span>
        <span>所属机构：{{item.createUserParentDeptName}}</span>
        <span class="date">{{item.updateTime.substring(0,10)}}</span>
      </div>
    </div>
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
    const handelClick = (row) => {
      const token = cookies.get("token");
      const tokenType = cookies.get("tokenType");
      window.open(`${row.sysPcBizUrl}&token=${tokenType} ${token}`)
    }
    const page = ref(1)
    const dataList = ref([])
    const getData = (p) => {
      request({
        url: `portal/portalContentNews/list`,
        method: 'post',
        data: {
          "portalId": "1569963171545935874",
          "partCode": "xwxx",
          page: {
            size: 5,
            current: 1
          }
        }
      }).then(res => {
        dataList.value = res.records
        console.log(dataList.value)
        // return {
        //   list: res.records
        // }
      })
    }
    onMounted(() => {
      getData()
    })
    const handel = (item) => {
      window.open(item.contentUrl, 'newwindow');
    }
    return {
      gridComponent,
      sysBizCode,
      getData,
      dataList,
      handelClick,
      page,
      handel
    }
  }
})
</script>
<style lang='scss'>
$vxe-table-row-height-mini: 16px !default;
</style>
<style lang='less'>
.p-processing.n-card {
  position: relative;
  padding: 20px;

  .p-box {
    padding-top: 10px;
    width: 100%;
  }

  .p-box:first-child {
    padding-top: 32px;
    width: 100%;
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
    padding: 20px;
  }

  .title {
    font-size: 16px;
    font-family: Alibaba PuHuiTi 2.0;
    font-weight: normal;
    cursor: pointer;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 381px;
  }

  .title:hover {
    color: #C91019;
  }

  .content {
    position: relative;
    font-size: 14px;
    font-family: Alibaba PuHuiTi 2.0;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.44);
    margin-top: 10px;
    height: auto;

    span {
      margin-right: 10px;
    }

    .date {
      position: absolute;
      right: 0;
    }
  }

}
</style>