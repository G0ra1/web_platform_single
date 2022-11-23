<template>
  <n-input
    class="my-search"
    placeholder=""
    size="small"
    disabled
    :value="props.testPapeName || '未选择试卷'"
    v-if="isShowSearch"
  >
    <template #suffix>
      <n-button
        type="info"
        @Click="
          (e) => {
            sonFn();
          }
        "
        >选择</n-button
      >
    </template>
  </n-input>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="选择试卷"
    content="你确认"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    negative-text="取消"
    style="width: 1200px"
  >
    <n-grid>
      <n-grid-item :span="24" style="height: 800px">
        <n-spin :show="spinShow">
          <vxe-toolbar style="height: 40px">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item v-if="multiple">
                  <template #default> 待选择试卷 </template>
                </vxe-form-item>
                <vxe-form-item>
                  <template #default>
                    <vxe-input placeholder="搜索" v-model="empName"></vxe-input>
                  </template>
                </vxe-form-item>
                <vxe-form-item>
                  <template #default>
                    <vxe-button status="primary" @click="searchEvent"
                      >查询</vxe-button
                    >
                  </template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-toolbar>
          <vxe-table
            resizable
            highlight-current-row
            ref="xTable"
            row-id="id"
            :height="!multiple ? '760px' : '380px'"
            :data="testPape.testPapes"
          >
            <vxe-table-column
              field="paperName"
              title="试卷名称"
            ></vxe-table-column>
            <vxe-table-column
              field="paperTotalScore"
              title="试卷分数"
            ></vxe-table-column>
            <vxe-table-column field="" title="操作">
              <template v-slot="{ row }">
                <vxe-button
                  type="text"
                  @click="currentChangeEvent(row)"
                  v-if="!multiple && !isAddedByEmpId(row.id)"
                  status="primary"
                  >选择</vxe-button
                >
                <vxe-button
                  type="text"
                  @click="
                    () => {
                      testPape.alreadyTestPape.push(row);
                      $refs.aTable.loadData(testPape.alreadyTestPape);
                    }
                  "
                  v-if="multiple && !isAddedByEmpId(row.id)"
                  status="primary"
                  >选择</vxe-button
                >
                <vxe-button
                  type="text"
                  @click="
                    () => {
                      testPape.alreadyTestPape = testPape.alreadyTestPape.filter(
                        (d) => d.id !== row.id
                      );
                    }
                  "
                  v-if="isAddedByEmpId(row.id)"
                  status="warning"
                  >取消</vxe-button
                >
              </template>
            </vxe-table-column>
          </vxe-table>
          <vxe-toolbar style="height: 40px" v-if="multiple">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item>
                  <template #default> 已选择试卷 </template>
                </vxe-form-item>
              </vxe-form>
            </template>
          </vxe-toolbar>
          <vxe-table
            resizable
            highlight-current-row
            ref="aTable"
            row-id="id"
            height="340px"
            v-if="multiple"
            :data="testPape.alreadyTestPape"
          >
            <vxe-table-column
              field="paperName"
              title="试卷名称"
            ></vxe-table-column>

            <vxe-table-column field="" title="操作">
              <vxe-button
                type="text"
                @click="
                  () => {
                    testPape.alreadyTestPape.splice(index, 1);
                    $refs.aTable.loadData(testPape.alreadyTestPape);
                  }
                "
                status="danger"
                >删除</vxe-button
              >
            </vxe-table-column>
          </vxe-table>
        </n-spin>
      </n-grid-item>
    </n-grid>
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
} from "naive-ui";
//   import {   creatJob,editJob,mdmDutyTypeList } from './api' getEmpByUserId
import {querys, multiDetail  } from "../pages/testPaper-management/api";

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
  },
  props: {
    model: {
      default: () => {},
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
    isShowSearch: {
      type: Boolean,
      default: false,
    },
    paperType: {
      type: Number,
      default: () => 0,
    },
    status: {
      type: Number,
      default: () => 1,
    },
    testPapeName: {
      type: String,
      default: () => "",
    },
    testPapeIds: {
      type: String,
      default: () => '',
    },
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const leftSpinShow = ref(false);
    const spinShow = ref(false);
    const xTable = ref();
    const model = ref({});
    const empName = ref("");
    const testPapeName = props.testPapeName;
    const selectRow = ref({});
    const pattern = ref("");
    const testPape = reactive({
      testPapes: [],
      alreadyTestPape: [],
    });
    const sonFn = (e = {}) => {
      showModalRef.value = true;
      spinShow.value = false;
      const fn = querys({ paperType: props.paperType,status:props.status });
      fn.then((res) => {
        testPape.testPapes = res;
        spinShow.value = false;
      }).finally((r) => {
        spinShow.value = false;
      });
      if(props.testPapeIds.length>0) {
        multiDetail(props.testPapeIds).then((res)=>{
            testPape.alreadyTestPape = res
        })
      }
     
    };

    const isAddedByEmpId  = (id) => {
      return testPape.alreadyTestPape.map((d) => d.id).includes(id);
    };
    // 获取右侧试卷
    const getEmp = (e) => {
      spinShow.value = true;
      if (e) {
      } else {
        testPape.testPapes = [];
        spinShow.value = false;
      }
    };
    // 单机选择
    const currentChangeEvent = (row) => {
      testPape.alreadyTestPape[0] = {  ...row };
    };

    const onPositiveClick = (row) => {
      spinShow.value = true;
      if (!props.multiple) {
        context.emit("update:callback", {
          ...testPape.alreadyTestPape[0],
        });
        model.value = {};
        testPape.alreadyTestPape = [];
        spinShow.value = false;
      } else {
        console.log(testPape.alreadyTestPape);
        context.emit("update:callback", testPape.alreadyTestPape);
        testPape.alreadyTestPape = [];
        spinShow.value = false;
      }
    };
    onMounted(async () => {});
    return {
      props,
      sonFn,
      isAddedByEmpId,
      spinShow,
      leftSpinShow,
      empName,
      xTable,
      getEmp,
      testPape,
      testPapeName,
      model, // 表单数据
      showModal: showModalRef,
      pattern,
      selectRow,
      currentChangeEvent,
      testPapes: reactive([]),
      onPositiveClick,

      onNegativeClick() {
        model.value = {};
        testPape.alreadyTestPape = [];
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
      //    this.getEmp(this.orgId)
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
  .sider {
    padding: 5px;
    border-bottom: 1px solid #dcdee2;
    height: 500px;
  }
  .ivu-poptip-popper {
    padding: 0;
  }
}
</style>
