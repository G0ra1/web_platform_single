/**
 * @Description 考勤表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-12-05 15:14:28
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import LabourAttendance from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { bind, gridRef, filterData, query, reset, paramsArray, initDialog } from "./App1"

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<LabourAttendance>(new LabourAttendance());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);

        //页面加载完成后，调用的重置方法
        reset(
            // {
            // "attendanceYearMonth":dataModel.value.attendanceYearMonth,
            // "banId":dataModel.value.banId,
            // "labourCompanyId":dataModel.value.labourCompanyId,
            // "suppUserId":dataModel.value.suppUserId
            // }
            {
            "attendanceDate":this.dataModel.value.attendanceYearMonth+'-01',
            "banId":this.dataModel.value.banId,
            "labourCompanyId":this.dataModel.value.labourCompanyId,
            "suppUserId":this.dataModel.value.suppUserId
            } 
            ),
            filterData.value = {
                "attendanceDate":this.dataModel.value.attendanceYearMonth+'-01',
                "banId":this.dataModel.value.banId,
                "labourCompanyId":this.dataModel.value.labourCompanyId,
                "suppUserId":this.dataModel.value.suppUserId
            }

    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
}

export {
    FormModal
}
