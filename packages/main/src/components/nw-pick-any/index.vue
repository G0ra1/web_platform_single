<template>
  <n-button v-bind="props.buttonOptions" @click="show">
    {{props.buttonLabel}}
  </n-button>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    :style="{
      width: `${props.width}px`,
      padding: 0}"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        {{props.modalTitle}}
      </div>
    </template>
    <n-layout >
      <n-layout-header>
        <n-space :size="5" style="padding: 5px">
        <n-input-group>
            <n-input v-model:value="searchField"
              placeholder="输入查询文本" :style="{ width: '200px' }" />
            <n-button type="primary" @click="query()">
              搜索
            </n-button>
          </n-input-group>
          <n-button title="重置" type="warning" @click="refresh()">
            <template #icon>
              <nw-icon name="icon-n-y-refresh" />
            </template>
          </n-button>
        </n-space>
      </n-layout-header>
      <n-layout-content :style="{
        height: `${props.height}px`
        }">
        <vxe-grid v-bind="bind" ref="gridRef">
        </vxe-grid>
      </n-layout-content>
    </n-layout>
    
    <template #action>
        
      <div style="padding: 5px;">
        <!-- <n-button
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="send"
        >
        确定
        </n-button> -->
        <n-button  size="small"
        @click="visible = false" >关闭</n-button>
      </div>
    </template>
  </n-modal>
</template>
<script setup lang="tsx">
import {
  NButton,
  NModal,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NInputGroup,
  NInput
} from 'naive-ui'
import { h, ref, reactive, defineComponent, watch, defineExpose, nextTick, defineEmits  } from 'vue'
import { NwIcon, RequestPaging, VxeHelper, request, NwAppTreeGrid, Page } from '@platform/main'

const props = withDefaults(defineProps<{
  rowKey?: string,
  value?: Array<any>,
  buttonLabel?: string,
  buttonOptions?: object,
  modalTitle?: string,
  gridColumns?: Array<any>,
  requestUrl: string,
  requestMethod?: 'post' | 'get',
  requestParam: object, // 前置过滤参数
  isSingle?: boolean,
  width?: number,
  height?: number
}>(), {
  rowKey: 'id',
  value: () => [],
  buttonLabel: '选择',
  buttonOptions: () => ({
    size: 'small',
    type: 'primary'
  }),
  modalTitle: '选择',
  gridColumns: () => ([]),
  requestUrl: '',
  requestMethod: 'post',
  selectType: 'single',
  requestParam: () => ({}),
  isSingle: false,
  width: 800,
  height: 400
})

const emit = defineEmits(['update:value'])
const visible = ref<boolean>(false)



const {
  bind,
  gridRef,
  filterData,
  query,
  reset
} = new VxeHelper.VxeGridPaging<any>({
  columns: [
    ...props.gridColumns,
    {
      title: '操作',
      showHeaderOverflow: true,
      width: '80px',
      slots: {
      default: ({ row }) => {
        if (props.isSingle) {
          return [
            <NButton
              type="primary"
              size="tiny"
              style="margin-right: 5px;"
              onClick={() => {
                emit('update:value', row)
                visible.value = false
              }}
            >{{
              default: () => '选择'
            }}</NButton>
          ]
        }
        const index = props.value.findIndex(d => {
          console.log('d[props.key] === row[props.key]', props.rowKey, d[props.rowKey], row[props.rowKey])
          return d[props.rowKey] === row[props.rowKey]
        })
        if (index >= 0) {
          return [
          <NButton
            type="success"
            size="tiny"
            style="margin-right: 5px;"
            onClick={() => {
              props.value.splice(index, 1)
              emit('update:value', props.value)
            }}
          >{{
            default: () => '已选择'
          }}</NButton>
        ]
        } else {
          return [
          <NButton
            type="primary"
            size="tiny"
            style="margin-right: 5px;"
            onClick={() => {
              props.value.push(row)
              emit('update:value', props.value)
            }}
          >{{
            default: () => '选择'
          }}</NButton>
        ]
        }
        
      }
      }
    }
  ]
}, new RequestPaging(
    props.requestUrl,
    props.requestMethod,
  )
)

const searchField = ref('')

const search = () => {

}

const refresh = () => {
  reset({
    ...props.requestParam
  })
}

const send = () => {

}

const show = () => {
  visible.value = true
  nextTick().then(() => {
    refresh()
  })
}

defineExpose({
  show,
  send
})

</script>

<style lang='less'>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>