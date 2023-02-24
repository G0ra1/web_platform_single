import {h, ref } from 'vue'
import { NDatePicker, NTag, NInputNumber, NInput ,NSwitch} from "naive-ui"
import { planTypeArray, yesNoArray } from "../../lib/constant/Constant";

const  DispatchPersionsColumn = [
    // { field: 'suppUserName', title: '姓名', howHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
    // { field: 'outerDisciplineName', title: '专业', showHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },
    // { field: 'postRankName', title: '岗位', showHeaderOverflow: true, align: 'center', editRender: { enabled: false }, },

    { field: 'suppUserName', title: '姓名',  showHeaderOverflow: true, align: 'center', editRender: { enabled: false },},
    { field: 'idCard', title: '身份证号', showHeaderOverflow: true, align: 'center', editRender: { enabled: false },},
    { field: 'suppUserPhone', title: '手机号', showHeaderOverflow: true, align: 'center', editRender: { enabled: false },},

    { field: 'postRankName', title: '专业', showHeaderOverflow: true, align: 'center', editRender: { enabled: false },},
    { field: 'outerDisciplineName', title: '岗位',  showHeaderOverflow: true, align: 'center', editRender: { enabled: false },},
    { field: 'isHour', title: '是否工时制',  showHeaderOverflow: true, align: 'center', editRender: { enabled: false },
  
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

]

//选择劳务人员对应弹窗的列信息
const ApproachPersonChooseColumn = [
    { field: 'suppUserName', title: '姓名', width: '100px', showHeaderOverflow: true, align: 'center', },
    { field: 'idCard', title: '身份证号', width: '200px', showHeaderOverflow: true, align: 'center', },
    { field: 'suppUserPhone', title: '手机号', width: '200px', showHeaderOverflow: true, align: 'center', },
    { field: 'postRankName', title: '专业', width: '150px', showHeaderOverflow: true, align: 'center', },
    { field: 'outerDisciplineName', title: '岗位', width: '150px', showHeaderOverflow: true, align: 'center', },
    { field: 'isHour', title: '是否工时制', width: '150px', showHeaderOverflow: true, align: 'center', 
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

export { DispatchPersionsColumn ,ApproachPersonChooseColumn}