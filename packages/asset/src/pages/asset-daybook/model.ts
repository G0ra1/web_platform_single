/**
 * @Description 资产流水表
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-27 10:53:55
 */

export default class AssetDaybook {
    //主键
    id!: string;
    //表单url
    formUrl!: string;
    //资产台账id
    assetsId!: string;
    //资产明细表id
    assetsDetailId!: string;
    //物资Id
    itemId!: string;
    //物资编码;物资编码
    itemCode!: string;
    //物资名称;物资名称
    itemName!: string;
    //业务类型;验收/领用等等
    type!: number;
}