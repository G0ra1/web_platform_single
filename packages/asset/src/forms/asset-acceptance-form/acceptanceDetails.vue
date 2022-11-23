<template>
  <n-grid>
    <n-grid-item :span="24">
      <n-spin :show="spinShow">
        <vxe-table ref="detailTable" max-height="300" show-overflow border :data="detailList"
          :column-config="{ resizable: true }" :row-config="{ keyField: 'rowId' }" :edit-config="{
            trigger: 'click',
            mode: 'row',
            enabled: true,
            showIcon: true,
            autoClear: false,
          }" @cell-click="clickCell" @edit-actived="editActived">
          <vxe-column type="seq" title="序号" fixed="left" width="60"></vxe-column>
          <vxe-column field="itemCode" title="物资编码" width="135">
          </vxe-column>
          <vxe-column field="itemName" title="物资名称" width="135">
          </vxe-column>
          <vxe-column field="itemType" title="物资类型" width="135">
            <template v-slot="{ row }">
              <span>{{
                  wuziTypeList.find(d => d.dictItemCode == row.itemType) ? wuziTypeList.find(d => d.dictItemCode ==
                    row.itemType).dictItemName : ""
              }}</span>
            </template>
          </vxe-column>
          <vxe-column field="descshort" title="物资描述" width="135">
          </vxe-column>
          <vxe-column field="acceptanceBatch" title="验收批次号" width="135">
          </vxe-column>


          <!-- 
          <vxe-column field="spuCode" title="SPU属性" width="135">
          </vxe-column> -->
          <vxe-column field="qualityAssuranceLevel" title="质保等级" width="135" :edit-render="{}" transfer>
            <template #edit="{ row }">
              <NwDic dictCode="asset_quality_level" v-model:value="row.qualityAssuranceLevel"
                v-model:label="row.qualityAssuranceLevel"></NwDic>
            </template>
          </vxe-column>
          <vxe-column field="batchNumber" title="批次/炉号" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.batchNumber" type="text" @change="dataChangeEvent({ row, column })">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="manufacturer" title="生产厂商" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.manufacturer" type="text" @change="dataChangeEvent({ row, column })">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="productionDate" title="生产日期" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.productionDate" type="date" placeholder="请选择日期" transfer></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="serviceLife" title="使用年限" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.serviceLife" type="text" @change="dataChangeEvent({ row, column })">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="factoryCode" title="出厂编码" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.factoryCode" type="text" @change="dataChangeEvent({ row, column })">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="factoryDate" title="出厂日期" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.factoryDate" type="date" placeholder="请选择日期" transfer></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="factorySn" title="出厂序列号" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.factorySn" type="text" @change="dataChangeEvent({ row, column })">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="file" title="图片预览" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <div style="display: flex">
                <n-image width="30" height="30" v-if="row.fileIds" :src="getUrl(row.fileIds)" />
                <fileUploadButton v-model:fileIds="row.fileIds" :showFileList="false">
                  <n-button text>
                    <nw-icon name="icon-add-bold" :size="25" />
                  </n-button>
                </fileUploadButton>
              </div>
            </template>
            <template #default="{ row }">
              <n-image width="30" height="30" v-if="row.fileIds" :src="getUrl(row.fileIds)" />
            </template>
          </vxe-column>
          <vxe-column field="file" title="验收资料" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <div style="display: flex">
                <fileUploadButton ref="fileUploadButtonRef" v-model:fileIds="row.document" :showFileList="false"
                  :showLookOver="true" :multiple="true">
                  <n-button text>
                    <nw-icon name="icon-add-bold" :size="25" />
                  </n-button>
                </fileUploadButton>
              </div>
            </template>
            <template #default="{ row }">
              <n-button text @click="() => { fileUploadButtonRef.fileModalShow() }">
                查看
              </n-button>
            </template>
          </vxe-column>
          <!-- <vxe-column field="warehouseName" title="仓库地点" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <warehousePick v-model:value="row.warehouseName" v-model:id="row.warehouseId" />
            </template>
          </vxe-column>
          <vxe-column field="shelfName" title="货架号" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <warehouseShelfPick v-model:value="row.shelfName" :warehouseId="row.warehouseId"
                :warehouseName="row.warehouseName" v-model:id="row.shelfId" />
            </template>
          </vxe-column> -->
          <vxe-column field="acceptanceStatus" title="确认验收" width="135" :edit-render="{}">
            <template #edit="{ row }">
              <vxe-select v-model="row.acceptanceStatus" transfer>
                <vxe-option :key="0" :value="0" label="否">
                </vxe-option>
                <vxe-option :key="1" :value="1" label="是">
                </vxe-option>
              </vxe-select>
            </template>
            <template #default="{ row }">
              <span>{{ row.acceptanceStatus === 1 ? "是" : row.acceptanceStatus === 0 ? "否" : "" }}</span>
            </template>
          </vxe-column>



          <!-- <vxe-column field="supplierName" title="供应商" width="135">
          </vxe-column>
          <vxe-column field="contractCode" title="合同号" width="135">
          </vxe-column>



          <vxe-column field="validPeriod" title="有效期" width="135">
          </vxe-column>

          <vxe-column field="acceptanceDate" title="验收日期" width="135">
          </vxe-column>
          <vxe-column field="factoryDate" title="出厂日期" width="135">
          </vxe-column>

          <vxe-column field="factorySn" title="设备出厂SN号" width="135">
          </vxe-column>
          <vxe-column field="factoryData" title="设备出厂资料" width="135">
          </vxe-column>
          <vxe-column field="approachDate" title="进场日期" width="135">
          </vxe-column>

          <vxe-column field="receptionDate" title="接收日期" width="135">
          </vxe-column>
          <vxe-column field="unitName" title="计量单位" width="135" :edit-render="{}">
            <template #edit="{ row }">
              <vxe-select v-model="rowModel.value.unitName" transfer>
                <vxe-option v-for="item in unitList" :key="item.unitName" :value="item.unitName" :label="item.unitName">
                </vxe-option>
              </vxe-select>
            </template>
          </vxe-column>
          <vxe-column field="acceptanceNumber" title="验收数量" :edit-render="{}" width="135">
            <template #edit="{ row, column }">
              <vxe-input v-model="rowModel.value.acceptanceNumber" type="text"
                @change="dataChangeEvent({ row, column })">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="acceptanceAmount" title="验收单价" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="acceptanceAmount" type="text" @change="dataChangeEvent({ row, column })">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="acceptanceTaxRate" title="验收税率" width="135" :edit-render="{}" transfer>
            <template #edit="{ row }">
              <vxe-select v-model="acceptanceTaxRate" @change="dataChangeEvent({ row, column })" transfer>
                <vxe-option v-for="item in taxRateList" :key="item.dictItemCode" :value="item.dictItemCode"
                  :label="item.dictItemName"></vxe-option>
              </vxe-select>
            </template>
            <template #default="{ row }">
              <span>{{ acceptanceTaxRate ? acceptanceTaxRate + "%" : "" }}</span>
            </template>
          </vxe-column>
          <vxe-column field="acceptanceSumAmount" width="135" title="总价">
          </vxe-column>

          <vxe-column title="操作" fixed="right" show-overflow width="120">
            <template #default="{ row }">
              <span style="
                      cursor: pointer;
                      color: #6b84fc;
                      margin-right: 12px;
                      font-size: 12px;
                    " @click="
                      () => {
                        editRow(row);
                      }
                    ">编辑</span>
              <span style="
                      cursor: pointer;
                      color: red;
                      margin-right: 12px;
                      font-size: 12px;
                    " @click="
                      () => {
                        delIemRow(row);
                      }
                    ">删除</span>
            </template>
          </vxe-column> -->
        </vxe-table>
      </n-spin>
    </n-grid-item>
  </n-grid>

  <!-- <n-modal v-model:show="showModal1" :mask-closable="false" preset="dialog" title="编辑" positive-text="确认"
    negative-text="取消" style="width: 800px;">
    <n-form :model="rowModel" ref="formRef" label-placement="left" label-align="left" :label-width="90" size="small"
      :style="{ padding: '28px', width: '600px', margin: '0 auto' }">
      <n-grid :cols="12" :x-gap="24">
        <n-form-item-gi :span="6" label="物资名称" path="applyUserName">
          <span>{{ rowModel.itemName }}</span>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="物资编码" path="applyUserName">
          <span>{{ rowModel.itemCode }}</span>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="质保等级" path="qualityAssuranceLevel">
          <n-input placeholder="质保等级" v-model:value="rowModel.qualityAssuranceLevel" class="selectedInput" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="生产商" path="manufacturer">
          <n-input placeholder="生产商" v-model:value="rowModel.manufacturer" class="selectedInput" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="生产日期" path="productionDate">
          <n-date-picker style="width: 100%" placeholder="请选择生产日期" v-model:value="rowDateModel.productionDate"
            value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" clearable></n-date-picker>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="使用年限" path="serviceLife">
          <n-input placeholder="使用年限" v-model:value="rowModel.serviceLife" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="有效期" path="validPeriod">
          <n-input placeholder="有效期" v-model:value="rowModel.validPeriod" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="批次/炉号" path="batchNumber">
          <n-input placeholder="批次/炉号" v-model:value="rowModel.batchNumber" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="验收日期" path="acceptanceDate">
          <n-date-picker style="width: 100%" placeholder="请选择验收日期" v-model:value="rowDateModel.acceptanceDate"
            value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" clearable></n-date-picker>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="出厂日期" path="factoryDate">
          <n-date-picker style="width: 100%" placeholder="请选择出厂日期" v-model:value="rowDateModel.factoryDate"
            value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" clearable></n-date-picker>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="出厂编号" path="factoryCode">
          <n-input placeholder="出厂编号" v-model:value="rowModel.factoryCode" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="设备出厂SN号" path="factorySn">
          <n-input placeholder="设备出厂SN号" v-model:value="rowModel.factorySn" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="进场日期" path="approachDate">
          <n-date-picker style="width: 100%" placeholder="请选择进场日期" v-model:value="rowDateModel.approachDate"
            value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" clearable></n-date-picker>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="仓库地点" path="warehouseName">
          <warehousePick v-model:value="rowModel.warehouseName" v-model:id="rowModel.warehouseId" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="货架号" path="shelfName">
          <warehouseShelfPick v-model:value="rowModel.shelfName" :warehouseId="rowModel.warehouseId"
            :warehouseName="rowModel.warehouseName" v-model:id="rowModel.shelfId" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="接收日期" path="receptionDate">
          <n-date-picker style="width: 100%" placeholder="请选择进场日期" v-model:value="rowDateModel.receptionDate"
            value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" clearable></n-date-picker>
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="验收税率" path="acceptanceTaxRate">
          <n-select v-model:value="rowModel.acceptanceTaxRate" :options="taxRateList" />
        </n-form-item-gi>
        <n-form-item-gi :span="6" label="验收单价" path="acceptanceAmount">
          <n-input-number style="width: 100%;" v-model:value="rowModel.acceptanceAmount" placeholder="验收单价"
            :show-button="false">
          </n-input-number>
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="图片" path="fileIds">
          <fileUploadButton v-model:fileIds="rowModel.fileIds">
            <n-button class="uploadbtn" v-if="!rowModel.fileIds" size="small" type="info">
              <span>上传</span>
            </n-button>
          </fileUploadButton>
        </n-form-item-gi>
      </n-grid>
    </n-form>
    <template #action>
      <n-button type="warning" size="small" @click="showModal1 = false">取消</n-button>
      <n-button type="success" size="small" style="margin-right: 5px" @click="() => onPositiveClick()">保存</n-button>
    </template>
  </n-modal> -->
