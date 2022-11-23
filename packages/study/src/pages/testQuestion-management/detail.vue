<template>
  <n-drawer v-model:show="showModal" style="width: 960px" preset="dialog">
    <n-drawer-content title="试题详情">
       <n-form
            :model="dataModel"
            ref="formRef"
            label-placement="top"
            :label-width="80"
            size="small"
            style="padding:10px"
        >
        <n-grid :cols="12" :x-gap="24">
            <n-grid-item :span="24">
                <n-form-item label="题干" path="question">
                   
                    <n-input size="small"  
                      type="textarea"
                      disabled
                      v-model:value="dataModel.question" 
                    />
                </n-form-item>
            </n-grid-item>
            
            <n-grid-item span="24">
                <n-form-item label="解析" path="parse">
                    <n-input size="small" disabled placeholder="请输入"  type="textarea"   v-model:value="dataModel.parse" />
                </n-form-item>
            </n-grid-item>
            <n-grid-item span="24">
                <n-form-item label="难度" path="grade">
                    <n-select
                        size="small"
                        v-model:value="dataModel.grade"
                        disabled
                        placeholder="请选择难度类别"
                        :options="grades"
                    />
                </n-form-item>
            </n-grid-item>
            <n-grid-item span="24" v-if="dataModel.questionCode==4">
                <n-form-item label="答案" path="answer">
                    <n-input size="small" placeholder="请输入" disabled type="textarea"   v-model:value="dataModel.answers[0].answer" />
                </n-form-item>
            </n-grid-item>
            <n-grid-item span="24" v-if="dataModel.questionCode==3">
                <n-form-item label="答案" path="answer">
                
                    <n-radio-group v-model:value="dataModel.answers[0].isTrue" name="radiogroup" >
                        <n-space>
                            <n-radio v-for="song in options" :key="song.value" :value="song.value" disabled>
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
                            <n-input-group :style="{ width: '100%' }" :key="item.sort" >
                                <n-input-group-label style="margin-right:5px">第 {{num[item.sort.toString()]}} 空  </n-input-group-label>
                                <n-input disabled style="width: 50%;margin-left:'5px' " size="small" v-model:value="item.answer" />
                               
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
                      
                        
                    </vxe-form>
                </template>
            </vxe-toolbar>
            <vxe-table
                ref="xTable"
                border
                auto-resize
                height="400px"
                :data="dataModel.answers"
                row-key='sort'
                :checkbox-config="{showHeader:false}"
                :keep-source="true"
                :radio-config="{checkRowKey: defaultSelecteRow}"
            >
            <vxe-column type="seq" width="60"></vxe-column>
                <vxe-column  field="questionCode" title="选项"  >
                    
                    <template v-slot="{ row,_rowIndex }">
                        <vxe-input  class="my-domain" disabled placeholder="" v-model="row.answer" >
                            <template #prefix>
                                <span style="color:#1060c9;font-weight:bolder" >{{letters.filter(d=>d.value == _rowIndex)[0].label }}</span>
                            </template>
                        </vxe-input>
                    </template>

                </vxe-column>
                <vxe-column  field="isTrue" title="正确答案" type="radio" v-if="dataModel.questionCode==0">
                    <template #radio="{ row, checked, _rowIndex}">
                        <span class="custom-radio">
                            <span v-if="row.isTrue == 1">🌝</span>
                            <span v-else>🌚</span>
                        </span>
                    </template>
                </vxe-column>
                <vxe-column  field="isTrue" title="正确答案" type="checkbox" v-if="dataModel.questionCode==1">
                    <template #checkbox="{ row, checked, _rowIndex}">
                        <span class="custom-checkbox">
                            <span v-if="row.isTrue == 1">🌝</span>
                            <span v-if="row.isTrue == 0">🌚</span>
                        </span>
                    </template>
                </vxe-column>
              
            </vxe-table>
         </n-grid-item>
        </n-grid>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { NwIcon } from '@platform/main'

import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  h,
} from "vue";
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
  NSelect,
  NForm,
  NFormItem,
  NUpload,
  NImage,
  useMessage,
  NSpin,
  NRadio,
  NCard,
  NModal,
  NSpace,
  NRadioGroup,
  NDataTable,
  NPagination,
  NGrid,
  NGi,
  NGridItem,
  NFormItemGi,
  NRate,
} from "naive-ui";

export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NSelect,
    NForm,
    NFormItem,
    NUpload,
    NGridItem,
    NwIcon,
    NImage,
    NSpin,
    NRadio,
    NCard,
    NModal,
    NSpace,
    NRadioGroup,
    NDataTable,
    NPagination,
    NGrid,
    NFormItemGi,
    NRate,
    NGi,
  },
 
  setup(props, context) {
    const message = useMessage();
    const dataModel = ref({});
    const showModal = ref(false);
    const defaultSelecteRow = ref('')
    const show = (row) => {
      showModal.value = true;
      dataModel.value = row;
      if((row.questionCode==1 || row.questionCode==0)){
       defaultSelecteRow.value= (row.answers ? row.answers : []).map(d=>d.isTrue==1)[0].sort
      }
    };
 

    onMounted(async () => {});

    return {
      showModal,
      show,
      message,
      dataModel,
      defaultSelecteRow,
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
  created() {},
  methods: {},
});
</script>
<style lang="less" scoped>

* {
  margin: 0;
  padding: 0;
}
.n-drawer-header {
  background: #f1f1f6;
  .n-drawer-header__main {
    color: #010101;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
  }
}
</style>