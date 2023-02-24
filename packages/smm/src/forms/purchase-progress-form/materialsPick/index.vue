<template>
  <n-modal class="nw-modal" v-model:show="visible" preset="dialog" style="width: 600px; padding: 0" :show-icon="true"
    :mask-closable="true" :closable="true">
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-field" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择物资
      </div>
    </template>
    <vxe-grid class="nw-vxe-grid" ref="gridFormRef" v-bind="gridOption" />
    <div class="nw-modal-action" style="text-align: right;">
      <n-button type="info" size="small" style="margin-right: 5px" @click="handleModalComplete">确定</n-button>
      <n-button size="small" @click="visible = false">取消</n-button>
    </div>
  </n-modal>
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h, computed, onMounted } from 'vue'
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
  NTreeSelect,
  NSwitch,
  NSpace,
  NTree
} from 'naive-ui'

import { NwIcon } from '@platform/main'

import { getNewest, } from '../api/index'


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
    NSwitch,
    NTreeSelect,
    NSpace,
    NTree
  },
  props: {
    value: {
      type: String,
      default: ''
    },

  },

  emits: ["update:value", "UpdateValue"],
  setup(props, context) {
    const visible = ref(false)
    const treeData = ref([])
    const selected = ref([])
    const selectedId = ref([])
    const handleModalComplete = () => {
      selected.value = treeData.value.filter(d =>
        selectedId.value.indexOf(d.id) >= 0
      )
      console.log(selected.value, 'selected.value')
      context.emit('callback', selected.value)
      visible.value = false
    }
    // 表单列表
    const gridOption = ref({
      rowId: 'appId',
      rowKey: false,
      height: '400px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: treeData,
      columns: [
        {
          title: '原材料',
          field: 'commodityItemName'
        },
        {
          title: '单位',
          field: 'commodityItemUnit'
        },
        {
          title: '操作',
          width: 80,
          slots: {
            default: ({ row }) => {
              if (selectedId.value.indexOf(row.id) >= 0) {
                return [
                  <NButton
                    size="small"
                    type="primary"
                    onClick={() => {
                      selectedId.value.splice(selectedId.value.indexOf(row.id), 1)
                    }}
                  >
                    {{
                      default: () => {
                        return '已选择'
                      }
                    }}
                  </NButton>
                ]
              } else {
                return [
                  <NButton
                    size="small"
                    type="info"
                    onClick={() => {
                      selectedId.value.push(row.id)
                    }}
                  >
                    {{
                      default: () => {
                        return '选择'
                      }
                    }}
                  </NButton>
                ]
              }

            }
          }
        }
      ]
    })
    return {
      props,
      visible,
      gridOption,
      selected,
      handleModalComplete,
      show(selectedData = []) {
        selected.value = selectedData
        selectedId.value = selectedData.map(d => d.id)
        visible.value = true
        getNewest({}).then((r) => {
          treeData.value = r.detailList.map(d => {
            return {
              ...d,
              productMix3: d.commodityItemName,
              expenditurePattern: d.commodityItemPrice,
            }
          })
        })
      }
    }
  }
}
</script>

<style lang='less' >

</style>