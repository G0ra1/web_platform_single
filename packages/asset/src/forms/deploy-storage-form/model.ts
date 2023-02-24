/**
 * @Description 物资调拨入库
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-22 15:30:24
 */
import IDto from "../../lib/dto/IDto"
import AssetPurchaseStorageDetail from"./modelDetail";
export default class AssetPurchaseStorage {
    //主键
    id!: string;
    //申请编号
    code!: string;
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
    //合计金额
    sumTotalAmount!: number;
    //合计金额-未税
    sumTotalUntaxedAmount!: number;
    //合计金额-税额
    sumTotalTaxAmount!: number;
    //合计申请数量
    sumTotalNumber!: number;
    //购置验收数量
    sumAcceptanceNumber!: number;
    //购置验收编号
    acceptanceCode!: string;
    //购置验收Id
    acceptanceId!: string;
    //说明
    explanation!: string;
    //物资购置类型
    purchaseType!: number;
    //物项来源
    assetSource!: string;
    //物项来源名称
    assetSourceName!: string;
    //申请时间
    applyTime!: string;
    //附件ids
    fileIds!: string;
    deployId!: string;
    detailList: Array<AssetPurchaseStorageDetail> = new Array();
    assetParams: MyAssetDto = new MyAssetDto();

}
class MyAssetDto extends IDto {
    assetOrgId!: string;
    notStorageNumber: number = 0;
}
export {
    MyAssetDto
}