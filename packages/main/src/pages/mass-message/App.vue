<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5" style="padding: 0 5px;">
        <n-form ref="formRef" inline label-placement="left" :label-width="80" :model="SearchForm" style="height: 30px;">
          <n-form-item label="标题" path="msgTitle">
            <n-input v-model:value="SearchForm.msgTitle" placeholder="标题" />
          </n-form-item>
          <n-form-item>
            <n-button type="info" attr-type="button" style="margin-right: 5px;" @click="()=>{
              vbind.request.params.msgTitle =SearchForm.msgTitle
              $refs.tableRef.commitQuery()
            
            }">
              查询
            </n-button>
            <n-button type="warning" attr-type="button" @click="()=>{
              SearchForm.msgTitle = ''
              vbind.request.params.msgTitle = ''
              $refs.tableRef.commitQuery()
            }">
              重置
            </n-button>
          </n-form-item>
        </n-form>
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-button type="primary" @click="showAction">

          消息群发
        </n-button>
      </n-space>
    </n-layout-header>
    <n-layout-content ref="page" content-style="height: 100%">
      <NwTable ref="tableRef" :columns="columns" v-bind="vbind">
      </NwTable>
    </n-layout-content>
  </n-layout>
  <n-modal v-model:show="showModal" preset="dialog" :title="formData.btnType==1?'即时通消息':'发送短信'">
    <n-form>
      <n-form-item label="内容">
        <n-input v-model:value="formData.msgContent" type="textarea" placeholder="" />
      </n-form-item>
    </n-form>
    <template #action>
      <n-button type="warning" size="small" @click="showModal = false">取消</n-button>
      <n-button type="success" size="small" style="margin-right: 5px" @click="formBtn">保存</n-button>
    </template>
  </n-modal>
  <ModalAction ref="modalAction" @update:callback="() => {
        $refs.tableRef.commitQuery()

  }"></ModalAction>
</template>

<script lang="jsx">
import { ref, reactive, defineComponent, nextTick, h, onMounted } from 'vue'
// import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
// import type { VxeGridProps, VxeGridInstance } from 'vxe-table'

import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NInputGroup,
  NDrawer,
  NDrawerContent,
  useDialog,
  NLayoutSider,
  NTree,
  NForm,
  NFormItem,
  NSpin,
  NCard,
  NPopover,
  NGrid,
  NPopconfirm,
  NGridItem,
  useMessage,
  NRate,
  NModal
} from 'naive-ui'
import {
  NwIcon, RequestPaging, VxeHelper, request, NwTable,

} from '@platform/main'
import { query, } from './api/index'
import { sendMessage, sendMsgForCts } from '.././page-linkman/api/index'
import ModalAction from '../../pages/page-linkman/components/messagingAction.vue'

export default defineComponent({
  components: {
    NwTable,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NPopconfirm,
    NSpace,
    NwIcon,
    NGrid,
    NGridItem,
    NForm,
    NFormItem,
    NPopover,
    NCard,
    NTag,
    NSpin,
    NInput,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NTree,
    NLayoutSider,
    NRate,
    NModal,
    ModalAction
  },
  setup(props, context) {

    const dialog = useDialog()
    const formData = ref({})
    const showModal = ref(false)
    const SearchForm = ref({})
    const tableRef = ref()
    const tIsLoading = ref(false)
    const isLoading = ref(false)
    const message = useMessage();
    const modalAction = ref()
    const showAction = () => {
      modalAction.value.sonFn()
    }
    const columns = reactive([
      //  {
      //       field: 'userNameCh', title: '平台名称', 
      //       slots: {
      //         default: ({ row }) => {
      //           return [
      //             <span>
      //               <a style="color:#2d8cf0;cursor: pointer;" onClick={(e) => {

      //               }
      //               }>{row.userNameCh}</a>
      //             </span>,
      //           ];
      //         },
      //       }

      //     },
      { field: 'msgTitle', title: '标题', showHeaderOverflow: true, },
      {
        field: 'smsMsgType', title: '消息类型', showHeaderOverflow: true,
        slots: {
          default: ({ row }) => {
            return [
              <span>
                {(row.smsMsgType) ? [
                  { label: '短信', value: 'sms' },
                  { label: '企业微信', value: 'qywechat' },
                  { label: '邮箱', value: 'mail' },

                ].filter(d => (row.smsMsgType.split(',')).indexOf(d.value) > -1).map(item => item.label).join(',') : ''
                }
              </span>,
            ];
          },
        }
      },
      { field: 'createUserName', title: '创建人', showHeaderOverflow: true, },
      { field: 'receiverDeptNames', title: '接收部门', showOverflow: true, },
      { field: 'receiverUserNames', title: '接收人', showOverflow: true, },
      { field: 'createTime', title: '创建时间', showOverflow: true, },
    ]);
    const vbind = {
      request: {
        XHR: query, // promise 请求函数
        params: {},
        pageMethod: (current, size) => ({
          page: {
            current,
            size,
          },
        })
      },
      response: {
        dataMethod: (res) => res.records,
        pageMethod: ({ total }) => (total)
      }
    }

    const search = () => {
      context.emit('update:typeSearch');
    }
    const formBtn = () => {
      const fn = formData.value.btnType == 1 ? sendMessage : sendMsgForCts
      fn({
        receiverUserNameCh: formData.value.userNameCh,
        receiverUserCode: formData.value.userCode,
        receiverUserPhone: formData.value.phoneNum,
        msgContent: formData.value.msgContent,
        msgTitle: formData.value.msgTitle
      })
    }


    onMounted(() => {
    })
    return {
      SearchForm,
      columns,
      tableRef,
      vbind,
      search,
      tIsLoading,
      isLoading,
      showModal,
      formData,
      formBtn,
      showAction,
      modalAction
    }
  }
})

</script>

<style  lang='less' scoped>
.questionHeader {
  display: flex;
  width: 100%;
  padding: 0px 0 5px 0;

  .btn {
    width: 50px;
    margin: 0 5px;
  }

  .textInput {
    flex: 1;
  }
}
</style>
