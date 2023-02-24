<template>
  <n-layout class="nw-layout-full" ref="pageRef">
    <n-layout-header>
      <h1>试题管理</h1>
    </n-layout-header>
    <n-layout position="absolute"  has-sider style="top: 50px; " ref="page">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="400"
        default-collapsed
        :width="400"
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
                      class="liuchengBtn"
                      style="margin: 0 0 0 5px"
                    >
                        <template #icon>
                         <NwIcon name="icon-n-y-add" style="cursor: pointer;" size={18}  />
                        </template>
                      </n-button
                    >
                  </template>
                  <div class="large-text" style="width:400px">
                   <n-card>
                     <n-spin :show="isLoading">
                       <n-form  :model="model" ref="formRefQ" :rules="rules">
                         <n-grid x-gap="8" :cols="1" >
                          <!-- <n-grid-item>
                              <n-form-item path="typeCode" label="题库标签">
                                  <nw-dic
                                          :request="{XHR:dictItemLists, params: 'STUDY_DATABASE_TYPE',}"
                                          v-model:value="model.typeCode"
                                          v-model:label="model.typeName"
                                          size="small"
                                          multiple
                                          :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
                                        />
                              </n-form-item>
                          </n-grid-item> -->
                          <n-grid-item>
                              <n-form-item label="题库名称" path="databaseName">
                                  <n-input size="small" placeholder="请输入" v-model:value="model.databaseName" />
                              </n-form-item>
                          </n-grid-item>
                         
                          <n-grid-item span="24">
                              <n-form-item label="描述" path="description">
                                  <n-input size="small" placeholder="请输入"  type="textarea" v-model:value="model.description" />
                              </n-form-item>
                          </n-grid-item>
                          
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
                  :data="testQuestions" 
                  :render-prefix="renderPrefix"  
                  :render-suffix="renderSuffix"
                  :render-label="renderLabel"
                  :default-selected-keys="['0']"
                  block-line 
                  :pattern="pattern"
                  virtual-scroll
                  class="treeH"
                  
                />
              </n-spin>
        </n-space>
    </n-layout-sider>
    <n-layout-content>
      <NwTable1
        ref="tableRef"
        defaultKey="question"
        :labelCodes="[
         {label:'全部',value:''},
          {label:'单选题',value:0},
          {label:'多选题',value:1},
          {label:'填空题',value:2},
          {label:'判断题',value:3},
          {label:'简答题',value:4},
        ]"
        :columns="columns"
        v-bind="vbind"
      >
        <template v-slot:header-left="{ selected }"> </template>
        <template #header-right>
          
          <vxe-button content="单个录入" :disabled="(databaseId && databaseId=='0')"   style="height:36px">
            <template #dropdowns>
              <vxe-button type="text" content="单选题" @click="handleShow({databaseId,databaseName,questionCode:0})"></vxe-button>
              <vxe-button type="text" content="多选题" @click="handleShow({databaseId,databaseName,questionCode:1})"></vxe-button>
              <vxe-button type="text" content="填空题" @click="handleShow({databaseId,databaseName,questionCode:2})"></vxe-button>
              <vxe-button type="text" content="判断题" @click="handleShow({databaseId,databaseName,questionCode:3})"></vxe-button>
              <vxe-button type="text" content="简答题" @click="handleShow({databaseId,databaseName,questionCode:4})"></vxe-button>

            </template>
          </vxe-button>
          <vxe-button style="height:36px"  @click="()=>{
            showToLeadShow = true
            exportData = []
          }" :disabled="(databaseId && databaseId=='0')">文档导入</vxe-button>
          <vxe-button @click="clientTemplate" style="height:36px"   :loading="isTableLoading">模板导出</vxe-button>
          
        </template>
        <template v-slot:search-form="{ searchFormData, searchFormData2 }">
          <n-form
            :model="searchFormData"
            label-placement="left"
            :label-width="80"
            size="small"
          >
            <n-grid :cols="17" :x-gap="24">
              
              <n-form-item-gi :span="4" label="简易程度" path="grade">
                <n-select
                  v-model:value="searchFormData.grade"
                  :options="[
                    {label:'易',value:0},
                    {label:'中',value:1},
                    {label:'难',value:2},
                  ]"
                >
                </n-select>
              </n-form-item-gi>
              <n-form-item-gi :span="4" label="是否被引用" path="isQuote">
                <n-select
                  v-model:value="searchFormData.isQuote"
                  :options="[
                    {label:'否',value:0},
                    {label:'是',value:1},
                  ]"
                >
                </n-select>
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </template>
      </NwTable1>
      
    </n-layout-content>
     </n-layout>
  </n-layout>
  <n-drawer
    v-model:show="visible"
    :to="pageRef && pageRef.$el"
    width="900px"
    :height="200"
  >
    <n-drawer-content
      :title="action === 'create' ? '新建' :(action =='edit'? '编辑' : '导入题目修改')"
      :header-style="{
        padding: '10px',
        'font-size': '16px',
        'font-weight': 'bold',
      }"
      :footer-style="{
        padding: '10px',
      }"
      z-index="999999"
    >
      <nw-form-view
        ref="formRef"
        src="/web-study/forms/study-testQuestion-management-from.html"
      />
      <template #footer>
        <n-button
          type="info"
          size="small"
          style="margin-right: 5px"
          @click="handleSave"
          >保存</n-button
        >
        <n-button size="small" @click="handleCancel">取消</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
  <n-modal
    v-model:show="showToLeadShow"
    :mask-closable="false"
    preset="dialog"
    title="批量导题"
    content="你确认"
    positive-text="确认"
    negative-text="取消"
    style="width:1500px;"
     :z-index="999"
  >
    <n-card style="height:600px">
      <vxe-toolbar style="height:40px">
        <template #buttons>
          <n-upload
              :action="exportUploadUrl"
              :show-file-list="false"
              :headers="{
                  Authorization: `${tokenType} ${token}`,
              }"
              @finish="exportHandleFinish"
              
            >
              <n-button>
                选择文件
              </n-button>
          </n-upload>
        </template>
      </vxe-toolbar>
      <vxe-table
        ref="dTable"
        border
        height="520px"
        highlight-current-row
        :data="exportData"
        >
        <vxe-column type="expand" field="questionCode" title="类型" >
          <template #default="{ row,  }">
            <span style="font-size:20px">[{{ (row.questionCode || row.questionCode ==0)?questionCodes.filter(d=>d.value==row.questionCode)[0].label :'' }}]</span><span style="font-size:12px">[难度系数:{{ (row.grade || row.grade ==0) ?grades.filter(d=>d.value==row.grade)[0].label :''  }}]</span>
          </template>
          <template #content="{ row,  }">
          
            <div  class="expand-wrapper">
              
              <ul v-if="row.questionCode ==0 || row.questionCode ==1" style="list-style: none;">
                <li v-for="item in row.answers">
                  <span :style="{'color':item.isTrue? '#4098fc' : 'gray'}">{{letters.filter(d=>d.value == item.sort)[0].label }}:  {{item.answer}}</span> 
                </li>
                
              </ul>
              <p v-if="row.questionCode ==2">{{row.answers.map(d=>d.answer).join('、')}}</p>
              <p v-if="row.questionCode ==3">{{row.answers[0].isTrue==1?'正确':'错误'}}</p>
              <p v-if="row.questionCode ==4">{{row.answers[0].answer}}</p>

              <p>
                <span>解析：</span>
                <span>{{ row.parse }}</span>
              </p>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="question" title="题干" ></vxe-column>
        <vxe-column field="databaseName" title="所属题库" ></vxe-column>
        <vxe-column  field="" title="操作" >
            <template #default="{ row,_rowIndex }">
              <n-button
                    text
                    type="info"
                    size="small"
                    style="margin-right: 5px"
                    @click="handleShow({...row,index:_rowIndex,isImpot:true})"
              >编辑</n-button>
              <n-button
                  text
                  type="error"
                  size="small"
                  style="margin-right: 5px"
                  @click="removeEvent([row])"
                  >删除</n-button>
            </template>
        </vxe-column>
      </vxe-table>
      </n-card>
    <template #action>
      <div style="padding: 0 5px 5px 0;">
        <n-button size="small" type="default"  style="margin-right: 5px" @click="showToLeadShow = false" >取消</n-button>
        <n-button size="small" type="info" @click="exportPositiveClick" >保存</n-button>
      </div>
    </template>
  </n-modal>
  <n-modal
    v-model:show="showDelModal"
    :mask-closable="false"
    preset="dialog"
    title="确认"
    content="请确认删除此记录"
    positive-text="确认"
    negative-text="取消"
    @positive-click="delMOdalOnPositiveClick"
    @negative-click="delMOdalOnNegativeClick"
  />
  <Detail ref='detail'></Detail>
  <Preview ref="preview"></Preview>
