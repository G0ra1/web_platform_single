<template>
  <n-modal v-model:show="isShow">
    <n-spin :show="isLoading">
      <n-card
        style="width: 510px; height: 198px"
        title="修改手机号"
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
            border-radius: 4px;
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          "
        >
          <n-form label-placement="left">
            <n-form-item
              label="手机号"
              :validation-status="inputValidationStatus"
              :feedback="inputFeedback"
            >
              <n-input
                v-model:value="phone"
                placeholder="请输入手机号"
                clearable
              />
            </n-form-item>
          </n-form>
        </div>
        <template #footer>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            "
          >
            <div></div>
            <div style="text-align: right">
              <n-button
                size="small"
                style="margin-right: 20px; width: 88px"
                @click="isShow = false"
                >取消</n-button
              >
              <n-button
                :disabled="!isTest"
                size="small"
                type="primary"
                style="width: 88px"
                @click="updatePhoneNum"
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
  useMessage,
  NUpload,
  NUploadDragger,
  NIcon,
  NAvatar,
  NP,
} from "naive-ui";
import NwIcon from "/@/components/nw-icon/index.vue";
import db from "/@/utils/db.js";
import aes from "/@/utils/aes.js";
import setting from "/setting.js";
import { checkPassword, updatePhoneNum } from "../api";
import cookies from "/@/utils/cookies.js";
import Setting from "/setting";
function createStatus(value) {
  let b =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
      value
    );
  switch (b) {
    case true:
      return undefined;
    default:
      return "error";
  }
}

function createFeedback(value) {
  let b =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
      value
    );
  switch (b) {
    case true:
      return "手机号格式正确可以保存";
    default:
      return "手机号格式错误";
  }
}
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
  },
  emits: ["callback"],
  setup(prop, context) {
    const message = useMessage();
    // 模态加载状态
    const isLoading = ref(false);
    // 模态框 显示控制
    const isShow = ref(false);
    const token = cookies.get("token");
    const tokenType = cookies.get("tokenType");
    const phone = ref("");

    // 用户的id
    let id = "";
    // 从db中获取用户信息
    db.get("userInfo").then((res) => {
      console.log("userInfo", res);
      id = res.id;
    });
    return {
      uploadUrl: `${Setting.apiBaseURL}/main/fileinfo?fileSource=portal`,
      token,
      tokenType,
      isLoading,
      isShow,
      phone,
      show() {
        isShow.value = true;
        // 重置
        phone.value = "";
      },
      updatePhoneNum() {
        isLoading.value = true;
        updatePhoneNum({
          id,
          phoneNum: phone.value,
        })
          .then((res) => {
            console.log("updatePhoneNum===", res);
            if (res) {
              message.success("修改手机号成功");
              isShow.value = false;
              context.emit("callback");
            } else {
              message.error("修改手机号失败");
            }
          })
          .catch(() => {
            message.error("修改手机号失败");
          })
          .finally(() => {
            isLoading.value = false;
          });
      },
      inputValidationStatus: computed(() => {
        return createStatus(phone.value);
      }),
      inputFeedback: computed(() => {
        return createFeedback(phone.value);
      }),
      isTest: computed(() => {
        return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          phone.value
        );
      }),
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