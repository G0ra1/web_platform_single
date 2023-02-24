/**
 * @Description 采购信息登记
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-29 16:33:58
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'

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
            { field: 'code', title: '采购登记编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },

            // { field: 'applyCode', title: '申请单编号', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserOrgName', title: '申请人机构名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserDeptId', title: '申请人部门', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyUserName', title: '申请人名称', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'applyTime', title: '申请时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },

            { field: 'sumTotalAmount', title: '合计金额', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalUntaxedAmount', title: '合计金额-未税', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'sumTotalTaxAmount', title: '合计金额-税额', showHeaderOverflow: true, minWidth: '160px', align: 'center' }, 
            { field: 'sumTotalNumber', title: '采购数量', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
           
            { field: 'contractCode', title: '采购合同code', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'contractTime', title: '采购合同签订时间', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            { field: 'supplierName', title: '供应商', showHeaderOverflow: true, minWidth: '160px', align: 'center' },

            { field: 'explanation', title: '说明', showHeaderOverflow: true, minWidth: '160px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '150px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseRegisterFormEdit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseRegisterFormDel", params: [row] }
                        );
                        let register = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseApplyRegister", params: [{ applyId: row.id, applyCode: row.code }] }
                        );
                        let acceptance = h(
                            NwFunctionPredefine,
                            { code: "assetPurchaseRegisterAcceptance", 
                              params: [{ applyId: row.applyId, applyCode: row.applyCode , registerId: row.id, registerCode: row.code  } ] 
                            }
                        );
                        // let storage = h(
                        //     NwFunctionPredefine,
                        //     { code: "assetPurchaseRegisterStorage", 
                        //         params: [{ 
                        //             applyId: row.id, applyCode: row.code ,
                        //             assetSource: row.assetSource ? row.assetSource:1,
                        //             assetSourceName :row.assetSource ? row.assetSource:'采购'
                        //         }] 
                        //     }
                        // );
                        let arr = [];
                        if(row.notAcceptanceNumber > 0){
                            arr.push(acceptance);
                        }
                        // if(row.notStorageNumber > 0){
                        //     arr.push(storage);
                        // }
                        //return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                        return  arr
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/purchaseRegister/list',
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
    paramsArray.value = [{ applyId: Page.getMenuData().id, applyCode: Page.getMenuData().code }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}