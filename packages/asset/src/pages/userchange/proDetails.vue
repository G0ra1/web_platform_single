<template>
  <n-drawer v-model:show="showModal" style="width: 960px" preset="dialog">
    <n-drawer-content title="物资详情">
      <div class="manhour-details">
        <div class="title">
          <h1>{{ dataModel.taskName }}</h1>
        </div>
        <div class="taskShow">
          <div>
            <h2>申请单号</h2>
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
            <span>采购类型</span><span>{{ dataModel.itemTypeName }}</span>
          </div>
          <div>
            <span>计划年度</span><span>{{ dataModel.planYear }}</span>
          </div>
          <div>
            <span>申请人</span
            ><span style="width: auto">{{ dataModel.applyUserName }}</span>
            <span>申请部门</span
            ><span style="width: auto">{{ dataModel.applyUserDeptName }}</span>
            <span>申请机构</span
            ><span style="width: auto">{{ dataModel.applyUserOrgName }}</span>
          </div>
        </div>
        <div class="manhour">
          <h3>物资计划信息</h3>
        </div>
        <vxe-table
          ref="skuListTable"
          show-overflow
          :data="dataModel.detailList"
          :column-config="{ resizable: true }"
          style="margin-top: 30px"
        >
          <vxe-column type="seq" title="序号" width="60"></vxe-column>
          <vxe-column field="itemName" title="物项名称"> </vxe-column>
          <vxe-column field="itemCode" title="物项编码"> </vxe-column>
          <vxe-column field="skuCode" title="物项属性"> </vxe-column>
          <vxe-column field="unitName" title="计量单位"> </vxe-column>
          <vxe-column field="applyNumber" title="申请数量"> </vxe-column>
          <vxe-column field="applyAmount" title="单价"> </vxe-column>
          <vxe-column field="applyAmount" title="税率">
            <template #default="{ row }">
              <span>{{ row.taxRate ? row.taxRate + "%" : "" }}</span>
            </template>
          </vxe-column>
          <vxe-column field="applySumAmount" title="总价"> </vxe-column>
          <vxe-column field="explanation" title="备注"> </vxe-column>
        </vxe-table>
        <div class="manhour">
          <h3>附件</h3>
        </div>
        <fileInfo
          style="margin-top: 30px"
          v-model:value="dataModel.fileIds"
          readonly
        ></fileInfo>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { NwIcon } from '@platform/main'
import fileInfo from "../../components/fileInfo/index.vue";
import { fileinfo } from "./api/index.js";
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
        // getpurchaseRegister(v.id).then((res) => {
        //   dataModel.value = res;
        // });
      }
      if (v.fileIds) {
        fileinfo(v.fileIds).then((res) => {
          filesSons.value = res;
        });
      }
      dataModel.value = row;
    };
    onMounted(async () => {});

    return {
      showModal,
      show,
      message,
      dataModel,
      filesSons,
    };
  },
  created() {},
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