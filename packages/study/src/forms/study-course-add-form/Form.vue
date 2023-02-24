<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="80"
    size="small"
    class="LForm"
  >
    <n-grid :cols="2" :x-gap="24">
        <n-grid-item>
          <n-form-item label="课程标签" path="labelName">
              <nw-dic
                :request="{XHR:dictItemLists, params: 'STUDY_COURSE_TYPE',}"
                v-model:value="dataModel.labelCode"
                v-model:label="dataModel.labelName"
                placeholder
                multiple
                :response="{dataMethod:res => res.map(({dictItemCode: value, dictItemName: label}) => ({label, value}))}"
              />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
       <n-form-item label="所属分类" path="typeName">
         
              <n-tree-select
                :options="types"
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
          <n-form-item label="课程名称" path="lessonName">
              <n-input size="small" placeholder="请输入" v-model:value="dataModel.lessonName" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item
              path="imgUrl"
              label="封面上传"
          >
                <n-upload
                    :action="uploadUrl"
                    accept="image/png, image/jpeg, image/bmp"
                    :show-file-list="false"
                    v-if="!dataModel.imgUrl"
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
                <div v-if="dataModel.imgUrl">
                  <n-image :src="dataModel.imgUrl"  height="50" width="50" style="padding-left:15px"  />
                  <nw-icon @click="()=>{dataModel.imgUrl = '',dataModel.imgId=''}" name="icon-del" style="cursor: pointer;position: absolute;left: 70px;top: 35px;color: red;" size={15} />
                </div>
              
          </n-form-item>
      </n-grid-item>
       <n-grid-item :span="24">
          <n-form-item label="课程介绍" path="description">
            <n-input
              size="small"
              placeholder="请输入"
              type="textarea"
              v-model:value="dataModel.description"
            />
          </n-form-item>
        </n-grid-item>
       <n-grid-item :span="24">
           <n-card :bordered="false" title="课件列表" size="small">
              <template #header-extra>
                 <n-button size="small" type="info" @click="chooseCourseware.sonFn($refs.xTable.getTableData().tableData)">
                    添加
                  </n-button>
              </template>
            <vxe-table
                ref="xTable"
                border
                size='small'
                :column-config="{resizable: true}"
                :data="dataModel.couList ? dataModel.couList : []"
                highlight-current-row
                :edit-config="{ trigger: 'click', mode: 'cell', }"
            >
                <vxe-table-column field="couName" title="课件名称"></vxe-table-column>
                <vxe-table-column field="labelName" title="课件分类"></vxe-table-column>
                
                <vxe-table-column field="couType" title="课件类型">
                      <template #default="{  row }">
                        {{[
                          {label:'音频',value:1},
                          {label:'视频',value:2},
                          {label:'文档',value:3},
                        ].filter(d=>d.value == row.couType)[0].label}}
                      </template>
                  </vxe-table-column>
                <vxe-table-column field="couDuration" title="课件时长(分)"></vxe-table-column>
                 <vxe-table-column field="couRatio" title="课件比率" :edit-render="{}">
                   <template v-slot:edit="row">
                      <vxe-input type="number" @input="()=>{row.row.studyBestLessTime =  Math.round((row.row.couDuration * (row.row.couRatio/100)))}"   v-if="row.row.couType !== 3" min="0"  v-model="row.row.couRatio" placeholder="" size="small" >
                        <template #suffix>
                          %
                        </template>
                      </vxe-input>
                      <vxe-input disabled  v-else></vxe-input>
                    </template>
                    <template v-slot="{ row }">{{row.couRatio ? row.couRatio+'%' : '-'}}</template>
                </vxe-table-column>
                <vxe-table-column field="studyBestLessTime" title="最低学习时长" :edit-render="{}">
                   <template v-slot:edit="row">
      
                      <vxe-input type="number" v-if="row.row.couType == 3"  min="0"  v-model="row.row.studyBestLessTime" placeholder="" size="small" >
                        <template #suffix>
                          秒
                        </template>
                      </vxe-input>
                       <vxe-input type="number" v-else disabled  min="0"  v-model="row.row.studyBestLessTime" placeholder="" size="small" >
                        <template #suffix>
                          分
                        </template>
                      </vxe-input>
                    </template>
                    <template v-slot="{ row }">{{row.studyBestLessTime +`${row.couType == 3?'秒':'分'}` }}</template>
                </vxe-table-column>
                 <vxe-table-column field="useRange" title="使用权限"  :edit-render="{}">
                  <template v-slot:edit="row">
                    <vxe-select v-model="row.row.useRange" transfer>
                      <vxe-option  :key="1" :value="1" label="公开"></vxe-option>
                      <vxe-option  :key="2" :value="2" label="私有"></vxe-option>
                    </vxe-select>
                  </template>
                  <template v-slot="{ row }">
                      {{[
                          {label:'公开',value:1},
                          {label:'私有',value:2},
                      
                      ].filter(d=>d.value == row.useRange)[0].label}}
                  </template>
                </vxe-table-column>
                <vxe-column field="orgPermList" title="权限组织"  >
                  <template v-slot="{ row }">
                     <ChooseDept 
                        v-if="row.useRange == 2"
                        :isShowSearch="true"
                        :orgUserName ="(row.orgPermList ? row.orgPermList:[]).map(d=>{
                            return d.rangeName
                          }).join(',')"
                          :value="(row.orgPermList ? row.orgPermList:[]).map(d=>{
                            d.userId = d.rangeId
                            return d
                          })"
                        @update:callback="
                          (e) => {
                              row.orgPermList =[]
                              e.map(d=>{
                                row.orgPermList.push({
                                    rangeType:d.orgType,
                                    rangeId:d.id,
                                    rangeName:d.orgName,
                                })
                              })
                            
                          }
                        "
                      ></ChooseDept>
                      <span v-else> - </span>
                  </template>
                </vxe-column>
                <vxe-column field="userPermList" title="权限人员"  >
                  <template v-slot="{ row }" >
                         <EmployeePickModal
                          :showSide="true"
                          :multiple="true"
                          v-if="row.useRange == 2"
                          :isShowSearch="true"
                          :userName ="(row.userPermList ? row.userPermList:[]).map(d=>{
                            return d.rangeName
                          }).join(',')"
                          :value="(row.userPermList ? row.userPermList:[]).map(d=>{
                            d.userId = d.rangeId
                            return d
                          })"
                          @update:callback="
                            (e) => {
                                row.userPermList = []
                                e.map(d=>{
                                  row.userPermList.push({
                                      rangeId:d.empId,
                                      rangeName:d.userNameCh,
                                      
                                  })
                                })
                              
                            }
                          "
                        ></EmployeePickModal>
                        <span v-else> - </span>
                  </template>
                </vxe-column>
                <vxe-table-column field="" title="操作">
                    <template v-slot="{ row }">
                        <a style="color:red;cursor:pointer;margin-left:10px" @click="removeEvent(row)">删除</a>
                    </template>
                </vxe-table-column>
            </vxe-table>
          </n-card>
       </n-grid-item>

       <n-grid-item :span="24">
           <n-card :bordered="false" title="学习资料" size="small">
              <template #header-extra>
                 <n-button size="small" type="info" @click="chooseLearningMaterials.sonFn($refs.sTable.getTableData().tableData)">
                    添加
                  </n-button>
              </template>
            <vxe-table
                ref="sTable"
                border
                size='small'
                :data="dataModel.marterialsList ? dataModel.marterialsList : []"
                highlight-current-row
            >
                <vxe-column field="marterialsName" title="学习资料名称" ></vxe-column>
                <vxe-column field="labelName" title="资料标签" ></vxe-column>
               
                <vxe-column field="isDownload" title="是否可以下载"  >
                  <template v-slot="{ row }">
                      {{[
                          {label:'是',value:1},
                          {label:'否',value:0},
                      
                      ].filter(d=>d.value == row.isDownload)[0].label}}
                  </template>
                </vxe-column>
               
                <vxe-table-column field="" title="操作">
                    <template v-slot="{ row }">
                        <a style="color:red;cursor:pointer;margin-left:10px" @click="sremoveEvent(row)">删除</a>
                    </template>
                </vxe-table-column>
            </vxe-table>
          </n-card>
       </n-grid-item>
    </n-grid>
  </n-form>
  <ChooseCourseware
    ref="chooseCourseware"
    @update:callback="(arr) => {
      dataModel.couList = []
      dataModel.couList = arr.map(d=>{
        d.couRatio = d.couType !==3 ? 70 : null
        d.couDuration =  d.studyTimeSize 
        d.studyBestLessTime = d.couType ==3 ? 10 : Math.round((d.studyTimeSize * 0.7))
        return d 
      })
    }"
  ></ChooseCourseware>
  <ChooseLearningMaterials
    ref="chooseLearningMaterials"
    @update:callback="(arr) => {
      dataModel.marterialsList = []
      dataModel.marterialsList = arr
    }"
  ></ChooseLearningMaterials>
  
