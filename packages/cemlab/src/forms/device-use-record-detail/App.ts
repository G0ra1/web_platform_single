import { values } from 'lodash';
/**
 * @Description 设备管理  设备使用详情  查看详情页面
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 17:48:35
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import CemlabDevice from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { getDeviceNameList } from './api';

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
    setValue = (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
    columns = [
        {
            field: 'deviceName', title: '仪器设备', editRender: { enabled: false }, slots: { default: 'deviceName' }, showHeaderOverflow: true, minWidth: '180px', align: 'center'
        },
        { field: 'deviceCode', title: '自编号', editRender: { enabled: false }, slots: { default: 'deviceCode' }, showHeaderOverflow: true, minWidth: '160px', align: 'center' },
        { field: 'useTimes', title: '使用时间', editRender: { enabled: false }, slots: { default: 'useTimes' }, showHeaderOverflow: true, minWidth: '160px', align: 'center' },
        // { field: 'useStartHours', title: '开始使用时间', editRender: { enabled: false }, slots: { edit: 'useStartHours' }, showHeaderOverflow: true, minWidth: '160px', align: 'center' },
        // { field: 'useEndHours', title: '结束使用时间', editRender: { enabled: false }, slots: { edit: 'useEndHours' }, showHeaderOverflow: true, minWidth: '160px', align: 'center' },
        { field: 'useBeforeStatus', title: '使用前', editRender: { enabled: false }, slots: { default: 'useBeforeStatus' }, showHeaderOverflow: true, minWidth: '160px', align: 'center' },
        { field: 'useAfterStatus', title: '使用后', editRender: { enabled: false }, slots: { default: 'useAfterStatus' }, showHeaderOverflow: true, minWidth: '160px', align: 'center' },
        { field: 'rearks', title: '备注', editRender: { enabled: false }, slots: { edit: 'rearks' }, showHeaderOverflow: true, minWidth: '160px', align: 'center' },
        { field: 'useTime', title: '使用日期', editRender: { enabled: false }, slots: { edit: 'useTime' }, showHeaderOverflow: true, minWidth: '160px', align: 'center' },
        { field: 'useUserName', title: '使用人', editRender: { enabled: false }, slots: { edit: 'useUserName' }, showHeaderOverflow: true, minWidth: '160px', align: 'center' },
    ]
    deviceNameList = ref([]);
}

export {
    FormModal
}
