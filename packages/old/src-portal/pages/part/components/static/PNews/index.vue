<template>
  <n-card class="portal-panel p-news" :bordered="false" title="新闻动态" size="small">
    <template #header>
      <span @click="clickHandel">新闻动态</span>
    </template>
    <div class="news-box">
      <div class="news-headlines" v-for="item in dataList.slice(0, 1)">
        <img @click="() => handelClick(item)"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-07-16%2F5b4c5ee62d938.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665751907&t=03c7cef7a0475e371f4d6bafb9da4ad7"
          alt="" style="width:400px;height:300px:cursor: pointer;">
        <div class="headlines-content">
          <span class="label">头条</span>
          <span class="title" @click="() => handelClick(item)">{{ item.title }}</span>
          <span class="date">{{ item.updateTime.substring(0, 10) }}</span>
        </div>
      </div>
      <div class="news-cc">
        <div class="news-list" v-for="item in dataList.slice(1)">
          <span class="title" @click="() => handelClick(item)">{{ item.title }}</span>
          <span class="date">{{ item.updateTime.substring(0, 10) }}</span>
        </div>
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
      // window.open(row.contentUrl, 'newwindow');
      window.open('/web-old/html/portal/article.html?origin=xinwendongtai')
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
    const clickHandel = () => {
      window.open('/web-smm/pages/newsList.html?origin=xinwendongtai')
    }
    onMounted(() => {
      getData()
    })
    return {
      gridComponent,
      sysBizCode,
      getData,
      dataList,
      handelClick,
      page,
      clickHandel
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