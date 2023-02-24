/**
 * @Description 资产借用
 * @author 云数网讯 lhy@netwisd.com
 * @date 2022-12-01 12:18:53
 */
import IDto from "../../lib/dto/IDto";
import AssetBorrowDeliveryDetail from "./detailModel";
 
export default class materialBorrowDelivery {
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
    type! : number;
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
    //退库数量
    deliveryNumber!: number;
    //未退库数量
    notDeliveryNumber!: number;
    //借用申请编号
    deployCode!: string;
    //借用申请Id
    deployId!: string;
    //出库明细
    detailList: Array<AssetBorrowDeliveryDetail> = new Array(); 
    //出库明细传参
    assetParams: paramDto = new paramDto();
}

class paramDto extends IDto{
    borrowId !:string ;
}