<template>
  <!-- <n-tree-select
    :options="treeData"
    children-field="subTrees"
    label-field="appName"
    key-field="appId"

    :value="props.value"
    @update:value="update"
  /> -->
  <div>
    <n-input disabled :value="props.value" style="width: calc(100% - 40px)" />
    <n-button type="primary" @click="show">选择</n-button>
  </div>
  <n-modal
    class="nw-modal"
    v-model:show="visible"
    preset="dialog"
    style="width: 600px; padding: 0"
    :show-icon="true"
    :mask-closable="true"
    :closable="true"
  >
    <template #icon>
      <div class="iconfont icon-bpmn-ditu"></div>
      <nw-icon name="icon-field" :size="20" color="rgb(103, 194, 58)" />
    </template>
    <template #header>
      <div>
        选择应用APP
        <!-- <n-button style="float: right" text class="control-btn" size="small" type="error" @click="onHandleBack">
          <nw-icon name="icon-tuichu1" :size="16" color="red" />
        </n-button> -->
      </div>
    </template>
    <vxe-grid
      class="nw-vxe-grid"
      ref="gridFormRef"
      v-bind="gridOption"
    />
    <div class="nw-modal-action">
      <!-- <n-button
      type="info"
      size="small"
      style="margin-right: 5px"
      @click="handleModalComplete"
      >确定</n-button> -->
      <n-button  size="small"
      @click="visible = false" >取消</n-button>
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

import { queryApp,  } from '../../api/index'


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
  props:{
    value: {
      type: String,
      default: ''
    },
  
  },
  
  emits: ["update:value", "UpdateValue"],
  setup(props, context){
    const visible = ref(false)

    const treeData = ref([])

    
    // 表单列表
    const gridOption = ref({
      rowId: 'appId',
      rowKey: false,
      height: '400px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      
      treeConfig: {
        // children: 'children',
        indent: 15,
        accordion: false, // 是否手风琴
        line: true, // 是否展示线
        expandAll: true, // 是否展开所有
        // expandRowKeys: ['/', '//src'],
        // lazy: true, // 是否懒加载
        children: 'subTrees',
        // hasChild: 'hasChild',
      },
      // 
      tableMenu: {
         
      },
      data: treeData,
      columns: [
        {
          title: '应用分类/名称',
          treeNode: true,
          slots: {
            default: ({ row }) => {
              if (row.appType === 0) {
                return [
                  <NwIcon name='icon-n-n-home' size={20} />,
                  'root'
                ]
              } else if (row.appType === 1) {
                return [`${row.appName}`]
              } else {

                return [
                  <NwIcon name={row.appIcon} size={20} />,
                  `${row.appName}`]

              }
              
            }
          }
        },
        {
          title: '操作',
          width: 54,
          slots: {
            default: ({ row }) => {
              if (row.appType === 2) {
                  
                return [
                  <NButton
                  size="small"
                  type="info"
                  onClick={() => {
                    // processNodeFields 中获取表单配置
                    context.emit('update:value', row.appCode, row)
                    context.emit('UpdateValue', row.appCode, row)
                    
                    visible.value = false
                  }}
                  >
                  {{
                    default: () => {
                      return '选择'
                    }
                  }}
                  </NButton>
                ]
              } else {
                return []
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
      show () {
        visible.value = true
        queryApp({}).then((r)=>{
          treeData.value = [r]
        })
      }
    }
  }
}
</script>

<style lang='less' >

</style>