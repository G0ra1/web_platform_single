
<template>
  <n-message-provider>
    <div class="warpper">
      <div style="position: absolute;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow:hidden;
      background: #007aff;">
        <canvas class="canvas" width="1920" height="970"></canvas>
        
      </div>
      <LoginForm @callback="callback" />
    </div>
  </n-message-provider>
</template>
<script lang="ts">
import { ref, defineComponent, onMounted, nextTick } from 'vue'
import {
  NForm,
  NFormItem,
  NFormItemGi,
  NButton,
  NMessageProvider,
  NSpin,
} from 'naive-ui'
import LoginForm from './components/login-form.vue'
// import './api/particleScript/dat.gui.min.js'
import particle from './api/particleScript/script'
export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NFormItemGi,
    NButton,
    LoginForm,
    NMessageProvider,
    NSpin,
  },
  setup() {
    const loading = ref<boolean>(false)
    // onMounted(() => {
    //   setTimeout(particle, 1000)
    // })
    nextTick().then(() => {
      particle()
    })
    return {
      callback(loginData: any) {

      },
      login() {

      }
    }

  }
})
</script>

<style scoped>
.warpper {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 100%;
  padding-right: 100px;
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
</style>
