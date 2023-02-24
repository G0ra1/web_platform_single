/**
 * @Description 资产出库管理
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-06 13:43:55
 */
import AssetMaterialDeliveryDetail from "./modelDetail";
import IDto from "../../lib/dto/IDto"
export default class AssetMaterialDelivery {
    //主键
    id!: string;
    //申请编号
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
    //类型
    type!: number;
    //类型名称
    typeName!: string;
    //退库数量
    withdrawalNumber!: number;
    //未退库数量
    notWithdrawalNumber!: number;
    //退库金额
    withdrawalAmount!: number;
    //未退库金额
    notWithdrawalAmount!: number;
    //调拨申请编号
    deployCode!: string;
    //说明
    explanation!: string;
    //调拨申请Id
    deployId!: string;
    detailList: Array<AssetMaterialDeliveryDetail> = new Array();
    assetParams: MyAssetDto = new MyAssetDto();
}
class MyAssetDto extends IDto {
    //可以扩展或者覆盖父类的字段
    usableNumber: number = 0;
    deployId!: string;


}
export {
    MyAssetDto
}