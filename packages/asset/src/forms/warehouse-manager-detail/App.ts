/**
 * @Description 仓库管理 仓库详情页面
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-22 15:05:10
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import AssetWarehouse from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<AssetWarehouse>(new AssetWarehouse());
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
    setValue = (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
    columns = [
        { type: "seq", width: 50, align: 'center', minWidth: 50 },
        { field: 'shelfName', minWidth: 120, align: 'center', title: '货架号' },
        { field: 'warehouseName', minWidth: 120, align: 'center', title: '所属仓库' },
    ]
}

export {
    FormModal
}
