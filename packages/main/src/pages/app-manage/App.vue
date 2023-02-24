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
          <n-form-item label="应用名称" path="appName">
            <n-input v-model:value="SearchForm.appName" placeholder="应用名称" />
          </n-form-item>
          <n-form-item>
            <n-button
              type="info"
              attr-type="button"
              style="margin-right: 5px;"
              @click="()=>{
                vbind.request.params.appName =SearchForm.appName
                $refs.tableRef.commitQuery()

              }"
            >
              查询
            </n-button>
            <n-button
              type="warning"
              attr-type="button"
              @click="()=>{
                SearchForm.appName = ''
                vbind.request.params.appName = ''
                $refs.tableRef.commitQuery()
              }"
            >
              重置
            </n-button>
          </n-form-item>
        </n-form>
      
        <!-- <n-button type="warning" >编辑</n-button> -->
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
          <n-button type="primary" @click="showAction({appTypeId,appTypeName,appType:0})" :disabled="!appTypeId">
            <template #icon>
              <nw-icon name="icon-n-y-add" :size="14" />
            </template>
            新建
        </n-button>
      
      </n-space>
    </n-layout-header>
    <n-layout position="absolute"  has-sider style="top: 50px; " ref="page">
    <n-layout-sider
        collapse-mode="width"
        :collapsed-width="250"
        default-collapsed
        :width="250"
        bordered
      >
        <n-space vertical :size="12">
            <div class="questionHeader">
               <n-input placeholder="搜索" style="textInput" v-model:value="pattern"/>
               <n-popover placement="right-start" :show="showPopover" trigger="manual"  class="btn">
                  <template #trigger>
                    <n-button
                      type="info"
                      @click="showPopover = !showPopover"
                      size="small"
                       style="margin: 0 0 0 5px"
                    >
                        <template #icon>
                          <nw-icon name="icon-n-y-add" :size="18" />
                        </template>
                      </n-button
                    >
                  </template>
                  <div class="large-text" style="width:400px">
                   <n-card>
                     <n-spin :show="isLoading">
                       <n-form style="padding:0 10px" :model="model" ref="formRefQ" :rules="rules">
                         <n-grid x-gap="8" :cols="1" >
                         
                          <n-grid-item>
                              <n-form-item label="分类名称" path="typeName">
                                  <n-input size="small" placeholder="请输入" v-model:value="model.typeName" />
                              </n-form-item>
                          </n-grid-item>
                         
                          <!-- <n-grid-item span="24">
                              <n-form-item label="描述" path="description">
                                  <n-input size="small" placeholder="请输入"  type="textarea" v-model:value="model.description" />
                              </n-form-item>
                          </n-grid-item> -->
                          
                        </n-grid>
                      </n-form>
                     </n-spin>
                    <template #action>
                     <div style="padding: 0 5px 5px 0;text-align:right">
                        <n-button size="small" type="default"  style="margin-right: 5px" @click="()=>{showPopover = false, modelRef.value }" >取消</n-button>
                        <n-button size="small" type="info" @click="onPositiveClick" >保存</n-button>
                      </div>
                    </template>
                  </n-card>
                  </div>
               </n-popover>
              
            </div>
             <n-spin :show="tIsLoading" >
                <n-tree 
                  :data="leftDatas" 
                  :render-prefix="renderPrefix"  
                  :render-suffix="renderSuffix"
                  :render-label="renderLabel"
                  :default-expanded-keys="['0']"
                  block-line 
                  :pattern="pattern"
                  virtual-scroll
                  class="treeH"
                  
                />
              </n-spin>
        </n-space>
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

} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, request, NwTable, Page 
   } from '@platform/main'
