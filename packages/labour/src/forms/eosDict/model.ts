/**
 * @Description 字典
 * @author 云数网讯 Panfakun@netwisd.com
 * @date 2022-11-24 10:44:32
 */

export default class LabourEosDict {
    //主键
    id!: string;
    //保存默认自建
    source: string = "self_build";
    //字典类型id
    dicttypeid!: string;
    //字典对应的值
    dictid!: string;
    //字典对应的显示名称
    dictname!: string;
    //状态
    status!: number;
    //排序序号
    sortno!: number;
    //排序
    ranks!: number;
    //字典父id
    parentid!: string;
    //排序层级编码
    seqno!: string;
    //
    filter1!: string;
    //
    filter2!: string;
    //同步时间
    synctime!: string;
}