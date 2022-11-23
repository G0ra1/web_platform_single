<script lang="jsx">
  import {
    NConfigProvider,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NSelect,
    NCheckboxGroup,
    NCheckbox,
    NSpace,
    NInput,
    NButton,
    NSpin,
    NModal,
    NDrawer,
    NDrawerContent,
    NAlert,
    useMessage
  } from 'naive-ui'
  import { h, ref, toRef, toRefs, reactive, defineComponent, watch, nextTick } from 'vue'
  import { cloneDeep } from 'lodash'

  import { NwIcon, NwFormViewer } from '@platform/main'
  
  import { FunViewer } from './store/index'
  // const isShow = ref(false)
  export default defineComponent({
    // props.params, props.formCache, props.carryParams
    props: {
      // 是否立即执行 为true时 会使用functionConfig参数加载功能
      immediate: {
        type: Boolean,
        default: false
      },
      // 功能配置
      functionConfig: {
        type: Object,
        default: () => ({})
      },
      params: {
        type: Array,
        default: () => ([])
      },
      // 表单缓存
      formCache:{
        type: Object,
        default: () => ({})
      },
      // 携带参数
      carryParams:{
        type: Object,
        default: () => ({})
      },
      // show: {
      //   type: Boolean,
      //   default: false
      // }
    },
    components: {
      NConfigProvider,
      NLayout,
      NLayoutHeader,
      NLayoutContent,
      NLayoutFooter,
      NSelect,
      NCheckboxGroup,
      NCheckbox,
      NSpace,
      NInput,
      NButton,
      NSpin,
      NModal,
      NDrawer,
      NDrawerContent,
      NAlert
    },
    emits: ['cancel', 'complete'],
    setup (props, context) {
      const {
        isShow,
        Utils,
        Container,
        Form,
        Dialog,
        Spin,
        ButtonList,
        show,
        cancel
      } = new FunViewer(context.emit, useMessage())
      // 对外开放函数
      context.expose({
        // init,
        show,
        cancel
      })
      // 头部
      const header = () => [Container.title]

      const content = () => [
        <NSpin class="fv-spin" show={Spin.visible} style="height: 100%;width: 100%;">
          {{
            icon: () => [
              <NwIcon name={Spin.icon} />
            ],
            description: () => [<div>
              {Spin.text}
            </div>],
            default: () => Container.type === 'form' ? <NwFormViewer
              ref={e => Form.ref = e}
              src={Form.url}
              onInited={() => {
                Form.inited = true
                Form.complete()
              }}
            /> : <div class="fv-dialog">{Dialog.text}</div>
          }}
        </NSpin>
      ]
      // footer
      const footer = () => [
        <div style="display:flex; justify-content: space-between;width: 100%;padding: 5px 0;">
          <div>
            {{
              // default: () => ButtonLeft
              default: () => ButtonList.value.filter(d => d.align === 'left').map(({
                type,
                disabled,
                text,
                ScriptFun
              }) => <NButton
                size="small"
                type={type}
                disabled={disabled}
                style="margin-right: 5px;"
                onClick={() => {
                  ScriptFun()
                }}
              >{{
                  default: () => text
              }}</NButton>)
            }}
          </div>
          <div>
            {{
              // default: () => ButtonLeft
              default: () => [
                ...ButtonList.value.filter(d => d.align === 'right').map(({
                  type,
                  disabled,
                  text,
                  ScriptFun
                }) => <NButton
                    size="small"
                    type={type}
                    disabled={disabled}
                    style="margin-right: 5px;"
                    onClick={() => {
                      ScriptFun()
                    }}
                >{{
                    default: () => text
                }}</NButton>),
                <NButton
                  size="small"
                  onClick={() => {
                    Utils.DispatchEvent('cancel')
                  }}
                >{{
                    default: () => '取消'
                }}</NButton>
              ]
            }}
          </div>
        </div>
      ]
      return () => {
        // console.log('====render para,====', p)
        // const viewType = 'drawer' // modal | drawer

        if (Container.viewMode === 'drawer') {
          // container =  
          return <NDrawer
            show={isShow.value}
            onUpdateShow={d => {
              isShow.value = d
            }}
            // show={true}
            width={Container.width}
                  
            onAfterLeave={() => {
              
            }}
            onAfterEnter={() => {

            }}
          >
            {{
              default: () => [
                <NDrawerContent
                body-content-style={{
                  display: 'flex'
                }}
                >
                  {{
                    header: header,
                    default: content,
                    footer: footer,

                  }}
                </NDrawerContent>
              ]
            }}
          </NDrawer>
        } else if (Container.viewMode === 'modal') {

          return <NModal
            show={isShow.value}
            onUpdateShow={d => {
              isShow.value = d
            }}
            preset="dialog"
            show-icon={false}
            mask-closable={true}
            closable={true}
            style={{
              width: Container.width
            }}
          >
            {{
              header: header,
              default: () => [
                
                <div style={{
                  height: Container.height
                }}>
                  {{
                    default: content
                  }}
                </div>
              ],
              action: () => [
                <div style={{
                  marginRight: '5px'
                }}>
                  {{
                    default: footer
                  }}
                </div>

              ]
            }}
          </NModal>
        } else if (Container.viewMode === 'view') {
          // 这是表单功能
          return <NLayout class="fv-layout">
            {{
              default: () => [
                <NLayoutHeader class="fv-layout-header">
                  {{
                    default: header
                  }}
                </NLayoutHeader>,
                <NLayoutContent
                  class="fv-layout-content"
                  content-style="overflow: hidden"
                >
                  {{
                    default: content
                  }}
                </NLayoutContent>,
                <NLayoutFooter class="fv-layout-footer">
                  {{
                    default: footer
                  }}
                </NLayoutFooter>
              ]
            }}
          </NLayout>
        } else {
          return ''
        }
  
      }
    }
  })
  </script>
  
  <style lang='less' scoped>
  .fv {
    &-dialog {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-spin {
      height: 100%;
      :deep(.n-spin-content) {
        height: 100%;
      }
    }
    &-layout {
      height: 100%;
      &-header {
        font-size: 16px;
        text-indent: 5px;
        font-weight: bold;
        height: 36px;
        border-bottom: 1px solid rgb(228, 228, 228);
        background: #fafafa;
        display: flex;
        align-items: center;
      }
      &-content {
        height: calc(~'100% - 72px');
        overflow: hidden;
        // padding: 15px;
      }
      &-footer {
        padding: 0 5px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid rgb(228, 228, 228);
        .message-info {
  
        }
      }
    }
  }
  </style>