/**
 * @Description 物资购置验收
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:04
 */

export default class AssetPurchaseAccept {
    //主键
    id!: string;
    //编号
    code!: string;
    //验收类型
    acceptanceType!: number;
    //说明
    explanation!: string;
    //合计金额
    sumTotalAmount!: number;
    //合计金额-未税
    sumTotalUntaxedAmount!: number;
    //合计金额-税额
    sumTotalTaxAmount!: number;
    //合计申请数量
    sumTotalNumber!: number;
    //采购登记编号
    registerCode!: string;
    //采购登记Id
    registerId!: string;
    //审批通过时间
    auditSuccessTiem!: string;
    //camunda流程任务ID
    camundaTaskId!: string;
    //物资购置类型
    purchaseType!: number;
    //物资来源
    assetSource!: number;
    //申请时间
    applyTime!: string;
    //申请人ID
    applyUserId!: string;
    //申请人名称
    applyUserName!: string;
    //申请人机构ID
    applyUserOrgId!: string;
    //申请人机构名称
    applyUserOrgName!: string;
    //申请人部门ID
    applyUserDeptId!: string;
    //申请人部门名称
    applyUserDeptName!: string;
    //附件ids
    fileIds!: string;
    //采购合同id
    contractId!: string;
    //采购合同code
    contractCode!: string;
    //采购合同签订时间
    contractTime!: string;
    //采购合同附件ids
    contractFileIds!: string;
    //验收状态
    status!: number;
    //入库数量
    storageNumber!: number;
    //未入库数量
    notStorageNumber!: number;
    //未入库金额
    notStorageAmount!: number;
    //购置申请id
    applyId!: string;
}