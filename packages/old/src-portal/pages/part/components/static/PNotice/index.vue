<template>
  <n-card class="portal-panel p-notice" :bordered="false" title="" size="small">
    <n-tabs class="p-notice-tabs" size="small" type="card" tab-style="min-width: 40px;" trigger="hover" :pane-style="{
      display: 'none',
    }" v-model:value="sysBizCode" @update:value="onChangeBizCode">
      <n-tab-pane :tab="tabRander1" name="notice">
        <div class="notice-box" v-for="item in noticeDataList">
          <span class="title" @click="()=>handel(item)">{{item.title}}</span>
          <span class="date">{{item.updateTime.substring(0,10)}}</span>
        </div>
      </n-tab-pane>
      <n-tab-pane :tab="tabRander2" name="file">
        <div class=" file-box" v-for="item in fileDataList">
          <span class="fileName">
            <a class="down" title="点击下载" :href="item.fileUrl" :download="item.fileName">{{item.fileName}}</a>
          </span>
        </div>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="jsx">
import { h, defineComponent, ref, reactive, onMounted, } from 'vue'
import { request, NwIcon } from '@platform/main'
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
    NFormItem,
    NwIcon
  },
  setup(props) {
    // 所属系统
    const sysBizCode = ref('notice')
    const handelClick = (row) => {
      const token = cookies.get("token");
      const tokenType = cookies.get("tokenType");
      window.open(`${row.sysPcBizUrl}&token=${tokenType} ${token}`)
    }
    const tabRander1 = () => {
      return <span onClick={() => { clickHandel('tongzhigonggao') }}>{'通知公告(' + noticeNum.value + ')'}</span>
    }
    const tabRander2 = () => {
      return <span onClick={() => { clickHandel('gongxiangwenjian') }}>{'共享文件(' + fileNum.value + ')'}</span>
    }
    const noticeDataList = ref([])
    const fileDataList = ref([])
    const noticeNum = ref(0)
    const fileNum = ref(0)
    const getData = (p) => {
      request({
        url: `/portal/portalContentNews/list`,
        method: 'post',
        data: {
          "portalId": "1569963171545935874",
          "partCode": "tzgg",
          page: {
            size: 7,
            current: 1
          }
        }
      }).then(res => {
        noticeNum.value = res.total
        noticeDataList.value = res.records
      })
      request({
        url: `/portal/portalContentFiles/list`,
        method: 'post',
        data: {
          "portalId": "1569963171545935874",
          "partCode": "gxwj",
          page: {
            size: 7,
            current: 1
          }
        }
      }).then(res => {
        fileNum.value = res.records[0].filesSons.length
        fileDataList.value = res.records[0].filesSons
        // return {
        //   list: res.records
        // }
      })

    }
    const handel = (item) => {
      window.open(item.contentUrl, 'newwindow');
    }
    const clickHandel = (code) => {
      window.open(`/web-smm/pages/newsList.html?origin=${code}`)
    }
    onMounted(() => {
      getData()
    })
    return {
      sysBizCode,
      getData,
      noticeDataList,
      fileDataList,
      handelClick,
      onChangeBizCode(p) {
        sysBizCode.value = p
        getData()
      },
      noticeNum,
      fileNum,
      handel,
      clickHandel,
      tabRander1,
      tabRander2
    }
  }
})
</script>
<style lang='scss'>
$vxe-table-row-height-mini: 16px !default;
</style>
<style lang='less'>
.p-notice.n-card {
  position: relative;
  height: 400px !important;

  .n-tabs {
    margin-top: -14px;
  }

  .n-tabs .n-tabs-nav {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1412);
  }

  .n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab {
    border: none;
    font-size: 16px;
    font-family: Alibaba PuHuiTi 2.0;
    box-sizing: border-box;
    padding-bottom: 15px;
    margin-right: 15px;
    color: #C91019;
    background-color: #fff;
  }

  .n-tabs .n-tabs-nav.n-tabs-nav--card-type .n-tabs-tab.n-tabs-tab--active {

    border-bottom: 2px solid #C91019;
  }

  .notice-box,
  .file-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;
    cursor: pointer;
  }

  .notice-box {
    .title {
      font-size: 16px;
      font-family: Alibaba PuHuiTi 2.0;
      font-weight: normal;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 381px;
    }

    .title:hover {
      color: #C91019;
    }

    .date {
      font-size: 14px;
      font-family: Alibaba PuHuiTi 2.0;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.44);
    }
  }


  .file-box {
    .fileName {
      .down {
        font-size: 16px;
        font-family: FZCuHeiSongS-B-GB;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.94);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 381px;
      }
    }
  }





}
</style>