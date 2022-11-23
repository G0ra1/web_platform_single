<template>
  <!-- <n-input  class="my-search" placeholder="" disabled >
    <template #suffix>
        <n-button type="info"   @Click="(e)=>{showModalRef=true}">选择</n-button>
    </template>
    </n-input>-->
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="选择人员" content="你确认" positive-text="确认"
    negative-text="取消" style="width: 1200px">
    <n-grid>
      <n-grid-item span="6" style="height: 650px" v-if="showSide">
        <div class="sider" style="height: 690px">
          <n-input v-model:value="pattern" size="small" placeholder="搜索" />
          <n-spin :show="leftSpinShow">
            <n-tree placeholder="请选择" :data="tree.treeList" style="height: 630px; padding: 5px 0" block-line
              virtual-scroll :default-expanded-keys="['0', propsParentOrgId]" :default-selected-keys="[propsOrgId]"
              @update:selected-keys="getEmp" />
          </n-spin>
        </div>
      </n-grid-item>
      <n-grid-item :span="showSide ? 18 : 24" style="height: 650px">
        <n-spin :show="spinShow">
          <vxe-toolbar style="height: 40px">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item v-if="multiple">
                  <template #default>待选择人员</template>
                </vxe-form-item>
                <vxe-form-item>
                  <template #default>
                    <vxe-input placeholder="搜索" v-model="empName"></vxe-input>
                  </template>
                </vxe-form-item>
                <vxe-form-item>
                  <template #default>
                    <vxe-button status="primary" @click="searchEvent">查询</vxe-button>
                  </template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-toolbar>
          <vxe-table resizable highlight-current-row ref="xTable" row-id="id" :height="!multiple ? '500px' : '320px'"
            :data="emp.empList" @cell-click="cellClick">
            <vxe-table-column field="userNameCh" title="人员名称"></vxe-table-column>
            <vxe-table-column field="postName" title="岗位名称">
              <template v-slot="{ row }">{{
              row.mdmPosts
              ? row.mdmPosts.filter((d) => d.isMaster == 1)[0].postName
              : ""
              }}</template>
            </vxe-table-column>
            <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
            <vxe-table-column field title="操作">
              <template v-slot="{ row }">
                <vxe-button type="text" @click="currentChangeEvent(row)" v-if="!multiple && !isAddedByEmpId(row.empId)"
                  status="primary">选择</vxe-button>
                <vxe-button type="text" @click="
                  () => {
                    emp.alreadyEmpList.push(row);
                    $refs.aTable.loadData(emp.alreadyEmpList);
                  }
                " v-if="multiple && !isAddedByEmpId(row.empId)" status="primary">选择</vxe-button>
                <vxe-button type="text" @click="
                  () => {
                    emp.alreadyEmpList = emp.alreadyEmpList.filter(
                      (d) => d.empId !== row.empId
                    );
                
                  }
                " v-if="isAddedByEmpId(row.empId)" status="warning">已选择</vxe-button>
              </template>
            </vxe-table-column>
          </vxe-table>
          <vxe-toolbar style="height: 40px" v-if="multiple">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item>
                  <template #default>已选择人员</template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-toolbar>
          <vxe-table resizable highlight-current-row ref="aTable" row-id="id" height="300px"
            :edit-config="{ trigger: 'click', mode: 'cell' }" v-show="multiple" :data="emp.alreadyEmpList">
            <vxe-table-column field="userNameCh" title="人员名称"></vxe-table-column>
            <vxe-table-column field="postName" title="岗位名称">
              <template v-slot="{ row }">{{
              row.mdmPosts
              ? row.mdmPosts.filter((d) => d.isMaster == 1)[0].postName
              : ""
              }}</template>
            </vxe-table-column>
            <vxe-table-column field="parentDeptName" title="所属部门"></vxe-table-column>
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

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
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
    propsParentOrgId: {
      type: String,
      default: "",
    },
    isCheckOwn: {
      type: Boolean,
      default: false
    },
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const leftSpinShow = ref(false);
    const spinShow = ref(false);
    const xTable = ref();
    const model = ref({});
    const empName = ref("");
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
    const sonFn = (e) => {
      showModalRef.value = true;
      model.value = e;
      leftSpinShow.value = true;
      if (props.multiple && e.length > 0) {
        emp.alreadyEmpList = e;
      } else {
        emp.alreadyEmpList = [];
      }
      if (props.showSide) {
        rightList({ isDefault: 0, status: 1 }).then((res) => {
          const getStr = (list) => {
            list.forEach((row) => {
              if (row.kids.length > 0) {
                row.label = row.orgName;
                row.key = row.id;
                row.children = row.kids;
                getStr(row.kids);
              } else {
                row.label = row.orgName;
                row.key = row.id;
              }
            });
          };
          getStr(res);
          leftSpinShow.value = false;
          tree.treeList = res;
          if (props.propsOrgId) {
            getEmp(props.propsOrgId);
          } else {
            getEmp(tree.treeList[0].id);
          }
        });
      } else {
        getEmp(props.propsOrgId);
      }
    };

    const isAddedByEmpId = (empId) => {
      return emp.alreadyEmpList.map((d) => d.empId).includes(empId);
    };
    // 获取右侧人员
    const getEmp = (e) => {
      spinShow.value = true;
      orgId.value = typeof e == "object" ? e[0] : e;
      if (e) {
        // userNameCh:empName.value
        const fn = empName.value
          ? empLists({ parentOrgId: orgId.value, userNameCh: empName.value, isCheckOwn: props.isCheckOwn })
          : empLists({ parentOrgId: orgId.value, isCheckOwn: props.isCheckOwn });
        fn.then((res) => {
          if (res) {
            res.map((d) => {
              d.orgFullEmpId = d.orgFullId;
              d.orgFullEmpName = d.orgFullName;
              d.empId = d.id;
            });
          }

          emp.empList = res;
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
      onPositiveClick()
    };
    const clearCurrentRowEvent = () => {
      selectRow.value = null;
      xTable.value.clearRadioRow();
      xTable.value.clearCurrentRow();
    };
    const onPositiveClick = (row) => {
      console.log(emp.alreadyEmpList, "...............onPositiveClick");
      spinShow.value = false;
      showModalRef.value = false;
      context.emit("update:callback", emp.alreadyEmpList);
    };
    const cellClick = ({ row }) => {
      currentChangeEvent(row)
    }
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
      cellClick,
      onNegativeClick() {
        model.value = {};
        emp.alreadyEmpList = [];
        showModalRef.value = false;
      },
    };
  },
  methods: {
    disOrg(list) {
      list.forEach((row) => {
        if (row.kids.length > 0) {
          row.disabled = false;

          this.disOrg(row.kids);
        } else {
          row.disabled = false;
        }
      });
      return list;
    },
    searchEvent() {
      this.getEmp(this.orgId);
    },
    userTypeChange(row) {
      this.$refs.aTable.clearActived(); //清除单元格激活状态
      this.$refs.aTable.setActiveCell(row.row, row.column.property); //设置单元格为激活状态
      this.emp.alreadyEmpList[row._rowIndex].userType = row.row.userType;
    },
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
