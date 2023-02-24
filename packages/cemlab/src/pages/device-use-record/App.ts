import { style } from 'd3';
/**
 * @Description 设备使用详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 17:30:29
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'
import { deviceStatus } from '../../lib/constant/Constant';

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { type: "seq", title: '序号', width: 50, align: 'center', minWidth: 50 },
            {
                field: 'deviceName', title: '设备名称', showHeaderOverflow: true, minWidth: '120px', align: 'center',
                slots: {
                    default: ({ row }) => {
                        let defaultColor = h(
                            "any",
                            { style: 'font-weight:bold' },
                            { default: () => row.deviceName }
                        );
                        return defaultColor;
                    }

                }
            },
            { field: 'deviceCode', title: '自编号', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'specifications', title: '规格型号', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'manufacturer', title: '生产厂家', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            {
                field: 'deviceStatus', title: '设备状态', showHeaderOverflow: true, minWidth: '120px', align: 'center',
                slots: {
                    default: ({ row }: any) => deviceStatus[row.deviceStatus]
                }
            },
            { field: 'useCount', title: '使用次数', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'monthName', title: '统计月份', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceUseRecordFormEdit", params: [row] }
                        );
                        let print = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceUseRecordFormPrint", params: [row] }
                        );
                        return [edit, print]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/cemlab/cemlabDeviceUseRecord/page',
        'post'
    )
)


const refresh = () => {
    reset({})
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{
        createUserName: d.userName,

    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}