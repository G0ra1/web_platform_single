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

//合同类型
const contractTypeArray = ["", "框架合同", "非框架合同", "子合同", "子订单"];

const WorkContractColumns = [
  { field: 'contractcode', title: '合同编码' , align: 'center'},
  { field: 'contractname', title: '合同名称', align: 'center' },
  { field: 'ownercompanyname', title: '业主单位', align: 'center' },
  { field: 'organname', title: '机构名称', align: 'center' },
  { field: 'type', title: '合同类型', align: 'center',
  slots: {
    default: ({ row }:any) => [h(
      NTag,
      { size: "small", type: "success", round: "round" } as {},
      { default: () => contractTypeArray[row.type] }
    )] as JSX.Element[]
  }
  },
]


export {  RestModeOptions, RestModeArry, UnitOptions, UnitArry,WorkContractColumns }