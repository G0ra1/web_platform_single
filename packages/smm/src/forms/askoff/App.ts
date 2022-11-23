/*
 * @Author: zouliming 
 * @Date: 2022-10-27 18:49:15 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-08 20:04:04
 * @Description 请假申请表单
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import type { FormModalTypes } from '@platform/main'
type RulesType = FormModalTypes.RulesType
import { FormSchema } from "./conf";
import AskOff from "./AskOff";
import { cloneDeep } from "lodash";
import { FormPermissionEnum } from "../common/constant/FormPermissionEnum"

const rangeNum = ref<[number, number]>([Date.now(), Date.now()])
const rangeStr = ref<[string, string]>()

class FormModal extends AbstractForm {

    constructor() {
        super();
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<AskOff>(new AskOff());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参，理论上最优方式，父类用泛型处理
    setValue = (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);
        if (!this.dataModel.value.applyType) {
            this.dataModel.value.applyType = 0
        }
    };

    //提交时会调取这个
    getValue = async () => {
        /* if (!this.dataModel.value.applyType) {
            this.dataModel.value.applyType = 0
        } */
        return cloneDeep(this.dataModel.value);
    };

    //设置一些验证规则，包括在工作流中和普通业务表单中
    setRules = (v: RulesType) => {
        //console.log("RulesType:", v);
        // 设定表单权限
        this.rules.value = {};
        Object.entries(v).forEach(
            ([key, val]) => {
                // 只处理必填
                if (val.powerCode === FormPermissionEnum.REQUIRED) {
                    // 主表或单表
                    this.rules.value[key] = {
                        type: val.dbType,
                        required: true,
                        trigger: ["blur", "input"],
                        message: `${val.nameCh}该属性为必填`,
                    };
                } else {
                    // 处理 隐藏、只读
                    this.dataPermits.value[key] = val.powerCode;
                }
            }
        );
    };

    // 发起验证
    validate = async () => {
        let f: Array<string> = [];
        await this.formRef.value
            ?.validate()
            .then(() => {
                console.log("===验证成功！！！");
                f = [];
            })
            .catch((e: Array<object>) => {
                console.log("===验证失败！！！");
                f = e.map((m: any) => m[0].message);
            });
        return f;
    };

    public changeDate = (value: number[], formattedValue: string[]): void => {
        this.dataModel.value.changeDate(value, formattedValue);
    }
}

const applyTypeOptions = ref([
    { label: '事假', value: 0 },
    { label: '病假', value: 1 },
])

export {
    rangeNum,
    rangeStr,
    FormModal,
    applyTypeOptions
}
