/**
 * @Description 用户
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-11-17 10:15:00
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import  NTag  from 'naive-ui'

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

const typeArray = ["error", "success", "info"];
const sexArray = ["未知", "男", "女"];
const sexOptions = ref([
    { label: '请选择', value: '' },
    { label: '男', value: 1 },
    { label: '女', value: 2 },
])


//数据来源枚举
let sourceMap = new Map();
sourceMap.set("self_build","自建");
sourceMap.set("cnijx_contract","商法系统");
sourceMap.set("cnijx_portal","人力管理系统");
sourceMap.set("cnijx_ems","工时系统");

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { field: 'phoneNum', title: '手机号', showHeaderOverflow: true, width: '240px', align: 'center' },
            { field: 'userNameCh', title: '姓名', showHeaderOverflow: true, width: '240px', align: 'center' },
            { field: 'idCard', title: '身份证', showHeaderOverflow: true, width: '300px', align: 'center' },
            {
                title: '性别', showHeaderOverflow: true, width: '100px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.sex] } as {},
                        { default: () => sexArray[row.sex] }
                    )] as JSX.Element[]
                }
            },
            { field: 'unitName', title: '所在单位', showHeaderOverflow: true, width: '280px', align: 'center' },
            { field: 'partName', title: '所在部门', showHeaderOverflow: true, width: '260px', align: 'center' },
            { field: 'source', title: '数据来源', showHeaderOverflow: true, width: '200px', align: 'center',
            slots: {
                default: ({ row }) => [h(
                    NTag,
                    { size: "small", type: "info" } as {},
                    { default: () => sourceMap.get(row.source) }
                )] as JSX.Element[]
            }
            },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "labourSuppUserForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "labourSuppUserForm_del", params: [row] }
                        );
                        //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                        return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourSuppUser/page',
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
    console.log(d);
    paramsArray.value = [{ parentOrgId: d.parentOrgId, parentOrgName: d.parentOrgName }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, sexOptions
}