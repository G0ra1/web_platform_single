<template>

  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
    </n-layout-header>
    <n-layout has-sider content-style="height: 100%">
      <iframe style="width: 100%;height: 100%;border: none;" :src="src"></iframe>
    </n-layout>
  </n-layout>

</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NForm,
  NFormItem,
  NSpin,
  NDrawerContent,
  NPopconfirm,
  useMessage,
  NLayoutSider,
  NSelect,
  NDatePicker
} from 'naive-ui'
import { query } from './api/index.js'
export default defineComponent({
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NTag,
    NInput,
    NInputGroup,
    NDrawer,
    NForm,
    NFormItem,
    NSpin,
    NDrawerContent,
    NPopconfirm,
    NLayoutSider,
    NSelect,
    NDatePicker
  },
  setup() {
    const src = ref('')
    onMounted(() => {
      query({}).then(res => {
        let field_id = res.filter(d => d.isShow == 1).map(d => d.fieldId).join(',')
        src.value = `http://192.168.0.196:8992/webroot/ReportServer?reportlet=WorkBook5.cpt&op=view&__showtoolbar__=false&clos=${field_id}`
      })
    })

    return {
      src
    }
  }
})

</script>
<style  lang='less'>
.n-spin-container {
  width: 100%;

  .n-spin-content {
    height: 100%;
  }
}
</style>