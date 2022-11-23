<template>
  <n-space vertical :size="12">
    <div class="questionHeader">
      <n-input placeholder="搜索" style="textInput" v-model:value="pattern" />
    </div>
    <n-spin :show="tIsLoading">
      <n-tree :data="treeData" children-field='children' label-field='orgName' key-field='id'
        :render-prefix="renderPrefix" block-line :pattern="pattern" virtual-scroll class="treeH"
        :node-props="nodeProps" />
    </n-spin>
  </n-space>
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
  NSelect,
  NSwitch,
  NSpace,
  NTree
} from 'naive-ui'

import { NwIcon } from '@platform/main'

import { queryApp, rightList } from '../../api/index'


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
    NSpace,
    NTree
  },
  props: {
    rootName: {
      type: String,
      default: ''
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },

  },
  emits: ["callback"],
  setup(props, context) {
    const treeData = ref([])
    const tIsLoading = ref(false)
    const pattern = ref('')
    const renderPrefix = ({ option }) => {
      return h(
        <div>
          <NwIcon name={option.appType == 2 ? option.appIcon : 'icon-n-y-fenjifenlei'} size={15} />

        </div>
      )
    }
    const getTreeList = () => {
      tIsLoading.value = true
      rightList({ isDefault: 0, status: 1, }).then((res) => {
        treeData.value = res
        tIsLoading.value = false
      })
    }
    onMounted(() => {
      getTreeList()
      // ttIsLoading.value = true
      // queryApp({}).then((r) => {
      //   if (props.rootName) {
      //     r.appName = props.rootName
      //   }

      //   treeData.value = [r]
      //   ttIsLoading.value = false
      // })
    })
    return {
      props,
      renderPrefix,
      getTreeList,
      pattern,
      tIsLoading,
      treeData,
      nodeProps: ({ option }) => {
        return {
          onClick() {
            context.emit('callback', option)
          },
          onContextmenu(e) {
            optionsRef.value = [option];
            showDropdownRef.value = true;
            xRef.value = e.clientX;
            yRef.value = e.clientY;
            console.log(e.clientX, e.clientY);
            e.preventDefault();
          }
        };
      }

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