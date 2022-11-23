<template>
    <n-drawer
      v-model:show="showModal"
      width="100%"
      :height="200"
      placement="right"
      :to="$refs.page && $refs.page.$el"
    >
    <n-drawer-content
      :title="`新设下级部门---${tableV.value.orgName}`"
      :header-style="{
      'padding': '10px',
      'font-size': '16px',
      'font-weight': 'bold'
    } "
      :footer-style="{
        'padding': '10px',
      }"
    >
        <n-card style="height:100%">
            <vxe-table
              border
              resizable
              keep-source
              show-overflow
              ref="xTable"
              size="small"
              :edit-config="{trigger: 'click', mode: 'row',  showStatus: true,autoClear: false,}"
              :data="model.data"
              :edit-rules="validRules"
              height="auto"
            >
              <vxe-table-column
                field="orgName"
                title="部门名称"
                :edit-render="{name: 'input', defaultValue: '', 
                 events: { change: orgNameChange },
                }"
              ></vxe-table-column>
              <vxe-table-column
                field="orgCode"
                title="部门编码"
                 :edit-render="{name: 'input', defaultValue: '',
                 events: { change: orgCodeChange },
                 }"


              ></vxe-table-column>
             
              <!-- <vxe-table-column field="lvType" title="GEPS级别类型" :edit-render="{}">
                <template v-slot:edit="row">
                  <vxe-select  @change="lvTypeChange(row)"  v-model="row.row.lvType" placeholder="GEPS级别类型" size="small">
                    <vxe-option v-for="item in lvTypes" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                  </vxe-select>
                </template>
                 <template v-slot="{ row }">{{row.lvType? lvTypes.filter(d=>d.value==row.lvType)[0].label : '' }}</template>
              </vxe-table-column>
              <vxe-table-column field="oaLvType" title="OA级别类型" :edit-render="{}">
                <template v-slot:edit="row">
                  <vxe-select  @change="oaLvTypeChange(row)"  v-model="row.row.oaLvType" placeholder="OA级别类型" size="small">
                    <vxe-option v-for="item in oaLvTypes" :key="item.value" :value="item.value" :label="item.label"></vxe-option>
                  </vxe-select>
                </template>
                 <template v-slot="{ row }">{{row.oaLvType? oaLvTypes.filter(d=>d.value==row.oaLvType)[0].label : '' }}</template>
              </vxe-table-column> -->
              <vxe-table-column field="parentName" title="上级机构" ></vxe-table-column>
              <vxe-table-column
                title="操作"
                width="5%"
                align="center"
              >
                <template v-slot="{ row }">
                
                  <a style="color:red;cursor:pointer " @click="removeEvent(row)">删除</a>
                </template>
              </vxe-table-column>
            </vxe-table>
            <template #action> 
              <div style="text-align: center;display:table;width:100%;height:100%;cursor: pointer;" @click="insertEvent">
                <a style="display:table-cell;vertical-align:middle;" >添加</a>
              </div>
             </template>
        </n-card>
    
      <template #footer>
        <n-button
            type="info"
            size="small"
            style="margin-right: 5px;"
            @click="handleCreat"
          >保存</n-button>
          <n-button
            size="small"
            @click="close"
          >取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
  
</template>

<script>
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
    useMessage
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '/@/components/nw-table/index.vue'
  import { VXETable,  } from 'vxe-table'
  import {  rightList, creatOrg } from './api'

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
      
    },
     props: {
      
     },
    setup (props,context) {
      const formVisible = ref(false)
      const model = reactive({data:[]})
      const tableV = reactive({})
      const xTable = ref()
      const message = useMessage();
      const lvTypes = reactive([
        // { label: '建设公司', value: 1 },
        { label: '分公司', value: 2 },
        { label: '项目部', value: 3 },
        { label: '部门', value: 4 },
     
    ])
    const oaLvTypes = reactive([
        { label: 'OA机构', value: 1 },
        { label: 'OA部门', value: 2 },
    ])
      const sonFn = (e) => {
        tableV.value = e
        model.data = []
        formVisible.value = true
        
      };
      //   新增
       const insertEvent = async (row) => {
              const $table = xTable.value
              const record = {
               parentId:tableV.value.id,
               parentName:tableV.value.orgName,
               orgType:2
              }
              model.data[0]={...record}
              const { row: newRow } = await $table.insertAt(record, 0)
            //   await $table.setActiveCell(newRow, 'sex')
        }
       //删除
        const removeEvent = (row) => {
              const $table = xTable.value
              
              VXETable.modal.confirm('您确定要删除该数据?').then(type => {
                if (type === 'confirm') {
                  $table.remove(row)
                }
              })
      }
      onMounted(async () => {
      })
      return {
        xTable,
        insertEvent,
        sonFn,removeEvent,
        lvTypes,
        oaLvTypes,
        model, // 表单数据
        showModal: formVisible,
        tableV,
        validRules: reactive({
          orgCode: [
            { required: true, message: '部门编码必须填写'  }
          ],
          orgName: [
            { required: true, message: '部门名称必须填写' }
          ],
          lvType: [
            { type: 'number',  required: true,}
          ],
          oaLvType: [
            { required: true, type: 'number', }
          ]
        }),
        async handleCreat(e){
          const errMap = await xTable.value.validate().catch(errMap => errMap)
          if (!errMap) {
            creatOrg(model.data).then((res)=>{
                if(res){
                    context.emit('update:callback');
                     message.success("操作成功")
                    formVisible.value = false
                } 
            })
          } else {
            message.error("校验不通过")
          }
          
        },
         close(){
          formVisible.value = false
        }
      }
    },
    methods: {
      orgNameChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        
            this.model.data[row._rowIndex].orgName=row.row.orgName
        
      },
      ncOrgNameChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        
            this.model.data[row._rowIndex].ncOrgName=row.row.ncOrgName
        
      },
      ncOrgCodeChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        
            this.model.data[row._rowIndex].ncOrgCode=row.row.ncOrgCode
        
      },
      lvTypeChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        
        this.model.data[row._rowIndex].lvType=row.row.lvType
      },
      oaLvTypeChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        
        this.model.data[row._rowIndex].oaLvType=row.row.oaLvType
      },
      orgCodeChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model.data[row._rowIndex].orgCode=row.row.orgCode
        
      },
    }
  })
</script>

<style lang='less'>
  
  .n-drawer-container{
      z-index:1001 !important;
  }
</style>