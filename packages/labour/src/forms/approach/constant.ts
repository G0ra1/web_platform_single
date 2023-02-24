import { NDatePicker, NSelect, NTag, NSwitch } from "naive-ui"
import { yesNoArray } from "../../lib/constant/Constant";
import { h, ref } from 'vue'
import { FormModal } from './App'
const contractWorkOptions = FormModal.contractWorkOptions;
//劳务信息对应的列信息
const ApproachPersonColumn = [
  // { type: 'checkbox', width: 50 },
  { field: 'suppOrgName', title: '供应商', showHeaderOverflow: true, align: 'center', editRender: { enabled: false } },
  { 
    field: 'banName', title: '班组', showHeaderOverflow: true, align: 'center', editRender: { enabled: true },
    slots: { edit: 'ban_edit'}
  },
  { field: 'suppUserName', title: '姓名', howHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
  { 
    field: 'outerDisciplineName', title: '岗位', showHeaderOverflow: true, align: 'center', editRender: { enabled: true },
    slots: { edit: 'outerDisciplineName_edit' },
  },
  { 
    field: 'postRankName', title: '专业', showHeaderOverflow: true, align: 'center', editRender: { enabled: true },
    slots: { edit: 'postRankName_edit' },
  },
  {
    field: 'isHour', title: '是否工时制', showHeaderOverflow: true, align: 'center', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NSwitch,
        {
          onUpdateValue: _ => row.isHour = row.isHour === 1 ? 0 : 1,
        },
        {
          checked: () => yesNoArray[row.isHour],
          unchecked: () => yesNoArray[row.isHour],
        }
      )] as JSX.Element[],
      default: ({ row }: any) => yesNoArray[row.isHour]
    }
  },
  {
    field: 'workcontractname', title: '承包合同', width: '150px', showHeaderOverflow: true, align: 'center',
    slots: {
      edit:  'workcontractname_edit',
      // edit: ({ row }: any) => [h(
      //   NSelect,
      //   {
      //     onUpdateValue: (d: any, b: any) => {
      //       row.workcontractid = d
      //       row.workcontractname = b.label
      //       row.workcontractcode = b.code
      //       c_changeContractWork.value(d, b,  FormModal.selectedData.value)
      //     },
      //     options: contractWorkOptions.value, value: row.workcontractid
      //   }
      // )] as JSX.Element[],
      default: ({ row }: any) => row.workcontractname
    }
  },
  {
    field: 'approachTime', title: '入场时间', showHeaderOverflow: true, align: 'center', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NDatePicker,
        {
          type: "date", valueFormat: "yyyy-MM-dd", formattedValue: row.approachTime,
          onUpdateFormattedValue: (value: string) => row.approachTime = value,
        }
      )] as JSX.Element[],
      default: ({ row }: any) => row.approachTime
    },
  }
]

const ApproachPersonOptions = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 450,
}

//选择劳务人员对应弹窗的列信息
const ApproachPersonChooseColumn = [
  { field: 'suppOrgName', title: '供应商', width: '200px', showHeaderOverflow: true, align: 'center', },
  { field: 'banName', title: '班组', width: '100px', showHeaderOverflow: true, align: 'center', },
  { field: 'suppUserName', title: '姓名', width: '100px', showHeaderOverflow: true, align: 'center', },
  { field: 'idCard', title: '身份证号', width: '200px', showHeaderOverflow: true, align: 'center', },
  { field: 'postRankName', title: '专业', width: '150px', showHeaderOverflow: true, align: 'center', },
  { field: 'outerDisciplineName', title: '岗位', width: '150px', showHeaderOverflow: true, align: 'center', },

  // {
  //   field: 'isHour', title: '是否工时制', width: '100px', showHeaderOverflow: true, align: 'center',
  //   slots: {
  //     default: ({ row }: any) => [h(
  //       NTag,
  //       { size: "small", type: "success", round: "round" } as {},
  //       { default: () => yesNoArray[row.isHour] }
  //     )] as JSX.Element[]
  //   }
  // },
]

const checkboxChange = (e: any) => {
  FormModal.selectedData.value = e.records.map((d: any) => d.id)
}
const c_changeContractWork = ref()
export { ApproachPersonColumn, ApproachPersonChooseColumn, ApproachPersonOptions, checkboxChange, c_changeContractWork }