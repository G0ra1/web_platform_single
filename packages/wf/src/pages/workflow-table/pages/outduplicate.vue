<template>

  <vxe-grid
    v-bind="bind"
    ref="gridRef"
  >
  </vxe-grid>
</template>

<script lang='jsx'>
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
import { NwIcon, VxeHelper, RequestPaging } from '@platform/main';
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
    window.addEventListener('wfComplete', () => {
      reset({})
    })
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

    const portalOptions = ref([]);
    const partOptions = ref([]);
    // const reset = () => {
    //   refresh.value = false;
    //   nwTable.value.resetSearch();
    //   nextTick(() => {
    //     refresh.value = true;
    //   });
    // }
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging({
        columns: [
        { type: "seq", width: 40, minWidth: 40, fixed: 'left', },

        {
          field: "code", title: "单据编号", showHeaderOverflow: true, showOverflow: true, slots: {
            default: ({ row }) => {
              return <span onClick={() => {
                // window.open(`/web-wf/pages/run-skin.html?Action=todo&id=${row.id}`)

                window.open(
                  `/web-wf/pages/run-skin.html?Action=out_duplicate&id=${row.id}`,
                  '_blank',
                  'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
                )

              }} style="color:#1d7ced;cursor: pointer;">{row.bizKey}</span>
            }
          }
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
          showHeaderOverflow: true, showOverflow: true,
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
                    // window.open(`/web-wf/pages/run-skin.html?Action=todo&id=`)
                  }}
                >查看</a>,
              ]
            },

          }
        }
      ]
      }, new RequestPaging(
          '/wf/wfmyoutduplicatetask/list',
          'post'
      )
    )
    nextTick().then(() => {
      reset({
        //formNameCh: '测试'
      })
    })
    return {
      
      bind,
      gridRef,
      filterData,
      query,

      refresh,

      headerSearchForm,
      partOptions,
      portalOptions,
      message,
      contentTile,
      formVisible,
      formValue: {},
      Form,
      model
    };
  },
  created() {
  },
  methods: {
    show() {
    },
    test() {
      this.message.success("保存成功");
    },
  },
});
</script>