/**
 * @Description 其它石油产品客户基础数据维护
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-14 11:00:33
 */
import SmmHebooilProductDetail from"./modelDetail";

export default class SmmHebooilProduct {
    //主键id
    id!: string;
    //产品编码
    productCode!: string;
    //产品名称
    productName!: string;
    //备注
    explanation!: string;
    smmHebooilProductDetailList: Array<SmmHebooilProductDetail> = [{}];

}