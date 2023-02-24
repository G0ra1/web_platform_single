<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="120"
    size="small"
    :style="{
     
      height: '100%',
      width: '100%',
      overflowY: 'scroll',
    }"
  >
  <n-card style='padding:10px 0' :bordered="false" title="基本信息" size="small" >
      <n-grid :cols="2" :x-gap="24">
        <n-grid-item>
          <n-form-item label="专题标签" path="label">
            <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.label" />

          </n-form-item>
      </n-grid-item>
      <n-grid-item>
       <n-form-item label="所属分类" path="typeName">
          <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.typeName" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="专题名称" path="specialName">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.specialName" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="培训类型" path="specialTimeType">
              <n-input size="small" disabled placeholder="请输入" :value="dataModel.specialTimeType==0 ? '专题培训':'长期培训'" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="开始时间" path="specialStartTime">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.specialStartTime" />
          </n-form-item>
      </n-grid-item>
 
      <n-grid-item v-if="dataModel.specialTimeType == 0">
          <n-form-item label="结束时间" path="specialEndTime">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.specialEndTime" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item
              path="fileUrl"
              label="封面图"
          > 
              <n-image :src="dataModel.fileUrl"  height="30" width="50"   />
          </n-form-item>
      </n-grid-item>
      <n-grid-item :span="24">
          <n-form-item label="描述" path="description">
              <n-input  size="small" disabled type="textarea" v-model:value="dataModel.description" />
          </n-form-item>
      </n-grid-item>
    </n-grid>
  </n-card>
  <n-card :bordered="false" title="培训信息" size="small" >
    <n-grid :cols="2" :x-gap="24">
      <n-grid-item>
          <n-form-item label="培训组织" path="studySpecialRangeOrgDeptList">
              <n-input size="small" disabled placeholder="请输入" :value="(dataModel.studySpecialRangeOrgDeptList ? dataModel.studySpecialRangeOrgDeptList : []).map(d=>d.rangeName).join(',')"  />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="培训人员" path="studySpecialRangeUserList">
              <n-input size="small" disabled placeholder="请输入" :value="(dataModel.studySpecialRangeUserList ? dataModel.studySpecialRangeUserList : []).map(d=>d.rangeName).join(',')"  />
          </n-form-item>
      </n-grid-item>
       <!-- <n-grid-item>
          <n-form-item label="必考组织" path="studySpecialMustExamOrgList">
              <n-input size="small" disabled placeholder="请输入" :value="(dataModel.studySpecialMustExamOrgList ? dataModel.studySpecialMustExamOrgList : []).map(d=>d.rangeName).join(',')"  />
          </n-form-item>
      </n-grid-item> -->
      <n-grid-item>
          <n-form-item label="必考人员" path="studySpecialMustExamUserList">
              <n-input size="small" disabled placeholder="请输入" :value="(dataModel.studySpecialMustExamUserList ? dataModel.studySpecialMustExamUserList : []).map(d=>d.specialMustExamUserName).join(',')"  />
          </n-form-item>
      </n-grid-item>
       <n-grid-item>
            <n-form-item label="专题教师" path="specialLecturer">
                <n-input  size="small" disabled placeholder="请输入"   v-model:value="dataModel.specialLecturer" />
            </n-form-item>
      </n-grid-item>
    </n-grid>
  </n-card>
   <n-card :bordered="false" title="考试信息" size="small" >
     <n-grid :cols="2" :x-gap="24">
       <n-grid-item>
          <n-form-item label="考试试卷" path="specialPaperName">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.specialPaperName" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="试卷总分" path="specialPaperTotalScore">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.specialPaperTotalScore" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="试卷时长" path="specialExamTime">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.specialExamTime" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="dataModel.specialPaperTotalScore">
          <n-form-item label="合格分数" path="specialExamQualifiedScore">
              <n-input  disabled  size="small" placeholder="请输入" v-model:value="dataModel.specialExamQualifiedScore" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="阅卷老师" path="specialExamPaperTeacherName">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.specialExamPaperTeacherName" />
          </n-form-item>
      </n-grid-item>
       <n-grid-item>
          <n-form-item label="试卷开始时间" path="specialPaperStartTime">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.specialPaperStartTime" />
          </n-form-item>
      </n-grid-item>
       <n-grid-item>
          <n-form-item label="试卷结束时间" path="specialPaperEndTime">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.specialPaperEndTime" />
          </n-form-item>
      </n-grid-item>
      </n-grid>
    </n-card>
      
      
        <n-card :bordered="false" title="课程信息" size="small">
        <vxe-table
            :column-config="{resizable: true}"
            size="mini"

            :data="dataModel.studySpecialLessonList ? dataModel.studySpecialLessonList :[]"
        > 
            <vxe-column field="sex" width="60"  type="expand">
            <template #content="{ row }">
                <n-card >
                    <vxe-table
                        :column-config="{resizable: true}"
                        size="mini"

                        :data="row.studySpecialLessonCouList ? row.studySpecialLessonCouList :[]"
                    >
                    <vxe-column field="couName" title="课件名称" ></vxe-column>
                    <vxe-column field="couUseRange" title="使用权限" >
                            <template v-slot="{ row }">
                                {{[
                                    {label:'私有',value:1},
                                    {label:'公开',value:0},
                                
                                ].filter(d=>d.value == row.couUseRange)[0].label}}
                            </template>
                    </vxe-column>
                    <vxe-column field="couCode" title="课件类型" >
                        <template v-slot="{ row }">
                            {{[
                                {label:'音频',value:1},
                                {label:'视频',value:2},
                                {label:'文档',value:3},
                            ].filter(d=>d.value == row.couCode)[0].label}}
                        </template>
                    </vxe-column>
                    <vxe-column field="couDuration" title="课件学时" ></vxe-column>
                    <vxe-column field="couIsCompulsory" title="是否必修" >
                        <template v-slot="{ row }">{{row.couIsCompulsory == 0 ? "选修" : "必修"}}</template>
                    </vxe-column>
                </vxe-table>
            </n-card>
        </template>
        </vxe-column>
        <vxe-column field="lessonName" title="课程名称" ></vxe-column>
        <vxe-column field="lessonType" title="课程分类" ></vxe-column>
        <vxe-column field="practisePaperName" title="练习题"  >
        
        </vxe-column>
        <vxe-column field="practisePaperIsRetest" title="是否重新学习" :edit-render="{}" >
            <template v-slot:edit="row">
                <vxe-select v-model="row.row.practisePaperIsRetest"  >
                    <vxe-option v-for="item in [{v:0,l:'否'},{v:1,l:'是'}]" :key="item.v" :value="item.v" :label="item.l"></vxe-option>
                </vxe-select>
            </template>
            <template v-slot="{ row }">{{row.couIsCompulsory == 0 ? "否" : "是"}}</template>
        </vxe-column>
      </vxe-table>
    </n-card>

    <n-card :bordered="false" title="学习资料" size="small">
    
        <vxe-table
            ref="sTable"
            border
            size='small'
            :data="dataModel.studySpecialMaterialsList ? dataModel.studySpecialMaterialsList : []"
            highlight-current-row
        >
            <vxe-column field="materialsName" title="学习资料名称" ></vxe-column>
            <vxe-column field="materialsTypeName" title="资料标签" ></vxe-column>
            <vxe-column field="isDownload" title="是否可以下载"  >
                <template v-slot="{ row }">
                    {{[
                        {label:'是',value:1},
                    {label:'否',value:0},
                    
                    ].filter(d=>d.value == row.isDownload)[0].label}}
                </template>
            </vxe-column>
            
        </vxe-table>
    </n-card>
    <n-card :bordered="false" title="结业设置" size="small">
        <vxe-table
            ref="jTable"
            border
            size='small'
            height="auto"
            :data="dataModel.studySpecialJieyeList ? dataModel.studySpecialJieyeList : []"
            highlight-current-row
        >
            <vxe-column field="examHighestScore" title="考试最高分"  :edit-render="{}">
                <template v-slot:edit="row">
                <vxe-input v-model="row.row.examHighestScore" placeholder="" size="small" type="number" :min='0'></vxe-input>
                </template>
                <template v-slot="{ row }">{{row.examHighestScore}}</template>
            </vxe-column>
            <vxe-column field="examLowestScore" title="考试最低分"  :edit-render="{}">
                <template v-slot:edit="row">
                    <vxe-input   v-model="row.row.examLowestScore" placeholder="" size="small" type="number" :min='0'></vxe-input>
                </template>
                <template v-slot="{ row }">{{row.examLowestScore}}</template>
            </vxe-column>
            <vxe-column field="examRank" title="考试等级" :edit-render="{}">
                <template v-slot:edit="row">
                    <vxe-input   v-model="row.row.examRank" placeholder="" size="small" ></vxe-input>
                </template>
                <template v-slot="{ row }">{{row.examRank}}</template>
            </vxe-column>
            <vxe-column field="certificateName" title="证书名称" >
                <template v-slot="{ row }">{{row.certificateName}}</template>
            </vxe-column>
            
        </vxe-table>
    </n-card>
  </n-form>
</template>
<script>
import { defineComponent, ref } from "vue";
import {
  NForm,
  NGrid,
  NFormItem,
  NFormItemGi,
  NSelect,
  NInput,
  NInputNumber,
  NTransfer,
  NRadio,
  NRadioGroup,
  NRadioButton,
  NSwitch,
  NDatePicker,
  NMessageProvider,
  NGridItem,
  NUpload,
  NImage,
  NButton,
  NCard,
} from "naive-ui";
import { dataModel } from "./store.js";

export default defineComponent({
  components: {
    NForm,
    NGrid,
    NFormItem,
    NFormItemGi,
    NSelect,
    NInput,
    NInputNumber,
    NTransfer,
    NRadio,
    NRadioGroup,
    NRadioButton,
    NSwitch,
    NDatePicker,
    NMessageProvider,
    NGridItem,
    NUpload,
    NImage,
    NButton,
    NCard,
  },
  setup() {
    const formRef = ref(null);
    return {
      dataModel,
      formRef,
      rules: {
      },
    };
  },
});
</script>
<style></style>
