/**
 * @Description 轻烃项目客户维护
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2023-02-13 18:30:00
 */
import SmmHebooilNglClientDetail from"./modelDetail";

export default class SmmHebooilNglClient {
    //主键id
    id!: string;
    //项目编码
    projectCode!: string;
    //项目名称
    projectName!: string;
    //备注
    explanation!: string;
    smmHebooilNglClientDetailList: Array<SmmHebooilNglClientDetail> = [{}];
}