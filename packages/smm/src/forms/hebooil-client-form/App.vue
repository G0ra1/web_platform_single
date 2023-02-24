<template>
  <n-form
    :model="dataModel"
    :rules="rules"
    ref="formRef"
    label-placement="left"
    :label-width="160"
    size="small"
    :style="{
      padding: '45px',
    }"
  >
    <n-grid :cols="24" :x-gap="24" class="LFormNg">
      <n-form-item-gi :span="24" label="" path="">
        <h5 class="card-title">基本信息</h5>
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="项目编码" path="projectCode">
        <n-input
          placeholder="请输入项目编码"
          v-model:value="dataModel.projectCode"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="项目名称" path="projectCode">
        <n-input
          placeholder="请输入项目名称"
          v-model:value="dataModel.projectName"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="备注" path="explanation">
        <n-input
          placeholder="备注"
          type="textarea"
          v-model:value="dataModel.explanation"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="客户明细">
        <vxe-grid
          ref="detailVxeGrid"
          v-bind="detailListGridOption"
          style="
            moz-user-select: -moz-none;
            -moz-user-select: none;
            -o-user-select: none;
            -khtml-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            width: 100%;
            height: 100%;
          "
        >
          <template #clientCode="{ row }">
            <n-input
              placeholder="请输入客户编码"
              v-model:value="row.clientCode"
            ></n-input>
          </template>
          <template #clientName="{ row }">
            <n-input
              placeholder="请输入客户名称"
              v-model:value="row.clientName"
            ></n-input>
          </template>
        </vxe-grid>
      </n-form-item-gi>
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
  NFormItemGi,
  NInput,
  NInputNumber,
  NButton,
  NDatePicker,
  NSelect,
  NTreeSelect,
  TreeSelectOption,
} from "naive-ui";
import { request, NwIcon, NwDic } from "@platform/main";
import { FormModal } from "./App";

export default defineComponent({
  components: {
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInput,
    NInputNumber,
    NButton,
    NDatePicker,
    NSelect,
    NTreeSelect,
    NwDic,
    NwIcon,
  },
  setup() {
    const {
      formRef,
      dataModel,
      rules,
      setValue,
      getValue,
      validate,
      setRules,
    } = new FormModal();

    const detailVxeGrid: Ref<VxeGridInstance | null> = ref(null);

    const detailListGridOption = ref<VxeGridProps<any>>({
      //rowId: "id",
      rowKey: false,
      keepSource: false,
      // height: '500px',
      size: "mini",
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: dataModel.value.smmHebooilClientDetailList,
      showFooter: false,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <NButton
                type="primary"
                onClick={function () {
                  if (!dataModel.value.smmHebooilClientDetailList) {
                    dataModel.value.smmHebooilClientDetailList = [];
                  }
                  dataModel.value.smmHebooilClientDetailList.push({
                    //id: `${new Date().getTime()}`,
                    //clientCode: "0",
                    //clientName: "0",
                  });
                  $grid.reloadData(dataModel.value.smmHebooilClientDetailList);
                }}
              >
                {{
                  default: () => "新增",
                }}
              </NButton>,
            ];
          },
        },
      },
      editConfig: {
        trigger: "click",
        mode: "cell",
        showStatus: true,
        autoClear: false,
      },
      columns: [
        {
          title: "客户编码",
          field: "clientCode",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: {
            edit: "clientCode",
          },
        },
        {
          title: "客户名称",
          field: "clientName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: {
            edit: "clientName",
          },
        },
        {
          title: "操作",
          width: 70,
          fixed: "right",
          slots: {
            default: ({ $table, rowIndex }: any) => {
              return [
                <NButton
                  size="small"
                  type="error"
                  onClick={function () {
                    dataModel.value.smmHebooilClientDetailList!.splice(
                      rowIndex,
                      1
                    );
                    $table.reloadData(
                      dataModel.value.smmHebooilClientDetailList
                    );
                  }}
                >
                  {{
                    default: () => "删除",
                  }}
                </NButton>,
              ];
            },
          },
        },
      ],
    });
    const clearActive = () => {
      detailVxeGrid.value && detailVxeGrid.value.clearEdit();
    };

    watch(
      () => dataModel.value.smmHebooilClientDetailList,
      (d: any) => {
        if (detailVxeGrid.value) {
          detailVxeGrid.value.loadData(d);
        }
      }
    );

    /* onMounted(() => {
      Db.get("userInfo").then((res: any) => {
        if (!dataModel.value.tianbaorenId) {
          dataModel.value.tianbaoren = res.userNameCh;
          dataModel.value.tianbaorenId = res.id;
        }
        if (!dataModel.value.tianbaoshijian) {
          dataModel.value.tianbaoshijian = format(new Date(), "yyyy-MM-dd");
        }
      });
    }); */
    return {
      formRef,
      dataModel,
      rules,
      detailVxeGrid,
      dictItemLists,
      validate,
      clearActive,
      detailListGridOption,
    };
  },
});
</script>

<style scoped>
.heji {
  font-weight: 600;
  margin-right: 15px;
}

.heji .label {
  margin-right: 8px;
}
</style>
