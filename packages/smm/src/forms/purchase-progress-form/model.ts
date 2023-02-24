/**
 * @Description 二级物资集中采购项目进度情况表
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-13 16:10:03
 */
import SuppPurchaseProgressDetail from "./modelDetail";
import SuppPurchaseProductMix from "./modelMix";
export default class SuppPurchaseProgress {
  //主键
  id!: string | null;
  //年份
  itemTime!: string;
  progressId!: string;
  //大类名称
  materialsTypeName!: string;
  //大类编码
  materialsTypeCode!: string;
  //项目名称
  projectName!: string;
  //要求完成时间
  finishTime!: string;
  //组长单位名称
  unitName!: string;
  //组长单位id
  unitId!: string;
  //浮动范围
  floatRange!: number;
  //调价机制
  pricingMechanism!: string;
  //结果公告
  resultPublic!: string;
  //价格调整公示
  priceAdjustment!: string;
  //延期公告
  postponePublic!: string;
  //其他事项
  others!: string;
  //备注
  explanation!: string;
  //采购方式
  procurementMethodName!: string;
  //采购方式编码
  procurementMethodCode!: string;
  //任务实例id
  taskInstId!: string;
  //任务节点id
  taskNodeId!: string;
  //权限状态
  permissionStatus!: number;
  onePlatformSubmitTime!: string;
  submitStatus!: number;

  //当前进展
  currentProgressCode!: string;
  //当前进展
  currentProgressName!: string;

  //方案审批完成时间（一体化平台）
  onePlatformFinishTime!: string;
  //方案提交时间（招标管理平台）
  inviteBidsSubmitTime!: string;
  //方案审批完成时间（招标管理平台）
  inviteBidsFinishTime!: string;
  //招标文件确认时间
  inviteBidsConfirmTime!: string;
  //招标公告时间
  inviteBidsPublicTime!: string;
  //开标时间
  tenderOpenTime!: string;
  //招标结果公示时间
  inviteBidsResultPublicTime!: string;
  //招标结果完成审批时间
  resultFinishTime!: string;
  //评审报告提交时间（一体化平台）
  assessSubmitTime!: string;
  //评审报告审批完成时间（一体化平台）
  assessFinishTime!: string;
  //结果公告时间
  resultPublicTime!: string;
  //目录上载时间
  catalogUploadTime!: string;
  //目录id
  commodityId!: string;
  //备注
  explanation2!: string;
  //项目负责人
  projectLeader!: string;
  //项目负责人id
  projectLeaderId!: string;


  //产品构成
  productMix3!: string;
  //费用构成3
  expenditurePattern!: number;
  //状态
  status!: number;

  purchaseProductMixList: Array<SuppPurchaseProductMix> = new Array();
  purchaseProgressDetailList: Array<SuppPurchaseProgressDetail> = new Array()
}
export {
  SuppPurchaseProgress
}