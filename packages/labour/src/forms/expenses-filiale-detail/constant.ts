import { NDatePicker, NTag, NInputNumber, NInput } from "naive-ui"
import { yesNoArray } from "../../lib/constant/Constant";
import { h } from 'vue'

//水电网费费用对应的列信息
const ExpensesFilialeWpnColumn = [
    { type: 'seq', width: 50 },
    { field: 'suppUserName', title: '劳务人员名称', showHeaderOverflow: true, editRender: { enabled: false }, width: '150px', align: 'center', },
    { field: 'idCard', title: '身份证号', showHeaderOverflow: true, editRender: { enabled: false }, width: '200px', align: 'center', },
    {
        field: 'startDateTime', title: '开始时间', showHeaderOverflow: true, width: '150px', align: 'center', editRender: { enabled: false },
        slots: {
            default: 'startDateTime_view',
            edit: 'startDateTime_edit',
        }
    },
    {
        field: 'endDateTime', title: '结束时间', showHeaderOverflow: true, width: '150px', align: 'center',editRender: { enabled: false },
        slots: {
            default: 'endDateTime_view',
            edit: 'endDateTime_edit',
        }
    },
    {
        field: 'stayLength', title: '住宿天数', showHeaderOverflow: true, width: '150px', align: 'center',editRender: { enabled: false },
        slots: {
            default: 'stayLength_view',
            edit:({row}:any)=>{
            let start = new Date(row.startDateTime) 
            let end  = new Date(row.endDateTime)
            row.stayLength  =  (end.getDate() || 0) - (start.getDate() || 0)  
                return [
                    row.stayLength 
                ]

            }
        }
    },
    {
        field: 'electricityCost', title: '电费', showHeaderOverflow: true, width: '150px', align: 'center',editRender: { enabled: false },
        slots: {
            default: 'electricityCost_view',
            edit: 'electricityCost_edit',
        }
    },
    {
        field: 'waterCost', title: '水费', showHeaderOverflow: true, width: '150px', align: 'center',editRender: { enabled: false },
        slots: {
            default: 'waterCost_view',
            edit: 'waterCost_edit',
        }
    },
    {
        field: 'netCost', title: '网费', showHeaderOverflow: true, width: '150px', align: 'center',editRender: { enabled: false },
        slots: {
            default: 'netCost_view',
            edit: 'netCost_edit',
        }
    },
    {
        field: 'total', title: '合计', showHeaderOverflow: true, width: '150px', align: 'center',editRender: { enabled: false },
        slots: {
            default: ({ row }: any) => {
                row.total = (row.electricityCost || 0) + (row.waterCost || 0) + (row.netCost || 0)
                return [
                    row.total.toFixed(2)
                ]
            },
            edit: ({ row }: any) => {
                row.total = (row.electricityCost || 0) + (row.waterCost || 0) + (row.netCost || 0)
                return [
                    row.total.toFixed(2)
                ]
            },
        }

    },
    {
        field: 'remark', title: '备注', showHeaderOverflow: true, width: '150px', align: 'center',editRender: { enabled: false },
        slots: {
            default: 'remark_view',
            edit: 'remark_edit',
        }
    },
    {
        field: 'attachment', title: '附件信息', width: '350px',showHeaderOverflow: true, align: 'center',editRender: { enabled: false },
        slots: {
            default: 'attachment_view',
            edit: 'attachment_edit'
        }
    },
]
//考核激励费用对应的列信息
const ExpensesFilialeAssessColumn = [
    { type: 'seq', width: 50 },
    { field: 'suppUserName', title: '劳务人员名称', showHeaderOverflow: true, editRender: { enabled: false }, align: 'center', },
    {
        field: 'entranceValidity', title: '入场有效性', showHeaderOverflow: false, align: 'center',  width: '200px',editRender: { enabled: false },
        slots: {
            default: 'entranceValidity_view',
            edit: 'entranceValidity_edit',
        }
    },
    {
        field: 'checkupValidity', title: '体检有效性', showHeaderOverflow: false, align: 'center',width: '200px',editRender: { enabled: false },
        slots: {
            default: 'checkupValidity_view',
            edit: 'checkupValidity_edit',
        }
    },
    {
        field: 'total', title: '合计', showHeaderOverflow: true, align: 'center',editRender: { enabled: false },
        slots: {
            default: ({ row }: any) => {
                return [row.total]
            },
            edit: ({ row }: any) => {
               if(row.entranceValidity == 1 && row.checkupValidity == 1 ){
                    row.total = 1000
               }else if(row.entranceValidity == 1 || row.checkupValidity == 1 ){
                  row.total = 300
               }else{
                    row.total = 0
               }
               return [ row.total ]
            },
        }
    },
    {
        field: 'remark', title: '备注', showHeaderOverflow: true, align: 'center',editRender: { enabled: false },
        slots: {
            default: 'remark_view',
            edit: 'remark_edit',
        }
    },
    {
        field: 'attachment', title: '附件信息', width: '350px',showHeaderOverflow: true, align: 'center',editRender: { enabled: false },
        slots: {
            default: 'attachment_view',
            edit: 'attachment_edit'
        }
    },
]
//过节费对应的列信息
const ExpensesFilialeFestival = [
    { type: 'seq', width: 50 },
    { field: 'suppUserName', title: '劳务人员名称', showHeaderOverflow: true, editRender: { enabled: false }, align: 'center', },
    {
        field: 'festivalCost', title: '过节费金额', showHeaderOverflow: true, align: 'center',editRender: { enabled: false },
        slots: {
            default: 'festivalCost_view',
            edit: 'festivalCost_edit',
        }
    },
    {
        field: 'total', title: '合计金额', showHeaderOverflow: true, align: 'center',editRender: { enabled: false },
        slots: {
            default: ({ row }: any) => {
                row.total = (row.festivalCost || 1000.00)
                return [
                    row.total.toFixed(2)
                ]
            },
            edit: ({ row }: any) => {
                row.total = (row.festivalCost || 1000.00)
                return [
                    row.total.toFixed(2)
                ]
            },
        }
    },
    {
        field: 'remark', title: '备注', showHeaderOverflow: true, align: 'center',editRender: { enabled: false },
        slots: {
            default: 'remark_view',
            edit: 'remark_edit',
        }
    },
    {
        field: 'attachment', title: '附件信息', width: '350px',showHeaderOverflow: true, align: 'center',editRender: { enabled: false },
        slots: {
            default: 'attachment_view',
            edit: 'attachment_edit'
        }
    },
]
//奖惩-其他扣款对应的列信息
const ExpensesFilialeRewardPunish = [
    { type: 'seq', width: 50 },
    { field: 'suppUserName', title: '劳务人员名称', showHeaderOverflow: true, editRender: { enabled: false }, align: 'center',width: '150px' },
    { field: 'idCard', title: '身份证号', showHeaderOverflow: true, editRender: { enabled: false }, align: 'center' ,width: '200px', },
    {
        field: 'rewardCost', title: '奖励费用', showHeaderOverflow: true, align: 'center',width: '150px',editRender: { enabled: false },
        slots: {
            default: 'rewardCost_view',
            edit: 'rewardCost_edit',
        }
    },
    {
        field: 'punishmentCost', title: '惩罚费用', showHeaderOverflow: true, align: 'center',width: '150px',editRender: { enabled: false },
        slots: {
            default: 'punishmentCost_view',
            edit: 'punishmentCost_edit',
        }
    },
    {
        field: 'otherDeductionsCost', title: '其他扣款', showHeaderOverflow: true, align: 'center',width: '150px',editRender: { enabled: false },
        slots: {
            default: 'otherDeductionsCost_view',
            edit: 'otherDeductionsCost_edit',
        }
    },
    {
        field: 'total', title: '合计金额', showHeaderOverflow: true, align: 'center',width: '150px',editRender: { enabled: false },
        slots: {
            default: ({ row }: any) => {
                row.total = (row.rewardCost || 0) -((row.punishmentCost || 0)+(row.otherDeductionsCost || 0))
                return [
                    row.total.toFixed(2)
                ]
            },
            edit: ({ row }: any) => {
                row.total = (row.rewardCost || 0) -((row.punishmentCost || 0)+(row.otherDeductionsCost || 0))
                return [
                    row.total.toFixed(2)
                ]
            },
        }
    },
    {
        field: 'remark', title: '备注', showHeaderOverflow: true, align: 'center',width: '150px',editRender: { enabled: false },
        slots: {
            default: 'remark_view',
            edit: 'remark_edit',
        }
    },
    {
        field: 'attachment', title: '附件信息', width: '200px',showHeaderOverflow: true, align: 'center',editRender: { enabled: false },
        slots: {
            default: 'attachment_view',
            edit: 'attachment_edit'
        }
    },
]
//选择劳务人员对应弹窗的列信息
const LabourPersonChooseColumn = [
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
]




const ApproachPersonOptions = {
    border: true,
    resizable: true,
    showOverflow: true,
    loading: false,
    height: 450,
}
export { ExpensesFilialeWpnColumn, ExpensesFilialeAssessColumn, ExpensesFilialeFestival, ExpensesFilialeRewardPunish, LabourPersonChooseColumn, ApproachPersonOptions }
