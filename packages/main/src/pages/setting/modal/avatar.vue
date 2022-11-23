<template>
  <n-modal v-model:show="isShow">
    <n-spin :show="isLoading">
      <n-card
        style="width: 510px; height: 414px"
        title="修改头像"
        closable
        :on-close="
          () => {
            isShow = false;
          }
        "
        header-style="text-align: center;height:56px;background-color:#f8f8f8;border-radius:10px"
        :bordered="false"
        size="small"
      >
        <template #header-extra></template>
        <div
          style="
            height: 256px;
            border-radius: 4px;
            margin-top: 30px;
            background: #eeeeee;
            display: flex;
            flex-direction: column;
            justify-content: center;
          "
        >
          <n-upload
            :action="uploadUrl"
            accept="image/png, image/jpeg, image/bmp"
            :headers="{
              Authorization: `${tokenType} ${token}`,
            }"
            :show-file-list="false"
            @finish="handleFinish"
            @before-upload="beforeUpload"
            v-show="!isUploadAv"
          >
            <n-upload-dragger
              style="
                height: 256px;
                width: 478px;
                background: #eeeeee;
                display: flex;
                flex-direction: column;
                justify-content: center;
              "
            >
              <div style="margin-bottom: 12px">
                <n-button size="small" style="width: 88px">
                  <nw-icon
                    name="icon-add-bold"
                    :size="18"
                    color="#18a058"
                    style="marin-top: 5px"
                  />
                  上传文件</n-button
                >
                <br />
                <n-p
                  depth="3"
                  style="
                    margin: 8px 0 0 0;
                    font-weight: 400;
                    color: #999;
                    font-size: 12px;
                  "
                >
                  建议上传BMP,PNG,JPEG,JPG格式的图片
                </n-p>
              </div>
            </n-upload-dragger>
          </n-upload>
          <n-avatar
            style="margin: 0 auto"
            v-if="isUploadAv"
            round
            :size="228"
            :src="`${imgUrl}`"
          />
        </div>
        <template #footer>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            "
          >
            <div>
              <n-upload
                :action="uploadUrl"
                accept="image/png, image/jpeg, image/bmp"
                :headers="{
                  Authorization: `${tokenType} ${token}`,
                }"
                :show-file-list="false"
                @finish="handleFinish"
                @before-upload="beforeUpload"
                v-show="isUploadAv"
              >
                <n-button size="small" style="width: 88px"> 重新上传</n-button>
              </n-upload>
            </div>
            <div style="text-align: right">
              <n-button
                size="small"
                style="margin-right: 20px; width: 88px"
                @click="isShow = false"
                >取消</n-button
              >
              <n-button
                :disabled="!isUploadAv"
                size="small"
                type="primary"
                style="width: 88px"
                @click="updatePhoto"
                >确定</n-button
              >
            </div>
          </div>
        </template>
      </n-card>
    </n-spin>
  </n-modal>
</template>

<script>
import { defineComponent, ref, reactive, computed, nextTick } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NAlert,
  NForm,
  NFormItem,
  NCard,
  NSpin,
  NInput,
  NInputGroup,
  NButton,
  NList,
  NListItem,
  NSelect,
  NModal,
  NUpload,
  NUploadDragger,
  NIcon,
  NAvatar,
  NP,
  useMessage,
  NMessageProvider
} from "naive-ui";
import { NwIcon, Db, Cookies } from '@platform/main'
import { checkPassword, updatePhoto } from "../api";
export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NAlert,
    NForm,
    NFormItem,
    NCard,
    NSpin,
    NInput,
    NInputGroup,
    NButton,
    NwIcon,
    NList,
    NListItem,
    NSelect,
    NModal,
    NUpload,
    NUploadDragger,
    NIcon,
    NAvatar,
    NP,
    NMessageProvider,
  },
  emits: ["callback"],
  setup(prop, context) {
    // 模态加载状态
    const isLoading = ref(false);
    // 模态框 显示控制
    const isShow = ref(false);
    const token = Cookies.get("token")
    const tokenType = Cookies.get("tokenType")
    const fileId = ref("");
    const imgUrl = ref("");
    const message = useMessage();

    // 是否上传
    const isUploadAv = ref(false);
    const handleFinish = () => {
      let { code, data, msg } = JSON.parse(event.target.response);
      if (code == 200) {
        message.success("上传成功");
        isUploadAv.value = true;
      } else {
        message.error(msg);
      }
      isLoading.value = false;
      imgUrl.value = data.fileUrl;
      fileId.value = data.fileUrl;
    };
    const beforeUpload = () => {
      isLoading.value = true;
    };

    // 用户的id
    let id = "";
    // 从db中获取用户信息
    Db.get("userInfo").then((res) => {
      console.log("userInfo", res);
      id = res.id;
    });
    return {
      uploadUrl:`${window.apiBaseURL}/main/fileinfo?fileSource=portal`,
      token,
      tokenType,
      isLoading,
      isShow,
      isUploadAv,
      imgUrl,
      handleFinish,
      beforeUpload,
      show() {
        isShow.value = true;
        // 重置
        imgUrl.value = "";
        isUploadAv.value = false;
      },
      updatePhoto() {
        isLoading.value = true;
        updatePhoto({
          id,
          photoFileId: fileId.value,
        })
          .then((res) => {
            console.log("updatePhoto===", res);
            if (res) {
              message.success("修改头像成功");
              isShow.value = false;
              context.emit("callback");
            } else {
              message.error("修改头像失败");
            }
          })
          .catch(() => {
            message.error("修改头像失败");
          })
          .finally(() => {
            isLoading.value = false;
          });
      },
    };
  },
});
</script>
<style lang='less'>
.pwd-title {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  &-label {
  }
}
.pwd-level {
  &-text {
    font-size: 12px;
  }
  &-proc {
    position: relative;
    width: 100px;
    height: 5px;
    background: #fff;
    border: 1px solid #333;
    &-fill {
      position: absolute;
      left: 0px;
      width: 0px;
      height: 5px;
      background: #ffeb3b;
    }
  }
}
</style>