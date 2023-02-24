<template>
  <n-button  v-bind="props.buttonOptions" type="primary" :class="props.isShowIcon ? 'pickAnyC' :''" :style="props.isShowIcon ? '' : 'height:36px;opacity:0.8;font-weight: 400;'" @click="show" >
    {{props.buttonLabel}}  
    <!-- <nw-icon v-if="props.isShowIcon" style="margin-left:5px;color:rgba(42, 130, 228, 0.94)" name="icon-n-n-add"  :size="24" /> -->
  </n-button>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    :style="{
      width: typeof props.width === 'number' ? `${props.width}px` : props.width,
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
          <slot name="search" :searchData="searchFormData" >
          </slot>
          <!-- <n-input-group>
            <n-input v-model:value="searchField"
              placeholder="输入查询文本" :style="{ width: '200px' }" />

          </n-input-group> -->
          <template v-if="slots.search">
            <n-button type="primary" @click="refresh()">
              <template #icon>
                <nw-icon name="icon-n-y-search" />
              </template>
            </n-button>
            <n-button title="重置" type="warning" @click="resetSearch()">
              <template #icon>
                <nw-icon name="icon-n-y-refresh" />
              </template>
            </n-button>
          </template>
          <slot name="action" :searchData="searchFormData" >
          </slot>
        </n-space>
      </n-layout-header>
      <n-layout-content :style="{
        height: typeof props.height === 'number' ? `${props.height}px` : props.height
        }">
        <vxe-grid v-bind="bind" ref="gridRef">
        </vxe-grid>
      </n-layout-content>
    </n-layout>
    
    <template #action>
        
      <div style="padding: 5px;">
        <n-button
        v-if="props.mode === 'slow'"
        type="info"
        size="small"
        style="margin-right: 5px"
        @click="slowUpdate"
        >
        确定
        </n-button>
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
import { h, ref, reactive, defineComponent, watch, nextTick, useSlots } from 'vue'
import { NwIcon, RequestPaging, VxeHelper, request, NwAppTreeGrid, Page } from '@platform/main'
import { cloneDeep } from 'lodash';
const slots = useSlots()
console.log('======slots=====', slots)
const props = withDefaults(defineProps<{
  rowKey?: string,
  value?: Array<any> | any,
  buttonLabel?: string,
  isShowIcon?: boolean,
  buttonOptions?: object,
  modalTitle?: string,
  gridColumns?: Array<any>,
  requestUrl: string,
  requestMethod?: 'post' | 'get',
  requestParam: object, // 前置过滤参数
  isSingle?: boolean,
  width?: number | string,
  height?: number | string,
  mode?: 'rush' | 'slow' // 选取模式，快速选取，每次选取时都触发update
}>(), {
  rowKey: 'id',
  value: () => [],
  buttonLabel: '选择',
  buttonOptions: () => ({
   
    type: 'primary',
    
  }),
  modalTitle: '选择',
  gridColumns: () => ([]),
  requestUrl: '',
  requestMethod: 'post',
  selectType: 'single',
  requestParam: () => ({}),
  isSingle: false,
  isShowIcon:true,
  width: '80vw',
  height: '60vh',
  mode: 'rush'
})

const emit = defineEmits(['update:value'])
const visible = ref<boolean>(false)
// 选取缓存
const cacheSelected = ref<Array<any>>([])
// 查询条件
const searchFormData = ref<any>({})

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
        // mode 'rush'
        if (props.isSingle) {
          if (props.value === row[props.rowKey]) {
            // 这里进行回显
            return [
              <NButton
                type="success"
                size="tiny"
                style="margin-right: 5px;"
              >{{
                default: () => '已选择'
              }}</NButton>
            ]
          }
          // 这里进行回显
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

        // mode rush cacheSelected


        const index = (props.mode === 'slow' ? cacheSelected.value : props.value).findIndex((d: any) => {
          return d[props.rowKey] === row[props.rowKey]
        })
        if (index >= 0) {
          return [
          <NButton
            type="success"
            size="tiny"
            style="margin-right: 5px;"
            onClick={() => {
              if (props.mode === 'slow') {
                cacheSelected.value.splice(index, 1)
              } else {
                props.value.splice(index, 1)
                emit('update:value', props.value)
              }
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
              if (props.mode === 'slow') {
                cacheSelected.value.push(row)
              } else {
                props.value.push(row)
                emit('update:value', props.value)
              }
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

const slowUpdate = () => {
  emit('update:value', cacheSelected.value);
  console.log(cacheSelected.value)
  visible.value = false
}

const refresh = () => {
  reset({
    ...props.requestParam,
    ...searchFormData.value
  })
}
const resetSearch = () => {
  searchFormData.value = {}
  reset({
    ...props.requestParam
  })
}
const send = () => {

}

const show = () => {
  visible.value = true
  // 赋值缓存
  if (props.mode === 'slow') {
    cacheSelected.value = cloneDeep(props.value)
  }
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