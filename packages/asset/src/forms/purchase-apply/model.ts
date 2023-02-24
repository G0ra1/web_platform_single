/**
 * @Description 购置申请
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:33:52
 */

export default class AssetPurchaseApply {
    //主键
    id!: string;
    //编号
    code!: string;
    //申请人
    applyUserId!: string;
    //申请人
    applyUserName!: string;
    //申请人机构
    applyUserOrgId!: string;
    //申请人机构
    applyUserOrgName!: string;
    //申请人部门
    applyUserDeptId!: string;
    //申请人部门
    applyUserDeptName!: string;
    //申请时间
    applyTime!: string;
    //合计金额
    sumTotalAmount!: number;
    //合计金额-未税
    sumTotalUntaxedAmount!: number;
    //合计金额-税额
    sumTotalTaxAmount!: number;
    //合计申请数量
    sumTotalNumber!: number;
    //审批通过时间
    auditSuccessTiem!: string;
    //camunda流程任务ID
    camundaTaskId!: string;
    //申请类型
    itemType!: string;
    //申请类型名称
    itemTypeName!: string;
    //采购状态
    status!: string;
    //说明
    explanation!: string;
    //计划年度
    planYear!: string;
    //附件ids
    fileIds!: string;
    //未采购金额
    notRegisterAmount!: number;
    //采购登记数量
    registerNumber!: number;
    //未采购登记数量
    notRegisterNumber!: number;
}