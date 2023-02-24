/**
 * @Description 储油站基础数据维护
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-09 15:57:40
 */
import SmmHboilDepotDetail from"./modelDetail";
export default class SmmHboilDepot {
    //主键id
    id!: string;
    //销售方编码
    dictitemCode!: string;
    //销售方名称
    dictitemName!: string;
    //备注
    explanation!: string;
    smmHboilDepotDetailList: Array<SmmHboilDepotDetail> = [{}];
}