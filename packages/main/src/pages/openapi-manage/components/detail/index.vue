<template>
  <n-config-provider
  abstract
  :theme-overrides="{}"
  >
      <n-layout class="fv-layout">
        <n-layout-header class="fv-layout-header">
          <div>{{InterfaceDetailBasicInfo.title}}</div>
          <n-button text @click="cancelInterfaceDetail"><nw-icon name="icon-n-y-thinclose" :size="14" /></n-button>
        </n-layout-header>
        <n-layout-content
          class="fv-layout-content"
        >
          <n-spin class="fv-spin" :show="InterfaceDetailIsLoading">
            <div style="padding: 25px;">
              <div :class="{
                'inf-summary': true,
                'post': true
              }">
                <div class="method">{{InterfaceDetailBasicInfo.method && InterfaceDetailBasicInfo.method.toLocaleUpperCase()}}</div>
                <div class="url">{{InterfaceDetailBasicInfo.url}}</div>
              </div>
              <div class="inf-accept">
                <div class="title">
                  请求数据类型
                </div>
                <div class="value">
                  {{InterfaceDetailBasicInfo.requestContentType}}
                </div>
                <div class="title">
                  响应数据类型
                </div>
                <div class="value">
                  [{{InterfaceDetailBasicInfo.responsesContentType}}]
                </div>
              </div>
              <div class="inf-title">
                接口描述
              </div>
              <div class="inf-content">
                {{InterfaceDetailBasicInfo.description}}
              </div>
              <div v-show="!!InterfaceDetailRequestParamsDemo" class="inf-title">
                请求示例
              </div>
              <div v-show="!!InterfaceDetailRequestParamsDemo" style="margin: 10px 0">
                <RequestDemo />
              </div>
              
              <div class="inf-title">
                请求参数
              </div>
              <div style="margin: 10px 0">
                <RequestParams />
              </div>
              <div class="inf-title">
                响应状态
              </div>
              <div style="margin: 10px 0">
                <ResponsesStatus />
              </div>
              <div class="inf-title">
                响应参数
              </div>
              <div style="margin: 10px 0">
                <ResponsesParams />
              </div>
              <div class="inf-title">
                响应示例
              </div>
              <div style="margin: 10px 0">
                <ResponsesDemo />
              </div>
            </div>
          </n-spin>
        </n-layout-content>
        <!-- <n-layout-footer class="fv-layout-footer">
          <n-button size="small" >触发按钮</n-button>
        </n-layout-footer> -->
      </n-layout>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSelect,
  NSpin,
  NModal,
} from 'naive-ui'
import { NwIcon } from '@platform/main'

import {
  InterfaceDetailRequestParamsDemo,
  InterfaceDetailIsLoading,
  InterfaceDetail,
  InterfaceDetailBasicInfo,
  cancelInterfaceDetail
} from '../../store'

import ResponsesStatus from './responses-status.vue'
import ResponsesParams from './responses-params.vue'
import RequestParams from './request-params.vue'
import RequestDemo from './request-demo.vue'
import ResponsesDemo from './responses-demo.vue'

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NSelect,
    NwIcon,
    ResponsesStatus,
    RequestParams,
    ResponsesParams,
    RequestDemo,
    ResponsesDemo
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const text = ref('')
    const visible = ref(false)
    const handleModal = () => {
      visible.value = true
      // MechanismModalRef.value.show()
    }
    if (props.value) {
      // queryById(props.value).then(d => {
      //   console.log('===============', d)
      // })
      if (props.text) {
        text.value = props.text
      } else {
        
      }
    }
    return {
      InterfaceDetailRequestParamsDemo,
      InterfaceDetailIsLoading,
      InterfaceDetailBasicInfo,
      cancelInterfaceDetail,
      InterfaceDetail,
      text,
      visible,
      props,
      handleModal,
      callback (f, d, t) {
        if (f) {
          context.emit('update:value', d)
          context.emit('update:text', t)
          text.value = t
          nextTick().then(() => {
            visible.value = false
          })
        }
      },

      theme: {
                  
        Button: {
          heightSmall: '22px',
          fontSizeSmall: '12px',
          // 蓝色按钮
          // colorInfo: '#0E639C',
          // borderInfo: '#0E639C',
          // // 灰色默认
          // textColor: '#b9b9b9',
          // textColorText: '#b9b9b9',
          // border: '#0000000',
          // borderHover: '1px solid #0000000',
          // textColorHover: '#ccc',
        },
        Dialog: {
          // color: '#2b2b2b',
          // titleTextColor: '#ccc',
          iconMargin: '0 3px 0 0',
          titleFontSize: '14px',
          titleFontWeight: 'bold',
          titleTextColor: '#5e5e5e',
          iconSize: '14px',
          padding: '2px 5px',
          closeSize: '14px',
          closeMargin: '5px',
          contentMargin: '0',
          // textColor: '#ccc'
        },
        Modal: {
          boxShadow: '1px 0px 7px 1px #00000060',
          // textColor: '#ccc'
        }
      }
    }

  }
}
</script>

<style lang='less' scoped>
.fv {
  &-dialog {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-spin {
    height: 100%;
    :deep(.n-spin-content) {
      height: 100%;
    }
  }
  &-layout {
    height: 100%;
    &-header {
      font-size: 16px;
      text-indent: 5px;
      font-weight: bold;
      height: 36px;
      border-bottom: 1px solid rgb(228, 228, 228);
      background: #fafafa;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
    }
    &-content {
      height: calc(~'100% - 36px');
      // overflow: hidden;
      // padding: 0 25px;
    }
    &-footer {
      padding: 0 5px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid rgb(228, 228, 228);
      .message-info {

      }
    }
  }
}
// 接口
.inf {

  &-summary {
    display: flex;
    // background: #ccc;
    height: 32px;
    align-items: center;
    border-radius: 4px;
    overflow: hidden;
    >.method {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 10px;
      color: #fff;
      font-weight: bold;
    }
    >.url {
      padding-left: 20px;
    }
    &.post {
        background: #49cc9020;
      >.method {
        background: #49cc90
      }
    }
    &.put {
      // #fca130
        background: #fca13020;
      >.method {
        background: #fca130
      }
    }
    &.get {
      // #61affe
        background: #61affe20;
      >.method {
        background: #61affe
      }
    }
    &.delete {
      // #fca130
        background: #fca13020;
      >.method {
        background: #fca130
      }
    }
  }
  &-accept {
    display: flex;
    padding: 10px;
    >.title {
      font-weight: bold;
      font-size: 14px;

    }
    >.value {
      padding: 0 20px;
      color: #888;
    }
  }
  &-title {
    border-left: 4px solid #00ab6d;
    padding-left: 5px;
    font-size:14px;
    font-weight: bold;
    margin-top: 5px;
  }
  &-content {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    font-size:12px;
  }
}
</style>