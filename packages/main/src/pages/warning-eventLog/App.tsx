/**
 * @Description 考勤表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-30 14:17:30
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, NwIcon } from '@platform/main'
import { NTag, NPopover } from 'naive-ui'
/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
let refDetails: any;
function initDialog(dialog: any, ref: any) {
    dialogLocal = dialog;
    refDetails = ref
}
const eventLevelList: Array<string> = ['一级', '二级', '三级', '四级',]

//-- 例子看完删除它
//const typeArray = ["primary", "info"];
//const statusArray = [ "启用" , "停用"];
/*const statusOptions = ref([
    { label: '请选择', value: '' },
    { label: '启用', value: 1 },
    { label: '停用', value: 3 },
])*/
/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset, gridEvents } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            {
                field: "eventId", title: "事件id", showOverflow: true, showHeaderOverflow: true,
                slots: {
                    default: ({ row }) => {
                        return [
                            <span>
                                <a class="vxe-grid-active" onClick={(e) => {
                                    showDetails(row)
                                }
                                }>{row.eventId}</a>
                            </span>,
                        ];
                    },
                }
            },
            {
                field: "eventLevel", title: "事件等级", showOverflow: true, showHeaderOverflow: true,
                slots: {
                    default: ({ row }) => {
                        return [
                            <span>
                                {row.eventLevel ? eventLevelList[row.eventLevel - 1] : ''}
                            </span>,
                        ];
                    },
                }
            },
            { field: "sysName", title: "系统名称" },
            { field: "sysCode", title: "系统编码" },
            { field: "orgName", title: "使用组织的名称", showOverflow: true, showHeaderOverflow: true },
            { field: "orgCode", title: "使用组织的编码", showOverflow: true, showHeaderOverflow: true },
            { field: "usernameCh", title: "使用用户的姓名", showOverflow: true, showHeaderOverflow: true },
            { field: "username", title: "使用用户的账号", showOverflow: true, showHeaderOverflow: true },
            { field: "content", title: "事件内容", showOverflow: true, showHeaderOverflow: true },
        ]
    }, new RequestPaging(
        '/warn/warningEventLog/page',
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
    paramsArray.value = [{ createUserName: d.userName }];
})
const gridSearchRef = ref()

const showDetails = (d = {}) => {
    console.log(refDetails.value, 'refDetails.value')
    refDetails.value.sonFn(d)
}
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, gridSearchRef, gridEvents, refDetails
}