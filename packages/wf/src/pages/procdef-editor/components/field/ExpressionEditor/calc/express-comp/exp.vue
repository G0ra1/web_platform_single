<template>
    <div :class="{
        'exp-exp': true,
        'action': actionExpParamsRef === popover
    }" >
        <n-popover
            ref="popover"
            placement="bottom"
            trigger="manual"
            :on-update:show="onShow"
            raw
            :show-arrow="false"
            :on-clickoutside="() => false"
            :theme-overrides="{
                space: '0px'
            }"
        >
            <template #trigger>
                <div class="popover-text" @click="show(true)">
                    {{ props.value.text }}
                    <!-- <div class="popover-text-action">
                        &nbsp;
                    </div> -->
                </div>
            </template>
            <div class="popover-box" style="width: 500px">
                <div class="popover-box-header">
                    <div class="popover-box-header-text">
                        <div class="popover-box-header-text-t">
                            <!-- {{getExp(props.value, paramList)}} -->
                            <!-- {{expCode}} -->
                            <!-- {{getExp(props.value, paramList)}} -->
                            {{expText}}
                        </div>
                        <!-- <n-badge dot :show="false">
                            <n-button
                                type="success"
                                size="small"
                                @click="save"
                            >
                                <nw-icon name="icon-n-y-check" />
                            </n-button>
                        </n-badge> -->
                        <!-- <n-button type="error" size="small">
                            <nw-icon name="icon-n-y-check" />
                        </n-button> -->
                    </div>
                    <div>
                        <div
                            class="popover-box-header-close"
                            @click="close"
                        >
                            <nw-icon name="icon-n-y-power" :size="16" />
                        </div>
                        <n-badge dot :show="false">
                            <div
                                class="popover-box-header-save"
                                    @click="save"
                            >
                                <nw-icon name="icon-n-y-check" :size="16" />
                            </div>
                        </n-badge>
                    </div>
                </div>
                <!-- <div style="height: 30px">
11
                </div> -->
                
                <n-config-provider
                    abstract
                    namespace="splic"
                    :theme-overrides="theme"
                    >
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
                </n-config-provider>
            </div>    
        </n-popover>
    </div>
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
  NTreeSelect,
  NSelect,
  NButton,
  NBadge,
  NSpin,
  NModal,
  NPopover,
} from 'naive-ui'
import { cloneDeep } from 'lodash'
import { NwIcon, NwDic, NwAppTreePick, NwOpenapiPick } from '@platform/main'
import {
    detailExpress,
    queryDictItemLists,
    queryConditionTags as queryTags
} from '../../../../../api/index'
import {
  translateParamVarType,
  getSequenceFlowID
} from '../../../../../store/cache-expression'
import ValueInput from './ValueInput.vue'
import { actionExpParamsRef } from './cache-ref'

