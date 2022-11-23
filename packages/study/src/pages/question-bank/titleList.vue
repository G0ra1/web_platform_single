<template>
    <n-drawer
      v-model:show="showModal"
      width="100%"
      :height="200"
      placement="right"
      :to="$refs.page && $refs.page.$el"
    >
    <n-drawer-content
      :title="`题目列表维护`"
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
          <vxe-toolbar>
              <template #buttons>
                <vxe-button content="单个录入" >
                  <template #dropdowns>
                    <vxe-button type="text" content="单选题" @click="chooseTopic.sonFn({...databaseMessage,questionCode:0})"></vxe-button>
                    <vxe-button type="text" content="多选题" @click="chooseTopic.sonFn({...databaseMessage,questionCode:1})"></vxe-button>
                    <vxe-button type="text" content="填空题" @click="chooseTopic.sonFn({...databaseMessage,questionCode:2})"></vxe-button>
                    <vxe-button type="text" content="判断题" @click="chooseTopic.sonFn({...databaseMessage,questionCode:3})"></vxe-button>
                    <vxe-button type="text" content="简答题" @click="chooseTopic.sonFn({...databaseMessage,questionCode:4})"></vxe-button>

                  </template>
                </vxe-button>
                 <!--  -->
                <vxe-button @click="showToLeadShow = true">文档导入</vxe-button>
              </template>
              <template #tools>
                <vxe-form :data="formData" @submit="getTableData(databaseMessage.databaseId)" @reset="resetEvent" size="mini">
                  <vxe-form-item title="题干" field="question" :item-render="{}">
                    <template #default="{ data }">
                      <vxe-input v-model="data.question" placeholder="请输入题干" clearable></vxe-input>
                    </template>
                  </vxe-form-item>
                  <vxe-form-item title="类型" field="questionCode" :item-render="{}">
                    <template #default="{ data }">
                      <vxe-select v-model="data.questionCode" placeholder="请选择难度" clearable>
                        <vxe-option :value="0" label="单选题"></vxe-option>
                        <vxe-option :value="1" label="多选题"></vxe-option>
                        <vxe-option :value="2" label="填空题"></vxe-option>
                        <vxe-option :value="3" label="判断题"></vxe-option>
                        <vxe-option :value="4" label="简答题"></vxe-option>
                      </vxe-select>                    
                    </template>
                  </vxe-form-item>
                  <vxe-form-item title="难度" field="grade" :item-render="{}">
                    <template #default="{ data }">
                      <vxe-select v-model="data.grade" placeholder="请选择难度" clearable>
                        <vxe-option :value="0" label="易"></vxe-option>
                        <vxe-option :value="1" label="中"></vxe-option>
                        <vxe-option :value="2" label="难"></vxe-option>
                      </vxe-select>
                    </template>
                  </vxe-form-item>
                  <vxe-form-item>
                    <template #default>
                      <vxe-button type="submit" status="primary">查询</vxe-button>
                    </template>
                  </vxe-form-item>
                </vxe-form>
            </template>
        </vxe-toolbar>
        <div class="vxeT">
          <vxe-table
            ref="xTable"
            border
            auto-resize
            :loading="loading"
            :keyboard-config="{isArrow: true}"
            highlight-current-row
            :data="drawerV.tableData"
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
                <template #default="{  row }">
                  <n-button
                        text
                        type="info"
                        size="small"
                        style="margin-right: 5px"
                        @click="()=>chooseTopic.sonFn({...row})"
                        >编辑</n-button
                    >
                    <n-button
                        text
                        type="error"
                        size="small"
                        style="margin-right: 5px"
                        @click="handDel([row])"
                        >删除</n-button
                    >
                    </template>
            </vxe-column>
          </vxe-table>
        </div>
        <vxe-pager
          :loading="loading"
          :current-page="page.current"
          :page-size="page.size"
          :total="page.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange">
        </vxe-pager>
      </n-card>
    
      <template #footer>
          <n-button
            size="small"
            @click="showModal = false"
          >关闭</n-button>
      </template>
    </n-drawer-content>
    <ChooseTopic ref="chooseTopic"
      @update:callback="(e) => {
        if(e){
          drawerV.modalData[e.index] ={...e}
          $refs.dTable.loadData(drawerV.modalData)
        } else {
          getTableData(databaseMessage.databaseId)
        }
      }"
    ></ChooseTopic>
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
    >
      <n-card style="height:600px">
        <vxe-toolbar style="height:40px">
          <template #buttons>
            <n-upload
                :action="uploadUrl"
                :show-file-list="false"
                :headers="{
                    Authorization: `${tokenType} ${token}`,
                }"
                @finish="handleFinish"
                
                @before-upload="beforeUpload"
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
          :data="drawerV.modalData"
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
                      @click="()=>chooseTopic.sonFn({...row,index:_rowIndex,isImpot:true})"
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
          <n-button size="small" type="default"  style="margin-right: 5px" @click="onCancel" >取消</n-button>
          <n-button size="small" type="info" @click="onPositiveClick" >保存</n-button>
        </div>
      </template>
    </n-modal>
