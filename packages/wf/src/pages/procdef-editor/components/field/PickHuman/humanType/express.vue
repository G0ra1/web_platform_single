<template>
  <!-- <n-input-group size="small">
    <n-input size="small" disabled />
    <n-button size="small" type="primary" ghost>
      <nw-icon name="" />
    </n-button>
  </n-input-group> -->

  <d-splitter
    class="nw-layout-content-splitter"
    splitBarSize="1px"
  >
    <template v-slot:DSplitterPane>
      <d-splitter-pane
        class="splitter-bpmn-view"
        size="450px"
        minSize="330px"
        @sizeChange="sizeChange"
        style="padding: 0 5px 5px 5px"
      >
        <vxe-grid
          class="nw-vxe-grid"
          ref="gridExpressRef"
          v-bind="gridExpressOption"
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
      </d-splitter-pane>
      <d-splitter-pane
        class="splitter-bpmn-attrs"
        minSize="200px"
        
        style=""
      >
        <!-- <div v-for="(item, key) in UserExpressionCache" :key="key">x</div> -->
        <vxe-grid
          class="nw-vxe-grid"
          ref="gridCacheExpressRef"
          v-bind="gridCacheExpressOption"
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
      </d-splitter-pane>
    </template>
  </d-splitter>
  
</template>
<script lang="jsx">
import { ref, reactive, nextTick, h } from 'vue'
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
} from '../../../../util/index'

import {
  actionElBusinessObject
} from "../../../../store/bpmn"

// import { detailExpress } from '../../../../api/index'

import theme from './theme'

import {
  UserExpression,
  loadUserExpression,
  UserExpressionCache,
  translateExpreParamVarType,
  getParamComponent
} from '../../../../store/cache-human'

import {
  Grid as VxeGrid
} from 'vxe-table'

import InputComponents from '../components/index.js'