import { appClassify, creatClassify, editClassify, del, query,delApp } from './api/index'
import ModalAction from './components/action.vue'

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
  },
  setup (props,context) {

    const dialog = useDialog()
    const pattern = ref('')
    const appTypeId = ref(0)
    const appTypeName = ref('')
    const appName = ref()
    const SearchForm = ref({appName:''})
    const tableRef = ref()
    const model = ref({})
    const leftDatas = ref([])
    const tIsLoading = ref(false)
    const showPopover = ref(false)
    const isLoading = ref(false)
    const message = useMessage();
    const filterData = ref('')
    const modalAction = ref()
    const renderSuffix  = ({ option }) => {

      if((option.id == appTypeId.value  && appTypeId.value)){
        return h(
          <div>
            <NwIcon name="icon-n-y-edit" style="cursor: pointer;margin-right:5px;" size={15} onClick={()=>{
              model.value = {...option,}
              showPopover.value = true
            }} />
            <NPopconfirm
              onPositive-click={(e)=>{handDel(option)}}
              positive-text="确定"
              negative-text="取消"
              
            >
              {{
                trigger:()=>  <NwIcon name="icon-n-y-shanchu" style="cursor: pointer;" size={15} />,
                default:()=> '是否删除当前选项?'
              }}
              
            </NPopconfirm>
        </div>
        )
      }
   
    }
    const renderPrefix = ({ option }) => {
      return h(
        
         <NwIcon name="icon-n-y-fenjifenlei" style="margin-right:5px;" size={15} onClick={()=>{
               vbind.request.params.appTypeId = option.id
               appTypeId.value = option.id
               appTypeName.value = option.typeName
                nextTick().then(() => {
                  tableRef.value.commitQuery()
                })
          }} />
            
      )
    }
    const renderLabel = ({ option }) => {
      return h(
        <span style='width:100%;display:block' onClick={()=>{
          vbind.request.params.appTypeId = option.id
           appTypeId.value = option.id
           appTypeName.value = option.typeName
          nextTick().then(() => {
            tableRef.value.commitQuery()
          })
        }}>{option.label}</span>
        
      )
    }
    const getLeftData = () =>{
       tIsLoading.value = true
        appClassify({}).then((res)=>{
          // vbind.request.params.appTypeId = res.length? res[0].id : 0
          // nextTick().then(() => {
          //   tableRef.value.commitQuery()
          //   appTypeId.value =  res.length? res[0].id : 0
          //   appTypeName.value =  res.length? res[0].typeName :'无'
          // })
          leftDatas.value = [{label:'root',  key : '0',children:res.map(d=>{
            d.label = d.typeName
              d.key = d.id 
              d.children = null
              return d
          })}]
           tIsLoading.value = false
        })
    }
     const handDel = (selected) =>{
      let id = selected.id
      del(id).then(res=>{
       message.success("删除成功");
       getLeftData()
      })
    }
     const handAppDel = (selected) =>{
      let id = selected.id
      delApp(id).then(res=>{
       message.success("删除成功");
       tableRef.value.commitQuery()
      })
    }
    const onPositiveClick = () =>{
      isLoading.value = true
      const fn = model.value.id ? editClassify:creatClassify
      fn({...model.value}).then((r)=>{
        if(r) {
          getLeftData()
          isLoading.value = false
          showPopover.value = false
        }
      }).catch(()=>{
        isLoading.value = false
      })
    }
    const columns = reactive([
      { field: "icon", title: "图标", showHeaderOverflow: true, width:50,
          slots:{
          default:({row})=>{
            return <NwIcon name={row.icon} style="margin-right:5px;" size={15} />
          
          }
        } 
      },
      { field: "appName", title: "应用名称", showHeaderOverflow: true,
          slots:{
          default:({row})=>{
            return <a href="javascript:void(0)" onClick={() => {
              // 这里需要封装一个统一函数
              Page.toLevel2Menu(
                'appCode', row.appCode,
                'appName', row.appName,
                '',
                row, (d, r) => {
                if (d.key === 'menu-manage' && r.appCode === 'incloud-base-portal') {
                  return false
                } else { return true }
              })
            }}>
              { row.appName }
            </a>
          }
        } 
      },
      { title: "应用编码", showHeaderOverflow: true,showOverflow:true,
        slots:{
          default:({row})=>{
            return <span>
            { row.appCode  }
          </span>
          }
        } 
      },
      {title: "数据源名称", field: "resourceName", showHeaderOverflow: true,showOverflow:true, },
      {title: "所属平台", field: "platformDictCode", showHeaderOverflow: true,showOverflow:true, },
      {field: "version",  title: "版本", showHeaderOverflow: true,showOverflow:true, },
      { field: "remark", title: "描述", showHeaderOverflow: true,
          slots:{
          default:({row})=>{
            return <span style=" white-space: nowrap;overflow: hidden; text-overflow: ellipsis;display:inline-block;width:100%">
            { row.remark }
          </span>
          }
        } 
      },
      { field: "createUserName", title: "创建人", showHeaderOverflow: true },
      { title: "创建时间", showHeaderOverflow: true,
        slots:{
          default:({row})=>{
            return <span style="white-space: nowrap;overflow: hidden; text-overflow: ellipsis;display:inline-block;width:100%">
            {  row.createTime}
          </span>
          }
        } 
      },
     
      {
        field: "",
        title: "操作",
        fixed:'right',
        width:120,
        showHeaderOverflow: true,
        slots: {
          default: ({row}) => {
            return [
              <div>
                <a onClick={()=>showAction({appTypeName:appTypeName.value,...row})} style="color:#4098fc;cursor: pointer;display:inline-block;margin-left:15px">{"修改"}</a>
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
              </div>
              
            ];
          },
        },
      },
    ]);
    const vbind = {
        request: {
            XHR:query, // promise 请求函数
            params: {appName:''},
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
    const search = () =>{
       context.emit('update:typeSearch');
    }
    nextTick().then(() => {
      // reset()
    })
    onMounted(() => {
     getLeftData()
    })
    return {
      pattern,
      appName,
      onPositiveClick,
      renderPrefix,
      renderSuffix,
      renderLabel,
      showAction,
      SearchForm,
      columns,
      tableRef,
      vbind,
      appTypeId,
      appTypeName,
      modalAction,
      showPopover,
      leftDatas,
      getLeftData,
      model,
      search,
      tIsLoading,
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
