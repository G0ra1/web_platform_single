<template>
  <n-layout class="nw-layout-full news-nw-layout-full">
    <div class="new-list">
      <header>
        <n-button size="small" @click="closeWindow">
          <nw-icon name="icon-xiangzuojiantou" />返回
        </n-button>
        <h5>{{title}}</h5>
      </header>
      <div class="menu-box">
        <n-menu :indent="8" :options="MenuOptions" :default-value="deMenuCode" :value="MenuCode"
          @update:value="handleMenu" />
      </div>
      <content>
        <div class="item-list" v-for="item in dataList">
          <div class="list-content" @click="()=>handelClick(item)">
            <img v-if="item.imgUrl" :src="item.imgUrl" alt="" width="142" height="100">
            <div class="con-text">
              <span class="title">
                <span v-if="item.title">
                  {{item.title}}
                </span>
                <span class="fileName" v-else>
                  <a class="down" title="点击下载" :href="item.fileUrl" :download="item.fileName">{{item.fileName}}</a>
                </span>
              </span>
              <span class="date">
                {{item.createTime.substring(0,10)}}
              </span>
            </div>

          </div>
          <div class="list-active">
            <nw-icon name="icon-n-y-heart" :size="18" style="margin-right: 16px; cursor:pointer" />浏览次数：232
          </div>
        </div>

      </content>
      <n-pagination v-model:page="current" :page-count="pageCount" :on-update:page="pageChange" />
    </div>
  </n-layout>

</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
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
  NDrawerContent,
  NMenu,
  NPagination
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'
import { format } from "date-fns";
import { portalContentNews, portalContentFiles } from "../../api/index.js"

export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NMenu,
    NPagination
  },
  setup() {
    const title = ref('新闻动态')
    const MenuOptions = ref([
      {
        label: '新闻动态',
        key: "xinwendongtai",
      },
      {
        label: '通知公告',
        key: "tongzhigonggao",
      },
      {
        label: '共享文件',
        key: "gongxiangwenjian",
      },
    ])
    const pageSize = ref(6)
    const current = ref(1)
    const pageCount = ref(1)
    const MenuCode = ref()
    const handleMenu = (menu, item) => {
      console.log(menu, item)
      MenuCode.value = menu
      title.value = item.label
      getData()
    }
    const parseQuery = (query) => {
      const strings = query.split('&');
      const res = {};
      for (let i = 0; i < strings.length; i++) {
        const str = strings[i]
        const sEq = str.indexOf('=')
        res[str.substr(0, sEq)] = str.substr(sEq + 1);
      }
      return res
    }
    const deMenuCode = ref('xinwendongtai')
    const dataList = ref([])
    const handelClick = (row) => {
      // const token = cookies.get("token");
      // const tokenType = cookies.get("tokenType");
      // window.open(`${row.sysPcBizUrl}&token=${tokenType} ${token}`)
      window.open(row.contentUrl, 'newwindow');
    }
    const getData = () => {
      let fn, data;
      if (MenuCode.value == 'gongxiangwenjian') {
        fn = portalContentFiles
        data = {
          "portalId": "1569963171545935874",
          "partCode": "gxwj",
        }
      } else {
        fn = portalContentNews
        data = {
          "portalId": "1569963171545935874",
          "partCode": "xwxx",
        }
      }
      fn({
        ...data,
        page: {
          size: pageSize.value,
          current: current.value
        }
      }).then(res => {
        current.value = res.current
        if (MenuCode.value == 'gongxiangwenjian') {
          dataList.value = res.records[0].filesSons
          console.log(res.records[0].filesSons)
        } else {
          dataList.value = res.records
        }
        pageCount.value = res.pages
      })
    }
    const pageChange = (page) => {
      current.value = page
      getData()
    }
    const closeWindow = () => {
      window.close()
    }
    onMounted(() => {
      MenuCode.value = location.search.split('?') ? parseQuery(location.search.split('?')[1]).origin : ''
      title.value = MenuOptions.value.filter(d => d.key == MenuCode.value)[0].label
      getData()
      console.log(MenuCode.value)

    })
    return {
      MenuOptions,
      MenuCode,
      handleMenu,
      title,
      getData,
      current,
      pageSize,
      dataList,
      handelClick,
      pageCount,
      pageChange,
      closeWindow,
      deMenuCode

    }
  }
})

</script>

<style lang="less">
.news-nw-layout-full {
  background-color: #f7f7f7;
  padding: 16px;

  .new-list {
    height: 100%;
    width: 1220px;
    margin: 0 auto;
    position: relative;

    .n-pagination {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      margin: auto;
      width: 200px;
    }

    header {
      display: flex;
      align-items: center;

      h5 {
        margin: 0;
        margin-left: 20px;
        font-size: 16px;
        padding: 0;
      }
    }

    .menu-box {
      margin-top: 16px;

      .n-menu .n-menu-item-content .n-menu-item-content-header {
        padding-left: 40px;
      }

      .n-menu .n-menu-item-content.n-menu-item-content--selected .n-menu-item-content-header {
        color: #C91019;
        border-left: 2px solid;
      }

      .n-menu .n-menu-item {
        height: 48px;
      }

      .n-menu {
        position: absolute;
        width: 169px;
        background: #fff;
        padding: 10px 0 25px;
        border-radius: 6px;
        left: -8px;
      }

      .n-menu-item .n-menu-item-content.n-menu-item-content--selected::before {
        background: rgba(201, 16, 25, 0.2);
      }
      
    }
  }

  content {
    width: 1050px;
    height: ~"calc(100% - 46px)";
    margin: 0 auto;
    background: #fff;
    position: absolute;
    left: 170px;
    overflow: auto;
    padding-bottom: 80px;
    box-sizing: border-box;
  }

  .item-list {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px dashed #ccc;
    padding-left: 25px;
    padding-right: 25px;
    position: relative;

    .list-content {
      display: flex;
      min-height: 100px;


      img {
        margin-right: 12px
      }

      .con-text {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: 16px;
          cursor: pointer;
        }

        .down {
          color: var(--n-item-text-color);
        }

        .down:hover {
          color: #C91019;
        }

        .title:hover {
          color: #C91019;
        }

        .date {
          font-size: 14px;
          font-family: Alibaba PuHuiTi 2.0;
          font-weight: normal;
          line-height: 0px;
          color: rgba(0, 0, 0, 0.44);
        }
      }
    }

    .list-active {
      position: absolute;
      right: 25px;
      bottom: 16px;
      font-size: 14px;
      font-family: Alibaba PuHuiTi 2.0;
      font-weight: normal;
      line-height: 0px;
      color: rgba(0, 0, 0, 0.44);
    }
  }
}
</style>
