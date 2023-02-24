import { h } from "vue"
import { NButton, NDatePicker, NInput, NInputNumber, NTag, NUpload } from "naive-ui"
import { yesNoArray } from "../../lib/constant/Constant";


//体检费列信息
const ExaminationColumn = [
  { type: 'seq', width: 50 },
  { field: 'suppUserName', title: '姓名', editRender: { enabled: false }, },
  { field: 'banName', title: '班组名称', editRender: { enabled: false }, },
  { field: 'suppOrgName', title: '供应商名称', editRender: { enabled: false }, },
  { field: 'idCard', title: '身份证号', editRender: { enabled: false }, },
  {
    field: 'examinationCost', title: '体检费用', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInputNumber,
        {
          placeholder: "体检费用", min: 0, value: row.examinationCost, precision:2, 
          onUpdateValue: (d: number) => row.examinationCost = d,
        } as {},
      )],
      default: ({ row }: any) => row.examinationCost
    }
  },
  {
    field: 'remark', title: '备注', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInput,
        {
          size: "small", type: "success", round: "round", placeholder: "备注", value: row.remark,
          autofocus: '.vxe-input--inner',
          onUpdateValue: (d: string) => row.remark = d,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.remark
    }
  },
  {
    field: 'attachment', title: '附件信息', showOverflow: "title", editRender: { enabled: true },
    slots: {
      edit: 'attachment_edit',
      default: 'attachment_view'
    }
  },
]

//核酸检测费信息
const NucleicacidColumn = [
  { type: 'seq', width: 50 },
  { field: 'suppUserName', title: '姓名', width: 80, editRender: { enabled: false }, },
  { field: 'banName', title: '班组名称', width: 100, editRender: { enabled: false }, },
  { field: 'suppOrgName', title: '供应商名称', editRender: { enabled: false }, },
  { field: 'idCard', title: '身份证号', editRender: { enabled: false }, },
  {
    field: 'nucleicAcidReachCost', title: '到场核酸检测费', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInputNumber,
        {
          placeholder: "到场核酸检测费", min: 0, value: row.nucleicAcidReachCost, precision:2, 
          onUpdateValue: (d: string) => row.nucleicAcidReachCost = d,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.nucleicAcidReachCost
    }
  },
  {
    field: 'nucleicAcidBackCost', title: '返程核酸检测费', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInputNumber,
        {
          placeholder: "返程核酸检测费", min: 0, value: row.nucleicAcidBackCost, precision:2, 
          onUpdateValue: (d: string) => row.nucleicAcidBackCost = d,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.nucleicAcidBackCost
    }
  },
  {
    field: 'nucleicAcidTotalCost', title: '合计核酸检测费', width: 150, editRender: { enabled: false },
    slots: {
      default: ({ row }: any) => {
        row.nucleicAcidTotalCost = (row.nucleicAcidReachCost || 0) + (row.nucleicAcidBackCost || 0)
        return row.nucleicAcidTotalCost
      }
    }
  },
  {
    field: 'remark', title: '备注', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInput,
        {
          size: "small", type: "success", round: "round", placeholder: "备注", value: row.remark,
          onUpdateValue: (d: string) => row.remark = d,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.remark
    }
  },
  {
    field: 'attachment', title: '附件信息', showOverflow: "title", editRender: { enabled: true },
    slots: {
      edit: 'attachment_edit',
      default: 'attachment_view'
    }
  },
]

