<template>
  <n-drawer
    :to="props.to"
    v-model:show="drawerVisible"
    width="600px"
    :height="200"
    placement="right"
    class="c-n-drawer-view"
    :theme-overrides="{
      bodyPadding: '0'
    }"
  >
    <n-drawer-content
      :header-style="{
        padding: '10px',
        'font-size': '16px',
        'font-weight': 'bold'
      }"
      :footer-style="{
        padding: '10px',
      }"
    >
      <template #header>
        <div style="display: flex;justify-content: space-between;">
          <div>
          {{templateBase.templateName}}
          <span style="font-size: 14px;color: #888">版本列表</span>
          </div>
          <div>
            
              <n-button
                size="small"
                type="primary"
                style="margin-right: 15px;"
                @click="createVersion"
              >
                新建版本
              </n-button>
          </div>
        </div>
      </template>
      <n-spin
      :show="spinShow"
      class="c-n-drawer-view-spin"
      style="height: 100%">
        <vxe-grid
          v-bind="gridOptions"
          ref="gridComponent"
          style="height: 100%"
        />
      </n-spin>
      <template #footer>
        <n-button size="small" @click="drawerVisible = false">关闭</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import NwIcon from "/@/components/nw-icon/index.vue";
import { defineComponent, ref, reactive, getCurrentInstance, h } from "vue";
import {
  NSpace,
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NSelect,
  NForm,
  NFormItem,
  NUpload,
  NImage,
  NSpin,
  NRadio,
  NRadioGroup,
  NGrid,
  NFormItemGi,
  useMessage,
  useDialog
} from "naive-ui";
import Setting from "/setting";
import {
  queryVersion,
  updateVersion,
  delVersion,
} from "./api";
import redirectPage from '/@/plugins/redirect-page'
import NwDic from "/@/components/nw-dictionary/index.vue";

