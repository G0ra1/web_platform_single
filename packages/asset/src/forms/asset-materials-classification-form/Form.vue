<template>
  <n-spin :show="spinShow">
    <n-form
      :model="dataModel"
      :rules="rules"
      ref="formRef"
      label-placement="left"
      label-align="right"
      :label-width="120"
      size="small"
      :style="{ padding: '28px 82px' }"
    >
      <n-grid :cols="12" :x-gap="24">
        <n-form-item-gi :span="6" label="物资分类" path="classifyName">
          <span style="color: rgba(29, 124, 237, 1)">{{
            dataModel.classifyName
          }}</span>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="物资分类编码" path="classifyCode">
          <span style="color: rgba(29, 124, 237, 1)">{{
            dataModel.classifyCode
          }}</span>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="物资名称" path="itemName">
          <n-input
            placeholder="请输入物资名称"
            v-model:value="dataModel.itemName"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="物资编码" path="itemCode">
          <nw-code-generate
            v-if="dataModel.itemCode"
            formName="item"
            formField="itemCode"
            v-model:value="dataModel.itemCode"
            :formValue="dataModel"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="物资规格" path="specs">
          <n-input
            placeholder="请输入物资规格"
            v-model:value="dataModel.specs"
          />
        </n-form-item-gi>
        <!-- <n-form-item-gi :span="4" label="物资单位" path="unitName">
        <n-input placeholder="请输入物资单位" v-model:value="dataModel.unitName" />
      </n-form-item-gi> -->
        <n-form-item-gi :span="6" label="物资材质" path="materialQuality">
          <n-input
            placeholder="请输入物资材质"
            v-model:value="dataModel.materialQuality"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="物资标准" path="standard">
          <n-input
            placeholder="请输入物资标准"
            v-model:value="dataModel.standard"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="计量单位" path="unitName">
          <n-input-group>
            <n-input
              placeholder="请输入计量单位编码"
              v-model:value="dataModel.unitName"
            />
          </n-input-group>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="计量编码" path="unitCode">
          <n-input-group>
            <n-input
              placeholder="请输入计量单位"
              v-model:value="dataModel.unitCode"
              style="margin-right: 10px"
            />
            <n-checkbox
              :checked-value="1"
              :unchecked-value="0"
              style="width: 120px"
              v-model:checked="dataModel.isUnit"
            >
              多计量
            </n-checkbox>
          </n-input-group>
        </n-form-item-gi>
        <n-form-item-gi
          :span="12"
          v-if="dataModel.unitName && dataModel.isUnit == 1"
        >
          <div style="width: 100%">
            <vxe-table
              ref="unitListTable"
              :seq-config="tableSeqUnitName"
              show-overflow
              :data="unitList"
              :column-config="{ resizable: true }"
              :edit-config="{
                trigger: 'click',
                mode: 'row',
                enabled: true,
                showIcon: true,
              }"
            >
              <vxe-column type="seq" title="-" width="80"></vxe-column>
              <vxe-column field="unitName" title="单位" :edit-render="{}">
                <template #edit="{ row, column, rowIndex }">
                  <vxe-input
                    v-if="rowIndex != 0"
                    v-model="row.unitName"
                    @change="unitDataChangeEvent({ column })"
                    type="text"
                  ></vxe-input>
                  <span v-if="rowIndex == 0">{{ row.unitName }}</span>
                </template>
              </vxe-column>
              <vxe-column field="unitCode" title="单位编码" :edit-render="{}">
                <template #edit="{ row, column, rowIndex }">
                  <vxe-input
                    v-if="rowIndex != 0"
                    v-model="row.unitCode"
                    @change="unitDataChangeEvent({ column })"
                    type="text"
                  ></vxe-input>
                  <span v-if="rowIndex == 0">{{ row.unitCode }}</span>
                </template>
              </vxe-column>
              <vxe-column
                field="conversionRate"
                title="换算率"
                :edit-render="{}"
              >
                <template #edit="{ row, column, rowIndex }">
                  <vxe-input
                    v-if="rowIndex != 0"
                    v-model="row.conversionRate"
                    @change="unitDataChangeEvent({ column })"
                    type="text"
                  >
                  </vxe-input>
                </template>
              </vxe-column>
              <vxe-column title="换算单位">
                <template #default="{ row, column, rowIndex }">
                  <span v-if="rowIndex != 0">{{ dataModel.unitName }}</span>
                </template>
              </vxe-column>
              <vxe-column title="操作" show-overflow>
                <template #default="{ row, rowIndex }">
                  <NTooltip trigger="hover">
                    <template #trigger>
                      <NwIcon
                        name="icon-n-y-add"
                        style="cursor: pointer"
                        :size="18"
                        @click="
                          () => {
                            addUnitList();
                          }
                        "
                      />
                    </template>
                    新增
                  </NTooltip>
                  <NTooltip
                    trigger="hover"
                    v-if="rowIndex != 0 && unitList.length > 2"
                  >
                    <template #trigger>
                      <NwIcon
                        name="icon-del"
                        :size="18"
                        style="cursor: pointer; margin-left: 5px"
                        @click="
                          () => {
                            delUnitList(row);
                          }
                        "
                      ></NwIcon>
                    </template>
                    删除
                  </NTooltip>
                </template>
              </vxe-column>
            </vxe-table>
          </div>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="物资编码短描述" path="descshort">
          <n-input
            placeholder="请输入物资编码短描述"
            v-model:value="dataModel.descshort"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="物资编码长描述" path="desclong">
          <n-input
            placeholder="请输入物资编码长描述"
            v-model:value="dataModel.desclong"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="状态" path="state">
          <n-switch
            v-model:value="dataModel.state"
            checked-value="正常"
            unchecked-value="停用"
          >
            <template #checked> 正常 </template>
            <template #unchecked> 停用 </template>
          </n-switch>
        </n-form-item-gi>
        <!-- <n-form-item-gi :span="12" label="备注" path="remark">
        <n-input type="textarea" placeholder="请输入备注" v-model:value="dataModel.remark" />
      </n-form-item-gi> -->
        <n-form-item-gi :span="12">
          <h5 class="skutitle">
            <p>
              SKU属性
              <n-button
                @click="addItemSkuList"
                style="
                  height: 16px;
                  width: 16px;
                  padding: 0;
                  margin-left: 5px;
                  line-height: 16px;
                "
                type="info"
                >+</n-button
              >
            </p>
          </h5>
        </n-form-item-gi>
        <n-form-item-gi :span="12">
          <div style="width: 100%">
            <vxe-table
              ref="skuListTable"
              :seq-config="tableSeq"
              show-overflow
              :data="itemSkuList"
              :column-config="{ resizable: true }"
              :edit-config="{
                trigger: 'click',
                mode: 'row',
                enabled: true,
                showIcon: true,
              }"
            >
              <vxe-column type="seq" title="序号" width="80"></vxe-column>
              <vxe-column field="skuCode" title="sku编码" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input
                    v-model="row.skuCode"
                    type="text"
                    @change="dataChangeEvent({ column })"
                  ></vxe-input>
                </template>
              </vxe-column>
              <vxe-column
                v-for="item in skuColumn"
                :key="item.field"
                :field="item.field"
                :title="item.title"
                :edit-render="{}"
              >
                <template #edit="{ row, column }">
                  <vxe-input
                    v-model="row[item.field]"
                    @change="dataChangeEvent({ column })"
                    type="text"
                  ></vxe-input>
                </template>
              </vxe-column>
              <vxe-column title="操作" show-overflow>
                <template #default="{ row }">
                  <NTooltip trigger="hover">
                    <template #trigger>
                      <NwIcon
                        name="icon-bianji3"
                        style="cursor: pointer"
                        :size="18"
                        @click="
                          () => {
                            editRow(row);
                          }
                        "
                      />
                    </template>
                    编辑
                  </NTooltip>
                  <NTooltip trigger="hover">
                    <template #trigger>
                      <NwIcon
                        name="icon-del"
                        :size="18"
                        style="cursor: pointer; margin-left: 5px"
                        @click="
                          () => {
                            delSkuList(row);
                          }
                        "
                      ></NwIcon>
                    </template>
                    删除
                  </NTooltip>
                </template>
              </vxe-column>
            </vxe-table>
          </div>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-spin>
