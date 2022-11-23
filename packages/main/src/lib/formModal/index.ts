import { ref } from 'vue'
import type { FormRules, FormInst } from "naive-ui";
import type { Ref } from 'vue'
abstract class AbstractForm {
    abstract setValue: (a: object) => void      // 设定数据
    abstract getValue: () => Promise<object>  // 获取数据
    // abstract setRules: (a: FormModalTypes.RulesType) => void     // 设定权限
    // abstract validate: () => Promise<Array<string>> // 验证
    abstract getSchema: () => Promise<object> // 获取字段规则
    PageKey: string = ''
    formRef = ref<FormInst>();
    rules = ref<FormRules>({});
    dataPermits = ref<any>({});
    gridDataPermits = ref<any>({}); // 子表权限
    gridRules = ref<any>({})  // 子表验证规则
    gridRefs = ref<any>({})
    // registerGrid = () => {
    //     this.gridRefs.value[]
    // }
    setRules (v: FormModalTypes.RulesType) {
        // 设定表单权限
        this.rules.value = {};
        Object.entries(v).forEach(
            ([key, val]) => {
                // 只处理必填
                // if (val.powerCode === "required") {
                //     // 这里只生成主表字段的权限
                //     const [fieldName, ...p] = key.split(".");
                //     if (p.length) {
                //         const [field] = p;
                //         if (!this.gridRules.value[fieldName]) this.gridRules.value[fieldName] = {}

                //         this.gridRules.value[fieldName][field] = [{
                //             type: val.dbType,
                //             required: true,
                //             message: `${val.nameCh}该字段为必填`,
                //         }]
                //         // 这里生成一级子表的字段必填规则
                //     } else {
                //         // 非子表
                //         this.rules.value[key] = {
                //             type: val.dbType,
                //             required: true,
                //             trigger: ["blur", "input"],
                //             message: `${val.nameCh}该属性为必填`,
                //         };
                //     }
                // } else {
                //     // 处理 隐藏、只读
                //     this.dataPermits.value[key] = val.powerCode;
                // }
                const [fieldName, ...p] = key.split(".");
                if (p.length) {
                    // 子表
                    const [field] = p;
                    
                    if (val.powerCode === "required") {
                        if (!this.gridRules.value[fieldName]) this.gridRules.value[fieldName] = {}
                        this.gridRules.value[fieldName][field] = [{
                            type: val.dbType,
                            required: true,
                            message: `子表 字段:${val.nameCh} 为必填`,
                        }]
                    } else {
                        if (!this.gridDataPermits.value[fieldName]) this.gridDataPermits.value[fieldName] = {}
                        this.gridDataPermits.value[fieldName][field] = val.powerCode;
                    }
                    
                    // 这里生成一级子表的字段必填规则
                } else {
                    // 非子表
                    if (val.powerCode === "required") {
                        // 必填
                        this.rules.value[key] = {
                            type: val.dbType,
                            required: true,
                            trigger: ["blur", "input"],
                            message: `${val.nameCh}该属性为必填`,
                        };
                    } else {
                        this.dataPermits.value[key] = val.powerCode;
                    }
                }

            }
        );
    };

    // validate = async () => {
    async validate () {
        let f: Array<string> = []
        await this.formRef.value?.validate().then(() => {
            f = []
        }).catch((e: Array<object>) => {
            f = e.map((m: any) => m[0].message)
        })
        // 这里验证子表
        for(let gr in this.gridRefs.value) {
            const er = await this.gridRefs.value[gr].validate()
            if (er) f.push(er)
        }
        return f
    }

    private init() {
        this.PageKey = window.location.hash.substring(1)
        window.parent.postMessage({
            cmd: 'INIT_COMPLETE',
            key: this.PageKey
        }, '*')
        window.addEventListener('message', (e) => {
            switch (e.data.cmd) {
                // case 'SET_KEY':
                //     this.PageKey = e.data.value
                //     window.parent.postMessage({
                //         cmd: 'INIT_COMPLETE',
                //         key: this.PageKey
                //     }, '*')
                // break;
                case 'SET_VALUE':
                    this.setValue(e.data.value)
                    break;
                case 'SET_RULES':
                    this.setRules(e.data.value)
                    break;
                case 'GET_VALUE':
                    this.getValue().then(r => {
                        window.parent.postMessage({
                            cmd: 'GET_VALUE',
                            value: r,
                            key: this.PageKey
                        }, '*')
                    })
                    break;
                case 'GET_SCHEMA':
                    this.getSchema().then(r => {
                        window.parent.postMessage({
                            cmd: 'GET_SCHEMA',
                            value: r,
                            key: this.PageKey
                        }, '*')
                    })
                    break;
                case 'GET_VALIDATE':
                    if (this.validate) {
                        this.validate().then(r => {
                            window.parent.postMessage({
                                cmd: 'GET_VALIDATE',
                                value: r,
                                key: this.PageKey
                            }, '*')
                        })
                    } else {
                        window.parent.postMessage({
                            cmd: 'GET_VALIDATE',
                            value: [],
                            key: this.PageKey
                        }, '*')
                    }
                    // window.parent.postMessage({
                    //   cmd: 'GET_VALIDATE',
                    //   value: window.DM_VALIDATE ? window.DM_VALIDATE() : true
                    // }, '*')
                    break;
            }
        })
        // window.parent.postMessage({
        //     cmd: 'INIT_COMPLETE',
        //     url: window.location.href
        // }, '*')
    }
    constructor() {
        this.init()
    }
}

// 
export namespace FormModalTypes {
    export type RulesType = {
        [a: string]: {
            powerCode: string,
            nameCh: string,
            dbType: 'string' | 'number' | 'array'
        }
    }
}
export {
    AbstractForm
}