export default defineComponent({
  components: {
    NSpace,
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NSelect,
    NForm,
    NFormItem,
    NUpload,
    NwIcon,
    NImage,
    NSpin,
    NRadio,
    NRadioGroup,
    NGrid,
    NFormItemGi,
    NwDic,
  },
  props: {
    model: {
      default: {},
      type: Object,
    },
    to: {
      default: {},
      type: Object,
    }
  },
  setup(props, context) {
    const templateBase = ref({});
    const templateSearch = ref({})
    const message = useMessage()
    const dialog = useDialog()
    const gridComponent = ref(null)
    const drawerVisible = ref(false);
    const spinShow = ref(false);
    const model = ref({
      portalId: null,
      partTypeId: null,
      isEnable: 1,
      isDs: 0,
    });
    const sendDelVersion = (row) => {
      // 这里加入确认

      // del(selected.map(d => d.id).join(',')).then(r => {
      //   message.success('删除成功')
      // }).catch(err => {
      //   message.error('删除失败')
      //   console.log('err===', err)
      // })
      const {
        id
      } = row
      const delDialog = dialog.warning({
      title: '删除警告',
      content: () => '确认删除该模板版本？',
      positiveText: '确认',
      onPositiveClick: () => {
        delDialog.loading = true
        return new Promise((resolve) => {
          delVersion(id).then(res => {
            console.log('====res==', res)
            if (res) {
              message.success('删除成功')
            } else {
              message.error('删除失败')
            }
          }).catch(err => {
            message.error('删除失败')
          }).finally(() => {
            delDialog.loading = false
            gridComponent.value.commitProxy('query')
            resolve()
          })
        })
      }
    })
    }
    // -===========通用===========
    const gridOptions = reactive({
      rowId: 'id',
      size: 'mini',
      // stripe: true,
      border: false,
      resizable: true,
      height: 'auto',
      align: null,
      columns: [
        { type: "seq", width: 40 },
        {
          field: "templateVersion",
          title: "版本号",
          width: 70
        },
        {
          field: "templateVersion",
          title: "是否生效",
          width: 70,
          slots: {
            default: ({ row }) => {
              return row.crrVersion ? '是' : '否'
            }
          }
        },
        { field: "createUserName", title: "创建人", width: 70 },
        { field: "createTime", title: "创建时间", width: 140 },
        {
          title: '操作',
          showHeaderOverflow: true,
          width: 200,
          fixed: 'right',
          slots: {
            default: ({row}) => {
              return [<NButton
                text
                color="#1890ff"
                onClick={() => {
                  // 编辑模板
                  redirectPage(`portal/template-render.html?templateId=${row.id}#/index`, true)
                }}
                style="margin-right: 5px;"
              >
                {{
                  default: () => '预览',
                  // icon: () => <NwIcon name="icon-jigou" />
                }}
              </NButton>,
              <NButton
                disabled={ row.crrVersion }
                text
                color="#1890ff"
                onClick={() => {
                  effectVersion(row)
                }}
                style="margin-right: 5px;"
              >
                {{
                  default: () => '生效',
                  // icon: () => <NwIcon name="icon-jigou" />
                }}
              </NButton>,
              <NButton
                text
                color="#1890ff"
                onClick={() => {
                    redirectPage(`portal/template-editor.html?action=createBy&id=${row.id}`)
                }}
                style="margin-right: 5px;"
              >
                {{
                  default: () => '创建',
                  // icon: () => <NwIcon name="icon-jigou" />
                }}
              </NButton>,
              <NButton
                text
                color="#1890ff"
                onClick={() => {
                  redirectPage(`portal/template-editor.html?action=editVersion&id=${row.id}`)
                }}
                style="margin-right: 5px;"
              >
                {{
                  default: () => '编辑',
                  // icon: () => <NwIcon name="icon-jigou" />
                }}
              </NButton>,
              <NButton
                disabled={ row.crrVersion }
                text
                color="#1890ff"
                onClick={() => {
                  sendDelVersion(row)
                }}
                style="margin-right: 5px;"
              >
                {{
                  default: () => '删除',
                  // icon: () => <NwIcon name="icon-jigou" />
                }}
              </NButton>]
            }
          }
        }
      ],
      pagerConfig: {
        enabled: false
      },
      proxyConfig: {
        form: true,
        seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
        props: {
          list: 'list',
          // result: 'result',
          // total: 'total'
        },
        ajax: {
          // 接收 Promise
          query: (...p) => {
            console.log('====ppp===', p)
            return queryVersion({
                ...templateSearch.value,
                page: {
                  size: 10
                }
              }).then(res => {
              return {
                list: res
              }
            })
          }
        }
      },
      checkboxConfig: {
        // trigger: 'row',
        // reserve: true
      },
      radioConfig: {
        // trigger: 'row',
        reserve: true
      }
    })
    // 设置生效版本
    const effectVersion = (row) => {
      spinShow.value = true
      const {
        portalId,
        templateCode,
        id: templateId,
        terminal
      } = row
      updateVersion({
        portalId,
        templateCode,
        templateId,
        terminal
      }).then(res => {
        console.log('updateVersion', res)
      }).finally(() => {
        gridComponent.value.commitProxy('query').finally(() => {
          spinShow.value = false
        })
      })
    }
    // 基于当前版本创建新版本
    return {
      props,
      gridComponent,
      templateBase,
      model,
      drawerVisible,
      gridOptions,
      show(row) {
        console.log('======row======', row)
        const {
          portalId,
          templateCode,
          terminal
        } = row
        templateSearch.value = {
          portalId,
          templateCode,
          terminal
        }
        templateBase.value = row
        drawerVisible.value = true;
      },
      // 生效版本
      effectVersion,
      spinShow,
      createVersion () {
        redirectPage(`portal/template-editor.html?action=createVersion&id=${templateBase.value.id}`)
      }
    };
  },
});
</script>
<style lang="less" >
.c-n-drawer-view {
  &-spin {
    height: 100%;
    &.n-spin-container > .n-spin-content {
      height: 100%;
    }
  }
  .n-drawer-header__main {
    width: 100%;
  }
}

</style>