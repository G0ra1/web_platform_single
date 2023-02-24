<template>
  <!-- <n-input  class="my-search" placeholder="" disabled >
    <template #suffix>
        <n-button type="info"   @Click="(e)=>{showModalRef=true}">选择</n-button>
    </template>
    </n-input>-->
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="选择物资" content="你确认" positive-text="确认"
    negative-text="取消" style="width: 1200px">
    <n-grid>
      <n-grid-item span="6" style="height: 580px" v-if="showSide">
        <div class="sider" style="height: 5600px">
          <n-input v-model:value="searchItemClassName" clearable placeholder="搜索物资分类" />
          <n-spin :show="leftSpinShow">
            <n-tree placeholder="请选择" :data="tree.treeList" style="height: 540px; padding: 5px 0" block-line
              virtual-scroll :pattern="searchItemClassName" :show-irrelevant-nodes="false"
              :default-expanded-keys="['0']" @update:selected-keys="treeSelect" />
          </n-spin>
        </div>
      </n-grid-item>
      <n-grid-item :span="showSide ? 18 : 24" style="height: 520px">
        <n-spin :show="spinShow">
          <vxe-toolbar style="height: 40px">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item v-if="multiple">
                  <template #default>待选择物资</template>
                </vxe-form-item>
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
          <vxe-toolbar style="height: 40px" v-if="multiple">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item>
                  <template #default>已选择物资</template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-toolbar>
          <vxe-table resizable highlight-current-row ref="aTable" row-id="id" :height="180"
            :edit-config="{ trigger: 'click', mode: 'cell' }" v-show="multiple" :data="emp.alreadyEmpList">
            <vxe-table-column showHeaderOverflow showOverflow field="itemName" title="物资名称"></vxe-table-column>
            <vxe-table-column showHeaderOverflow showOverflow field="itemCode" title="物资编码"></vxe-table-column>
            <vxe-table-column showHeaderOverflow showOverflow field="classifyName" title="物资分类"></vxe-table-column>
            <vxe-table-column showHeaderOverflow showOverflow field="classifyCode" title="物资分类编码"></vxe-table-column>
            <vxe-table-column showHeaderOverflow showOverflow field="descshort" title="物资编码短描述"></vxe-table-column>
            <vxe-table-column showHeaderOverflow showOverflow field="desclong" title="物资编码长描述"></vxe-table-column>
            <vxe-table-column field="unitName" title="物资单位"></vxe-table-column>
            <vxe-table-column field="state" title="状态"></vxe-table-column>
            <vxe-table-column field title="操作">
              <vxe-button type="text" @click="
                () => {
                  emp.alreadyEmpList.splice(index, 1);
                  $refs.aTable.loadData(emp.alreadyEmpList);
                }
              " status="danger">删除</vxe-button>
            </vxe-table-column>
          </vxe-table>
        </n-spin>
      </n-grid-item>
    </n-grid>
    <template #action>
      <n-button type="warning" size="small" @click="showModal = false">取消</n-button>
      <n-button type="success" size="small" style="margin-right: 5px" @click="onPositiveClick">保存</n-button>
    </template>
  </n-modal>
</template>

