<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="80"
    size="small"
    :style="{
      padding:'10px',
      height: '100%',
      width: '100%',
      overflowY: 'scroll',
    }"
  >
   <n-grid :cols="2" :x-gap="24">
        <n-grid-item>
          <n-form-item label="课程标签" path="labelName">
            <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.labelName" />

          </n-form-item>
      </n-grid-item>
      <n-grid-item>
       <n-form-item label="所属分类" path="typeName">
          <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.typeName" />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item label="课程名称" path="lessonName">
              <n-input size="small" disabled placeholder="请输入" v-model:value="dataModel.lessonName" />
          </n-form-item>
      </n-grid-item>
      <n-grid-item>
          <n-form-item
              path="imgUrl"
          >
              
              <n-image :src="dataModel.imgUrl" v-if="dataModel.imgUrl" height="30" width="50" style="padding-left:15px"  />
          </n-form-item>
      </n-grid-item>
       <n-grid-item :span="24">
          <n-form-item label="备注" path="description">
            <n-input
              size="small"
              placeholder="请输入"
              disabled
              v-model:value="dataModel.description"
            />
          </n-form-item>
        </n-grid-item>
       <n-grid-item :span="24">
          <n-card :bordered="false" title="课件列表" size="small">
             
            <vxe-table
                ref="xTable"
                border
                size='small'
                :data="dataModel.couList ? dataModel.couList : []"
                highlight-current-row
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
              <vxe-table-column field="couDuration" title="课件时长"></vxe-table-column>
              <vxe-table-column field="couRatio" title="课件比率" >
                    <template v-slot="{ row }">{{row.couRatio ? row.couRatio+'%' : '-'}}</template>
              </vxe-table-column>
                <vxe-table-column field="studyBestLessTime" title="最低学习时长(秒)"></vxe-table-column>
                  <vxe-table-column field="useRange" title="使用权限"  >
                 
                    <template v-slot="{ row }">
                      {{row.useRange? [
                          {label:'公开',value:1},
                          {label:'私有',value:2},
                      
                      ].filter(d=>d.value == row.useRange)[0].label : ''}}
                  </template>
                </vxe-table-column>
                <vxe-column field="orgPermList" title="权限组织"  >
                  <template v-slot="{ row }">
                    {{(row.orgPermList ? row.orgPermList:[]).map(d=>{
                            return d.rangeName
                          }).join(',')}}
                  </template>
                </vxe-column>
                <vxe-column field="userPermList" title="权限人员"  >
                  <template v-slot="{ row }" >
                        {{(row.userPermList ? row.userPermList:[]).map(d=>{
                            return d.rangeName
                          }).join(',')}}
                  </template>
                </vxe-column>
            </vxe-table>
          </n-card>
       </n-grid-item>

       <n-grid-item :span="24">
           <n-card :bordered="false" title="学习资料" size="small">
            
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
               
            </vxe-table>
          </n-card>
       </n-grid-item>
    </n-grid>
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