</template>
<script>
import { defineComponent, ref, onMounted } from "vue";
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
  NUploadDragger
} from "naive-ui";
import { VXETable, } from 'vxe-table'
import { NwIcon, NwDic, Cookies } from '@platform/main'
import { FormModal } from './store'
import ChooseCourseware from "./chooseCourseware.vue";
import ChooseLearningMaterials from "./chooseLearningMaterials.vue";
import { courseClassification, dictItemLists }  from './api'
import EmployeePickModal from "../../components/employeePickModal/employeePickModal.vue";
import ChooseDept from "../../components/chooseDept/index.vue";
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
    NCard,
    NTreeSelect,
    ChooseCourseware,
    ChooseLearningMaterials,
    NUploadDragger,
    NwIcon,
    EmployeePickModal,
    ChooseDept
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
    const xTable = ref()
    const sTable = ref()
    const types = ref()
    const chooseCourseware = ref()
    const chooseLearningMaterials = ref()
    const getTime=(e)=>{
        // var date = e ? new Date(e):null;
        return  e ? new Date(e).getTime() : null
    }
    const formatDate = (date) =>{
      var date = new Date(date);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return YY + MM + DD +" "+hh + mm + ss;//
    }
     // 删除
    const removeEvent = (row) => {
        const $table = xTable.value
         VXETable.modal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
              $table.remove(row)
              dataModel.value.couList = $table.getTableData().tableData
            }
          }) 
    }
      // 资料删除
    const sremoveEvent = (row) => {
        const $table = sTable.value
         VXETable.modal.confirm('您确定要删除该数据?').then(type => {
            if (type === 'confirm') {
              $table.remove(row)
              dataModel.value.marterialsList = $table.getTableData().tableData
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
    onMounted(() => {
       courseClassification('lesson').then((r)=>{
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
    })
    return {
      dataModel,
      formRef,
      dictItemLists,
      types,
      formatDate,
      filterTableMater,
      getTime,
      xTable,
      removeEvent,
      sTable,
      sremoveEvent,
      token,
      tokenType,
      message,
      chooseCourseware,
      chooseLearningMaterials,
      uploadUrl:`${window.apiBaseURL}/main/aliyunFile`,
      handleFinish() {
        let { code, data, msg } = JSON.parse(event.target.response);
        if (code == 200) {
          message.success("上传成功");
        
         dataModel.value = { 
            ...dataModel.value,
            imgUrl:data.fileUrl,
             imgId:data.id
          };
        } else {
          message.error(msg);
        }
        isLoading.value = false;
      },
      rules: {
      },
    };

  },
  methods:{
    //  handleFinish() {
      
    //   let { code, data, msg } = JSON.parse(event.target.response);
    //   if (code == 200) {
    //     this.message.success("上传成功");
       
    //      this.dataModel = {
    //         ...this.dataModel,
    //         imgUrl:"http://192.168.0.195:8000/file" + data.fileUrl,
    //         imgId:data.id
           
    //       };
    //   } else {
    //     this.message.error(msg);
    //   }
    //   this.isLoading = false;
    // },
    beforeUpload() {
     let resultFile = event.target.files[0]
      console.log(resultFile,'-==-=-=-=-=-=')
    },
  }
});
</script>
<style></style>
