<template>
  <div class="form-panel">
    <div class="header">
      <Tools />
    </div>
    <div class="content">
      <JsonView v-if="switchType === 'json'" />
      <!-- <div class="page" >
        {{ SourceWidget  }}
      </div> -->
      <div class="page" v-if="switchType === 'design'" ref="formRef" @click="handleForm">
        <!-- 这里直接写入n-form 根 -->
        <n-form
          
          :label-width="FormOptions.labelWidth"
          :size="FormOptions.size"
          :label-placement="FormOptions.labelPlacement"
          :label-align="FormOptions.labelAlgin"
        >
          <template v-if="isTabs">
            <n-tabs type="line" :tabs-padding="10" animated>
              <n-tab-pane
                v-for="pane in TabPaneWidgets"
                :key="pane.options.value.name"
                :name="pane.options.value.name"
                :tab="pane.options.value.tab"
              >
                <n-scrollbar>
                  <GridWidget :value="pane.config.value.slots.default[0].slots.default" />
                </n-scrollbar>
              </n-tab-pane>
              <!-- <n-tab-pane
                v-for="pane in TabPaneWidgets"
                :key="pane.options.value.name + '1'"
                :name="pane.options.value.name + '1'"
                :tab="pane.options.value.tab + '1'"
              >
                <n-scrollbar >
                  <GridWidget :value="pane.config.value.slots.default[0].slots.default" />
                </n-scrollbar>
              </n-tab-pane> -->
            </n-tabs>

          </template>
          <template v-else>
          
            <n-scrollbar :style="
              {
                'paddingRight': isAnchor ? '140px' : '0px'
              }
            "  >
              <GridWidget :value="FormConfig.slots.default[0].slots.default" />
            </n-scrollbar>
            <n-anchor
              v-if="isAnchor"
              offset-target=".widget-group"
              style="position: absolute; width: 120px; right: 0px; top: 20px;padding-right: 20px;"
              :show-rail="true"
              :show-background="true"
            >
              <n-anchor-link title="基础字段" href="#n-grid_1" />
              <n-anchor-link title="子表1" href="#ignore-gap.vue" />
              <n-anchor-link title="子表2" href="#ignore-gap.vue" />
            </n-anchor>
          </template>
            
          
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import {
  ref,
  reactive,
  computed,
  defineComponent,
  nextTick,
  h,
  onMounted,
  provide,
  toRaw,
} from "vue";
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import { NwIcon, RequestPaging, VxeHelper, request } from "@platform/main";

import { designer } from "../../store/index";
import { compileConfig } from "../../utils/index";

import { Widget, WidgetRoot } from "../../model/widget";

import GridWidget from "./grid.vue";

import Tools from "./tools.vue"

import JsonView from './json/index.vue'

// import { tools } from '../../model/tools'

export default defineComponent({
  components: {
    NwIcon,
    GridWidget,
    Tools,
    JsonView
  },
  setup(props, context) {
    const { SourceWidget, handleActiveWidget, ActiveWidget, Tools } = designer;
    const { switchType } = Tools
    const {
      config: FormConfig,
      options: FormOptions,
      isTabs,
      isAnchor,
      TabPaneWidgets
    } = new WidgetRoot(SourceWidget.value!);
    // 这里

    
    let setup: any = {
      switchType,
      FormConfig,
      FormOptions,
      isTabs,
      isAnchor,
      TabPaneWidgets
    };
    const formRef = ref()
    nextTick().then(() => {
      console.log('=======formRef====', formRef)
    })
    return {
      ...setup,
      SourceWidget,
      formRef,
      handleForm() {
        handleActiveWidget(SourceWidget.value!);
      },
    };
  },
});
</script>

<style lang="less">
.form-panel {
  box-sizing: border-box;
  height: 100%;
  > .header {
    height: 32px;
    box-sizing: border-box;
    border-bottom: var(--border);
  }
  > .content {
    height: calc(~"100% - 32px");
    padding: 20px;
    box-sizing: border-box;
    background: var(--light-gray5);
    > .page {
      position: relative;
      height: 100%;
      border: 1px solid #ccc;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      // background: #fff;
      // background-image: linear-gradient(90deg, rgba(60, 10, 30, .08) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, .08) 3%, transparent 0);
      // background-size: 20px 20px;
      // background-position: 40%;
      background-repeat: repeat;
      background-color: #fff;
      // padding: 10px;
      >.n-form {
        height: 100%;
        >.n-tabs {
          height:100%;
          display: flex;
          flex-direction: column;
          >.n-tabs-pane-wrapper {
            flex: 1;
            >.n-tab-pane {
              height: 100%;
              box-sizing: border-box;
              >.n-scrollbar {
                padding: 0 10px;
                box-sizing: border-box;
              }
            }
          }
        }
        >.n-scrollbar {
          // padding: 20px 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
