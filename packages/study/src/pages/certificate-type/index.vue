<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <h1>证书分类</h1>
      <div class="nw-page-header-right">
        <ONwTableFun v-if="!formVisible" :table="nwTable"></ONwTableFun>
      </div>
    </n-layout-header>

    <n-layout-content>
      <n-card content-style="padding: 0;" style="height: 100%">
          <ONwTable
            
            ref="nwTable"
            :columns="columns"
            :data="null"
            :request="request"
            :response="response"
            :lazy='false'
            :searchFormFields="[
              {
                field: 'dictName',
                title: '分类名称',
                valueFormat: (d) => d,
              },
            ]"
          >
            <template #header-left>
              <NButton
                type="info"
                size="small"
                @click="show({})"
                style="margin-right: 5px"
                >新设字典</NButton
              >
              <!--  <NButton size="small">修改</NButton>
                      <NButton size="small">删除</NButton>-->
            </template>
            <template #header-right> 
              <!-- <NButton type="info" size="small" style="margin-right: 5px;">其他</NButton>
                      <NButton type="info" size="small">其他</NButton> -->
            </template>
            <template v-slot:search-form="{ searchFormData,  }">
             
              <n-form :model="searchFormData">
                <n-form-item path="dictName" label="字典名称">
                  <n-input
                    v-model:value="searchFormData.dictName"
                    @keydown.enter.prevent
                  />
                </n-form-item>
                <n-form-item path="dictCode" label="字典编码">
                  <n-input
                    v-model:value="searchFormData.dictCode"
                    @keydown.enter.prevent
                  />
                </n-form-item>
              </n-form>
              <!-- <NButton type="info" size="small" style="margin-right: 5px;">其他</NButton>
                      <NButton type="info" size="small">其他</NButton> -->
            </template>
          </ONwTable>
      </n-card>
    </n-layout-content>
  </n-layout>

  <AddCategory
    ref="addCategory"
    @update:callback="
      () => {
        $refs.nwTable.commitQuery();
      }
    "
  ></AddCategory>
 <VersionAction
    ref="versionAction"
    @update:callback="
      () => {
        $refs.nwTable.commitQuery();
      }
    "
  ></VersionAction>
</template>

<script lang='jsx'>
  // import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
  import { h,defineComponent, ref, reactive, onMounted  } from 'vue'
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
    NCard,
    NTabs,
    NTabPane,
    NDropdown,
    useMessage,
    NPopconfirm,
    NButtonGroup,

  } from 'naive-ui'
  import { default as ONwTable, ONwTableFun } from '../../components/nw-tableTree/index.vue'
  import {
    default as NwTable,
    NwTableFun,
  } from "../../components/nw-table/index.vue";
 
  import { classifys, del  } from './api'
  import AddCategory from './addCategory.vue'
  import VersionAction from './versionAction.vue'

  export default defineComponent({
    components: {
      NCard,
      NTabs,
      NTabPane,
      NDrawer,
      NDrawerContent,
      ONwTable,
      NButton,
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NInputGroup,
      ONwTableFun,
      NForm,
      NLayoutSider,
      NFormItem,
      NInput,
      NTree,
      NSpace,
      AddCategory,
      NPopconfirm,
      NButtonGroup,
      NwTable,
      NwTableFun,
      NDropdown,
      VersionAction
    },
    setup () {
      const nwTable = ref(null)
      // 机构树所用到的数据
      const addCategory = ref();     //addOrg 要和AddOrgan组件上的class名相同
      const message = useMessage()
      const show = (data) => {
        addCategory.value.sonFn(data);      
      };
      const showVersionAction = (data) => {
        versionAction.value.sonFn(data)
      }
      const versionAction = ref()
      const handDel = (id)=>{
        del(id).then(res=>{
            message.success("删除成功")
            nwTable.value.commitQuery()
        })
      }
      // 初始化加载
      onMounted(async () => {
        
      })
      
      return {
        versionAction,
        showVersionAction,
        formVisible: ref(false),
        addCategory,show, //调用机构子组件方法
        handDel,
        nwTable,
        message,
        request: {
          XHR: classifys, // promise 请求函数
          params: {parentCode:'certificate_type' },
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
        columns: reactive([
          { field: '', title: '字典名称',showHeaderOverflow: true,  treeNode:true,
             slots: {
              default: ({row}) => {
                return [
                  <span>
                    <a style="color:#2d8cf0;cursor: pointer;" onClick={(e)=>{
                       show(row)
                      }
                    }>{row.dictName}</a>
                  </span>,
                ];
              },
            }
           },
            
          { field: 'dictCode', title: '字典编码', showHeaderOverflow: true,  },
          
          {
            field: '',
            title: '操作',
            showHeaderOverflow: true,
            slots: {
              default: ({row}) => {
                return [
                  // <a style="color:#2d8cf0;cursor: pointer;display:inline-block;margin-left:15px" onClick={(e)=>{showVersionAction(row)}}>{"历史"}</a>

                   <div>
                    <a style="color:#2d8cf0;cursor: pointer;display:inline-block" onClick={(e)=>{show({parentCode:row.dictCode,})}}>{"新设下级分类"}</a>
                    <NPopconfirm
                      onPositive-click={(e)=>{handDel(row.id)}}
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

</style>