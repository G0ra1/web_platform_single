<template>
  <n-input-group>
    <n-input v-model:value="supplierName" :style="{ width: '100%' }" placeholder="填写或选择供应商" class="selectedInput" />
    <n-button style="padding: 0 8px;height: 36px;" @click="selectContract()">
      <NwIcon name="icon-n-y-sousuo" :size="15"></NwIcon>
    </n-button>
  </n-input-group>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="选择供应商信息" content="你确认"
    positive-text="确认" negative-text="取消" style="width: 1200px">
    <n-grid>
      <n-grid-item :span="24" style="height: 480px">
        <n-spin :show="spinShow">
          <vxe-toolbar style="height: 40px">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item>
                  <template #default>
                    <vxe-input placeholder="搜索" v-model="searchValue"></vxe-input>
                    <vxe-button status="primary" @click="searchEvent">查询</vxe-button>
                  </template>
                </vxe-form-item>
                <vxe-form-item>
                  <template #default> </template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-toolbar>
          <vxe-grid v-bind="gridOptions" ref="xGrid"></vxe-grid>
        </n-spin>
      </n-grid-item>
    </n-grid>
    <template #action>
      <n-button type="warning" size="small" @click="showModal = false">取消</n-button>
      <n-button type="success" size="small" style="margin-right: 5px" @click="onPositiveClick">确定</n-button>
    </template>
  </n-modal>
</template>

<script lang="jsx">
import { defineComponent, ref, reactive, onMounted, nextTick, h, watch } from 'vue';
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
} from "naive-ui";
import { contractPurchaseList } from "./api";
import { NwIcon } from '@platform/main'

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
    const showModal = ref(false);
    const spinShow = ref(false);
    const xGrid = ref(null);
    const searchValue = ref('')
    const searchEvent = () => {
      xGrid.value.commitProxy("query");
    }
    const selectContract = () => {
      showModal.value = true;
      searchValue.value = ''
      nextTick(() => {
        console.log(xGrid.value)
        xGrid.value.commitProxy("query");
      })

    };
    const gridOptions = reactive({
      border: true,
      height: 450,
      rowConfig: {
        keyField: "id",
      },
      columnConfig: {
        resizable: true,
      },
      checkboxConfig: {
        reserve: true,
      },
      pagerConfig: {
        pageSize: 20,
      },
      columns: [
        { type: "seq", width: 60 },
        {
          field: "supplierName", title: "供应商名称", showHeaderOverflow: true,
          showOverflow: true, minWidth: 200,
        },
        {
          field: "supplierCode", title: "供应商编码", showHeaderOverflow: true,
          showOverflow: true, width: 120,
        },
        {
          field: "orgnizationCode", title: "组织机构代码/统一社会信用代码", showHeaderOverflow: true,
          showOverflow: true, width: 120,
        },
        {
          field: "taxpayerType", title: "纳税人类别", showHeaderOverflow: true,
          showOverflow: true, width: 120, slots: {
            default: ({ row }) => {
              return [
                <span>{row.taxpayerType == 1 ? "一般纳税人" : "小规模纳税人"}</span>,
              ];
            },
          }
        },
        {
          field: "registerCapital", title: "注册资金（万元）", showHeaderOverflow: true,
          showOverflow: true, width: 120,
        },
        {
          field: "",
          title: "操作",
          fixed: "right",
          width: 120,
          showHeaderOverflow: true,
          slots: {
            default: ({ row }) => {
              let btn1 =
                selected.value.id !== row.id ? (
                  <span
                    style="color:#409eff;cursor: pointer;margin-left:10px"
                    onClick={() => selected.value = row}
                  >
                    选择
                  </span>
                ) : (
                  ""
                );

              let btn3 = selected.value.id == row.id ? (
                <span
                  style="color:#e6a23c;cursor: pointer;margin-left:10px"
                  onClick={() => {

                  }}
                >
                  已选择
                </span>
              ) : (
                ""
              );
              return [btn1, btn3];
            },
          },
        },
      ],
      proxyConfig: {
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
          result: "result",
          total: "total",
        },
        ajax: {
          // 接收 Promise
          query: ({ page }, currentPage) => {
            return new Promise((resolve) => {
              contractPurchaseList({
                searchCondition: searchValue.value,
                partyaCode: props.partyaCode,
                isDefault: 1,
                page: {
                  current: !currentPage ? page.currentPage : currentPage,
                  size: page.pageSize,
                },
              }).then((res) => {
                resolve({
                  total: res.total,
                  result: res.records
                });
              });
            });
          },
        },
      },
    });
    const selected = ref({})
    const supplierName = ref('')
    if (props.value) {
      supplierName.value = props.value
    }
    const onPositiveClick = () => {
      supplierName.value = selected.value.supplierName
      context.emit("update:value", selected.value.supplierName);
      context.emit("update:id", selected.value.id);
      showModal.value = false
    }

    watch(() => supplierName.value, (d) => {
      nextTick(() => {
        context.emit("update:value", supplierName.value);
      })
    })
    watch(() => props.value, (d) => {
      supplierName.value = d
    })
    onMounted(async () => { });
    return {
      showModal,
      xGrid,
      spinShow,
      gridOptions,
      selectContract,
      onPositiveClick,
      searchEvent,
      searchValue,
      selected,
      supplierName
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
