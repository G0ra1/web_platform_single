
<script lang="tsx">
import { request, NwIcon } from '@platform/main';
import {
  NFormItem,
  NInputGroup,
  NInputGroupLabel,
  NInput,
  FormItemRule
} from "naive-ui";

import { h, ref, reactive, computed, defineComponent, watch, onMounted, toRef, watchEffect } from "vue";
// 这里修改为默认
export default defineComponent({
  props: {
    slotProps: {
      type: Object,
      default: () => ({})
    },
    dataModel: {
      type: Object,
      default: () => ({})
    },
    render: {
      type: Function,
      default: () => (() => {})
    }
  },
  components: {
    NwIcon,
    NFormItem,
    NInputGroup,
    NInputGroupLabel,
    NInput
  },
  emits: ['update:value'],
  setup(props, context) {
    // console.log('=====props.render======', props.render, props.slotProps.row)
    // console.log('=====props.render1======', props.render(props.dataModel, props.slotProps, h))
    // return () => 'Test'
    return () => props.render(props.dataModel, props.slotProps, h)
  },
});
</script>

<style lang='less'>
</style>