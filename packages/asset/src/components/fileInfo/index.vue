<template>
  <n-spin :show="spinShow">
    <template #description> 正在上传... </template>
    <div style="display: flex">
      <span style="height: 24px; line-height: 24px; width: 30px">附件</span>
      <n-upload
        v-if="!readonly"
        :action="uploadUrl"
        accept="*/*"
        :show-file-list="false"
        :headers="{
          Authorization: `${tokenType} ${token}`,
        }"
        @finish="handleFinish"
        @error="handleError"
        @before-upload="beforeUpload"
      >
        <n-button
          style="
            height: 24px;
            width: 24px;
            line-height: 24px;
            margin-left: 10px;
          "
          circle
          type="info"
        >
          <nw-icon name="icon-add-bold" :size="15" />
        </n-button>
      </n-upload>
    </div>

    <vxe-table
      ref="filesInfoTable"
      show-overflow
      border
      :data="filesSons"
      :column-config="{ resizable: true }"
      :edit-config="{
        enabled: true,
        showIcon: true,
      }"
    >
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
          <span
            style="
              cursor: pointer;
              color: #e62525;
              margin-right: 15px;
              font-size: 12px;
            "
            @click="
              () => {
                delFiles();
              }
            "
            >删除</span
          >
        </template>
      </vxe-column>
    </vxe-table>
  </n-spin>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import { NSpin, NUpload, useMessage, NButton } from "naive-ui";

import { NwIcon, Cookies } from '@platform/main'

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
  },

  setup(props, context) {
    const message = useMessage();
    const token = Cookies.get("token");
    const tokenType = Cookies.get("tokenType");
    const spinShow = ref(false);
    const filesInfoTable = ref(null);
    const filesSons = ref([]);
    const fileIds = ref("");
    if (props.value) {
      fileIds.value = props.value;
      fileinfo(props.value).then((res) => {
        console.log(res, "fileinfofileinfofileinfo");
        filesSons.value = res;
      });
    }
    const handleFinish = () => {
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        message.success("上传成功");
        if (filesSons.value.length == 1 && !filesSons.value[0].fileName) {
          filesSons.value = [{ ...data, fileId: data.id, isOutLink: 0 }];
        } else {
          filesSons.value.push({ ...data, fileId: data.id, isOutLink: 0 });
        }
        if (fileIds.value) {
          fileIds.value += `,${data.id}`;
        } else {
          fileIds.value = data.id;
        }

        filesInfoTable.value.loadData(filesSons.value);
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
      if (filesSons.value.length == 1) {
        filesSons.value = [];
        filesInfoTable.value.loadData(filesSons.value);
        fileIds.value = "";
      } else {
        filesSons.value.splice(_rowIndex, 1);
        filesInfoTable.value.loadData(filesSons.value);
        fileIds.value.split(",").length == 1
          ? (fileIds.value = "")
          : (fileIds.value = fileIds.value
              .split(",")
              .length.splice(_rowIndex, 1)
              .join(","));
      }
    };
    onMounted(async () => {});
    watch(
      () => fileIds.value,
      (d) => {
        if (!d) {
          context.emit("update:value", null);
        } else {
          context.emit("update:value", d);
        }
      }
    );
    watch(
      () => props.value,
      (d) => {
        fileIds.value = props.value;
        fileinfo(props.value).then((res) => {
          console.log(res, "fileinfofileinfofileinfo");
          filesSons.value = res;
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
      filesSons,
      delFiles,
      filesInfoTable,
      uploadUrl: `${window.apiBaseURL}/main/fileinfo?fileSource=asset&poolName=localAsset`,
    };
  },
});
</script>
<style lang="less">
</style>
