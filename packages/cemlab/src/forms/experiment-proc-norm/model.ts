/**
 * @Description 实验流程规范
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-13 09:49:36
 */

export default class CemlabExperimentProcNorm {
    //主键
    id!: string;
    //标题
    title!: string;
    //类型;1仪器操作保养规范2实验操作规范3成果资料管理
    type!: number;
    //备注
    remarks!: string;
    //是否设为首页轮播
    isFlashview!: number;
    //附件ID
    filesId!: string;
    //附件名称
    filesName!: string;
    //是否删除
    isDel!: number;
}