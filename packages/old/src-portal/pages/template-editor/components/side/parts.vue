<template>
  <n-config-provider abstract :theme-overrides="treeTheme">
    <vxe-grid
      class="tree-grid"
      ref="codesRef"
      v-bind="codesOption"
      style="
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
      "
    />
  </n-config-provider>
</template>
<script lang="jsx">
  import { h, reactive, ref, nextTick } from 'vue'
  import {
    NTree,
    NButton,
    NConfigProvider,
    NCollapse,
    NCollapseItem,
    NGrid,
    NGi,
    useMessage
  } from 'naive-ui'
  import NwIcon from '/@/components/nw-icon/index.vue'
  import NwTile from '/@/components/nw-tile/index.vue'
  import { toClipboard } from '/@/utils'
  import { xmlParse, xmlStringify } from '../../store/utils'

  import {
    viewActive,
    website,
    openingPages,
    openPage,
    saveToWebSite,

    addEditorEventListener,
    containerCodes,
    basicCodes,
    partCodes,
    staticPartCodes,
    presetPartCodes
  } from '../../store'
  import PartDrag from './part-drag.vue'

  export default {
    props: {
    },
    components: {
      NTree,
      NButton,
      NwIcon,
      NConfigProvider,
      NCollapse,
      NCollapseItem,
      NwTile,
      NGrid,
      NGi,
      PartDrag
    },
    setup () {
      const message = useMessage()
      const codesRef = ref(null)
      addEditorEventListener('INIT_PARTS', () => {
        codesRef.value.setAllTreeExpand(true)
      })
      const directives = [
        {
          name: 'drag',
          value: {},
          modifiers: { fullscreen: true }
        }
      ]
      const codesOption = reactive({
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
                return [
                  <NwIcon
                    name={row.icon ? `icon-${row.icon}` : `icon-component-${row.key}`}
                    size={14}
                    style="margin: 0 4px"
                    color={row.color || '#5faeff'}
                  />
                  ,
                  row.label
                ]
              }
            }
          },
          {
            field: 'contral',
            width: 25,
            // fixed: 'right',
            slots: {
              default: ({ row }) => {
                if (!row.children) {
                  
                  if (viewActive.value === 'code') {
                    return <NButton
                      title="复制组件"
                      text
                      on-click={() => {
                        toClipboard(row.code, () => {
                          message.success('组件代码已复制到粘贴板')
                        })
                        // codesRef.value.setAllTreeExpand(true)
                      }}
                    >
                      {{
                        default: () => <NwIcon
                          name="icon-copy"
                          color="#ccc"
                          size={16}
                        />
                      }}
                    </NButton>
                  } else if (viewActive.value === 'design') {
                    return <PartDrag
                      value={ xmlParse(row.code) }
                    />
                    // return <NButton
                    //   title="抓取组件"
                    //   text
                    //   on-click={() => {
                    //     // 这里发生拖拽
                    //     const mod = xmlParse(row.code)
                    //     const xml = xmlStringify(mod)
                    //     const mod2 = xmlParse(xml)
                    //     console.log('======抓取组件======', row, mod, xml, mod2)
                        
                    //     // codesRef.value.setAllTreeExpand(true)
                        
                    //   }}
                    //   vDrag={{}}
                    // >
                    //   {{
                    //     default: () => <NwIcon
                    //       name="icon-shiqu"
                    //       color="#ccc"
                    //       size={16}
                    //     />
                    //   }}
                    // </NButton>
                  }
                } else {
                  return ''
                }
              }
            }
          }
        ],
        // #ffeb3b 黄 #79cb50
        data: [
          {
            label: '容器',
            key: 'containerCodes',
            children: containerCodes
          },
          {
            label: '基础组件',
            key: 'basicCodes',
            children: basicCodes
          },
          {
            label: '基础栏目',
            key: 'partCodes',
            children: partCodes
          },
          {
            label: '固定栏目',
            key: 'staticPartCodes',
            icon: 'component-partCodes',
            color: '#ffeb3b',
            children: staticPartCodes
          },
          {
            label: '预设栏目',
            key: 'presetPartCodes',
            color: '#79cb50',
            children: presetPartCodes
          },
          // {
          //   label: '数据源',
          //   key: 'datasource',
          //   children: website.dataSource
          // }
        ]
      })
      console.log('======containerCodes=======', [
          {
            label: '容器',
            key: 'containerCodes',
            children: containerCodes
          },
          {
            label: '基础组件',
            key: 'basicCodes',
            children: basicCodes
          },
          {
            label: '基础栏目',
            key: 'partCodes',
            children: partCodes
          },
          {
            label: '固定栏目',
            key: 'staticPartCodes',
            icon: 'component-partCodes',
            color: '#ffeb3b',
            children: staticPartCodes
          },
          {
            label: '预设栏目',
            key: 'presetPartCodes',
            color: '#79cb50',
            children: presetPartCodes
          },
          // {
          //   label: '数据源',
          //   key: 'datasource',
          //   children: website.dataSource
          // }
        ])
      // 这里根据门户获取栏目
      return {
        treeTheme: {
          Button: {
            textColorText: '#ccc'
          },
          Collapse: {
            titleTextColor: '#ccc',
            arrowColor: '#ccc',
            dividerColor: '#333333',
            titleFontSize: '12px'
          }
        },
        codesRef,
        codesOption,
        handleTile () {
          toClipboard('--这是复制的代码--', () => {
            message.success('组件代码已复制到粘贴板')
          })
        },
        handleTileView () {
          alert(234)
        }
      }
    }
  }
</script>
<style lang='less'>
.parts-container {
  width: 100%;
  &.n-collapse {
    
    >.n-collapse-item:first-child {
      margin: 0;
    }
    >.n-collapse-item {
      margin: 5px 0 0 0;
      >.n-collapse-item__header {
        padding: 5px 0 0 0;
      }
      >.n-collapse-item__content-wrapper >.n-collapse-item__content-inner {
        padding-top: 0;
      }
    } 
  }
  &-items {
    .parts-tile {
      cursor: pointer;
      .nw-tile-label {
        font-size: 12px;
        color: #ccc;
      }
    }
  } 
}

</style>