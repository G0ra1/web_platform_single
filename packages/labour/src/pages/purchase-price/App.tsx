import { RequestPaging, VxeHelper, Page,NwIcon } from '@platform/main'
import { h, ref } from 'vue'
import { NTag } from 'naive-ui'
import { VxeTablePropTypes } from 'vxe-table'
import { auditStatusArray } from "../../lib/constant/Constant";

const { bind, gridRef, filterData, query, reset,gridEvents  } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { type: 'checkbox', width: '50px', },
      { field: 'contractName', title: '合同名称', showHeaderOverflow: true, width: '400px', align: 'center', },
      { field: 'contractCode', title: '合同编号', showHeaderOverflow: true, width: '400px', align: 'center', },
      { field: 'outerDisciplineName', title: '专业', showHeaderOverflow: true, width: '200px', align: 'center' },
      {
        field: 'restMode', title: '休息方式', showHeaderOverflow: true, width: '150px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: "success", round: "round" } as {},
            { default: () => restModeArray[row.restMode] }
          )] as JSX.Element[]
        }
      },
      {
        field: 'unit', title: '单价类别', showHeaderOverflow: true, width: '150px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: "success", round: "round" } as {},
            { default: () => unitArray[row.unit] }
          )] as JSX.Element[]
        }
      },
      { field: 'price', title: '价格', showHeaderOverflow: true, width: '150px', align: 'center' },
      {
        field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, width: '120px', align: 'center',
        slots: {
          default: ({ row }) => [h(
              NTag,
              {
                  size: "small", type: ["error","info", "success", ,"warning", , ''][row.auditStatus], round: "round", class: "grid-ntag"
              } as {},
              {
                  default: () =>auditStatusArray[row.auditStatus] ,
                  icon: () => h(
                      NwIcon,
                      {
                          name: ["icon-n-n-error", "icon-n-n-mark", "icon-n-n-check_fill", "icon-n-n-warning", "icon-n-n-mark"][row.auditStatus]
                      }
                  )

              }
          )] as JSX.Element[]
        }
      }
    ],
  },
  new RequestPaging(
    '/purchasecontract/purchasePrice/page',
    'post'
  ),
)

//休息方式
const restModeArray = ["", "单休", "双休", "不休"];
//单价类别
const unitArray = ["", "人/天", "人/月"];

//合同详情信息
let md = Page.getMenuData();
const purchaseContractDetail = ((data) => ({
  contractid: data.contractid,
  contractcode: data.contractcode,
  contractname: data.contractname,
  contractamount: data.contractamount,
  partaname:data.partaname
}))(JSON.parse(Page.getMenuCache()))

//点击新增按钮参数、编辑按钮参数
let addParamsArry = ref([purchaseContractDetail]), editParamsArry = ref<Array<{[a:string]:any}>>([{records:0}]);
//选中事件(组装修改的参数信息)
const checkboxChangeEvent = (d:any) => {
  console.log(editParamsArry)
  console.log(d)
  
  editParamsArry.value = [
    {
      ...purchaseContractDetail,
      priceList: gridRef.value?.getCheckboxRecords(),
      upPriceIds: gridRef.value?.getCheckboxRecords().map((row) => row.id).join(),
      records:d.records.length
    }
  ]
}

//刷新页面
const refresh = () => {
  //合同Id
  reset({
    contractId: md.id
  })
}

//是否可以勾选
const checkboxConfig = {
  checkField: 'checked',
  trigger: 'row',
  reserve:true,
  checkMethod: ({ row }) => row.auditStatus === 2 
} as VxeTablePropTypes.CheckboxConfig

const gridSearchRef = ref()
export {
  bind, gridRef, filterData, query, refresh, addParamsArry, editParamsArry, checkboxChangeEvent, checkboxConfig,gridSearchRef, gridEvents
}
