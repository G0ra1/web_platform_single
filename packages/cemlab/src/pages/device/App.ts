import { dataModel } from '@platform/main/src/pages/openapi-manage/store';
import { values, get } from 'lodash';
/**
 * @Description 设备
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-07 13:44:09
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
                        let skiptoDetail = h(
                            "a",
                            {
                                href: 'javascript:void(0)',
                                style: 'text-decoration: none; color:#B6322C',
                                onClick: () => {
                                    Page.toLevel2Menu('id', row.id, 'deviceName', row.deviceName, JSON.stringify(row))
                                }
                            },
                            { default: () => row.deviceName }
                        );
                        return skiptoDetail;
                    }
                }

            },
            { field: 'deviceCode', title: '自编号', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'specifications', title: '规格型号', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            // 1在用2停用3报废
            {
                field: 'deviceStatus', title: '设备状态', showHeaderOverflow: true, minWidth: '120px', align: 'center',
                slots: {
                    default: ({ row }: any) => deviceStatus[row.deviceStatus]
                }

            },
            { field: 'approvalTime', title: '校准日期', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            //{ field: 'maintainTime', title: '保养日期', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            //;1待保养2已保养
            {
                field: 'maintainStatus', title: '保养状态', showHeaderOverflow: true, minWidth: '120px', align: 'center',
                slots: {
                    default: ({ row }) => {
                        let alreadyMaintenance = h(
                            "any",
                            { style: 'color:#70B503' },
                            { default: () => '已保养' }
                        );
                        let stayMaintenance = h(
                            "any",
                            { style: 'color:#F58D08' },
                            { default: () => '待保养' }
                        );
                        return row.maintainStatus == 2 ? alreadyMaintenance : row.maintainStatus == 1 ? stayMaintenance : '';
                    }

                }
            },
            { field: 'manufacturer', title: '生产厂家', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'factoryNumber', title: '出厂编号', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'productionTime', title: '投产日期', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'orgName', title: '所属单位', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
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
                            { code: "cemlabDeviceFormDetail", params: [row] }
                        );
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "cemlabDeviceFormDel", params: [row] }
                        );
                        return [detail, edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/cemlab/cemlabDevice/page',
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
        createUserName: d.userName
    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}