//差旅费信息
const TravelColumn = [
  { type: 'seq', width: 50 },
  { field: 'suppUserName', title: '姓名', width: '80px', editRender: { enabled: false }, },
  { field: 'banName', title: '班组名称', width: '100px', editRender: { enabled: false }, },
  { field: 'suppOrgName', title: '供应商名称', width: '200px', editRender: { enabled: false }, },
  { field: 'idCard', title: '身份证号', width: '200px', editRender: { enabled: false }, },
  {
    field: 'startingCity', title: '出发地点', width: '200px', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInput,
        {
          size: "small", type: "success", round: "round", placeholder: "出发地点", value: row.startingCity,
          onUpdateValue: (d: string) => row.startingCity = d,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.startingCity
    }
  },
  {
    field: 'arriveCity', title: '到达地点', width: '200px', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInput,
        {
          size: "small", type: "success", round: "round", autofocus: true, placeholder: "到达地点", value: row.arriveCity,
          onUpdateValue: (d: string) => row.arriveCity = d,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.arriveCity
    }
  },
  {
    field: 'startingDate', title: '出发时间', width: '200px', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NDatePicker,
        {
          type: "date", placeholder: "出发时间", formattedValue: row.startingDate,
          onUpdateFormattedValue: (value: string) => row.startingDate = value,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.startingDate
    }
  },
  {
    field: 'arriveDate', title: '到达时间', width: '200px', editRender: { enabled: true }, slots: {
      edit: ({ row }: any) => [h(
        NDatePicker,
        {
          type: "date", placeholder: "到达时间", formattedValue: row.arriveDate,
          onUpdateFormattedValue: (value: string) => row.arriveDate = value,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.arriveDate
    }
  },
  {
    field: 'vehicle', title: '交通工具', width: '200px', editRender: { enabled: true },
        slots: {
          default: 'vehicle_view',
          edit: 'vehicle_edit',
        }
  },
  {
    field: 'ticketAmount', title: '票据金额', width: '200px', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInputNumber,
        {
          placeholder: "票据金额", min: 0, value: row.ticketAmount, precision:2, 
          onUpdateValue: (d: string) => row.ticketAmount = d,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.ticketAmount
    }
  },
  {
    field: 'accommodationAmount', title: '住宿费', width: '200px', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInputNumber,
        {
          placeholder: "住宿费", min: 0, value: row.accommodationAmount, precision:2, 
          onUpdateValue: (d: string) => row.accommodationAmount = d,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.accommodationAmount
    }
  },
  {
    field: 'totalAmount', title: '合计金额', width: '200px', editRender: { enabled: false },
    slots: {
      default: ({ row }: any) => {
        row.totalAmount = (row.accommodationAmount || 0) + (row.ticketAmount || 0)
        return row.totalAmount
      }
    }
  },
  {
    field: 'remark', title: '备注', width: '200px', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NInput,
        {
          size: "small", type: "success", round: "round", placeholder: "备注", value: row.remark,
          onUpdateValue: (d: string) => row.remark = d,
        } as {},
      )] as JSX.Element[],
      default: ({ row }: any) => row.remark
    }
  },
  {
    field: 'attachment', title: '附件信息', width: '300px', showOverflow: "title", editRender: { enabled: true },
    slots: {
      edit: 'attachment_edit',
      default: 'attachment_view'
    }
  },
]

//选择人员信息
const SuppUserChooseColumn = [
  { field: 'suppUserName', title: '姓名', width: '150px', showHeaderOverflow: true, align: 'center', },
  { field: 'idCard', title: '身份证号', width: '200px', editRender: { enabled: false }, },
  { field: 'banName', title: '班组', width: '150px', showHeaderOverflow: true, align: 'center', },
  { field: 'suppOrgName', title: '供应商', width: '300px', showHeaderOverflow: true, align: 'center', },
  {
    field: 'isHour', title: '是否工时制', width: '100px', showHeaderOverflow: true, align: 'center',
    slots: {
      default: ({ row }: any) => [h(
        NTag,
        { size: "small", type: "success", round: "round" } as {},
        { default: () => yesNoArray[row.isHour] }
      )] as JSX.Element[]
    }
  },
];

//选择人员调用接口地址
const AddPersonReqUrl: string = "/labour/labourVirtualPurchaseUser/page";


const SubColumnOptions = {
  autoSesize: true,
  border: true,
  resizable: true,
  showOverflow: true,
  showHeaderOverflow: true,
  showFooterOverflow: true,
  keepSource: true,
  height: 450,
};

export { SuppUserChooseColumn, ExaminationColumn, NucleicacidColumn, TravelColumn, SubColumnOptions, AddPersonReqUrl }