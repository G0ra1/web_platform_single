<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="100"
    size="small"
    class="LForm"
    
  >
    
    <n-card :bordered="false" title="基本信息" size="small" >
      <n-grid :cols="2" :x-gap="24">
        <n-grid-item>
          <n-form-item label="专题标签" path="label">
              <nw-dic
                :request="{XHR:dictItemLists, params: 'STUDY_PLAN_TYPE',}"
                v-model:value="dataModel.labelCode"
                v-model:label="dataModel.label"
                placeholder
                multiple
                size="small"
                :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
              />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
       <n-form-item label="所属分类" path="typeName">
          <!-- nw-dic
              :request="{XHR:dictItemLists, params: 'plan',}"
              v-model:value="dataModel.typeCode"
              v-model:label="dataModel.typeName"
              size="small"
              :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
            /> -->
             <n-tree-select
                :options="types"
                size="small"
                placeholder="请选择"
                v-model:value="dataModel.typeCode"
                filterable
                clearable
                @update:value="(v)=>{
                  dataModel.typeName = filterTableMater(v,types).label
                }"
              />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="专题名称" path="specialName">
              <n-input size="small" placeholder="请输入" v-model:value="dataModel.specialName" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="培训类型" path="specialTimeType">
             <n-select
                v-model:value="dataModel.specialTimeType"
                size="small"
                placeholder=""
                :options="[{
                  label: '专题培训',
                  value: 0,
                },
                {
                  label: '长期培训',
                  value: 1,
                }]"
              />   
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="开始时间" path="specialStartTime">
            <n-date-picker  
              type="datetime"
              format='yyyy-MM-dd HH:mm'
              placeholder=""
              :value="getTime(dataModel.specialStartTime)"
              @update:value="(p)=>{
                  dataModel.specialStartTime = formatDate(p)
              }"
              size="small"
              style="width: 100%"
              clearable
          
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item v-if="dataModel.specialTimeType == 0">
          <n-form-item label="结束时间" path="specialEndTime">
            <n-date-picker 
                type="datetime"
                format='yyyy-MM-dd HH:mm'
                placeholder=""
                :value="getTime(dataModel.specialEndTime)"
                @update:value="(p)=>{
                    dataModel.specialEndTime = formatDate(p)
                }"
                size="small"
                  style="width: 100%"
                  clearable
            
            />                
          </n-form-item>
      </n-grid-item>
       <n-grid-item>
          <n-form-item
              path="fileUrl"
              label="封面上传"
          >
                <n-upload
                    :action="uploadUrl"
                     accept="image/png, image/jpeg, image/bmp"
                    :show-file-list="false"
                    v-if="!dataModel.fileUrl"
                    :headers="{
                        Authorization: `${tokenType} ${token}`,
                    }"
                    :data ="{
                        fileSource:'study',
                        poolName:'localStudy'
                    }"
                    @finish="handleFinish"
                    @before-upload="beforeUpload"
                  >
                    <n-upload-dragger >
                        建议上传360*200的jpg、png图片
                    </n-upload-dragger>
                </n-upload>
               <div v-if="dataModel.fileUrl">
                  <n-image :src="dataModel.fileUrl"  height="50" width="50" style="padding-left:15px"  />
                  <nw-icon @click="()=>{dataModel.fileUrl = '',dataModel.fileId =''}" name="icon-del" style="cursor: pointer;position: absolute;left: 70px;top: 35px;color: red;" size={15} />
                </div>
          </n-form-item>
      </n-grid-item>
      <n-grid-item :span="24">
          <n-form-item label="描述" path="description">
              <n-input  size="small" placeholder="请输入"  type="textarea" v-model:value="dataModel.description" />
          </n-form-item>
      </n-grid-item>
      </n-grid>
    </n-card>
    <n-card :bordered="false" title="培训信息" size="small" >
      <n-grid :cols="2" :x-gap="24">
       <n-grid-item > 
          <n-form-item path="orgPermList" label="培训组织" >
                <n-input size="small" placeholder="" disabled  :value="(dataModel.studySpecialRangeOrgDeptList ? dataModel.studySpecialRangeOrgDeptList : []).map(d=>d.rangeName).join(',')" >
                  <template #suffix>
                      <n-button type="info" size="small"   @Click="(e)=>{chooseDept.sonFn((dataModel.studySpecialRangeOrgDeptList ? dataModel.studySpecialRangeOrgDeptList : []).map((d)=>{d.orgId = d.rangeId
                        return d
                      }))}">选择</n-button>
                  </template>
                </n-input>
          </n-form-item>
      </n-grid-item>
      <n-grid-item >
          <n-form-item path="studySpecialRangeUserList" label="培训人员" >
                <n-input size="small" placeholder="" disabled   :value="(dataModel.studySpecialRangeUserList?dataModel.studySpecialRangeUserList:[]).map(d=>d.rangeName).join(',')"  >
                  <template #suffix>
                      <n-button size="small"  type="info"   @Click="(e)=>{employeePickModal.sonFn()}">选择</n-button>
                  </template>
                </n-input>
          </n-form-item>
      </n-grid-item>
      <!-- <n-grid-item >
          <n-form-item path="studySpecialMustExamOrgList" label="必考组织" >
                <n-input size="small" placeholder="" disabled  :value="(dataModel.studySpecialMustExamOrgList ? dataModel.studySpecialMustExamOrgList : []).map(d=>d.rangeName).join(',')" >
                  <template #suffix>
                      <n-button type="info" size="small"   @Click="(e)=>{chooseDeptMust.sonFn((dataModel.studySpecialMustExamOrgList ? dataModel.studySpecialMustExamOrgList : []).map((d)=>{d.orgId = d.rangeId
                        return d
                      }))}">选择</n-button>
                  </template>
                </n-input>
          </n-form-item>
      </n-grid-item> -->
      <n-grid-item >
          <n-form-item path="studySpecialMustExamUserList" label="必考人员" >
                <n-input size="small" placeholder="" disabled   :value="(dataModel.studySpecialMustExamUserList?dataModel.studySpecialMustExamUserList:[]).map(d=>d.specialMustExamUserName  ).join(',')"  >
                  <template #suffix>
                      <n-button size="small"  type="info"   @Click="(e)=>{mustExamUserPickModal.sonFn()}">选择</n-button>
                  </template>
                </n-input>
          </n-form-item>
      </n-grid-item>
    
      <n-grid-item>
            <n-form-item label="专题教师" path="specialLecturer">
                <n-input  size="small" placeholder="请输入"   v-model:value="dataModel.specialLecturer" />
            </n-form-item>
      </n-grid-item>
    </n-grid>
  </n-card>
  <n-card :bordered="false" title="考试信息" size="small" >
      <n-grid :cols="2" :x-gap="24">
      <n-grid-item>
          <n-form-item label="考试试卷" path="specialPaperName">
              <n-input size="small" placeholder="请输入"
                disabled 
                v-model:value="dataModel.specialPaperName" 
              >
                 <template #suffix>
                    <NwIcon name="icon-n-y-sousuo"
                        style="color:#3F8FFF;cursor: pointer;"
                        @click="chooseSpecialPaper.sonFn({
                          specialPaperId:dataModel.specialPaperId,
                          specialPaperName:dataModel.specialPaperName,
                          specialPaperTotalScore:dataModel.specialPaperTotalScore,
                          isHaveShortAnswer:dataModel.isHaveShortAnswer,
                          specialExamTime:dataModel.specialExamTime,
                          specialExamQualifiedScore:dataModel.specialExamQualifiedScore
                        })"
                        />
                    </template>
              </n-input>
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="试卷总分" path="specialPaperTotalScore">
              <n-input disabled size="small" placeholder="请输入" v-model:value="dataModel.specialPaperTotalScore" />
          </n-form-item>
      </n-grid-item>
  
       <n-grid-item>
          <n-form-item label="试卷时长" path="specialExamTime">
              <n-input  size="small" disabled placeholder="请输入" v-model:value="dataModel.specialExamTime" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item >
          <n-form-item label="合格分数" path="specialExamQualifiedScore">
              <n-input disabled size="small" placeholder="请输入" v-model:value="dataModel.specialExamQualifiedScore" />
          </n-form-item>
      </n-grid-item>

      <n-grid-item >
          <n-form-item label="阅卷老师" path="specialExamPaperTeacherId" >
              <EmpChoose 
                  :isShowSearch="true"
                  :userType="1"
                  :multiple="false"
                  :userName="dataModel.specialExamPaperTeacherName"
                  :userIds="dataModel.specialExamPaperTeacherId"
                  @update:callback="(e) => {
                    if(e){
                        dataModel.specialExamPaperTeacherId=e.id
                        dataModel.specialExamPaperTeacherName=e.userNameCh
                    }
                  }"
              ></EmpChoose>
          </n-form-item>
      </n-grid-item>
       <n-grid-item>
          <n-form-item label="考试次数" path="specialExamNum">
              <n-input  size="small" placeholder="请输入"  type="number" :min='0' v-model:value="dataModel.specialExamNum" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="试卷开始时间" path="specialPaperStartTime">
            <n-date-picker  
              type="datetime"
              format='yyyy-MM-dd HH:mm'
              placeholder=""
              clearable
              :value="getTime(dataModel.specialPaperStartTime)"
              @update:value="(p)=>{
                  dataModel.specialPaperStartTime = formatDate(p)
              }"
              size="small"
              style="width: 100%"
              
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item >
          <n-form-item label="试卷结束时间" path="specialPaperEndTime">
            <n-date-picker 
                type="datetime"
                format='yyyy-MM-dd HH:mm'
                placeholder=""
                clearable
                :value="getTime(dataModel.specialPaperEndTime)"
                @update:value="(p)=>{
                    dataModel.specialPaperEndTime = formatDate(p)
                }"
                size="small"
                  style="width: 100%"
                  
            />                
          </n-form-item>
      </n-grid-item>
      </n-grid>
    </n-card>
      
     
    <n-card :bordered="false" title="课程信息" size="small" style="min-height:320px">
      <template #header-extra>
          <n-button size="small" type="info" @click="chooseCourseMaintenance.sonFn($refs.xTable.getTableData().tableData)">
            添加
          </n-button>
      </template>
    <vxe-table
        ref="xTable"
        border
        height='auto'
        size='small'
        row-id="lessonId"
        :data="dataModel.studySpecialLessonList ? dataModel.studySpecialLessonList : []"
        highlight-current-row
        :edit-config="{ trigger: 'click', mode: 'cell', }"
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
            <template v-slot="{ row,_rowIndex }">
                <vxe-input v-model="row.practisePaperName" placeholder="" disabled type="search" @search-click="chooseExercises.sonFn({index:_rowIndex,practisePaperId:row.practisePaperId,id:row.practisePaperId,practisePaperName:row.practisePaperName,practisePaperTotalScore:row.practisePaperTotalScore})"></vxe-input>
            </template>
          </vxe-column>
            <vxe-column field="practisePaperIsRetest" title="是否重新学习" :edit-render="{}" >
              <template v-slot:edit="row">
                  <vxe-select v-model="row.row.practisePaperIsRetest"  >
                      <vxe-option v-for="item in [{v:0,l:'否'},{v:1,l:'是'}]" :key="item.v" :value="item.v" :label="item.l"></vxe-option>
                  </vxe-select>
              </template>
              <template v-slot="{ row }">{{row.couIsCompulsory == 0 ? "否" : "是"}}</template>
          </vxe-column>
          <vxe-table-column field="" title="操作">
              <template v-slot="{ row }">
                  <a style="color:red;cursor:pointer;margin-left:10px" @click="removeEvent(row)">删除</a>
              </template>
          </vxe-table-column>
         </vxe-table>
        </n-card>

        <n-card :bordered="false" title="学习资料" size="small" style="min-height:320px">
          <template #header-extra>
              <n-button size="small" type="info" @click="chooseLearningMaterials.sonFn($refs.sTable.getTableData().tableData)">
                添加
              </n-button>
          </template>
        <vxe-table
            ref="sTable"
            border
            size='small'
            height="auto"
            :data="dataModel.studySpecialMaterialsList ? dataModel.studySpecialMaterialsList : []"
            highlight-current-row
        >
            <vxe-column field="materialsName" title="学习资料名称" ></vxe-column>
            <vxe-column field="materialsTypeName" title="资料标签" ></vxe-column>
            <vxe-column field="isDownload" title="是否可以下载"  >
              <template v-slot="{ row }">
                  {{(row.isDownload || row.isDownload == 0)?[
                      {label:'是',value:1},
                      {label:'否',value:0},
                  
                  ].filter(d=>d.value == row.isDownload)[0].label : ''}}
              </template>
            </vxe-column>
            <vxe-table-column field="" title="操作">
                <template v-slot="{ row }">
                    <a style="color:red;cursor:pointer;margin-left:10px" @click="sremoveEvent(row)">删除</a>
                </template>
            </vxe-table-column>
        </vxe-table>
      </n-card>

      <n-card :bordered="false" title="结业设置" size="small" style="min-height:320px">
        <template #header-extra>
            <n-button size="small" type="info" @click="jinsertEvent">
              添加
            </n-button>
        </template>
      <vxe-table
          ref="jTable"
          border
          size='small'
          height="auto"
          :edit-config="{ trigger: 'click', mode: 'cell', }"
          :data="dataModel.studySpecialJieyeList ? dataModel.studySpecialJieyeList : []"
          highlight-current-row
      >
          <vxe-column field="examLowestScore" title="考试最低分"  :edit-render="{}">
              <template v-slot:edit="row">
                <vxe-input   v-model="row.row.examLowestScore" placeholder="" size="small" type="number" :min='0'></vxe-input>
              </template>
              <template v-slot="{ row }">{{row.examLowestScore}}</template>
          </vxe-column>
          <vxe-column field="examHighestScore" title="考试最高分"  :edit-render="{}">
            <template v-slot:edit="row">
              <vxe-input v-model="row.row.examHighestScore" placeholder="" size="small" type="number" :min='0'></vxe-input>
            </template>
            <template v-slot="{ row }">{{row.examHighestScore}}</template>
          </vxe-column>
          <vxe-column field="examRank" title="考试等级" :edit-render="{}">
              <template v-slot:edit="row">
                <vxe-input   v-model="row.row.examRank" placeholder="" size="small" ></vxe-input>
              </template>
              <template v-slot="{ row }">{{row.examRank}}</template>
          </vxe-column>
          <vxe-column field="certificateName" title="证书名称" >
            <template v-slot="{ row,_rowIndex }">
                <vxe-input v-model="row.certificateName" placeholder="" disabled type="search" @search-click="chooseCertificate.sonFn({index:_rowIndex,certificateId:row.certificateId,certificateName:row.certificateName})"></vxe-input>
            </template>
          </vxe-column>
          <vxe-table-column field="" title="操作">
              <template v-slot="{ row }">
                  <a style="color:red;cursor:pointer;margin-left:10px" @click="jremoveEvent(row)">删除</a>
              </template>
          </vxe-table-column>
      </vxe-table>
    </n-card>
  </n-form>
  <ChooseCourseMaintenance
    ref="chooseCourseMaintenance"
    @update:callback="(arr) => {
      dataModel.studySpecialLessonList = []
      dataModel.studySpecialLessonList = arr
    }"
  ></ChooseCourseMaintenance>
  <ChooseLearningMaterials
     ref="chooseLearningMaterials"
    @update:callback="(arr) => {
      dataModel.studySpecialMaterialsList = []
      dataModel.studySpecialMaterialsList = arr
    }"
  ></ChooseLearningMaterials>
  <ChooseExercises  ref="chooseExercises"
    :multiple="false"
    @update:callback="(obj) => {
      exercisesCallback(obj)
    }"
  ></ChooseExercises>
  <ChooseCertificate ref="chooseCertificate"
    :multiple="false"
    @update:callback="(obj) => {
      dataModel.studySpecialJieyeList[obj.index] = {...dataModel.studySpecialJieyeList[obj.index],...obj}
       jTable.loadData(dataModel.studySpecialJieyeList)
    }"
  ></ChooseCertificate>
  <ChooseSpecialPaper  ref="chooseSpecialPaper"
    :multiple="false"
    @update:callback="(obj) => {
      dataModel.specialPaperId = obj.specialPaperId ? obj.specialPaperId : 0
     dataModel.specialPaperName = obj.specialPaperName ? obj.specialPaperName : ''
     dataModel.specialPaperTotalScore = obj.specialPaperTotalScore ? obj.specialPaperTotalScore:''
     dataModel.isHaveShortAnswer = obj.isHaveShortAnswer ? obj.isHaveShortAnswer:''
     dataModel.specialExamTime = obj.specialExamTime ? obj.specialExamTime:''
     dataModel.specialExamQualifiedScore = obj.specialExamQualifiedScore ? obj.specialExamQualifiedScore :''
     dataModel.specialExamPaperTeacherName=  dataModel.specialExamPaperTeacherName?  dataModel.specialExamPaperTeacherName: userInfo.userName,
      dataModel.specialExamPaperTeacherId=  dataModel.specialExamPaperTeacherId ?  dataModel.specialExamPaperTeacherId : userInfo.id
     if(!obj.specialPaperId){
        dataModel.specialExamPaperTeacherId = 0
        dataModel.specialExamPaperTeacherName=''
        dataModel.specialExamQualifiedScore = ''
        dataModel.specialExamTime = ''
        dataModel.specialExamNum = 0
        dataModel.specialPaperStartTime = ''
        dataModel.specialPaperEndTime = ''
      }
     
    }"
  ></ChooseSpecialPaper>
   <EmployeePickModal
      ref="employeePickModal"
      :showSide="true"
      :multiple="true"
      :value="(dataModel.studySpecialRangeUserList ? dataModel.studySpecialRangeUserList:[]).map(d=>{
        d.userId = d.rangeId
        return d
      })"
      @update:callback="
        (e) => {
            dataModel.studySpecialRangeUserList = []
            e.map(d=>{
              dataModel.studySpecialRangeUserList.push({
                  rangeId:d.empId,
                  rangeName:d.userNameCh,
                  
              })
            })
          
        }
      "
    ></EmployeePickModal>

     <EmployeePickModal
      ref="mustExamUserPickModal"
      :showSide="true"
      :multiple="true"
      :value="(dataModel.studySpecialMustExamUserList ? dataModel.studySpecialMustExamUserList:[]).map(d=>{
        d.userId = d.specialMustExamUserId  
        return d
      })"
      @update:callback="
        (e) => {
            dataModel.studySpecialMustExamUserList = []
            e.map(d=>{
              dataModel.studySpecialMustExamUserList.push({
                  specialMustExamUserId  :d.empId,
                  specialMustExamUserName:d.userNameCh,
                  
              })
            })
          
        }
      "
    ></EmployeePickModal>
    <ChooseDept 
        ref="chooseDept"
       @update:callback="
        (e) => {
            dataModel.studySpecialRangeOrgDeptList =[]
            e.map(d=>{
              dataModel.studySpecialRangeOrgDeptList.push({
                  rangeType:d.orgType,
                  rangeId:d.id,
                  rangeName:d.orgName,
              })
            })
          
        }
      "
    ></ChooseDept>
     <ChooseDept
        ref="chooseDeptMust"
        :isDisabled="dataModel.studySpecialRangeOrgDeptList ? dataModel.studySpecialRangeOrgDeptList.map(d=>d.rangeId) : []"
       @update:callback="
        (e) => {
            dataModel.studySpecialMustExamOrgList =[]
            e.map(d=>{
              dataModel.studySpecialMustExamOrgList.push({
                  rangeType:d.orgType,
                  rangeId:d.id,
                  rangeName:d.orgName,
              })
            })
          
        }
      "
    ></ChooseDept>
