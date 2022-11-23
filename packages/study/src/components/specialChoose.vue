<template>
  <n-input
    class="my-search"
    placeholder=""
    size="small"
    disabled
    :value="props.specialName || '未选择专题'"
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
    title="选择专题"
    content="你确认"
    style="width: 1200px"
  >
    <n-grid>
      <n-grid-item :span="24" style="height: 730px">
        <n-spin :show="spinShow">
          <vxe-toolbar style="height: 40px">
            <template v-slot:buttons>
              <vxe-form>
                <vxe-form-item v-if="multiple">
                  <template #default> 待选择专题 </template>
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
            :height="!multiple ? '660px' : '380px'"
            :data="special.specialList"
          >
            <vxe-table-column
              field="specialName"
              title="专题名称"
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
                      special.alreadySpecialList.push(row);
                      $refs.aTable.loadData(special.alreadySpecialList);
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
                      special.alreadySpecialList = special.alreadySpecialList.filter(
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
          <vxe-pager
          :current-page="page.current"
          :page-size="page.size"
          :total="page.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange">
        </vxe-pager>
         
        </n-spin>
      </n-grid-item>
    </n-grid>
    <template #action>
        <div style="padding: 5px 0 5px 0;">
          <n-button size="small" type="warning"  @click="onNegativeClick" >关闭</n-button>
          <n-button size="small" type="success"  style="margin-left: 5px"  @click="onPositiveClick" >确定</n-button>
        </div>
    </template>
  </n-modal>
</template>

<script>
import { defineComponent, ref, reactive, nextTick, onMounted } from "vue";
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
  NButton
} from "naive-ui";
//   import {   creatJob,editJob,mdmDutyTypeList } from './api' getEmpByUserId
import { query } from "../pages/special-list/api";

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
    NButton
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
    isShowSearch: {
      type: Boolean,
      default: false,
    },
   
    specialName: {
      type: String,
      default: () => "",
    },
    ids: {
      type: String,
      default: () => "",
    },
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const leftSpinShow = ref(false);
    const spinShow = ref(false);
    const xTable = ref();
    const model = ref({});
    const empName = ref("");
    const specialName = props.specialName;
    const selectRow = ref({});
    const pattern = ref("");
    const page = reactive({
      current:1,
      size:20,
      totalResult: 0
    })
    const handlePageChange = ({ currentPage, pageSize })=> {
          page.current = currentPage
          page.size = pageSize
          getList()
    }
    const special = reactive({
      specialList: [],
      alreadySpecialList: [],
    });
    const  getList = ()=>{
        spinShow.value = true
        query({ page: {current:page.current, size: page.size},}).then((res)=>{
            special.specialList = res.records;
            spinShow.value = false;
            page.totalResult = res.total
        }).finally(r => {
              spinShow.value = false
        })
    }
    const sonFn = (e = {}) => {
      showModalRef.value = true;
      spinShow.value = false;
      getList()
      nextTick().then(() => {
        if(props.ids) {
          special.alreadySpecialList = [{id:props.ids,specialName:props.specialName}]
        }
      })
     
    };
    const isAddedByEmpId  = (id) => {
      return special.alreadySpecialList.map((d) => d.id).includes(id);
    };
    // 获取右侧专题
    const getEmp = (e) => {
      spinShow.value = true;
      if (e) {
      } else {
        special.specialList = [];
        spinShow.value = false;
      }
    };
    // 单机选择
    const currentChangeEvent = (row) => {
      special.alreadySpecialList[0] = {  ...row };
    };

    const onPositiveClick = (row) => {
      spinShow.value = true;
      if (!props.multiple) {
        console.log(special.alreadySpecialList,'-=d');
        context.emit("update:callback", {
          ...special.alreadySpecialList[0],
        });
        model.value = {};
        special.alreadySpecialList = [];
        spinShow.value = false;
         showModalRef.value = false;
      } else {
        context.emit("update:callback", special.alreadySpecialList);
        special.alreadySpecialList = [];
        spinShow.value = false;
         showModalRef.value = false;
      }
    };
    onMounted(async () => {});
    return {
      props,
      page,
      handlePageChange,
      getList,
      sonFn,
      isAddedByEmpId,
      spinShow,
      leftSpinShow,
      empName,
      xTable,
      getEmp,
      special,
      specialName,
      model, // 表单数据
      showModal: showModalRef,
      pattern,
      selectRow,
      currentChangeEvent,
      specialList: reactive([]),
      onPositiveClick,

      onNegativeClick() {
        model.value = {};
        special.alreadySpecialList = [];
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
