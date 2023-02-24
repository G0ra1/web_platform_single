/**
 * @Description 知识产权登记
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2023-01-10 18:08:35
 */

export default class AssetPropertyRegister {
    //主键
    id!: string;
    //申请日期
    applyTime!: string;
    //知识产权名称
    name!: string;
    //知识产权编号
    code!: string;
    //发明人id
    inventUserId!: string;
    //发明人名称
    inventUserName!: string;
    //产权人id
    propertyUserId!: string;
    //产权人名称
    propertyUserName!: string;
    //编制单位
    applyUnitId!: string;
    //编制单位
    applyUnitName!: string;
    //申请人id
    applyUserId!: string;
    //申请人名称
    applyUserName!: string;
    //申请日期
    applyDate!: string;
    //授权日期
    authDate!: string;
    //有效期
    validPeriod!: string;
    //类别code
    typeCode!: number;
    //类别
    typeName!: string;
    //获得形式code
    methodCode!: number;
    //获得形式
    methodName!: string;
}