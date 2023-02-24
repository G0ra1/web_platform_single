<template>
  <n-card class="portal-panel p-news" :bordered="false" title="新闻动态" size="small">
    <template #header>
      <span >蓝凌待办中心</span>
    </template>
    <iframe
        :src="frameSrc"
        style="height: 100%;width: 100%;border: none"
      ></iframe>
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
    const frameSrc = ref('http://10.188.253.37:7070/sys/portal/sys_portal_page/sysPortalPage.do?method=view&fdId=1626befa37fbacdedc7dd3b46749e2b2')
    return {
      frameSrc
    }
  }
})
</script>
<style lang='scss'>
$vxe-table-row-height-mini: 16px !default;
</style>
<style lang='less'>
.p-news.n-card {
  position: relative;
  padding: 20px;

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

  .news-box {
    display: flex;
    width: 100%;

    .title {
      font-size: 16px;
      font-family: Alibaba PuHuiTi 2.0;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.94);
    }

    .title:hover {
      color: #C91019;
      cursor: pointer;
    }

    .date {
      font-size: 14px;
      font-family: Alibaba PuHuiTi 2.0;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.44);
    }

    .news-headlines {
      width: 400px;
      cursor: pointer;

      .headlines-content {
        display: flex;
        align-items: center;
        position: relative;

        .title {
          display: block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .label {
          width: 52px;
          height: 28px;
          background: #C91019;
          opacity: 1;
          border-radius: 14px;
          font-size: 14px;
          font-family: Alibaba PuHuiTi 2.0;
          font-weight: normal;
          color: #FFFFFF;
          text-align: center;
          line-height: 28px;
          margin-right: 10px;
        }

        .date {
          position: absolute;
          width: 100%;
          bottom: -28px;
          text-align: right;
        }
      }
    }

    .news-cc {
      flex: 1;
      width: 0;
      padding-left: 32px;
      padding-top: 20px;
      overflow: hidden;

      .news-list {
        margin-top: 15px;
      }

      .title {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .date {
        display: block;
        text-align: right;
        margin-top: 5px;
      }
    }
  }





}
</style>