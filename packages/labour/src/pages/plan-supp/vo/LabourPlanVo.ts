export default interface LabourPlanVo {
    //主键
    id: string;
    //需求计划名称
    planName: string;
    //需求计划编号
    planNo: string;
    //所属机构id
    planOrgId: number;
    //所属机构名称
    planOrgName: string;
    //所属部门id
    planDeptId: number;
    //所属部门名称
    planDeptName: string;
    //需求类别（大修、日常、专项）
    planType: string;
    //大修id
    overhaulId: string;
    //大修编码
    overhaulCode: string;
    //大修名称 
    overhaulName: string;
    //预估金额
    estimateAmount: string;
    //预算金额
    budgetAmount: string;
    //计划开始时间
    planStartTime: string;
    //计划结束时间
    planEndTime: string;
    //是否生成订单；0否；1是；
    isGenOrder: number;
    //推送截止时间
    pushOffTime: string;
    //是否框架协议供应商；0否；1是；
    isFrameSupp: number;
    //是否作废；0否；1是；
    isInvalid: number;


}