</template>
<script>
import { defineComponent, ref, onMounted  } from "vue";
import {
  useMessage,
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
  NTreeSelect,
  NConfigProvider,
  zhCN, dateZhCN,
  NUploadDragger
} from "naive-ui";
import { NwIcon, NwDic, Db, Cookies } from '@platform/main'
import { dictItemLists, classifys, } from './api'
import ChooseCourseMaintenance from './chooseCourseMaintenance.vue'
import ChooseExercises from './chooseExercises.vue'
import ChooseCertificate from '../study-special-add-form/chooseCertificate.vue'
import ChooseSpecialPaper from '../study-special-add-form/chooseSpecialPaper.vue'
import { VXETable,  } from 'vxe-table'
import { FormModal } from './store'

import EmployeePickModal from "../../components/employeePickModal/employeePickModal.vue";
import ChooseDept from "../../components/chooseDept/index.vue";
import ChooseLearningMaterials from './chooseLearningMaterials.vue'
import EmpChoose from "../../components/empPick.vue";

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
    NwDic,
    NGridItem,
    NUpload,
    NImage,
    NButton,
    ChooseCourseMaintenance,
    NCard,
    ChooseExercises,
    ChooseLearningMaterials,
    NwIcon,
    ChooseSpecialPaper,
    ChooseCertificate,
    EmployeePickModal,
    ChooseDept,
    NTreeSelect,
    EmpChoose,
    NConfigProvider,
    NUploadDragger
    
  },
  setup() {
     const {
      formRef,
      dataModel,
      rules,
      brules,
      token,
      tokenType,
      setValue,
      getValue,
      validate,
      setRules
    } = new FormModal()
   
    const message = useMessage();
    const chooseCourseMaintenance = ref()
    const chooseExercises = ref()
    const chooseDept = ref()
    const chooseDeptMust = ref()
    const employeePickModal = ref()
    const mustExamUserPickModal = ref()
    const xTable = ref()
    const sxTable = ref()
    const jTable = ref()
    const types = ref()
    const userInfo = ref({})
    const chooseCertificate = ref()
    const chooseSpecialPaper = ref()
    const chooseLearningMaterials = ref()
    const exercisesCallback = (obj) =>{
       
       dataModel.value.studySpecialLessonList[obj.index] = {...dataModel.value.studySpecialLessonList[obj.index],...obj}
       xTable.value.loadData(dataModel.value.studySpecialLessonList)
    }
    const getTime=(e)=>{
        return  e ? new Date(e).getTime() : null
    }
     // 删除
    const removeEvent = (row) => {
        const $table = xTable.value
          VXETable.modal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
              $table.remove(row)
              dataModel.value.studySpecialLessonList = $table.getTableData().tableData
            }
          }) 
    }
    const sremoveEvent = (row) => {
        const $table = sxTable.value
          VXETable.modal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
              $table.remove(row)
              dataModel.value.studySpecialMaterialsList = $table.getTableData().tableData
            }
          }) 
    }
     // 新增
    const jinsertEvent = async (row) => {
          const $table = jTable.value
          const record = {}
          if(!dataModel.value.studySpecialJieyeList) {
            dataModel.value.studySpecialJieyeList = []
          }
          const num = $table.getTableData().tableData.length
          dataModel.value.studySpecialJieyeList[num]={...record}
          const { row: newRow } = await $table.insertAt(record, -1)
        //   await $table.setActiveCell(newRow, 'sex')
    }
    //删除
      const jremoveEvent = (row) => {
          const $table = jTable.value
          
          VXETable.modal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
              $table.remove(row)
              dataModel.value.studySpecialJieyeList = $table.getTableData().tableData
            }
          })
      }
    const  filterTableMater=(dictCode, arr) =>{
      for (const item of arr) {
        if (item.dictCode === dictCode) return item
        if (item.kids && item.kids.length) {
          const _item = filterTableMater(dictCode, item.kids)
          if (_item) return _item
        }
      }
    }
    const formatDate = (date) =>{
      if(date) {
        var date = new Date(date);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD +" "+hh + mm + ss;
      } else {
        return ''
      }
       
     
     
    }
    onMounted(() => {
       classifys('plan').then((r)=>{
         const getStr = (list)=>{
                list.forEach((row)=>{
                    if(row.kids.length>0){
                       row.label = row.dictName
                        row.key = row.dictCode 
                        row.children = row.kids
                        getStr(row.kids)
                    }else {
                        row.label = row.dictName
                        row.key = row.dictCode
                    }
                })
          }
          getStr(r)
          types.value = r
       })
        Db.get("userInfo").then((res) => {
            userInfo.value = res
        });
    })
    return {
      dataModel,
      filterTableMater,
      formRef,
      xTable,
      types,
      sxTable,
      userInfo,
      jTable,
      chooseDept,
      chooseDeptMust,
      jremoveEvent,
      jinsertEvent,
      exercisesCallback,
      chooseCertificate,
      chooseCourseMaintenance,
      chooseLearningMaterials,
      chooseExercises,
      chooseSpecialPaper,
      employeePickModal,
      mustExamUserPickModal,
      dictItemLists,
      removeEvent,
      sremoveEvent,
      formatDate,
      getTime,
      token,
      tokenType,
      zhCN, dateZhCN,
      message,
      uploadUrl:`${window.apiBaseURL}/main/aliyunFile`,
      handleFinish() {
        let { code, data, msg } = JSON.parse(event.target.response);
        if (code == 200) {
          message.success("上传成功");
        
         dataModel.value = { 
            ...dataModel.value,
            fileUrl: data.fileUrl,
            fileId:data.id,
          };
        } else {
          message.error(msg);
        }
        isLoading.value = false;
      },
      rules
    };

  },
  methods:{
    
    beforeUpload() {
     
      this.isLoading = true;
      //this.$refs.xmodal.loading = true
    },
  }
});
</script>
<style></style>
