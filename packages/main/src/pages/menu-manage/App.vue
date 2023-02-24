<template>
  <n-layout  has-sider class="nw-layout-full" >
    <n-layout-sider :width="140">
       
       <!-- <SideTree
         @callback="sideTreeCallback"
       /> -->
       <BizmenuGrid
        :value="bizMenu.code"
        @update:value="onBizMenuCode"
       />
     </n-layout-sider>

    <n-layout  class="nw-layout-full" content-style="height: 100%">
      
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
          <n-form-item label="资源名称" path="sAppName">
            <n-input placeholder="应用名称" v-model:value="sAppName"/>
          </n-form-item>
          <n-form-item>
            <n-button
              type="info"
              attr-type="button"
              style="margin-right: 5px;"
              @click="()=>{
                searchName()
              }"
            >
              查询
            </n-button>
            <n-button
              type="warning"
              attr-type="button"
              @click="()=>{
                sAppName = ''
                tableRef.loadData(rightDatas)
              }"
            >
              重置
            </n-button>
          </n-form-item>
        </n-form>
      
        <!-- <n-button type="warning" >编辑</n-button> -->
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
          <n-button type="primary" @click="showAction({menuType:0, bizMenuCode: bizMenu.code, bizMenuName: bizMenu.name})" :disabled="isDisabled">
            <template #icon>
              <nw-icon name="icon-n-y-add" :size="14" />
            </template>
            新建
        </n-button>
      
      </n-space>
    </n-layout-header>
      <n-layout-content>
          <vxe-grid
            v-bind="gridOptions"
            ref="tableRef"
            class="mytable-scrollbar"
          >
          </vxe-grid>
      </n-layout-content>
    </n-layout>
  </n-layout>
    <ModalAction ref="modalAction"   
      @update:callback="() => {
          getRightData()

  }"></ModalAction>
 <ButtonAction  ref="buttonlAction"   
      @update:callback="() => {
          getRightData()

  }"></ButtonAction>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'

import {
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NForm,
  NFormItem,
  NSpin,
  NDrawerContent,
  NPopconfirm,
  useMessage
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, Page } from '@platform/main'
import SideTree from './components/tree-grid/index.vue'
import { query, del } from './api/index.js'
import ModalAction from './components/action.vue'
import ButtonAction from './components/buttonAcction.vue'
import {
    hierarchy as d3Hierarchy,
    max as d3Max
} from 'd3'

import BizmenuGrid from './components/bizmenu-grid/index.vue'

