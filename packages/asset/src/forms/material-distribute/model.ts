/**
 * @Description 资产派发
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:22
 */

export default class AssetMaterialDistribute {
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
    //业务类型
    type!: string;
    //审批通过时间
    auditSuccessTiem!: string;
    //camunda流程任务ID
    camundaTaskId!: string;
    //派发类型
    distributeType!: number;
    //附件ids
    fileIds!: string;
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
    //来源id
    sourceId!: string;
    //来源code
    sourceCode!: string;
    //合计申请数量
    sumTotalNumber!: number;
    //未签收数量
    notSignNumber!: number;
    //状态
    status!: number;
    //说明
    explanation!: string;
}