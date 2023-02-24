<script lang="ts" setup>
import { ref } from 'vue'
import { NForm, NInput, NFormItem, NDivider, NGrid, NSwitch, NText,NSelect, NFormItemGi, NInputNumber ,NScrollbar,NUpload,NUploadDragger,NP} from "naive-ui";
import { FormModal } from "./App";
import { FormPermissionEnum, Cookies, request } from "@platform/main"
import { docType, isFlashview } from '../../lib/constant/Constant';
import { useMessage } from 'naive-ui';
const { formRef, dataModel, rules, dataPermits, fileList,handleFinish,handleDownload, verifySuffix } = new FormModal();

const message = useMessage();
//文档类型
const docTypeOptions = [
    {
        label: "仪器操作保养规范",
        value: 1,
    },
    {
        label: "实验操作规范",
        value: 2,
    },
    {
        label: "成果资料管理",
        value: 3,
    },
];
//验证轮播图数量
let handleChange=(value: number) =>{
    //验证是否是图片
    if(verifySuffix(dataModel.value.filesName) && value===1){
    request({
        url: `/cemlab/cemlabExperimentProcNorm/flashViewCount`,
        method: 'get',
    }).then((res) => {
         if (res==false) {
            dataModel.value.isFlashview=0;
              message.info(`已经设置5个了`)
         }
    });
    }
}
//文件上传地址
let fileUploadAction = ref(`${(window as any).apiBaseURL}/main/fileinfo?fileSource=suppUser`);
//文件上传Headr
const fileUploadHeadr: any = {
  Authorization: Cookies.get("tokenType") + ' ' + Cookies.get("token")
}

</script>
<template>
    <n-scrollbar style="height: 100%">
    <n-form ref="formRef" :model="dataModel" :rules="rules" size="medium" label-placement="left" label-width="auto"
        require-mark-placement="right-hanging" style="padding: 20px 30px">
        <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi :span="24" label="" path="">
                <h3 class="card-title">上传信息</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="标题" path="title">
                <n-input placeholder="请输入" v-model:value="dataModel.title"  />
            </n-form-item-gi>
         <n-form-item-gi :span="12" label="类型" path="type">
            <n-select v-model:value="dataModel.type" 
            v-if="dataPermits.type !== FormPermissionEnum.HIDE"
            :options="docTypeOptions"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="简介" path="remarks" >
                <n-input type="textarea" style="height: 100px" placeholder="请输入" v-model:value="dataModel.remarks"
                    />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="设为首页轮播" path="isFlashview" >
                <n-switch v-model:value="dataModel.isFlashview" :checked-value="1" :unchecked-value="0" :disabled="!verifySuffix(dataModel.filesName)" @update:value="handleChange"/>   <lable class="annotation">注:最多可设置5个</lable>
            </n-form-item-gi>
             <n-form-item-gi :span="24" label="" path="">
                <h3 class="card-title">上传文件</h3>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label=" " path="filesName"  >
                <n-upload  
                directory-dnd 
                :action="fileUploadAction" 
                :max="1"
                :headers="fileUploadHeadr" 
                :show-file-list="true"
                show-download-button
                @finish="({ file,event }) => {handleFinish({ file, event })}"
                @remove="() => {(dataModel.filesId = ''), (dataModel.filesName = '')}"
                @download="(file) => handleDownload(file)"
                 :default-file-list="fileList">
                    <n-upload-dragger v-if="!dataModel.filesId">
                        <n-text style="font-size: 16px">
                            点击或者拖动文件到该区域来上传
                        </n-text>
                    </n-upload-dragger>
                </n-upload>
            </n-form-item-gi>
        </n-grid>
    </n-form>
    <!-- <n-divider dashed>
        调试信息
    </n-divider>
    <pre>{{ JSON.stringify(dataModel, null, 2) }}</pre> -->
    </n-scrollbar>
</template>
<style lang="less">
.annotation {
  color:#ccc;
}
</style>