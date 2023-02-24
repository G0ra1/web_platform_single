/**
 * @Description 原油项目客户维护
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-08 13:45:28
 */
import SmmHebooilClientDetail from"./modelDetail";
export default class SmmHebooilClient {
    //主键id
    id!: string;
    //项目编码
    projectCode!: string;
    //项目名称
    projectName!: string;
    //备注
    explanation!: string;
    smmHebooilClientDetailList: Array<SmmHebooilClientDetail> = [{}];
}