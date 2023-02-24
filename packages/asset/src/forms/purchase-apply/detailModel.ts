/**
 * @Description 购置申请详情
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:33:52
 */

export default class AssetPurchaseApplyDetail {
    //主键
    id!: string;
    //购置申请id;购置申请id
    applyId!: string;
    //计划详情总表id;计划详情总表id
    planallId!: string;
    //全路径
    route!: string;
    //全路径名称
    routeName!: string;
    //物资分类编码
    classifyCode!: string;
    //物资分类名称
    classifyName!: string;
    //物资Id
    itemId!: string;
    //物资编码
    itemCode!: string;
    //物资名称
    itemName!: string;
    //物资长描述
    desclong!: string;
    //物资短描述
    descshort!: string;
    //物资单位编码
    unitCode!: string;
    //物资单位名称
    unitName!: string;
    //物资规格
    specs!: string;
    //物资标准
    standard!: string;
    //物资材质
    materialQuality!: string;
    //税率
    taxRate!: string;
    //税额
    taxAmount!: number;
    //申请数量
    applyNumber!: number;
    //申请含税单价
    applyAmount!: number;
    //申请不含税单价
    applyUntaxedAmount!: number;
    //申请含税总价
    applySumAmount!: number;
    //申请不含税总价
    applySumUntaxedAmount!: number;
    //用途
    purpose!: string;
    //说明
    explanation!: string;
    //计划年度
    planYear!: string;
    //购置申请code
    applyCode!: string;
    //分类id
    classifyId!: string;
    //物资类型
    itemType!: string;
    //采购登记数量
    registerNumber!: number;
    //未采购登记数量
    notRegisterNumber!: number;
    //采购登记金额
    registerSumAmount!: number;
    //未采购登记金额
    notRegisterSumAmount!: number;
    //购置验收数量
    acceptanceNumber!: number;
    //购置入库数量
    storageNumber!: number;
    //sku编码
    skuCode!: string;
    //sku全id
    skuFullId!: string;
    //sku全名称
    skuFullName!: string;
    //申请单价税额
    applyTaxAmount!: number;
    //申请总价税额
    applySumTaxAmount!: number;
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
    //审批状态
    status!: number;
}