<template>
  <n-drawer v-model:show="showModal" style="width: 960px" preset="dialog">
    <n-drawer-content title="物资详情">
      <div class="manhour-details">
        <div class="title">
          <h1>{{ dataModel.taskName }}</h1>
        </div>
        <div class="taskShow">
          <div>
            <h2>派发编号</h2>
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
            <span>总金额</span><span>{{ dataModel.sumTotalAmount }}</span>
          </div>
          <div>
            <span>物资领用</span><span>{{ dataModel.sourceCode }}</span>
          </div>
          <div>
            <span>申请人</span><span style="width: auto">{{ dataModel.applyUserName }}</span>
            <span>申请部门</span><span style="width: auto">{{ dataModel.applyUserDeptName }}</span>
            <span>申请单位</span><span style="width: auto">{{ dataModel.applyUserOrgName }}</span>
          </div>
        </div>
        <div class="manhour">
          <h3>派发明细</h3>
        </div>
        <vxe-table ref="skuListTable" show-overflow :data="dataModel.assetsList" :column-config="{ resizable: true }"
          style="margin-top: 30px">
          <vxe-column type="seq" title="序号" fixed="left" width="60"></vxe-column>
          <vxe-column field="itemCode" title="物资编码" width="135">
          </vxe-column>
          <vxe-column field="itemName" title="物资名称" width="135">
          </vxe-column>
          <vxe-column field="descshort" title="物资描述" width="135">
          </vxe-column>
          <vxe-column field="itemType" title="物资类型" width="135">
            <template v-slot="{ row }">
              <span>{{
                  wuziTypeList.find(d => d.dictItemCode == row.itemType) ? wuziTypeList.find(d => d.dictItemCode ==
                    row.itemType).dictItemName : ""
              }}</span>
            </template>
          </vxe-column>
          <vxe-column field="descshort" title="规格" width="135">
          </vxe-column>
          <vxe-column field="materialQuality" title="材质" width="135">
          </vxe-column>
          <vxe-column field="applyUserOrgName" title="申请单位" width="135">
          </vxe-column>
          <vxe-column field="applyUserDeptName" title="申请部门" width="135">
          </vxe-column>
          <vxe-column field="applyUserName" title="申请人" width="135">
          </vxe-column>
          <vxe-column field="unitName" title="单位" width="135">
          </vxe-column>
          <vxe-column field="applyNumber" title="申请数量" width="135">
          </vxe-column>
          <vxe-column field="distributeNumber" title="派发数量" width="135" :edit-render="{}">
            <template #edit="{ row, column }">
              <vxe-input v-model="row.distributeNumber" type="number">
              </vxe-input>
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
import { getpurchaseRegister, fileinfo, dictItemLists } from "./api/index.js";
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
      dictItemLists("asset_type").then((res) => {
        wuziTypeList.value = res;
      });
    });

    return {
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