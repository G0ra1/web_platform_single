<template>
  <div class="wrapper" style="height: 400px">
    <div class="content">
      <template v-if="Mode === 'list'">
        <div class="content-table">
          <vxe-grid
            v-bind="Bind"
            ref="GridRef"
          >
          <!-- <template #bottom>
            <n-button style="width: 100%;" @click="add()" >
              <template #icon>
                <nw-icon name="icon-n-y-add" />
              </template>
              添加参数
            </n-button>
          </template> -->
          </vxe-grid>
        </div>
        <div class="content-bottom">
          <n-button style="width: 100%;" @click="add()" >
            <template #icon>
              <nw-icon name="icon-n-y-add" />
            </template>
            添加参数
          </n-button>
        </div>
      </template>
      <template v-if="Mode === 'editor'">
        <NwCodeMirror
          :disabled="false"
          :value="Json"
          @update:value="updateValue"
        />
      </template>
    </div>
    
    <div class="menus">
      <div :class="{
        'menu': true,
        'active': Mode === 'list'
      }"
      @click="Mode = 'list'">
        参数列表
      </div>
      <div :class="{
        'menu': true,
        'active': Mode === 'editor'
      }"
      @click="Mode = 'editor';transform()">
        JSON
      </div>
    </div>
  </div>
</template>

<script lang="tsx" >
import { ref, toRefs, reactive, defineComponent, nextTick, watch, h } from 'vue'
import type { ComponentPublicInstance, Ref, ReactiveEffect } from 'vue'
import type { VxeGridProps, VxeGridInstance } from 'vxe-table'
import { NwCodeMirror } from '@platform/main'
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NButton,
  NSpace,
  NTag,
  NInput,
  NSelect,
  NInputGroup,
  NDrawer,
  NDrawerContent,

} from 'naive-ui'
import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

import { SchemaEditor } from './store'

