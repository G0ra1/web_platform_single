/**
 * @Description 设备新增表单
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 13:44:09
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import CemlabDevice from "./model"
import { cloneDeep } from "lodash";
import { getBandOrg } from "./api";
import Rule from "./rule";

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<CemlabDevice>(new CemlabDevice());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    //执行初始化自定义脚本
    initScript = async (params: any) => {
    }

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: any) => {
        getBandOrg({ isDefault: 0 }).then(d => {
            this.orgTree.value = d
        })
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, { maintainRules: 1, deviceStatus: 1, factoryNumber: "-" }, d);
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
    deviceStatusOptions = ref([
        {
            label: "在用",
            value: 1,
        },
        {
            label: "停用",
            value: 2,
        },
        {
            label: "报废",
            value: 3,
        },
    ]);
    orgTree = ref([]);
}

export {
    FormModal
}
