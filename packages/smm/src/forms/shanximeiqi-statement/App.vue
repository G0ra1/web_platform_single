<template>
  <n-form
    :model="dataModel"
    class="LForm"
    :rules="rules"
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
        <n-form-item label="填报日期" path="tianbaoshijian">
          <n-date-picker
            style="width: 100%"
            v-model:formatted-value="dataModel.tianbaoshijian"
            value-format="yyyy-MM-dd"
            type="date"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item :span="24">
        <n-form-item label="填报人" path="tianbaoren">
          <n-input
            placeholder="填报人"
            disabled
            v-model:value="dataModel.tianbaoren"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="供气量（Nm3）" path="gongqiliang">
          <n-input-number
            style="width: 100%"
            placeholder="供气量"
            v-model:value="dataModel.gongqiliang"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="水露点(℃)" path="shuiludian">
          <n-input-number
            style="width: 100%"
            placeholder="水露点"
            v-model:value="dataModel.shuiludian"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="CO2(mol%)" path="CO2">
          <n-input-number
            style="width: 100%"
            placeholder="CO2"
            v-model:value="dataModel.CO2"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="高位发热量（MJ/m3)" path="gaoweifareliang">
          <n-input-number
            placeholder="高位发热量"
            style="width: 100%"
            v-model:value="dataModel.gaoweifareliang"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="H2S(mg/m3)" path="h2s">
          <n-input-number
            style="width: 100%"
            placeholder="h2s"
            v-model:value="dataModel.H25"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item>
        <n-form-item label="总硫(mg/m3)" path="zongliu">
          <n-input-number
            style="width: 100%"
            placeholder="总硫"
            v-model:value="dataModel.zongliu"
          />
        </n-form-item>
      </n-grid-item>
      <n-grid-item :span="24">
        <n-form-item label="备注" path="beizhu">
          <n-input
            placeholder="备注"
            type="textarea"
            v-model:value="dataModel.beizhu"
          />
        </n-form-item>
      </n-grid-item>
    </n-grid>
  </n-form>
</template>

<script lang="tsx">
import {
  ref,
  reactive,
  computed,
  defineComponent,
  nextTick,
  h,
  watch,
  onMounted,
} from "vue";
import type { ComponentPublicInstance, Ref, ReactiveEffect } from "vue";
import type { VxeGridProps, VxeGridInstance } from "vxe-table";
import { Db } from "@platform/main";
import { format } from "date-fns";
import { cloneDeep } from "lodash";
import { dictItemLists } from "../../api/index.js";
import {
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NCard,
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton,
  NDatePicker,
  NSelect,
  NLayout,
  NMenu,
  NDivider,
  NLayoutSider,
  NLayoutContent,
  NTreeSelect,
  TreeSelectOption,
} from "naive-ui";
import { request, NwIcon, NwDic } from "@platform/main";
import { FormModal } from "./store";

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NFormItemGi,
    NInput,
    NInputNumber,
    NButton,
    NCard,
    NDatePicker,
    NSelect,
    NTreeSelect,
    NwIcon,
    NwDic,
    NLayout,
    NMenu,
    NDivider,
    NLayoutSider,
    NLayoutContent,
  },
  setup() {
    const {
      formRef,
      dataModel,
      rules,
      brules,
      setValue,
      getValue,
      validate,
      setRules,
    } = new FormModal();
    const sumNum = (list: Array<any>, field: string) => {
      if (list && list.length <= 0) return 0;
      let count: number = 0;
      list.forEach((item: any) => {
        if (item[field]) {
          count += Number(item[field]);
        }
      });
      return count;
    };

    onMounted(() => {
      Db.get("userInfo").then((res: any) => {
        if (!dataModel.value.tianbaochangbie) {
          dataModel.value.tianbaochangbie = res.parentDeptName;
          dataModel.value.tianbaochangbieId = res.parentDeptId;
          dataModel.value.tianbaorendanwei = res.orgFullName;
          dataModel.value.tianbaorendanweiId = res.orgFullId;
          dataModel.value.tianbaoren = res.userNameCh;
          dataModel.value.tianbaorenId = res.id;
        }
        if (!dataModel.value.tianbaoshijian) {
          dataModel.value.tianbaoshijian = format(new Date(), "yyyy-MM-dd");
        }
      });
    });

    return {
      formRef,
      dataModel,
      rules,
      brules,
      validate,
      sumNum,
    };
  },
});
</script>

<style scoped>
/* .heji {
  font-weight: 600;
  margin-right: 15px;

}

.heji .label {
  margin-right: 8px;
} */

.card-title {
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  border-left: 2px solid #C91019;
  margin: 0;
  height: 19px;
  line-height: 19px;
  padding-left: 16px;
  margin-top: 20px;
}
</style>
