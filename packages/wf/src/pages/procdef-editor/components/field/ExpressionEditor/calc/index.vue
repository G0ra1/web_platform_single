<template>
  <n-spin
  :show="!editingExp"
  :theme-overrides="{ opacitySpinning: .2 }"
  >
    <template #icon></template>
    <template #description>
      <n-alert title="" type="info" >
        左侧选择需要编辑的表达式
      </n-alert>
    </template>
    <div class="calc-body">
      <div class="calc-body-view">
        <express-view :value="editingExp" />
      </div>
      <div class="calc-body-btn">
        
        <n-config-provider :theme-overrides="btnTheme">
          <n-grid :cols="6" x-gap="5" y-gap="5">
            <!-- 第一行 -->
            <n-gi>
              <n-button type="warning" size="small" @click="handleBack">
                <nw-icon name="icon-n-n-tuige" :size="14" style="font-weight: bold" />
              </n-button>
            </n-gi>
            <n-gi>
              <n-button type="warning" size="small">
                C
              </n-button>
            </n-gi>

            <n-gi>
              <n-button type="info" size="small" @click="handleInput('And')">
                And
              </n-button>
            </n-gi>
            <n-gi>
              <n-button type="info" size="small" @click="handleInput('Or')">
                Or
              </n-button>
            </n-gi>
            <n-gi>
              <n-button type="info" size="small" @click="handleInput('In')">
                In
              </n-button>
            </n-gi>
            <n-gi>
              <n-button type="info" size="small" @click="handleInput('Not in')">
                Not in
              </n-button>
            </n-gi>
            

            <!-- 第二行 -->
            
            

            <!-- 第三行 -->
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('!')">
                !
              </n-button>
            </n-gi>
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('!=')">
                !=
              </n-button>
            </n-gi>
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('<')">
                &lt;
              </n-button>
            </n-gi>
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('<=')">
                &lt;=
              </n-button>
            </n-gi>
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('>')">
                &gt;
              </n-button>
            </n-gi>
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('>=')">
                &gt;=
              </n-button>
            </n-gi>

            
            <n-gi>
              <n-button type="success" size="small" @click="handleInput('( )')">
                ( )
              </n-button>
            </n-gi>
            
            <!-- 第四行 -->
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('+')">
                +
              </n-button>
            </n-gi>
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('-')">
                -
              </n-button>
            </n-gi>
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('x')">
                &times;
              </n-button>
            </n-gi>
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('/')">
                &divide;
              </n-button>
            </n-gi>
            <n-gi>
              <n-button class="btn-font-16" type="info" size="small" @click="handleInput('=')">
                =
              </n-button>
            </n-gi>
            <n-gi>
              <div style="display:flex; justify-content: center;align-items:flex-start;height: 28px;overflow:visible">

                <div style="display:flex; width: 100%;font-size: 14px;font-weight:bold; justify-content: center;align-items: center;height: 34px;background: #8a2be2; color: #fff;">
                  <nw-icon name="icon-n-y-expression" :size="18" style="margin-right: 5px;" />
                  Exp
                </div>

              </div>
              <!-- <n-button color="#8a2be2" size="small">
              </n-button> -->
            </n-gi>


            <n-gi>
              <n-button type="info" size="small" @click="handleInput('String')">
                String
              </n-button>
            </n-gi>
            <n-gi>
              <n-button type="info" size="small" @click="handleInput('Number')">
                Number
              </n-button>
            </n-gi>
            <n-gi>
              <n-button type="info" size="small" @click="handleInput('Array')">
                Array
              </n-button>
            </n-gi>
            <n-gi>
            </n-gi>
          </n-grid>
        </n-config-provider>
      </div>
      <div class="calc-body-express">
        <div style="border: 2px solid #8a2be2">
          <vxe-grid
            class="nw-vxe-grid"
            v-bind="gridOption"
            v-on="gridOptionEvent"
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
        </div>
      </div>
    </div>
  </n-spin>
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
  NGrid,
  NGi,
  NInputGroup,
  NInput,
  NButton,
  NSpin,
  NModal,
  NAlert
} from 'naive-ui'
import { cloneDeep } from 'lodash'
import { NwIcon } from '@platform/main'
import { queryExpress } from '../../../../api/index'

import {
  expressionCache,
  translateExpreReturnType,
  editingExp,
  editingExpElements,
  editingExpElementIndex
} from '../../../../store/cache-expression'
import expMap from './exp'
import ExpressView from './express-view.vue'

