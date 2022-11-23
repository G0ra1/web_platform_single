<template>
  <!-- <n-input-group>
    <n-input v-model:value="inputValue" />
    <n-button ghost @click="show">
      <NwIcon name="icon-sousuo1" size="15" style="color: #828282; cursor: pointer" />
    </n-button>
  </n-input-group>-->

  <n-drawer v-model:show="showModal" style="width: 960px" preset="dialog">
    <n-drawer-content title="物资详情">
      <div class="manhour-details">
        <div class="title">
          <h1>{{ dataModel.taskName }}</h1>
        </div>
        <div class="taskShow">
          <div>
            <h2>物资分类名称</h2>
            <span>{{ dataModel.classifyName }}</span>
          </div>
          <div>
            <h2>物资分类编码</h2>
            <span>{{ dataModel.classifyCode }}</span>
          </div>
        </div>
        <div class="manhour">
          <h3>物资详细信息</h3>
          <div>
            <span>物资名称</span><span>{{ dataModel.itemName }}</span>
          </div>
          <div>
            <span>物资编码</span><span>{{ dataModel.itemCode }}</span>
          </div>
          <div>
            <span>物资规格</span><span>{{ dataModel.specs }}</span>
          </div>
          <div>
            <span>物资材质</span><span style="width: auto">{{ dataModel.materialQuality }}</span>
            <span>物资标准</span><span style="width: auto">{{ dataModel.standard }}</span>
            <span>物资单位</span><span style="width: auto">{{ dataModel.unitName }}</span>
            <span>是否多计量</span><span style="width: auto">{{ dataModel.isUnit ? '是' : '否' }}</span>
          </div>
          <div>
            <span>物资编码短描述</span><span>{{ dataModel.descshort }}</span>
          </div>
          <div>
            <span>物资编码长描述</span><span>{{ dataModel.desclong }}</span>
          </div>
          <div>
            <span>状态</span><span>{{ dataModel.state }}</span>
          </div>
        </div>
        <div class="manhour" style="margin-bottom:20px" v-if="dataModel.isUnit">
          <h3>
            计量单位
          </h3>
        </div>
        <vxe-table v-if="dataModel.isUnit" ref="unitListTable" :seq-config="tableSeqUnitName" show-overflow
          :data="[{ unitName: dataModel.unitName }, ...dataModel.unitList]" :column-config="{ resizable: true }">
          <vxe-column type="seq" title="-" width="80"></vxe-column>
          <vxe-column field="unitName" title="单位" :edit-render="{}">

          </vxe-column>
          <vxe-column field="conversionRate" title="换算率" :edit-render="{}">

          </vxe-column>
          <vxe-column title="换算单位">
            <template #default="{ row, column, rowIndex }">
              <span v-if="rowIndex != 0">{{ dataModel.unitName }}</span>
            </template>
          </vxe-column>
        </vxe-table>
        <div class="manhour">
          <h3>
            SKU属性
          </h3>
        </div>
      </div>
      <vxe-table ref="skuListTable" :seq-config="tableSeq" show-overflow :data="itemSkuList"
        :column-config="{ resizable: true }">
        <vxe-column type="seq" title="序号" width="80"></vxe-column>
        <vxe-column field="skuCode" title="sku编码" :edit-render="{}">
          <template #edit="{ row, column }">
            <vxe-input v-model="row.skuCode" type="text" @change="dataChangeEvent({ column })"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column v-for="item in skuColumn" :key="item.field" :field="item.field" :title="item.title"
          :edit-render="{}">
          <template #edit="{ row, column }">
            <vxe-input v-model="row[item.field]" @change="dataChangeEvent({ column })" type="text"></vxe-input>
          </template>
        </vxe-column>
      </vxe-table>


    </n-drawer-content>
  </n-drawer>
</template>
<script>
import { NwIcon } from '@platform/main'
import goodsShelf from "../warehouse-manage/goodsShelf.vue";
import { getItem } from './api/index.js'
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
    goodsShelf,
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
    const skuColumn = ref([])
    const itemSkuList = ref([])
    inputValue.value = props.value;
    const tableSeq = ref({
      seqMethod({ rowIndex }) {
        if (rowIndex + 1 < 10) {
          return `0${rowIndex + 1}`
        } else {
          return `${rowIndex + 1}`
        }

      },
    })
    const tableSeqUnitName = ref({
      seqMethod({ rowIndex }) {
        if (rowIndex == 0) return "主计量"
        return '辅计量'
      },
    })
    const show = (v) => {
      showModal.value = true;
      if (v.id) {
        getItem(v.id).then(res => {
          dataModel.value = res
          console.log(res, 'getItem')
          if (res.skuList && res.skuList.length > 0) {
            skuColumn.value = []
            res.skuList.forEach(e => {
              let d = {}
              d.title = e.skuName
              d.field = e.id
              d.sort = e.sort
              skuColumn.value.push(d)
            })
          }
          console.log(skuColumn.value, 'skuColumn')
          if (res.skuLineList && res.skuLineList.length > 0) {
            itemSkuList.value = []
            res.skuLineList.forEach(e => {
              let d = {}
              d.skuCode = e.skuCode
              if (e.skuColumnList && e.skuColumnList.length > 0) {
                e.skuColumnList.forEach(f => {
                  d[f.skuId] = f.skuValue
                })
              }
              itemSkuList.value.push(d)
            })
          }
          console.log(itemSkuList.value, 'itemSkuList')
        })
      }
      dataModel.value = row;
    };
    const goodsShelfRef = ref(null);
    const formatHouseType = (houseType) => {
      switch (houseType) {
        case "1":
          return "仓库";
          break;
        case "2":
          return "虚拟仓";
          break;
        case "3":
          return "位置信息";
          break;
        default:
          break;
      }
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
      formatHouseType,
      goodsShelfRef,
      skuColumn,
      itemSkuList,
      tableSeq,
      tableSeqUnitName
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