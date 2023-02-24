/**
 * @Description 盘点任务
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-06 17:59:32
 */

import IDto from "../../lib/dto/IDto";
import AssetInventoryTaskDetail from "./detailModel";

export default class AssetInventoryTask {
    
    //主键id
    id!: string;
    //编号
    code!: string;
    //盘点计划id
    inventoryPlanId!: string;
    //合计金额
    sumTotalAmount : number = 0;
    //合计金额-未税
    sumTotalUntaxedAmount : number = 0;
    //合计金额-税额
    sumTotalTaxAmount : number = 0;
    //合计数量
    sumTotalNumber : number = 0;
    //申请日期
    applyTime!: string;
    //申请人
    createUserId!:string;
    //申请人
    createUserName!:string;
    createUserParentOrgId!:string;
    createUserParentOrgName!:string;
    createUserParentDeptId!:string;
    createUserParentDeptName!:string;
    

    detailList: Array<AssetInventoryTaskDetail> = new Array();

    assetParams: paramDto = new paramDto();
}

class paramDto extends IDto{
    inventoryId !:string ;
}