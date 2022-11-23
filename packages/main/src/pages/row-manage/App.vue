<template>
  <n-layout class="nw-layout-full" >
    <n-layout-header class="nw-layout-header" >
       <n-space :size="5">
           <span></span>
       </n-space>
      
      <n-space :size="5" style="padding: 0 5px;position:absolute;left:250px">
       
        <n-form
          ref="formRef"
          inline
          label-placement="left"
          :label-width="80"
          :model="SearchForm"
          style="height: 30px;"
        >
           <n-form-item label="角色类型" path="roleType">
            <n-radio-group v-model:value="SearchForm.roleType" name="radiobuttongroup1" @update:value="()=>{
                vbind.request.params.roleType =SearchForm.roleType
                $refs.tableRef.commitQuery()
              }">
                  <n-space :size="1">
                    <n-radio-button size="small" v-for="item in [
                        {label:'全部',value:''},
                        {label:'功能角色',value:1},
                        {label:'数据角色',value:2},
                        {label:'流程角色',value:3},
                       
                      ]" :key="item.value" :value="item.value">
                      {{ item.label }}</n-radio-button>
                  </n-space>
                </n-radio-group>
          </n-form-item>
          <n-form-item label="角色名称" path="roleName">
            <n-input v-model:value="SearchForm.roleName" placeholder="角色名称" />
          </n-form-item>
          <n-form-item>
            <n-button
              type="info"
              attr-type="button"
              style="margin-right: 5px;"
              @click="()=>{
                vbind.request.params.roleName =SearchForm.roleName
                $refs.tableRef.commitQuery()

              }"
            >
              查询
            </n-button>
            <n-button
              type="warning"
              attr-type="button"
              @click="()=>{
                SearchForm.roleName = ''
                vbind.request.params.roleName = ''
                SearchForm.roleType = ''
                vbind.request.params.roleType =''

                $refs.tableRef.commitQuery()
              }"
            >
              重置
            </n-button>
          </n-form-item>
        </n-form>
      
        <!-- <n-button type="warning" >编辑</n-button>  AssignPermissionsRef.show(row)-->
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
          <n-button type="primary" @click="showAction({...appMessage})" :disabled="!appMessage.appId">
          <!-- showAction({...appMessage})" > -->
            <template #icon>
              <nw-icon name="icon-n-y-add" :size="14" />
            </template>
            新建
        </n-button>
      
      </n-space>
    </n-layout-header>
     <n-layout has-sider content-style="height: 100%">
      <n-layout-sider >
       
        <SideTree
          @callback="sideTreeCallback"
        />
      </n-layout-sider>
       <n-layout-content>
        <NwTable
          ref="tableRef"
          :columns="columns"
          v-bind="vbind"
          
        >
        </NwTable>
     </n-layout-content>
    </n-layout>
  
  </n-layout>
   <ModalAction ref="modalAction"   
      @update:callback="() => {
                $refs.tableRef.commitQuery()

  }"></ModalAction>
  <AssignPermissions ref="AssignPermissionsRef" />
  <Associated ref="associated"/>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'


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
  useDialog,
  NLayoutSider,
  NTree,
  NForm,
  NFormItem,
  NSpin,
  NCard,
  NPopover,
  NGrid,
  NPopconfirm,
  NGridItem,
  useMessage,
  NRadioGroup,
  NDropdown,
  NRadioButton
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, request, NwTable 
   } from '@platform/main'
import { mdmRoleList, del } from './api/index'
import ModalAction from './components/action.vue'
import SideTree from '.././menu-manage/components/tree-grid/index.vue'
import AssignPermissions from './components/assign-permissions/index.vue'
import Associated from './components/associated.vue'

