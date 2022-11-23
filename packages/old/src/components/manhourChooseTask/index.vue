<template>
  <n-input-group @click="selectTask()">
    <n-input
      v-model:value="taskName"
      disabled
      :style="{ width: '100%' }"
      placeholder="选择任务名称"
      class="selectedInput"
    />
    <n-button style="padding: 0 8px">
      <NwIcon name="icon-sousuo1" :size="15"></NwIcon
    ></n-button>
  </n-input-group>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="选择任务名称"
    content="你确认"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    negative-text="取消"
    style="width: 1060px"
  >
    <n-layout has-sider style="height: 745px">
      <n-layout-sider
        bordered
        :width="300"
        style="border-right: 1px solid #ddd"
        :content-style="{
          'overflow-x': 'hiden',
        }"
      >
        <n-input-group
          style="padding: 24px 5px 24px 5px; box-sizing: border-box"
        >
          <n-input
            size="small"
            v-model:value="searchTaskName"
            clearable
            :style="{ width: '100%' }"
            placeholder="请输入任务名称"
          />

          <n-button
            type="info"
            style="height: 34px; padding: 0 8px; margin-right: 10px"
            size="small"
          >
            <NwIcon name="icon-sousuo1" :size="20"></NwIcon
          ></n-button>
        </n-input-group>
        <n-tree
          block-line
          :data="taskTree"
          filterable
          key-field="id"
          label-field="taskName"
          children-field="childList"
          :on-update:selected-keys="menuSelected"
          :pattern="searchTaskName"
          :show-irrelevant-nodes="false"
          :default-expanded-keys="defaultExpandedKeys"
          selectable
        />
      </n-layout-sider>
      <n-layout-content content-style="padding: 24px;">
        <n-spin :show="spinShow">
          <div>
            <!-- <n-form inline :label-width="80" label-placement="left">
              <n-form-item label="项目名称" path="proName">
                <n-input
                  placeholder="请输入项目名称"
                  v-model:value="searchForm.proName"
                />
              </n-form-item>
              <n-button
                type="info"
                size="small"
                @click="
                  () => {
                    getData();
                  }
                "
                >查询</n-button
              >
            </n-form> -->
          </div>
          <n-data-table
            ref="table"
            :columns="columns"
            style="height: 650px"
            flex-height
            :data="data"
          />
          <div
            style="display: flex; flex-direction: row-reverse; margin-top: 5px"
          >
            <n-pagination
              v-model:page="page"
              :page-count="pageCount"
              :on-update:page="
                (p) => {
                  getData(p);
                }
              "
            />
          </div>
        </n-spin>
      </n-layout-content>
    </n-layout>
    <template #action>
      <n-button size="small" @click="onNegativeClick">取消</n-button>
      <n-button type="info" size="small" @click="onPositiveClick"
        >确定</n-button
      >
    </template>
  </n-modal>
</template>

