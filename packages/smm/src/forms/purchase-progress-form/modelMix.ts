/**
 * @Description 二级物资集中采购产品结构表
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-13 16:10:03
 */

export default class SuppPurchaseProductMix {
    //主键
    id!: string;
    //关联id
    progressId!: string;
    //产品构成
    productMix3!: string;
    //费用构成3
    expenditurePattern!: number;
    //状态
    status!: number;
}
export {
    SuppPurchaseProductMix
}