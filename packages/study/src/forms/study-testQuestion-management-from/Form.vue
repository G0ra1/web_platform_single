<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="top"
    :label-width="80"
    size="small"
    style="padding:10px"
  >
    <n-grid :cols="12" :x-gap="24">
    
      <n-grid-item :span="24">
        <n-form-item label="题干" path="question">
            <template v-slot:label>
                <div class="mine">
                    题干:
                    <button v-if="dataModel.questionCode==2" @click="copy()">插入填空</button>
                </div>
            </template>
            <n-input size="small"   type="textarea"
                :placeholder="dataModel.questionCode==2? '提示：填空用()表示':''"
                v-model:value="dataModel.question" 
                @blur="()=>{
                  if(dataModel.questionCode==2)  getModalSize()
                }"
            />
        </n-form-item>
    </n-grid-item>
    
      <n-grid-item span="24">
        <n-form-item label="解析" path="parse">
            <n-input size="small" placeholder="请输入"  type="textarea"   v-model:value="dataModel.parse" />
        </n-form-item>
    </n-grid-item>
      <n-grid-item span="24">
        <n-form-item label="难度" path="grade">
            <n-select
                size="small"
                v-model:value="dataModel.grade"
                placeholder="请选择难度类别"
                :options="grades"
            />
        </n-form-item>
    </n-grid-item>
      <n-grid-item span="24" v-if="dataModel.questionCode==4">
        <n-form-item label="答案" path="answer">
            <n-input size="small" placeholder="请输入"  type="textarea"   v-model:value="dataModel.answers[0].answer" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item span="24" v-if="dataModel.questionCode==3">
        <n-form-item label="答案" path="answer">
           
            <n-radio-group v-model:value="dataModel.answers[0].isTrue" name="radiogroup">
                <n-space>
                    <n-radio v-for="song in options" :key="song.value" :value="song.value">
                        {{ song.label }}
                    </n-radio>
                </n-space>
            </n-radio-group>
        </n-form-item>
    </n-grid-item>
      <n-grid-item span="24" v-if="dataModel.questionCode==2">
        <n-form-item label="答案" path="answers" >
            <n-grid x-gap="8" :cols="1" :y-gap="8" >
                <n-grid-item  v-for="item in dataModel.answers">
                    <n-input-group :style="{ width: '100%' }" :key="item.sort">
                        <n-input-group-label style="margin-left:5px">第 {{num[item.sort.toString()]}} 空  </n-input-group-label>
                        <n-input :style="{ width: '50%' }" size="small" v-model:value="item.answer" />
                        <!-- <n-button type="primary" ghost  size="small" style="margin-left:5px" @click="dataModel.answers.push({sort:dataModel.answers.length})">添加</n-button>
                        <n-button type="error"   ghost  size="small" style="margin-left:5px" @click="removeAnswer(item.sort)">删除</n-button> -->
                    </n-input-group>
                </n-grid-item>
            </n-grid>
        </n-form-item>
    </n-grid-item>
