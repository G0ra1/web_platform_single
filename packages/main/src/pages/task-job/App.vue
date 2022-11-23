<template>
  <n-layout class="nw-layout-full">
    <n-layout-header>
      <n-space :size="5" style="padding: 0 5px">
        <n-button type="primary" size="small" style="margin-right: 5px" @click="
          () => {
            showModal = true;
          }
        ">
          添加
        </n-button>
        <!-- <n-button size="small" style="margin-right: 5px" @click="handEdit()">

          修改
        </n-button>
        <n-popconfirm style="margin-right: 5px" @positive-click="handDel()" positive-text="确定" negative-text="取消">
          <template #trigger>
            <n-button size="small">删除</n-button>
          </template>
          {{ `是否确定删除此${selected.length}条数据` }}
        </n-popconfirm> -->
      </n-space>
    </n-layout-header>
    <n-layout-content class="nw-layout-full">
      <NwTable ref="nwTable" :columns="columns" class="mytable-style" :row-class-name="rowClassName" :data="null"
        :request="request" :response="response" :searchFormFields="[
          {
            field: 'roleName',
            title: 'name',
            valueFormat: (d) => d,
          },
        ]">
        <template v-slot:search-form="{ searchFormData }">
          <n-form :model="searchFormData">
            <n-form-item label="子系统" path="bizSysCodes">
              <nw-dictionary :request="{ XHR: dictItemLists, params: 'APP_NAME' }"
                v-model:value="searchFormData.bizSysCodesList" @update:value="
                  (value) => {
                    searchFormData.bizSysCodes = value.join(',');
                  }
                " multiple :response="{
  dataMethod: (res) =>
    res.map(({ dictItemCode: value, dictItemName: label }) => ({
      label,
      value,
    })),
}" />
            </n-form-item>
            <n-form-item label="任务名称" path="jobName">
              <n-input placeholder="请输入任务名称" v-model:value="searchFormData.jobName" />
            </n-form-item>
            <n-form-item label="任务组名" path="jobGroup">
              <n-select v-model:value="searchFormData.jobGroup" :options="[
                { label: '默认', value: 'DEFAULT' },
                { label: '系统', value: 'SYSTEM' },
              ]" />
            </n-form-item>
            <n-form-item label="任务状态" path="status">
              <n-select v-model:value="searchFormData.status" :options="[
                { label: '正常', value: 0 },
                { label: '暂停', value: 1 },
              ]" />
            </n-form-item>
          </n-form>
        </template>
      </NwTable>
    </n-layout-content>
  </n-layout>
  <n-drawer :show="formVisible" width="100%" :height="200" placement="right" :to="$refs.page && $refs.page.$el">
    <n-drawer-content :title="contentTile" :header-style="{
      padding: '10px',
      'font-size': '16px',
      'font-weight': 'bold',
    }" :footer-style="{
  padding: '10px',
}">
      <n-spin :show="spinShow">
        <Form ref="Form" :model="model" />
        <template #description> 正在保存 </template>
      </n-spin>

      <template #footer>
        <n-button style="margin-right: 5px" size="small" @click="formVisible = false">取消</n-button>
        <n-button type="info" size="small" @click="handleSave">保存</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" title="Dialog" class="task-job">
    <template #header>
      <div>选择执行类型</div>
    </template>
    <div style="padding: 15px">
      <n-grid x-gap="12" :cols="3">
        <n-gi>
          <div class="selectBox" @click="
            () => {
              model = { invokeTargetType: 'springbean', concurrent: 0 };
              formVisible = true;
              contentTile = '新建';
              showModal = false;
            }
          ">
            SpringBean
          </div>
        </n-gi>
        <n-gi>
          <div class="selectBox" @click="
            () => {
              model = { invokeTargetType: 'class', concurrent: 0 };
              formVisible = true;
              contentTile = '新建';
              showModal = false;
            }
          ">
            Class类
          </div>
        </n-gi>
        <n-gi>
          <div class="selectBox" @click="
            () => {
              model = { invokeTargetType: 'mqproducer', concurrent: 0 };
              formVisible = true;
              contentTile = '新建';
              showModal = false;
            }
          ">
            MQ生产者
          </div>
        </n-gi>
      </n-grid>
    </div>
    <template #action>
      <n-button size="small" @click="
  () => {
    showModal = false;
  }
      ">取消</n-button>
    </template>
  </n-modal>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h, defineComponent, ref, reactive, getCurrentInstance, nextTick } from "vue";
import {
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NPopconfirm,
  NSelect,
  useMessage,
  useDialog,
  NDropdown,
  NModal,
  NGrid,
  NGi,
  NSpin
} from "naive-ui";

