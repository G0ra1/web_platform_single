<template>
  <n-layout class="nw-layout-full">
    <n-layout-header   >
      <h1>职务管理</h1>
      <div class="nw-page-header-right">
       
        <NwTableFun
          v-if="!formVisible"
          :table="nwTable"
        ></NwTableFun>
      </div>
    </n-layout-header>
    <n-layout position="absolute"  has-sider style="top: 50px; " ref="page">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="400"
        default-collapsed
        :width="400"
       
        bordered
      >
        <OrgTree @callback="(row)=>{
            request.params.parentOrgId = row.id
            $refs.nwTable.commitQuery();

         }" />
      </n-layout-sider>
    <n-layout-content >  
      <NwTable
        ref="nwTable"
        :columns="columns"
        :data="null"
        :request="request"
        :response="response"
        :searchFormFields="[{
          field: 'dutyName',
          title: '职务名称',
          valueFormat: d => d
        }]"
      >
        <template v-slot:header-left="{ selected }">
          
         
        </template>
        <template #header-right>
          <n-button type="info" size="small" @click="show" style="margin-right: 5px;">新设职务</n-button>
            <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          <n-form :model="searchFormData" >
            <n-form-item path="dutyName" label="职务名称">
              <n-input v-model:value="searchFormData.dutyName" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item path="dutyCode" label="职务code">
              <n-input v-model:value="searchFormData.dutyCode" @keydown.enter.prevent />
            </n-form-item>
          </n-form>
            <!-- <n-button type="info" size="small" style="margin-right: 5px;">其他</n-button>
            <n-button type="info" size="small">其他</n-button> -->
        </template>
      </NwTable >
    </n-layout-content>
     </n-layout>
    
  </n-layout>
  <AddPost ref="addPost" :treeList="tree.treeList"  @update:callback="() => {
                $refs.nwTable.commitQuery()
            }"></AddPost>
  <EditAction
    ref="editAction"
    :treeList="tree.treeList"
    @update:callback="
      () => {
        $refs.nwTable.commitQuery();
        $refs.nwTable.clearSelected()      
      }
    "
  ></EditAction>
  <CurrentSort ref="currentSort"
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
  } from "../../components/nw-table/index.vue"; 
  import { rightList, creatOrg } from '../organization-manage/api'
  import { dutyList,getMdmPostByOrgId, del } from './api'
  import AddPost from './postAdd.vue'
  import EditAction from './editAction.vue'
  import { NwIcon } from '@platform/main'
  import OrgTree from '../../components/org-tree/index.vue'

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
      VersionAction,
      OrgTree
    },
    setup () {
      const message = useMessage()

      const nwTable = ref(null)
      const pattern = ref('')
      const isLoading = ref(false)
      const editAction = ref(); 
      const currentSort = ref()
      const tree = reactive({
        treeList:[], //原始数据
       
      })
      const addPost = ref(); 
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
          })
      })

      return {
        versionAction,
        showVersionAction,
        formVisible: ref(false),
        currentSort,
        renderLabel,
        renderPrefix,
        isLoading,
        addPost,
        show,
        handDel,
        nwTable,
        editAction,
        message,
        showEditAction,
        request: {
          XHR: dutyList, // promise 请求函数
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
          { field: 'dutyName', title: '职务名称',  treeNode:true,
            slots: {
              default: ({row}) => {
                return [
                  <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       showEditAction(row)
                      }
                    }>{row.dutyName}</a>
                  </span>,
                ];
              },
            }
          },
          { field: 'dutyCode', title: '职务编号', showHeaderOverflow: true,  },
          { field: 'dutyUpName', title: '上级职务', showOverflow: true,  },
          { field: 'parentDeptName', title: '部门', showOverflow: true,  },
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
          { field: 'masterNumber', title: '职务人数', showOverflow: true,  },
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
                        trigger:()=>  <a style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:15px">{"删除"}</a>,
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
  .treeH{
    height: calc(~"100% - 50px");
  }

</style>