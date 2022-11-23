<template>
  <!-- <n-input  class="my-search" placeholder="" disabled >
    <template #suffix>
        <n-button type="info"   @Click="(e)=>{showModalRef=true}">选择</n-button>
    </template>
    </n-input>-->
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="选择验收信息" content="你确认"
    positive-text="确认" negative-text="取消" style="width: 1200px">
    <n-grid>
      <n-grid-item :span="showSide ? 18 : 24" style="height: 650px">
        <n-spin :show="spinShow">
          <vxe-toolbar style="height: 40px">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item v-if="multiple">
                  <template #default>待选择物资</template>
                </vxe-form-item>
                <vxe-form-item>
                  <template #default>
                    <vxe-input placeholder="搜索" v-model="searchCondition"></vxe-input>
                    <vxe-button status="primary" @click="searchEvent">查询</vxe-button>
                  </template>
                </vxe-form-item>
                <vxe-form-item>
                  <template #default> </template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-toolbar>
          <vxe-table resizable highlight-current-row ref="xTable" :row-config="{ keyField: 'rowId' }"
            :height="!multiple ? '500px' : '600px'" :data="emp.empList" :edit-config="{
              trigger: 'click',
              mode: 'row',
              enabled: true,
              showIcon: true,
            }">
            <vxe-column field="itemName" title="物资名称"></vxe-column>
            <vxe-column field="itemCode" title="物资编码"></vxe-column>
            <vxe-column field="descshort" title="物资描述"></vxe-column>
            <vxe-column field="registerNumber" title="采购数量"></vxe-column>
            <vxe-column field="notAcceptanceNumber" title="未验收数量"></vxe-column>
            <vxe-column field="acceptanceNumber" title="本次验收数量" :edit-render="{}">
              <template #edit="{ row, column }">
                <vxe-input v-model="row.acceptanceNumber" type="number" :min="0" :max="row.notAcceptanceNumber">
                </vxe-input>
              </template>
            </vxe-column>
            <!-- <vxe-column field title="操作" width="120">
              <template v-slot="{ row }">
                <vxe-button type="text" @click="currentChangeEvent(row)"
                  v-if="!multiple && !isAddedByEmpId(row.registerResultId)" status="primary">选择</vxe-button>
                <vxe-button type="text" @click="
                  () => {
                    emp.alreadyEmpList.push(row);
                  }
                " v-if="multiple && !isAddedByEmpId(row.registerResultId)" status="primary">选择</vxe-button>
                <vxe-button type="text" @click="
                  () => {
                    emp.alreadyEmpList = emp.alreadyEmpList.filter(
                      (d) => d.registerResultId !== row.registerResultId
                    );
                  }
                " v-if="isAddedByEmpId(row.registerResultId)" status="warning">取消</vxe-button>
              </template>
            </vxe-column> -->
          </vxe-table>
          <!-- <vxe-toolbar style="height: 40px" v-if="multiple">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item>
                  <template #default>已选择物资</template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-toolbar>
          <vxe-table resizable highlight-current-row ref="aTable" :row-config="{ keyField: 'rowId' }" height="300px"
            :edit-config="{ trigger: 'click', mode: 'cell' }" v-show="multiple" :data="emp.alreadyEmpList">
            <vxe-column field="applyCode" title="申请单号"></vxe-column>
            <vxe-column field="itemName" title="物资名称"></vxe-column>
            <vxe-column field="itemCode" title="物资编码"></vxe-column>
            <vxe-column field="registerNumber" title="采购数量"></vxe-column>
            <vxe-column field title="操作">
              <vxe-button type="text" @click="
                () => {
                  emp.alreadyEmpList.splice(index, 1);
                  $refs.aTable.loadData(emp.alreadyEmpList);
                }
              " status="danger">删除</vxe-button>
            </vxe-column>
          </vxe-table> -->
        </n-spin>
      </n-grid-item>
    </n-grid>
    <template #action>
      <n-button type="warning" size="small" @click="showModal = false">取消</n-button>
      <n-button type="success" size="small" style="margin-right: 5px" @click="onPositiveClick">保存</n-button>
    </template>
  </n-modal>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
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
      default: false,
    },
    applyIds: {
      type: Object,
      default: () => { },
    },
    registerId: {
      type: String,
      default: ''
    }
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const leftSpinShow = ref(false);
    const spinShow = ref(false);
    const xTable = ref();
    const model = ref({});
    const empName = ref("");
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
    const aTable = ref();
    const sonFn = (e = []) => {
      showModalRef.value = true;
      model.value = e;
      leftSpinShow.value = true;
      searchCondition.value = "";
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
          getEmp(tree.treeList[0].classifyCode);
        });
      } else {
        getEmp();
      }
    };

    const isAddedByEmpId = (id) => {
      return emp.alreadyEmpList.map((d) => d.registerResultId).includes(id);
    };
    const treeSelect = ([key], [options]) => {
      let classifyCode = options.classifyCode;
      getEmp();
    };
    const searchCondition = ref('')
    // 获取购置申请
    const getEmp = () => {
      spinShow.value = true;
      if (true) {
        empLists({ searchCondition: searchCondition.value, registerId: props.registerId }).then((res) => {
          if (res) {
            res.records.map((d) => {
              d.registerResultId = d.id;
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
      // context.emit("update:callback", emp.alreadyEmpList);
      context.emit("update:callback", xTable.value.getTableData().fullData);

    };
    const searchEvent = () => {
      getEmp()
    }
    watch(
      () => props.registerId,
      (d) => {
        getEmp()
      }
    );
    onMounted(async () => { });
    return {
      sonFn,
      aTable,
      isAddedByEmpId,
      spinShow,
      leftSpinShow,
      empName,
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
      searchCondition
    };
  },
  methods: {

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
