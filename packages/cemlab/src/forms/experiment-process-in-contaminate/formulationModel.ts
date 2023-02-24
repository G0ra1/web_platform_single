/**
 * @Description 实验过程条件
 * @author 云数网讯 lihongyu@netwisd.com@netwisd.com
 * @date 2023-01-30 15:18:08
 */

export default class CemlabExperimentProcessContaminateFormulation {
    //主键
    id?: string;
    //实验过程ID
    experimentProcessId?: string;
    //配方材料
    recipeMaterialsDict?: string;
    //配方材料
    recipeMaterials?: string;
    //加量
    recipeQuantity?: number;
    //是否删除
    isDel?: number;
}