import { RequestPaging, VxeHelper, Page } from '@platform/main'
import { h } from 'vue'
import { NTag } from 'naive-ui'

const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { field: 'contractname', title: '合同名称', showHeaderOverflow: true, width: '500px', align: 'center' },
      {field: 'contractcode', title: '合同编号', showHeaderOverflow: true, width: '300px', align: 'center',},
      { field: 'organname', title: '所属公司', showHeaderOverflow: true, width: '200px', align: 'center' },
      { 
        field: 'type', title: '合同类型', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
              NTag,
              { size: "small", type: "success", round:"round"} as {},
              { default: () => contractTypeArray[row.type] }
          )] as JSX.Element[]
        }
      },
      { field: 'contractstatusname', title: '状态', showHeaderOverflow: true, width: '100px', align: 'center' },
      { field: 'contracttypename', title: '类型', showHeaderOverflow: true, width: '100px', align: 'center' },
      { field: 'ownercompanyname', title: '业务单位', showHeaderOverflow: true, width: '300px', align: 'center' },
      { field: 'signdate', title: '签订日期', showHeaderOverflow: true, width: '120px', align: 'center' },
      { field: 'startdate', title: '开始日期', showHeaderOverflow: true, width: '120px', align: 'center' },
      { field: 'finishdate', title: '完成日期', showHeaderOverflow: true, width: '120px', align: 'center' },
      { field: 'closedate', title: '关闭日期', showHeaderOverflow: true, width: '120px', align: 'center' },
      { field: 'estimateinitamount', title: '初始额(含税)', showHeaderOverflow: true, width: '200px', align: 'center'},
      { field: 'estimateinitamountnotax', title: '初始额(不含税)', showHeaderOverflow: true, width: '200px', align: 'center'},
      { field: 'changeamout', title: '变更额(含税)', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'changeamoutnotax', title: '变更额(不含税)', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'contractamount', title: '合同总额(含税)', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'contractamountnotax', title: '合同总额(不含税)', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'estimatesettlementamount', title: '预计计算成本', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'actualsettlementamount', title: '实际计算成本', showHeaderOverflow: true, width: '200px', align: 'center' },
    ]
  }, 
  new RequestPaging(
    '/workcontract/page',
    'post'
  )
)

//合同类型
const contractTypeArray = ["", "框架合同", "非框架合同", "子合同", "子订单"];


let md = Page.getMenuData();
const refresh = () => {
  reset(
    {
      types: "3,4", //子合同子订单
      parentid: md.id //框架合同Id
    }
  )
}

export {
  bind, gridRef, filterData, query, refresh, reset
}