export default defineComponent({
  components: {
    NLayout,
    NLayoutSider,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    SideTree,
    NForm,
    NFormItem,
    NSpin,
    NDrawerContent,
    ModalAction,
    NPopconfirm,
    ButtonAction,
    BizmenuGrid
  },
  setup () {
    // 这里获取pm 数据

    const md = Page.getMenuData()
    const rightDatas = ref([])
    const tableRef = ref()
    const modalAction = ref()
    const buttonlAction = ref()

    const bizMenu = ref({
      ...md
    })

    const appMessage = ref({
      ...md
    })
    const message = useMessage();
    const sAppName = ref('')
    const isDisabled = ref(false)

    const handDel = (selected) =>{
      let id = selected.id
      del(id).then(res=>{
       message.success("删除成功");
        getRightData()

      })
    }
    const getRightData = () =>{
      gridOptions.loading = true
      query({
        bizMenuCode: bizMenu.value.code,
        includeSth:'0'}).then((r)=>{
           rightDatas.value =r
          tableRef.value.loadData(r)
          gridOptions.loading = false
      })
    }
    nextTick(() => {
      getRightData()
    })
    const searchName = () =>{
     
     
     if(sAppName.value) {
        const result = []
        d3Hierarchy({
                  kids:  rightDatas.value,
                  menuName:'',
                  id: '0'
              }, d => d.kids).descendants().filter(d =>d.id=='0' ? false : d.data.menuName.includes(sAppName.value)).forEach(f => {
                  result.push(f.data)
          })
        tableRef.value.loadData(result)
      } else {
         getRightData()
      }
    }
    const showAction = (e={}) => {
      modalAction.value.sonFn(e);  
      
    }
    const showButtonAction = (e={}) =>{
      buttonlAction.value.sonFn(e);  
    }
    const gridOptions = reactive({
      rowId: 'id',
      size: 'mini',
      border: true,
      height: 'auto',
      align: null,
      loading:false,
      columns: [
        { field: 'menuName', title: '资源名称', showHeaderOverflow: true,  treeNode: true,},
         {
          field: 'menuType',
          title: '资源类型',
          showOverflow: true,
          slots: {
            default: ({row}) => {

              const mt = ['一级页面', '页面', '按钮', '菜单分类', '自定义按钮']
              return [
                <span>
                  {mt[row.menuType]}
                </span>
              ];
            },
          }
        },
       
        { field: 'mthDescription', title: '关联(页面ID)',showHeaderOverflow: true,
         slots: {
            default: ({row}) => {
              return [
                <span>
                  {row.formId?row.formId:'-'}
                </span>
              ];
            },
          }
        },
        { field: 'formUrl', title: 'URL', showHeaderOverflow: true, 
         slots: {
            default: ({row}) => {
              return [
                <span>
                   {row.formUrl?row.formUrl:'-'}
                </span>
              ];
            },
          }},
        {
          field: 'sort', 
          title: '排序', 
          showHeaderOverflow: true, 
        },
         {
          field: 'description', 
          title: '描述', 
          showHeaderOverflow: true, 
        },
        {
          field: 'createUserName', 
          title: '创建人', 
          showHeaderOverflow: true, 
        },
        {
          field: 'createTime', 
          title: '创建时间', 
          showHeaderOverflow: true, 
        },
        {
          field: '',
          title: '操作',
          showHeaderOverflow: true,
          minWidth: '100px',
          slots: {
            default: ({row}) => {
              return [
                <div>
                  <a onClick={()=>row.menuType == 2 ?showButtonAction(row) : showAction({...row})} style="color:#4098fc;cursor: pointer;display:inline-block;">{"修改"}</a>
                
                 <NPopconfirm
                    onPositive-click={(e)=>{handDel(row)}}
                    positive-text="确定"
                    negative-text="取消"
                  >
                    {{
                      trigger:()=>  <a style="color:red;cursor: pointer;display:inline-block;margin-left:8px">{"删除"}</a>,
                      default:()=> `是否删除当前${row.kids.length?'及子集选项' : '选项'}？`
                    }}
                    
                  </NPopconfirm>

                    <a  onClick={()=>showButtonAction({
                      menuType:2,
                      bizMenuCode: bizMenu.value.code,
                      bizMenuName: bizMenu.value.name,
                      parentFullName:row.parentFullName + '/' + row.menuName,
                      parentName:row.menuName,
                      parentFullId:row.parentFullId + '/'+row.id,
                      parentId:row.id,

                  })} style={`${row.menuType !== 2 ? 'display:inline-block' : 'display:none'};color:#4098fc;cursor: pointer;margin-left:15px`}>{"关联功能"}</a>

                </div>
              ];
            },
          }
        }
      ],
      treeConfig: {
        // children: 'children',
        expandAll: true, // 是否展开所有
        children: 'kids',
        hasChild: 'hasKids',
        indent: 15,
        // accordion: false, // 是否手风琴
        line: false, // 是否展示线
        // expandAll: true, // 是否展开所有
        lazy: false, // 是否懒加载
       
        
      },
      data: [],
      
  
    })
   
    return {
      bizMenu,
      onBizMenuCode (d, m) {
        bizMenu.value = m
        getRightData()
      },
      gridOptions,
      rightDatas,
      tableRef,
      appMessage,
      buttonlAction,
      modalAction,
      showAction,
      showButtonAction,
      getRightData,
      isDisabled,
      handDel,
      searchName,
      sAppName,
    }
  }
})

</script>
<style  lang='less' scoped>
</style>