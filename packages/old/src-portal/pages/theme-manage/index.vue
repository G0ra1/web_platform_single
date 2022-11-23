<template>
  <n-layout
    ref="pageRef"
  class="nw-page">
    <n-layout-header>
      <h1>主题管理</h1>
      <div class="nw-page-header-right">
      </div>
    </n-layout-header>
    <n-layout-content>
      <nw-theme-item
        v-for="item in list"
        :key="item.id"
        :id="item.id"
        :title="item.themeName"
        :theme="item.themeData || '{}'"
        :isUse="item.isUse"
        @deleted="query"
        @edit="handleEdit(item)"
        @switchTheme="query"
      />
      <div class="theme-item" >
        <div class="theme-item-demo" >
          <div class="control">
            <nw-icon
              class="control-btn"
              name="icon-jia"
              :size="64"
              color="#ccc"
              @click="handleAdd"
            />
          </div>
        </div>
        <div class="theme-item-title">
          &nbsp;
        </div>
      </div>
    </n-layout-content>
  </n-layout>
  <n-drawer
    v-model:show="formVisible"
    width="100%"
    :height="200"
    placement="right"
    :to="pageRef && pageRef.$el"
  >
    <n-drawer-content
      :title="drawerTitle"
      :header-style="{
        padding: '10px',
        'font-size': '16px',
        'font-weight': 'bold',
      }"
      :footer-style="{
        padding: '10px',
      }"
    >
      <Form ref="Form" :model="model" />

      <template #footer>
        <n-button
          type="info"
          size="small"
          style="margin-right: 5px"
          @click="handleSave"
          >保存</n-button
        >
        <n-button size="small" @click="formVisible = false">取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h,defineComponent, ref, reactive, getCurrentInstance  } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  useMessage,
} from "naive-ui";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { queryAll, add, edit, del } from "./api";
import Form from "./form.vue";
import NwThemeItem from "./item.vue"
import { defThemeJson, themeParamList } from './store.js'
import NwIcon from '/@/components/nw-icon/index.vue'

export default defineComponent({
  components: {
    Form,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NwThemeItem,
    NwIcon,
    useMessage
  },
  setup() {
    const message = useMessage()
    const drawerTitle = ref('')
    const pageRef = ref(null)
    const formVisible = ref(false)
    const themeJson = reactive(defThemeJson)
    const list = ref([])
    const model = ref({})
    const query = () => {
      queryAll().then(res => {
        list.value = res
        console.log('=============', res)
      })
    }
    query();
    return {
      drawerTitle,
      model,
      pageRef,
      formVisible,
      themeJson,
      list,
      query,
      handleAdd () {
        drawerTitle.value = '新建门户主题'
        formVisible.value = true
        model.value = {
          themeData: JSON.stringify(defThemeJson),
          themeName: '',
          remark: '',
          isUse: 1,
          isInside: 0
        }
      },
      handleEdit (item) {
        drawerTitle.value = '编辑门户主题'
        formVisible.value = true
        model.value = {
          ...item
        }
      },
      handleSave () {
        console.log('=========', model.value);
        // 判断添加或修改
        if (model.value.id) {
          edit(model.value).then(res => {
            if (res) {
              message.success('修改成功')
              formVisible.value = false
              query()
            }
          })
        } else {

          add(model.value).then(res => {
            if (res) {
              message.success('添加成功')
              formVisible.value = false
              query()
            }
          })
        }
      }
    };
  }
});
</script>

<style lang="less">
.theme-item {
  display:inline-block;
  margin: 10px 0 10px 10px;
  &-title {
    text-align: center;
  }
  &-demo {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: 2px solid #ccc;
    overflow: hidden;
    width: 200px;
    height: 160px;
    .control {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      z-index: 1;
      &-nhover {
        opacity: 0;
      }
      &-nhover:hover {
        opacity: 1;
        background: #33333330;
      }
      &-btn {
        cursor: pointer;
      }
    }
    .card1 {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 160px;
      height: 120px;
      border: 2px solid #ccc;
    }
    .card2 {
      
      position: absolute;
      top: 60px;
      left: 30px;
      width: 160px;
      height: 120px;
      border: 2px solid #ccc;
    }
    .use-theme {
      position: absolute;
      right: 5px;
      top: 5px;
    }
    .portal-panel {
      height: 100%;
      &.n-card {
        >.n-card-header {
          border-bottom: 1px solid #e8e5db;
          background: #fff;
          >.n-card-header__main {
            border-left: 4px solid var(--title-text-color);
            padding-left: 8px;
          }
        }
        >.n-card__content {
          >.n-list {
            margin: 0;
            >.n-list-item {
              padding: 2px
            }
          }
        }
      }
      &-list {
        .n-list-item:not(:last-child) {
          border-bottom: 1px solid #f1f0eb
        }
        .n-list-item {
          background: #fbfbfa;
          .n-list-item__main {
          }
        }
        &-header {
          display: flex;
          justify-content: space-between;
        }
        &-title {
            cursor: pointer;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: calc(~"100% - 50px");
        }
      }
    }
  }
}
</style>