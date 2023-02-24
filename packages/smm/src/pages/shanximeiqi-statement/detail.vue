<template>
  <n-config-provider abstract :theme-overrides="theme">
    <n-modal
      class="nw-modal"
      v-model:show="visible"
      preset="dialog"
      style="width: 1500px; padding: 0"
      :show-icon="true"
      :mask-closable="true"
      :closable="true"
    >
      <template #icon>
        <div class="iconfont icon-bpmn-ditu"></div>
        <nw-icon name="icon-bumen2" :size="20" color="rgb(103, 194, 58)" />
      </template>
      <template #header>
        <div>
          日报详情
          <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
        </div>
      </template>
      <div style="height: 700px">
        <n-form
          :model="dataModel"
          class="LForm"
          ref="formRef"
          label-placement="left"
          :label-width="160"
          size="small"
        >
          <n-grid :cols="2" :x-gap="12" class="LFormNg">
            <n-grid-item :span="24">
              <n-form-item label="" path="">
                <h5 class="card-title">基本信息</h5>
              </n-form-item>
            </n-grid-item>
            <n-grid-item :span="24">
              <n-form-item label="填报日期" path="fillTime">
                <n-date-picker
                  style="width: 100%"
                  disabled
                  v-model:formatted-value="dataModel.fillTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item :span="24">
              <n-form-item label="填报人" path="createUserName">
                <n-input
                  placeholder="填报人"
                  disabled
                  v-model:value="dataModel.createUserName"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="供气量（Nm3）" path="airDemand">
                <n-input-number
                  style="width: 100%"
                  disabled
                  placeholder="供气量"
                  v-model:value="dataModel.airDemand"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="水露点（℃）" path="waterDewPoint">
                <n-input-number
                  style="width: 100%"
                  disabled
                  placeholder="水露点"
                  v-model:value="dataModel.waterDewPoint"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="CO2(mol%)" path="co2">
                <n-input-number
                  style="width: 100%"
                  disabled
                  placeholder="CO2"
                  v-model:value="dataModel.co2"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="高位发热量（MJ/m3)" path="higherHeatingValue">
                <n-input-number
                  placeholder="高位发热量"
                  disabled
                  style="width: 100%"
                  v-model:value="dataModel.higherHeatingValue"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="H2S(mg/m3)" path="h2s">
                <n-input-number
                  style="width: 100%"
                  placeholder="H2S"
                  disabled
                  v-model:value="dataModel.h2s"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="总硫(mg/m3)" path="totalSulfur">
                <n-input-number
                  style="width: 100%"
                  placeholder="总硫"
                  disabled
                  v-model:value="dataModel.totalSulfur"
                />
              </n-form-item>
            </n-grid-item>
            <n-grid-item :span="24">
              <n-form-item label="备注" path="explanation">
                <n-input
                  placeholder="备注"
                  type="textarea"
                  disabled
                  v-model:value="dataModel.explanation"
                />
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-form>
      </div>
      <div class="nw-modal-action">
        <n-button size="small" @click="visible = false">关闭</n-button>
      </div>
    </n-modal>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed, watch } from "vue";
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NBadge,
  NSpin,
  NModal,
  NSelect,
  NSwitch,
  NTabs,
  NTabPane,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NFormItemGi,
  NInputNumber,
  NDatePicker,
} from "naive-ui";
import { NwIcon } from "@platform/main";
import { detailForm } from "./api/index";

import theme from "../../components/theme";

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NBadge,
    NwIcon,
    NSwitch,
    NTabs,
    NTabPane,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NFormItemGi,
    NInputNumber,
    NDatePicker,
    NSelect,
  },
  props: {},
  setup(props, context) {
    const visible = ref(false);
    const dataModel = ref({});
    const sonFn = (row) => {
      visible.value = true;
      detailForm(row.camundaProcinsId).then((r) => {
        dataModel.value = { ...r };
      });
    };

    return {
      visible,
      dataModel,
      sonFn,
    };
  },
};
</script>

<style lang="less" scoped>
.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec;
      }
    }
  }
  &-table-title {
    height: 35px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 0 10px;
    font-weight: bold;
  }
}
:deep(.form-active) {
  background: #c6e2ff !important;
}
.unselect-form {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #666;
  height: 100%;
}

.nw-spin-full {
  height: 100%;

  :deep(.n-spin-content) {
    height: 100%;
  }
}
</style>
