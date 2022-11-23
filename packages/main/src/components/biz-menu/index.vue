<template>
  <vxe-grid v-bind="gridOption" ref="gridComponent" class="mytable-scrollbar org-tree">
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

import { queryAll } from '../../pages/bizmenu-manage/api/index.ts'


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
  props: {
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
  setup(props, context) {
    // 
    // const multipleSelectCache = ref([])

    const gridRef = ref(null)

    // 是否加载中
    const isLoading = ref(true)

    // 
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      height: '500px',
      showOverflow: false,
      highlightHoverRow: true,
      showHeader: false,
      // showHeader: false,
      border: 'null',
      rowConfig: {
        isCurrent: true,
        height: 43
      },
     
       proxyConfig: {
        seq: false, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
       
        ajax: {
          // 接收 Promise
          query: () => {
            return new Promise((resolve) => {
              queryAll({
               
              }).then((res) => {
                resolve(res)
              });
            });
          },
        },
      },
      columns: [
        {
          field: 'name',
          title: '业务入口名称',
          showHeaderOverflow: true,
          showOverflow: true,
          slots: {
            default: ({ row }) => {

              return [
                <div
                  class={{
                    'side-tree-btn': true,
                  }}
                  title={row.name}
                  onClick={() => {

                    context.emit('callback', row)
                  }}
                ><NwIcon name={row.orgType == 1 ? 'icon-n-y-fenjifenlei' : 'icon-n-y-fenlei'} /><span style='margin-left:5px'>{row.name}</span></div>

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
.org-tree {
  .row--level-1.is--expand-tree {
    background-color: rgba(225, 225, 225, 1);
  }

  .vxe-table--render-default .vxe-body--row.row--hover.row--current {
    background-color: var(--n-red6);

    .side-tree-btn,
    .icon {
      color: #fff
    }
  }

  .vxe-table--render-default .vxe-body--row.row--current {
    background-color: var(--n-red6);

    .side-tree-btn,
    .icon {
      color: #fff
    }
  }

  .side-tree-btn {
    width: 100%;
    cursor: pointer;
    font-size: 14px;
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
      background: rgba(0, 0, 0, 0);
      color: var(--n-red6);
      font-weight: 500;
    }
  }

}
</style>