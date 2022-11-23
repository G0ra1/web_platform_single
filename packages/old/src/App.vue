<template>
  <n-config-provider abstract :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import {
  NMessageProvider,
  NNotificationProvider,
  NConfigProvider,
  NDialogProvider,
  useNotification,
  zhCN,
  dateZhCN
} from 'naive-ui'
import { createWs, notification } from './store/index.js'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
</style>
