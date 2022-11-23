<template>
  <n-drawer v-model:show="showModal" style="width: 960px" preset="dialog">
    <n-drawer-content title="物资详情">
      <div class="manhour-details">
        <div class="title">
          <h1>{{ dataModel.taskName }}</h1>
        </div>
        <div class="taskShow">
          <div>
            <h2>入库编号</h2>
            <span>{{ dataModel.code }}</span>
          </div>
          <div>
            <h2>申请时间</h2>
            <span>{{ dataModel.applyTime }}</span>
          </div>
        </div>
        <div class="manhour">
          <h3>基本信息</h3>
          <div>
            <span>入库金额</span><span>{{ dataModel.sumTotalAmount }}</span>
          </div>
          <div>
            <span>物资来源</span><span>{{ dataModel.assetSourceName }}</span>
          </div>
          <div>
            <span>验收信息</span><span>{{ dataModel.acceptanceCode }}</span>
          </div>
          <div>
            <span>申请人</span><span style="width: auto">{{ dataModel.applyUserName }}</span>
            <span>申请部门</span><span style="width: auto">{{ dataModel.applyUserDeptName }}</span>
            <span>申请机构</span><span style="width: auto">{{ dataModel.applyUserOrgName }}</span>
          </div>
        </div>
        <div class="manhour">
          <h3>物资验收待入库信息</h3>
        </div>
        <vxe-table ref="skuListTable" show-overflow :data="dataModel.detailList" :column-config="{ resizable: true }"
          style="margin-top: 30px">
          <vxe-column type="seq" title="序号" width="60"></vxe-column>
          <vxe-column field="assetsCode" width="135" title="资产编号">
          </vxe-column>
          <vxe-column field="itemCode" width="135" title="物资编号">
          </vxe-column>
          <vxe-column field="itemType" v-if="dataModel.assetSource == 1" width="135" title="物资类别">
            <template v-slot="{ row }">
              <span>{{
                  wuziTypeList.find(d => d.dictItemCode == row.itemType) ? wuziTypeList.find(d => d.dictItemCode ==
                    row.itemType).dictItemName : ""
              }}</span>
            </template>
          </vxe-column>
          <vxe-column field="itemType" v-else title="物资类别" width="135" :edit-render="{}" transfer>
            <template #edit="{ row }">
              <nwDictionary dictCode="asset_type" v-model:value="row.itemType" v-model:label="row.itemTypeName"
                @change="(type) => itemTypeChange(type, { row, column })">
              </nwDictionary>
            </template>
            <template #default="{ row }">
              <span>{{
                  wuziTypeList.find(d => d.dictItemCode == row.itemType) ? wuziTypeList.find(d => d.dictItemCode ==
                    row.itemType).dictItemName : ""
              }}</span>
            </template>
          </vxe-column>
          <vxe-column field="itemName" width="135" title="物资名称">
          </vxe-column>
          <vxe-column field="descshort" width="135" title="物资描述">
          </vxe-column>
          <vxe-column field="specs" width="135" title="规格">
          </vxe-column>
          <vxe-column field="supplierName" width="135" title="供应商" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.supplierName" type="text">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="contractCode" width="135" title="合同号" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.contractCode" type="text">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="billCodes" width="135" title="发票号" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.billCodes" type="text">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="unitName" width="135" title="单位">
          </vxe-column>
          <!-- <vxe-column field="accpetanceTime" width="135" title="验收时间">
              </vxe-column>
              <vxe-column field="accpetanceCode" width="135" title="验收编号">
              </vxe-column> -->
          <vxe-column field="storageNumber" width="135" title="入库数量" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.storageNumber" type="number" @change="dataChangeEvent({ row, column })">
              </vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="stotageTaxRate" title="入库税率" width="135" :edit-render="{}" transfer>
            <template #edit="{ row }">
              <vxe-select v-model="row.stotageTaxRate" @change="dataChangeEvent({ row, column })" transfer>
                <vxe-option v-for="item in taxRateList" :key="item.dictItemCode" :value="item.dictItemCode"
                  :label="item.dictItemName"></vxe-option>
              </vxe-select>
            </template>
            <template #default="{ row }">
              <span>{{ row.stotageTaxRate ? row.stotageTaxRate + "%" : "" }}</span>
            </template>
          </vxe-column>
          <vxe-column field="storageAmount" width="135" title="入库单价" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.storageAmount" type="number" @change="dataChangeEvent({ row, column })">
              </vxe-input>
            </template>
          </vxe-column>

          <!-- <vxe-column field="storageUntaxedAmount" width="135" title="入库未税金额" :edit-render="{}">
                <template #edit="{ row, column }">
                  <vxe-input v-model="row.storageUntaxedAmount" type="number"
                    @change="dataChangeEvent({ row, column })">
                  </vxe-input>
                </template>
              </vxe-column> -->

          <vxe-column field="storageTime" width="135" title="入库日期" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.storageTime" type="date" placeholder="请选择日期" transfer></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="warehouseName" width="135" title="仓库" :edit-render="{}">
            <template #edit="{ row, column }">
              <warehousePick v-model:value="row.warehouseName" v-model:id="row.warehouseId"></warehousePick>
            </template>
          </vxe-column>
          <vxe-column field="shelfName" title="货架号" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <warehouseShelfPick v-model:value="row.shelfName" :warehouseId="row.warehouseId"
                :warehouseName="row.warehouseName" v-model:id="row.shelfId" />
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
              <fileUploadButton ref="fileUploadButtonRef" v-model:fileIds="row.document" :showFileList="false"
                :showLookOver="true" :multiple="true">
              </fileUploadButton>
            </template>
          </vxe-column>
        </vxe-table>
        <div class="manhour">
          <h3>附件</h3>
        </div>
        <fileInfo style="margin-top: 30px" v-model:value="dataModel.fileIds" readonly></fileInfo>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { NwIcon } from '@platform/main'
