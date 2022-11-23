<template>
  <vxe-grid
    class="nw-vxe-grid"
    ref="gridRef"
    v-bind="gridOption"
    style="
        border: 1px solid #ccc;
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
    "
  />
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed } from 'vue'
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
import { NwIcon } from '@platform/main'

import {
  
  getExtensionRootEl,
  createElement
} from '../../../util/index'

import {
  actionElBusinessObject
} from "../../../store/bpmn"

import {
  newHumanExps
} from '../../../store/cache-human'
import {
  Grid as VxeGrid
} from 'vxe-table'
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
    NwIcon
  },
  props:{
  },
  setup(props){
    // 表格dom
    const gridRef = ref(null)
    const gridParamsRef = ref(null)
    const gridData = computed(() => {
      const data = {}
      // 这里进行分组
      newHumanExps.value.forEach(d => {
        if (!data[d.bizType]) data[d.bizType] = []
        data[d.bizType].push(d)
      })
      return Object.entries(data).map(([key, value]) => ({ key, value}))
    })
    // props
    // props.element.element.businessObject.extensionElements.values.find(d => d.$type === 'netwisd:Forms')
    const defGridOption = {
      rowId: 'id',
      rowKey: false,
      // height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: false
    }
    // 回显表
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: false,
      // 
      tableMenu: {
         
      },
      data: gridData,
      expandConfig: {
        // labelField
        expandAll: true,
        reserve: true
      },
      columns: [
        {
            title: '人员规则',
            showOverflow: 'title',
            minWidth: 200,
            type: 'expand',
            slots: {
              default: ({row}) => {
                console.log('===row===', row)
                return  `${row.key}(${row.value.length})`
              },
              content: ({row}) => {
                console.log('===content===', row.value)
                return <VxeGrid
                  class="nw-vxe-grid"
                  {...{
                    ...defGridOption,
                    data: row.value,
                    columns: [{
                      title: '表达式',
                      field: 'expreExpression'
                    }]
                  }}
                  style="
                      border: 1px solid #ccc;
                      moz-user-select: -moz-none;
                      -moz-user-select: none;
                      -o-user-select:none;
                      -khtml-user-select:none;
                      -webkit-user-select:none;
                      -ms-user-select:none;
                      user-select:none;
                  "
                  />
              }
            }
        },
        {
          title: '操作',
          width: 50,
          fixed: 'right',
          slots: {
            default: ({row}) => {
                // 根据不同类型展示
              return [
                <NButton
                  text
                  type="info"
                  onClick={() => {
                    // 加入到右侧回显
                  }}
                >
                  {{
                    default: () => '使用'
                    
                  }}
                </NButton>
              ]
            }
          }
        }
      ]
    })

    const resize = () => {
      gridRef.value.refreshColumn()
    }
    return {
      gridRef,
      gridOption,
      resize
    }
  }
}
</script>

<style lang='less'>
@import "../../../style/vxe-table.less";
</style>