</template>
<script>
import { defineComponent, ref, onMounted, watch, nextTick } from "vue";
import { delUnit, delSku } from "./api/index.js";
// import NwCodeGenerate from "../../components/nw-code-generate/index.vue";
import {
  useMessage,
  NForm,
  NGrid,
  NFormItem,
  NFormItemGi,
  NSelect,
  NInputGroup,
  NInput,
  NInputNumber,
  NTransfer,
  NRadio,
  NRadioGroup,
  NInputGroupLabel,
  NRadioButton,
  NSwitch,
  NDatePicker,
  NMessageProvider,
  NRate,
  NButton,
  NTooltip,
  NCheckbox,
} from "naive-ui";
import { dataModel, itemSkuList, skuColumn, unitList } from "./store.js";
import { NwIcon } from '@platform/main'

export default defineComponent({
  components: {
    NForm,
    NGrid,
    NFormItem,
    NFormItemGi,
    NSelect,
    NInputGroup,
    NInput,
    NInputNumber,
    NTransfer,
    NRadio,
    NRadioGroup,
    NInputGroupLabel,
    NRadioButton,
    NSwitch,
    NDatePicker,
    NMessageProvider,
    NRate,
    NwIcon,
    NButton,
    // NwCodeGenerate,
    NTooltip,
    NCheckbox,
  },
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const skuListTable = ref(null);
    const spinShow = ref(false);
    const addItemSkuList = () => {
      itemSkuList.value.push({ skuCode: itemSkuList.value.length + 1 });
      skuListTable.value.reloadData(itemSkuList.value);
    };
    const tableSeq = ref({
      seqMethod({ rowIndex }) {
        if (rowIndex + 1 < 10) {
          return `0${rowIndex + 1}`;
        } else {
          return `${rowIndex + 1}`;
        }
      },
    });
    const tableSeqUnitName = ref({
      seqMethod({ rowIndex }) {
        if (rowIndex == 0) return "主计量";
        return "辅计量";
      },
    });
    const skuLineList = ref([]);
    const dataChangeEvent = ({ column }) => {
      let tableData = skuListTable.value.getTableData().fullData;
      skuLineList.value = [];
      tableData.forEach((d) => {
        let m = {
          skuCode: d.skuCode,
          skuColumnList: [],
        };
        skuColumn.value.forEach((e, i) => {
          m.skuColumnList[i] = {
            skuId: e.field,
            skuSort: e.sort,
            skuName: e.title,
            skuValue: d[e.field],
          };
        });
        skuLineList.value.push(m);
      });
      console.log(skuLineList.value, "skuLineList");
      dataModel.value.skuLineList = skuLineList.value;
    };
    const delSkuList = (row) => {
      if (row.id) {
        delSku(row.id)
          .then((res) => {
            message.success("操作成功");
            skuListTable.value.remove(row);
            dataChangeEvent({});
          })
          .finally((d) => {
            spinShow.value = false;
          });
      } else {
        skuListTable.value.remove(row);
        dataChangeEvent({});
      }
    };
    const editRow = (row) => {
      skuListTable.value.setActiveRow(row);
    };
    const addUnitList = () => {
      unitList.value.push({});
      unitListTable.value.reloadData(unitList.value);
    };
    const delUnitList = (row) => {
      if (row.id) {
        spinShow.value = true;
        delUnit(row.id)
          .then((res) => {
            message.success("操作成功");
            unitListTable.value.remove(row);
            unitDataChangeEvent({});
          })
          .finally((d) => {
            spinShow.value = false;
          });
      } else {
        unitListTable.value.remove(row);
        unitDataChangeEvent({});
      }
    };
    const unitDataChangeEvent = ({ column }) => {
      let tableData = unitListTable.value.getTableData().fullData;
      unitList.value = tableData;
      dataModel.value.unitList = tableData;
    };
    const unitListTable = ref(null);
    watch(
      [() => dataModel.value.unitName, () => dataModel.value.isUnit],
      ([newUnitName, newIsUnit], [oldUnitName, oldIsUnit]) => {
        if (newUnitName && newIsUnit == 1) {
          if (unitList.value.length == 0) {
            nextTick().then(() => {
              unitList.value.push(
                {
                  unitName: dataModel.value.unitName,
                },
                {}
              );
              unitListTable.value.reloadData(unitList.value);
            });
          } else {
            nextTick().then(() => {
              unitList.value[0].unitName = dataModel.value.unitName;
              unitListTable.value.reloadData(unitList.value);
            });
          }
        }
      }
    );
    onMounted(() => {
      console.log(dataModel);
    });
    return {
      dataModel,
      formRef,
      rules: {},
      itemSkuList,
      skuColumn,
      tableSeq,
      addItemSkuList,
      skuListTable,
      dataChangeEvent,
      skuLineList,
      editRow,
      tableSeqUnitName,
      unitList,
      addUnitList,
      delUnitList,
      unitListTable,
      delSkuList,
      unitDataChangeEvent,
      spinShow,
    };
  },
});
</script>
<style lang="less">
.selectedInput.n-input.n-input--disabled .n-input__input-el {
  cursor: pointer;
}

h5.skutitle {
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  border-top: 1px dashed;
  width: 100%;
  padding-top: 20px;

  p {
    height: 20px;
    line-height: 20px;
    border-left: 2px solid #2080f0;
    padding-left: 5px;
  }
}
</style>
