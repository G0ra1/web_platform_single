<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    style="width: 900px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
    loading
    bordered
  >
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        角色赋权
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
            <nw-icon name="icon-tuichu1" :size="16" color="red" />
          </n-button> -->
      </div>
    </template>
    <div style="height: 300px;">
      <vxe-grid
          ref="gridRef"
          v-bind="bind"
        />
    </div>
    <template #action>
      <div style="padding: 5px">
        <n-button type="info" size="small" style="margin-right: 5px" @click="handle">
          提交
        </n-button>
        <n-button size="small" @click="visible = false">取消</n-button>
      </div>
    </template>
  </n-modal>
</template>
<script lang="tsx">
import { ref, reactive, nextTick, h } from "vue";
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
  useMessage
} from "naive-ui";
import {
  NwIcon,
  request,
  VxeHelper,
  RequestPaging
} from "@platform/main";


export default {
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
  },
  props: {
    value: {
      type: String,
      default: "",
    }
  },
  emits: ["callback"],
  setup(props: any, context: any) {
    const message = useMessage()
    const visible = ref(false)
    const sendData = ref({})
    const portalPortalRoles = ref([])

    // 加工
    let shaping = r => {
      r.result.forEach(d => {
        d._isActive = portalPortalRoles.value.findIndex(n => n.roleId === d.id) >= 0

      })
      return r
    }
    const {
      bind,
      gridRef,
      filterData,
      query,
      reset
    } = new VxeHelper.VxeGridPaging<any>({
      height: '300px',
      columns: [
        { field: "roleName", title: "角色名称", showHeaderOverflow: true,
          slots:{
            default:({row})=>{
              return <span style=" white-space: nowrap;overflow: hidden; text-overflow: ellipsis;display:inline-block;width:100%">
              { row.roleName }
            </span>
            }
          } 
        },
        // { title: "角色编码", showHeaderOverflow: true,showOverflow:true,
        //   slots:{
        //     default:({row})=>{
        //       return <span>
        //       { row.roleCode  }
        //     </span>
        //     }
        //   } 
        // },
        {title: "角色类型", field: "roleType", showHeaderOverflow: true,showOverflow:true,
          slots: {
                default: ({row}) => {
                  return [
                    <span>
                      {row.roleType == 1 ? '功能角色' : (row.roleType == 2 ? '数据角色' : (row.roleType == 3?'流程角色' : ''))}
                    </span>,
                  ];
                },
              }
        },
        { field: "status", title: "启用状态", showOverflow: true,
            slots: {
              default: ({row}) => {
                return [
                  <span>
                    {row.status == 1 ? '启用' : '禁用'}
                  </span>,
                ];
              },
            }
        },

        {
          title: '操作',
          showHeaderOverflow: true,
          width: '230px',
          slots: {
            default: ({ row }) => {
              if (row._isActive) {

                return [
                  <NButton type='success' size='small' onClick={() => {

                    row._isActive = false
                  }}>{{
                    default: () => '已选择'
                  }}</NButton>
                ]
              } else {
                
                return [
                  <NButton type='info' size='small' onClick={() => {
                    row._isActive = true
                  }} >{{
                    default: () => '选择'
                  }}</NButton>
                ]
              }

            },
          }
        }
      ]
    }, new RequestPaging(
      '/main/mdmRole/list',
      'post'
    ), shaping
    )

    // data 是回显数据
    const show = async (data) => {
      sendData.value.id = data.id
      sendData.value.portalName = data.portalName

      visible.value = true
      

      await request({
        url: `/portal/portalPortalRole/getByPortalId/${data.id}`,
        method: 'get'
      }).then(d => {
        portalPortalRoles.value = d.portalPortalRoles || []
      }).catch(error => {
       
      })

      
      await nextTick().then(() => {
        reset({
          appCode: "incloud-base-portal",
          roleType: 2
        })
      })

    }
    return {
      visible,
      show,
      
      bind,
      gridRef,
      filterData,
      query,
      reset,

      handle () {
        console.log(gridRef.value.getData())
        const activeRoles = gridRef.value.getData().filter(d => d._isActive).map(d => ({
          roleCode: d.roleCode,
          roleId: d.id,
          roleName: d.roleName,
        }))
        sendData.value.portalPortalRoles = activeRoles

        // console.log(sendData.value)

        request({
          url: `/portal/portalPortalRole`,
          method: 'post',
          data: sendData.value
        }).then(d => {
          message.success('赋权成功')
          visible.value = false
        }).catch(error => {
          message.error('赋权失败')
        })
      }
    }
  },
};
</script>

<style lang="less">
</style>
