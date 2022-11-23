<template>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    :title="`创建题目:${(model.questionCode || model.questionCode==0) ? questionCodes.filter(d=>d.value==model.questionCode)[0].label:''}`"
    content="你确认"
    positive-text="确认"
    
    negative-text="取消"
    style="width:800px;"
  >
  <n-spin :show="isLoading">
    <n-form  :model="model" ref="formRef" :rules="rules">
        <n-grid  >
            
            <n-grid-item :span="24">
                <n-form-item label="题干" path="question">
                    <template v-slot:label>
                        <div class="mine">
                            题干:
                            <button v-if="model.questionCode==2" @click="copy()">插入填空</button>
                        </div>
                    </template>
                    <n-input size="small"   type="textarea"
                       :placeholder="model.questionCode==2? '提示：填空用连续三个下划线_表示':''"
                       v-model:value="model.question" 
                    />
                </n-form-item>
            </n-grid-item>
            
             <n-grid-item span="24">
                <n-form-item label="解析" path="parse">
                    <n-input size="small" placeholder="请输入"  type="textarea"   v-model:value="model.parse" />
                </n-form-item>
            </n-grid-item>
             <n-grid-item span="24">
                <n-form-item label="难度" path="grade">
                    <n-select
                        size="small"
                        v-model:value="model.grade"
                        placeholder="请选择难度类别"
                        :options="grades"
                    />
                </n-form-item>
            </n-grid-item>
             <n-grid-item span="24" v-if="model.questionCode==4">
                <n-form-item label="答案" path="answer">
                    <n-input size="small" placeholder="请输入"  type="textarea"   v-model:value="model.answers[0].answer" />
                </n-form-item>
             </n-grid-item>
             <n-grid-item span="24" v-if="model.questionCode==3">
                <n-form-item label="答案" path="answer">
                    <!-- <n-select
                        size="small"
                        v-model:value="model.answers[0].isTrue"
                        placeholder="请选择答案"
                        :options="options"
                    /> -->
                    <n-radio-group v-model:value="model.answers[0].isTrue" name="radiogroup">
                        <n-space>
                            <n-radio v-for="song in options" :key="song.value" :value="song.value">
                                {{ song.label }}
                            </n-radio>
                        </n-space>
                    </n-radio-group>
                </n-form-item>
            </n-grid-item>
             <n-grid-item span="24" v-if="model.questionCode==2">
                <n-form-item label="答案" path="answers" >
                    <n-grid x-gap="8" :cols="1" :y-gap="8" >
                        <n-grid-item  v-for="item in model.answers">
                            <n-input-group :style="{ width: '100%' }" :key="item.sort">
                                <n-input-group-label style="margin-left:5px">第 {{num[item.sort.toString()]}} 空  </n-input-group-label>
                                <n-input :style="{ width: '50%' }" size="small" v-model:value="item.answer" />
                                <n-button type="primary" ghost  size="small" style="margin-left:5px" @click="model.answers.push({sort:model.answers.length})">添加</n-button>
                                <n-button type="error"   ghost  size="small" style="margin-left:5px" @click="removeAnswer(item.sort)">删除</n-button>
                            </n-input-group>
                        </n-grid-item>
                    </n-grid>
                </n-form-item>
            </n-grid-item>
            <n-grid-item span="24" style="height:440px" v-if="model.questionCode==0 || model.questionCode==1">
                 <vxe-toolbar style="height:40px">
                        <template v-slot:buttons>
                            <vxe-form>
                                <vxe-form-item >
                                    <template #default>
                                      选项表
                                    </template>
                                </vxe-form-item>
                                <vxe-form-item>
                                    <template #default>
                                        <n-button  type="info" size='small' @click="insertEvent">新增</n-button>
                                    </template>
                                </vxe-form-item>
                                
                            </vxe-form>
                        </template>
                    </vxe-toolbar>
                    <vxe-table
                        ref="xTable"
                        border
                        auto-resize
                        height="400px"
                        :data="model.answers"
                         row-key='sort'
                         :checkbox-config="{showHeader:false}"
                        :keep-source="true"
                        :radio-config="{checkRowKey: defaultSelecteRow}"
                    >
                    <vxe-column type="seq" width="60"></vxe-column>
                        <vxe-column  field="questionCode" title="选项"  :edit-render="{}">
                            <template v-slot:edit="{row,_rowIndex}">
                                <vxe-input  class="my-domain" placeholder="" v-model="row.answer">
                                    <template #prefix>
                                        <span style="color:#1060c9;font-weight:bolder" >{{letters.filter(d=>d.value == _rowIndex)[0].label }}</span>
                                    </template>
                                </vxe-input>
                            </template>
                            <template v-slot="{ row,_rowIndex }">
                                <vxe-input  class="my-domain" placeholder="" v-model="row.answer" >
                                    <template #prefix>
                                        <span style="color:#1060c9;font-weight:bolder" >{{letters.filter(d=>d.value == _rowIndex)[0].label }}</span>
                                    </template>
                                </vxe-input>
                            </template>

                        </vxe-column>
                        <vxe-column  field="isTrue" title="正确答案" type="radio" v-if="model.questionCode==0">
                            <template #radio="{ row, checked, _rowIndex}">
                                <span class="custom-radio" @click.stop="()=>{
                                      $refs.xTable.setRadioRow(row)
                                      row.isTrue = checked ? 0 : 1
                                       model.answers.map((d)=>{
                                           if(!checked && d.sort == _rowIndex){
                                               d.isTrue = 1
                                           } else {
                                                d.isTrue = 0
                                           }
                                           return d
                                       })
                                      
                                       
                                    }">
                                    <span v-if="row.isTrue == 1">🌝</span>
                                    <span v-else>🌚</span>
                                </span>
                            </template>
                        </vxe-column>
                        <vxe-column  field="isTrue" title="正确答案" type="checkbox" v-if="model.questionCode==1">
                            <template #checkbox="{ row, checked, _rowIndex}">
                                <span class="custom-checkbox" @click.stop="()=>{
                                      $refs.xTable.toggleCheckboxRow(row)
                                      model.answers[_rowIndex].isTrue = checked ? 0 : 1
                                    }">
                                    <span v-if="row.isTrue == 1">🌝</span>
                                    <span v-if="row.isTrue == 0">🌚</span>
                                </span>
                            </template>
                        </vxe-column>
                        <vxe-column  field="" title="操作" >
                            <template #default="{  row }">
                                <!-- <n-button
                                    text
                                    type="info"
                                    size="small"
                                    style="margin-right: 5px"
                                    @click="insertEvent"
                                    >新增</n-button
                                > -->
                                <n-button
                                    text
                                    type="error"
                                    size="small"
                                    style="margin-right: 5px"
                                    @click="removeEvent(row)"
                                    >删除</n-button
                                >
                                </template>
                        </vxe-column>

                    </vxe-table>
            </n-grid-item>
        </n-grid>
      </n-form>
  </n-spin>
   <template #action>
        <div style="padding: 0 5px 5px 0;">
          <n-button size="small" type="default"  style="margin-right: 5px" @click="showModal = false" >取消</n-button>
          <n-button size="small" type="info" @click="onPositiveClick" >保存</n-button>
            
          </div>
    </template>
  </n-modal>
