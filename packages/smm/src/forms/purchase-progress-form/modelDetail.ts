/**
 * @Description 二级物资集中采购项目进度情况详情
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-13 16:10:03
 */

export default class SuppPurchaseProgressDetail {
    //主键
    id!: string | null;
    //关联id
    progressId!: string;
    //当前进展
    currentProgressCode!: string;
    //当前进展
    currentProgressName!: string;
    //方案提交时间（一体化平台）
    onePlatformSubmitTime!: string;
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
}
export {
    SuppPurchaseProgressDetail
}