
<template>

  <template v-if="isSsoLogin">
    <div class="sso-warpper" v-if="logFlag === 'error'">
      <div class="sso-login">
        <div class="sso-login-box">
          <!-- <nw-icon v-if="logFlag === 'loading'" class="loading" name="icon-y-loading" :size="30" />
          <nw-icon v-if="logFlag === 'success'" name="icon-n-n-yes" :size="30" color="#238551" /> -->
          <nw-icon v-if="logFlag === 'error'" name="icon-n-n-error" :size="30" color="#CD4246" />
          <!-- <span v-if="logFlag === 'loading'">登录中...</span>
          <span v-if="logFlag === 'success'">登录成功</span> -->
          <span v-if="logFlag === 'error'">登录失败</span>
        </div>
        <div class="sso-login-text">
          {{ logText }}
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <n-message-provider>
      <div class="warpper">
        <div class="login-bg">

        </div>
        <!-- <EditPwd ref="EditPwdRef" /> -->
        <LoginForm @callback="callback" />
      </div>
    </n-message-provider>
  </template>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, nextTick } from 'vue'
import {
  NForm,
  NFormItem,
  NFormItemGi,
  NButton,
  NMessageProvider,
  NSpin
} from 'naive-ui'
import LoginForm from './components/login-form.vue'
//import EditPwd from './components/edit-pwd.vue'

import { Utils, request, NwIcon } from '@platform/main'
// import './api/particleScript/dat.gui.min.js'
// import particle from './api/particleScript/script'

import { login } from './api/index'
export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NFormItemGi,
    NButton,
    LoginForm,
    // EditPwd,
    NMessageProvider,
    NSpin,
    NwIcon
  },
  setup() {
    const EditPwdRef = ref()
    const params = Utils.parseQuery(window.location.search.substring(1))
    const defaultUrl = window.localStorage.getItem('default-url')!

    const isSsoLogin = params.ssoUserLoginName || params.hbToken

    const logFlag = ref('loading')
    const logText = ref('')
    if (params.ssoUserLoginName && params.callback) {
        
      login('ssologin').then(d => {

        window.location.href = window.atob(params.callback)

      }).catch((error) => {
        window.opener.dispatchEvent(new CustomEvent('onSsoLogin', {
          detail: {
            state: 'error',
            text: error
          }
        }))
        logFlag.value = 'error'
        logText.value = error
      }).finally(() => {


      })

      //window.open(`/web-main/pages/login2.html?ssoUserLoginName=${params.ssoUserLoginName}&isNewTab=1`)
    } else if (params.ssoUserLoginName && !params.isNewTab) {
      // 这里监听
      window.addEventListener('onSsoLogin', (d: any) => {
        logFlag.value = d.detail.state
        logText.value = d.detail.text
      })
      window.open(`/web-main/pages/login2.html?ssoUserLoginName=${params.ssoUserLoginName}&isNewTab=1`)

    } else if (params.ssoUserLoginName && params.isNewTab) {
      login('ssologin').then(d => {
        window.opener.dispatchEvent(new CustomEvent('onSsoLogin', {
          detail: {
            state: 'success',
            text: '登录成功，请在弹出页面中使用系统'
          }
        }))
        window.location.href = defaultUrl
        // logFlag.value = 'success'
        // logText.value = '登录成功，请在弹出页面中使用系统'
      }).catch((error) => {
        window.opener.dispatchEvent(new CustomEvent('onSsoLogin', {
          detail: {
            state: 'error',
            text: error
          }
        }))
        logFlag.value = 'error'
        logText.value = error
      }).finally(() => {


      })
    } else if (params.hbToken) {
      // hb
      login('hblogin').then(d => {
        window.location.href = defaultUrl
      }).catch((error) => {
        logFlag.value = 'error'
        logText.value = error
      }).finally(() => {
      })
    } else {
      // nextTick().then(() => {
      //   particle()
      // })
    }
    return {
      EditPwdRef,
      logText,
      logFlag,
      isSsoLogin,
      callback(msg: string) {
        EditPwdRef.value.show()
      },
      login() {

      }
    }

  }
})
</script>

<style scoped lang="less">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.sso-warpper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ccc;
  width: 100vw;
  height: 100vh;

  >.sso-login {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 120px;
    background-color: #fff;
    box-shadow: 0px 0px 3px 0px #1d1d1d;

    >.sso-login-box {

      display: flex;
      justify-content: center;
      align-items: center;

      >.loading {

        animation: rotate .3s linear infinite;
      }

      >.icon {
        margin-right: 10px;
      }
    }

    >.sso-login-text {
      position: absolute;
      bottom: 5px;
      left: 5px;
      font-size: 12px;
      // color:#CD4246;
    }
  }
}

.warpper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  position: relative;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

canvas {
  display: block;
}

.login-bg {
  position: absolute;
  width: 1152px;
  height: 721px;
  left: 140px;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  overflow: hidden;
  background: #007aff;
  background: url('/login-bg@2x.png');
  background-size: cover;
}
</style>
