<template>

  <div class="card" style="height: 100%;">
    <div class="header">
      知会
      <div style="margin-right: 5px;">
      
        <n-button size="tiny" type="info" @click="visible = true" >选择人员</n-button>
      
      </div>
    </div>
    <div class="content">
      <vxe-grid
        v-bind="gridOption"
        ref="GridRef"
      >
      </vxe-grid>
    </div>
  </div>
  
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
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-yonghu" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        人员选择
      </div>
    </template>
    <div style="height: 410px;">
      <NwEmployee :value="NotifyUsers" @callback="callback" />
    </div>
    <div style="padding: 5px;text-align: right">
      <!-- <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="() => {}"
      >确定</n-button> -->
      <n-button  size="small"
      @click="visible = false" >关闭</n-button>
    </div>
  </n-modal>
</template>
<script lang="tsx">
import { defineComponent, ref, reactive, nextTick, h } from "vue";
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NForm,
  NFormItem,
  NGrid,
  NFormItemGi,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NSpace,
  NCheckbox,
  NRadioGroup,
  NRadio,
  NDivider,
  NDrawer,
} from "naive-ui";
import {
  NwIcon,
  request,
  NwEmployeePick,
  NwEmployee,
} from "@platform/main";
import {
  ActiveNode,
  NotifyUsers
} from '../../store'

export default defineComponent({
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NForm,
    NFormItem,
    NGrid,
    NFormItemGi,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    NSpace,
    NCheckbox,
    NRadioGroup,
    NRadio,
    NDivider,
    NDrawer,
    NwEmployee,
    NwEmployeePick,
  },
  
  setup(props: any, context: any){
    const visible = ref(false)
    const gridRef = ref(null)
    // 用户列表
    const gridOption = ref<any>({
      rowId: 'id',
      rowKey: false,
      height: '340px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      data: NotifyUsers, // nodeAction
      columns: [
        {
          title: '姓名',
          field: 'userNameCh',
          width: 80
        },
        {
          field: "orgFullName",
          title: "机构部门",
          showOverflow: 'title'
        
        },
        {
          field: 'startEnable',
          title: '操作',
          width: 70,
          showHeaderOverflow: true,
          fixed: 'right',
          slots: {
            default: ({ row }: any) => {
              return [
              <NButton
                text
                size="small"
                color="#1890ff"
                onClick={() => {
                  const index = NotifyUsers.value.findIndex(d => d.userId === row.userId)
                  if (index >= 0) {
                    NotifyUsers.value.splice(index, 1)
                    NotifyUsers.value = [
                      ...NotifyUsers.value
                    ]
                  }
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
      ]
    })
      return {
        visible,
        gridRef,
        gridOption,
        NotifyUsers,
        callback (flag: boolean, userId: string, userNameCh: string, userName: string, row: any) {
          console.log('======row====', userId, userNameCh, userName, row)
          if (flag) {
            NotifyUsers.value = [
              ...NotifyUsers.value,
              {
                id: userId,
                userId,
                userNameCh,
                userName,
                orgFullName: row.orgFullName,
              }
            ]
          } else {
            const index = NotifyUsers.value.findIndex(d => d.userId === userId)
            if (index >= 0) {
              NotifyUsers.value.splice(index, 1)
              NotifyUsers.value = [
                ...NotifyUsers.value
              ]
            }
          }
        }
      }
  },
});
</script>

<style scoped lang="less">

.card {
  .header {
    display: flex;
    align-items: center;
    height: 32px;
    font-size: 14px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    text-indent: 5px;
    line-height: 14px;
    justify-content: space-between;
  }
  .content {
    height: calc(~'100% - 32px')
  }
}
</style>
