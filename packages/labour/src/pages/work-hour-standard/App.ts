import { RequestPaging, VxeHelper, NwFunctionPredefine } from '@platform/main'
import { h } from 'vue'
import { NSwitch } from 'naive-ui'
import { updateIsEnableApi } from "./api/index";

const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { field: 'hourSalary', title: '工时结算时薪', showHeaderOverflow: true, width: '150px', align: 'center', },
      { field: 'workHour', title: '每日工作时长', showHeaderOverflow: true, width: '150px', align: 'center', },
      { field: 'coefficient', title: '加班系数', showHeaderOverflow: true, width: '150px', align: 'center', },
      { 
        field: 'isEnable', title: '启用状态', showHeaderOverflow: true, width: '150px', align: 'center', 
        slots: {
          default: ({ row }) => [h(
              NSwitch,
              {
                value: row.isEnable === 1 ? true : false,
                onUpdateValue: _ =>  updateIsEnable(row.id) ,
              },
              {
                checked: () => isEnableArry[row.isEnable],
                unchecked: () => isEnableArry[row.isEnable],
              }
          )] as JSX.Element[]
        }
      },
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
                    { code: "work-hour-standard_edit", params: [row] }
                );
                let del = h(
                    NwFunctionPredefine,
                    { code: "work-hour-standard_del", params: [row] }
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

//启用状态
const isEnableArry = [ "禁用", "启用"];

let updateIsEnable = async (id: string) => {
  const result = await updateIsEnableApi(id)
  if (result) {
    reset({})
  }
}


const refresh = () => {
  reset({})
}

export {
  bind, gridRef, filterData, query, refresh, reset
}