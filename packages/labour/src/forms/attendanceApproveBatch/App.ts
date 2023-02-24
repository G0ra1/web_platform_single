/**
 * @Description 考勤批量审批
 * @author 云数网讯 Panfakun@netwisd.com
 * @date 2023-2-2 
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import LabourAttendanceApprove from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { format } from "date-fns";
import { getSuppUserMonthApproveList } from './api'
import  LabourAttendance  from './data/LabourAttendance'

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


    
    initScript = async (params: any) =>{
        console.log("params=start>>>>>>>>>>>>>>")
        console.log(params)
        console.log("params=end>>>>>>>>>>>>>>")
        // 将数据传给表单主表封装
        //组装用户名
        const suppUserNameDisArry:any = [];
        //组装日期
        const attendanceYearMonthDisArry:any = [];
        // 所属班组
        const banNameDisArry:any = [];
        //所属劳务公司
        const labourCompanyNameDisArry:any = [];
        
        let ssss = Array();
        params.map((d:any)=>{
            suppUserNameDisArry.push(d.suppUserName) 
            attendanceYearMonthDisArry.push(d.attendanceYearMonth)
            banNameDisArry.push(d.banName)
            labourCompanyNameDisArry.push(d.labourCompanyName)


            let labourAttendanceApprove =   new LabourAttendanceApprove();
            labourAttendanceApprove.attendanceDate = d.attendanceYearMonth
            labourAttendanceApprove.suppUserId = d.suppUserId
            labourAttendanceApprove.banId = d.banId
            labourAttendanceApprove.labourCompanyId = d.labourCompanyId
            ssss.push(labourAttendanceApprove)
        })
        // console.log("ddddddddddddddddd>>>>>>>>>>>>>>>")
        // console.log(ssss)
        // 去重后的
        let suppUserNameArry =  Array.from(new Set(suppUserNameDisArry))
        let attendanceYearMonthArry = Array.from(new Set(attendanceYearMonthDisArry))
        let banNameArry = Array.from(new Set(banNameDisArry))
        let labourCompanyNameArry = Array.from(new Set(labourCompanyNameDisArry))
        // 拼接 数据
        let countsuppUserName = "";
        let countattendanceYearMonth = "";
        let countbanName = "";
        let countlabourCompanyName = "";
        //处理Name
        suppUserNameArry.map((d:any)=>{
            countsuppUserName += d +";"
        })
        attendanceYearMonthArry.map((d:any)=>{
            countattendanceYearMonth += d + ","
        })
        banNameArry.map((d:any)=>{
            countbanName += d+";"
        })
        labourCompanyNameArry.map((d:any)=>{
            countlabourCompanyName += d + ";"
        })
        this.dataModel.value.suppUserName = countsuppUserName
        this.dataModel.value.attendanceYearMonth = countattendanceYearMonth
        this.dataModel.value.banName = countbanName
        this.dataModel.value.labourCompanyName = countlabourCompanyName
        // 批量查询某人某月未进行审批的考勤 要的数据
        getSuppUserMonthApproveList(ssss).then(
            (d:any)=>{
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                console.log(d)
            }
        )
    }


    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: { [a: string]: any }) => {

        if (!d.attendanceApplyDate) {
            d.attendanceApplyDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
        }
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d,{suppUserName:this.dataModel.value.suppUserName,attendanceYearMonth:this.dataModel.value.attendanceYearMonth,banName:this.dataModel.value.banName,labourCompanyName:this.dataModel.value.labourCompanyName});
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
    //打印----帆软
    printScript=(params: Array<any>) => {
        let planCpt="http://10.72.5.45:9095/webroot/decision/view/report?viewlet=attendance.cpt";
        const id=this.dataModel.value.id;
        console.log(id)
        window.open(planCpt+'&id='+id);
    };
}
const updataC = (v: string, o: any, row: any) => {
    row.approveStateName = o.label
}
export {
    FormModal, updataC
}
