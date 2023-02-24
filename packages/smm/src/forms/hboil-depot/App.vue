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
      <n-form-item-gi :span="24" label="储油单位编码" path="dictitemCode">
        <n-input
          placeholder="请输入项目编码"
          v-model:value="dataModel.dictitemCode"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="储油单位名称" path="dictitemName">
        <n-input
          placeholder="请输入储油单位名称"
          v-model:value="dataModel.dictitemName"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="备注" path="explanation">
        <n-input
          placeholder="备注"
          type="textarea"
          v-model:value="dataModel.explanation"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="储油地址明细">
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
          "
        >
          <template #dictCode="{ row }">
            <n-input
              placeholder="请输入储油地址编码"
              v-model:value="row.dictCode"
            ></n-input>
          </template>
          <template #dictName="{ row }">
            <n-input
              placeholder="请输入储油地址名称"
              v-model:value="row.dictName"
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
      data: dataModel.value.smmHboilDepotDetailList,
      showFooter: false,
      toolbarConfig: {
        slots: {
          buttons: ({ $grid }: any) => {
            return [
              <NButton
                type="primary"
                onClick={function () {
                  if (!dataModel.value.smmHboilDepotDetailList) {
                    dataModel.value.smmHboilDepotDetailList = [];
                  }
                  dataModel.value.smmHboilDepotDetailList.push({
                    //id: `${new Date().getTime()}`,
                    //clientCode: "0",
                    //clientName: "0",
                  });
                  $grid.reloadData(dataModel.value.smmHboilDepotDetailList);
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
          title: "储油地址编码",
          field: "dictCode",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: {
            edit: "dictCode",
          },
        },
        {
          title: "储油地址名称",
          field: "dictName",
          showOverflow: "title",
          minWidth: 200,
          editRender: {},
          slots: {
            edit: "dictName",
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
                    dataModel.value.smmHboilDepotDetailList!.splice(
                      rowIndex,
                      1
                    );
                    $table.reloadData(dataModel.value.smmHboilDepotDetailList);
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
      () => dataModel.value.smmHboilDepotDetailList,
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