export default {
  components: {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NGrid,
    NGi,
    NInputGroup,
    NInput,
    NSpin,
    NModal,
    NButton,
    NwIcon,
    ExpressView,
    NAlert
  },
  props:{
  },
  setup(props){
    
    // 主备选表
    const gridOption = ref({
      rowId: 'id',
      rowKey: false,
      height: '353px',
      size: 'mini',
      showOverflow: false,
      highlightHoverRow: true,
      border: true,
      // 
      tableMenu: {
         
      },
      
      pagerConfig: {
        border: true,
        pageSize: 20,
        pageSizes: [10, 20, 50],
        perfect: true
      },
      proxyConfig: {
        props: {
          // list: 'list',
          total: 'total'
        },
        ajax: {
          query: ({ page }) => {
            // alert(JSON.stringify(searchForm.value))
            return queryExpress({
              // parentOrgId: actionOrg.value ? actionOrg.value.id : '0',
              // page.currentPage, page.pageSize
              // ...searchForm.value,
              // selectMust: 0,
              // nodeEventType: nodeEventTypes.value.join(','),
              page:{
                current: page.currentPage,
                size: page.pageSize
              }
            }).then(async d => {
              // 这里进行类型过滤
              // const result = d.records.filter(d => nodeEventTypes.value.includes(d.nodeEventType))
              return ({
                //result,
                result: d.records,
                total: d.total
              })
            })}
        }
      },
      columns: [
        {
          title: '分类',
          field: 'procdefTypeName',
          width: 80
        },
        { field: "expreName", title: "表达式名称", showOverflow: 'title' },
        { field: "expreValue", title: "表达式", showOverflow: 'title'},
        {
          // field: "expreReturnType",
          title: "返回类型",
          showOverflow: 'title',
          width: 80,
          slots: {
            default: ({row}) => {
                return translateExpreReturnType(row.expreReturnType)
            }
          }

        },
        // { field: "selectSign", title: "默认事件", showOverflow: true,},
        {
          field: 'startEnable',
          title: '操作',
          width: 55,
          showHeaderOverflow: true,
          fixed: 'right',
          slots: {
            default: ({row}) => {
                return [
                  <NButton
                    size="small"
                    type="info"
                    onClick={() => {
                      const node = {
                        type: 'exp',
                        text: row.expreName,
                        code: row.expreValue,
                        expId: row.id
                      }
                      editingExpElements.value.children.splice(editingExpElementIndex.value + 1, 0, node)
                      editingExpElementIndex.value = editingExpElementIndex.value + 1
                    }}
                  >
                  {{
                    default: () => '添加'
                  }}
                  </NButton>
                ]
            }
          }
        }
      ]
    })
    nextTick().then(() => {
      console.log('========editingExp==', editingExp)
    })
    return {
      gridOption,
      gridOptionEvent: {},
      editingExp,
      btnTheme: {
          Button: {
            heightSmall: '28px',
            fontSizeSmall: '12px',
            iconSizeSmall: '14px',
            iconMarginSmall: '2px'
            // 蓝色按钮
            // colorInfo: '#0E639C',
            // borderInfo: '#0E639C',
            // // 灰色默认
            // textColor: '#b9b9b9',
            // textColorText: '#b9b9b9',
            // border: '#0000000',
            // borderHover: '1px solid #0000000',
            // textColorHover: '#ccc',
          }
      },
      handleClear () {
        // 清空

      },
      handleBack () {
        // 退格
        console.log('editingExpElements', editingExpElements)
        if (editingExpElements.value.children.length) {
          editingExpElements.value.children.splice(editingExpElementIndex.value, 1)
          editingExpElementIndex.value = editingExpElementIndex.value - 1
        }
      },
      // 点击按钮输入
      handleInput (key) {
        const n = expMap[key]
        if (n) {
          const node = cloneDeep(n.Node)
          // 加入
          // editingExpElements.value.children.push(node)
          // group 特殊处理 splice
          editingExpElements.value.children.splice(editingExpElementIndex.value + 1, 0, node)
          if (key === '( )') {
            editingExpElements.value = node
            editingExpElementIndex.value = -1
          } else {
            editingExpElementIndex.value = editingExpElementIndex.value + 1
          }
        }
        // editingExpElements.value.children.push({})
      },
      // Exp 输入
      handleExp (text, code) {
        
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import "../../../../style/vxe-table.less";
.calc-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-view {
    height: 200px;
  }
  &-btn {
    padding: 5px 5px 5px 5px;
    // height: 135px;
    :deep(.n-grid) {
      .n-button {
        width: 100%;
        .n-button__content {
          font-weight: bold;
        }
      }
    }


    .btn-font-16 {
      font-size:14px
    }
  }
  &-express {
    flex: 1;
    padding: 0 5px 5px 5px;
  }
}
</style>