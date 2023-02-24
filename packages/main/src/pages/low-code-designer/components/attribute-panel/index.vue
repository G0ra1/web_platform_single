<template>
  <n-layout class="nw-layout-full" style="background: none">
    <n-layout-header bordered class="attr-header" style="height: 32px">
      <!-- {{ActiveWidget.label}}
      {{TagName}} -->
      {{ Label }}{{ drawerActive ? '数据绑定' : ''}}

      <n-button size="tiny" @click="drawerActive = !drawerActive">
      
        {{ drawerActive ? '返回' : '数据绑定'}}
      </n-button>
      <!-- <n-tabs
        type="line"
        size="small"
        animated
        :tabs-padding="10"
        :theme-overrides="{
          tabGapSmallBar: '15px',
          tabGapSmallLine: '15px',
          tabFontWeight: 'bold'
        }"
      >
        <n-tab name="basic">
          {{ Label }}
        </n-tab>
        <n-tab name="vmodel">
          数据绑定
        </n-tab>
      </n-tabs> -->
    </n-layout-header>
    <n-layout-content
      ref="AttrContent"
      content-style="padding: 15px 10px;background: none"
    >
    <!--  v-if="TagName !== 'n-form' && TagName !== ''" -->
      <n-form label-placement="top" size="small" v-if="['field', 'data'].includes(Category!)" > 
        <n-form-item label="标签名">
          <n-input v-model:value="ActiveFieldGiWidget!.slots!.default[0].options.label.value" />
        </n-form-item>
        <n-form-item label="宽度占比">
          <n-slider
            v-model:value="ActiveFieldGiWidget!.options!.span.value"
            :max="24"
            :min="0"
            :marks="{
              6: '1/4',
              12: '1/2',
              18: '3/4',
              24: '4/4',
            }"
            step="mark"
          />
        </n-form-item>
      </n-form>
      <component :value="ActiveWidget" :is="`dw-attr-${TagName}`"></component>
    </n-layout-content>
  </n-layout>
  <!-- <component :is="`dw-attr-${TagName}`"></component> -->
  <n-drawer
    v-model:show="drawerActive"
    :close-on-esc="false"
    :mask-closable="false"
    width="100%"
    :show-mask="false"
    :to="AttrContent && AttrContent.$el"
    class="grid-column-drawer"
    style="padding: 0"
  >
    <n-drawer-content
      body-content-style="padding: 15px 10px;background: none"
      header-style="box-sizing: border-box;height:32px;width: 100%;"
      :native-scrollbar="false"
    >
      <field-model />
      <!--  -->
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
import {
  ref,
  reactive,
  defineComponent,
  nextTick,
  h,
  onMounted,
  provide,
  computed,
} from "vue";

import { NwIcon, RequestPaging, VxeHelper, request } from "@platform/main";

import { designer } from "../../store/index";
import { compileConfig } from "../../utils/index";

import { get } from "lodash";

import FieldModel from './fieldModel.vue'

export default defineComponent({
  components: {
    NwIcon,
    FieldModel
  },
  setup(props, context) {
    const { ActiveWidget, ActiveFieldGiWidget } = designer;

    const FieldGiConfig = computed(() => ActiveFieldGiWidget.value!);
    // console.log('ActiveWidget', ActiveWidget)
    const AttrContent = ref<any>()
    nextTick().then(() => {
      designer.setAttrContentRef(AttrContent.value)
    })

    const drawerActive = ref<boolean>(false)

    const models = computed(() => {
     
      return Object.entries( ActiveWidget.value!.vModel!)
    })
    // 数据绑定
    return {
      drawerActive,
      AttrContent,
      FieldGiConfig,
      ActiveWidget,
      ActiveFieldGiWidget,
      Category: computed(() => ActiveWidget.value!.category),
      TagName: computed(() => ActiveWidget.value!.tagName),
      Label: computed(() => ActiveWidget.value!.label),
    };
  },
});
</script>

<style lang="less">
.attr-header {
  font-size: 14px;
  font-weight: bold;
  padding: 0 5px;
}
.model-grid {
  height: 80px;
  background: #fff;
  border: 1px solid #ccc;
}
</style>
