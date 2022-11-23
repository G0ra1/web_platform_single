<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button  size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <nw-dic
    size="small"
    :request="{
      XHR: queryAllDefType,
      params: {},
    }"
    :response="{
      dataMethod: (res) =>
        res.map(({ id: value, procdefTypeName: label }) => ({
          value,
          label,
        })),
    }"
    placeholder="请选择门户"
  />
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
import {
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
} from 'naive-ui'
import { NwIcon } from '@platform/main'
import { queryAll as queryAllDefType } from '../../../../procdeftype/api/index'
import { NwDic } from '@platform/main'

export default {
  components: {
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NwDic
  },
  props:{
    size: {
      type: String,
      default: 'small'
    }
  },
  setup(props){
    // queryProcdeftype()
    return {
      props,
      queryAllDefType
    }
  }
}
</script>

<style lang='less'>
  .header-menu {
    display: inline-flex;
    align-items: center;
    // width: 100%;
    height: 100%;
    padding: 0 5px;
  }
</style>