
<template>
  <n-config-provider :themeOverrides="theme" :style="{
    height: '100%',
    width: '100%',
    padding: props.isLayout ? '0' : '10px',
    boxSizing: 'border-box'
  }">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <slot />
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script lang="ts">

import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'

import theme from '../../../theme'

import {
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NConfigProvider,
  NGlobalStyle
} from 'naive-ui'

export default defineComponent({
  props: {
    isLayout: {
      type: Boolean
    }
  },
  components: {
    NMessageProvider,
    NNotificationProvider,
    NDialogProvider,
    NConfigProvider,
    NGlobalStyle
  },
  setup(props) {
    return {
      props,
      theme
    }
  }
})

</script>
