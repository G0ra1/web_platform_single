<template>
  <n-config-provider :theme-overrides="treeTheme">
    <vxe-grid
      class="tree-grid"
      ref="treeRouteRef"
      v-bind="treeRouteOption"
    />
    <vxe-grid
      class="tree-grid"
      ref="treePagesRef"
      v-bind="treePagesOption"
    />
    <vxe-grid
      class="tree-grid"
      ref="treeDataSourceRef"
      v-bind="treeDataSourceOption"
    />
    <manage-dialog ref="manageDialog" />
  </n-config-provider>
</template>
<script lang="jsx">
  import { h, reactive, ref, watch, nextTick } from 'vue'
  import { NTree, NButton, NConfigProvider } from 'naive-ui'
  import NwIcon from '/@/components/nw-icon/index.vue'
  import {
    website,
    openingPages,
    openPage,
    openPageByKey,
    saveToWebSite,
    modalVisible, // 模态框状态
    getPageByKey,
    addEditorEventListener
  } from '../store'
  import ManageDialog from './dialog/index.vue'

  export default {
    props: {
      // 路由
      routes: {
        type: Array,
        default: () => []
      },
      // 页面
      pages: {
        type: Array,
        default: () => []
      },
    },
    components: {
      NTree,
      NButton,
      NwIcon,
      NConfigProvider,
      ManageDialog
    },
    setup () {
      // watch(website, () => {
      //   console.log('======website====', website);
      // })
      // 默认打开框架页和首页
      // nextTick().then(() => {
      //   openPageByKey('layout')
      // })
      const manageDialog = ref(null)
      const treeRouteRef = ref(null)
      const treeRouteOption = reactive({
        rowId: 'key',
        rowKey: true,
        size: 'mini',
        highlightHoverRow: true,
        showHeader: false,
        border: 'none',
        treeConfig: {
          children: 'children',
          indent: 15,
          accordion: false,
          line: true,
          expandAll: true,
          // iconOpen: 'vxe-icon--plus',
          // iconClose: 'fa fa-plus-square-o'
        },
        columns: [
          {
            field: 'label',
            width: 130,
            treeNode: true
          },
          {
            field: 'contral',
            width: 30,
            // fixed: 'right',
            slots: {
              default: ({ row }) => {
                // if (row.key !== 'router') {
                // return <NButton
                //   title="新建路由"
                //   text
                // >
                //   {{
                //     default: () => <NwIcon
                //       name="icon-add-bold"
                //     />
                //   }}
                // </NButton>
                // }
              }
            }
          },
        ],
        data: [
          {
            label: '路由',
            key: 'router',
            children: website.routes
          },
          // {
          //   label: '数据源',
          //   key: 'datasource',
          //   children: website.dataSource
          // }
        ]
      })
      // 页面列表
      const treePagesRef = ref(null)
      const treePagesOption = reactive({
        rowId: 'key',
        rowKey: true,
        size: 'mini',
        highlightHoverRow: true,
        showHeader: false,
        border: 'none',
        treeConfig: {
          children: 'children',
          indent: 15,
          accordion: false,
          line: true,
          expandAll: true,
          // iconOpen: 'vxe-icon--plus',
          // iconClose: 'fa fa-plus-square-o'
        },
        columns: [
          {
            field: 'label',
            width: 130,
            treeNode: true,
            slots: {
              default: ({ row }) => {
                if (row.key === 'pages') return [<NwIcon name='icon-code' size={14} style="margin: 0 4px;" />, row.label]
                return [
                  <NButton
                    size='tiny'
                    text
                    onClick={() => {
                      // 点击这里开始编辑
                      openPage(row)
                    }}
                  >
                  {{
                    default: () => [<NwIcon name={`icon-${row.type}`} size={14} style="margin: 0 4px;" />, row.label]
                  }}
                  </NButton>
                ]
              }
            }
          },
          {
            field: 'contral',
            width: 30,
            // fixed: 'right',
            slots: {
              default: ({ row }) => {
                if (row.key === 'pages') {
                return <NButton
                  title="新建页面"
                  text
                  onClick={() => {
                    modalVisible.createPage = true
                  }}
                >
                  {{
                    default: () => <NwIcon
                      name="icon-chuanjianyemian"
                      size={18}
                    />
                  }}
                </NButton>
                }
              }
            }
          },
        ],
        data: [
          {
            label: '页面',
            key: 'pages',
            type: 'root',
            children: website.pages
          }
        ]
      })
      const treeDataSourceRef = ref(null)
      const treeDataSourceOption = reactive({
        rowId: 'key',
        rowKey: true,
        size: 'mini',
        highlightHoverRow: true,
        showHeader: false,
        border: 'none',
        treeConfig: {
          children: 'children',
          indent: 15,
          accordion: false,
          line: true,
          expandAll: true,
          // iconOpen: 'vxe-icon--plus',
          // iconClose: 'fa fa-plus-square-o'
        },
        columns: [
          {
            field: 'label',
            width: 130,
            treeNode: true
          },
          {
            field: 'contral',
            width: 30,
            // fixed: 'right',
            slots: {
              default: ({ row }) => {
                if (row.key === 'dataSource') {
                // return <NButton
                //   title="新建数据源"
                //   text
                // >
                //   {{
                //     default: () => <NwIcon
                //       name="icon-add-bold"
                //     />
                //   }}
                // </NButton>
                }
              }
            }
          },
        ],
        data: [
          {
            label: '数据源',
            key: 'dataSource',
            children: website.dataSource
          }
        ]
      })
      addEditorEventListener('INIT_EDIT', () => {
        treeRouteRef.value.setAllTreeExpand(true)
        treePagesRef.value.setAllTreeExpand(true)
      })
      return {
        treeRouteRef,
        treePagesRef,
        treeDataSourceRef,
        manageDialog,
        treeTheme: {
          Button: {
            textColorText: '#ccc'
          }
        },
        treeRouteOption,
        treePagesOption,
        treeDataSourceOption,
        treeDataRoutes: [
          {
            label: '路由',
            key: 'router',
            children: website.routes
          }
        ],
        treeDataPages: [
          {
            label: '页面',
            key: 'pages',
            children: website.pages
          }
        ],
        treeDataSource: [
          {
            label: '数据源',
            key: 'datasource',
            children: website.dataSource
          }
        ],
        renderPageSuffix (p) {
          if (p.option.key === 'pages') {
            return <NButton
              text
            >
              {{
                default: () => <NwIcon
                  name="icon-add-bold"
                />
              }}
            </NButton> 
          }
        }
      }
    }
  }
