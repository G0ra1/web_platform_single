import { NDatePicker, NTag } from "naive-ui"
import { yesNoArray } from "../../lib/constant/Constant";
import { h } from 'vue'
import { format } from "date-fns";

//离场对应的列信息
const DeparturehPersonColumn = [
  { type: 'seq', width: 50 },
  { field: 'suppOrgName', title: '供应商', showHeaderOverflow: true, align: 'center', editRender: { enabled: false } },
  { field: 'banName', title: '班组', showHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
  { field: 'suppUserName', title: '姓名', howHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
  { field: 'outerDisciplineName', title: '专业', showHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
  { field: 'postRankName', title: '岗位', showHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
  {
    field: 'isHour', title: '是否工时制', showHeaderOverflow: true, align: 'center', editRender: { enabled: false },
    slots: {
      default: ({ row }: any) => [h(
        NTag,
        { size: "small", type: "success", round: "round" } as {},
        { default: () => yesNoArray[row.isHour] },
      )] as JSX.Element[]
    }
  },
  { field: 'approachTime', title: '进场时间', showHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
  {
    field: 'departureTime', title: '离场时间', showHeaderOverflow: true, align: 'center',
    slots: {
      edit: ({ row }: any) => [h(
        NDatePicker,
        {
          type: "date",
          valueFormat: "yyyy-MM-dd",
          formattedValue: row.departureTime,
          onUpdateFormattedValue: (value: string) => row.departureTime = value,
        }
      )] as JSX.Element[],
      default: ({ row }: any) => {
        row.departureTime = row.departureTime || format(new Date(), "yyyy-MM-dd")
        return row.departureTime
      }
    },
  }
]

const DeparturehPersonOptions = {
  border: true,
  resizable: true,
  showOverflow: true,
  loading: false,
  height: 450,
  with: 850
};


//选择劳务人员对应弹窗的列信息
const DeparturehPersonChooseColumn = [
  { field: 'suppOrgName', title: '供应商', width: '300px', showHeaderOverflow: true, align: 'center', },
  { field: 'banName', title: '班组', width: '150px', showHeaderOverflow: true, align: 'center', },
  { field: 'suppUserName', title: '姓名', width: '150px', showHeaderOverflow: true, align: 'center', },
  { field: 'outerDisciplineName', title: '专业', width: '100px', showHeaderOverflow: true, align: 'center', },
  { field: 'postRankName', title: '岗位', width: '100px', showHeaderOverflow: true, align: 'center', },
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
]

export { DeparturehPersonColumn, DeparturehPersonOptions, DeparturehPersonChooseColumn }