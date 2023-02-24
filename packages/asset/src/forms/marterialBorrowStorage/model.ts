/**
 * @Description 资产借用
 * @author 云数网讯 lhy@netwisd.com
 * @date 2022-12-01 12:18:53
 */
import IDto from "../../lib/dto/IDto";
import PurchaseBorrowStorageDetail from "./detailModel";
 
export default class purchaseBorrowStorage {
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
    //合计金额
    sumTotalAmount!: number;
    //合计金额-未税
    sumTotalUntaxedAmount!: number;
    //合计金额-税额
    sumTotalTaxAmount!: number;
    //合计数量
    sumTotalNumber!: number;
    //购置验收数量
    sumAcceptanceNumber!: number;
    //购置验收编号
    acceptanceCode!: string;
    //购置验收Id
    acceptanceId!: number;
    //物资购置类型
    purchaseType!: number;
    //说明
    explanation!: string;
    //申请时间
    applyTime!: string;
    //物项来源
    assetSource!: number;
    //物项来源名称
    assetSourceName!: string;
    //附件ids
    fileIds!: string;
    //借用申请Id
    deployId!: string;
    //类型
    type!: number;
    //类型名称
    typeName!: string;
    //出库明细
    detailList: Array<PurchaseBorrowStorageDetail> = new Array(); 
    //出库明细传参
    assetParams: paramDto = new paramDto();
}

class paramDto extends IDto{
    deployId !:string ;
}