</template>

<script lang="jsx">
import { defineComponent, ref, reactive, onMounted, nextTick, h, watch } from 'vue';
import { cloneDeep } from 'lodash'
import fileUploadButton from "../../components/fileUploadButton/index.vue";

import {
  NModal,
  NInput,
  NForm,
  NFormItem,
  NGrid,
  NGridItem,
  NTreeSelect,
  NSelect,
  NTree,
  NSpin,
  NButton,
  NInputGroup,
  NFormItemGi,
  NDatePicker,
  NInputNumber,
  useMessage,
  NImage
} from "naive-ui";
import { dictItemLists, wuziType } from "./api/index.js";
import warehousePick from "../../components/warehousePick/index.vue";
import warehouseShelfPick from "../../components/warehouseShelfPick/index.vue";
import { format } from "date-fns";

import { Cookies, NwDic, NwIcon } from '@platform/main'


export default defineComponent({
  components: {
    NModal,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
    NTreeSelect,
    NSelect,
    NTree,
    NSpin,
    NButton,
    NInputGroup,
    NwIcon,
    NFormItemGi,
    NDatePicker,
    NInputNumber,
    warehousePick,
    warehouseShelfPick,
    fileUploadButton,
    NImage,
    NwDic
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    partyaCode: {
      type: String,
      default: ''
    },
  },

  setup(props, context) {
    const message = useMessage();
    const token = Cookies.get("token");
    const showModal = ref(false);
    const spinShow = ref(false);
    const detailTable = ref(null);
    const searchValue = ref('')
    const detailList = ref([])
    const taxRateList = ref([])
    const rowModel = ref({})
    const rowDateModel = ref({})
    const showModal1 = ref(false)
    const unitList = ref([{
      unitName: '1',
    }, {
      unitName: '2'
    }])
    const setTableValue = (d) => {
      detailList.value = d
      detailTable.value.loadData(detailList.value)
    }
    const getTableValue = () => {
      return detailTable.value.getTableData().fullData
    }
    const searchEvent = () => {
    }
    const selectedAssRow = ref()
    const getUrl = (id) => {
      return `${window.apiBaseURL}/main/fileinfo/stream?id=${id}&access_token=${token}`
    }
    const selectRow = ref({})
    const editRow = (row) => {
      selectRow.value = row
      showModal1.value = true
      rowModel.value = cloneDeep(row)
      rowDateModel.value = {}
      if (rowModel.value.productionDate) {
        rowDateModel.value.productionDate = +new Date(rowModel.value.productionDate)
      }
      if (rowModel.value.acceptanceDate) {
        rowDateModel.value.acceptanceDate = +new Date(rowModel.value.acceptanceDate)
      }
      if (rowModel.value.factoryDate) {
        rowDateModel.value.factoryDate = +new Date(rowModel.value.factoryDate)
      }
      if (rowModel.value.approachDate) {
        rowDateModel.value.approachDate = +new Date(rowModel.value.approachDate)
      }
      if (rowModel.value.receptionDate) {
        rowDateModel.value.receptionDate = +new Date(rowModel.value.receptionDate)
      }

      dictItemLists("ASSETS_TAX_RATE").then((res) => {
        res.forEach(e => {
          e.label = e.dictItemName
          e.value = e.dictItemCode
        });
        taxRateList.value = res
      });
    }
    const delIemRow = (row) => {
      detailTable.value.remove(row);
    };
    const clickCell = () => {
    }
    const selected = ref({})
    const contractCode = ref('')
    if (props.value) {
      contractCode.value = props.value
    }
    const onPositiveClick = (t) => {
      if (rowDateModel.value.productionDate) {
        rowModel.value.productionDate = format(rowDateModel.value.productionDate, "yyyy-MM-dd hh:mm:ss");
      }
      if (rowDateModel.value.acceptanceDate) {
        rowModel.value.acceptanceDate = format(rowDateModel.value.acceptanceDate, "yyyy-MM-dd hh:mm:ss");
      }
      if (rowDateModel.value.factoryDate) {
        rowModel.value.factoryDate = format(rowDateModel.value.factoryDate, "yyyy-MM-dd hh:mm:ss");
      }
      if (rowDateModel.value.approachDate) {
        rowModel.value.approachDate = format(rowDateModel.value.approachDate, "yyyy-MM-dd hh:mm:ss");
      }
      if (rowDateModel.value.receptionDate) {
        rowModel.value.receptionDate = format(rowDateModel.value.receptionDate, "yyyy-MM-dd hh:mm:ss");
      }
      message.success('修改成功')
      Object.assign(selectRow.value, rowModel.value)
      showModal1.value = false
    }
    const dataChangeEvent = () => {
    }
    const fileUploadButtonRef = ref(null)
    watch([() => rowModel.value.acceptanceAmount, () => rowModel.value.acceptanceTaxRate], ([acceptanceAmount, acceptanceTaxRate]) => {
      if (acceptanceAmount && rowModel.value.acceptanceNumber) {
        // 验收含税总价
        rowModel.value.acceptanceSumAmount = rowModel.value.acceptanceNumber * 1 * (acceptanceAmount * 1);

        if (acceptanceTaxRate) {
          // 验收总税额
          rowModel.value.acceptanceSumUntaxedAmount = (
            rowModel.value.acceptanceSumAmount /
            (1 + acceptanceTaxRate / 100)
          ).toFixed(2);
          // 验收税额
          rowModel.value.acceptanceUntaxedAmount = (acceptanceAmount / (1 + acceptanceTaxRate / 100)).toFixed(
            2
          );
          // 验收未税总额
          rowModel.value.acceptanceSumTaxAmount = (rowModel.value.acceptanceSumAmount - rowModel.value.acceptanceSumUntaxedAmount).toFixed(
            2
          );
          // 验收未税单价
          rowModel.value.acceptanceTaxAmount = (
            acceptanceAmount - rowModel.value.acceptanceUntaxedAmount
          ).toFixed(2);
        }
      }
    })
    const editActived = ({ $rowIndex, row }) => {
      if ($rowIndex == 0) return true
      if (row.qualityAssuranceLevel) return true
      if (!detailList.value[$rowIndex - 1].qualityAssuranceLevel) return true
      if (row.itemId != detailList.value[$rowIndex - 1].itemId) return true
      let { factoryDate, factorySn, qualityAssuranceLevel, manufacturer, productionDate, batchNumber, factoryCode, serviceLife, warehouseName, shelfName } = detailList.value[$rowIndex - 1]
      detailList.value[$rowIndex] = { ...row, factoryDate, factorySn, qualityAssuranceLevel, manufacturer, productionDate, batchNumber, factoryCode, serviceLife, warehouseName, shelfName }
      detailTable.value.loadData(detailList.value)
      // detailTable.value.setEditRow(row)
    }
    const wuziTypeList = ref([])
    onMounted(async () => {
      wuziType().then(res => {
        wuziTypeList.value = res
      })
    });
    return {
      showModal,
      detailTable,
      spinShow,
      onPositiveClick,
      searchEvent,
      searchValue,
      selected,
      contractCode,
      detailList,
      taxRateList,
      unitList,
      clickCell,
      editRow,
      dataChangeEvent,
      showModal1,
      rowModel,
      selectRow,
      rowDateModel,
      selectedAssRow,
      getUrl,
      setTableValue,
      getTableValue,
      delIemRow,
      editActived,
      wuziTypeList,
      fileUploadButtonRef
    };
  },
});
</script>
<style lang="less">
.employeePickModal {
  .ivu-modal-body {
    padding: 0;
  }
}

.employeePick {
  height: 34px;

  .viewEmployeeColumnDel {
    padding: 2px;

    .ivu-table-cell {
      padding: 0 0 0 10px;
    }
  }

  .table-title {
    font-size: 14px;
    font-weight: bold;
    text-indent: 10px;

    .table-title-btn {
      float: right;
      margin: 10px;
    }
  }

  .employeePickInput {
    .ivu-input {
      background-color: #fff;
      color: #333;
      cursor: help;
    }
  }

  .ivu-poptip {
    .ivu-poptip-rel {
      width: 100%;
      vertical-align: middle;
    }

    .ivu-poptip-body {
      padding: 0;
    }
  }

  .table-left {
    border-top: 0;
    border-bottom: 0;
    border-right: 0;
  }

  .table-right {
    border: 0;
  }

  .ivu-modal-body {
    padding: 0;
  }

  .ivu-modal-footer {
    border-top: 0;
  }

  .ivu-poptip-popper {
    padding: 0;
  }
}

.sider {
  padding: 5px;
  border-bottom: 1px solid #dcdee2;
  height: 780px;
}
</style>
