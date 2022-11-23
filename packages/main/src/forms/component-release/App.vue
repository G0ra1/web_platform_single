<template>

  <n-form     
    :model="dataModel"
    ref="formRef" 
    style="padding:0 10px"
    :rules="rules"
  >
      <n-grid x-gap="8" :cols="2" >
          <n-grid-item v-if="brules['widgetName'] !== 'hide'" span="2">
            <n-form-item path="widgetName" label="组件名称">
                <n-input
                  :disabled="brules['widgetName'] === 'readonly'"
                  v-model:value="dataModel.widgetName"
                  placeholder=""
                />
            </n-form-item>
          </n-grid-item>
          <!-- <n-grid-item>
            <n-form-item label="组件编码">
                <n-input
                  v-model:value="dataModel.widgetCode"
                  placeholder=""
                />
            </n-form-item>
          </n-grid-item> -->
           <n-grid-item  v-if="brules['widgetUrl'] !== 'hide'">
            <n-form-item path="widgetUrl" label="组件路径">
                <n-input
                  :disabled="brules['widgetUrl'] === 'readonly'"
                  v-model:value="dataModel.widgetUrl"
                  placeholder=""
                />
            </n-form-item>
          </n-grid-item>
          <n-grid-item v-if="brules['widgetTypeCode'] !== 'hide'" >
            <n-form-item path="widgetTypeCode" label="组件类型">
               <nw-dic
                  :disabled="brules['widgetTypeCode'] === 'readonly'"
                  v-model:value="dataModel.widgetTypeCode"
                  v-model:label="dataModel.widgetTypeName"
                  size='small'
                  :request="{
                    XHR: dictItemLists,
                    params:'widgets-type',
                  }"
                  :response="{
                    dataMethod: (r: any) =>{
                      return r.map((d: any) => ({
                          value: d.dictItemCode,
                          label: d.dictItemName,
                      }))
                     
                    }
                  }"
                  placeholder="请选择类型"
                />
            </n-form-item>
          </n-grid-item>
           <!-- <n-grid-item>
            <n-form-item label="展示形态">
             <n-select
                    v-model:value="dataModel.widgetSize"
                    placeholder="请选择"
                    multiple
                    :options="[
                        {value:'BIG',label:'大'},
                        {value:'CENTRE',label:'中'},
                        {value:'SMALL',label:'小'},
                    ]"
                />
            </n-form-item>
          </n-grid-item> -->
          <n-grid-item v-if="brules['reason'] !== 'hide'" :span="24">
            <n-form-item path="reason" label="说明">
                <n-input
                  :disabled="brules['reason'] === 'readonly'"
                  v-model:value="dataModel.reason"
                  type="textarea"
                  show-count
                  placeholder=""
                >
                    <template #count="{ value }">
                    {{ value.length }}
                  </template>
                </n-input>
            </n-form-item>
          </n-grid-item>
          <n-grid-item  :span="24">
              <n-form-item path="coverUrl" label="封面上传">
                 <n-upload
                    :action="uploadUrl"
                     accept="image/png, image/jpeg, image/bmp"
                    :show-file-list="false"
                    v-if="!dataModel.coverUrl"
                    :headers="{
                        Authorization: `${tokenType} ${token}`,
                    }"
                    :data ="{
                      
                    }"
                    @finish="(e)=>handleFinish(e)"
                    @before-upload="beforeUpload"
                  >
                    <n-upload-dragger >
                        建议上传jpg、png格式的图片
                    </n-upload-dragger>
                </n-upload>
               <div v-if="dataModel.coverUrl">
                  <n-image :src="`http://incloud.com/${dataModel.coverUrl}`"  height="50" width="50" style="padding-left:15px"  />
                  <nw-icon @click="()=>{dataModel.coverUrl = ''}" name="icon-n-y-shanchu" style="cursor: pointer;position: absolute;left: 70px;top: 35px;color: red;" size={15} />
                </div>
              </n-form-item>
          </n-grid-item>
          <n-grid-item  :span="24">
              <n-form-item >
                <template #label>
                </template>
                <div>
                
                  <div style="display: flex;justify-content: space-between;width:200px;margin-bottom: 10px;">
                    <div>
                      <n-button type="info" @click="handlePreview"> 预览</n-button>
                    </div>
                    <n-space align="center">
                      <n-button :text="!(previewSize === 'large')" @click="previewSize = 'large'"> 大</n-button>
                      <n-button :text="!(previewSize === 'normal')" @click="previewSize = 'normal'"> 中</n-button>
                      <n-button :text="!(previewSize === 'small')" @click="previewSize = 'small'"> 小</n-button>
                    </n-space>
                  </div>
                  <div>
                    <iframe :class="{
                      'preview-iframe': true,
                      'large': previewSize === 'large',
                      'normal': previewSize === 'normal',
                      'small': previewSize === 'small',
                    }" :src="previewUrl" ></iframe>
                      
                  </div>
                </div>
              </n-form-item>
          </n-grid-item>
      </n-grid>
  </n-form>
</template>

<script lang="tsx">
import { ref, reactive, computed, defineComponent, nextTick, h } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import {
  NSpace,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton,
  NDatePicker,
  NUpload,
  NUploadDragger,
  NIcon,
  NText,
  useMessage,
  NImage,
  NSelect
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, Db, NwDic } from '@platform/main'
import { FormModal } from './store'
import { format } from "date-fns";
import { dictItemLists } from './index'


export default defineComponent({
  components: {
    NSpace,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NFormItemGi,
    NInput,
    NInputNumber,
    NButton,
    NDatePicker,
    NUpload,
    NUploadDragger,
    NIcon,
    NText,
    NwIcon,
    NwDic,
    NImage,
    NSelect
  },
  setup () {
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
    const previewUrl = ref('')
    const previewSize = ref('small')

    // const rules = ref({})
    // setTimeout(() => {
    //   // rules.value = {
    //   //   widgetName: {
    //   //     required: true,
    //   //     trigger: ['blur', 'input'],
    //   //     message: '请输入 inputValue'
    //   //   }
    //   // }
    // }, 2000);
    return {
      formRef,
      dataModel,
      token,
      tokenType,
      rules,
      brules,
      validate,
      dictItemLists,
      message,
      uploadUrl:`${window.apiBaseURL}/main/fileinfo?fileSource=portal`,
      async beforeUpload() {
     
       return 
      },
      handleFinish(e?: any) {
        let { code, data, msg } = JSON.parse(e.event.target.response)
        if (code == 200) {
          message.success("上传成功");
        
          dataModel.value.coverUrl =data.fileUrl
        } else {
          message.error(msg);
        }
        return undefined 
      },
      handlePreview () {
        previewUrl.value = dataModel.value.widgetUrl
      },
      previewUrl,
      previewSize
    }
  }
})

</script>

<style lang="less" scoped>
.preview-iframe {
  border: none;
  box-shadow: 2px 2px 5px 0px #ccc;
  &.large {
    height: 260px;
    width: 500px;
  }
  &.normal {
    height: 260px;
    width: 250px;
  }
  &.small {
    height: 130px;
    width: 250px;
  }
}
</style>
