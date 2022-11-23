<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>{{ dictName }}</h1>
      <div class="nw-page-header-right">
        <NwTableFun :table="nwTable"></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout-content>
      <NwTable v-if="tableShow" ref="nwTable" :columns="columns" :data="null" :request="request" :response="response"
        :searchFormFields="[
          {
            field: 'roleName',
            title: 'name',
            valueFormat: (d) => d,
          },
        ]">
        <template v-slot:header-left="{ selected }">
          <n-button type="info" size="small" style="margin-right: 5px" @click="showDeployDict">添加</n-button>

          <!-- <n-popconfirm
            @positive-click="handDel(selected)"
            positive-text="确定"
            negative-text="取消"
            v-if="selected.length > 0"
          >
            <template #trigger>
              <n-button :disabled="selected.length == 0" size="small"
                >删除</n-button
              >
            </template>
            {{ `是否确定删除此${selected.length}条数据` }}
          </n-popconfirm> -->
        </template>
        <template #header-right>
          <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          {{ searchFormData }} {{ searchFormData2 }}
          <n-form :model="searchFormData"> </n-form>
          <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
        </template>
      </NwTable>
    </n-layout-content>
    <DeployDictAdd ref="deployDictAdd" @update:callback="
      () => {
        nwTable.commitQuery();
        nwTable.gridComponent.setAllCheckboxRow();
      }
    "></DeployDictAdd>
  </n-layout>
</template>

<script lang='jsx'>
import { defineComponent, reactive, ref, h, watch } from "vue";
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { dictItemPage, detailCode, delDictItem } from "./api";
import DeployDictAdd from "./deployDictAdd.vue";


import { parseQuery } from '/@/utils/index.js'

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
export default defineComponent({
  components: {
    NwTable,
    NwTableFun,
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
    DeployDictAdd
  },
  setup() {

    const urlParams = parseQuery(window.location.search.substr(1))

    const nwTable = ref();
    const deployDictAdd = ref()
    const message = useMessage();
    const dictId = ref('')
    const tableShow = ref(false)
    const dictName = ref('')
    const showDeployDict = (e = {}) => {
      deployDictAdd.value.sonFn({ ...e, dictId: dictId.value }, columns[1].title, columns[2].title);
    }
    const detailCodeFn = () => {
      return detailCode(urlParams.key)
    }
    const columns = reactive([
      { type: "checkbox", width: 35 },
      {
        field: "dictItemName",
        title: "字典项",
      },
      {
        field: "dictItemCode",
        title: "字典编码",
      },
      {
        field: '',
        title: '操作',
        showHeaderOverflow: true,
        slots: {
          default: ({ row, }) => {
            return [
              <div>

                <a style="color:#2d8cf0;cursor: pointer;display:inline-block" onClick={() => { showDeployDict(row) }}>{"编辑"}</a>
                <NPopconfirm
                  onPositive-click={(e) => { removeEvent(row) }}
                  positive-text="确定"
                  negative-text="取消"

                >
                  {{
                    trigger: () => <a style="color:red;cursor: pointer;display:inline-block;margin-left:15px">{"删除"}</a>,
                    default: () => '是否删除当前选项?'
                  }}

                </NPopconfirm>
              </div>

            ];
          },
        }
      }]);
    const c = async () => {
      let res = await detailCodeFn()
      dictId.value = res.id
      columns[1].title = res.dictNameAlias || '字典名称'
      columns[2].title = res.dictCodeAlias || '字典编码'
      tableShow.value = true
      dictName.value = res.dictName
    }
    c()
    const request = ref({
      XHR: dictItemPage, // promise 请求函数
      params: {
        dictCode: urlParams.key,
      },
      pageMethod: (current, size) => ({
        page: {
          current,
          size,
        },
      }),
    })
    const removeEvent = (row) => {
      delDictItem(row.id).then(res => {
        message.success("删除成功")
        nwTable.value.commitQuery()
        console.log(nwTable)
      })
    }
    // watch(() => route.query, (v) => {
    //   c()
    //   request.value.params.dictCode = route.query.key
    //   nwTable.value.commitQuery()
    // })
    return {
      nwTable,
      deployDictAdd,
      dictId,
      showDeployDict,
      tableShow,
      dictName,
      request,
      response: {
        dataMethod: (res) => res.records,
        pageMethod: ({ total }) => total,
      },
      columns,
      show: () => { },
    };
  },
});
</script>