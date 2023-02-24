/**
 * @Description 购置申请
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:33:52
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'
import { format } from "date-fns";
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
            {
                field: 'code', title: '编号', showHeaderOverflow: true, minWidth: '160px', align: 'center', 
                slots: {
                    default: ({ row }) => { 
                        return (
                            typeof(row.auditStatus) === 'undefined' 
                            || row.auditStatus === null
                            || row.auditStatus === '' 
                            || row.auditStatus !== 2 
                        )   
                        ?h("p",{style: 'text-decoration: none'},{ default: () => row.code }) 
                        :h(
                            "a",
                            {
                                href: 'javascript:void(0)',
                                class: 'vxe-grid-active',
                                onClick: () => {
                                    Page.toLevel2Menu('id', row.id,
                                                        'code', row.code,
                                                        'assetSource', '1'
                                                    )
                                }
                            },
                            { default: () => row.code }
                        )
                    }
                }
            },
            // { field: 'planYear', title: '计划年度', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserOrgName', title: '申请人机构', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserDeptName', title: '申请人部门', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserName', title: '申请人', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
           
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
           
            { field: 'itemTypeName', title: '申请类型', showHeaderOverflow: true, minWidth: '160px', align: 'center' ,
                slots:{
                    default : ({ row }) => [h(
                        NTag,
                        { size: "small", type: "primary" } as {},
                        { default: () => row.itemTypeName }
                    )] as JSX.Element[]
                }
            },
            { field: 'sumTotalAmount', title: '合计金额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalUntaxedAmount', title: '合计金额-未税', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalTaxAmount', title: '合计金额-税额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalNumber', title: '申请数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            
            { field: 'notRegisterNumber', title: '未采购数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'registerNumber', title: '采购数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'notAcceptanceNumber', title: '未验收数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'acceptanceNumber', title: '验收数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'notStorageNumber', title: '未入库数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'storageNumber', title: '入库数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'explanation', title: '说明', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '180px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseApplyFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseApplyFormDel", params: [row] }
                        );
                        let register = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseApplyRegister", params: [{ applyId: row.id, applyCode: row.code }] }
                        );
                        let acceptance = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseApplyAcceptance", 
                              params: [{ applyId: row.id, applyCode: row.code , registerId: row.id, registerCode: row.code  } ] 
                            }
                        );
                        let storage = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseApplyStorage", 
                                params: [{ 
                                    applyId: row.id, applyCode: row.code ,
                                    assetSource: row.assetSource ? row.assetSource:1,
                                    assetSourceName :row.assetSource ? row.assetSource:'采购'
                                }] 
                            }
                        );
                        let arr = [];
                        if(row.notRegisterNumber > 0){
                            arr.push(register);
                        }
                        if(row.notAcceptanceNumber > 0){
                            arr.push(acceptance);
                        }
                        if(row.notStorageNumber > 0){
                            arr.push(storage);
                        }
                        //return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                        return  arr
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/purchaseApply/list',
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
    console.log(d, 'userInfouserInfouserInfo')
    paramsArray.value = [{
        applyUserName: d.userName,
        applyUserId: d.id,
        applyUserOrgId: d.parentOrgId,
        applyUserOrgName: d.parentOrgName,
        applyUserDeptId: d.parentDeptId,
        applyUserDeptName: d.parentDeptName,
        applyTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss')

    }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}