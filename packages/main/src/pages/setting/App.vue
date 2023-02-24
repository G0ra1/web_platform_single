<template>
  <div class="main-layout">
   <n-message-provider>
    <n-layout position="absolute">
      <n-layout-header style="font-size: 22px;padding: 10px;font-weight: bolder;" >
        个人信息设置  <nw-icon color='#215DB0' style='cursor: pointer;' :size="22" name="icon-n-y-logout" @click="callback" title='返回'/>
      </n-layout-header>
      <n-layout-content  :native-scrollbar="false">
        <div style="width: 500px; margin: 0 auto">
          <n-list class="user-form">
            <n-list-item>
              <template #prefix>
                <div class="user-form-prefix">头像</div>
              </template>
              <div class="user-form-content">
                <n-avatar :size="60" :src="`${avatarUrl}`"></n-avatar>
              </div>
              <template #suffix>
                <div class="user-form-suffix">
                  <a href="javascript: void(0)" @click="NwModalAvatar.show()"
                    >修改</a
                  >
                </div>
              </template>
            </n-list-item>

            <n-list-item>
              <template #prefix>
                <div class="user-form-prefix">手机号</div>
              </template>
              <div class="user-form-content">{{ phoneNum }}</div>
              <template #suffix>
                <div class="user-form-suffix">
                  <a href="javascript: void(0)" @click="NwModalPhone.show()"
                    >修改</a
                  >
                </div>
              </template>
            </n-list-item>

            <n-list-item>
              <template #prefix>
                <div class="user-form-prefix">邮箱</div>
              </template>
              <div class="user-form-content">{{ email }}</div>
              <template #suffix>
                <div class="user-form-suffix">
                  <a href="javascript: void(0)" @click="NwModalEmail.show()"
                    >修改</a
                  >
                </div>
              </template>
            </n-list-item>

            <n-list-item>
              <template #prefix>
                <div class="user-form-prefix">密码</div>
              </template>
              <div class="user-form-content">*********</div>
              <template #suffix>
                <div class="user-form-suffix">
                  <a href="javascript: void(0)" @click="NwModalPwd.show()"
                    >修改</a
                  >
                </div>
              </template>
            </n-list-item>
            
            <n-list-item>
              <template #prefix>
                <div class="user-form-prefix">风格样式</div>
              </template>
              <div class="user-form-content">{{ themeNameComputed }}</div>
              <template #suffix>
                <div class="user-form-suffix">
                  <a href="javascript: void(0)" @click="NwModalTheme.show()"
                    >修改</a
                  >
                </div>
              </template>
            </n-list-item>
          </n-list>
        </div>
      </n-layout-content>
    </n-layout>
    <NwModalPwd ref="NwModalPwd" />
    <NwModalAvatar ref="NwModalAvatar" @callback="mdmUserByIds" />
    <NwModalEmail ref="NwModalEmail" @callback="mdmUserByIds" />
    <NwModalPhone ref="NwModalPhone" @callback="mdmUserByIds" />
    <NwModalTheme ref="NwModalTheme" @callback="themeRefresh" />
    </n-message-provider>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, computed } from "vue";
import {
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NMessageProvider,
  NNotificationProvider,
  NConfigProvider,
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
  NAvatar,
  
} from "naive-ui";
import { mdmUserById, fileinfo } from "./api";
import { NwIcon, Db } from '@platform/main'
import NwModalPwd from "./modal/pwd.vue";
import NwModalAvatar from "./modal/avatar.vue";
import NwModalEmail from "./modal/email.vue";
import NwModalPhone from "./modal/phone.vue";
import NwModalTheme from "./modal/theme.vue";

import { Themes } from '../../theme/index'
export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
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
    NAvatar,
    NwModalPwd,
    NwModalAvatar,
    NwModalEmail,
    NwModalPhone,
    NwModalTheme,
    NMessageProvider
  },
  setup() {
    const NwModalPwd = ref(null);
    const NwModalAvatar = ref(null);
    const NwModalEmail = ref(null);
    const NwModalPhone = ref(null);
    const NwModalTheme = ref(null);
    const email = ref("");
    const phoneNum = ref("");
    const avatarUrl = ref("");
    const theme = ref('');
    const themeRefresh = () => {
      theme.value = window.localStorage.getItem('theme')
    }
    themeRefresh()
    const callback = () =>{
      window.history.go(-1)
    }
    Db.get("userInfo").then((res) => {
      let id = res.id;
      mdmUserById(id)
        .then((res) => {
          console.log("updateEmail===", res);
          setInfo(res);
          if (res) {
          } else {
            message.error("获取用户信息失败");
          }
        })
        .catch(() => {
          message.error("获取用户信息失败");
        })
        .finally(() => {});
    });
    const setInfo = (info) => {
      email.value = info.email;
      phoneNum.value = info.phoneNum;
      avatarUrl.value = info.photoFileId
      // fileinfo(info.photoFileId).then((res) => {
      //   console.log(res, "111111111111111111111111111111111");
      //   avatarUrl.value = res.fileUrl;
      // });
    };
    return {
      NwModalPwd,
      NwModalAvatar,
      NwModalEmail,
      NwModalPhone,
      NwModalTheme,
      theme,
      email,
      phoneNum,
      avatarUrl,
      callback,
      themeRefresh,
      themeNameComputed: computed(() => {
        const t = Themes.value.find(d => d.themeName === theme.value)
        return t ? t.themeLabel : '-'
      }),
      mdmUserByIds() {
        // 用户的id
        let id = "";
        // 从db中获取用户信息
        Db.get("userInfo").then((res) => {
          console.log(res,'info.photoFileId')
          id = res.id;
          mdmUserById(id)
            .then((res) => {
              console.log("updateEmail===", res);
              if (res) {
                setInfo(res);
              } else {
                message.error("获取用户信息失败");
              }
            })
            .catch(() => {
              message.error("获取用户信息失败");
            })
            .finally(() => {});
        });
      },
    };
  },
});
</script>
<style lang='less'>
.user-form {
  &-prefix {
    width: 60px;
  }
  &-suffix {
    width: 60px;
  }
}
</style>