<template>
  
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, nextTick, h } from 'vue'
import {
  NLayout,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NSelect,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

export default defineComponent({
  components: {
    NLayout,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NInputGroup,
    NSelect,
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi
  },
  setup () {
    const active = ref<boolean>(false)

    const show = () => {
      active.value = true
    }
    const cancel = () => {
      active.value = false
    }
    return {
      show,
      cancel,
      active,
    }
  }
})

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
