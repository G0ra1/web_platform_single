import { Request, request } from '@platform/main'

/**
 * 请求后台查询需要展示的数据
 */
export function getChartList(_prames: any) {
  return request({
    url: `/cemlab/cemlabStatisticsAnalysisChart/list`,
    method: 'post',
    data: _prames
  })
}