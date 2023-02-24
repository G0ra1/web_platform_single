/**
 * @Description 资产调配
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-11-24 16:30:16
 */
import AssetMaterialDeployDetail from "./modelDetail";
import IDto from "../../lib/dto/IDto"
export default class AssetMaterialDeploy {
    //主键
    id!: string;
    //编号
    code!: string;
    //说明
    explanation!: string;
    //审批通过时间
    auditSuccessTiem!: string;
    //camunda流程任务ID
    camundaTaskId!: string;
    //借出单位id
    lendUnitId!: string;
    //需用部门id
    needDeptId!: string;
    //需用部门
    needDept!: string;
    //申请时间
    applyTime!: string;
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
    //类型
    type!: number;
    //类型名称
    typeName!: string;
    //出库数量
    deliveryNumber!: number;
    //未出库数量
    notDeliveryNumber!: number;
    //出库金额
    deliveryAmount!: number;
    //未出库金额
    notDeliveryAmount!: number;
    //调出单位
    deployUnit!: string;
    //调出单位id
    deployUnitId!: string;
    //调拨负责人id
    deployUserId!: string;
    //调拨负责人
    deployUser!: string;
    //调拨状态
    deployState!: string;
    //附件
    fileIds!:string;
    fileNames!:string;
    //例子，如：物资台账子表
    detailList: Array<AssetMaterialDeployDetail> = new Array();
    assetParams: MyAssetDto = new MyAssetDto();
}

//调用组件的参数类示例
class MyAssetDto extends IDto {
    assetOrgId!: string;
    usableNumber: number = 0;
}
export {
    MyAssetDto
}
