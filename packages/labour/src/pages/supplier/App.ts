/*
 * @Author: zouliming 
 * @Date: 2022-10-27 18:49:41 
 * @Last Modified by:   zouliming 
 * @Last Modified time: 2022-10-27 18:49:41 
 * @Description 请假申请列表
 */


import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db ,Page} from '@platform/main'
import { NTag } from 'naive-ui'
import { syncOrgTree,getOrgTree } from "./api/index"

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

//两个枚举
const typeArray = ["primary", "success", "success", "error"];
const statusArray = ["", "启用", "", , "停用"];

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

            { field: 'orgCode', title: '机构代码', showHeaderOverflow: true, minWidth: '50px', align: 'center', showOverflow: true },
            { field: 'orgName', title: '机构名称', showHeaderOverflow: true, minWidth: '240px', align: 'center', showOverflow: true ,
            slots: {
                default: ({ row }) => {
                  return h(
                    "a",
                    {
                      href: 'javascript:void(0)',
                      style: 'text-decoration: none',
                      onClick: () => {
                        Page.toLevel2Menu('id', row.id, 'orgName', row.orgName, '', row, (m, r) => {
                            return true;
                        })
                      }
                    },
                    { default: () => row.orgName }
                  )
                }
              }
            },
            { field: 'orgShortName', title: '机构简称', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
            { field: 'userNameCh', title: '用户ID', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
            // { field: 'phoneNum', title: '电话', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
            // { field: 'email', title: '邮箱', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
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
            {
                title: '是否启用', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true,
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.status] } as {},
                        { default: () => statusArray[row.status] }
                    )] as JSX.Element[]
                }
            },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "supplierForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "supplierForm_del", params: [row] }
                        );
                        //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                        return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourSuppOrg/page',
        'post',
        { "test": 'test' }
    )
)

const refresh = () => {
    reset({})
}

/**
     * 同步供应商组织
     */
const syncEvent = () => {
    dialogLocal.error({
        title: '从客户方同步供应商数据',
        content: '确定同步吗？需要花费些时间？',
        positiveText: '确认',
        negativeText: '取消',
        maskClosable: false,
        onPositiveClick: async () => {
            const result = await syncOrgTree()
            if (result) {
                console.log("同步供应商机构成功！");
                //重新加载下左树
                refresh();
            }
        },
    })
}

const statusOptions = ref([
    { label: '全部', value: '' },
    { label: '启用', value: 1 },
    { label: '停用', value: 3 },
])

let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    console.log("userInfo:", d);
    paramsArray.value = [{ createUserName: d.userName, createUserParentOrgName: d.parentOrgName }];
})
const orgNameOptions = ref<any>([]);

getOrgTree().then(d=>{
     //所属机构名称
     let orgNameDisArr =  d.map(d=>{return d.orgName})
     let orgNameArr =  Array.from(new Set(orgNameDisArr))
     orgNameArr.unshift('')
     orgNameOptions.value = orgNameArr.map(d=> { return {'label':d,'value':d}})
})





const gridSearchRef = ref()
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, statusOptions, syncEvent, initDialog,gridSearchRef, gridEvents,orgNameOptions
}