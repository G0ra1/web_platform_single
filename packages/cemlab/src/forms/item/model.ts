/**
 * @Description 字典项
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-13 10:40:43
 */

export default class DictItem {
    //主键
    id!: string;
    //所属字典类id
    dictId!: string;
    //字典编码
    dictCode!: string;
    //备注
    remark!: string;
    //排序值，默认升序
    sort!: number;
    //字典项名称
    dictItemName!: string;
    //字典项编码
    dictItemCode!: string;
    //是否启用
    isEnable!: number;
    //版本号
    version!: number;
}