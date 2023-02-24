/**
 * @Description 实验管理-实验任务-查看任务详情
 * @author 云数网讯 lvchengming@netwisd.com@netwisd.com
 * @date 2023-01-09 12:09:27
 */


export default class CemlabExperimentSlurryFormula {
    //主键
    id?: string;
    //实验单ID
    experimentReceiptsId?: string;
    //实验条件ID
    experimentConditionId?: string;
    //配方材料
    recipeMaterialsDict?: string;
    //配方材料
    recipeMaterials?: string;
    //加量
    recipeQuantity?: number;
    //是否删除
    isDel?: number = 0;
}