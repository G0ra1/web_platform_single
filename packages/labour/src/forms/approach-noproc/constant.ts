import { NDatePicker, NSelect, NTag, NSwitch } from "naive-ui"
import { yesNoArray } from "../../lib/constant/Constant";
import { h } from 'vue'
import { format } from "date-fns";

//劳务信息对应的列信息
const ApproachPersonColumn = [
  { type: 'seq', width: 50 },
  { field: 'suppOrgName', title: '供应商', showHeaderOverflow: true, align: 'center', editRender: { enabled: false } },
  { field: 'banName', title: '班组', showHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
  { field: 'suppUserName', title: '姓名', howHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
  { field: 'outerDisciplineName', title: '专业', showHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
  { field: 'postRankName', title: '岗位', showHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
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
    field: 'approachTime', title: '入场时间', showHeaderOverflow: true, align: 'center', editRender: { enabled: true },
    slots: {
      edit: ({ row }: any) => [h(
        NDatePicker,
        {
          type: "date", valueFormat: "yyyy-MM-dd", formattedValue: row.approachTime,
          onUpdateFormattedValue: (value: string) => row.approachTime = value,
        }
      )] as JSX.Element[],
      default: ({ row }: any) => {
        row.approachTime = row.approachTime || format(new Date(), "yyyy-MM-dd")
        return row.approachTime
      }
    },
  }
]

const ApproachPersonOptions = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 500,
}

//选择劳务人员对应弹窗的列信息
const ApproachPersonChooseColumn = [
  { field: 'suppOrgName', title: '供应商', width: '200px', showHeaderOverflow: true, align: 'center', },
  { field: 'banName', title: '班组', width: '100px', showHeaderOverflow: true, align: 'center', },
  { field: 'suppUserName', title: '姓名', width: '100px', showHeaderOverflow: true, align: 'center', },
  { field: 'idCard', title: '身份证号', width: '200px', showHeaderOverflow: true, align: 'center', },
  { field: 'outerDisciplineName', title: '专业', width: '150px', showHeaderOverflow: true, align: 'center', },
  { field: 'postRankName', title: '岗位', width: '150px', showHeaderOverflow: true, align: 'center', },
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

export { ApproachPersonColumn, ApproachPersonChooseColumn, ApproachPersonOptions }