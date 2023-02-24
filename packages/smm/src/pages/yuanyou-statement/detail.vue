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
          :rules="rules"
          ref="formRef"
          label-placement="left"
          :label-width="180"
          size="small"
          class="LForm"
        >
          <n-grid :cols="2" :x-gap="12" class="LFormNg">
            <n-form-item-gi :span="24" label="" path="">
              <h5 class="card-title">基本信息</h5>
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="填报日期" path="fillInTime">
              <n-date-picker
                style="width: 100%"
                v-model:formatted-value="dataModel.fillInTime"
                value-format="yyyy-MM-dd"
                type="date"
                disabled
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="填报人" path="createUserName">
              <n-input
                placeholder="填报人"
                disabled
                v-model:value="dataModel.createUserName"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="送检单位" path="inspectOrgName">
              <n-input
                placeholder="送检单位"
                disabled
                v-model:value="dataModel.inspectOrgName"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="检测单位" path="checkOrgName">
              <n-input
                placeholder="检测单位"
                disabled
                v-model:value="dataModel.checkOrgName"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="取样地点" path="samplingSpot">
              <n-input
                placeholder="填报人"
                disabled
                v-model:value="dataModel.samplingSpot"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="取样时间" path="samplingTime">
              <n-date-picker
                style="width: 100%"
                disabled
                v-model:formatted-value="dataModel.samplingTime"
                value-format="yyyy-MM-dd"
                type="date"
              />
            </n-form-item-gi>
            <n-form-item-gi label="水含量(%)" path="waterContent">
              <n-input
                placeholder=""
                disabled
                style="width: 100%"
                v-model:value="dataModel.waterContent"
              />
            </n-form-item-gi>
            <n-form-item-gi label="交接温度下蒸气压(kpa)" path="jjwdxKpa">
              <n-input
                placeholder=""
                disabled
                style="width: 100%"
                v-model:value="dataModel.jjwdxKpa"
              />
            </n-form-item-gi>
            <n-form-item-gi
              label="机械杂质含量(%)"
              path="machineryImpurityLevel"
            >
              <n-input
                placeholder=""
                disabled
                style="width: 100%"
                v-model:value="dataModel.machineryImpurityLevel"
              />
            </n-form-item-gi>
            <n-form-item-gi label="204°c前馏分有机氯含量" path="yjlLevel">
              <n-input
                placeholder=""
                disabled
                style="width: 100%"
                v-model:value="dataModel.yjlLevel"
              />
            </n-form-item-gi>
            <n-form-item-gi label="盐含量(%)" path="saltContent">
              <n-input
                placeholder=""
                disabled
                style="width: 100%"
                v-model:value="dataModel.saltContent"
              />
            </n-form-item-gi>
            <n-form-item-gi label="密度20°c(kg/m3)" path="density">
              <n-input
                placeholder=""
                disabled
                style="width: 100%"
                v-model:value="dataModel.density"
              />
            </n-form-item-gi>
            <n-form-item-gi label="硫含量(%)" path="sulphurContent">
              <n-input
                placeholder=""
                disabled
                style="width: 100%"
                v-model:value="dataModel.sulphurContent"
              />
            </n-form-item-gi>
            <n-form-item-gi label="酸值(mg/g)" path="acidValue">
              <n-input
                placeholder=""
                disabled
                style="width: 100%"
                v-model:value="dataModel.acidValue"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="图片" path="photoUrl">
              <n-image
                :src="dataModel.photoUrl"
                height="50"
                width="50"
                style="padding-left: 15px"
              />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="备注" path="explanation">
              <n-input
                placeholder="备注"
                type="textarea"
                disabled
                v-model:value="dataModel.explanation"
              />
            </n-form-item-gi>
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
