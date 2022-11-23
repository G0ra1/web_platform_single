<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>模型维护</h1>
      <div class="nw-page-header-right">
        <NwTableFun v-if="!formVisible" :table="nwTable"></NwTableFun>
      </div>
    </n-layout-header>

    <n-layout position="absolute" has-sider style="top: 36px" ref="page">
      <n-layout-sider collapse-mode="width" :collapsed-width="400" default-collapsed :width="400" bordered>
        <n-space vertical :size="12">
          <n-input v-model:value="pattern" placeholder="搜索" />
          <n-spin :show="isLoading">
            <n-tree :data="tree.treeList" block-line :render-prefix="renderPrefix" virtual-scroll class="treeH"
              :pattern="pattern" @update:selected-keys="
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
              <n-form-item path="modelName" label="模型名称">
                <n-input v-model:value="searchFormData.modelName" @keydown.enter.prevent />
              </n-form-item>
              <n-form-item path="nameCh" label="主实体名">
                <n-input v-model:value="searchFormData.nameCh" @keydown.enter.prevent />
              </n-form-item>
              <n-form-item path="modelProperty" label="模型特性">
                <n-radio-group v-model:value="searchFormData.modelProperty" name="modelProperty">
                  <n-radio :value="1">单体</n-radio>
                  <n-radio :value="2">主从</n-radio>
                  <n-radio :value="3">关联</n-radio>
                </n-radio-group>
              </n-form-item>
              <!-- <n-form-item path="postCode" label="岗位编号">
                <n-input
                  v-model:value="searchFormData.postCode"
                  @keydown.enter.prevent
                />
              </n-form-item> -->
            </n-form>
            <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
          </template>
        </NwTable>
      </n-layout-content>
    </n-layout>
    <modelingAdd ref="modelingAdd" @callback="saveSuccess"></modelingAdd>
  </n-layout>
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { defineComponent, ref, reactive, onMounted, h } from 'vue'
import modelingAdd from './modelingAdd.vue'
import Setting from "/setting";
import cookies from "/@/utils/cookies.js";
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
  NSpin,
  NRadioGroup,
  NRadio,
  NDropdown
} from 'naive-ui'
import {
  default as NwTable,
  NwTableFun,
} from "/@/components/nw-table/index.vue";
import { modelingPage, dictTreeList, detailId, del, downloadCode, test } from './api'
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
    modelingAdd,
    NRadioGroup,
    NRadio,
    NDropdown
  },
  setup() {
    const message = useMessage()
    const modelingAdd = ref();
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
      modelingAdd.value.sonFn(e, modelTypeId.value, modelTypeCode.value, modelTypeName.value);
    };
    const handDel = (selected) => {
      let id = selected.map(d => d.id).join(',')
      del(id).then(res => {
        message.success("删除成功");
        nwTable.value.commitQuery()
      })
    }
    const edit = (row) => {
      modelingAdd.value.sonFnEdit(row);
    }
    const saveSuccess = () => {
      nwTable.value.commitQuery();
    }
    const downloadCodeFn = (row) => {
      // downloadCode(row.id).then(res=>{
      //   console.log(res,'1111111111111111')
      //   var a = document.createElement("a")
      //   a.style.display = "none";
      //   var url = URL.createObjectURL(
      //     new Blob([res], {
      //       type: "application/zip",
      //     })
      //   );
      //   a.href = url;
      //   a.download = "generator.zip";
      //   document.body.appendChild(a);
      //   a.click();
      //   window.URL.revokeObjectURL(url); // 释放掉blob对象
      //   document.body.removeChild(a); // 下载完成移除元素
      //   setTimeout(() => {
      //     message.success("下载成功");
      //   }, 1000);
      // })
      const token = cookies.get("token");
      const tokenType = cookies.get("tokenType");
      isLoading.value = true
      fetch(
        `${Setting.apiBaseURL}/main/modeling/downloadCode?modelingId=${row.id}&codeType=${codeType.value}`,
        {
          method: "get",
          headers: new Headers({
            Authorization: `${tokenType} ${token}`
          }),
          responseType: "blob"
        }
      )
        .then(response => response.arrayBuffer())
        .then(res => {
          var a = document.createElement("a");
          a.style.display = "none";
          var url = URL.createObjectURL(
            new Blob([res], {
              type:
                "application/zip;charset=UTF-8"
            })
          );
          a.href = url;
          a.download = 'generator.zip';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url); // 释放掉blob对象
          document.body.removeChild(a); // 下载完成移除元素
          setTimeout(() => {
            message.success("下载成功");
          }, 1000);
          isLoading.value = false
        }).catch(e => {
          console.log(e)
          isLoading.value = false
        })

    }
    const codeType = ref("")
    const dropdownOptions = [
      {
        label: '生成工作流代码',
        key: "wf"
      },
      {
        label: '生成业务代码',
        key: "df"
      },
      {
        label: '发布接口',
        key: "qt"
      },
    ]
    const handleSelect = (key, row) => {
      switch (key) {
        case "wf":
          codeType.value = 'wf'
          downloadCodeFn(row)
          break;
        case "df":
          codeType.value = 'df'
          downloadCodeFn(row)
          break;
        case "qt":
          codeType.value = 'df'
          test(row.id, codeType.value).then(res => {
            console.log(Res)
          })
          break;
        default:
          break;
      }
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
      modelingAdd,
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
        XHR: modelingPage, // promise 请求函数
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
      dropdownOptions,
      handleSelect,
      codeType,
      columns: reactive([
        { type: 'checkbox', width: 35, },
        { field: 'modelName', title: '模型名称', },
        { field: 'entityNameCh', title: '主实体名', },

        {
          field: "status", title: "模型特性", showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  {row.modelProperty == 1 ? '单体' : row.modelProperty == 2 ? '主从' : '关联'}
                </span>,
              ];
            },
          }
        },
        {
          field: 'modelProperty', title: '状态', showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  {row.status == 1 ? '已生效' : '未生效'}
                </span>,
              ];
            },
          }
        },
        {
          field: 'interfaceReleaseStatus', title: '接口发布状态', showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  {row.interfaceReleaseStatus == 1 ? '线上' : row.interfaceReleaseStatus == 2 ? '离线' : '未发布'}
                </span>,
              ];
            },
          }
        },

        {
          field: '',
          width: 180,
          title: '操作',
          fixed: 'right',
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
                      default: () => '是否删除当前选项?'
                    }}

                  </NPopconfirm>
                </span>,
                <NDropdown onSelect={(key) => handleSelect(key, row)} trigger={"hover"} showArrow={true} options={dropdownOptions}>
                  <NwIcon name="icon-qita" color="#010101" style="cursor: pointer;margin-left:15px;" size={18} />
                </NDropdown>,
                // <a onClick={()=>{downloadCodeFn(row)}} style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:15px">{"生成工作流代码"}</a>,
                // <a onClick={()=>{downloadCodeFn(row)}} style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:15px">{"生成业务代码"}</a>,

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