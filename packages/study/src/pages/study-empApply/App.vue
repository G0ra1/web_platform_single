<template>
  <n-config-provider abstract :theme-overrides="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <Index />
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>
<script setup>
import theme from './theme.js'
import {
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NConfigProvider,
  zhCN,
  dateZhCN,
} from "naive-ui";
import Index from "./index.vue";
</script>

<style lang='less'>
</style>