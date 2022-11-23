<template>
  <div class="myfile">
    <n-button text v-if="showLookOver" @click="fileModalShow">
      查看
    </n-button>
    <n-upload v-if="showFile" show-remove-button show-download-button show-preview-button
      :default-file-list="defaultFileList" :on-remove="delFiles" :on-download="downFile" :on-preview="previewFile"
      :action="uploadUrl" accept="*/*" :show-file-list="showFileList" :headers="{
        Authorization: `${tokenType} ${token}`,
      }" @finish="handleFinish" @error="handleError" @before-upload="beforeUpload">
      <n-spin :show="spinShow">
        <slot></slot>
      </n-spin>
    </n-upload>
    <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="文件类型" content="你确认"
      positive-text="确认" negative-text="取消" style="width: 800px">
      <vxe-table ref="filesInfoTable" show-overflow border :data="filesSons" :column-config="{ resizable: true }"
        :edit-config="{
          enabled: true,
          showIcon: true,
        }">
        <vxe-column type="seq" title="序号" width="80"></vxe-column>
        <vxe-column field="fileName" title="文件名称"></vxe-column>
        <vxe-column field="itemCode" title="类型">
          <template #default="{ row }">
            <span>{{ row.fileName ? row.fileName.split(".")[1] : "" }}</span>
          </template>
        </vxe-column>
        <vxe-column field="fileSizeView" title="文件大小"> </vxe-column>
        <vxe-column title="操作" show-overflow width="135" v-if="!readonly">
          <template #default="{ row, _rowIndex }">
            <span style="
              cursor: pointer;
              color: #e62525;
              margin-right: 15px;
              font-size: 12px;
            " @click="
              () => {
                delFiles();
              }
            ">删除</span>
          </template>
        </vxe-column>
      </vxe-table>
    </n-modal>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, onMounted, watch, nextTick } from "vue";
import { NSpin, NUpload, useMessage, NButton, NModal } from "naive-ui";
import NwIcon from "/@/components/nw-icon/index.vue";
import { fileinfo } from "./api";
import cookies from "/@/utils/cookies.js";
import Setting from "/setting";
export default defineComponent({
  components: { NSpin, NUpload, NButton, NwIcon, NModal },
  props: {
    value: {
      default: "",
      type: String,
    },
    readonly: {
      default: false,
      type: Boolean,
    },
    fileIds: {
      default: "",
      type: String,
    },
    showFileList: {
      default: true,
      type: Boolean,
    },
    showLookOver: {
      default: false,
      type: Boolean,
    },
    multiple: {
      default: false,
      type: Boolean,
    },
  },

  setup(props, context) {
    const attrs = context.attrs
    const message = useMessage();
    const token = cookies.get("token");
    const tokenType = cookies.get("tokenType");
    const spinShow = ref(false);
    const filesInfoTable = ref(null);
    const fileId = ref(props.fileIds);
    const filesSons = ref([])
    const showModal = ref(false)
    const fileModalShow = () => {
      showModal.value = true
      nextTick().then(() => {
        if (filesSons.value.length == 0) {
          getFile()
        } else {
          filesInfoTable.value.loadData(filesSons.value);
        }

      })
    }
    const handleFinish = () => {
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        message.success("上传成功");
        if (props.multiple) {
          if (filesSons.value.length == 1 && !filesSons.value[0].fileName) {
            filesSons.value = [{ ...data, fileId: data.id, isOutLink: 0 }];
          } else {
            filesSons.value.push({ ...data, fileId: data.id, isOutLink: 0 });
          }
          if (fileId.value) {
            fileId.value += `,${data.id}`;
          } else {
            fileId.value = data.id;
          }
        } else {
          context.emit("update:fileIds", data.id);
        }

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
    const delFiles = (_rowIndex) => {
      if (filesSons.value.length == 1) {
        filesSons.value = [];
        filesInfoTable.value.loadData(filesSons.value);
        fileId.value = "";
      } else {
        filesSons.value.splice(_rowIndex, 1);
        filesInfoTable.value.loadData(filesSons.value);
        fileId.value.split(",").length == 1
          ? (fileId.value = "")
          : (fileId.value = fileId.value
            .split(",").splice(_rowIndex, 1)
            .join(","));
      }
    };
    const downFile = (file) => {
      window.open(`${Setting.apiBaseURL}/main/fileinfo/stream?id=${file.id}&access_token=${token}`)
    }
    const previewFile = (file) => {
      console.log(file, '预览文件')
    }
    const showFile = ref(true)
    const defaultFileList = ref([])
    const getFile = (d = props.fileIds) => {
      fileinfo(d).then((res) => {
        filesSons.value = res;
        filesInfoTable.value.loadData(filesSons.value);
      });
    }
    onMounted(async () => { });
    watch(
      () => fileId.value,
      (d) => {
        if (!d) {
          context.emit("update:fileIds", null);
        } else {
          context.emit("update:fileIds", d);
        }
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
      uploadUrl: `${Setting.apiBaseURL}/main/fileinfo?fileSource=asset&poolName=localAsset`,
      defaultFileList,
      showFile,
      downFile,
      previewFile,
      attrs,
      showModal,
      fileModalShow,
      filesSons,
      getFile
    };
  },
});
</script>
<style lang="less">
.myfile {
  width: 100%;
  display: flex;

  .n-upload-trigger+.n-upload-file-list {
    margin-top: -30px;
  }

  .uploadbtn {
    position: relative;
    top: -12px;
  }
}
</style>