import fileInfo from "../../components/fileInfo/index.vue";
import { getpurchaseRegister, fileinfo, wuziType } from "./api/index.js";
import fileUploadButton from "../../components/fileUploadButton/index.vue";
import {
  defineComponent,
  ref,
  reactive,
  getCurrentInstance,
  onMounted,
  h,
} from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NSelect,
  NForm,
  NFormItem,
  NUpload,
  NImage,
  useMessage,
  NSpin,
  NRadio,
  NCard,
  NModal,
  NSpace,
  NRadioGroup,
  NDataTable,
  NPagination,
  NGrid,
  NGi,
  NFormItemGi,
  NRate,
} from "naive-ui";
export default defineComponent({
  components: {
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NSelect,
    NForm,
    NFormItem,
    NUpload,
    NwIcon,
    NImage,
    NSpin,
    NRadio,
    NCard,
    NModal,
    NSpace,
    NRadioGroup,
    NDataTable,
    NPagination,
    NGrid,
    NFormItemGi,
    NRate,
    NGi,
    fileInfo,
    fileUploadButton
  },
  props: ["value", "keyWord"],
  emits: ["onUpdate"],
  data() {
    return {};
  },
  setup(props, context) {
    const message = useMessage();
    const dataModel = ref({});
    const showModal = ref(false);
    const filesSons = ref([]);
    const show = (v) => {
      showModal.value = true;
      if (v.id) {
        getpurchaseRegister(v.id).then((res) => {
          dataModel.value = res;
        });
      }
      if (v.fileIds) {
        fileinfo(v.fileIds).then((res) => {
          filesSons.value = res;
        });
      }
      dataModel.value = row;
    };
    const wuziTypeList = ref([])
    onMounted(async () => {
      wuziType().then(res => {
        wuziTypeList.value = res
      })
    });
    const getUrl = (id) => {
      return `${window.apiBaseURL}/main/fileinfo/stream?id=${id}&access_token=${token}`
    }
    return {
      getUrl,
      showModal,
      show,
      message,
      dataModel,
      filesSons,
      wuziTypeList
    };
  },
  created() { },
  methods: {},
});
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}

.n-drawer-header {
  background: #f1f1f6;

  .n-drawer-header__main {
    color: #010101;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
  }
}

.manhour-details {
  color: #010101;
  margin-bottom: 20px;

  .title {
    display: flex;

    h1 {
      color: #010101;
      font-size: 16px;
      font-weight: 400;
    }

    span {
      margin-left: 16px;
      font-size: 12px;
      padding-top: 10px;
    }
  }

  .taskShow {
    margin-top: 30px;
    display: flex;

    div {
      margin-right: 80px;

      h2 {
        font-size: 12px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 12px;
        color: #999999;
      }

      span {
        color: #010101;
        padding-top: 5px;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  .manhour {
    margin-top: 30px;

    h3 {
      padding-left: 8px;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #010101;
      border-left: #1d7ced 2px solid;
    }

    div {
      margin-top: 30px;

      span {
        display: inline-block;
        width: auto;
        margin-right: 30px;
        text-align: left;
        color: #999999;
      }

      span:nth-child(2n) {
        margin-right: 30px;
        color: #010101;
      }
    }
  }

  .audit {
    margin-top: 30px;

    h3 {
      padding-left: 8px;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #010101;
      border-left: #1d7ced 2px solid;
    }

    div.content {
      margin-top: 30px;
      background: #fff;

      .content-p {
        height: 92px;
        width: 792px;
        margin-bottom: 16px;
        box-sizing: border-box;
        background: #f8f8fc;
        opacity: 1;
        border-radius: 2px;
        padding: 16px 24px;

        span {
          margin-right: 24px;
        }

        a {
          margin-left: 5px;
          color: #1d7ced;
        }

        .n-rate {
          position: relative;
          top: 3px;
        }

        p {
          margin-top: 10px;

          span {
            margin-left: 42px;
          }
        }
      }
    }
  }
}
</style>