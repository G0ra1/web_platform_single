<template>
  <n-input-group @click="selectContract()">
    <n-input v-model:value="warehouseName" disabled :style="{ width: '100%' }" placeholder="选择仓库"
      class="selectedInput" />
    <n-button style="padding: 0 8px">
      <NwIcon name="icon-sousuo1" :size="15"></NwIcon>
    </n-button>
  </n-input-group>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="选择仓库信息" positive-text="确认"
    negative-text="取消" style="width: 1200px">
    <n-grid>
      <n-grid-item :span="24" style="height: 650px">
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
      height: 600,
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
        { type: "seq", width: 50 },
        {
          field: "warehouseName", title: "仓库名称", showHeaderOverflow: true, showOverflow: true
        },
        {
          field: "orgName", title: "责任主体", showHeaderOverflow: true,
          showOverflow: true
        },
        { field: "deptName", title: "责任部门", showHeaderOverflow: true },
        { field: "respondUserName", title: "责任人", showHeaderOverflow: true },
        {
          field: "", title: "仓库类型", showHeaderOverflow: true, showOverflow: true, slots: {
            default: ({ row }) => {
              return <span>{row.houseType == '1' ? '仓库' : row.houseType == '3' ? '位置信息' : '虚拟仓库'}</span>
            }
          }
        },
        { field: "address", title: "地点", showHeaderOverflow: true },
        { field: "remark", title: "备注", showHeaderOverflow: true, showOverflow: true },
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
    const warehouseName = ref('')
    if (props.value) {
      warehouseName.value = props.value
    }
    const onPositiveClick = () => {
      context.emit("update:value", selected.value.warehouseName);
      context.emit("update:id", selected.value.id);
      showModal.value = false
    }

    watch(() => props.value, (d) => {
      warehouseName.value = d
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
      warehouseName
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
