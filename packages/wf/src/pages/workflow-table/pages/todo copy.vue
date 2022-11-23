<template>
  <n-layout class="nw-page">
    <n-layout-content class="n-layout-content2">
      <!-- <NwTable1 ref="nwTable" :columns="columns" default-key="bizKey" :data="null" :headerSearchForm="headerSearchForm"
        :request="request" :response="response" :searchFormFields="[
          {
            field: 'roleName',
            title: 'name',
            valueFormat: (d) => d,
          },
        ]">
        <template v-slot:header-left="{ selected }"> </template>
        <template #header-right> </template>
        <template v-slot:search-form="{ searchFormData }">
          <n-form :model="searchFormData">
            <n-form-item label="单据号" path="bizKey">
              <n-input placeholder="请输入单据号" v-model:value="searchFormData.bizKey" size="small" />
            </n-form-item>
            <n-form-item label="标题" path="reason">
              <n-input placeholder="请输入标题" v-model:value="searchFormData.reason" size="small" />
            </n-form-item>
          </n-form>
        </template>
      </NwTable1> -->
    </n-layout-content>
  </n-layout>
</template>

<script lang='jsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h, defineComponent, ref, reactive, getCurrentInstance, nextTick } from 'vue';
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
} from "naive-ui";
import { wftodotaskList, } from "../api";
import { cloneDeep } from 'lodash'
import { NwIcon } from '@platform/main';
export default defineComponent({
  components: {
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
    NwIcon
  },
  setup() {
    const nwTable = ref(null);
    const nwTable2 = ref(null)
    const message = useMessage();
    const formVisible = ref(false);
    const model = ref({})
    const Form = ref(null)
    const contentTile = ref('新闻新建')
    const refresh = ref(true)
    // const {proxy} = getCurrentInstance()
    const headerSearchForm = reactive({
      title: ''
    })
    const _setHomePage = (row) => {
      setHomePage(row.id).then(res => {
        message.success("设置成功");
        proxy.$refs.nwTable.commitQuery()
      })
    }
    const portalOptions = ref([]);
    const partOptions = ref([]);
    const reset = () => {
      refresh.value = false;
      nwTable.value.resetSearch();
      nextTick(() => {
        refresh.value = true;
      });
    }
    return {
      refresh,
      reset,
      nwTable2,
      nwTable,
      headerSearchForm,
      partOptions,
      portalOptions,
      message,
      contentTile,
      formVisible,
      formValue: {},
      Form,
      model,
      request: {
        XHR: wftodotaskList, // promise 请求函数
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
        { type: "seq", width: 40, minWidth: 40, fixed: 'left', },
        {
          field: "bizKey", title: "单据号", showHeaderOverflow: true, showOverflow: true, fixed: 'left',

        },
        {
          field: "procdefTypeName", title: "流程分类", showHeaderOverflow: true, showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>{row.procdefTypeName}</span>,
              ];
            }
          },
        },
        {
          field: "",
          title: "申请人 / 申请时间",
          showHeaderOverflow: true, showHeaderOverflow: true, showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>{(row.starterNameStd || row.starterName || "-") + '/' + (row.applyTime || "-")}</span>,
              ];
            }
          },
        },
        {
          field: "", title: "审批状态", showHeaderOverflow: true, showOverflow: true,
          slots: {
            default: ({ row }) => {
              let text = "";
              switch (row.state) {
                case 1:
                  text = "运行中";
                  break;
                case 2:
                  text = "完成";
                  break;
                case 3:
                  text = "挂起";
                  break;
                case 4:
                  text = "终止";
                  break;
                case 5:
                  text = "知会";
                  break;
              }
              return [
                <span>{text}</span>,
              ];
            },
          },

        },
        {
          field: "reason", title: "标题", showHeaderOverflow: true, showOverflow: true
        },
        {
          field: "", title: "待办人 / 签收时间", showHeaderOverflow: true, showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>{(row.assigneeName || "-") + '/' + (row.cliamTime || "-")}</span>,
              ];
            }
          },
        },
        {
          field: "", title: "申请机构 / 申请部门", showHeaderOverflow: true, showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>{(row.starterOrgNameStd || row.starterOrgName) + '/' + (row.starterDeptNameStd || row.starterDeptName)}</span>,
              ];
            }
          },
        },
        {
          field: "taskName", title: "任务名", showHeaderOverflow: true, showOverflow: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>{row.taskNameStd || row.taskName}</span>,
              ];
            }
          },
        },
        {
          field: "", title: "操作", showHeaderOverflow: true, showOverflow: true, fixed: 'right',
          slots: {
            default: ({ row }) => {
              return [
                <a
                  type="text"
                  size="small"
                  style="margin-left:5px;cursor: pointer;"
                  onClick={() => {
                    // redirectPage(`/wf/run-skin.html?Action=draft&id=${row.id}`, true)
                  }}
                >查看</a>,
              ]
            },

          }
        }
      ]),
    };
  },
  created() {
  },
  methods: {
    show() {
      this.$refs.nwTable.toggleSearchForm();
    },
    test() {
      this.message.success("保存成功");
    },
  },
});
</script>