<n-grid-item span="24" style="height:440px;" v-if="dataModel.questionCode==0 || dataModel.questionCode==1">
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
          :row-config="{keyField: 'sort'}"
          :data="dataModel.answers"
          :checkbox-config="{showHeader:false}"
          :keep-source="true"
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
          <vxe-column  field="isTrue" title="正确答案" type="radio" v-if="dataModel.questionCode==0">
              <template #radio="{ row, checked, _rowIndex}">
                  <span class="custom-radio" @click.stop="()=>{
                        $refs.xTable.setRadioRow(row)
                        row.isTrue = checked ? 0 : 1
                          dataModel.answers.map((d)=>{
                              if(!checked && d.sort == _rowIndex){
                                  d.isTrue = 1
                              } else {
                                  d.isTrue = 0
                              }
                              return d
                          })
                                             
                    }">
                      <span v-if="row.isTrue == 1 || checked">🌝</span>
                      <span v-else>🌚</span>
                  </span>
              </template>
          </vxe-column>
          <vxe-column  field="isTrue" title="正确答案" type="checkbox" v-if="dataModel.questionCode==1">
              <template #checkbox="{ row, checked, _rowIndex}">
                  <span class="custom-checkbox" @click.stop="()=>{
                        $refs.xTable.toggleCheckboxRow(row)
                        dataModel.answers[_rowIndex].isTrue = checked ? 0 : 1
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
</template>
<script>
import { defineComponent, ref, onMounted, watch, reactive } from "vue";
import {
  useMessage,
  NForm,
  NGrid,
   NGridItem,
  NFormItem,
  NFormItemGi,
  NSelect,
  NInputGroup,
  NInput,
  NInputNumber,
  NTransfer,
  NRadio,
  NRadioGroup,
  NInputGroupLabel,
  NRadioButton,
  NSwitch,
  NDatePicker,
  NMessageProvider,
  NRate,
  NSpace,
   NButton,
   NPopover
} from "naive-ui";
import { dataModel,defaultSelecteRow } from "./store.js";
export default defineComponent({
  components: {
    NSpace,
    NGridItem,
    NForm,
    NGrid,
    NFormItem,
    NFormItemGi,
    NSelect,
    NInputGroup,
    NInput,
    NInputNumber,
    NTransfer,
    NRadio,
    NRadioGroup,
    NInputGroupLabel,
    NRadioButton,
    NSwitch,
    NDatePicker,
    NMessageProvider,
    NRate,
    NButton,
    NPopover
  },
  setup() {
    const formRef = ref(null);
    const xTable = ref()
	  const copy =  (val) => {
        dataModel.value.question = ( dataModel.value.question ?dataModel.value.question : '') + '()'
        getModalSize()
    }
    const checkRadioMethod = ()=>{
        return dataModel.value.answers
    }
    const message = useMessage()
   // 新增
    const insertEvent = async (row) => {
     const $table = xTable.value
      const num =  dataModel.value.answers.length
      const record = {sort:num,isTrue:0}
      
    //   dataModel.value.answers[num]={...record}
    //   const { row: newRow } = await $table.insertAt(record,-1)

      dataModel.value.answers.push(record)
      $table.loadData(dataModel.value.answers)

    }
     // dan选多选删除
    const removeEvent = (row) => {
        const $table = xTable.value
        if($table.getTableData().tableData.length>2){
            $table.remove(row)
           $table.getTableData().tableData.map((d,index)=>{
                d.sort = index
                return d
            })
           dataModel.value.answers = $table.getTableData().tableData
           console.log(dataModel.value.answers,'dataModel.value.answers')
        } else {
            message.error('选项最低要有两条，不能再删了')
        }
    }
    const getModalSize = () =>{
        function truncate(arr,num) {
            var arr1=arr.slice(0,arr.length-num);
            return arr1;
                
        }
        if(dataModel.value.question) {
            const leftL = dataModel.value.question.split('(').length-1
            const rightL = dataModel.value.question.split(')').length-1
            if((leftL == rightL != 0) &&( dataModel.value.answers.length<rightL)){
                for(var h = 0;h<rightL;h++){
                    if(!dataModel.value.answers[h]) {
                      dataModel.value.answers.push({sort:h,isTrue:1})
                    } 
                
                }
            }else if(leftL > rightL){
             message.error('请仔细检查，题干中缺少 )')
            } else if(leftL < rightL){
             message.error('请仔细检查，题干中缺少 (')
            } else if ((leftL == rightL ) && (dataModel.value.answers.length>rightL)) {
               dataModel.value.answers = (rightL==0 ? [] : truncate( dataModel.value.answers,dataModel.value.answers.length - rightL)  )
            }
        } 
    }
      // 填空题删除
    const removeAnswer = (index) => {
       
        if(dataModel.value.answers.length>1){
            dataModel.value.answers.splice(index,1)
            dataModel.value.answers.forEach((d,i)=>{
                d.sort = i
                return d

            }) 

        } else {
            message.error('答案最低要有一条，不能再删了')
        }
    }
   
    onMounted(() => {
    });
    return {
      dataModel,
      xTable,
      getModalSize,
      removeAnswer,
      message,
      removeEvent,
      insertEvent,
      copy,
      checkRadioMethod,
      defaultSelecteRow,
      formRef,
      rules: {},
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
    };
  },
});
</script>
<style>

</style>
