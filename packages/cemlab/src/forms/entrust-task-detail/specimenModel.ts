export default class CemlabExperimentSpecimen {
    //主键
    id?: string;
    //实验单ID
    experimentReceiptsId?: string;
    //样品类型;1样品2附带样品
    type?: number;
    //客户名称
    customerNameDict?: string;
    //客户名称
    customerName?: string;
    //检测方法标准
    detectionMethodDict?: string;
    //检测方法标准
    detectionMethod?: string;
    //样品名称
    specimenName?: string;
    //样品编号
    specimenCode?: string;
    //样品材质
    specimenMaterial?: string;
    //样品属性
    specimenAttribute?: string;
    //是否删除
    isDel?: number;
}