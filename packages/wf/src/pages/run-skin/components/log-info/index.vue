<template>
  <div class="skin-card">
    <div class="title" style="display: flex;justify-content: space-between;">
    <div>
      <nw-icon name="icon-y-log" :size="22" />
      流程日志
    </div>
    <div style="padding: 0 10px;">
      <n-button @click="handleModal" type="primary" text>详情</n-button>
    </div>
    </div>
    <div class="content" style="padding: 10px 0 0 10px;">
      <n-spin :show="isLoading">
        <n-scrollbar ref="Scrollbar" style="height: 180px">
          <n-timeline
            size="medium" 
            :icon-size="16"
          >
            <n-timeline-item
              v-for="item in LogData"
              :key="item.id"
              :type="item.type === 2 ? 'error' : 'success'"
              :title="`${item.nodeName}: ${item.userNameCh}`"
              :content="item.description ? `意见:${item.description}` : ''"
              :time="item.startTime"
            >
              <template #icon>
                <nw-icon
                  v-if="item.type === 0"
                  name="icon-y-sealtime"
                />
                <nw-icon
                  v-if="item.type === 1"
                  name="icon-n-n-yes"
                  color="green"
                />
                <nw-icon
                  v-if="item.type === 2"
                  name="icon-n-n-error"
                  color="red"
                />
              </template>
            </n-timeline-item>
            <!-- <n-timeline-item
              type="error"
              content="哪里错误"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="warning"
              title="警告"
              content="哪里警告"
              time="2018-04-03 20:46"
            />
            <n-timeline-item
              type="info"
              title="信息"
              content="是的"
              time="2018-04-03 20:46"
            /> -->
          </n-timeline>
        </n-scrollbar>
      </n-spin>
    </div>
  </div>
  <log-modal ref="LogModalRef" />
</template>

<script lang="tsx">
import {
  h,
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
} from "vue";

import { NwIcon } from "@platform/main";

import { queryLog } from "../../api/index";

import LogModal from "./logModal.vue";

import { NButton, NScrollbar, NTimeline, NTimelineItem, NSpin } from 'naive-ui'

export default defineComponent({
  components: {
    NButton,
    NScrollbar,
    NTimeline,
    NTimelineItem,
    NSpin,
    LogModal,
    NwIcon,
  },
  setup(props, context) {
    const isLoading = ref<boolean>(false)
    const Scrollbar = ref();
    const LogModalRef = ref();
    const LogData = ref<Array<any>>([])

    return {
      isLoading,
      Scrollbar,
      LogModalRef,
      LogData,
      handleModal () {
        LogModalRef.value.show(LogData.value)
      },
      setCamundaProcinsId: async (id: string) => {
        isLoading.value = true
        return queryLog(id).then((res: any) => {
          console.log('-=queryLog-=-=', res)
          LogData.value = res.map((d: any) => {
            return {
              id: d.id,
              type: d.type,
              nodeType: d.nodeType,
              nodeId: d.nodeId,
              nodeName: d.nodeName,
              updateTime: d.updateTime,
              startTime: d.startTime,
              userNameCh: d.userNameCh,
              orgName: d.orgName,
              deptName: d.deptName,
              description: d.description
            }
          })
          return true
        }).catch(error => {
          return false
        }).finally(() => {
          isLoading.value = false
          
          nextTick().then(() => {
            Scrollbar.value.scrollBy(0, 999);
          });
        })
      },
    };
  },
});
</script>
<style lang="less"></style>
