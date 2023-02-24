/**
 * @Description 物资
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-23 09:32:43
 */

export default class MdmItem {
    //主键
    id!: string;
    //全路径
    route!: string;
    //全路径名称
    routeName!: string;
    //物资名称
    itemName!: string;
    //物资编码(8位流水00000001-99999999)
    itemCode!: string;
    //分类id
    classifyId!: string;
    //分类名称
    classifyName!: string;
    //分类编码
    classifyCode!: string;
    //长描述
    desclong!: string;
    //段描述
    descshort!: string;
    //基本计量单位编码
    unitCode!: string;
    //基本计量单位名称
    unitName!: string;
    //状态
    state!: string;
    //规格
    specs!: string;
    //标准
    standard!: string;
    //材质
    materialQuality!: string;
    //批数据的UUID
    puuid!: string;
    //数据源id
    dataSourceId!: string;
    //数据源接入数据问题
    dataSourceState!: string;
    //是否验证完毕
    isCheck!: number;
    //验证说明
    checkExplanation!: string;
    //验证修改时间
    isAssetNumber!: string;
    //是否删除
    isDel!: number;
    //是否多计量
    isUnit!: number;
    skuList!: Array<ItemSkuVo>;

}
class ItemSkuVo {
    skuName!: string;
    classifyId!: string;
    classifyCode!: string;
    classifyName!: string;
    delFlag!: string;
    sort!: number;
}