import {
  NwTable,
} from '@platform/main'
import { list, add, edit, del, details, dictItemLists, changeStatus, jobRun, queryCronExpression } from "./api";
import { cloneDeep } from 'lodash'
import Form from "./form.vue";
export default defineComponent({
  components: {
    Form,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NwTable,
    NSelect,
    NDropdown,
    NModal,
    NGrid,
    NGi,
    NSpin
  },
  setup() {
    const nwTable = ref(null);
    const message = useMessage();
    const dialog = useDialog();
    const formVisible = ref(false);
    const model = ref({})
    const Form = ref(null)
    const spinShow = false
    const contentTile = ref('新建')
    // const {proxy} = getCurrentInstance()
    const showModal = ref(false)
    const portalOptions = ref([]);
    const partOptions = ref([]);
    const changeStatusFn = (jobId) => {
      changeStatus(jobId).then(res => {
        message.success('状态修改成功')
        nwTable.value.commitQuery()
      })
    }
    const jobRunFn = (jobId) => {
      jobRun(jobId).then(res => {
        message.success('执行成功')
      })
    }
    const queryCronExpressionFn = (cronExpression) => {
      queryCronExpression(cronExpression).then(res => {
        dialog.success({
          title: "成功",
          content: () => {
            return h(
              "div",
              {
                style: {
                  paddingLeft: "50px",
                },
              },
              res.map((d) => {
                return h("p", {}, d);
              })
            );
          },
        });
      })
    }
    const dropdownOptions = [
      {
        label: '立即执行一次',
        key: "execute"
      },
      {
        label: '最近执行十次时间',
        key: "tenTimes"
      },
    ]
    const handleSelect = (key, row) => {
      switch (key) {
        case "execute":
          jobRunFn(row.id)
          break;
        case "tenTimes":
          queryCronExpressionFn(row.cronExpression)
          break;
        default:
          break;
      }
    }
    const goLog = (row) => {
      window.open(`/web-main/pages/layout.html?jobId=${row.id}#app/app/task-log`)
    }
    const rowClassName = ({ row, rowIndex }) => {
      if (row.endTime && +new Date(row.endTime) < +new Date()) {
        return 'row-red'
      }
    }
    const handDel = (selected) => {
      let id = selected.id
      del(id).then(res => {
        message.success("删除成功");
        nwTable.value.commitQuery()
        nwTable.value.clearSelected()
        nwTable.value.clearSelected()
      })
    }
    const handEdit = (selected) => {
      contentTile.value = '编辑'
      details(selected.id).then(res => {
        model.value = res
        nextTick(() => {
          formVisible.value = true
        })
      })
    }
    return {
      partOptions,
      goLog,
      portalOptions,
      message,
      changeStatusFn,
      dialog,
      contentTile,
      formVisible,
      jobRunFn,
      handleSelect,
      queryCronExpressionFn,
      formValue: {},
      dictItemLists,
      rowClassName,
      handDel,
      handEdit,
      Form,
      spinShow,
      model,
      showModal,
      request: {
        XHR: list, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
          // 分页
          page: {
            current,
            size
          }
        }),
      },
      // 接口相应
      response: {
        dataMethod: (res) => res.records,
        pageMethod: ({ total }) => total,
      },
      nwTable,
      columns: reactive([
        { type: 'checkbox', width: 35 },
        { type: "seq", width: 40 },
        { field: "bizSysCodes", title: "子系统" },
        {
          field: "jobGroup", title: "任务组名", showOverflow: true, slots: {
            default: ({ row }) => {
              return [
                <span>{row.jobGroup == 'DEFAULT' ? "默认" : "系统"}</span>,
              ];
            },
          }
        },
        {
          field: "jobName", title: "任务名称", showOverflow: true, slots: {
            default: ({ row }) => {
              return [
                <span>
                  <a style="color:#2d8cf0;cursor: pointer;" onClick={(e) => {
                    goLog(row)
                  }
                  }>{row.jobName}</a>
                </span>,
              ];
            },
          }
        },
        { field: "invokeTarget", title: "调用目标字符串", showOverflow: true },
        { field: "cronExpression", title: "执行表达式", showOverflow: true },
        {
          field: "misfirePolicy", title: "恢复调度处理规则", showOverflow: true, slots: {
            default: ({ row }) => {
              return [
                <span>{row.misfirePolicy == -1 ? "以错过的第一个频率时间立刻开始执行，重做错过的所有频率周期" : row.misfirePolicy == 1 ? " 以当前时间为触发频率立刻触发一次执行，然后按照Cron频率依次执行" : '不触发立即执行，等待下次Cron触发频率到达时刻开始按照Cron频率依次执行'}</span>,
              ];
            },
          }
        },
        // { field: "concurrent", title: "并发执行", showHeaderOverflow: true,slots: {
        //     default: ({ row }) => {
        //       return [
        //         <span>{row.concurrent == 0 ? "允许" : "禁止"}</span>,
        //       ];
        //     },
        //   } 
        // },
        { field: "startTime", title: "开始时间", showOverflow: true },
        {
          field: "endTime", title: "结束时间", showOverflow: true, slots: {
            default: ({ row }) => {
              return [
                <span >{row.endTime}</span>
              ];
            },
          }
        },
        { field: "nextValidTime", title: "下次执行日期", showOverflow: true },

        {
          field: "status", title: "任务状态", showOverflow: true, slots: {
            default: ({ row }) => {
              return [
                <span>{row.status == 0 ? "正常" : "暂停"}</span>,
              ];
            },
          }
        },
        { field: "remark", title: "备注", showOverflow: true },
        {
          field: "", title: "操作", showOverflow: true, width: 250,
          slots: {
            default: ({ row }) => {
              return [
                <div>
                  <a style="color:#2d8cf0;cursor: pointer;" onClick={(e) => { changeStatusFn(row.id) }}>{row.status == 0 ? '暂停' : '开启'}</a>
                  <a style="margin-left: 5px;color:#2d8cf0;cursor: pointer;" onClick={(e) => { handEdit(row) }}>{'修改'}</a>
                  <NPopconfirm onPositiveClick={() => handDel(row)} positive-text="确定"
                    negative-text="取消">
                    {{
                      trigger: () => <a style="margin-left: 5px;color:#2d8cf0;cursor: pointer;">删除</a>,
                      default: () => `是否确定删除此数据`
                    }}
                  </NPopconfirm>
                  <NDropdown onSelect={(key) => handleSelect(key, row)} trigger={"hover"} showArrow={true} options={dropdownOptions}>
                    <span type="text" style="margin-left: 5px;color:#2d8cf0;cursor: pointer;">…</span>
                  </NDropdown>
                </div>
              ];
            },
          }
        },

      ]),
    };
  },
  created() {

  },
  methods: {
    show() {
      this.$refs.nwTable.toggleSearchForm();
    },
    portalPartLists(portalId) {
      portalPartLists({ portalId }).then((res) => {
        console.log(res);
        this.partOptions = res.map((d) => {
          return {
            label: d.partName,
            value: d.id,
            code: d.partCode,
            partTypeId: d.partTypeId,
            partTypeName: d.partTypeName,
          };
        });
      });
    },
    portalSelect(v, searchFormData) {
      searchFormData.portalId = v;
      console.log(this.portalOptions.filter(
        d => d.value == v
      ))
      searchFormData.portalName = this.portalOptions.filter(
        (d) => (d.value == v)
      )[0].label;
      this.portalPartLists(v);
    },
    partSelect(v, searchFormData) {
      searchFormData.partId = v;
      searchFormData.partName = this.partOptions.filter((d) => (d.value == v))[0].label;
      searchFormData.partTypeId = this.partOptions.filter(
        (d) => (d.value == v)
      )[0].partTypeId;
      searchFormData.partTypeName = this.partOptions.filter(
        (d) => (d.value == v)
      )[0].partTypeName;
    },
    handleSave() {
      let formData = cloneDeep(this.Form.getModel())
      console.log(formData)
      formData.bizSysCodes = formData.bizSysCodes ? formData.bizSysCodes.join(',') : ''
      const fn = formData.id ? edit : add;
      // if(formData.id){
      //   formData = {...formData,linkNewsId:formData.id,id:''}
      // }
      this.spinShow = true
      fn(formData).then((res) => {
        if (res === true) {
          if (formData.id) {
            this.message.success("修改成功");
          } else {
            this.message.success("添加成功");
          }
          this.model = {}
          this.formVisible = false;
          this.$refs.nwTable.commitQuery();
          this.$refs.nwTable.clearSelected()
        }
      }).finally(() => {
        this.spinShow = false
      })
    },


    test() {
      this.message.success("保存成功");
    },
  },
});
</script>
<style lang="less">
.vxe-table--body {
  .vxe-body--row.row-red {
    color: rgb(255, 102, 0);
  }
}

.task-job {
  .selectBox {
    height: 100px;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
    color: rgb(112, 10, 69);
    background-color: rgba(0, 128, 0, 0.24);
    transition: all 0.5s;
    border-radius: 4px;
  }

  .selectBox:hover {
    box-shadow: 5px 5px 20px rgba(0, 128, 0, 0.24);
  }
}
</style>