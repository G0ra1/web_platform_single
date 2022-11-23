<template>
  <n-modal v-model:show="isShow" :mask-closable="false">
    <n-spin :show="isLoading">
      <n-card
        style="width: 600px"
        title="修改密码"
        :bordered="false"
        size="small"
      >
        <template #header-extra></template>
        <n-form
          :label-width="80"
          :model="formValue"
          size="medium"
          ref="formRef"
          style="margin: 0 50px; width: 400px"
        >
          <!-- <n-form-item
            label="原密码"
            path="oldPwd"
            :validation-status="inputValidationOldPwd"
            :feedback="inputFeedbackOldPwd"
          >
            <n-input
              ref="RefOldPwd"
              :disabled="isForce"
              type="password"
              v-model:value="formValue.oldPwd"
              placeholder="输入原密码"
              :loading="loadingOldPwd"
              @update:value="onInputOldPwd"
            />
            <nw-icon
              v-if="isRightOldPwd"
              name="icon-duigou"
              :size="24"
              style="margin-left: 5px;"
              color="#18a058"
            />
          </n-form-item> -->
          <n-form-item label="手机号码" path="phone">
            <n-input
              v-model:value="formValue.phone"
              placeholder="输入手机号码"
            />
          </n-form-item>
          <n-form-item path="verifyCode" label="验证码">
            <n-input
              v-model:value="formValue.verifyCode"
              placeholder="请输入验证码"
              style="--padding-left: 5px"
            >
              <template #suffix>
                <span
                  :class="{ yanzheng: true, yanzhengmadis: codeSecond != 0 }"
                  @click="getSMSCode"
                  >点击获取验证码</span
                >
              </template>
            </n-input>
          </n-form-item>
          <div class="yanzhengmatishi" v-if="codeSecond != 0">
            {{ codeSecond }}s后重试
          </div>
          <n-form-item
            path="newPwd"
            :validation-status="inputValidationNewPwd"
            :feedback="inputFeedbackNewPwd"
          >
            <template #label>
              <div class="pwd-title">
                <div class="pwd-title-label">设置新密码</div>
                <div v-if="formValue.newPwd" class="pwd-level">
                  <div class="pwd-level-text">
                    密码强度: {{ pwdLevel.levelText }}
                  </div>
                  <div class="pwd-level-proc">
                    <div
                      class="pwd-level-proc-fill"
                      :style="{
                        background: pwdLevel.color,
                        width: `${pwdLevel.width}px`,
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </template>
            <n-input
              ref="RefNewPwd"
              placeholder="输入新密码"
              type="password"
              v-model:value="formValue.newPwd"
              show-password-on="click"
              @update:value="
                () => {
                  formValue.newPwd2 = '';
                  inputValidationNewPwd2 = '';
                  inputFeedbackNewPwd2 = '';
                  isRightPwd = false;
                }
              "
            />
            <nw-icon
              v-if="isRightPwd"
              name="icon-duigou"
              :size="24"
              style="margin-left: 5px"
              color="#18a058"
            />
          </n-form-item>
          <n-form-item
            label="确认新密码"
            path="newPwd2"
            :validation-status="inputValidationNewPwd2"
            :feedback="inputFeedbackNewPwd2"
          >
            <n-input
              ref="RefNewPwd2"
              type="password"
              show-password-on="click"
              :disabled="pwdLevel.level <= 1"
              placeholder="再次输入密码"
              v-model:value="formValue.newPwd2"
              @update:value="onBlurPwd2"
            />
            <nw-icon
              v-if="isRightPwd"
              name="icon-duigou"
              :size="24"
              style="margin-left: 5px"
              color="#18a058"
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            "
          >
            <div>
              <n-alert v-if="isForce" type="warning" style="width: 270px">
                请先为您的账户设置一个新密码
              </n-alert>
            </div>
            <div style="text-align: right">
              <n-button
                :disabled="!isRightPwd"
                size="small"
                type="primary"
                style="margin-right: 5px"
                @click="verificationCodeFn"
                >修改</n-button
              >
              <n-button v-if="!isForce" size="small" @click="isShow = false"
                >关闭</n-button
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

  useMessage
} from "naive-ui";
import { NwIcon, Db } from '@platform/main'
import aes from "./aes.js";
import {
  checkPassword,
  updatePassword,
  sendSMSCode,
  verificationCode,
} from "../api";

