<template>
    <NButton type="success" size="tiny" transform-origin="center" @click="btnUpload()" round>附件上传</NButton>
    <n-modal style="width: 650px; padding: 0" v-model:show="visible" :mask-closable="true" :closable="true"
      preset="dialog" @after-enter="async () => await afterEnter(props, message)" title="附件上传">
      <n-upload multiple directory-dnd :action="fileUploadAction" :show-download-button="true" response-type="json"
        :headers="fileUploadHeadr" :default-file-list="defaultFileList"
        @finish="({ file, event }) => fileUploadFinish({ file, event })"
        @error="({ file, event }) => fileUploadError({ file, event })"
        @remove="({ file, fileList }) => fileUploadRemove({ file, fileList })"
        @download="(file) => fileDownload(file)">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <archive-icon />
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            点击或者拖动文件到该区域来上传
          </n-text>
        </n-upload-dragger>
      </n-upload>
      <template #action>
        <div style="padding: 5px;">
          <n-button size="small" @click="btnOk()">确定</n-button>
        </div>
      </template>
    </n-modal>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { NModal, NButton, NUpload, NUploadDragger, NIcon, NText, useMessage } from 'naive-ui'
  import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
  import { afterEnter, fileUploadHeadr, defaultFileList, fileDownload, fileUploadFinish, fileUploadError, fileUploadRemove } from './sub-upload'
  
  const message = useMessage()
  
  
  //文件上传地址
  let fileUploadAction = ref(`${(window as any).apiBaseURL}/main/fileinfo?fileSource=expenseSupp`);
  
  //控制模态框
  const visible = ref<boolean>(false)
  
  
  type Props = {
    attachment?: string,
    attachmentids?: string,
  }
  const props = withDefaults(defineProps<Props>(), {
    attachment: '',
    attachmentids: ''
  });
  
  const emit = defineEmits<{
    (e: 'callback', value: object): void
  }>();
  
  const btnUpload = () => {
    defaultFileList.value.splice(0);
    visible.value = true
  }
  
  const btnOk = () => {
    visible.value = false;
    let attachmentids: string = defaultFileList.value.map((item: any) => item.fileId).join()
    let attachment: string = defaultFileList.value.map((item: any) => item.name).join()
    emit('callback', { attachment, attachmentids });
  }
  
  </script>
  