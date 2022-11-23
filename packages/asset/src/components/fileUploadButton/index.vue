<template>
  <div class="myfile">
    <n-upload v-if="showFile" show-remove-button show-download-button show-preview-button
      :default-file-list="defaultFileList" :on-remove="delFiles" :on-download="downFile" :on-preview="previewFile"
      :action="uploadUrl" accept="*/*" :show-file-list="showFileList" :headers="{
        Authorization: `${tokenType} ${token}`,
      }" @finish="handleFinish" @error="handleError" @before-upload="beforeUpload">
      <n-spin :show="spinShow">
        <slot></slot>
      </n-spin>
    </n-upload>

  </div>
</template>
<script>
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import { NSpin, NUpload, useMessage, NButton } from "naive-ui";


import { NwIcon,Cookies } from '@platform/main'

import { fileinfo } from "./api";

;

export default defineComponent({
  components: { NSpin, NUpload, NButton, NwIcon },
  props: {
    value: {
      default: "",
      type: String,
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    fileId: {
      default: "",
      type: String,
    },
    showFileList: {
      default: true,
      type: Boolean,
    }
  },

  setup(props, context) {
    const attrs = context.attrs
    const message = useMessage();
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    const spinShow = ref(false);
    const filesInfoTable = ref(null);
    const fileId = ref("");
    const handleFinish = () => {
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        message.success("上传成功");
        context.emit("update:fileName", data.fileName);
        context.emit("update:fileId", data.id);
      } else {
        message.error(msg);
      }
      spinShow.value = false;
    };
    const handleError = () => {
      spinShow.value = false;
      let { code, data, msg } = JSON.parse(event.target.response);
      console.log(code, data, msg);
      message.error(msg);
    };
    const beforeUpload = () => {
      spinShow.value = true;
    };
    const delFiles = () => {
      context.emit("update:fileName", null);
      context.emit("update:fileId", null);
    };
    const downFile = (file) => {
      window.open(`${window.apiBaseURL}/main/fileinfo/stream?id=${file.id}&access_token=${token}`)
    }
    const previewFile = (file) => {
      console.log(file, '预览文件')
    }
    const showFile = ref(true)
    const defaultFileList = ref([])
    onMounted(async () => { });
    watch(
      () => props.fileId,
      (d) => {
        fileId.value = d;
        showFile.value = false
        fileinfo(d).then((res) => {
          res.forEach(d => {
            d.name = d.fileName
            d.status = "finished"
          })
          defaultFileList.value = res
          showFile.value = true
        });
      }
    );
    return {
      token,
      tokenType,
      spinShow,
      handleFinish,
      handleError,
      beforeUpload,
      delFiles,
      filesInfoTable,
      uploadUrl: `${window.apiBaseURL}/main/fileinfo?fileSource=asset&poolName=localAsset`,
      defaultFileList,
      showFile,
      downFile,
      previewFile,
      attrs
    };
  },
});
</script>
<style lang="less">
.myfile {
  width: 100%;

  .n-upload-trigger+.n-upload-file-list {
    margin-top: -30px;
  }

  .uploadbtn {
    position: relative;
    top: -12px;
  }
}
</style>
