import { NDatePicker, NTag, NInputNumber, NInput } from "naive-ui"

const ApproveDetailsBaseColumn = [
    { field: 'name', title: '序号', type: 'seq', align: 'center', width: 80 },
    { field: 'suppUserName', title: '姓名', width: 80, showOverflow: true, editRender: { enabled: false }, align: 'center', },
    { field: 'labourCompanyName', title: '劳务公司名称', showOverflow: true, width: 160, editRender: { enabled: false }, align: 'center', },
    { field: 'banName', title: '班组', showOverflow: true, editRender: { enabled: false }, align: 'center', width: 80 },
]
const ApproveDetailsColumn = (dataModel: any) => {
    let detailsData: any = []
    let detailsColumn: any = []
    if (dataModel.labourAttendanceMonthVo) {
        for (const key in dataModel.labourAttendanceMonthVo) {
            let d = dataModel.labourAttendanceMonthVo[key]
            if (d) {
                if (detailsColumn.length == 0) {
                    // 数据列没有扩展   
                    // 进行扩展
                    detailsColumn = [...ApproveDetailsBaseColumn]
                    d.labourAttendanceMonthDetailVoList.forEach((e: any) => {
                        detailsColumn.push({
                            field: e.attendanceDate,
                            title: `${e.attendanceDate} (${e.weekDayName})`,
                            width: 120,
                            slots: {
                                edit: 'attendanceInfo_edit',
                                default: 'attendanceInfo_default',
                            }
                        })
                    });
                }
                let m: any = {
                    suppUserName: d.suppUserName,
                    labourCompanyName: d.labourCompanyName,
                    banName: d.banName
                }
                d.labourAttendanceMonthDetailVoList.forEach((e: any) => {
                    m[e.attendanceDate] = e.attendanceInfo
                });
                detailsData.push(m)
            }

        }
    }
    return { detailsColumn, detailsData }
}


export { ApproveDetailsColumn }