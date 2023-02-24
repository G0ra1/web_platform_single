/**
 * @Description 考勤表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-30 14:17:30
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, NwIcon } from '@platform/main'
import { NTag, NPopover, NButton } from 'naive-ui'
import { del } from './api'
/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
let refDetails: any;
let messageLocal: any;
function initDialog(dialog: any, ref: any) {
    dialogLocal = dialog;
    refDetails = ref
}
function initMessage(message: any) {
    messageLocal = message;
}

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
            { type: 'checkbox', width: 35 },
            {
                field: "msgTitle", title: "消息标题",
                slots: {
                    default: ({ row }) => {
                        return [
                            <span>
                                <a class="vxe-grid-active" onClick={(e) => {
                                    showDetails(row)
                                }
                                }>{row.msgTitle}</a>
                            </span>,
                        ];
                    },
                }
            },
            { field: "msgContent", title: "消息内容" },
            { field: "msgSource", title: "消息来源" },
            { field: "sendTime", title: "发送时间" },
            { field: "sendUserName", title: "发送人", showHeaderOverflow: true },
            {
                field: "isRead", title: "消息状态", showOverflow: true,
                slots: {
                    default: ({ row }) => {
                        return [
                            <span>
                                {row.isRead == 1 ? '已读' : '未读'}
                            </span>,
                        ];
                    },
                }
            },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                slots: {
                    default: ({ row }) => {
                        let del = h(
                            NButton,
                            { type: "primary", onClick: () => delNews(row) },
                            '删除'
                        );
                        //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                        return [del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/main/msgPage',
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
const delNews = (row: any) => {
    dialogLocal.warning({
        title: '警告',
        content: `是否确定删除所选消息？`,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            del(row.id).then(res => {
                messageLocal.success('删除成功')
                refresh()
            }).catch(e => {
                messageLocal.error(e)
            })
        },
        onNegativeClick: () => {
        }
    })
}
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, initMessage, gridSearchRef, gridEvents, delNews, refDetails
}