</template>
<script>
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
    useMessage,
    NUpload,
    NModal
  } from 'naive-ui'
  import { default as NwTable, NwTableFun } from '../../components/nw-table/index.vue'
  import { VXETable,  } from 'vxe-table'
  import { NwIcon, NwDic, Cookies } from '@platform/main';

  import {  studyExamQuestionDeffList, delExamQuestion, creatBatchAddQuestion } from './api'
  import ChooseTopic from './chooseTopic.vue'
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
      ChooseTopic,
      NUpload,
      NModal
    },
    props: {
      
    },
    setup (props,context) {
      const formVisible = ref(false)
      const chooseTopic = ref()
      const token = Cookies.get("token");
      const tokenType = Cookies.get("tokenType");
      const drawerV  = reactive({
        tableData:[],
        modalData:[]
      })
      const databaseMessage = reactive({
        databaseId:'',
        databaseName:''
      })
      const xTable = ref()
      const dTable = ref()
      const loading = ref(false)
      const showToLeadShow = ref(false)
      const message = useMessage()
      const formData = ref({})
      const page = reactive({
        current:1,
        size:20,
        totalResult: 0
      })
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
      const handlePageChange = ({ currentPage, pageSize })=> {
        console.log(currentPage, pageSize,'current, size')
          page.current = currentPage
          page.size = pageSize
          getTableData(databaseMessage.databaseId)
      }
      const getTableData = (id)=>{
        loading.value = true
        studyExamQuestionDeffList({
          page:{current: page.current, size: page.size},
          databaseId:id,
          ...formData.value
        }).then((res)=>{
          loading.value = false
          drawerV.tableData = res.records

          page.totalResult = res.total
        })
      }
      const sonFn = (e) => {
        databaseMessage.databaseId = e.id
        databaseMessage.databaseName = e.databaseName

        formVisible.value = true
        getTableData(e.id)
      };
      const onPositiveClick =() =>{
        creatBatchAddQuestion(dTable.value.getTableData().tableData).then((res)=>{
          showToLeadShow.value = false
          drawerV.modalData=[]
          getTableData(databaseMessage.databaseId)
        })
      }
      const onCancel = () =>{
        showToLeadShow.value = false
        drawerV.modalData=[]
      }
       //删除
      const removeEvent = (row) => {
        const $table = dTable.value
        $table.remove(row)
      }
      onMounted(async () => {
      })
      return {
        showToLeadShow,
        formData,
        onCancel,
        onPositiveClick,
        uploadUrl: `${window.apiBaseURL}/study/studyExamQuestionDef/readExcel`,
        token,
        tokenType,
        handlePageChange,
        loading,
        questionCodes,
        getTableData,
        grades,
        chooseTopic,
        xTable,
        page,
        databaseMessage,//题库数据
        sonFn,
        removeEvent,
        dTable,
        showModal: formVisible,
        drawerV,
        message,
        letters:reactive([
          {label:'A',value:0},{label:'B',value:1},{label:'C',value:2},{label:'D',value:3},{label:'E',value:4},{label:'F',value:5},{label:'G',value:6},{label:'H',value:7},
          {label:'I',value:8},{label:'J',value:9},{label:'K',value:10},{label:'L',value:11},{label:'M',value:12},{label:'N',value:13},{label:'O',value:14},{label:'P',value:15},
          {label:'Q',value:16},{label:'R',value:17},{label:'S',value:18},{label:'T',value:19},{label:'U',value:20},{label:'V',value:21},{label:'W',value:22},
          {label:'X',value:23},{label:'Y',value:24},{label:'Z',value:25},
        ]),
      }
    },
    methods: {
      handDel(selected){
        let id = selected.map(d=>d.id).join(',')
        delExamQuestion(id).then(res=>{
          this.message.success("删除成功")
          this.getTableData(this.databaseMessage.databaseId)
        })
      },
      handleFinish() {
        let { code, data, msg } = JSON.parse(event.target.response);
          if (code == 200) {
            this.message.success("上传成功");
            this.drawerV.modalData = data.map((d)=>{
              d.databaseId = this.databaseMessage.databaseId 
              d.databaseName = this.databaseMessage.databaseName 
              return d
            })
            // this.gridOptions.data.push(data)
            this.$refs.dTable.loadData(this.drawerV.modalData)
            // this.model = {
            //   ...this.model,
            //   icon: data.fileUrl,
            // };
          } else {
            this.message.error(msg);
          }
          this.isLoading = false;
      },
      beforeUpload() {
        this.isLoading = true;
      },
    }
  })
</script>

<style lang='less'>
  
  .n-drawer-container{
      z-index:1001 !important;
  }
  .vxeT {
     height:calc(100% - 80px)
  }
</style>