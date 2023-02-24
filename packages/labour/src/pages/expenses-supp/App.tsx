import { RequestPaging, VxeHelper, Page,NwIcon,NwFunctionPredefine } from '@platform/main'
import { h, ref } from 'vue'
import { NTag } from 'naive-ui'
import { auditStatusArray } from "../../lib/constant/Constant";


const { bind, gridRef, filterData, query, reset, gridEvents } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { field: 'suppcode', title: '填报编号', showHeaderOverflow: true, showOverflow:true, width: '180px', align: 'center', 
      slots:{
        default: ({ row }) => {
            return h(
                NwFunctionPredefine,
                { code: "expensesSuppDetail", params: [row] },
                {unauth:()=>{ return row.suppcode },auth:(fn:any)=>{
                    return [
                        h(
                            'a',
                            {
                                href: 'javascript:void(0)',
                                style: 'text-decoration: none',
                                onClick: () => {
                                   fn()
                                }
                            },
                            { default: () => row.suppcode }
                        )
                    ]
                }}
            )
        }
    }
      },
      { field: 'suppOrgName', title: '供应商名称', showHeaderOverflow: true, showOverflow:true, width: '250px', align: 'center', },
      { field: 'contractWorkCode', title: '承包合同编号', showHeaderOverflow: true, showOverflow:true,  align: 'center' },
      { field: 'contractWorkName', title: '承包合同名称', showHeaderOverflow: true, showOverflow:true, width: '300px', align: 'center' },
      { field: 'virtualPurchaseName', title: '虚拟订单名称', showHeaderOverflow: true, showOverflow:true, align: 'center' },
      { field: 'fillDateTime', title: '填报时间', showHeaderOverflow: true, showOverflow:true, width: '200px', align: 'center' },
      {
        field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, showOverflow:true, width: '120px', align: 'center',
        slots: {
          default: ({ row }) => [h(
              NTag,
              {
                  size: "small", type: ["warning", "info", "success", "error", ''][row.auditStatus], round: "round", class: "grid-ntag"
              } as {},
              {
                  default: () =>auditStatusArray[row.auditStatus] ,
                  icon: () => h(
                      NwIcon,
                      {
                          name: ["icon-n-n-warning", "icon-n-n-mark", "icon-n-n-check_fill", "icon-n-n-error", "icon-n-n-mark"][row.auditStatus]
                      }
                  )

              }
          )] as JSX.Element[]
        }
      }
    ]
  },
  new RequestPaging(
    '/labour/expensesSupp/page',
    'post'
  )
)

let md = Page.getMenuData();
const refresh = () => {
  reset(
    {
      planId: md.id
    }
  )
}
//填报按钮参数信息
let addArryParams = ref([{
  planId: md.id
}]);
const gridSearchRef = ref()
const gridSearchOptions = ref()
export {
  bind, gridRef, filterData, query, refresh, reset, addArryParams, gridSearchRef, gridEvents
}