</template>

<script lang="jsx">
import { defineComponent, reactive, ref, h, onMounted,watch } from "vue";
import {
    default as NwTable,
    NwTableFun,
} from "../../components/nw-table/index3.vue";
import {format } from "date-fns";
import { exportTemplate,studyExamDatabaseDefLists,creatBatchAddQuestion,creatStudyExamDatabaseDef,editStudyExamDatabaseDef, dictItemLists,delStudyExamDatabaseDef } from './api'

import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NLayoutSider,
  NSpin,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  useMessage,
  NSelect,
  NDropdown,
  NModal,
  NGrid,
  NFormItemGi,
  NGridItem,
  NDatePicker,
  NTree,
  NPopover,
  NCard,
  NImage,
  NUpload,
  NSpace
} from "naive-ui";
import NwFormView from "../../components/nw-form-view/index.vue";
import Detail from './detail.vue'
import { NwIcon,Cookies } from '@platform/main'
// import ActionModule from 'action';

import Preview  from './preview.vue'
import {

  action,
  vbind,
  visible,
  dataModel,
  formRef,
  pageRef,
  tableRef,
  handleShow,
  handleSave,
  handleCancel,
  handleDel,
  info,
  exportHandleFinish,
  dTable,
  exportData,
  databaseId,
  databaseName
} from "./store.js";
export default defineComponent({
  components: {
    NwTable1: NwTable,
    NwTableFun1: NwTableFun,
    NCard,
    NUpload,
    NGridItem,
    Detail,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NwFormView,
    NSelect,
    NwIcon,
    NDropdown,
    NModal,
    NGrid,
    NFormItemGi,
    NDatePicker,
    NLayoutSider,
    NSpin,
    NTree,
    NImage,
    NPopover,
    Preview,
    NSpace,
  },
  setup() {
    const range = ref([Date.now(), Date.now()])

    const columns = reactive([
      { field: "question", title: "题干", showHeaderOverflow: true, minWidth:200,
          slots:{
          default:({row})=>{
            return <span style="white-space: nowrap;overflow: hidden; text-overflow: ellipsis;display:inline-block;width:100%">
            { row.question }
          </span>
          }
        } 
      },
      { field: "parse", title: "描述", showHeaderOverflow: true,
          slots:{
          default:({row})=>{
            return <span style=" white-space: nowrap;overflow: hidden; text-overflow: ellipsis;display:inline-block;width:100%">
            { row.parse }
          </span>
          }
        } 
      },
      { title: "类型", showHeaderOverflow: true,showOverflow:true,
        slots:{
          default:({row})=>{
            return <span>
            { (row.questionCode || row.questionCode ==0)?questionCodes.filter(d=>d.value==row.questionCode)[0].label :'' }
          </span>
          }
        } 
      },
        {title: "难度系数", showHeaderOverflow: true,showOverflow:true,
        slots:{
          default:({row})=>{
            return <span>
            { (row.grade || row.grade ==0)?grades.filter(d=>d.value==row.grade)[0].label :'' }
          </span>
          }
        } 
      },
      //
       {  title: "是否被引用", showHeaderOverflow: true,showOverflow:true,
        slots:{
          default:({row})=>{
            return <span>
            { (row.isQuote || row.isQuote ==0)?[{value:0,label:'否'},{value:1,label:'是'}].filter(d=>d.value==row.isQuote)[0].label :'' }
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
          default: ({ row }) => {
            return [
              <div>
                <NwIcon name="icon-n-n-eye" style="cursor: pointer;" size={18} onClick={()=>{ preview.value.sonFn(row)}} />
                <NwIcon name="icon-bianji1" style="cursor: pointer;margin-left:5px;" size={18} onClick={()=>{ handleShow(row)}} />
               <NDropdown onSelect={(key)=>handleSelect(key,row)} trigger={"hover"} showArrow={true} options={dropdownOptions}>
                  <NwIcon name="icon-n-y-qita" color="#010101" style="cursor: pointer;margin-left:5px;" size={18} />
              </NDropdown>
                
              </div>,
            ];
          },
        },
      },
    ]);
    const delId = ref('')
    const modelRef = ref({})
    const preview = ref()
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    const message = useMessage();
    const detail = ref()
    const showPopover  = ref(false)
    const showToLeadShow = ref(false)
    const testQuestions = ref([]) //题库列表
    const formRefQ = ref()
    const questionCodes = reactive([
      {label:'单选题',value:0},
      {label:'多选题',value:1},
      {label:'填空题',value:2},
      {label:'判断题',value:3},
      {label:'简答题',value:4},
    ])
    const grades = reactive([
      {label:'易',value:0},
      {label:'中',value:1},
      {label:'难',value:2},
       
    ])
    const pattern = ref('') //题库搜索
    const handleSelect =(key,row)=>{
        switch (key) {
          case "detail":
            detail.value.show(row)
            break;
          case "del":
            showDelModal.value  = true
            delId.value = row.id
            break;
          default:
            break;
        }
      }
      const dropdownOptions = [
         {
          label: '详情',
          key: "detail"
        },
        {
          label: '删除',
          key: "del"
        },
      ]
  
    const getTableV = (data) => {
      tableRef.value.commitQuery();
    }
    const detailsRef = ref(null)
    const showDetails = (row) => {
      detailsRef.value.show(row)
    }
    const showDelModal = ref(false)
    const delMOdalOnPositiveClick = ()=>{
        handleDel(delId.value);
    }
    const delMOdalOnNegativeClick = ()=>{

    }
    const getDatabaseId = (e) =>{
    
       tableRef.value.commitQuery();
    }
    const isLoading = ref(false)
    const isTableLoading = ref(false)
    const tIsLoading = ref(false)
    const handDel = (selected) =>{
      let id = selected.id
      delStudyExamDatabaseDef(id).then(res=>{
       message.success("删除成功");
       getTestQuestions()
      })
    }
      //删除
    const removeEvent = (row) => {
     dTable.value.remove(row)
    }
    const exportPositiveClick =() =>{
      creatBatchAddQuestion(dTable.value.getTableData().tableData).then((res)=>{
        showToLeadShow.value = false
         info(databaseId.value)
        // drawerV.modalData=[]
        // getTableData(databaseMessage.databaseId)
      })
    }
    const renderPrefix = ({ option }) => {
      return h(
         <NwIcon name="icon-n-y-fenlei" style="margin-right:5px;" size={15} onClick={()=>{
               databaseId.value = option.id
              databaseName.value = option.databaseName 
                info(option.id)
            }} />
      
        
      )
    }
    const renderLabel = ({ option }) => {
      return h(
        <div style='width:100%' onClick={()=>{
          databaseId.value = option.id
          databaseName.value = option.databaseName 
          info(option.id)
        }}>{option.label}</div>
        
      )
    }
    const renderSuffix  = ({ option }) => {

      if((option.id == databaseId.value) && databaseId.value != '0'){
        return h(
          <div>
            <NwIcon name="icon-n-y-edit" style="cursor: pointer;margin-right:5px;" size={15} onClick={()=>{
              modelRef.value = {...option,}
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
    const getTestQuestions = () =>{
       tIsLoading.value = true
        studyExamDatabaseDefLists({}).then((res)=>{
          testQuestions.value = [{databaseName:'全部',id:'0'},...res].map(d=>{
            d.label = d.databaseName
              d.key = d.id 
              d.children = null
              return d
          })
           tIsLoading.value = false
        })
    }
    onMounted(() => {
     getTestQuestions()
    })

    return {
       uploadUrl: `${window.apiBaseURL}/main/fileinfo?fileSource=study`,
       exportUploadUrl: `${window.apiBaseURL}/study/studyExamQuestionDef/readExcel`,
       isTableLoading,
       token,
       exportHandleFinish,
      dTable,
      exportData,
      tokenType,
      renderPrefix,
      detail,
      testQuestions,
      getDatabaseId,
      exportPositiveClick,
      showToLeadShow,
      removeEvent,
      isLoading,
      preview,
      tIsLoading,
      pattern,
      model:modelRef,
      showPopover,
      renderSuffix,
      renderLabel,
      info,
      handDel,
      questionCodes,
      grades,
      databaseId,
      message,
      databaseName,
      handleDel,
      dictItemLists,
      action,
      vbind,
      visible,
      formRefQ,
      formRef,
      pageRef,
      tableRef,
      dataModel,
      columns,
      handleShow,
      handleSave,
      handleCancel,
      getTableV,
      detailsRef,
      handleSelect,
      dropdownOptions,
      showDelModal,
      delMOdalOnPositiveClick,
      delMOdalOnNegativeClick,
      delId,
      range,
      rules:{
        databaseName:  [
          {
            required: true,
            message: "请输入名称",
            trigger: ["input", "blur"],
          },
        ]
      },
      getTestQuestions,
      letters:reactive([
        {label:'A',value:0},{label:'B',value:1},{label:'C',value:2},{label:'D',value:3},{label:'E',value:4},{label:'F',value:5},{label:'G',value:6},{label:'H',value:7},
        {label:'I',value:8},{label:'J',value:9},{label:'K',value:10},{label:'L',value:11},{label:'M',value:12},{label:'N',value:13},{label:'O',value:14},{label:'P',value:15},
        {label:'Q',value:16},{label:'R',value:17},{label:'S',value:18},{label:'T',value:19},{label:'U',value:20},{label:'V',value:21},{label:'W',value:22},
        {label:'X',value:23},{label:'Y',value:24},{label:'Z',value:25},
      ]),
      onPositiveClick (){
        const fn =!modelRef.value.id?creatStudyExamDatabaseDef:editStudyExamDatabaseDef
         formRefQ.value.validate((errors) => {
          if (!errors) {
            isLoading.value = true
           
            fn(modelRef.value).then((res)=>{
              getTestQuestions()
               showPopover.value = false
               modelRef.value = {}
                // context.emit('update:callback');
                // showModalRef.value = false
              

            }).finally(r => {
             
              isLoading.value = false
            })
          }
        })
        
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
    };
  },
  methods: {
    clientTemplate() {
       this.isTableLoading = true
      exportTemplate().then(r => {
        this.isTableLoading = false
      })
      
    },
    handleFinish() {
      
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        this.message.success("上传成功");
       
        this.model = {
          ...this.model,
          icon: window.apiBaseURL + "/main" + data.fileUrl,
        };
      } else {
        this.message.error(msg);
      }
      this.isLoading = false;
    },
    beforeUpload() {
      this.isLoading = true;
    },
    // exportHandleFinish(){
    //    let { code, data, msg } = JSON.parse(event.target.response);
    //       if (code == 200) {
    //         this.message.success("上传成功");
    //         this.exportData = data.map((d)=>{
    //           d.databaseId = this.databaseId 
    //           d.databaseName = this.databaseName 
    //           return d
    //         })
    //         // this.gridOptions.data.push(data)
    //         this.$refs.dTable.loadData(this.exportData)
    //         // this.model = {
    //         //   ...this.model,
    //         //   icon: data.fileUrl,
    //         // };
    //       } else {
    //         this.message.error(msg);
    //       }
    // }
  }
});
</script>
<style lang='less' scoped>
 /deep/ .n-tree .n-tree-node-wrapper{
    padding:6px 0
  }
  /deep/ .n-drawer-header .n-drawer-header__main{
    padding-left:0px
  }
 
  .questionHeader{
    display: flex;
    width:100%;
    padding:8px 0 5px 0;
   .btn {
     width: 50px;
     margin:0 5px ;
   }
   .textInput{
     flex: 1;
   }
  }
</style>
