<template>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="选择物资待入库信息" content="你确认"
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
import { getDetailByAssets, wuziType } from "./api";
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
    code: {
      type: String,
      default: ''
    },
    acceptanceId: {
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
    const sonFn = (e) => {
      showModal.value = true;
      selected.value = e
      searchValue.value = ''
      nextTick(() => {
        // console.log(xGrid.value)
        // alert(props.acceptanceId)
        // getDetailByAssets({
        //   searchCondition: searchValue.value,
        //   acceptanceId: props.acceptanceId,
        //   page: {
        //     current: 1,
        //     size: 10,
        //   },
        // })
        // xGrid.value.commitProxy("query");
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
        keyField: "assetsDetailId",
      },
      checkboxConfig: {
        reserve: true,
      },
      pagerConfig: {
        pageSize: 20,
      },
      columns: [
        { type: "seq", width: 50, minWidth: 50 },
        {
          field: "itemName", title: "物资名称", minWidth: 120, showHeaderOverflow: true, showOverflow: true,
        },
        { field: "itemCode", title: "物资编码", minWidth: 120, showHeaderOverflow: true, showOverflow: true, },
        { field: "descshort", title: "物资描述", minWidth: 120, showHeaderOverflow: true, showOverflow: true, },
        {
          field: "itemType", title: "物资类型", minWidth: 120, showHeaderOverflow: true, showOverflow: true, slots: {
            default: ({ row }) => {
              return <span>{row.itemType ? wuziTypeList.value.find(d => d.dictItemCode == row.itemType).dictItemName : ''}</span>
            }
          }
        },
        //{ field: "acceptanceNumber", title: "验收数量", minWidth: 120, showHeaderOverflow: true, showOverflow: true, },
        { field: "storageNumber", title: "未验收数量", minWidth: 120, showHeaderOverflow: true, showOverflow: true, },
        //{ field: "storageNumber", title: "本次入库数量", minWidth: 120, showHeaderOverflow: true, showOverflow: true, },
        {
          field: "",
          title: "操作",
          fixed: "right",
          width: 120,
          showHeaderOverflow: true,
          slots: {
            default: ({ row }) => {
              let btn1 =
                selected.value.map(d => d.assetsDetailId).indexOf(row.assetsDetailId) < 0 ? (
                  <span
                    style="color:#409eff;cursor: pointer;margin-left:10px"
                    onClick={() => selected.value.push(row)}
                  >
                    选择
                  </span >
                ) : (
                  ""
                );

              let btn3 = selected.value.map(d => d.assetsDetailId).indexOf(row.assetsDetailId) >= 0 ? (
                <span
                  style="color:#e6a23c;cursor: pointer;margin-left:10px"
                  onClick={() => {
                    selected.value.splice(selected.value.map(d => d.assetsDetailId).indexOf(row.assetsDetailId), 1)
                  }}
                >
                  取消
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
              getDetailByAssets({
                searchCondition: searchValue.value,
                acceptanceId: props.acceptanceId,
                page: {
                  current: !currentPage ? page.currentPage : currentPage,
                  size: page.pageSize,
                },
              }).then((res) => {
                resolve({
                  total: res.total,
                  result: res.map(d => {
                    return d
                  })
                });
              });
            });
          },
        },
      },
    });
    const selected = ref([])
    const applyCode = ref('')
    if (props.code) {
      applyCode.value = props.code
    }
    const onPositiveClick = () => {
      context.emit("callback", selected.value);
      showModal.value = false
    }
    watch(() => props.code, (d) => {
      nextTick(() => {
        applyCode.value = d
        console.log(props.value, 'props.valueprops.value')
        props.value.split(',').forEach((d, i) => {
          selected.value.map(e => e.assetsDetailId).indexOf(d) < 0 ? selected.value.push({
            id: d,
            code: applyCode.value.split(',')[i]
          }) : ""
        })
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
      sonFn,
      onPositiveClick,
      searchEvent,
      searchValue,
      selected,
      applyCode,
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
