/**
 * @Description 资产借用
 * @author 云数网讯 lhy@netwisd.com
 * @date 2022-12-01 12:18:53
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'
import { format } from "date-fns";
import { auditStatusArray,auditStatusTypeArray } from "../../lib/constant/Constant";

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
            { field: 'code', title: '编号', showHeaderOverflow: true, width: '100px', align: 'center',
            slots: {
                default: ({ row }) => {
                  return h(
                    "a",
                    {
                      href: 'javascript:void(0)',
                      style: 'text-decoration: none',
                      onClick: () => {
                        Page.toLevel2Menu('id', row.id, 'code', row.code)
                      }
                    },
                    { default: () => row.code }
                  )
                }
              }
            },
            { field: 'createUserParentOrgName', title: '申请单位', showHeaderOverflow: true , align: 'center' },
            { field: 'borrowOrgName', title: '借出单位', showHeaderOverflow: true , align: 'center' },
            { field: 'createTime', title: '申请时间', showHeaderOverflow: true , align: 'center' },
            { field: 'borrowNumber', title: '借用数量', showHeaderOverflow: true , align: 'center' },
            { field: 'deliveryNumber', title: '出库数量', showHeaderOverflow: true , align: 'center' },
            { field: 'notDeliveryNumber', title: '未出库数量', showHeaderOverflow: true , align: 'center' },
            { field: 'intoNumber', title: '入库数量', showHeaderOverflow: true , align: 'center' },
            { field: 'notIntoNumber', title: '未入库数量', showHeaderOverflow: true , align: 'center' },
            { field: 'explanation', title: '说明', showHeaderOverflow: true, width: '200px', align: 'center' },
            { field: 'auditSuccessTiem', title: '审批通过时间', showHeaderOverflow: true , align: 'center' },
            {
                field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, width: '100px', align: 'center',
                slots: {
                  default: ({ row }) => [h(
                    NTag,
                    { size: "small", type: auditStatusTypeArray[row.auditStatus] } as {},
                    { default: () => auditStatusArray[row.auditStatus] }
                  )] as JSX.Element[]
                }
            },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        // let edit = h(
                        //     NwFunctionPredefine,
                        //     { code: "materialBorrowFormEdit", params: [row] }
                        // );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "materialBorrowFormDel", params: [row] }
                        );
                        //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                        // return [edit, del]
                        return row.auditStatus !== 0 ? [] : [del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/materialBorrow/page',
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
         code: d.code, applyUserName: d.userName, applyUserDeptName: d.parentDeptName,
         applyUserOrgName: d.parentOrgName, applyTime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
         createUserParentDeptName: d.parentDeptName, createUserParentOrgName: d.parentOrgName, createUserName: d.userName,
         createTime: format(new Date(), "yyyy-MM-dd HH:mm:ss")
     }];
 })

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}