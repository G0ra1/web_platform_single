<template>
  <n-drawer
    v-model:show="showModal"
    width="100%"
    :height="200"
    placement="right"
    style="z-index: 1001"
    :to="$refs.page && $refs.page.$el"
  >
    <n-drawer-content
      :title="`编码规则维护`"
      :header-style="{
        padding: '10px',
        'font-size': '16px',
        'font-weight': 'bold',
      }"
      :footer-style="{
        padding: '10px',
      }"
    >
      <n-card style="height: 100%">
        <n-form :model="formV" style="height:80px">
          <n-grid x-gap="12" >
            <n-grid-item :span="4">
                <n-form-item label="编号规则名称" path="ruleName">
                    <n-input size="small" placeholder="请输入" v-model:value="formV.ruleName" />
                </n-form-item>            
            </n-grid-item>
            <n-grid-item :span="4">
                <n-form-item label="规则类型" path="ruleType">
                    <vxe-select size="mini" v-model="formV.ruleType" style="width:100%">
                      <vxe-option
                        :key="item.value"
                        :value="item.value"
                        v-for="item in ruleTypes"
                        :label="item.label"
                        
                      />
                    </vxe-select>
                </n-form-item>            
            </n-grid-item>
            <n-grid-item :span="4" v-if="formV['ruleType'] == 2">
                <n-form-item label="流程实例" path="camundaProcdefId">
                  <vxe-input
                    v-model="formV.camundaProcdefName"
                    size="mini"
                    placeholder=""
                    class="my-search"
                    disabled
                    style="width:100%"
                  >
                    <template #suffix>
                      <NwIcon name="icon-sousuo1"
                        style="color:#3F8FFF;cursor: pointer;"
                        @click="
                          $refs.chooseWF.show([])
                        "
                        />
                    </template>
                  </vxe-input>
                </n-form-item>            
            </n-grid-item>

            <n-grid-item :span="4" v-if="formV['ruleType'] == 1">
                <n-form-item label="生成时机" path="createOpportunity" >
                    <vxe-select size="mini" v-model="formV.createOpportunity" style="width:100%">
                      <vxe-option
                        :key="item.value"
                        :value="item.value"
                        v-for="item in createOpportunitys"
                        :label="item.label"
                        
                      />
                    </vxe-select>
                </n-form-item>            
            </n-grid-item>
            <n-grid-item :span="4" v-if="formV['ruleType'] == 1">
                <n-form-item label="表单名称" path="formNameCh">
                  <vxe-input
                    v-model="formV.formNameCh"
                    size="mini"
                    placeholder=""
                    class="my-search"
                    disabled
                    style="width:100%"
                  >
                    <template #suffix>
                      <NwIcon name="icon-sousuo1"
                        style="color:#3F8FFF;cursor: pointer;"
                        @click="
                          chooseFormName.show({
                            formNameCh: formV.formNameCh,
                            formName: formV.formName,
                          })
                        "
                        />
                    </template>
                  </vxe-input>
                </n-form-item>            
            </n-grid-item>
            <n-grid-item :span="4" v-if="formV['ruleType'] == 1">
                <n-form-item label="规则值" path="encondField">
                  <vxe-input
                    v-model="formV.encondField"
                    size="mini"
                    placeholder=""
                    class="my-search"
                    disabled
                    style="width:100%"
                  >
                    <template #suffix>
                      <NwIcon name="icon-sousuo1"
                        style="color:#3F8FFF;cursor: pointer;"
                        @click="
                          chooseFormSet.show({
                            formId:formV.formId,rowIndex:null, javaName:formV.encondField
                          })
                        "
                        />
                    </template>
                  </vxe-input>
                </n-form-item>            
            </n-grid-item>
          </n-grid>
        </n-form>
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button status="primary" size="mini" @click="insertEvent"
              >添加</vxe-button
            >
          </template>
        </vxe-toolbar>
        <div class="tableH">
          <vxe-table
            resizable
            keep-source
            show-overflow
            border
            ref="xTable"
            size="small"
            :edit-config="{
              trigger: 'click',
              mode: 'row',
              showStatus: true,
              autoClear: false,
            }"
            :data="model"
            height="auto"
          >
            <vxe-table-column
              field="encondType"
              title="编号方式"
              :edit-render="{}"
            >
              <template v-slot:edit="row">
                <vxe-select
                  @change="encondTypeChange(row)"
                  v-model="row.row.encondType"
                  placeholder=""
                  size="small"
                >
                  <vxe-option
                    v-for="item in encondTypeLists"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></vxe-option>
                </vxe-select>
              </template>
              <template v-slot="{ row }">{{ row.encondType }}</template>
            </vxe-table-column>
            <vxe-table-column
              field="formNameCh"
              title="表单名称"
              
            >
              <template v-slot="{ row, _rowIndex }">
                 <vxe-input
                    v-model="row.formNameCh"
                    size="mini"
                    placeholder=""
                    class="my-search"
                    disabled
                    style="width:100%"
                  >
                    <template #suffix v-if="row.encondType == '表单字段' && formV['ruleType'] == 2">
                      <NwIcon name="icon-sousuo1"
                        style="color:#3F8FFF;cursor: pointer;"
                        @click="
                          chooseWfForm.show({
                            index:_rowIndex,
                            camundaProcdefId: formV.camundaProcdefId,
                             formName:row.formName,
                             formId:row.formId,
                             formNameCh:row.formNameCh,
                          })
                        "
                        />
                    </template>
                  </vxe-input>
              </template>
            </vxe-table-column>
            <vxe-table-column field="content" title="设置" :edit-render="{}">
              <template v-slot:edit="{ row, _rowIndex }">
                <vxe-select
                  @change="contentChange(row)"
                  v-model="row.content"
                  placeholder=""
                  size="small"
                  v-if="row.encondType == '系统时间'"
                >
                  <vxe-option
                    v-for="item in contentList"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  ></vxe-option>
                </vxe-select>
                <vxe-input
                  v-model="row.content"
                  size="small"
                  v-if="row.encondType == '固定字符'"
                ></vxe-input>
                <vxe-input
                  v-model="row.content"
                  size="small"
                  v-if="row.encondType == 'UUID'"
                  disabled
                ></vxe-input>

                <vxe-input
                  v-model="row.content"
                  size="small"
                  placeholder=""
                  class="my-search"
                  v-if="row.encondType == '表单字段'"
                  disabled
                >
                  <template #suffix>
                    <NwIcon name="icon-sousuo1"
                      style="color:#3F8FFF;cursor: pointer;"
                      @click="()=>{
                        if(row.formName == 'gzl'){
                              wfFormSet.show({rowIndex:_rowIndex, javaName:row.content})
                        } else {
                            if(formV.ruleType == 2){
                              chooseFormSet.show({formId:row.formId,rowIndex:_rowIndex, javaName:row.content})

                            } else {
                              chooseFormSet.show({formId:formV.formId,rowIndex:_rowIndex, javaName:row.content})

                            }
                        }
                      }
                    "/>
                  </template>
                </vxe-input>
              </template>

              <template v-slot="{ row }">{{ row.content }}</template>
            </vxe-table-column>
            <vxe-table-column title="操作" align="center" width="20%">
              <template v-slot="{ row }">
                <a style="color: red; cursor: pointer" @click="removeEvent(row)"
                  >删除</a
                >
              </template>
            </vxe-table-column>
          </vxe-table>
          <vxe-toolbar
            v-if="formV['ruleType'] !== 2"
            style="border: 1px solid rgb(239, 239, 245); border-top: none"
          >
            <template v-slot:buttons>
              <vxe-form :data="rulemaking">
                <vxe-form-gather span="24">
                  <vxe-form-item
                    title="编号方式"
                    field="encondType"
                    :item-render="{}"
                    span="6"
                  >
                    <template #default="{ data }">
                      <vxe-input
                        v-model="data['encondType']"
                        size="small"
                        placeholder=""
                        class="my-domain"
                        disabled
                      ></vxe-input>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item
                    title="位数"
                    field="content"
                    :item-render="{}"
                    span="6"
                  >
                    <template #default="{ data }">
                      <vxe-input
                        v-model="data['content']"
                        size="small"
                        placeholder=""
                        type="number"
                        class="my-domain"
                        :max="9"
                        :min="1"
                      ></vxe-input>
                    </template>
                  </vxe-form-item>

                  <vxe-form-item
                    title="重置周期"
                    field="resetCycle"
                    :item-render="{}"
                    span="6"
                  >
                    <template #default="{ data }">
                      <vxe-select
                        v-model="data['resetCycle']"
                        placeholder=""
                        size="small"
                      >
                        <vxe-option
                          v-for="item in resetCycleList"
                          :key="item.value"
                          :value="item.value"
                          :label="item.label"
                        ></vxe-option>
                      </vxe-select>
                    </template>
                  </vxe-form-item>
                  <vxe-form-item
                    title="初始值"
                    field="initialValue"
                    :item-render="{}"
                    span="6"
                  >
                    <template #default="{ data }">
                      <vxe-input
                        v-model="data['initialValue']"
                        size="small"
                        placeholder=""
                        type="number"
                        :min="0"
                        :max="maxNumber(rulemaking.content)"
                      ></vxe-input>
                    </template>
                  </vxe-form-item>
                </vxe-form-gather>
              </vxe-form>
            </template>
          </vxe-toolbar>
        </div>
        <template #action>
          <span
            >编码预览:
            <h3 style="color: red; display: inline-block; margin-left: 5px">
              {{ getPreview() }}
            </h3></span
          >
        </template>
      </n-card>
      <template #footer>
        <n-button
          type="info"
          size="small"
          style="margin-right: 5px"
          @click="handleCreat"
          >保存</n-button
        >
        <n-button size="small" @click="close">取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
  <ChooseFormName
    ref="chooseFormName"
    @update:callback="
      (e) => {
        assignmentFormName(e);
      }
    "
  ></ChooseFormName>
  <ChooseWF
    ref="chooseWF"
    @update:callback="
      (e) => {
        formV.camundaProcdefId = e.camundaProcdefId
        formV.camundaProcdefName = e.procdefName
      }
    "
  ></ChooseWF>
  <ChooseWfForm ref="chooseWfForm"
    @update:callback="
      (e) => {
        model[e.index] = {...model[e.index],...e}
         $refs.xTable.loadData(model)
      }
    "
  >
  </ChooseWfForm>
  <ChooseFormSet
    ref="chooseFormSet"
    @update:callback="
      (e) => {
        if(e.rowIndex || e.rowIndex ==0){
          model[e.rowIndex].content = e.javaName
          $refs.xTable.loadData(model)
        } else {
          formV.encondField = e.javaName
        }
       
      }
    "
  ></ChooseFormSet>
  <WfFormSet
   ref="wfFormSet"
    @update:callback="(e)=>{
      model[e.rowIndex].content = e.javaName
    }"
  ></WfFormSet>
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
    NDatePicker
  } from 'naive-ui'
  import {
    default as NwTable,
    NwTableFun,
  } from "../../components/nw-table/index.vue"; 
  import { VXETable,  } from 'vxe-table'
  import {  creatCodeRule, detail } from './api'
  import ChooseFormName from'./chooseFormNameModal.vue';
  import ChooseFormSet from'./chooseFormSet.vue';
  import { NwIcon } from '@platform/main'
  import ChooseWF from './chooseWF.vue'
  import ChooseWfForm from './chooseWfForm.vue'
  import WfFormSet from './wfFormSet.vue'

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
      ChooseFormName,
      ChooseFormSet,
      NwIcon,
      ChooseWF,
      ChooseWfForm,
      WfFormSet
    },
    props: {
    
    },
    setup (props,context) {
      const formVisible = ref(false)
      const model = ref([])
      const xTable = ref()
      const formV = ref({})
      const chooseFormName = ref()
      const rulemaking = ref({})
      const formFields = ref([])
      const chooseFormSet = ref()
      const chooseWF = ref()
      const chooseWfForm = ref()
      const wfFormSet = ref()
      const sonFn = (e) => {
        formVisible.value = true
        model.value = []
        formV.value = {preview:'',ruleName:'',ruleType:'',formNameCh:'',formName:'',}
        rulemaking.value = {encondType:'自动计数',content:1,initialValue:0,}
      };
      const assignmentFormName =(e)=>{
           formV.value = {
             ...formV.value,
             formNameCh:e.formNameCh,
             formName:e.formName,
             formId:e.id
           }
          
      }
      const ruleTypesChange = (e) =>{
         formV.value.ruleType = e.value
      }
      const encondTypeList = reactive([
        { label: '固定字符', value: '固定字符'},
        { label: 'UUID', value: 'UUID'},
        // { label: '自动计数', value: '自动计数'},
        { label: '系统时间', value: '系统时间'},
      ])
      const encondTypeLists = reactive([
        { label: '固定字符', value: '固定字符'},
        { label: 'UUID', value: 'UUID'},
        { label: '系统时间', value: '系统时间'},
        { label: '表单字段', value: '表单字段'},

      ])
     
       const contentList = reactive([
        { label: '年(yy)', value: '年(yy)' },
        { label: '年月(yyMM)', value: '年月(yyMM)' },
        { label: '年月日(yyMMdd)', value: '年月日(yyMMdd)' },
        { label: '年(yyyy)', value: '年(yyyy)' },
        { label: '年月(yyyyMM)', value: '年月(yyyyMM)' },
        { label: '年月日(yyyyMMdd)', value: '年月日(yyyyMMdd)' },
      ])
      const resetCycleList = reactive([
        { label: '不重置', value: '不重置'},
        { label: '每天重置(凌晨12点)', value: '每天重置(凌晨12点)'},
        { label: '每周重置(凌晨12点)', value: '每周重置(凌晨12点)'},
        { label: '每月重置(凌晨12点)', value: '每月重置(凌晨12点)'},
        { label: '每年重置(凌晨12点)', value: '每年重置(凌晨12点)'},

      ])
      const maxNumber = (num=0) =>{

        var maxNum = 0
        let str = ''
        for(let a = 0;a<num;a++){
          str+='9'
        }
        return Number(str) 
      }
    
      const rulemakingChange = (obj={}) =>{
        var str = ''
        for(let num = 0;num<obj.content;num++){
          str+='0'
        }
        return str.substring(0,str.length-(obj.initialValue+'').length) + obj.initialValue
      }
       // 系统时间转换
       const systemTime = (e)=> {
         var date = new Date();
         var newDate = ''
         if(e == '年(yy)'){
           newDate = (date.getFullYear()+'').substring(2,4)
         } else if(e == '年月(yyMM)'){
            newDate = (date.getFullYear()+'').substring(2,4)+(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
         }else if(e == '年月日(yyMMdd)'){
            newDate = (date.getFullYear()+'').substring(2,4)+ (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
         }else if(e == '年(yyyy)'){
            newDate = date.getFullYear()
         }else if(e == '年月(yyyyMM)'){
            newDate = date.getFullYear()+''+(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
         }else if(e == '年月日(yyyyMMdd)'){
            newDate = date.getFullYear()+''+ (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
         }
         return newDate
       }
        const getPreview = () =>{
          var arr = []
          const $table = xTable.value ? xTable.value.getTableData().tableData : []
         $table.map((d)=>{
            arr.push({...d,content:d.encondType == '系统时间' ? systemTime(d.content) : d.content})
          })
          if(formV.value.ruleType == 2){
              formV.value.preview = arr.map((d)=>d.content).join('-')
          } else {
             formV.value.preview = arr.map((d)=>d.content).join('-')+ (arr.length ? '-'+rulemakingChange(rulemaking.value):'')
          }
          return formV.value.preview
        }
       // 新增
       const insertEvent = async (row) => {
              const $table = xTable.value
              const record = {
               sort:xTable.value.getTableData().tableData.length
              }
              const num = xTable.value.getTableData().tableData.length
              model.value[num]={...record}
              const { row: newRow } = await $table.insertAt(record, -1)
        }
       
        //删除
         const removeEvent = (row) => {
              const $table = xTable.value
              
              VXETable.modal.confirm('您确定要删除该数据?').then(type => {
                if (type === 'confirm') {
                  $table.remove(row)
                  model.value=model.value.filter((d)=>d.sort !== row.sort)
                  console.log(model.value,'-=model.value')
                }
              })
        }
     
      onMounted(async () => {
        
      })
      return {
        chooseFormSet,
        assignmentFormName,
        ruleTypesChange,
        chooseFormName,
        wfFormSet,
        chooseWF,
        chooseWfForm,
        xTable,
        insertEvent,
        sonFn,
        model, // 表单数据
        showModal: formVisible,
        formV,
        encondTypeList,
        encondTypeLists,
        resetCycleList,
        contentList,
        maxNumber,
        rulemaking,
        removeEvent,
        rulemakingChange,
        systemTime,
        getPreview,
        ruleTypes:reactive([
          { label: '业务表单', value: 1},
          { label: '工作流', value: 2},
        ]),
        createOpportunitys:reactive([
          { label: '表单发起时', value: 1},
          { label: '表单保存时', value: 2},
        ]),
        handleCreat(e){
          model.value.map(d=>{
            delete d.id
            return d
          })
          if((formV.value.ruleType == 1) && !(model.value[model.value.length-1].encondType == '自动计数')){
            
            model.value = model.value.concat([{...rulemaking.value,sort:model.value.length}])
          }
          creatCodeRule({...formV.value,encondRuleDetailList:model.value}).then((res)=>{
            context.emit('update:callback');
            formVisible.value = false
          })
          
         
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
    
      contentChange(row){
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model[row._rowIndex].content=row.row.content
        
      },
      encondTypeChange(row){
       
        this.$refs.xTable.clearActived(); //清除单元格激活状态
        this.$refs.xTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
        this.model[row._rowIndex].encondType=row.row.encondType
        if(row.row.encondType=='UUID'){
            this.model[row._rowIndex].content = 'b892682636b34b'
        } else {
           this.model[row._rowIndex].content = ''
        }
        this.$refs.xTable.loadData(this.model)
      },
    
 
     
    }
  })
</script>
<style lang='less'>
.n-drawer-container {
  z-index: 1001 !important;
}
.tableH {
  height: calc(~"100% - 190px");
}
.n-card > .n-card__action {
  height: 100px;
}
</style>