<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>实体维护</h1>
      <div class="nw-page-header-right">
        <NwTableFun v-if="!formVisible" :table="nwTable"></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout position="absolute" has-sider style="top: 36px" ref="page">
      <n-layout-sider collapse-mode="width" :collapsed-width="400" default-collapsed :width="400" bordered>
        <n-space vertical :size="12">
          <n-input v-model:value="pattern" placeholder="搜索" />
          <n-spin :show="isLoading">
            <n-tree :data="tree.treeList" block-line :render-prefix="renderPrefix" virtual-scroll :pattern="pattern"
              :show-irrelevant-nodes="false" :default-expanded-keys="['0']" class="treeH" @update:selected-keys="
                (e) => {
                  if (e[0]) {
                    request.params.modelTypeId = e[0].split(',')[0];
                    modelTypeId = e[0].split(',')[0];
                    modelTypeCode = e[0].split(',')[1];
                    modelTypeName = e[0].split(',')[2];
                    $refs.nwTable.commitQuery();
                  }
                }
              " />
          </n-spin>
        </n-space>
      </n-layout-sider>
      <n-layout-content>
        <NwTable ref="nwTable" :columns="columns" :data="null" :request="request" :response="response"
          :searchFormFields="[
            {
              field: '岗位名称',
              title: 'postName',
              valueFormat: (d) => d,
            },
          ]">
          <template v-slot:header-left="{ selected }">
            <n-button type="info" size="small" @click="show" style="margin-right: 5px" :disabled="!modelTypeId">新建
            </n-button>
          </template>
          <template #header-right> </template>
          <template v-slot:search-form="{ searchFormData }">
            <n-form :model="searchFormData">
              <n-form-item path="tableName" label="表名">
                <n-input v-model:value="searchFormData.tableName" @keydown.enter.prevent />
              </n-form-item>
              <n-form-item path="tableNameCh" label="表名称">
                <n-input v-model:value="searchFormData.tableNameCh" @keydown.enter.prevent />
              </n-form-item>
            </n-form>
            <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
          </template>
        </NwTable>
      </n-layout-content>
    </n-layout>
    <entityAdd ref="entityAdd" @callback="saveSuccess"></entityAdd>
  </n-layout>
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { defineComponent, ref, reactive, onMounted, h } from 'vue'
import entityAdd from './entityAdd.vue'
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NTree,
  NSpace,
  useMessage,
  NPopconfirm,
  NSpin
} from 'naive-ui'
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { entityPage, dictTreeList, detailId, del } from './api'
import NwIcon from '/@/components/nw-icon/index.vue'

export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NwTable,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NwTableFun,
    NForm,
    NLayoutSider,
    NFormItem,
    NInput,
    NTree,
    NSpace,
    NPopconfirm,
    NSpin,
    NwIcon,
    entityAdd
  },
  setup() {
    const message = useMessage()
    const entityAdd = ref();
    const nwTable = ref()
    const pattern = ref('')
    const tree = reactive({
      treeList: [], //原始数据
    })
    const modelTypeId = ref('')
    const modelTypeCode = ref('')
    const modelTypeName = ref('')
    const addPost = ref();
    const isLoading = ref(false)

    const renderPrefix = ({ option }) => {
      return h(
        NwIcon,
        { name: option.orgType == 1 ? "icon-zuzhijigou2" : "icon-bumen1" },

      )
    }
    const renderLabel = ({ option }) => {
      return h(
        NButton,
        { text: true, type: 'primary' },
        { default: () => `${option.label}` }
      )
    }
    const show = (e) => {
      entityAdd.value.sonFn(e, modelTypeId.value, modelTypeCode.value, modelTypeName.value);
    };
    const handDel = (selected) => {
      let id = selected.map(d => d.id).join(',')
      del(id).then(res => {
        message.success("删除成功");
        nwTable.value.commitQuery()
      })
    }
    const edit = (row) => {
      console.log(row.id, '编辑1111')
      detailId(row.id).then(res => {
        entityAdd.value.sonFnEdit(res);
      })
    }
    const saveSuccess = () => {
      nwTable.value.commitQuery();
    }
    onMounted(async () => {
      isLoading.value = true
      dictTreeList({ dictCode: "MODEL_CLASSIFY" }).then((res) => {
        const getStr = (list) => {
          list.forEach((row) => {
            if (row.kids.length > 0) {
              row.label = row.dictName
              row.key = row.id + ',' + row.dictCode + ',' + row.dictName
              row.children = row.kids
              getStr(row.kids)
            } else {
              row.label = row.dictName
              row.key = row.id + ',' + row.dictCode + ',' + row.dictName
            }
          })
        }
        getStr(res)
        tree.treeList = res
        isLoading.value = false
      })
    })

    return {
      entityAdd,
      formVisible: ref(false),
      renderLabel,
      isLoading,
      addPost,
      show,
      renderPrefix,
      message,
      nwTable,
      modelTypeId,
      modelTypeCode,
      modelTypeName,
      edit,
      handDel,
      saveSuccess,
      request: {
        XHR: entityPage, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({ // 分页
          page: {
            current,
            size
          }
        }),
      },
      response: {
        dataMethod: res => res.records,
        pageMethod: ({ total }) => (total)
      },
      pattern,
      defaultExpandedKeys: ref(["0"]),
      tree, //左侧树
      columns: reactive([
        { type: 'checkbox', width: 35,showHeaderOverflow: true,showOverflow: true, },
        { field: 'tableName', title: '表名',showHeaderOverflow: true,showOverflow: true, },
        { field: 'tableNameCh', title: '表名称', showHeaderOverflow: true,showOverflow: true, },
        { field: 'modelTypeName', title: '上级分类', showOverflow: true, },
        {
          field: "status",
          title: "状态",
          showOverflow: true,
          showHeaderOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  {row.status == 1 ? '启用' : '禁用'}
                </span>,
              ];
            },
          }
        },
        {
          field: '',
          width: 200,
          fixed: 'right',
          title: '操作',
          showHeaderOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <a onClick={() => { edit(row) }} style="color:#2d8cf0;cursor: pointer;display:inline-block;">{"编辑"}</a>,
                <span>
                  <NPopconfirm
                    onPositive-click={(e) => { handDel([row]) }}
                    positive-text="确定"
                    negative-text="取消"

                  >
                    {{
                      trigger: () => <a style="color:red;cursor: pointer;display:inline-block;margin-left:15px">{"删除"}</a>,
                      default: () => '是否删除当前选项？会删除对应的表信息。'
                    }}

                  </NPopconfirm>
                </span>,
                // <a style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:15px">{"代码生成"}</a>,

              ];
            },
          }
        },
      ]),

    }

  },

  methods: {

  }
})
</script>
<style lang='less'>
.treeH {
  height: calc(~"100% - 50px");
}
</style>