export default defineComponent({
  components: {
    NwTable,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NPopconfirm,
    NSpace,
    NwIcon,
    NGrid,
    NGridItem,
    NForm,
    NFormItem,
    NPopover,
    NCard,
    NTag,
    NSpin,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NTree,
    NLayoutSider,
    ModalAction,
    SideTree,
    NRadioGroup,
    NRadioButton,
    NDropdown,
    Associated,
    AssignPermissions,
  },
  setup (props,context) {

    const dialog = useDialog()
    const AssignPermissionsRef = ref(null)
    const associated = ref()
    const SearchForm = ref({})
    const tableRef = ref()
    const model = ref({})
    const appMessage = ref({})
    const isLoading = ref(false)
    const message = useMessage();
    const filterData = ref('')
    const modalAction = ref()
    const dropdownOptions = [
        {
          label: '修改',
          key: "modalAction"
        },
        {
          label: '权限分配',
          key: "AssignPermissionsRef"
        },
        {
          label: '组织关联',
          key: "associated"
        },
    ]
    const handleSelect =(key,row)=>{
        switch (key) {
          case "AssignPermissionsRef":
            AssignPermissionsRef.value.show(row)
            break;
          case "modalAction":
           modalAction.value.sonFn({...appMessage.value,...row});  
            break;
          case "associated":
            associated.value.sonFn(row)
            break;
         
          default:
            break;
        }
    }
     const handAppDel = (selected) =>{
      let id = selected.id
      del(id).then(res=>{
       message.success("删除成功");
       tableRef.value.commitQuery()
      })
    }
    const sideTreeCallback = (e) =>{
      appMessage.value = e
      vbind.request.params.appCode = e.appCode
      tableRef.value.commitQuery()

    }
    const columns = reactive([
     
      { field: "roleName", title: "角色名称", showHeaderOverflow: true,
          slots:{
          default:({row})=>{
            return <span style=" white-space: nowrap;overflow: hidden; text-overflow: ellipsis;display:inline-block;width:100%">
            { row.roleName }
          </span>
          }
        } 
      },
      { title: "角色编码", showHeaderOverflow: true,showOverflow:true,
        slots:{
          default:({row})=>{
            return <span>
            { row.roleCode  }
          </span>
          }
        } 
      },
      {title: "角色类型", field: "roleType", showHeaderOverflow: true,showOverflow:true,
         slots: {
              default: ({row}) => {
                return [
                  <span>
                    {row.roleType == 1 ? '功能角色' : (row.roleType == 2 ? '数据角色' : (row.roleType == 3?'流程角色' : ''))}
                  </span>,
                ];
              },
            }
      },
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
      // { field: "createUserName", title: "创建人", showHeaderOverflow: true },
      // { title: "创建时间", showHeaderOverflow: true,
      //   slots:{
      //     default:({row})=>{
      //       return <span style="white-space: nowrap;overflow: hidden; text-overflow: ellipsis;display:inline-block;width:100%">
      //       {  row.createTime}
      //     </span>
      //     }
      //   } 
      // },
     
      {
        field: "",
        title: "操作",
        fixed:'right',
        width:200,
        showHeaderOverflow: true,
        slots: {
          default: ({row}) => {
            return [
              <div>
                <NPopconfirm
                  onPositive-click={(e)=>{handAppDel(row)}}
                  positive-text="确定"
                  negative-text="取消"
                >
                  {{
                    trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:8px">{"删除"}</a>,
                    default:()=> '是否删除当前选项?'
                  }}
                  
                </NPopconfirm>
                <NDropdown   onSelect={(key)=>handleSelect(key,row)} trigger={"hover"} showArrow={true} options={ dropdownOptions}>
                  <span  type="text" style="color:#2d8cf0;cursor: pointer;margin-left: 9px;
                    font-size: 24px;
                    font-weight: bold;">...</span>
                </NDropdown>
              </div>
              
            ];
          },
        },
      },
    ]);
    const vbind = {
        request: {
            XHR:mdmRoleList, // promise 请求函数 appId:'0'
            params: {appCode:'root'},
            pageMethod: (current, size) => ({
                page: {
                    current,
                    size,
                },
            })
        },
        response: {
            dataMethod: (res) => res.records,
            pageMethod: ({ total }) => (total)
        }
    }
     const showAction = (e={}) => {
      modalAction.value.sonFn(e);  
      
    }
  
    nextTick().then(() => {
      SearchForm.value.roleType = ''
    })
    onMounted(() => {
    })
    return {
      appMessage,
      sideTreeCallback,
      showAction,
      associated,
      handleSelect,
      SearchForm,
      columns,
      tableRef,
      vbind,
      AssignPermissionsRef,
      modalAction,
      model,
      isLoading,
      filterData,
    
    }
  }
})

</script>

<style  lang='less' scoped>
  .questionHeader{
    display: flex;
    width:100%;
    padding:0px 0 5px 0;
   .btn {
     width: 50px;
     margin:0 5px ;
   }
   .textInput{
     flex: 1;
   }
  }

</style>
