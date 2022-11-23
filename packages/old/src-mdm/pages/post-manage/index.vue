<template>
  <n-layout class="nw-page">
    <n-layout-header>
      <h1>岗位管理</h1>
      <div class="nw-page-header-right">
        <NwTableFun v-if="!formVisible" :table="nwTable"></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout position="absolute" has-sider style="top: 36px" ref="page">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="400"
        default-collapsed
        :width="400"
        bordered
      >
        <n-space vertical :size="12">
          <n-input v-model:value="pattern" placeholder="搜索" />
          <n-spin :show="isLoading">
            <n-tree
              :data="tree.treeList"
              block-line
              :render-prefix="renderPrefix"
              virtual-scroll
              :pattern="pattern"
              :default-expanded-keys="['0']"
              class="treeH"
              @update:selected-keys="
                (e) => {
                  if (e[0]) {
                    request.params.parentOrgId = e[0];
                    $refs.nwTable.commitQuery();
                  }
                }
              "
            />
          </n-spin>
        </n-space>
      </n-layout-sider>
      <n-layout-content>
        <NwTable
          ref="nwTable"
          :columns="columns"
          :data="null"
          :request="request"
          :response="response"
          :searchFormFields="[
            {
              field: '岗位名称',
              title: 'postName',
              valueFormat: (d) => d,
            },
          ]"
        >
          <template v-slot:header-left="{ selected }">
            <!-- <n-popconfirm
              @positive-click="handDel(selected)"
              positive-text="确定"
              negative-text="取消"
          >
            <template #trigger>
              <n-button :disabled="selected.length === 0 &&selected.every((d)=>d.isRef) " size="small"
                >删除</n-button>
            </template>
            {{ `是否确定删除此${selected.length}条数据` }}
          </n-popconfirm> -->
          </template>
          <template #header-right>
            <n-button
              type="info"
              size="small"
              @click="show"
              style="margin-right: 5px"
              >新设岗位</n-button
            >
            <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
          </template>
          <template v-slot:search-form="{ searchFormData, searchFormData2 }">
            <n-form :model="searchFormData">
              <n-form-item path="postName" label="岗位名称">
                <n-input
                  v-model:value="searchFormData.postName"
                  @keydown.enter.prevent
                />
              </n-form-item>
              <n-form-item path="postCode" label="岗位编号">
                <n-input
                  v-model:value="searchFormData.postCode"
                  @keydown.enter.prevent
                />
              </n-form-item>
            </n-form>
            <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
          </template>
        </NwTable>
      </n-layout-content>
    </n-layout>
  </n-layout>
  <AddPost
    ref="addPost"
    :treeList="tree.treeList"
    @update:callback="
      () => {
        $refs.nwTable.commitQuery();
      }
    "
  ></AddPost>
  <EditAction
    ref="editAction"
    :treeList="tree.treeList"
    @update:callback="
      () => {
        $refs.nwTable.commitQuery();
        $refs.nwTable.clearSelected();
      }
    "
  ></EditAction>
  <CurrentSort
    ref="currentSort"
    @update:callback="
      () => {
        $refs.nwTable.commitQuery();
      }
    "
  ></CurrentSort>
  <VersionAction
    ref="versionAction"
    @update:callback="
      () => {
        $refs.nwTable.commitQuery();
      }
    "
  ></VersionAction>
</template>

<script lang="jsx">
  // import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
  import { defineComponent, ref, reactive, onMounted,h  } from 'vue'
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
  import { rightList, creatOrg } from '../organization-manage/api'
  import { postList,getMdmPostByOrgId, del } from './api'
  import AddPost from './postAdd.vue'
  import EditAction from './editAction.vue'
  import NwIcon from '/@/components/nw-icon/index.vue'
  import CurrentSort from './currentSort.vue'
  import VersionAction from './versionAction.vue'

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
      AddPost,
      NPopconfirm,
      EditAction,
       NSpin,
      NwIcon,
      CurrentSort,
      VersionAction
    },
    setup () {
     const message = useMessage()

      const nwTable = ref(null)
      const pattern = ref('')
      const editAction = ref()
      const currentSort = ref()
      const tree = reactive({
        treeList:[], //原始数据
       
      })
      const addPost = ref();
      const isLoading = ref(false) 
      const show = (e) => {
        addPost.value.sonFn(e);      
      };
      const showEditAction = (e) => {
        editAction.value.sonFn(e);      
      };
      const renderPrefix = ({ option }) => {
        return h(
          NwIcon,
          { name:option.orgType ==1 ? "icon-zuzhijigou2" : "icon-bumen1" },
         
        )
      }
      const  renderLabel = ({ option })=> {
        return h(
          NButton,
          { text: true, type: 'primary' },
          { default: () => `${option.label}` }
        )
      }
      const handDel = (selected)=>{
          let id = selected.map(d=>d.id).join(',')
          del(id).then(res=>{
             message.success("删除成功");
            nwTable.value.commitQuery()
          })
      }
      const showVersionAction = (data) => {
        versionAction.value.sonFn(data)
      }
      const versionAction = ref()
      onMounted(async () => {
        isLoading.value=true
        rightList({isDefault:0,status:1,}).then((res) => {
         
             const getStr = (list)=>{
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       row.label = row.orgName
                        row.key = row.id 
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                        row.label = row.orgName
                        row.key = row.id
                    }
                })
            }
            getStr(res)
             tree.treeList = res
             isLoading.value=false
          })
      })

      return {
        versionAction,
        showVersionAction,
        formVisible: ref(false),
        currentSort,
        renderLabel,
        isLoading,
        addPost,
        show,
        renderPrefix,
        message,
        nwTable,
        editAction,
        showEditAction,
        request: {
          XHR: postList, // promise 请求函数
          params: {parentOrgId:0},
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
        defaultExpandedKeys:ref(["0"]),
        tree, //左侧树
        columns: reactive([
          { type: 'checkbox', width: 35 , },
          { field: 'postName', title: '岗位名称',  treeNode:true,
            slots: {
              default: ({row}) => {
                return [
                  <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       showEditAction(row)
                      }
                    }>{row.postName}</a>
                  </span>,
                ];
              },
            }
          },
          { field: 'postCode', title: '岗位编号', showHeaderOverflow: true,  },
          { field: 'postUpName', title: '上级岗位', showOverflow: true,  },
          { field: 'parentDeptName', title: '部门', showOverflow: true, },
           { field: "status", title: "启用状态", showOverflow: true,
            slots: {
                default: ({row}) => {
                  return [
                    <span>
                      {row.status == 1 ? '启用' : '禁用'}
                    </span>,
                  ];
                },
              }
          },
          { field: 'masterNumber', title: '岗位人数', showOverflow: true,  },
          { field: 'partNumber', title: '兼岗人数', showOverflow: true,  },
          {
            field: '',
            width: 200,
            title: '操作',
            showHeaderOverflow: true,
            slots: {
              default: ({row}) => {
                return [
                  <div>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{currentSort.value.sonFn(row)}}>{"排序"}</a>
                    <a style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:15px" onClick={(e)=>{showVersionAction(row)}}>{"历史"}</a>
                    <NPopconfirm
                      onPositive-click={(e)=>{handDel([row])}}
                      positive-text="确定"
                      negative-text="取消"
                     
                    >
                      {{
                        trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:15px">{"删除"}</a>,
                        default:()=> '是否删除当前选项?'
                      }}
                     
                    </NPopconfirm>
                  </div>
                  
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