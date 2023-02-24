/**
 * @Description 任务管理-内部通知单详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-23 14:09:27
 */

export default class CemlabExperimentSlurryDemand {
  //主键
  id?: string;
  //实验单ID
  experimentReceiptsId?: string;
  //浆体类型;1领浆2中间浆3尾浆
  slurryType?: number;
  //密度
  density?: string;
  //滤失量
  filterLoss?: string;
  //游离液
  freeFluid?: string;
  //水泥浆稠度
  cementConsistency?: string;
  //稠化时间
  thickeningTime?: string;
  //抗压强度
  compressiveStrength?: string;
  //抗压强度时间
  compressiveStrengthTime?: string;
  //流动度
  fluidity?: string;
  //是否删除
  isDel?: number = 0;
}
