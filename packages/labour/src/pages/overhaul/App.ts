import { RequestPaging, VxeHelper, Page } from '@platform/main'
import { count } from 'console'

const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { field: 'orgname', title: '单位名称', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'overhaulRotation', title: '大修轮次', showHeaderOverflow: true, width: '300px', align: 'center', },
      { field: 'overhaulCode', title: '大修编码', showHeaderOverflow: true, width: '300px', align: 'center', },
      { field: 'overhaulName', title: '大修名称', showHeaderOverflow: true, width: '300px', align: 'center', },
      { field: 'month', title: '月份', showHeaderOverflow: true, width: '200px', align: 'center', },
      { field: 'ownerUnit', title: '业务单位', showHeaderOverflow: true, width: '300px', align: 'center', },
      { field: 'planWorkperiod', title: '计划工期', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'factWorkperiod', title: '实际工期', showHeaderOverflow: true, width: '200px', align: 'center',},
      { field: 'planStartTime', title: '计划开始时间', showHeaderOverflow: true, width: '300px', align: 'center' },
      { field: 'planEndTime', title: '计划结束时间', showHeaderOverflow: true, width: '300px', align: 'center' },
      { field: 'factStartTime', title: '实际开始时间', showHeaderOverflow: true, width: '300px', align: 'center' },
      { field: 'factEndTime', title: '实际结束时间', showHeaderOverflow: true, width: '300px', align: 'center' },
    ]
  }, 
  new RequestPaging(
    '/labour/labourOverhaul/page',
    'post'
  )
)


const refresh = () => {
  console.log("zheshi refresh");
  reset({})
}

export {
  bind, gridRef, filterData, query, refresh, reset
}