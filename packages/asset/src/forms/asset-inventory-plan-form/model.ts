/**
 * @Description 物资盘点
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-11-28 18:34:31
 */

import IDto from "../../lib/dto/IDto";
import InventoryPlanDetail from "./detailModel";

export default class AssetInventoryPlan {
    //主键
    id!: string;
    //编号
    code!: string;
    //审批通过时间
    auditSuccessTiem!: string;
    //camunda流程任务ID
    camundaTaskId!: string;
    //盘点年度
    inventoryYear!: string;
    //申请日期
    applyTime!: string;
    //计划总数量
    sumTotalNumber : number = 0;
    //完成数量
    finishNumber : number = 0;
    //未完成数量
    notFinishNumber : number = 0;
    //申请人
    createUserId!:string;
    //申请人
    createUserName!:string;
    createUserParentOrgId!:string;
    createUserParentOrgName!:string;
    createUserParentDeptId!:string;
    createUserParentDeptName!:string;

    inventoryTypeCode !:string;
    inventoryTypeName !:string;

    inventoryUnitId !:string;
    inventoryUnitName !:string;

    detailList: Array<InventoryPlanDetail> = new Array();

    assetParams: ParamDto = new ParamDto();
}

class ParamDto extends IDto{
    classifyTypeCode !: string;
    classifyTypeName !: string;
}