</template>

<script lang='jsx'>
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
     NButton,
    NSpin,
    useMessage,
    NUpload,
    NImage,
    NRadioGroup,
    NSpace,
    NRadio
} from 'naive-ui'
import {  creatStudyExamQuestionDef, editStudyExamQuestionDef, dictItemLists} from './api'
import { cloneDeep } from 'lodash'

import { NwIcon, NwDic, Cookies } from '@platform/main'
import { VXETable,  } from 'vxe-table'

export default defineComponent({
    components: {
        NModal,
        NInput,
        NForm,
        NFormItem,
        NGrid,
        NGridItem,
        NTreeSelect,
        NSelect,
        NButton,
        NSpin,
        NwIcon,
        NUpload,
        NImage,
        NRadio,
        NRadioGroup,
        NSpace,
    },
    

  setup (props,context) {
    const showModalRef = ref(false)
    const modelRef = ref({})
    const isLoading = ref(false)
    const formRef = ref(null)
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    const message = useMessage();
    const xTable = ref()
    const defaultSelecteRow = ref('')
	const copy =  (val) => {
        modelRef.value.question = ( modelRef.value.question ?modelRef.value.question : '') + '________'
    }

    const sonFn = (e={}) => {
      showModalRef.value = true
      if(e.id){
         if((e.questionCode==1 || e.questionCode==0)) {
            modelRef.value={answers:[{sort:0,isTrue:0},{sort:1,isTrue:0},{sort:2,isTrue:0},{sort:3,isTrue:0},],...cloneDeep(e)}
            defaultSelecteRow.value= (e.answers ? e.answers : []).map(d=>d.isTrue==1)[0].sort

          } else if(e.questionCode==2){
                modelRef.value={answers:[{sort:0,isTrue:1},{sort:1,isTrue:1}],...cloneDeep(e),}

          } else if(e.questionCode==3){
                modelRef.value={answers:[{sort:0,isTrue:1},],...cloneDeep(e),}

          } else {
               modelRef.value={answers:[{sort:0,answer:'',isTrue:1},],...cloneDeep(e),}
          }
      } else {
          if((e.questionCode==1 || e.questionCode==0)) {
                modelRef.value={answers:[{sort:0,isTrue:0},{sort:1,isTrue:0},{sort:2,isTrue:0},{sort:3,isTrue:0},],...cloneDeep(e)}

          } else if(e.questionCode==2){
                modelRef.value={answers:[{sort:0,isTrue:1},{sort:1,isTrue:1}],...cloneDeep(e)}

          } else if(e.questionCode==3){
                modelRef.value={answers:[{sort:0,isTrue:1},],...cloneDeep(e),}

          } else {
               modelRef.value={answers:[{sort:0,answer:'',isTrue:1},],...cloneDeep(e),}
          }
      }
     
    };
    const checkRadioMethod = ()=>{
        return modelRef.value.answers
    }
   // 新增
    const insertEvent = async (row) => {
      const $table = xTable.value
      const num =  modelRef.value.answers.length
      const record = {sort:num+1,isTrue:0}

      modelRef.value.answers[num]={...record}
      const { row: newRow } = await $table.insertAt(record,-1)
    }
     // dan选多选删除
    const removeEvent = (row) => {
        const $table = xTable.value
        if($table.getTableData().tableData.length>2){
                       $table.remove(row)

        } else {
            message.error('选项最低要有两条，不能再删了')
        }
    }
    // 填空题，答案
    const setAnswerV = (value,item) =>{
      modelRef.value.answers[item.sort].answer = value
    }
      // 填空题删除
    const removeAnswer = (index) => {
       
        if(modelRef.value.answers.length>1){
            modelRef.value.answers.splice(index,1)
            modelRef.value.answers.forEach((d,i)=>{
                d.sort = i
                return d

            }) 

        } else {
            message.error('答案最低要有一条，不能再删了')
        }
    }
    onMounted(async () => {
       
    })
    return {
      sonFn,
      xTable,
      copy,
      props,
      removeAnswer,
      
      editorConfig: {},
      insertEvent,
      defaultSelecteRow,
      setAnswerV,
      removeEvent,
      dictItemLists,
      showModal: showModalRef,
      message:'_',
      uploadUrl: `${window.apiBaseURL}/file/fileinfo?fileSource=study`,
      token,
      letters:reactive([
        {label:'A',value:0},{label:'B',value:1},{label:'C',value:2},{label:'D',value:3},{label:'E',value:4},{label:'F',value:5},{label:'G',value:6},{label:'H',value:7},
        {label:'I',value:8},{label:'J',value:9},{label:'K',value:10},{label:'L',value:11},{label:'M',value:12},{label:'N',value:13},{label:'O',value:14},{label:'P',value:15},
        {label:'Q',value:16},{label:'R',value:17},{label:'S',value:18},{label:'T',value:19},{label:'U',value:20},{label:'V',value:21},{label:'W',value:22},
        {label:'X',value:23},{label:'Y',value:24},{label:'Z',value:25},

      ]),
      num:reactive([
        "一","二","三","四","五","六","七","八","九","十"
      ]),
      questionCodes:reactive([
        {label:'单选题',value:0},
        {label:'多选题',value:1},
        {label:'填空题',value:2},
        {label:'判断题',value:3},
        {label:'简答题',value:4},
      ]),
      grades:reactive([
        {label:'易',value:0},
        {label:'中',value:1},
        {label:'难',value:2},
       
      ]),
      options:reactive([
        {label:'错误',value:0},
        {label:'正确',value:1},
      ]),
      tokenType,
      model:modelRef, // 表单数据
      isLoading,
      message,
      formRef,
      rules: {
        question: [
            {
                required: true,
                message: '请输入题干',
                trigger: ['input', 'blur']
            }
        ],
        parse: [
            {
                required: true,
                message: '请输入解析',
                trigger: ['input', 'blur']
            }
        ],
        grade: [
            {
                required: true,
                type:'number',
                message: '请选择题目难度',
                trigger: ['input', 'blur']
            }
        ],
      },
    
      onPositiveClick (){
        const fn =!modelRef.value.id?creatStudyExamQuestionDef:editStudyExamQuestionDef
         formRef.value.validate((errors) => {
          if (!errors) {
              if(modelRef.value.isImpot){
                context.emit('update:callback',modelRef.value);
                showModalRef.value = false
              } else {
                isLoading.value = true
                fn(modelRef.value).then((res)=>{
                
                    context.emit('update:callback');
                    showModalRef.value = false
                

                }).finally(r => {
                
                isLoading.value = false
                })
              }
           
          }
        })
        
      },
      onNegativeClick () {
        
        showModalRef.value = false
      },
     
    }
  },
 created() {
    

   
  },
  methods: {

  }
})
</script>