function getKey () {
  return new Date().getTime().toString(36)
}
export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NwIcon,
    NTag,
    NInput,
    NSelect,
    NInputGroup,
    NDrawer,
    NDrawerContent,
    NwCodeMirror
  },
  setup (props, context) {
    // const defJson = ref(props.value)
    const {
      value
    } = toRefs<{ value: string}>(props)
    console.log('=====value====', value)
    const {
      Bind,
      Mode,
      List,
      Json,
      GridRef,
      add,
      addChild,
      delById,
      refresh,
      transform
    } = new SchemaEditor({
      rowId: 'id',
      size: 'mini',
      resizable: true,
      align: null,
      pagerConfig: { enabled: false },
      border: true,
      height: '100%',
      keepSource: true,
      editConfig: {
        trigger: 'click',
        mode: 'cell',
        showStatus: true,
        autoClear: false
      },
      treeConfig: {
        // children: 'children',
        // expandAll: true, // 是否展开所有
        // children: 'kids',
        // line: true,
        // -----------
        indent: 15
      },
      columns: [
        {
          field: 'description',
          title: '参数名称',
          showHeaderOverflow: true,
          treeNode:true,
          editRender: {},
          slots: {
            edit: ({ row }: { row: any }) => {
              return [
                <NInput
                  size="small"
                  placeholder="输入参数名称"
                  value={row.description}
                  onUpdateValue={d => row.description = d}
                />
              ]
            },
            default: ({ row }: { row: any }) => {
              return [<div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
              <span>{row.description || '-'}</span>
              {row.itemType === 'object'? <NButton
                text={true}
                size="tiny"
                type="success"
                onClick={(e) => {
                  e.stopPropagation()
                  addChild(row)
                }}
              >{{
                default: () => [
                  <NwIcon name="icon-n-y-add" />
                ]
              }}</NButton> : ''}
              </div>]
              // return [
              //   row.description,
              //   <NButton
              //     text={true}
              //     size="tiny"
              //     type="success"
              //     onClick={(e) => {
              //       e.stopPropagation()
              //     }}
              //   >{{
              //     default: () => [
              //       <NwIcon name="icon-n-y-add" />
              //     ]
              //   }}</NButton>,
              // ]
            }
          }
        },
        {
          field: 'fieldName',
          title: '参数编码',
          showHeaderOverflow: true,
          editRender: {},
          slots: {
            edit: ({ row }: { row: any }) => {
              return [
                <NInput
                  size="small"
                  placeholder="输入参数编码"
                  value={row.fieldName}
                  onUpdateValue={d => row.fieldName = d}
                />
              ]
            }
          }
        },
        {
          title: '数据类型',
          showHeaderOverflow: true,
          width: '200px',
          editRender: {},
          slots: {
            default: ({ row }: { row: any }) => {
              if (row.type === 'array[]') {
                return [`array[${row.itemType}]`]
              } else if (row.type === 'array[[]]') {
                return [`array[[${row.itemType}]]`]
              } else {
                return row.type
              }
            },
            edit: ({ row }: { row: any }) => {
              const isArray = ['array[]', 'array[[]]'].includes(row.type)
              return [
                <div
                  style={{
                    display: 'flex'
                  }}
                  onMousedown={(e) => {
                    e.stopPropagation()
                  }}
                >
                <NSelect
                  size="small"
                  style={{
                    width: isArray ? '50%' : '100%',
                    marginRight: isArray ? '5px' : '0px',
                  }}
                  options={[
                    {
                      label: 'string',
                      value: 'string'
                    },{
                      label: 'integer',
                      value: 'integer'
                    },{
                      label: 'array[]',
                      value: 'array[]'
                    },{
                      label: 'array[[]]',
                      value: 'array[[]]'
                    },{
                      label: 'object',
                      value: 'object'
                    },
                  ]}
                  value={row.type}
                  onUpdateValue={(d) => {
                    row.type = d
                    if (d === 'object') {
                      row.children = []
                    } else if (['array[]', 'array[[]]'].includes(row.type)) {
                      row.children = []
                      row.itemType = 'object'
                    } else {
                      delete row.children
                      row.itemType = ''
                    }
                  }}
                />
                {isArray ? <NSelect
                  size="small"
                  style={{
                    width: '50%'
                  }}
                  options={[
                    {
                      label: 'string',
                      value: 'string'
                    },{
                      label: 'integer',
                      value: 'integer'
                    },{
                      label: 'object',
                      value: 'object'
                    },
                  ]}
                  value={row.itemType}
                  onUpdateValue={(d) => {
                    row.itemType = d
                    if (d === 'object') {
                      row.children = []
                    } else {
                      delete row.children
                    }
                  }}
                /> : ''}
                </div>
              ]
            }
          }
        },
        // {
        //   field: 'schema',
        //   title: 'Schema',
        //   showHeaderOverflow: true,
        // },
        {
          title: '',
          width: '40px',
          slots: {
            default: () => {
              return [
                // <NButton
                //   text={true}
                //   size="tiny"
                //   type="success"
                //   onClick={() => {
                //   }}
                // >{{
                //   default: () => [
                //     <NwIcon name="icon-n-y-add" />
                //   ]
                // }}</NButton>,
                <NButton
                  text={true}
                  size="tiny"
                  type="error"
                  onClick={() => {
                    // console.log('=----',p,c)
                    // del(p.row)
                  }}
                >{{
                  default: () => [
                    <NwIcon name="icon-n-y-close" />
                  ]
                }}</NButton>
              ];
              // return [
              //   <NwIcon name="icon-n-y-close" />
              // ];
            },
          }
        }
      ]
    }, value)

    const mode = ref<'list' | 'editor'>('list')
    const data = ref<object[]>([])

    // const {
    //   bind,
    //   gridRef
    // } = new VxeHelper.VxeGrid<object>
    const gridRef = ref<VxeGridInstance>()
    // const bind = reactive<VxeGridProps<object>>()

    // console.log('==bing=',bind)
    // nextTick().then(() => {

    // })
    // const add = () => {
    //   data.value.push({
    //     id: getKey(),
    //     description: '',
    //     type: 'string'
    //   })
    //   gridRef.value?.reloadData(data.value)
    //   gridRef.value?.setAllTreeExpand(true)
    // }
    // const del = (row: any) => {
    //   console.log('=========', row)
    //   // gridRef.value?.remove(row)
    //   // data.value.splice(index, 1)
    //   // gridRef.value?.reloadData(data.value)
    // }
    // const delById = (id: string) => {
    //   // console.log('=========', row)
    //   // gridRef.value?.remove(row)
    //   // data.value.splice(index, 1)
    //   // gridRef.value?.reloadData(data.value)
    // }
    // const addChild = (row: any) => {
    //   row.children.push({
    //     id: getKey(),
    //     description: '',
    //     type: 'string'
    //   })
    //   gridRef.value?.reloadData(data.value)
    //   // gridRef.value?.setTreeExpand(row, true)
    //   gridRef.value?.setAllTreeExpand(true)
      
    //   console.log('====data.value====', data.value)
    // }
    console.log('=====transform====', transform)
    console.log('=====Json====', Json)
    // watch(Json, () => {
    //   console.log('=====Json====', Json)
    //   context.emit('update:value', Json.value)
    // })
    return {
      props,
      value,
      Bind,
      Mode,
      List,
      Json,
      GridRef,
      add,
      addChild,
      delById,
      refresh,
      transform,
      updateValue (v: string) {
        console.log('=====Json====', v)
        context.emit('update:value', v)
      }
    }
  }
})

</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  >.content {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    background: #fff;
    >.content-table {
      flex: 1;
      // height: calc(~'100% - 30px')
    }
    >.content-bottom {
      height: 30px;
    }
  }
  >.menus {
    display: flex;
    margin-left: 2.5px;
    >.menu {
      border: 1px solid #ccc;
      padding: 2px 5px;
      margin: -1px 2.5px 0 2.5px;
      background: #ececec;
      cursor: pointer;
      &.active {
        border-top: 1px solid #fff;
        background: #fff;
      }
    }
  }
}
</style>