// 这里 需要重写表达式生成器
const getExp_ = (n, p) => {
    const params = p.map(d => {
        if (d.paramVarType === 'string' && d.expreParamSource === 'hand_field') {
            return `'${d.expreParamValue || ''}'`
        } else {
            return d.expreParamValue
        }
    })
    // 这里需要替换整个小括号内容
    // console.log('====ppp======', params.join(','), n.code.replace('()', `(${params.join(',')})`))
    const [ expStr ] = n.code.split('(')
    return `${expStr}(${params.join(',')})`
    // return n.code.replace('()', `(${params.join(',')})`)
}
// 这里 需要重写表达式生成器
const getExp = (n, p, f = false) => {
    const [ serviceIdVal, bizTagVal, ...cparams ] = p

    if (!p.length) {
        return ''
    }

    const params = cparams.map(d => {
        return {
            paramId: d.paramId,
            paramValue: d.expreParamValue,
            paramType: d.expreParamSource
        }
    })
    // 这里需要替换整个小括号内容
    const [ expStr ] = n.code.split('(')
    return `${expStr}(taskId,'${serviceIdVal.expreParamValue}','${bizTagVal.expreParamValue}','${f ? '[...]' : JSON.stringify(params)}',${getSequenceFlowID()})`
}
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
    NBadge,
    NSpin,
    NSelect,
    NModal,
    NButton,
    NwIcon,
    NPopover,
  },
  props:{
    value: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, context){
    // props.value
    // props.value
    // 初始化
    const popover = ref(null)
    const paramList = ref([])
    const expCode = computed(() => getExp(props.value, paramList.value))
    const expText = computed(() => getExp(props.value, paramList.value, true))
    const detail = () => {
        // cansu 
        if (props.value.cache) {
            paramList.value = cloneDeep(props.value.cache)
            console.log('=====paramList.value======', paramList.value)
            queryTags_()
        } else {
            detailExpress(props.value.expId).then((p) => {
                
                // const delExps = p.expreParamList.filter(d => )
                const customExps = p.expreParamList.filter(d => d.isDel)
                // 这里处理
                paramList.value = [
                    {
                        paramName: 'serviceId',
                        expreParamValue: null
                    },
                    {
                        paramName: 'bizTag',
                        expreParamValue: null
                    },
                    ...customExps.map((d, i) => {
                        return {
                            paramId: d.paramId,
                            paramName: d.paramName,
                            paramVarType: d.paramVarType,
                            expreParamSource: 'hand_field',
                            expreParamValue: null,
                            expreParamValueText: '',
                            expreParamValueId: ''
                        }
                    })
                ]
                
            queryTags_()
            })

        }
    }
    const onShow = (e) => {
        console.log('=======', e)
        if (e) {
            detail()
        }
    }
    
    // 缓存serviceId
    const tags = ref([])
    // 获取tag
    const queryTags_ = () => {
        const rowServiceId = paramList.value.find(d => d.paramName === 'serviceId')
        if (rowServiceId && rowServiceId.expreParamValue) {
            queryTags(rowServiceId.expreParamValue).then(r => {
                tags.value = (r || []).map(d => ({
                    value: d,
                    label: d
                }))
            })
        }
    }
    // 
    // 主备选表
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      data: paramList,
      columns: [
        {
            title: '参数名',
            field: 'paramName',
            width: 120,
            showOverflow: 'title',
        },
        {
            field: "paramVarType",
            title: "参数类型",
            showOverflow: 'title',
            width: 60,
            slots: {
                default: ({row}) => {
                    // return row.paramVarType
                    return translateParamVarType(row.paramVarType)
                }
            }
        },
        {
          title: '值',
          showHeaderOverflow: true,
          fixed: 'right',
          slots: {
            default: ({row}) => {
                // 这里改为openapi

                // 固定处理serviceId
                if (row.paramName === 'serviceId') {
                    // return <NwAppTreePick
                    // value={row.expreParamValue}
                    // onUpdateValue={d => {
                    //     // alert(d)
                    //     row.expreParamValue = d
                    //     queryTags_()
                    //     // 切换
                    //     const bizTag = paramList.value.find(d => d.paramName === 'bizTag')
                    //     if (bizTag) {
                    //     bizTag.expreParamValue = ''
                    //     }
                    // }}
                    // />
                    return [
                        <div style="display: flex;">
                            <NInput disabled style="width: calc(100% - 40px)" value={row.expreParamValue} />
                            <NwOpenapiPick
                                bizType="wfExpApi"
                                onCallback={(d) => {
                                    row.expreParamValue = d.sysCode
                                    const bizTag = paramList.value.find(d => d.paramName === 'bizTag')
                                    if (bizTag) {
                                        bizTag.expreParamValue = d.mthPath.split('/').pop()
                                    }
                                }}
                            />
                        </div>
                    ]
                    // return <NwDic
                    //     style={{
                    //         display: 'flex'
                    //     }}
                    //     value={row.expreParamValue}
                    //     onUpdateValue={d => {
                    //         row.expreParamValue = d
                    //         queryTags_()
                    //         // 切换
                    //         const bizTag = paramList.value.find(d => d.paramName === 'bizTag')
                    //         if (bizTag) {
                    //         bizTag.expreParamValue = ''
                    //         }
                    //     }}
                    //     request={{
                    //     XHR: () => queryDictItemLists({code: 'APP_NAME'}),
                    //     params: {},
                    //     }}
                    //     response={{
                    //     dataMethod: (res) => res.map(d => ({
                    //         value: d.dictItemCode,
                    //         label: d.dictItemName
                    //     })),
                    //     }}
                    //     placeholder=""
                    // />
                } else if (row.paramName === 'bizTag') {
                    // return <NInput
                    // value={row.expreParamValue}
                    // onUpdateValue={d => {
                    //     row.expreParamValue = d
                    // }}
                    // />
                    return row.expreParamValue
                    // return [<NSelect
                    //     size="small"
                    //     style={{
                    //         display: 'flex'
                    //     }}
                    //     options={tags.value}
                    // value={row.expreParamValue}
                    // onUpdateValue={d => {
                    //     row.expreParamValue = d
                    // }}
                    //     />]
                } else {
                    // 根据类型判断
                    return [
                        <ValueInput 
                            value={row.expreParamValue}
                            expreParamValueText={row.expreParamValueText}
                            expreParamSource={row.expreParamSource}
                            disabled={false}
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
                    ]
                    
                }
            }
          }
        }
      ]
    })
    return {
        expText,
        // expCode,
        // getExp,
        paramList,
        props,
        popover,
        onShow,
        gridOption,
        actionExpParamsRef,
        // 主动触发展现
        show () {
            if (actionExpParamsRef.value) {
                actionExpParamsRef.value.setShow(false)
            }
            if (actionExpParamsRef.value === popover.value) {
                actionExpParamsRef.value = null
            } else {
                detail()
                actionExpParamsRef.value = popover.value
                nextTick().then(() => {
                    setTimeout(() => {
                        popover.value.setShow(true)
                    }, 200)
                })
            }
        },
        // 直接关闭
        close () {
            actionExpParamsRef.value.setShow(false)
            actionExpParamsRef.value = null
        },
        // 保存参数
        save () {
            console.log('paramList', props.value, paramList.value)
            //alert(expCode.value)
            props.value.code = expCode.value
            props.value.cache = cloneDeep(paramList.value)
            actionExpParamsRef.value.setShow(false)
            actionExpParamsRef.value = null
        },
        
      theme: {
        Tag: {
          heightSmall: '14px'
        },
        Input: {
          color: null,
          colorFocus: null,
          textColor: null,
          border: null,
          borderHover: null,
          borderFocus: null,
          // fontSizeSmall: null,
          // heightSmall: null,
          caretColor: null,
          // color: null,
          // colorFocus: '#484848',
          // textColor: '#ccc',
          // border: '1px solid #1e1e1e',
          fontSizeSmall: '12px',
          heightSmall: '20px',
          // 锁定
          // colorDisabled: '#484848',
          // borderDisabled: '1px solid #1e1e1e',
          textColorDisabled: '#4d4d4d',
          // placeholderColorDisabled: '#a3a3a3',
        },

        Button: {
          heightSmall: '20px',
          fontSizeSmall: '12px',
          // 蓝色按钮
          // colorInfo: '#0E639C',
          // borderInfo: '#0E639C',
          // // 灰色默认
          // textColor: '#b9b9b9',
          // textColorText: '#b9b9b9',
          // border: '#0000000',
          // borderHover: '1px solid #0000000',
          // textColorHover: '#ccc',
        },
          
        Select: {
            peers: {
                InternalSelection: {
                paddingSingle: '0px 20px 0px 8px',
                heightSmall: '20px',
                // color: '#484848',
                // colorActive: '#484848',
                // textColor: '#ccc',
                // border: '1px solid #1e1e1e',
                fontSizeSmall: '12px',
                menuBoxShadow: '1px 0px 7px 1px #000',
                // 锁定
                // colorDisabled: '#484848',
                // borderDisabled: '1px solid #1e1e1e',
                // textColorDisabled: '#a3a3a3',
                // placeholderColorDisabled: '#a3a3a3',
                },
                InternalSelectMenu: {
                optionFontSizeSmall: '12px',
                optionHeightSmall: '14px',
                // color: '#4e4e4e',
                // optionTextColor: '#aaa',
                // optionTextColorActive: '#ccc',
                // optionColorPending: '#484848',
                peers: {
                }
                },
                
                Empty: {
                fontSizeSmall: '12px',
                iconSizeSmall: '20px',
                // textColor: '#0f0'
                }
            }
            }
        }
    }
  }
}
</script>

