<template>
  <n-drawer v-model:show="showModal" style="width: 960px" preset="dialog">
    <n-drawer-content title="物资详情">
      <div class="manhour-details">
        <div class="title">
          <h1>{{ dataModel.taskName }}</h1>
        </div>
        <div class="taskShow">
          <div>
            <h2>验收编号</h2>
            <span>{{ dataModel.code }}</span>
          </div>
          <div>
            <h2>验收时间</h2>
            <span>{{ dataModel.applyTime }}</span>
          </div>
        </div>
        <div class="manhour">
          <h3>基本信息</h3>
          <div>
            <span>总金额</span><span>{{ dataModel.sumTotalAmount }}</span>
          </div>
          <div>
            <span>采购登记</span><span>{{ dataModel.registerCode }}</span>
          </div>
          <div>
            <span>验收说明</span><span>{{ dataModel.explanation }}</span>
          </div>
          <div>
            <span>验收人</span><span style="width: auto">{{ dataModel.applyUserName }}</span>
            <span>验收部门</span><span style="width: auto">{{ dataModel.applyUserDeptName }}</span>
            <span>验收法人</span><span style="width: auto">{{ dataModel.applyUserOrgName }}</span>
          </div>
        </div>
        <div class="manhour">
          <h3>验收明细</h3>
        </div>
        <vxe-table ref="skuListTable" show-overflow :data="dataModel.detailList" :column-config="{ resizable: true }"
          style="margin-top: 30px">
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
          <vxe-column field="qualityAssuranceLevel" title="质保等级" width="135" :edit-render="{}" transfer>
            <template #edit="{ row }">
              <nwDictionary dictCode="asset_quality_level" v-model:value="row.qualityAssuranceLevel"
                v-model:label="row.qualityAssuranceLevel"></nwDictionary>
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
              <div style="display: flex">
                <fileUploadButton ref="fileUploadButtonRef" v-model:fileIds="row.document" :showFileList="false"
                  :showLookOver="true" :multiple="true">
                </fileUploadButton>
              </div>
            </template>
          </vxe-column>
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

import { NwIcon, Cookies, NwFunctionPredefine } from '@platform/main'
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
    const fileUploadButtonRef = ref(null)
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
    return {
      showModal,
      show,
      message,
      dataModel,
      filesSons,
      wuziTypeList,
      fileUploadButtonRef
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