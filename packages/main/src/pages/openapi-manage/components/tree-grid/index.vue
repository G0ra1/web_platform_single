<template>
  <vxe-grid
    v-bind="gridOption"
    ref="gridComponent"
    class="mytable-scrollbar"
  >
  </vxe-grid>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
import {
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
  NSelect,
  NSwitch
} from 'naive-ui'

import { NwIcon } from '@platform/main'

import { queryAPP, queryCtl } from '../../api/index'

import {
  treeData,
  StaticFilter,
} from '../../store/tree.js'
export default {
  components: {
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
    NSwitch
  },
  props:{
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  emits: ["callback"],
  setup(props, context){
    // 
    // const multipleSelectCache = ref([])

    const gridRef = ref(null)

    const gridData = ref([])
    // 是否加载中
    const isLoading = ref(true)

    // 
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      height: '100%',
      showOverflow: false,
      highlightHoverRow: true,
      // showHeader: false,
      border: true,
      treeConfig: {
        // children: 'children',
        // expandAll: true, // 是否展开所有
        expandRowKeys: ['root'],
        // children: 'kids',
        // -----------

        indent: 15,
        // accordion: false, // 是否手风琴
        line: true, // 是否展示线
        // expandAll: true, // 是否展开所有
        lazy: true, // 是否懒加载
        // children: 'kids',
        // hasChild: 'hasKids',
        loadMethod: ({ row }) => {
          if (row.id === 'root') {
            // 查询根
            return queryAPP().then(r => {
              return r.map(d => ({
                id: d.dictItemCode,
                name: d.dictItemName,
                hasChild: true,
                type: 'sysCode'
              }))
            })
          } else {
            console.log(row)
            return queryCtl(row.id).then(r => {
              return (r || []).map(d => ({
              id: d.ctlClazz,
              name: d.ctlName,
              type: 'ctlName'
            }))})
            // return new Promise((r) => r([]))
          }
          
        }
      },
      tableMenu: {
         
      },
      data: treeData,
      columns: [
        {
          field: 'name',
          title: '类目',
          showHeaderOverflow: true,
          treeNode: true,
          slots: {
            default: ({row}) => {
              let active = false
              if (Object.keys(StaticFilter.value).length === 0 && row.id === 'root') {
                active = true
              } else {
                active = StaticFilter.value[row.type] === row.id
              }
              return [
                <div
                  class={{
                    'side-tree-btn': true,
                    'active': active
                  }}
                  title={row.name}
                  onClick={() => {
                    // StaticFilter
                    if (row.id === 'root') {
                      StaticFilter.value = {}
                    } else if (row.type === 'sysCode') {
                      StaticFilter.value = {
                        sysCode: row.id
                      }
                    } else {
                      StaticFilter.value = {
                        ctlClazz: row.id
                      }
                    }
                    // 
                    context.emit('callback')
                  }}
                >
                {{
                  default: () => row.name
                }}
                </div>
                // <NButton
                //   text
                //   size="small"
                //   type="info"
                //   style="margin-left: 5px;width: 100%;"
                //   onClick={() => {
                //   }}
                // >{{
                //   default: () => row.name
                // }}</NButton>
              ];
            },
          }
        }
      ]
    })
    return {
      props,
      gridRef,
      isLoading,
      gridOption
      
    }
  }
}
</script>

<style lang='less' >
.side-tree-btn {
  width: 100%;
  cursor: pointer;
  border-radius: 4px;
  text-indent: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &.active {
    background: #2196f3;
    color: #fff;
    font-weight: bold;
  }
  &:hover {
    background: #2196f3;
    color: #fff;
    font-weight: bold;
  }
}
</style>