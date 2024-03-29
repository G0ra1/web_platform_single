/**
 * @Description 资产退还
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-28 15:39:16
 */

import IDto from "../../lib/dto/IDto";
import AssetMaterialRefundDetail from "./detailModel";

export default class AssetMaterialRefund {
    //主键
    id!: string;
    //编号
    code!: string;
    //借用id
    borrowId!: string;
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

    detailList: Array<AssetMaterialRefundDetail> = new Array();

    assetParams: ParamDto = new ParamDto();
}

class ParamDto extends IDto {
    //资产所属机构id
    assetOrgId!: string;
    classifyTypeCode !: string;
    classifyTypeName !: string;
}