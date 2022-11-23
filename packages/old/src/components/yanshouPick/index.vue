<template>
  <n-input-group @click="selectContract()">
    <n-input v-model:value="contractCode" disabled :style="{ width: '100%' }" placeholder="选择验收信息"
      class="selectedInput" />
    <n-button style="padding: 0 8px">
      <NwIcon name="icon-sousuo1" :size="15"></NwIcon>
    </n-button>
  </n-input-group>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="选择验收信息" content="你确认"
    positive-text="确认" negative-text="取消" style="width: 1200px">
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
import { contractPurchaseList, wuziType } from "./api";
import NwIcon from "/@/components/nw-icon/index.vue";
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

    }
    const selectContract = () => {
      showModal.value = true;
      searchValue.value = ''
      nextTick(() => {
        console.log(xGrid.value)
        xGrid.value.commitProxy("query");
      })

    };
    const auditStatusMap = {
      0: "草稿",
      1: '运行中',
      2: '完成',
      3: '挂起',
      4: '终止',
      5: '知会',
    }
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
        { type: "seq", width: 60 },
        {
          field: "code", title: "验收编号", showHeaderOverflow: true, showOverflow: true, slots: {
            default: ({ row }) => {
              return <span onClick={() => { showDetails(row) }} style="color:#1d7ced;cursor: pointer;">{row.code}</span>
            }
          }
        },
        // {
        //   field: "assetSource", title: "物资来源", showHeaderOverflow: true, showOverflow: true, slots: {
        //     default: ({ row }) => {
        //       return <span>{wuziTypeList.value.find(d => d.dictItemCode == row.assetSource) ? wuziTypeList.value.find(d => d.dictItemCode == row.assetSource).dictItemName : ''}</span>
        //     }
        //   }
        // },
        // { field: "", title: "采购数量", showHeaderOverflow: true, showOverflow: true, },
        { field: "sumTotalNumber", title: "验收数量", showHeaderOverflow: true, showOverflow: true, },
        { field: "sumTotalAmount", title: "合计金额", showHeaderOverflow: true, showOverflow: true, },
        { field: "explanation", title: "说明", showHeaderOverflow: true, showOverflow: true, },
        { field: "applyUserName", title: "验收人", showHeaderOverflow: true, showOverflow: true, },
        //{ field: "applyUserDeptName", title: "验收部门", showHeaderOverflow: true, showOverflow: true, },
        //{ field: "applyUserOrgName", title: "验收单位", showHeaderOverflow: true, showOverflow: true, },
        { field: "applyTime", title: "申请时间", showHeaderOverflow: true, showOverflow: true, },
       /* {
          field: "", title: "审核状态", showOverflow: true,
          slots: {
            default: ({ row }) => {
              let a
              if (row.auditStatus == 0 || row.auditStatus == 1 || row.auditStatus == 5) {
                a = <span style="display: inline-block;width:6px;height:6px;border-radius:50%;background:#1D68FF;margin-right: 5px;position: relative;
    top: -1px;"></span>
              }
              if (row.auditStatus == 2) {
                a = <span style="display: inline-block;width:6px;height:6px;border-radius:50%;background:#13AB62;margin-right: 5px;position: relative;
    top: -1px;"></span>
              }
              if (row.auditStatus == 3 || row.auditStatus == 4) {
                a = <span style="display: inline-block;width:6px;height:6px;border-radius:50%;background:#FF1D1D;margin-right: 5px;position: relative;
    top: -1px;"></span>
              }
              return [
                a,
                <span>
                  {auditStatusMap[row.auditStatus]}
                </span>,
              ];
            },
          }
        },*/
        { field: "explanation", title: "说明", showHeaderOverflow: true, showOverflow: true, },

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
    const contractCode = ref('')
    if (props.value) {
      contractCode.value = props.value
    }
    const onPositiveClick = () => {
      contractCode.value = selected.value.code
      context.emit("update:value", selected.value.code);
      context.emit("update:id", selected.value.id);
      showModal.value = false
    }

    watch(() => props.partyaCode, (d) => {
      // alert(d)
      nextTick(() => {
        console.log(xGrid.value)
        xGrid.value.commitProxy("query");
      })
    })
    const wuziTypeList = ref([])
    onMounted(async () => {
      wuziType().then(res => {
        wuziTypeList.value = res
      })
    });
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
      contractCode,
      wuziTypeList
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
