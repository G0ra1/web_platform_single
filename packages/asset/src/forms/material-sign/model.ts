/**
 * @Description 资产签收
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:34:27
 */

export default class AssetMaterialSign {
    //主键
    id!: string;
    //编号
    code!: string;
    //签收类型;派发签收、
    signType!: number;
    //任务id
    taskId!: string;
    //对应业务id;派发id、或其他业务id
    businessId!: string;
    //签收人id
    signUserId!: string;
    //签收人姓名
    signUserName!: string;
    //签收人父级机构id
    signUserParentOrgId!: string;
    //签收人父级机构名称
    signUserParentOrgName!: string;
    //签收人父级部门id
    signUserParentDeptId!: string;
    //签收人父级部门名称
    signUserParentDeptName!: string;
    //签收人父级组织全路径id
    signUserOrgFullId!: string;
    //签收时间
    signTime!: string;
    //附件ids
    fileIds!: string;
    //审批通过时间
    auditSuccessTiem!: string;
    //camunda流程任务ID
    camundaTaskId!: string;
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
    //派发类型
    distributeType!: number;
    //来源id；领用id
    sourceId!: string;
    //来源code
    sourceCode!: string;
    //说明
    explanation!: string;
    //合计数量
    sumTotalNumber!: number;
}