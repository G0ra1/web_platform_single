/**
 * @Description 用户
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-11-17 10:15:00
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db,Page } from '@platform/main'
import { NTag } from 'naive-ui'
import { json } from 'd3';
/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

const typeArray = ["default", "info", "primary"];
const sexArray = ["未知", "男", "女"];


//数据来源枚举
let sourceMap = new Map();
sourceMap.set("self_build", "自建");
sourceMap.set("cnijx_contract", "商法系统");
sourceMap.set("cnijx_portal", "人力管理系统");
sourceMap.set("cnijx_ems", "工时系统");

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset,gridEvents } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { 
                field: 'userNameCh', title: '姓名', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true ,},
            { field: 'phoneNum', title: '手机号', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
            { field: 'idCard', title: '身份证', showHeaderOverflow: true, minWidth: '150px', align: 'center', showOverflow: true },
            {
                title: '性别', showHeaderOverflow: true, minWidth: '70px', align: 'center', showOverflow: true,
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.sex] } as {},
                        { default: () => sexArray[row.sex] }
                    )] as JSX.Element[]
                }
            },
            { field: 'parentOrgName', title: '劳务供方公司', showHeaderOverflow: true, minWidth: '120px', align: 'center', showOverflow: true },
            { field: 'unitName', title: '所在单位', showHeaderOverflow: true, minWidth: '120px', align: 'center', showOverflow: true },
            { field: 'partName', title: '所在部门', showHeaderOverflow: true, minWidth: '120px', align: 'center', showOverflow: true },
            {
                field: 'source', title: '数据来源', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true,
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: "info" } as {},
                        { default: () => sourceMap.get(row.source) }
                    )] as JSX.Element[]
                }
            },
            // {
            //     title: '操作',
            //     showHeaderOverflow: true,
            //     align: 'center',
            //     minWidth: '110px',
            //     slots: {
            //         default: ({ row }) => {
            //             let edit = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourSuppUserForm_edit", params: [row] }
            //             );
            //             let del = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourSuppUserForm_del", params: [row] }
            //             );
            //             //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
            //             return [edit, del]
            //         }
            //     },
            // }
        ]
    }, new RequestPaging(
        '/labour/labourSuppUser/supperOrgNamePage',
        'post',
        
    )
)
const org = Page.getMenuData()
const orgName =  JSON.stringify(org.orgName)
const ssss=  orgName.slice(1,-1)
const refresh = () => {
    reset({parentOrgName:ssss})
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    console.log(d);
    paramsArray.value = [{ parentOrgId: d.parentDeptId, parentOrgName: d.parentDeptName }];
})


const gridSearchRef = ref()
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,gridSearchRef, gridEvents
}