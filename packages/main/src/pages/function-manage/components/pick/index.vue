<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->
  <!-- <div style="padding: 5px;height: calc(100% - 10px)">
    <div style="display: flex;justify-content: space-between;padding: 5px 0;align-items:center">
      <n-input
        size="small"
        :value="props.fullName"
        disabled
        placeholder=""
      />
      <n-button type="info" size="small" style="margin-left: 5px;" @click="handleModalShow" >选择</n-button>
    </div>
  </div> -->
  <div>
    <div style="display: flex;justify-content: space-between;padding: 5px 0;align-items:center">
      <n-input
        size="small"
        :value="props.fullName"
        disabled
        placeholder=""
      />
    <n-button type="info" size="small" style="margin-left: 5px;" @click="handleModalShow" >选择</n-button>
    </div>
  </div>
  <!-- 模态 -->  
  <n-config-provider
    abstract
    :theme-overrides="theme"
  >
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 1000px; height: 565px;padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择功能
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <!-- <div class="nw-modal-control">
      <n-button type="info" size="small" style="margin-right: 5px" >确定</n-button>
      <n-button  size="small" >取消</n-button>
    </div> -->
    <n-layout has-sider class="nw-modal-layout" >
      <n-layout-sider width="250">
        <NwAppTreeGrid
          rootName="全部"
          @callback="selectApp"
        />
      </n-layout-sider>
      <n-layout-content>
        <vxe-grid v-bind="bind" ref="gridRef">
        </vxe-grid>
      </n-layout-content>
    </n-layout>
    <template #action>
      <n-button
      @click="visible = false" >取消</n-button>
    </template>

  </n-modal>
  </n-config-provider>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
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
} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper, request, NwAppTreeGrid, Page } from '@platform/main'

export default {
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
    NwAppTreeGrid
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    fullName: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: [ 'callback', 'update:value', 'update:formId', 'update:fullName', 'update:shortName' ],
  setup(props, context){
    // 模态展示
    const visible = ref(false)
    const appInfo = ref({ appCode: ''})

    const {
            bind,
            gridRef,
            filterData,
            query,
            reset
        } = new VxeHelper.VxeGridPaging({
            // border: 'inner',
            columns: [
                { field: "fullName", title: "功能名称"},
                { field: "code", title: "功能编码" },
                { field: "formNameCh", title: "表单"},
                {
                    title: "关联流程",
                    slots: {
                        default: ({ row }) => {
                            // camundaProcdefKey
                            if (row.camundaProcdefKey) {
                                return [
                                    <div style="display:flex; align-items: center">
                                        已关联流程 &lt;{row.camundaProcdefKey}&gt;&nbsp;
                                    </div>    
                                ]
                            } else {
                                return [
                                    `未关联流程`
                                ]
                            }
                        }
                    }
                },
                // { field: "type", width: '70px',title: "类型", showHeaderOverflow: true },
                // { field: "createTime", title: "创建时间", showHeaderOverflow: true },
                {
                    title: '操作',
                    showHeaderOverflow: true,
                    width: '60px',
                    fixed: true,
                    slots: {
                        default: ({ row }) => {
                            return [
                                <NButton
                                    size="tiny"
                                    type="primary"
                                    style="margin-right: 5px;"
                                    onClick={() => {
                                      handleModalComplete(row)
                                    }}
                                >{{
                                    default: () => '选择'
                                }}</NButton>,
                            ];
                        },
                    }
                }
            ]
        }, new RequestPaging(
            '/main/mdmCpts/list',
            'post'
        )
        )

    // 模态
    const handleModalShow = () => {
      visible.value = true

      nextTick().then(() => {
        refresh()
      })
    }
    // 选择完成，赋值到xml
    const handleModalComplete = (row) => {
      console.log(row)
      context.emit('update:value', row.id)
      context.emit('update:formId', row.formId)
      context.emit('update:fullName', row.fullName)
      context.emit('update:shortName', row.shortName)
      //callback
      context.emit('callback', row)
      visible.value = false
    }
    const refresh = () => {
      reset({
        appCode: appInfo.value.appCode
      })
    }

    return {
      props,
      visible,
      handleModalShow,
      handleModalComplete,
      selectApp (d) {
        console.log(d)
        if (d.appType === 2) {
          appInfo.value = d
        } else if (d.appType === 0) {
          // root
          appInfo.value = { appCode: '' }
        }
        refresh()
      },
      bind,
      gridRef,
      filterData,
      query,
      theme: {
      }
    }
  }
}
</script>

<style lang='less' >
.cpts-list {
  display: flex;
  justify-content: start;
  .cpt-item {
    position: relative;
    border: 1px solid #ccc;
    border-radius: 2px;
    padding: 10px;
    margin: 10px;
    display: flex;
    justify-content: center;
    width: 100px;
    box-shadow: 2px 2px 0px 0px #607d8b;
    overflow: hidden;
    cursor: pointer;
    &-icon {
      // display: flex;
      // justify-content: center;
      // margin-right: 10px;
      position: absolute;
      top: -10px;
      left: 0px;
      opacity: .2;
    }
    &-text {
      display: flex;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      word-wrap: break-word;
    }
    &:hover {
      box-shadow: 0px 0px 3px 3px #607d8b;
    }
    &.active {
      box-shadow: inset 2px 2px 0px 0px #607d8b;
    }
  }
}
</style>