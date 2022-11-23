import { RequestPaging, VxeHelper, NwFunctionPredefine } from '@platform/main'
import { h } from 'vue'

const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { field: 'hourSalary', title: '工时结算时薪', showHeaderOverflow: true, width: '200px', align: 'center', },
      { field: 'workHour', title: '每日工作时长', showHeaderOverflow: true, width: '200px', align: 'center', },
      { field: 'coefficient', title: '加班系数', showHeaderOverflow: true, width: '200px', align: 'center', },
      { field: 'remark', title: '说明', showHeaderOverflow: true, width: '500px', align: 'center', showOverflow: true },
      {
        title: '操作',
        showHeaderOverflow: true,
        width: '300px', 
        align: 'center',
        slots: {
            default: ({ row }) => {
                let edit = h(
                    NwFunctionPredefine,
                    { code: "labourSuppUserForm_edit", params: [row] }
                );
                let del = h(
                    NwFunctionPredefine,
                    { code: "labourSuppUserForm_del", params: [row] }
                );
                return [edit, del]
            }
        },
    }
    ]
  }, 
  new RequestPaging(
    '/labour/workHourStandard/page',
    'post'
  )
)


const refresh = () => {
  reset({})
}

export {
  bind, gridRef, filterData, query, refresh, reset
}