/**
 * @Description 考勤表
 * @author 云数网讯 wangjiaqing@netwisd.com
 * @date 2022-11-30 14:17:30
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, NwIcon } from '@platform/main'
import { NTag, NPopover, NButton } from 'naive-ui'
import TemplateNewsAction from './templateNewsAction.vue'
import SendMessage from './sendMessage.vue'
import { del, sendMessage, } from "./api";
/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
let message: any
let refTemplateNewsAction: any
let show: any
let refSendMessage: any
function initDialog(dialog: any, useMessage: any, ref: any, callback: any, ref2: any) {
    dialogLocal = dialog;
    message = useMessage
    console.log(message, 'useMessage')
    refTemplateNewsAction = ref
    show = callback
    refSendMessage = ref2
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
            { field: "tmpName", title: "模板名称" },
            { field: "tmpTitle", title: "模板标题" },
            { field: "tmpCode", title: "模板编码", showHeaderOverflow: true },
            { field: "tmpContent", title: "模板内容", showOverflow: true, },
            {
                field: '',
                width: 200,
                title: '操作',
                showHeaderOverflow: true,
                slots: {
                    default: ({ row }) => {
                        return [
                            <div>
                                <NButton type={"primary"} style={{marginRight:'5px'}} onClick={() => { show(row) }}> {"修改"} </NButton>
                                <NButton type={"primary"} style={{marginRight:'5px'}} onClick={() => { delNews(row) }}> {"删除"} </NButton>
                                <NButton type={"primary"} onClick={() => { sendMessageHandel(row) }}> {"发送信息"} </NButton>
                            </div>

                        ];
                    },
                }
            },
        ]
    }, new RequestPaging(
        '/main/tmp/page',
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
const approveParamsArry = ref<Array<any>>([{}])
const checkboxChangeEvent = () => {
    approveParamsArry.value = gridRef.value?.getCheckboxRecords() as Array<any>
    console.log(approveParamsArry.value)
}

const handDel = (selected: Array<any>) => {
    let id = selected.map(d => d.id).join(',')
    del(id).then((res: any) => {
        console.log(message)
        message.success("删除成功");
        query()

    })
}

const sendMessageHandel = (e = {}) => {
    refSendMessage?.value.sonFn(e)
}
const delNews = (row: any) => {
    dialogLocal.warning({
        title: '警告',
        content: `是否删除消息模板<${row.tmpName}>？`,
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
            del(row.id).then(res => {
                message.success('删除成功')
                refresh()
            }).catch(e => {
                message.error(e)
            })
        },
        onNegativeClick: () => {
        }
    })
}
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, gridSearchRef, gridEvents, TemplateNewsAction, checkboxChangeEvent, approveParamsArry, handDel, refSendMessage, SendMessage
}