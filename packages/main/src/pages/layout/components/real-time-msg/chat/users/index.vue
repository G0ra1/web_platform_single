<template>
  <div>
    <div style="height: 48px;background: green">
    
    </div>
    <div>
      最近的联系人
    </div>
    <!-- <n-collapse>
      <n-collapse-item title="张三" name="1">
        一周小结：行动是打破平庸最好的回击
        <template #header-extra>
          本周工作日工作时长：58 小时
        </template>
      </n-collapse-item>
      <n-collapse-item title="李四" name="2">
        一周小结：勤奋是获取成功的唯一捷径
        <template #header-extra>
          本周工作日工作时长：62 小时
        </template>
      </n-collapse-item>
      <n-collapse-item name="3">
        <n-text type="error">
          一周小结：生产队的驴都不敢这么休息，建议优化
        </n-text>
        <template #header>
          <n-text type="error">
            王五
          </n-text>
        </template>
        <template #header-extra>
          <n-text type="error">
            本周工作日工作时长：45 小时
          </n-text>
        </template>
      </n-collapse-item>
    </n-collapse> -->
  </div>
</template>
<script lang="tsx">
import { defineComponent, ref,reactive,onMounted  } from 'vue'
import { 
  NCollapse,
  NCollapseItem
} from 'naive-ui'
import { NwIcon, NwDic, NwIconPick } from '@platform/main';

export default defineComponent({
  components: {
    NCollapse,
    NCollapseItem
  },
  // props: {
      
  // },

  setup (props,context) {

    
    // document.body.style.setProperty
  
    return {
    }
  }
})
</script>
<style lang="less">
 
</style>