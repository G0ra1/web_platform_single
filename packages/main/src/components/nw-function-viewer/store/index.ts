import { ref, reactive ,watch, h, nextTick } from 'vue'

import { request } from '@platform/main'

// 异步构造函数
const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;

// 获取实例

interface FunType {

}

// const getUtils = () => ()

// 实例化
class FunViewer {
    Emit: any
    // 功能展现控制
    isShow = ref(false)
    // 传入数据
    Params = ref<Array<object>>([]) // 传入参数
    FormCache = ref({})  // 表单缓存
    CarryParams = ref({}) // 提交参数

    // Utils
    Utils = {
        // 
        Message: null,
        // 获取表单数据
        GetFormValue: () => this.Form.ref.getValue(),
        // 触发表单验证
        ValidateForm: () => this.Form.ref.validate(),
        // Get

        // // 获取参数
        GetParams: (pn = 0) => this.Params.value[pn],
        // // 获取携带参数
        GetCarryParams: () => this.CarryParams.value,
        // // 设定表单数据
        SetFormValue: (v: any) => this.Form.ref.setValue(v),
        // // 从传入缓存设置表单数据
        SetFormValueByCache: () => {
            this.Form.ref.setValue(this.FormCache)
        },
        // // 设置按钮状态
        SetButton: (id: string, option: {
            disabled?: boolean,
            type?: string,
            text?: string,
        } = {}) => { // 设定按钮
            const btn: any = this.ButtonList.value.find((d: any) => d.id === id)
            if (btn) {
                if (option.disabled !== undefined) btn.disabled = option.disabled
                if (option.type !== undefined) btn.type = option.type
                if (option.text !== undefined) btn.text = option.text
            }
        },
        // // 设定加载效果
        SetSpin: (visible: boolean, text: string, icon: string) => { 
            this.Spin.visible = visible
            if (icon)this.Spin.icon = icon
            if (text)this.Spin.text = text
        },
        // // 设定文字
        SetDialogText: (text: string) => {
            this.Dialog.text = text
        },
        // // 调度事件
        DispatchEvent: (name: string, ...p: any) => { 
            switch (name) {
                case 'cancel':
                    this.Emit('cancel', ...p)
                    this.isShow.value = false
                    break;
                case 'complete':
                    this.Emit('complete', ...p)
                    this.isShow.value = false
                    break;
                case '':
                    break;
            }
        }
        
    }

    // 这里参数应该可以传入若干

    // 容器
    Container = reactive({
        title: '',
        width: '100%',
        height: '400px',
        viewMode: 'drawer',
        type: 'form'
    })

    // 加载等待
    // SpinVisible = ref(false)
    // SpinIcon = ref('icon-loading')
    // SpinText = ref('加载中...')

    Spin = reactive({
        visible: false,
        icon: 'icon-y-loading',
        text: '加载中...'
    })
    
    Form = reactive<{
        inited: boolean,
        ref: any,
        url: string,
        complete: Function | null
    }>({
        inited: false,  // 加载完成标识
        ref: null,  // 表单ref
        url: '',  // 表单地址
        complete: null
    })

    Dialog = reactive({
        text: ''
    })
    // 脚本程序存储
    ScriptHash = reactive<{[k: string]: any}>({

    })

    // 按钮存储
    ButtonList = ref([])
    // 初始化脚本
    private initScript (scriptsStr: string) {
        // 遍历脚本
        const scripts = JSON.parse(scriptsStr)
        scripts.forEach(({ key, code, isAsync = false}: { key: string, code: string, isAsync: boolean}) => {
            if (isAsync) {
                this.ScriptHash[key] = new AsyncFunction('Request', 'Utils', code) // 最后一个参数是代码
            } else {
                this.ScriptHash[key] = new Function('Request', 'Utils', code)
            }
        })

    }
    // 初始化按钮
    private initButton (btnsStr: string) {
        const buttons = JSON.parse(btnsStr)
        this.ButtonList.value = buttons.map((d: any) => {
            d.ScriptFun = () => {
                this.ScriptHash[d.script](request, this.Utils) // , Utils, Params.value  这里传入工具类
            }
            return d
        })
    }
    // 初始化内容
    private initContent (option: any) {
        // 标题
        this.Container.title = option.fullName
        // 表单url
        this.Form.url = option.formUrl
        // 内容类型
        this.Container.type = option.type
        // 高度宽度
        this.Container.height = option.height;
        this.Container.width = option.width;
        // 展示模式
        this.Container.viewMode = option.viewMode;
    }
    // 等待表单加载
    async loadForm () {
        if (this.Container.type === 'form') {
            await new Promise((resolve) => {
                this.Form.complete = resolve
            })
        }
    }
    // runScript 运行初始化函数
    private async runInitScript () {
        const initScript = this.ScriptHash.init
        if (initScript.constructor === AsyncFunction) {
            await initScript(request, this.Utils)
        } else {
            initScript(request, this.Utils)
        }
    }
    // 初始化
    initData (option: any, params: Array<object>) {
        this.Params.value = params
        // 内容
        this.initContent(option)
        // 按钮
        this.initButton(option.buttons)
        // 脚本
        this.initScript(option.script)



    }
    // 展现
    show = async (option: any, params: Array<object>) => {
        this.initData(option, params)
        await nextTick()
        this.isShow.value = true
        await this.loadForm()
        await this.runInitScript()
    }

    // 取消
    cancel = () => {
        this.isShow.value = false
    }
    constructor (e: any, message: any) {
        this.Emit = e
        this.Utils.Message = message
    }
}

export {
    FunViewer
}