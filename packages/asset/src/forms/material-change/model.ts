/**
 * @Description 资产信息变更
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:31
 */

export default class AssetMaterialChange {
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
    //审批通过时间
    auditSuccessTiem!: string;
    //camunda流程任务ID
    camundaTaskId!: string;
    //附件ids
    fileIds!: string;
    //合计数量
    sumTotalNumber!: number;
    //说明
    explanation!: string;
}