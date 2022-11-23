<template>
  <n-card class="portal-panel p-schedule" :bordered="false" size="small">
    <template #header>
      <span @click="clickHandel">我的日程</span>
    </template>
    <schedulePanel type="mySchedule"></schedulePanel>
  </n-card>
</template>

<script lang="jsx">
import { h, defineComponent, ref, reactive, onMounted, } from 'vue'
import { request } from '@platform/main'
import {
  NCard
} from 'naive-ui'
import { schedulePanel } from '@platform/smm';
export default defineComponent({
  components: {
    schedulePanel,
    NCard
  },
  setup(props) {
    const clickHandel = () => {
      // window.parent.location.href
      window.parent.location.hash = '#frame/date-manage'
    }
    onMounted(() => {

    })
    return {
      clickHandel
    }
  }
})
</script>
<style lang='scss'>
$vxe-table-row-height-mini: 16px !default;
</style>
<style lang='less'>
.p-schedule.n-card {
  position: relative;
  padding: 20px;
  // height: 875px !important;
  overflow: hidden;

  .n-card-header {
    padding: 0px;

    .n-card-header__main {
      font-size: 16px;
      font-family: Alibaba PuHuiTi 2.0;
      color: #C91019;
      padding-left: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1412);
      cursor: pointer;
    }
  }

}
</style>