/**
 * @Description 采购信息登记
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:33:58
 */

export default class AssetPurchaseRegister {
    //主键
    id!: string;
    //编号
    code!: string;
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
    //申请时间
    applyTime!: string;
    //申请人
    applyUserId!: string;
    //申请人名称
    applyUserName!: string;
    //申请人机构
    applyUserOrgId!: string;
    //申请人机构名称
    applyUserOrgName!: string;
    //申请人部门
    applyUserDeptId!: string;
    //申请人部门名称
    applyUserDeptName!: string;
    //说明
    explanation!: string;
    //计划年度
    planYear!: string;
    //购置申请id;购置申请id
    applyId!: string;
    //购置申请code
    applyCode!: string;
    //采购合同id
    contractId!: string;
    //采购合同code
    contractCode!: string;
    //采购合同签订时间
    contractTime!: string;
    //附件ids
    fileIds!: string;
    //采购合同附件ids
    contractFileIds!: string;
    //供应商id
    supplierId!: string;
    //供应商
    supplierName!: string;
    //采购合同附件名称
    contractFileName!: string;
    //验收状态
    status!: number;
    //未验收金额
    notAcceptanceAmount!: number;
    //验收数量
    acceptanceNumber!: number;
    //未验收数量
    notAcceptanceNumber!: number;
}