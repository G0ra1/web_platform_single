<template>
    
  <n-config-provider
  abstract
  :theme-overrides="{}"
  >
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 800px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        版本列表
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <n-spin :show="isLoading">
      <n-layout has-sider class="nw-modal-layout">
        <n-layout-content>
          <vxe-grid class="nw-vxe-grid" ref="gridRef" v-bind="gridOption" />
        </n-layout-content>
      </n-layout>
      <div class="nw-modal-action">
        <!-- <n-button
          type="info"
          size="small"
          style="margin-right: 5px"
          @click="handleModalComplete"
          >确定</n-button
        > -->
        <n-button size="small" @click="visible = false">取消</n-button>
      </div>
    </n-spin>
  </n-modal>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from "vue";
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  useMessage,
  useDialog
} from "naive-ui";
import { NwIcon } from "@platform/main";

import { queryVersionList, delVersion, enableVersion } from "./api/index";

export default {
  name: "versionModal",
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
  },
  props: {},
  emits: ['callback'],
  setup(props, context) {
    const message = useMessage()
    const dialog = useDialog()
    const isLoading = ref(false);
    // 模态展示
    const visible = ref(false);

    // 表格dom
    const gridRef = ref(null);

    // 数据模型分类
    const gridData = ref([]);

    const camundaProcdefKey = ref(null)
    // 查询
    const query = () => {
        queryVersionList(camundaProcdefKey.value).then((res) => {
          isLoading.value = false;
          // 复制已选
          gridData.value = res
        });
    }
    const sendEnableVersion = (row) => {
        enableVersion(row.camundaProcdefId).then(res => {
            if (res) {
            message.success('生效成功')
            } else {
            message.error('生效失败')
            }
        }).catch(err => {
            message.error('生效失败')
        }).finally(() => {
            query()
            context.emit('callback')
        })
    }
    // 删除版本
    const sendDeleteVrsion = (row) => {
    // 这里加入确认

    // del(selected.map(d => d.id).join(',')).then(r => {
    //   message.success('删除成功')
    // }).catch(err => {
    //   message.error('删除失败')
    //   console.log('err===', err)
    // })
 
    const delDialog = dialog.warning({
    title: '删除警告',
    content: () => '确定删除该流程版本？',
    positiveText: '确认',
    onPositiveClick: () => {
        delDialog.loading = true
        return new Promise((resolve) => {
        delVersion(row.camundaProcdefId).then(res => {
            if (res) {
            message.success('删除成功')
            } else {
            message.error('删除失败')
            }
        }).catch(err => {
            message.error('删除失败')
        }).finally(() => {
            delDialog.loading = false
            query()
            resolve()
        })
        })
    }
    })
    }
    // 主备选表
    const gridOption = ref({
      rowId: "id",
      rowKey: false,
      height: "400px",
      size: "mini",
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      //
      tableMenu: {},
      data: gridData,
      columns: [
        {
          title: "流程分类",
          field: "procdefTypeName",
          width: 80,
        },
        { field: "procdefName", title: "流程名称" },
        { field: "camundaProcdefKey", title: "流程Key" },
        { field: "procdefVersion", title: "版本号" },
        { field: "versionTag", title: "版本Tag" },
        { field: "createUserName", title: "创建人" },
        { field: "createTime", width: 130, title: "创建时间" },
        {
          field: "startEnable",
          title: "操作",
          width: 100,
          showHeaderOverflow: true,
          fixed: "right",
          slots: {
            default: ({ row }) => {
              return [
                <NButton
                  text
                  size="small"
                  color="#1890ff"
                  onClick={() => {
                      sendEnableVersion(row)
                  }}
                  style="margin-right: 5px;"
                >
                  {{
                    default: () => "生效",
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                </NButton>,
                <NButton
                  text
                  size="small"
                  color="#1890ff"
                  onClick={() => {
                      sendDeleteVrsion(row)
                  }}
                  style="margin-right: 5px;"
                >
                  {{
                    default: () => "删除",
                    // icon: () => <NwIcon name="icon-jigou" />
                  }}
                </NButton>,
              ];
            },
          },
        },
      ],
    });

    // 删除xml form
    const handleDelForm = (el) => {};
    // 清除所有
    const handleClearForm = () => {};
    return {
      props,
      isLoading,
      gridRef,
      gridOption,
      visible,
      show(id) {
        visible.value = true;
        isLoading.value = true;
        camundaProcdefKey.value = id
        // queryVersionList(camundaProcdefKey).then((res) => {
        //   isLoading.value = false;
        //   // 复制已选
        //   console.log('=========', res)
        //   gridData.value = res
        // });
        query()
        // 赋值已选择的
      },
      handleClearForm,
    };
  },
};
</script>

<style lang="less">
.nw-modal {
  &.n-dialog > .n-dialog__close {
    top: 5px;
    right: 4px;
  }
  &.n-dialog > .n-dialog__title {
    border-bottom: 1px solid #c6c6c6;
    background: #e8eaec;
    padding-left: 5px;
    height: 34px;
    .n-base-icon {
      width: unset;
      height: unset;
    }
  }
  &-action {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-top: 1px solid #c6c6c6;
  }
  &-control {
    background: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    padding: 5px;
    border-bottom: 1px solid #e8eaec;
  }
  &-layout {
    &-sider {
      &-title {
        font-size: 12px;
        font-weight: bold;
        background: #f8f8f9;
        padding: 0 5px;
        height: 23px;
        line-height: 23px;
        border-bottom: 1px solid #e8eaec;
      }
    }
  }
}
</style>
