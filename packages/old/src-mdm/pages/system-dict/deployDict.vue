<template>
    <n-drawer
      v-model:show="showModal"
      width="60%"
      :height="200"
      placement="right"
      style="z-index:1001"
      :to="$refs.page && $refs.page.$el"
    >
    <n-drawer-content
      :title="`字典列表`"
      :header-style="{
      'padding': '10px',
      'font-size': '16px',
      'font-weight': 'bold'
    } "
      :footer-style="{
        'padding': '10px',
      }"
    >
        <n-card style="height:calc(100% - 9px)" size='small'>
           
               <n-button
                  type="info"
                  size="small"
                  style="margin:5px 0"
                  @click="showDeployDict(data)"
                  >添加</n-button
                >
            <vxe-table
              border
              resizable
              keep-source
              show-overflow
              ref="xTable"
              size="small"
              :data="model.tableV"
             
              :loading="tableLoading"
            >
             <vxe-table-column
                field="dictItemName"
                title="字典项"
               
              ></vxe-table-column>
              <vxe-table-column
                field="dictItemCode"
                title="字典编码"
               
              ></vxe-table-column>
           
              <vxe-table-column
                title="操作"
                
                align="center"
              >
                <template v-slot="{ row }">
                  <a style="color:#2d8cf0;cursor:pointer;display:inline-block " @click="showDeployDict(row)">编辑</a>
                  <a style="color:#2d8cf0;cursor:pointer;display:inline-block;margin-left:10px;" @click="showVersionAction(row)">历史</a>

                  <a style="color:red;cursor:pointer;margin-left:10px;display:inline-block" @click="removeEvent(row)">删除</a>
                </template>

              </vxe-table-column>
            </vxe-table>
            
        </n-card>
    
      <template #footer>
          <n-button
            size="small"
            @click="close"
          >关闭</n-button>
      </template>
    </n-drawer-content>
    <DeployDictAdd ref="deployDictAdd"   @update:callback="() => {
      getTableV(data.dictId)
    }"></DeployDictAdd>
    <VersionAction
      ref="versionAction"
      @update:callback="
        () => {
          getTableV(data.dictId)
        }
      "
    ></VersionAction>
  </n-drawer>
  
</template>

<script lang="jsx">
  // import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
  // console.log('===ej2btn===', GridComponent);
  import { defineComponent, ref, reactive,onMounted,  } from 'vue'
  import {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NCard,
    NDatePicker,
    useMessage
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '/@/components/nw-table/index.vue'
  import { VXETable,  } from 'vxe-table'
  import { dictItemList, delDictItem  } from './api'
  import DeployDictAdd from "./deployDictAdd.vue";
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
      NInput,
      NwTableFun,
      NForm,
      NFormItem,
      NGrid,
      NGridItem,
      NTreeSelect,
      NSelect,
      NCard,
      NDatePicker,
      DeployDictAdd,
      VersionAction
    },
     props: {
     
     },
    setup (props,context) {
      const formVisible = ref(false)
      const tableLoading = ref(false)
      const model = reactive({tableV:[]})
      const tableV = reactive({})
      const xTable = ref()
      const data = reactive({})
      const deployDictAdd = ref()
      const message = useMessage();
      const showVersionAction = (data) => {
        versionAction.value.sonFn(data)
      }
      const versionAction = ref()
      const showDeployDict = (e) => {
          deployDictAdd.value.sonFn(e);  
      
      }
      const tablePage = reactive({
            total: 0,
            currentPage: 1,
            pageSize: 10,
            align: "left",
            pageSizes: [10, 20, 50, 100, 200, 500],
            layouts: [
            "Sizes",
            "PrevJump",
            "PrevPage",
            "Number",
            "NextPage",
            "NextJump",
            "FullJump",
            "Total",
            ],
            perfect: true,
        })
      const sonFn = (e) => {
        formVisible.value = true
        data.dictId = e.dictId
        getTableV(e.dictId)
      };
      const getTableV = (dictId)=>{
        tableLoading.value = true
         dictItemList(
           dictId
          ).then((res)=>{
            model.tableV = res
            tableLoading.value = false
            
          })
      }
    
        //删除
      const removeEvent = (row) => {
          const $table = xTable.value
          
          VXETable.modal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
              delDictItem(row.id).then(res=>{
                message.success("删除成功")
                getTableV(data.dictId );
              })
            }
          })
      }
      onMounted(async () => {
        
         
      })
      return {
        xTable,
        showVersionAction,
        versionAction,
        sonFn,
        tableLoading,
        model, // 表单数据
        showModal: formVisible,
        tableV,
        tablePage,
        deployDictAdd,
        showDeployDict,
        data,
        getTableV,
        removeEvent,
        handleCreat(e){
           
         
        },
        close(){
          formVisible.value = false
        }
      }
    },
    methods: {
      formatDate(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;//
      },
      
    }
  })
</script>
<style lang='less'>
  
  .n-drawer-container{
      z-index:1001 !important;
  }
</style>