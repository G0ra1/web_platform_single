/**
 * @Description 设备保养记录台账
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 16:25:43
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
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
            { field: 'deviceName', title: '设备名称', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'deviceCode', title: '自编号', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'specifications', title: '规格型号', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'manufacturer', title: '生产厂家', showHeaderOverflow: true, minWidth: '150px', align: 'center' },
            {
                field: 'maintainType', title: '保养类型', showHeaderOverflow: true, minWidth: '100px', align: 'center',
                slots: {
                    default: ({ row }: any) => row.maintainType == '1' ? '保养' : row.maintainType == '2' ? '校准' : ''
                }

            },
            { field: 'approvalTime', title: '校准日期', showHeaderOverflow: true, minWidth: '100px', align: 'center' },

            { field: 'orgName', title: '所属单位', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            {
                field: 'deviceStatus', title: '设备状态', showHeaderOverflow: true, minWidth: '100px', align: 'center',
                slots: {
                    default: ({ row }: any) => deviceStatus[row.deviceStatus]
                }
            },
            { field: 'maintainTime', title: '保养日期', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'createUserName', title: '保养人员', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'createTime', title: '创建时间', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '180px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let detail = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceMaintainFormDetail", params: [row] }
                        );
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceMaintainFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceMaintainFormDel", params: [row] }
                        );
                        return [detail, edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/cemlab/cemlabDeviceMaintain/page',
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
        deviceId: Page.getMenuData().id,
        deviceName: JSON.parse(Page.getMenuCache()).deviceName,
        deviceCode: JSON.parse(Page.getMenuCache()).deviceCode,
        specifications: JSON.parse(Page.getMenuCache()).specifications,
        manufacturer: JSON.parse(Page.getMenuCache()).manufacturer,
        orgName: JSON.parse(Page.getMenuCache()).orgName
    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}