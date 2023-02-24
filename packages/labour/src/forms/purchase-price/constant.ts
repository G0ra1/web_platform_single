//子表对应的列信息
const PurchasePriceColumn = [
  { type: 'seq', width: 50 },
  {
    field: 'outerDisciplineName',
    title: '岗位名称',
    editRender: { enabled: true },
    slots: { edit: 'outerDisciplineName_edit' },
  },
  {
    field: 'restMode',
    title: '休息方式',
    editRender: { enabled: true },
    slots: { edit: 'restMode_edit', default: 'restMode_view' },
  },
  {
    field: 'unit',
    title: '单位',
    editRender: { enabled: true },
    slots: { edit: 'unit_edit', default: 'unit_view' },
  },
  {
    field: 'price',
    title: '价格',
    editRender: { enabled: true },
    slots: { edit: 'price_edit' },
  },
]

const PurchasePriceColumnOptions = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 450,
}

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

export { PurchasePriceColumn, RestModeOptions, RestModeArry, UnitOptions, UnitArry, PurchasePriceColumnOptions }