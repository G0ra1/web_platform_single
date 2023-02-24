/**
 * @Description 考勤审批主表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-29 18:09:49
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import LabourAttendanceApprove from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";

import { ApproveDetailsColumn } from './constant'


const detailsColumn = ref<Array<any>>([])
const detailsData = ref<Array<any>>([])
class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<LabourAttendanceApprove>(new LabourAttendanceApprove());
    //验证规则
    rules = ref<FormRules>({
        contractWorkName: [
            {
                required: true,
                message: '请输入承包合同',
                trigger: ['input', 'blur']
            }
        ],
    });
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: { [a: string]: any }) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        if (!d.isAgree) d.isAgree = '1'
        Object.assign(this.dataModel.value, d);
        let ad = ApproveDetailsColumn(this.dataModel.value)
        detailsColumn.value = ad.detailsColumn
        detailsData.value = ad.detailsData
    };

    //提交时会调取这个
    getValue = async () => {
        setModelValue(this.dataModel.value)
        return cloneDeep(this.dataModel.value);
    };
    //打印----帆软
    printScript = (params: Array<any>) => {
        let planCpt = "http://10.72.5.45:9095/webroot/decision/view/report?viewlet=attendance.cpt";
        const id = this.dataModel.value.id;
        console.log(id)
        window.open(planCpt + '&id=' + id);
    };
}
const updataC = (v: string, o: any, row: any, column: any) => {
    // row.approveStateName = o.label
    row[column.field] = v
    console.log(detailsData.value, 'detailsData.value')
}

const setModelValue = (dataModel: any) => {
    let i = 0
    dataModel.labourAttendanceMonthVoList = []
    for (const key in dataModel.labourAttendanceMonthVo) {
        dataModel.labourAttendanceMonthVo[key].labourAttendanceMonthDetailVoList.forEach((d: any) => {
            d.attendanceInfo = detailsData.value[i][d.attendanceDate]
        })
        dataModel.labourAttendanceMonthVoList.push(dataModel.labourAttendanceMonthVo[key])
        i++;
    }
}
const attendanceInfoList: Array<string> = [
    '',
    '全天',
    '上午',
    '下午',
    '缺勤'
]
export {
    FormModal, updataC, detailsColumn, detailsData, attendanceInfoList,
}
