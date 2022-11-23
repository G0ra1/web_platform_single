<template>
  <n-config-provider abstract :theme-overrides="theme">
    <!-- 菜单添加 -->
    <n-modal
      class="nw-modal"
      v-model:show="visible"
      preset="dialog"
      style="width: 1000px; padding: 0"
      :show-icon="true"
      :mask-closable="true"
      :closable="true"
    >
      <template #icon>
        <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
      </template>
      <template #header>
        <div>
          权限分配
        </div>
      </template>
      <!-- <div class="nw-modal-control">
        <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
        <n-button  size="small" >取消</n-button>
        </div> -->
      <!-- 菜单 -->

      <!-- 这里是内容选择 -->

      <n-spin :show="spinIsLoading" :rotate="spinState === 'loading'">
        <template #icon>
          <nw-icon
            v-if="spinState === 'loading'"
            name="icon-loading"
            :size="34"
            color="rgb(103, 194, 58)"
          />
          <nw-icon
            v-if="spinState === 'complete'"
            name="icon-duigou"
            :size="44"
            color="rgb(103, 194, 58)"
          />
          <nw-icon
            v-if="spinState === 'fail'"
            name="icon-cuowu"
            :size="44"
            color="#f44336"
          />
        </template>
        <template #description>
          <div v-if="spinState === 'complete'" style="background: #fff;font-size: 14px;font-weight: bold">
            权限分配成功
          </div>
          <div v-if="spinState === 'fail'" style="background: #fff;font-size: 14px;font-weight: bold">
            权限分配失败
          </div>
        </template>
        <n-layout>
           
            <n-layout-content style="height: 500px;" >
              <div class="step-body" style="height: 100%;padding: 0">
                <div class="step-pane" style="height: 100%;padding: 0">
                  <n-layout class="step3-layout" has-sider style="height: 100%;">
                    <n-layout-sider bordered :native-scrollbar="false" width="280" >
                        <BizMenu
                             @callback="getSourceList"
                          />
                    </n-layout-sider>
                    <n-layout-content style="height: 100%;">
                        <step3 />
                    </n-layout-content>
                  </n-layout>
                </div>
              </div>
            </n-layout-content>
        </n-layout>
        <div class="nw-modal-action">
        
          <n-button
            type="info"
            size="small"
            style="margin-right: 5px"
            @click="submitRole"
            >提交</n-button
          >
          <n-button size="small" @click="visible = false">取消</n-button>
        </div>
      </n-spin>
    </n-modal>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, computed, h } from "vue";
import {
  NSpace,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NInputNumber,
  NSelect,
  NButton,
  NRadio,
  NRadioGroup,
  NSwitch,
  NSpin,
  NModal,
  NGrid,
  NGi,
  NForm,
  NFormItemGi,
  NFormItem,
  NSteps,
  NStep,
  NDivider,
  NTag
} from "naive-ui";
import { NwIcon, BizMenu } from '@platform/main'
import theme from './theme/index'
import {
    spinIsLoading,
    spinState,
    visible, // 展示
    show,
    RoleData,
    TreeMenuRoot,
    setSysTabelData,
    CurrentSys,
    submitRole,
    getSourceList
} from '../store/AssignPermissions.jsx'
import Step3 from './step3.vue'

export default {
  
  components: {
    NSpace,
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NInputNumber,
    NSelect,
    NRadio,
    NRadioGroup,
    NSwitch,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NGrid,
    NGi,
    NForm,
    NFormItemGi,
    NFormItem,
    NSteps,
    NStep,
    NDivider,
    NTag,
    Step3,
    BizMenu
  },
  props: {},
  emits: ["callback"],
  setup(props, context) {
    return {
      visible,
      theme,
      spinIsLoading,
      spinState,
      show,
      TreeMenuRoot,
      setSysTabelData,
      CurrentSys,
      submitRole,
      getSourceList,
      // // 
      // openWay234: computed(() => {
      //   return TreeMenuRoot.value.children.filter(d => ['2', '3', '4'].includes(d.data.openWay))
      // }),
      // openWay11: computed(() => {
      //   return TreeMenuRoot.value.children.filter(d => d.data.openWay === '11')
      // }),
      // openWay1: computed(() => {
      //   return TreeMenuRoot.value.children.filter(d => d.data.openWay === '1')
      // }),
    };
  }
};
</script>

<style lang="less">
.step-body {
    // height: 400px;
    .step-pane {
        padding: 10px;
        .step1-item {
            position: relative;
            display: flex;
            align-items: center;
            // margin: 10px;
            // padding: 5px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            height: 100%;
            font-size: 12px;
            cursor: pointer;
            box-shadow: 2px 2px 0px 0px #607d8b;
            font-size: 14px;
            font-weight: bold;
            &-select {
                position: absolute;
                right: 0px;
                top: 8px;
            }
            &-type {
              display: flex;
              height: 100%;
              width: 30px;
              border-right: 1px solid #ccc;
              align-items: center;
              justify-content: center;
              background:red
            }
        }
        .step1-item:hover {
          box-shadow: 0px 0px 3px 3px #607d8b;
        }
        .step2-group {
          width: 100%;
          &-body {
          display: flex;
          flex-flow: wrap;
            .card {
              position: relative;
              display: flex;
              margin: 0 10px 10px 0;
              width: 180px;
              height: 80px;
              border: 1px solid #ccc;
              font-size: 16px;
              font-weight: bold;
              justify-content: center;
              align-items: center;
              padding-bottom: 24px;
              overflow: hidden;
              cursor: pointer;
              box-shadow: 2px 2px 0px 0px #607d8b;
              &-text {
                z-index: 2;
              }
              &-icon {
                position: absolute;
                left: -20px;
                top: -10px;
                z-index: 1;
                opacity: .2;
              }
              &-empower {
                position: absolute;
                right: 0px;
                top: 8px;
              }
              &-footer {
                z-index: 2;
                position: absolute;
                display: flex;
                bottom: 0px;
                border-top: 1px solid #ccc;
                height: 24px;
                width: 100%;
                font-size: 12px;
                text-indent: 5px;
                align-items: center;
                background: #fff;;
              }
            }
            .card:hover {
              box-shadow: 0px 0px 3px 3px #607d8b;
            }
          }
        }
        .step3-layout {
          .step3-border {
            margin-right: 12px;
            border-right: 1px solid #ccc;
          }
          .step3-group {
            &-header {
              font-size: 12px;
              &.n-divider:not(.n-divider--vertical) {
                margin-top: 14px;
                margin-bottom: 14px
              }
              .n-divider__title {
                margin-left: 5px;
                margin-right: 5px;
              }
            }
            &-body {
              .card {
                border: 1px solid #ccc;
                margin: 10px 15px 10px 10px;
                padding: 5px;
                box-shadow: 2px 2px 0px 0px #607d8b;
                cursor: pointer;
              }
              .card.select {
                box-shadow: 0px 0px 3px 3px #2196f3;
                // margin: 10px 0px 10px 10px;
                // background: #2196f3;
                // color: #fff;
              }
              .card:hover {
                box-shadow: 0px 0px 3px 3px #2196f3;
              }
            }
          }
        }
    }
}
</style>