<script lang="jsx">
import { defineComponent, ref, reactive, onMounted,h } from "vue";
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
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider,
  NDataTable,
  NPagination,
} from "naive-ui";
import { getTreeTask, queryTask } from "./api";
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
    NwIcon,
    NButton,
    NInputGroup,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NLayoutSider,
    NDataTable,
    NPagination,
  },
  props: {
    value:{
      type:String,
      default:''
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, context) {
    const showModalRef = ref(false);
    const searchTaskName = ref("");
    const taskTree = ref([]);
    const selectTask = () => {
      if(props.disabled) return
      showModalRef.value = true;
      // getData()
    };
    const selectTaskId = ref("");
    const selectedTask = ref({});
    const selectRow = (row) => {
      selectedTask.value = row;
      taskName.value = row.taskName
      taskCode.value = row.taskCode
      taskId.value = row.id
      taskWorkHour.value = row.taskWorkHour
      evaluationMethod.value = row.evaluationMethod
      taskType.value = row.taskType
    }
    const columns = [
      {
        title: "任务名称",
        key: "taskName",
      },
      {
        title: "任务类型",
        key: "taskType",
        render(row) {
          return <span>{row.taskType==1?'日常任务':'设计任务'}</span>
        }
      },
      {
        title: '操作',
        key: 'actions',
        width: 120,
        render(row) {
          return h(
            NButton,
            {
              size: 'small',
              type: selectedTask.value.id == row.id ? "info" : "",
              onClick: () => selectRow(row)
            },
            { default: () => selectedTask.value.id == row.id ? '已选择' : '选择' }
          )
        }
      }
    ];
    const getTreeTaskFn = (l = 2) => {
      getTreeTask(l).then((res) => {
        taskTree.value = res;
      });
    };
    const onPositiveClick = () => {
      context.emit('update:value',taskName.value)
      context.emit('update:twoTaskName',twoTaskName.value)
      context.emit('update:oneTaskName',oneTaskName.value)
      context.emit('update:taskCode',taskCode.value)
      context.emit('update:twoTaskCode',twoTaskCode.value)
      context.emit('update:oneTaskCode',oneTaskName.value)
      context.emit('update:taskId',taskId.value)
      context.emit('update:twoTaskId',twoTaskId.value)
      context.emit('update:oneTaskId',oneTaskId.value)
      context.emit('update:evaluationMethod',evaluationMethod.value)
      context.emit('update:taskWorkHour',taskWorkHour.value)
      context.emit('update:taskType',taskType.value)
      showModalRef.value = false
    };
    const defaultExpandedKeys = ref([])
    const parentId = ref('')
    const oneTaskName = ref('')
    const twoTaskName = ref('')
    const taskName = ref('')
    const oneTaskCode = ref('')
    const twoTaskCode = ref('')
    const taskCode = ref('')
    const oneTaskId = ref('')
    const twoTaskId = ref('')
    const taskId = ref('')
    const evaluationMethod = ref('')
    const taskWorkHour = ref('')
    const taskType = ref('')
    const menuSelected = ([key], [options]) => {
        parentId.value = key
        if(options.taskLevel == 1) {
          defaultExpandedKeys.value = [key]
          // defaultExpandedKeys.value.push(key)
          return
        }
        console.log(options)
        oneTaskName.value = taskTree.value.filter(d=>d.id==options.parentId)[0].taskName
        oneTaskCode.value = taskTree.value.filter(d=>d.id==options.parentId)[0].taskCode
        oneTaskId.value = options.parentId
        twoTaskName.value = options.taskName
        twoTaskCode.value = options.taskCode
        twoTaskId.value = options.id
        getData()
    }
    const spinShow = ref(false);
    const page = ref(1);
    const pageCount = ref(0);
    const data = ref([]);
    const getData = (current = 1, size = 10) => {
      spinShow.value = true
      queryTask(
        {
          parentId:parentId.value,
          page: {
            current: current,
            size: size,
          },
        },
      )
        .then((res) => {
          console.log(res, "112221212");
          spinShow.value = false;
          page.value = res.current;
          pageCount.value = res.pages;
          data.value = res.records;
        })
        .catch((e) => {
          spinShow.value = false;
        });
    };
    onMounted(async () => {
      getTreeTaskFn();
      taskName.value = props.value
    });
    return {
      showModal: showModalRef,
      taskTree,
      getTreeTaskFn,
      searchTaskName,
      taskName,
      selectTask,
      onPositiveClick,
      onNegativeClick: () => {
        showModalRef.value = false;
      },
      selectedTask,
      selectTaskId,
      spinShow,
      page,
      pageCount,
      data,
      getData,
      columns,
      selectRow,
      menuSelected,
      parentId,
      defaultExpandedKeys,
      taskType
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
  height: 630px;
  overflow: auto;
}
.selectedInput.n-input.n-input--disabled .n-input__input-el {
  cursor: pointer;
}
</style>

