/**
 * @Description 委托合同任务详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-30 10:05:17
 */

import { ref, h } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm, NwFunctionPredefine } from "@platform/main";
import { FormSchema } from "./conf";
import CemlabExperimentTask from "./model"
import CemlabExperimentProcess from './experimentTaskModel';
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
    dataModel = ref<CemlabExperimentTask>(new CemlabExperimentTask());
    experimentTaskDataModel = ref<CemlabExperimentProcess>(new CemlabExperimentProcess());
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
    specimenColumns = [
        { field: 'customerName', minWidth: 150, title: '客户名称', align: 'center', editRender: { enabled: false } },
        { field: 'detectionMethod', minWidth: 150, title: '检测方法标准', align: 'center', editRender: { enabled: false } },
        { field: 'specimenName', minWidth: 150, title: '样品名称', align: 'center', editRender: { enabled: false } },
        { field: 'specimenCode', minWidth: 150, title: '样品编号', align: 'center', editRender: { enabled: false } },
        { field: 'specimenMaterial', minWidth: 150, title: '样品材质', align: 'center', editRender: { enabled: false } },
    ]

    specimenSonColumns = [
        { field: 'specimenName', minWidth: 150, title: '样品名称', align: 'center', editRender: { enabled: false } },
        { field: 'specimenAttribute', minWidth: 150, title: '样品属性', align: 'center', editRender: { enabled: false } },
    ]
    //实验条件列
    experimentSpecimenColumns = [
        { field: 'specimenName', title: '样品信息', editRender: { enabled: false }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
        { field: 'recipeQuantity', title: '加量(%)', editRender: { enabled: false }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
    ]
    //任务中的检测项目
    itemsColumns = [
        { field: 'detectionItem', minWidth: 150, title: '检测项目', align: 'center', editRender: { enabled: false } },
        { field: 'detectionVal', minWidth: 150, title: '数值', align: 'center', editRender: { enabled: false } },
    ]
    //实验条件列
    conditionColumns = [
        { field: 'conditionItem', title: '条件', editRender: { enabled: false }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
        { field: 'conditionVal', title: '数值', editRender: { enabled: false }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
    ]
    //(实验结果)检测项目列
    testItemColumns = [
        { field: 'resultItem', title: '检测项目', editRender: { enabled: false }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
        { field: 'resultVal', title: '数值', editRender: { enabled: false }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
    ]

}

export {
    FormModal
}
