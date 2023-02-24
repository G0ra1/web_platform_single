<template>
  <n-button v-bind="props.buttonOptions" @click="show">
    {{ props.buttonLabel }}
  </n-button>
  <n-modal v-model:show="visible" preset="dialog" :style="{
    width: `${props.width}px`,
    padding: 0
  }" :show-icon="true" :mask-closable="true" :closable="true">
    <template #icon>
      <nw-icon name="icon-biaodan" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        {{ props.modalTitle }}
      </div>
    </template>
    <n-layout>
      <n-layout-header>
        <n-space :size="5" style="padding: 5px">
          <n-input-group>
            <n-input v-model:value="searchField" placeholder="输入查询文本" :style="{ width: '200px' }" />
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
        <vxe-grid :columns="gridOptions.columns" :data="props.data" ref="gridRef">
        </vxe-grid>
      </n-layout-content>
    </n-layout>

    <template #action>

      <div style="padding: 5px;">
        <n-button v-if="props.mode === 'slow'" type="info" size="small" style="margin-right: 5px" @click="slowUpdate">
          确定
        </n-button>
        <n-button size="small" @click="visible = false">关闭</n-button>
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
import { h, ref, reactive, defineComponent, watch, nextTick } from 'vue'
import { NwIcon, RequestPaging, VxeHelper, request, NwAppTreeGrid, Page } from '@platform/main'
import { cloneDeep } from 'lodash';
import { o } from '../../model.d';
const props = withDefaults(defineProps<{
  rowKey?: string,
  value?: Array<any> | any,
  buttonLabel?: string,
  buttonOptions?: object,
  modalTitle?: string,
  gridColumns?: Array<any>,
  requestUrl: string,
  requestMethod?: 'post' | 'get',
  requestParam: object, // 前置过滤参数
  isSingle?: boolean,
  width?: number,
  height?: number,
  mode?: 'rush' | 'slow', // 选取模式，快速选取，每次选取时都触发update
  data?: Array<any>
}>(), {
  rowKey: 'id',
  value: () => [],
  buttonLabel: '选择',
  buttonOptions: () => ({
    size: 'small',
    type: 'info'
  }),
  modalTitle: '选择',
  gridColumns: () => ([]),
  requestUrl: '',
  requestMethod: 'post',
  selectType: 'single',
  requestParam: () => ({}),
  isSingle: false,
  width: 800,
  height: 400,
  mode: 'rush',
  data: () => [],
})

const emit = defineEmits(['update:value'])
const visible = ref<boolean>(false)
// 选取缓存
const cacheSelected = ref<Array<any>>([])


const gridOptions = reactive({
  rowId: 'id',
  size: 'mini',
  border: false,
  resizable: true,
  // height: 'auto',
  align: null,
  columns: [
    {
      field: 'fieldName',
      title: '参数名称',
      showHeaderOverflow: true,
      treeNode: true,
    },
    {
      field: 'description',
      title: '参数说明',
      showHeaderOverflow: true,
    },
    {
      title: '请求类型',
      showHeaderOverflow: true,
      width: '100px',
      slots: {
        default: (d: any) => {

          return [
            <div>
              {d.row.requestType}
            </div>
          ]
        },
      }
    },
    {
      title: '是否必须',
      showHeaderOverflow: true,
      width: '100px',
      slots: {
        default: (d: any) => {
          // isrequire
          return [
            <div>
              {d.row.required ? '是' : '否'}
            </div>
          ]
        },
      }
    },
    {
      field: 'type',
      title: '数据类型',
      width: '100px',
      showHeaderOverflow: true,
    },
    {
      field: 'schema',
      title: 'Schema',
      showHeaderOverflow: true,
    },
    {
      title: '操作',
      showHeaderOverflow: true,
      width: '80px',
      slots: {
        default: ({ row }) => {
          // mode 'rush'
          if (props.isSingle) {
            if (alreadyValue.value === row[props.rowKey]) {
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
  ],
  data: props.data,
  treeConfig: {
    // children: 'kids',
    // hasChild: 'hasKids',
    expandAll: true
  }
})

const searchField = ref('')

const slowUpdate = () => {
  emit('update:value', cacheSelected.value);
  console.log(cacheSelected.value)
  visible.value = false
}

const refresh = () => {
  // reset({
  //   ...props.requestParam
  // })
}

const send = () => {

}
const query = () => {

}
const reset = () => {

}
const alreadyValue = ref<String>("")
const show = (v: any) => {
  visible.value = true
  alreadyValue.value = v
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