</script>
<style lang='less'>
.pages-tree {
  width: 100%;
  .n-tree-node-content {
    padding: 0 5px 0 0;
  }
}
.tree-grid {
  border-bottom: 1px solid #333;
  .vxe-table--render-default .vxe-tree--line {
    bottom: -1.1em; // 连接线 高度
    border-color: rgb(121, 121, 121);
  }
  .vxe-table--render-default {
    color: #ccc;
  }
  .vxe-table--render-default .vxe-table--body-wrapper, .vxe-table--render-default .vxe-table--footer-wrapper {
    background-color: unset;
  }
  .vxe-icon--caret-bottom:before, .vxe-icon--caret-left:before, .vxe-icon--caret-right:before, .vxe-icon--caret-top:before{
    border-width: .4em;
  }
  .vxe-icon--caret-right:before {
    bottom: .1em;
  }
  // 重写高亮
  .vxe-table--render-default .vxe-body--row.row--hover, .vxe-table--render-default .vxe-body--row.row--hover.row--stripe {
    background-color: #383838;
  }
  // 行高
  .vxe-table--render-default.size--mini .vxe-body--column:not(.col--ellipsis), .vxe-table--render-default.size--mini .vxe-footer--column:not(.col--ellipsis), .vxe-table--render-default.size--mini .vxe-header--column:not(.col--ellipsis) {
    padding: 2px 0;
  }
  .vxe-table--body {
    width: 100% !important;
  }
}
// html,
// body {
//   margin:0;
//   padding: 0;
//   height: 100%;
// }
// #app {
//   position:relative;
//   width: 100%;
//   height: 100%;
// }
</style>