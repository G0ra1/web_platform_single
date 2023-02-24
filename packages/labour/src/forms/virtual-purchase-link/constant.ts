import { h, ref } from 'vue'
import { NTag } from 'naive-ui'
//休息方式
const RestModeOptions = [
  {
    label: "单休",
    value: '1'
  },
  {
    label: "双休",
    value: '2'
  },
  {
    label: "不休",
    value: '3'
  },
]

const RestModeArry = ["", "单休", "双休", "不休"];

//单位
const UnitOptions = [
  {
    label: "人/天",
    value: '1'
  },
  {
    label: "人/月",
    value: '2'
  },
]

const UnitArry = ["", "人/天", "人/月"]


const InvoiceInfoColumn = [
  { field: 'taxrate', title: '税率', editRender: { enabled: true }, slots: { edit: 'taxrate_edit' },},
  { field: 'invoiceType', title: '发票类型', editRender: { enabled: true },  slots: {  edit: 'invoiceType_edit',  default: 'invoiceType_view',},},
  { field: 'workHourAmount', title: '工时时薪', editRender: { enabled: true },slots: { edit: 'workHourAmount_edit' }, },
  {  field: 'overtimeHourAmount', title: '加班时薪', editRender: { enabled: true }, slots: { edit: 'overtimeHourAmount_edit' },},
  {  field: 'workdayOvertimeCoefficient', title: '工作日加班倍数', editRender: { enabled: true }, slots: { edit: 'workdayOvertimeCoefficient_edit' },},
  {  field: 'dayOffOvertimeCoefficient', title: '休息日加班倍数', editRender: { enabled: true }, slots: { edit: 'dayOffOvertimeCoefficient_edit' },},
  {  field: 'legalDayOffOvertimeCoefficient',  title: '法定休假日加班倍数', editRender: { enabled: true }, slots: { edit: 'legalDayOffOvertimeCoefficient_edit' }, },
]

const UnitInfoColumn = [
  { field: 'outerDisciplineName',title: '岗位名称',editRender: { enabled: true },slots: { edit: 'outerDisciplineName_edit' },},
  {field: 'restMode',title: '休息方式', editRender: { enabled: true },slots: { edit: 'restMode_edit', default: 'restMode_view' },},
  {field: 'unit',title: '单位', editRender: { enabled: true }, slots: { edit: 'unit_edit', default: 'unit_view' },},
  { field: 'price', title: '价格', editRender: { enabled: true }, slots: { edit: 'price_edit',default: 'price_view'  }},
]
//合同类型
const contractTypeArray = ["", "框架合同", "常规合同", "项下订单"];
const PurchaseColumns =[
  { field: 'contractcode', title: '合同编码', align: 'center' },
  { field: 'contractname', title: '合同名称', align: 'center' },
  { field: 'partaname', title: '甲方', align: 'center' },
  { field: 'partbname', title: '乙方', align: 'center' },
  { field: 'purchasesubtype', title: '合同类型', align: 'center',
    slots:{
      default: ({ row }:any) => [h(
        NTag,
        { size: "small", type: "success", round: "round" } as {},
        { default: () => contractTypeArray[row.purchasesubtype] }
      )] as JSX.Element[]
    }
  },
]

export {  RestModeOptions, RestModeArry, UnitOptions, UnitArry,InvoiceInfoColumn,UnitInfoColumn,PurchaseColumns }