<style lang='less' scoped>
.exp-exp {
  display: inline-flex;
  padding: 0px 3px;
  justify-content: center;
  align-items: center;
  background: #8a2be2;
  color: #fff;
  // margin: 3px 0px;
  // margin: 5px 2px 0 2px;
  margin-top: 5px;
    position: relative;
    bottom: 0px;
    transition: .2s;
    cursor: pointer;
  &.action {
    position: relative;
    bottom: -5px;
    // transition: .3s;
  }
}
.popover-box {
    background: #fff;
    border: 2px solid #8a2be2;
    box-shadow: 1px 1px 4px 0px;
    &-header {
        margin: 4px;
        display: flex;
        flex-direction: row;
        // height: 40px;
        &-text {
            display: inline-flex;
            justify-content: space-between;
            border: 1px solid #8a2be2;
            // height: 20px;
            padding-left: 3px;
            font-size: 12px;
            flex: 1;
            &-t {
                flex-wrap: nowrap;
                word-break: break-all;
            }
        }
        &-close {
            // border: 2px solid #f44336;
            display: flex;
            align-items: center;
            background: #f44336;
            color: #fff;
            padding: 0 4px;
            margin-left: 4px;
            border-radius: 4px;
            box-sizing: border-box;
            cursor: pointer;
            height: 24px;
            margin-bottom: 5px;
        }
        &-save {
            
            display: flex;
            align-items: center;
            background: #18a058;
            color: #fff;
            padding: 0 4px;
            margin-left: 4px;
            border-radius: 4px;
            box-sizing: border-box;
            cursor: pointer;
            height: 24px;
        }
    }
}
.popover-text {

}
</style>