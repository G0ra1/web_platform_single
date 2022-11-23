<template>
  <!-- <n-input-group>
    <n-input v-model:value="inputValue" />
    <n-button ghost @click="show">
      <NwIcon name="icon-sousuo1" size="15" style="color: #828282; cursor: pointer" />
    </n-button>
  </n-input-group>-->

  <n-drawer v-model:show="showModal" style="width: 1060px" preset="dialog">
    <n-drawer-content title="物资详情">
      <div class="manhour-details">
        <div class="title">
          <h1>{{ dataModel.taskName }}</h1>
        </div>
        <div class="taskShow">
          <div>
            <h2>物资名称</h2>
            <span>{{ dataModel.itemName }}</span>
          </div>
          <div>
            <h2>物资编码</h2>
            <span>{{ dataModel.itemCode }}</span>
          </div>
        </div>
        <div class="manhour">
          <div>
            <span>所属机构</span><span>{{ dataModel.assetOrgName }}</span>
          </div>
          <div>
            <span>所属部门</span><span style="width: auto">{{ dataModel.assetDeptName }}</span>
          </div>
          <div>
            <span>物资类型</span><span style="width: auto">{{ dataModel.itemType }}</span>
          </div>
          <div>
            <span>总数量</span><span style="width: auto">{{ dataModel.assetsNumber }}</span>
            <span>入库数量</span><span style="width: auto">{{ dataModel.storageNumber }}</span>
            <span>库存数量</span><span style="width: auto">{{ dataModel.stockNumber }}</span>
            <span>出库数量</span><span style="width: auto">{{ dataModel.deliveryNumber }}</span>

          </div>
          <div>
            <span>领用数量</span><span style="width: auto">{{ dataModel.acceptNumber }}</span>
            <span>借入数量</span><span style="width: auto">{{ dataModel.borrowNumber }}</span>
            <span>调拨数量</span><span style="width: auto">{{ dataModel.transferNumber }}</span>                       
            <span>维修数量</span><span style="width: auto">{{ dataModel.repairNumber }}</span>
          </div>
        </div>
        <div class="manhour">
          <h3>
            SKU属性
          </h3>
        </div>
      </div>
      <vxe-table ref="skuListTable" show-overflow :data="dataModel.assetsSkuList" :column-config="{ resizable: true }">
        <vxe-column field="assetOrgName" title="所属机构">
        </vxe-column>
        <vxe-column field="assetDeptName" title="所属部门">
        </vxe-column>
        <vxe-column field="itemName" title="物资名称">
        </vxe-column>
        <vxe-column field="itemCode" title="物资编码">
        </vxe-column>
        <vxe-column field="assetsNumber" title="总数量">
        </vxe-column>
        <vxe-column field="storageNumber" title="入库数量">
        </vxe-column>
        <vxe-column field="stockNumber" title="库存数量">
        </vxe-column>
        <vxe-column field="deliveryNumber" title="出库数量">
        </vxe-column>
        <vxe-column field="acceptNumber" title="领用数量">
        </vxe-column>
        <vxe-column field="borrowNumber" title="借入数量">
        </vxe-column>
        <vxe-column field="transferNumber" title="调拨数量">
        </vxe-column>
        <vxe-column field="repairNumber" title="维修数量">
        </vxe-column>
      </vxe-table>
    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { NwIcon } from '@platform/main'
import { details } from './api/index.js'
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
    const spinShow = ref(false);
    const page = ref(1);
    const pageCount = ref(0);
    const ntData = ref([]);
    const dsId = ref("");
    const searchForm = reactive({});
    const selected = ref([]);
    const api = ref("");
    const inputValue = ref("");
    const proId = ref();
    inputValue.value = props.value;
    const show = (row) => {
      showModal.value = true;
      details(row.id).then(res => {
        console.log(res, 'details(row.id)')
        dataModel.value = res;
      })

    };
    const confirm = () => {
      showModal.value = false;
      // inputValue.value = selected.value[props.keyWord]
      // context.emit('onUpdate', selected.value)
    };
    const columns = [
      {
        title: "",
        key: "title",
      },
      {
        title: "编",
        key: "compileWorkHour",
      },
      {
        title: "校",
        key: "checkWorkHour",
      },
      {
        title: "审",
        key: "reviewerWorkHour",
      },
      {
        title: "合计",
        key: "totalWorkHour",
      },
    ];
    onMounted(async () => { });

    return {
      showModal,
      spinShow,
      columns,
      dsId,
      ntData,
      page,
      pageCount,
      searchForm,
      show,
      selected,
      api,
      confirm,
      inputValue,
      message,
      proId,
      dataModel,
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
        min-width: 80px;
        margin-right: 30px;
        text-align: left;
        color: #999999;
      }

      span:nth-child(2n) {
        margin-right: 30px;
        min-width: 80px;
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