const checkPwd = (password) => {
  // 级别颜色
  const colors = ["#f44336", "#ff9800", "#ff9800", "#8bc34a", "#8bc34a"];
  const levelText = ["极弱", "弱", "一般", "高", "极高"];
  if (password.length < 8) {
    return {
      level: 0,
      color: colors[0],
      width: 0,
      text: "密码至少8位字符",
      levelText: levelText[0],
    };
  }
  let ls = 0;
  let text = [];
  if (password.match(/([a-z])+/)) {
    ls++;
  } else {
    text.push("小写字母");
  }
  if (password.match(/([0-9])+/)) {
    ls++;
  } else {
    text.push("数字");
  }
  if (password.match(/([A-Z])+/)) {
    ls++;
  } else {
    text.push("大写字母");
  }
  if (password.match(/[^a-zA-Z0-9]+/)) {
    ls++;
  } else {
    text.push("符号");
  }
  return {
    color: colors[ls],
    width: ls * 25,
    level: ls,
    levelText: levelText[ls],
    text,
  };
};
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
  },
  setup() {
    // 模态框 显示控制
    const isShow = ref(false);

    // 原密码反抖动
    let timeout = null;
    const message = useMessage();
    
    // 旧密码 验证状态
    const inputValidationOldPwd = ref("");
    const inputFeedbackOldPwd = ref("");
    // 输入框实例
    const RefOldPwd = ref(null);
    const RefNewPwd = ref(null);
    const RefNewPwd2 = ref(null);

    // 模态加载状态
    const isLoading = ref(false);
    // 旧密码验证是否通过
    const isRightOldPwd = ref(false);
    // 旧密码验证请求中
    const loadingOldPwd = ref(false);

    // 为true时可以发起修改
    const isRightPwd = ref(false);
    // 是否强制 为true时 不可关闭，原密码不可输入
    const isForce = ref(false);
    // 用户的id
    let id = "";
    // 从db中获取用户信息
    Db.get("userInfo").then((res) => {
      console.log("userInfo", res);
      id = res.id;
      // if (res.password === setting.defaultPwd) {
      //   isForce.value = true;
      //   isShow.value = true;
      //   formValue.oldPwd = "123456";
      //   // 直接让密码框获取焦点
      //   nextTick().then((res) => {
      //     RefNewPwd.value.focus();
      //   });
      // } else {
      // }
    });
    // 表单
    const formValue = reactive({
      oldPwd: "",
      newPwd: "",
      newPwd2: "",
      phone: "",
    });
    //
    const pwdLevel = ref({
      color: "#000",
      width: 0,
      level: 0,
    });
    const inputValidationNewPwd2 = ref("");
    const inputFeedbackNewPwd2 = ref("");
    const codeSecond = ref(0);
    const getSMSCode = () => {
      if (codeSecond.value != 0) return;
      codeSecond.value = 60;
      const codeSecondTimer = setInterval(() => {
        codeSecond.value--;
        if (codeSecond.value <= 0) {
          codeSecond.value = 0;
          clearInterval(codeSecondTimer);
        }
      }, 1000);
      const myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (myreg.test(formValue.phone)) {
        sendSMSCode(formValue.phone)
          .then((res) => {})
          .catch((e) => {
            codeSecond.value = 0;
            clearInterval(codeSecondTimer);
            message.error(e.message);
          });
      } else {
        message.error("请输入正确的手机号码");
        codeSecond.value = 0;
      }
    };
    const updatePasswordFn = () => {
      isLoading.value = true;
      updatePassword({
        id,
        passWord: aes.encrypt(formValue.newPwd),
        phoneNumber: formValue.phone,
      })
        .then((res) => {
          console.log("updatePassword===", res);
          if (res) {
            message.success("修改密码成功");
            isShow.value = false;
          } else {
            message.error("修改密码失败");
          }
        })
        .catch(() => {
          message.error("修改密码失败");
        })
        .finally(() => {
          isLoading.value = false;
        });
    };
    const verificationCodeFn = () => {
      verificationCode({
        phoneNumber: formValue.phone,
        code: formValue.verifyCode,
      })
        .then((res) => {
          updatePasswordFn();
        })
        .catch((err) => {
          message.error(err.message);
        });
    };
    //
    return {
      codeSecond,
      getSMSCode,

      RefOldPwd,
      RefNewPwd,
      RefNewPwd2,

      inputValidationOldPwd,
      inputFeedbackOldPwd,

      loadingOldPwd,
      isRightOldPwd,
      isLoading,
      isRightPwd,
      pwdLevel,
      isForce,
      isShow,
      formValue,
      updatePasswordFn,
      verificationCodeFn,
      show() {
        isShow.value = true;
        // 重置
        inputValidationOldPwd.value = "";
        inputFeedbackOldPwd.value = "";

        inputValidationNewPwd2.value = "";
        inputFeedbackNewPwd2.value = "";

        isRightOldPwd.value = false;
        loadingOldPwd.value = false;
        isRightPwd.value = false;
        isForce.value = false;
        formValue.oldPwd = "";
        formValue.newPwd = "";
        formValue.oldPwd = "";
      },
      onInputOldPwd(d) {
        // 输入原始密码
        clearTimeout(timeout);
        // qingc

        inputValidationOldPwd.value = "";
        inputFeedbackOldPwd.value = "";
        timeout = setTimeout(() => {
          // 抖动
          loadingOldPwd.value = true;
          checkPassword({
            id,
            passWord: aes.encrypt(formValue.oldPwd),
          })
            .then((res) => {
              if (res) {
                isRightOldPwd.value = true;
                nextTick().then((res) => {
                  RefNewPwd.value.focus();
                });
              } else {
                isRightOldPwd.value = false;
                inputValidationOldPwd.value = "error";
                inputFeedbackOldPwd.value = "密码错误";
              }
            })
            .finally(() => {
              loadingOldPwd.value = false;
            });
        }, 500);
      },
      inputValidationNewPwd: computed(() => {
        pwdLevel.value = checkPwd(formValue.newPwd);
        if (!formValue.newPwd) {
          return undefined;
        }
        if (pwdLevel.value.level <= 1) {
          return "error";
        } else if (pwdLevel.value.level === 2) {
          return undefined;
        } else {
          return undefined;
        }
      }),
      inputFeedbackNewPwd: computed(() => {
        let text = "";
        if (!formValue.newPwd) {
          text = "";
        } else if (pwdLevel.value.level === 0) {
          text = pwdLevel.value.text;
        } else if (pwdLevel.value.level <= 1) {
          text = `当前密码强度过低, 请继续输入 ${pwdLevel.value.text} 提高强度`;
        } else if (pwdLevel.value.level < 4) {
          text += `可以继续输入 ${pwdLevel.value.text} 提高强度`;
        }
        return text || ""; // (formValue.newPwd ? '' : '请输入新密码')
      }),
      inputValidationNewPwd2,
      inputFeedbackNewPwd2,
      onBlurPwd2() {
        if (formValue.newPwd !== formValue.newPwd2) {
          inputValidationNewPwd2.value = "error";
          inputFeedbackNewPwd2.value = "两次输入不一致";
        } else {
          inputValidationNewPwd2.value = "";
          inputFeedbackNewPwd2.value = "";
          isRightPwd.value = true;
        }
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
.yanzheng {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #2ea4fa;
  cursor: pointer;
  position: relative;
  z-index: 99;
}
.yanzhengmadis {
  color: #ccc;
}
.yanzhengmatishi {
  text-align: right;
  margin-top: -30px;
  padding-right: 20px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #aaaaaa;
  line-height: 48px;
}
</style>