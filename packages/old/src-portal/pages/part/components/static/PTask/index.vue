<template>
  <n-card class="portal-panel p-task" :bordered="false" size="small">
    <template #header-extra>
      <a href="javascript:void(0)" style="z-index: 999; font-size: 16px; font-weight: 700; color: #1277d1"
        @click="handleMore">
        <div
          style="width: 14px;height: 14px;border: 1px solid #01458E;border-radius: 50%;display: flex;justify-content: space-between;align-items: center;">
          <span style="width: 2px;height: 2px;background: #01458E;border-radius: 50%;display: inline-block;}"></span>
          <span style="width: 2px;height: 2px;background: #01458E;border-radius: 50%;display: inline-block;}"></span>
          <span style="width: 2px;height: 2px;background: #01458E;border-radius: 50%;display: inline-block;}"></span>
        </div>
      </a>
    </template>
    <template #header>
      <div class="p-task-header">
        <div style="width: 40px">待办</div>
        <!-- <n-tabs class="p-task-tabs" size="small" type="card" tab-style="min-width: 40px;" :pane-style="{
          display: 'none',
        }" v-model:value="sysBizCode" @update:value="onChangeBizCode">
          <n-tab-pane tab="所有" name />
          <n-tab-pane tab="OA待办" name="OA" />
          <n-tab-pane tab="GEPS待办" name="GEPS" />
        </n-tabs> -->
      </div>
    </template>
    <div class="myScroll" style="height: 200px; overflow: auto">
      <n-list>
        <n-list-item class="item-list" v-for="(item, index) in dataList" :key="item.id">
          <div class="item-content" @click="
            () => {
              handelClick(item);
            }
          ">
            <span
              :class="{ 'tag': true, 'tag-oa': item.sysBizCode == 'OA', 'tag-geps': item.sysBizCode == 'GEPS' }">{{ item.sysBizCode?.toUpperCase() }}</span>
            <span class="content">{{ item.procinsName }}</span>
            <span class="createTime">{{ timeFormat(item.createTime) }}</span>
          </div>
        </n-list-item>
      </n-list>
    </div>
    <n-pagination v-model:page="page" :page-slot="7" :page-count="pageCount" :on-update:page="pageChange" />
  </n-card>
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h, defineComponent, ref, reactive, onMounted, } from 'vue'
import request from '/@/plugins/request'
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NSpace,
  useMessage,
  NTag,
  NPagination
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
    NTag,
    NPagination
  },
  setup(props) {
    // 所属系统
    const sysBizCode = ref('')

    const gridComponent = ref(null)
    const timer = ref();
    const router = useRouter()
    const pageCount = ref(1)
    const page = ref(1)
    const pageChange = (p) => {
      getData(p)
    }
    const handelClick = (row) => {
      const token = cookies.get("token");
      const tokenType = cookies.get("tokenType");
      window.open(`${row.sysPcBizUrl}&token=${tokenType} ${token}`)
    }
    const dataList = ref([])
    const getData = (p = 1) => {
      request({
        url: `/portal/portalContentTodoTasks/list`,
        method: 'post',
        data: {
          sysBizCode: sysBizCode.value,
          page: {
            size: 5,
            current: p
          }
        }
      }).then(res => {
        dataList.value = res.records
        page.value = res.current
        pageCount.value = res.pages || 1
      })
    }
    onMounted(() => {
      getData()
      timer.value = setInterval(() => {
        if (window.sessionStorage.getItem('isTasks') == 1) {
          getData()
          window.sessionStorage.setItem('isTasks', 0);
        }
      }, 1000);

    })
    return {
      timer,
      gridComponent,
      sysBizCode,
      page,
      pageCount,
      pageChange,
      timeFormat(time) {
        const t = new Date(time)
        let m = t.getMonth() + 1 >= 10 ? t.getMonth() + 1 : '0' + (t.getMonth() + 1).toString()
        let d = t.getDate() >= 10 ? t.getDate() : '0' + t.getDate().toString()
        return `${t.getFullYear()}-${m}-${d}`
      },
      getData,
      dataList,
      handelClick,
      handleMore() {
        clearInterval(timer.value);
        router.push(props.moreUrl)
      },
      onChangeBizCode(p) {

        sysBizCode.value = p
        getData()
        // gridComponent.value.commitProxy('query')
      }
    }
  }
})
</script>
<style lang='scss'>
$vxe-table-row-height-mini: 16px !default;
</style>
<style lang='less'>
.p-task {
  .n-pagination {
    position: absolute;
    right: 25px;
    bottom: 5px;
  }

  .n-list {
    margin: 0;
    background-color: #fff;
  }

  .item-list {
    padding: 10px 0;

    .n-list-item__main {
      display: flex;
    }

    .item-author {
      width: 249px;
      text-align: right;
      color: #666;
      font-size: 10px;
    }

    .item-content {
      width: 100%;
      cursor: pointer;
      color: #0a0a0a;
      font-size: 12px;
      display: flex;
      justify-content: space-around;

      .tag {
        width: 49px;
        height: 19px;
        line-height: 19px;
        background: rgba(186, 220, 255, 1);
        font-size: 10px;
        text-align: center;
        color: rgba(1, 69, 142, 1);
      }

      .tag-oa {
        color: rgba(1, 69, 142, 1);
      }

      .tag-geps {
        color: rgba(1, 69, 142, 1);
        background: rgba(188, 236, 224, 1);
      }

      .content {
        overflow: hidden;
        display: block;
        word-break: break-all;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: calc(~"100% - 150px");
      }

      .createTime {
        width: 90px;
        color: rgba(102, 102, 102, 1);
        font-size: 12px;
      }
    }
  }

  &.n-card>.n-card__content {
    padding: 0;
  }

  >.n-card-header {
    border-bottom: none !important;
  }

  &-header {
    display: flex;
    position: relative;
  }

  &-tabs {
    position: absolute;
    left: 30px;
    bottom: -6px;
    display: inline-block;
    width: auto;
    margin-left: 10px;
    z-index: 11;

    &.n-tabs {
      >.n-tabs-nav {
        line-height: 1;

        &.n-tabs-nav--card-type .n-tabs-tab {
          font-size: 12px;
          padding: 8px;
          background-color: #fff;

          &.n-tabs-tab--active {
            border-bottom: 1px solid #f8f8f9;
            background-color: #f8f8f9;
          }
        }
      }

      >.n-tab-pane {
        padding: 0;
      }
    }
  }
}

* {
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #666;
    background-image: -webkit-linear-gradient(45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
  }
}
</style>