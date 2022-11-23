<template>
  <n-layout class="nw-layout-full">
    <n-layout-header class="nw-layout-header">
      <n-space :size="5" style="padding: 0 5px;">
        <n-form ref="formRef" inline label-placement="left" :label-width="80" :model="SearchForm" style="height: 30px;">
          <n-form-item label="联系人名称" path="userNameCh">
            <n-input v-model:value="SearchForm.userNameCh" placeholder="联系人名称" />
          </n-form-item>
          <n-form-item>
            <n-button type="info" attr-type="button" style="margin-right: 5px;" @click="()=>{
              vbind.request.params.userNameCh =SearchForm.userNameCh
              $refs.tableRef.commitQuery()
            
            }">
              查询
            </n-button>
            <n-button type="warning" attr-type="button" @click="()=>{
              SearchForm.userNameCh = ''
              vbind.request.userNameCh.appName = ''
              $refs.tableRef.commitQuery()
            }">
              重置
            </n-button>
          </n-form-item>
        </n-form>
      </n-space>
      <n-space :size="5" style="padding: 0 5px">
        <n-button type="primary" @click="showChooseEmp">
          <template #icon>
            <nw-icon name="icon-n-y-add" :size="14" />
          </template>
          新建
        </n-button>

      </n-space>
    </n-layout-header>
    <n-layout-content ref="page" content-style="height: 100%">
      <NwTable ref="tableRef" :columns="columns" v-bind="vbind">
      </NwTable>
    </n-layout-content>
  </n-layout>
  <n-modal v-model:show="showModal" preset="dialog" :title="formData.btnType==1?'即时通消息':'发送短信'">
    <n-form style="padding:0 10px">
      <n-form-item label="内容">
        <n-input v-model:value="formData.msgContent" type="textarea" placeholder="" />
      </n-form-item>
    </n-form>
    <template #action style="padding:0 10px">
      <n-button type="default" size="small" @click="showModal = false">取消</n-button>
      <n-button type="error" size="small" style="margin-right: 5px" @click="formBtn">保存</n-button>
    </template>
  </n-modal>
  <EmployeePickModal :isShowSearch="false" ref="employeePickModal" @update:callback="(e) => {
      empAdd(e)
  }"></EmployeePickModal>
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
import { NwIcon, RequestPaging, VxeHelper, request, NwTable, EmployeePickModal } from '@platform/main'
import { query, collectMan, cancelCollectMan, saveBatch } from './api/index'
import { sendMessage, sendMsgForCts } from '.././page-linkman/api/index'

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
    EmployeePickModal
  },
  setup(props, context) {

    const dialog = useDialog()
    const formData = ref({})
    const showModal = ref(false)
    const SearchForm = ref({})
    const tableRef = ref()
    const tIsLoading = ref(false)
    const isLoading = ref(false)
    const employeePickModal = ref()
    const message = useMessage();
    const collect = (row) => {
      const fn = row.isLinkman == 1 ? cancelCollectMan(row.id) : collectMan({
        "linkUserId": row.id,
        "linkUserNameCh": row.userNameCh
      })
      fn.then((r) => {
        tableRef.value.commitQuery()
      }).catch(r => {
      })
    }

    const showChooseEmp = () => {
      employeePickModal.value.sonFn()
    }
    const empAdd = (e) => {
      const arr = []
      e.map((d) => {
        arr.push({
          "linkUserId": d.id,
          "linkUserNameCh": d.userNameCh
        })
      })
      saveBatch(arr).then((r) => {
        tableRef.value.commitQuery()
      })

    }
    const columns = reactive([
      {
        field: 'userNameCh', title: '姓名',
        slots: {
          default: ({ row }) => {
            return [
              <NPopover right placement="right" trigger="click">
                {{
                  trigger: () => <a style="color:#2d8cf0;cursor: pointer;" >{row.userNameCh}</a>,
                  default: () => <div style="width:300px">

                    <h3 style="width:100%;text-align:center">{row.userNameCh}</h3>
                    <div style="width:60%;margin:auto">
                      <NSpace size={5} justify="center">
                        <NButton
                          type="success"
                          onClick={() => {
                            showModal.value = true,
                              formData.value = { ...row, btnType: 1 }
                          }}
                        >即时通</NButton>

                        <NButton
                          type="error"
                          onClick={() => {
                            showModal.value = true,
                              formData.value = { ...row, btnType: 2 }
                          }}
                        >发短信</NButton>
                      </NSpace>
                    </div>
                    <p>所属部门 {row.dealTime}</p>
                    <p>员工编码 {row.userCode}</p>

                    <p>电话 {row.phoneNum}</p>
                    <p>邮箱 {row.email}</p>

                  </div>
                }}

              </NPopover>
            ];
          },
        }

      },
      { field: 'userCode', title: '员工编码', showHeaderOverflow: true, },
      { field: 'staffRank', title: '职级', showHeaderOverflow: true, },
      { field: 'parentDeptName', title: '所属部门', showHeaderOverflow: true, },
      { field: 'phoneNum', title: '电话', showOverflow: true, },
      { field: 'email', title: '邮箱', showOverflow: true, },
      {
        field: "",
        title: "常用联系人",
        width: 100,
        showHeaderOverflow: true,
        slots: {
          default: ({ row }) => {
            return [
              <div>
                <NPopconfirm
                  onPositive-click={(e) => { collect(row) }}
                  positive-text="确定"
                  negative-text="取消"
                >
                  {{
                    trigger: () =>
                      <NwIcon style="cursor: pointer;" name={row.isLinkman ? 'icon-n-n-heart' : 'icon-n-y-heart'} size={18} />,
                    default: () => `是否${row.isLinkman == 1 ? '取消收藏' : '收藏为'}常用联系人?`
                  }}

                </NPopconfirm>
              </div>
            ];
          },
        },
      },
      {
        field: "",
        title: "操作",
        fixed: 'right',
        showHeaderOverflow: true,
        slots: {
          default: ({ row }) => {
            return [
              <div>
                <a
                  style="color:red;cursor: pointer;display:inline-block;margin-left:8px"
                  onClick={() => {
                    showModal.value = true,
                      formData.value = { ...row, btnType: 1 }
                  }}
                >即时通</a>
                <a
                  style="color:red;cursor: pointer;display:inline-block;margin-left:8px"
                  onClick={() => {
                    showModal.value = true,
                      formData.value = { ...row, btnType: 2 }
                  }}
                >发短信</a>
              </div>

            ];
          },
        },
      },
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
    const sideTreeCallback = (row) => {
      vbind.request.params.parentOrgId = row.id
      tableRef.value.commitQuery()
    }
    const search = () => {
      context.emit('update:typeSearch');
    }
    const formBtn = () => {
      if (!formData.value.msgContent) {
        message.warning("请输入消息内容")
        return
      }
      const fn = formData.value.btnType == 1 ? sendMessage : sendMsgForCts
      fn({
        receiverUserNameCh: formData.value.userNameCh,
        receiverUserCode: formData.value.userCode,
        receiverUserPhone: formData.value.phoneNum,
        msgContent: formData.value.msgContent,
        msgTitle: formData.value.msgTitle,
        receiverUserId: formData.value.id
      })
    }


    onMounted(() => {
    })
    return {
      SearchForm,
      columns,
      tableRef,
      vbind,
      employeePickModal,
      sideTreeCallback,
      search,
      tIsLoading,
      isLoading,
      showModal,
      formData,
      formBtn,
      empAdd,
      showChooseEmp,
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
