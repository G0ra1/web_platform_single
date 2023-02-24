/**
 * @Description 资产领用
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:16
 */

export default class AssetMaterialAccept {
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
    //说明
    explanation!: string;
    //任务实例Id
    taskInstId!: string;
    //父任务节点Id
    parentTaskNodeId!: string;
    //当前节点Id
    taskId!: string;
    //签收数量
    signNumber!: number;
    //未签收数量
    notSignNumber!: number;
    //派发数量
    distributeNumber!: number;
    //未派发数量
    notDistributeNumber!: number;
    //合计申请数量
    sumTotalNumber!: number;
    //使用人
    assetUserId!: string;
    //使用人
    assetUserName!: string;
    //使用人部门
    assetDeptId!: string;
    //使用人部门
    assetDeptName!: string;
    //使用人单位
    assetOrgId!: string;
    //使用人单位
    assetOrgName!: string;
}