import ValueInput from '../components/ValueInput.vue'
export default {
  emits: ['add'],
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
  setup(props, context){
    // ??????dom
    const gridExpressRef = ref(null)
    const gridCacheExpressRef = ref(null)
    loadUserExpression()
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
    // ?????????
    const gridExpressOption = ref({
      rowId: 'id',
      rowKey: false,
      height: 'auto',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      data: UserExpression,
      columns: [
        {
            title: '???????????????',
            field: 'expreExpression',
            showOverflow: 'title',
            minWidth: 200
        },
        {
            title: '???????????????',
            field: 'expreName',
            minWidth: 150
        },
        // {
        //     title: '????????????',
        //     width: 60,
        //     //field: 'expreReturnType',
        //     slots: {
        //       default: ({row}) => {
        //         return translateExpreReturnType(row.resultType)
        //       }
        //     }
        // },
        {
          title: '??????',
          width: 50,
          fixed: 'right',
          slots: {
            default: ({row}) => {
              return [
                <NButton
                  loading={row.loading}
                  text
                  size="small"
                  type="info"
                  onClick={() => {
                    console.log('=====rowrow=====', row)
                    // ??????humanExp
                    // context.emit('add', )
                    const moddle = createElement('netwisd:HumanExp', {
                      expreName: row.expreName,
                      expreExpression: row.expreExpression,
                      bizType: row.bizType === 'innerExpression' ? 'innerExpression' : 'mdmExpression',
                      isCache: true,
                      values: row.paramterList.map(d => createElement('netwisd:HumanExpParam', {
                          expreParamValue: d.expreParamValue || '',
                          expreParamSource: 'hand_field', // ??????
                          expreParamName: d.expreParamName, // ???????????????
                          expreParamDesc: d.expreParamDesc, // ?????????????????????
                          expreParamVarType: d.expreParamVarType, // ?????????????????????

                        })
                      )
                    })
                    // ?????????????????????
                    UserExpressionCache.value = [ ...UserExpressionCache.value, moddle ]
                    // ????????????
                    gridCacheExpressRef.value.setRowExpand(moddle, true)
                    // nextTick().then(() => {

                    //   // 
                    // })
                  }}
                >
                  {{
                    default: () => '??????'
                    
                  }}
                </NButton>
              ]
            }
          }
        }
      ]
    })
    // ------gridCacheExpressOption------??????????????????-----
    const gridCacheExpressOption = ref({
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
      data: UserExpressionCache,
      expandConfig: {
        // labelField
        expandAll: true,
        reserve: true
      },
      columns: [
        {
            title: '?????????',
            showOverflow: 'title',
            minWidth: 200,
            type: 'expand',
            slots: {
              default: ({row}) => {
                return  `${row.expreExpression}`
              },
              content: ({row}) => {
                console.log('===content===', row)
                const vgr = ref(null)
                // ??????????????????
                nextTick().then(() => {
                  vgr.value.refreshColumn()
                })
                return <VxeGrid
                  ref={r => vgr.value = r}
                  class="nw-vxe-grid"
                  {...{
                    ...defGridOption,
                    data: row.values,
                    columns: [
                      {
                        title: '?????????',
                        field: 'expreParamDesc',
                        width: 120,
                      },{
                        title: '??????',
                        field: 'expreParamVarType',
                        width: 70,
                        slots: {
                          default: ({ row }) => {
                            return translateExpreParamVarType(row.expreParamVarType)
                          }
                        }
                      },
                      {
                        title: '???',
                        slots: {
                          default: ({ row }) => {
                            const IcName = getParamComponent(row.expreParamVarType)
                            // return IcName
                            const Ic = InputComponents[IcName]
                            // return <NInput size="small" value="123" />
                            // ???????????? expreParamVarType ????????????????????????
                            if (row.expreParamDesc === 'METH') {
                              row.expreParamValue = row.expreParamName
                            }
                            if (row.expreParamDesc === 'METH' || row.expreParamName === 'innerUserExp') {
                              return row.expreParamValue
                            } else if (IcName === 'ValueInput') {
                              return <ValueInput
                                value={row.expreParamValue}
                                expreParamSource={row.expreParamSource}
                                expreParamValueText={row.expreParamValueText}
                                onUpdateValue={(e) => {
                                  row.expreParamValue = e
                                }}
                                onUpdateExpreParamSource={(e) => {
                                  row.expreParamSource = e
                                }}
                                onUpdateExpreParamValueText={(e) => {
                                  row.expreParamValueText = e
                                }}
                                onUpdateExpreParamValueId={(e) => {
                                  row.expreParamValueId = e
                                }}
                              />
                            } else {
                              return Ic ? <Ic
                                value={row.expreParamValue}
                                expreParamSource={row.expreParamSource}
                                expreParamValueText={row.expreParamValueText}
                                onUpdateValue={(e) => {
                                  row.expreParamValue = e
                                }}
                                onUpdateExpreParamSource={(e) => {
                                  row.expreParamSource = e
                                }}
                                onUpdateExpreParamValueText={(e) => {
                                  row.expreParamValueText = e
                                }}
                              /> : ''
                              
                            }
                          }
                        }
                      }
                    ]
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
          title: '???????????????',
          field: 'expreName',
          minWidth: 100
        },
        {
          title: '??????',
          width: 50,
          // fixed: 'right',
          slots: {
            default: ({ row, rowIndex }) => {
                // ????????????????????????
              return [
                <NButton
                  text
                  type="error"
                  onClick={() => {
                    // ?????????????????????
                    // UserExpressionCache.value.splice(rowIndex, 1)
                    UserExpressionCache.value = UserExpressionCache.value.filter(d => d !== row)
                    // gridCacheExpressRef.value.reloadData(UserExpressionCache.value)
                  }}
                >
                  {{
                    default: () => '??????'
                    
                  }}
                </NButton>
              ]
            }
          }
        }
      ]
    })

    const resize = () => {
      gridExpressRef.value.refreshColumn()
      gridCacheExpressRef.value.refreshColumn()
    }


    return {
      theme,
      gridExpressRef, // ???????????????
      gridExpressOption,
      gridCacheExpressRef, // ??????????????????
      gridCacheExpressOption,
      resize,
      sizeChange () {
        resize()
      },
      UserExpressionCache
    }
  }
}
</script>

<style lang='less'>
@import "../../../../style/vxe-table.less";
</style>