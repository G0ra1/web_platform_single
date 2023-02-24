<script lang='tsx'>
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { h, defineComponent, ref, reactive, nextTick, computed, inject, getCurrentInstance } from "vue";
import {
  NConfigProvider,
  NDrawer,
  NDrawerContent,
  NLayout,
  NLayoutHeader,
  NLayoutSider,
  NLayoutContent,
  NLayoutFooter,
  NThemeEditor,
  NButton,
  NInputGroup,
  NInput,
  NForm,
  NFormItem,
  NModal,
  NPopconfirm,
  NMessageProvider,
  NSpin

} from "naive-ui";

import { NwIcon, request, NwFunctionViewer, Utils } from '@platform/main'

import { WfRunModal } from '@platform/wf'

// import { createConfig, editConfig } from './data.js'
import { get } from 'lodash'

// 存储公共
const StaticFnMap: any = {}

const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    pid: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    },
    descr: {
      type: String,
      default: ''
    },
    params: { // 请求参数
      type: Array,
      default: () => ([])
    },
    text: {
      type: Boolean,
      ddefault: false
    }
    // 这里需要加入定制
  },
  emits: ['complete'],
  components: {
    NConfigProvider,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NModal,
    NPopconfirm,
    NMessageProvider,
    NSpin,
    NwFunctionViewer,
    NwIcon
  },
  setup(props, context) {
    // 这里根据设定code 获取页面中的功能
    const instance = getCurrentInstance()

    let fnData: any; // 这是测试数据

    // 读取数据
    if (!StaticFnMap[props.code]) {
      // 从缓存获取功能
      // fnData = StaticFnMap[props.code] = (inject('FnItem') as any).find((d: any) => d.code === props.code)

      const FnItem: any = inject('FnItem')
      // console.log('FnItem=', FnItem, props.code)
      // 当页面含有功能时赋值
      if (FnItem) {
        fnData = StaticFnMap[props.code] = FnItem[props.code]
      }
    } else {
      fnData = StaticFnMap[props.code]
    }

    // 这里判断是否流程
    // if (fnData.targetType === 'wf') {
    //   // 进行流程
    // }

    // fnData = {
    //   btn: {
    //     type: 'warning', // 按钮类型
    //     size: 'small', // 按钮大小
    //     label: '测试', // 按钮文字

    //   },
    //   // 功能信息
    //   fn: {
    //     // 功能相关字段查询
    //   }
    // }

    // 是否获取到功能实例
    let flag = false

    let wfProcdefKey = ''
    // 功能配置
    let functionOption: any;

    let btnText: string;
    let btnOption: any;
    if (fnData) {
      flag = true

      wfProcdefKey = fnData.mdmCptsVo.camundaProcdefKey

      functionOption = fnData.mdmCptsVo
      btnText = fnData.menuName
      btnOption = {
        size: fnData.buttonSize,
        type: fnData.buttonType,
      }
    }

    
    const WfRunModalRef = ref<any>()
    // 功能组件对象
    const FunctionViewRef = ref<typeof NwFunctionViewer>()
    /*
    functionData
     
      {
        // 按钮信息
        btn: {
          text: '', // 按钮文字
          type: '', // 按钮类型
          size: '', // 按钮大小

        },
        // 功能信息
        fn: {
          // 功能相关字段查询
        }
      }
    
    */
    const EventKey = (props.pid && props.code) ? `sendParam_${props.pid}_${props.code}` : `sendParam_${Utils.radomKey()}`
    // 回调
    const cb = (d: any) => {
      console.log(123321)
      d.detail.dispatchEvent(new CustomEvent('setParams', {
        detail: {
          param: props.params[0], // 第一个参数
          params: props.params, // 参数组
          initScript: new AsyncFunction('Request', 'Utils', JSON.parse(functionOption.script).find((d: any) => d.key === 'init').code)
        }
      }));
    }
    const handle = () => {

      // console.log('=====functionOption, props.params====', props.params)
      // 判断
      if (wfProcdefKey) {
        // 传值
        WfRunModalRef.value.show(`/web-wf/pages/run-skin.html?Action=create&CamundaDefKey=${wfProcdefKey}${props.params.length ? `&isParamsChannel=${EventKey}` : ''}`);
        // const skinWin = window.open(
        //   `/web-wf/pages/run-skin.html?Action=create&CamundaDefKey=${wfProcdefKey}${props.params.length ? `&isParamsChannel=${EventKey}` : ''}`,
        //   '_blank',
        //   'top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no'
        // )
        if (props.params.length) {
          // 如果含有参数
          // skinWin?.addEventListener('getParams', () => {
          //   // 这里获取功能脚本init

          //   // 这里监听到了获取参数请求 这里触发
          //   skinWin?.dispatchEvent(new CustomEvent('setParams', {
          //     detail: props.params[0]
          //   }));

          //   // 测试触发功能脚本
          // })

          // 20221126 修改向流程壳传值

          window.removeEventListener(EventKey, cb)
          window.addEventListener(EventKey, cb)
        }
      } else {
        console.log('======functionOption===', functionOption)
        FunctionViewRef.value!.show(functionOption, props.params)
      }
    }
    const Emitter: any = inject('Emitter')
    return () => {

      if (flag) {
        return [
          instance!.slots.auth ? instance!.slots.auth(handle) : <NButton
            disabled={props.disabled}
            type={btnOption.type}
            size={btnOption.size}
            class={props.text ? 'vxe-grid-active' : ''}
            text={props.text}
            style="margin-right:12px"
            onClick={() => {
              handle()
            }}
          >
            {{
              default: () => [btnText]
            }}
          </NButton>,
          <NwFunctionViewer
            ref={(d: typeof NwFunctionViewer) => FunctionViewRef.value = d}
            onComplete={() => {
              Emitter.emit('function-complete')
            }}
            onCancel={() => {
              Emitter.emit('function-cancel')
            }}
          />,
          <WfRunModal
            ref={(d: any) => { WfRunModalRef.value = d }}
          />
        ]

      } else {

        return instance!.slots.unauth ? instance!.slots.unauth() : ''

      }
    }
  }
});
</script>
<style lang="less" scoped>

</style>