<script lang="jsx">
import { defineComponent, ref, reactive, onMounted, h, nextTick } from 'vue';
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
} from "naive-ui";
import { rightList, empLists } from "./api";

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
  },
  props: {
    model: {
      default: () => { },
      type: Object,
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    propTreeList: {
      type: Object,
      default: () => null,
    },
    showSide: {
      type: Boolean,
      default: true,
    },
    propsOrgId: {
      type: String,
      default: "",
    },
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const leftSpinShow = ref(false);
    const spinShow = ref(false);
    const xTable = ref();
    const model = ref({});
    const searchValue = ref("");
    const searchItemClassName = ref("");
    const tree = reactive({
      treeList: [], //原始数据
    });
    const userTypes = ref([
      { label: "管理员", value: 0 },
      { label: "讲师", value: 1 },
      { label: "学员", value: 2 },
    ]);

    const orgId = ref("");
    const selectRow = ref({});
    const pattern = ref("");
    const emp = reactive({
      empList: [],
      alreadyEmpList: [],
    });
    const xGrid = ref(null);
    const aTable = ref(null);
    const sonFn = (e = []) => {
      showModalRef.value = true;
      model.value = e;
      leftSpinShow.value = true;
      searchValue.value = ""
      if (props.multiple && e.length > 0) {
        emp.alreadyEmpList = e;
      } else {
        emp.alreadyEmpList = [];
      }
      if (props.showSide) {
        rightList({ isDefault: 0, isDel: 0 }).then((res) => {
          const getStr = (list) => {
            list.forEach((row) => {
              if (row.kids.length > 0) {
                row.label = row.classifyName;
                row.key = row.id;
                row.children = row.kids;
                getStr(row.kids);
              } else {
                row.label = row.classifyName;
                row.key = row.id;
              }
            });
          };
          getStr(res);
          leftSpinShow.value = false;
          tree.treeList = res;
          // getEmp(tree.treeList[0].classifyCode);
        });
      } else {
        getEmp(props.propsOrgId);
      }
    };

    const isAddedByEmpId = (itemId) => {
      return emp.alreadyEmpList.map((d) => d.itemId).includes(itemId);
    };
    const classifyCode = ref("0");
    const treeSelect = ([key], [options]) => {
      if (!options) return
      classifyCode.value = options.classifyCode;
      xGrid.value.commitProxy("query", 1);
    };
    // 获取右侧物资
    const getEmp = (classifyCode) => {
      spinShow.value = true;
      if (true) {
        empLists({
          classifyCode,
          isDefault: 1,
          page: { current: 1, size: 20 },
        }).then((res) => {
          if (res) {
            res.records.map((d) => {
              d.itemId = d.id;
              d.id = "";
            });
          }
          emp.empList = res.records;
          spinShow.value = false;
        });
      } else {
        emp.empList = [];
        spinShow.value = false;
      }
    };
    // 单机选择
    const currentChangeEvent = (row) => {
      emp.alreadyEmpList[0] = { ...model.value, ...row };
    };
    const clearCurrentRowEvent = () => {
      selectRow.value = null;
      xTable.value.clearRadioRow();
      xTable.value.clearCurrentRow();
    };
    const onPositiveClick = (row) => {
      spinShow.value = false;
      showModalRef.value = false;
      context.emit("update:callback", emp.alreadyEmpList);
    };
    const searchEvent = () => {
      xGrid.value.commitProxy("query", 1);
    };
    const gridOptions = reactive({
      border: true,
      height: !props.multiple ? 500 : 320,
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
        { field: "itemName", width: 120, title: "物资名称" },
        { field: "itemCode", width: 120, title: "物资编码" },
        { field: "classifyName", width: 120, title: "物资分类" },
        { field: "classifyCode", width: 120, title: "物资分类编码" },
        {
          field: "descshort",
          title: "物资编码短描述",
          width: 140,
          showHeaderOverflow: true,
          showOverflow: true,
        },
        {
          field: "desclong",
          title: "物资编码长描述",
          width: 140,
          showHeaderOverflow: true,
          showOverflow: true,
        },
        { field: "unitName", width: 120, title: "物资单位" },
        { field: "state", width: 120, title: "状态" },
        {
          field: "",
          title: "操作",
          fixed: "right",
          width: 120,
          showHeaderOverflow: true,
          slots: {
            default: ({ row }) => {
              let btn1 = !props.multiple && !isAddedByEmpId(row.itemId) ? <span
                style="color:#409eff;cursor: pointer;margin-left:10px"
                onClick={() => currentChangeEvent(row)}
              >
                选择
              </span> : '';
              let btn2 = props.multiple && !isAddedByEmpId(row.itemId) ? <span
                style="color:#409eff;cursor: pointer;margin-left:10px"
                onClick={() => {
                  emp.alreadyEmpList.push(row);
                  aTable.value.loadData(emp.alreadyEmpList);
                }}
              >
                选择
              </span> : '';
              let btn3 = isAddedByEmpId(row.itemId) ? <span
                style="color:#e6a23c;cursor: pointer;margin-left:10px"
                onClick={() => {
                  emp.alreadyEmpList = emp.alreadyEmpList.filter(
                    (d) => d.itemId !== row.itemId
                  );
                }}
              >
                取消
              </span> : '';
              return [
                btn1,
                btn2,
                btn3

              ];
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
              empLists({
                classifyCode:
                  classifyCode.value == "0" ? null : classifyCode.value,
                searchCondition: searchValue.value,
                isDefault: 1,
                page: { current: !currentPage ? page.currentPage : currentPage, size: page.pageSize },
              }).then((res) => {
                resolve({
                  total: res.total,
                  result: res.records.map(d => { d.itemId = d.id; d.id = null; return d }),
                });
              });
            });
          },
        },
      },
    });
    onMounted(async () => { });
    return {
      sonFn,
      aTable,
      isAddedByEmpId,
      spinShow,
      leftSpinShow,
      searchValue,
      orgId,
      xTable,
      userTypes,
      getEmp,
      emp,
      model, // 表单数据
      showModal: showModalRef,
      tree,
      pattern,
      selectRow,
      currentChangeEvent,
      clearCurrentRowEvent,
      empList: reactive([]),
      onPositiveClick,
      onNegativeClick() {
        model.value = {};
        emp.alreadyEmpList = [];
        showModalRef.value = false;
      },
      treeSelect,
      searchItemClassName,
      gridOptions,
      classifyCode,
      searchEvent,
      xGrid
    };
  },
  methods: {},
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
