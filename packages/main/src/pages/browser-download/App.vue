<template>
  <div style="padding: 10px;color:red">
    当前浏览器有可能出现兼容问题，请下载以下浏览器使用系统
  </div>
  <div class="browser-dw">
    <div class="browser-dw-card">
      <div class="icon">
        <img src="/360cs.webp" />
        <h3>360急速浏览器</h3>
      </div>
      <div class="download">
        <div class="dw-btn">
          <a :href="Dw360csexlocal">本地下载</a>
        </div>
        <div class="dw-btn">
          <a :href="Dw360csex">官方下载</a>
        </div>
      </div>
    </div>
    <div class="browser-dw-card">
      <div class="icon">
        <img src="/chrome.jpeg" />
        <h3>Chrome浏览器</h3>
      </div>
      <div class="download">
        <div class="">
          <a :href="DwChromelocal">本地下载</a>
        </div>
        <div>
          <a :href="DwChrome">官方下载</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted, inject, provide } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

// https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7BD023BC9D-1EE9-A459-55A5-9BA163B76A38%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe
import {
  NwIcon, RequestPaging, VxeHelper, request, NwPickAny
} from '@platform/main'

export default defineComponent({
  props: {
    
  },
  components: {
    NwIcon
  },
  setup(props, context) {

    const DwChrome = ref('https://dl.google.com/tag/s/appguid%3D%7B8A69D345-D564-463C-AFF1-A69D9E530F96%7D%26iid%3D%7BD023BC9D-1EE9-A459-55A5-9BA163B76A38%7D%26lang%3Dzh-CN%26browser%3D4%26usagestats%3D1%26appname%3DGoogle%2520Chrome%26needsadmin%3Dprefers%26ap%3Dx64-stable-statsdef_1%26installdataindex%3Dempty/update2/installers/ChromeSetup.exe')
    const DwChromelocal = ref(`/web-main/browser/ChromeSetup.exe`)

    const Dw360csex = ref('https://down.360safe.com/cse/360csex_setup.exe')
    const Dw360csexlocal = ref(`/web-main/browser/360csex_setup.exe`)
    return {
      Dw360csexlocal,
      Dw360csex,
      DwChromelocal,
      DwChrome,
      theme: {

      }
    }
  }
})

</script>

<style  lang='less' >
body {
  background-color: #d7d7d7;
}
.browser-dw {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  &-card {
    background-color: #fff;
    margin: 30px;
    width: 280px;
    height: 350px;
    box-shadow: 1px 1px 4px 1px rgb(143, 143, 143);
    >.icon {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      text-align: center;
      width: 100%;
      height: 220px;
      margin-top: 40px;
      > img {
        height: 120px;
      }
    }
    >.download {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
