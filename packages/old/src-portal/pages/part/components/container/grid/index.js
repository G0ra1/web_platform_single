
// 组件
export default {
  key: 'Grid',
  tagName: 'n-grid',
  label: '栅格',
  code: `<n-grid x-gap="0" :cols="24">
  <n-gi :span="12" :style="{
    height: 'auto'
  }">
    <!-- 这里加入内容 -->
  </n-gi>
  <n-gi :span="12" :style="{
    height: 'auto'
  }">
    <!-- 这里加入内容 -->
  </n-gi>
</n-grid>` // 
}