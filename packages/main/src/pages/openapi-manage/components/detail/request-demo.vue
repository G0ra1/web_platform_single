<template>
  <NwCodeMirror :value="InterfaceDetailRequestParamsDemo" />
</template>

<script lang="jsx">
import { defineComponent, reactive, ref, h, computed, getCurrentInstance } from "vue";
import {
  NConfigProvider,
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  useMessage,
} from "naive-ui";

import { 
  InterfaceDetailRequestParamsDemo
} from '../../store/index.js' 

import { NwCodeMirror } from '@platform/main'

export default defineComponent({
  components: {
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NwCodeMirror
  },
  setup() {


    return {
      InterfaceDetailRequestParamsDemo
    };
  },
});
</script>
