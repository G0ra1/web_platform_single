/**
 * @Description 任务管理-内部通知单详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-23 14:09:27
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
