/**
 * @Description 工时信息
 * @author 云数网讯 Panfakun@netwisd.com
 * @date 2022-12-06 15:24:10
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import { NTag } from 'naive-ui'
import { getlabourHourAllotList } from './api/index'

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}
const isHourArray = ["primary", "info"];
const isHourStatusArray = ["否", "是"];
//数据来源枚举
let sourceMap = new Map();
sourceMap.set("self_build", "自建");
sourceMap.set("cnijx_contract", "商法系统");
sourceMap.set("cnijx_portal", "人力管理系统");
sourceMap.set("cnijx_ems", "工时系统");
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
const { bind, gridRef, filterData, query, reset,gridEvents } = new VxeHelper.VxeGridPaging(
    {
        columns: [
          
            // { field: 'breakId', title: '回填ID', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'username', title: '姓名', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'hourType', title: '工时类别', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'allotHour', title: '分配工时', showHeaderOverflow: true, width: '160px', align: 'center' },
            { 
                field: 'allotDate', title: '分配日期', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({row}: any) =>{
                        return [  row.allotDate.substr(0,7)+"月" ]
                    }
                }
            },
            { field: 'userType', title: '人员类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workType', title: '工作类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'remark', title: '备注', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'numberId', title: '工作票ID', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'userid', title: '员工ID', showHeaderOverflow: true, width: '160px', align: 'center' },
            { 
                field: 'isDelete', title: '是否删除', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                      NTag,
                      { size: "small", type: isHourArray[row.isDelete] } as {},
                      { default: () => isHourStatusArray[row.isDelete] }
                    )] as JSX.Element[]
                  }
            },
            { field: 'orgname', title: '工时发放单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'factHour', title: '实际分配工时', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'idcard', title: '人员身份证', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'company', title: '员工所属单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'deptName', title: '工时发放部门', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'deptId', title: '工时发放部门ID', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'classGroupName', title: '工时发放班组名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'classGroupId', title: '工时发放班组ID', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'mId', title: '合单ID', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'empType', title: '用户形式', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'prepareAllotHour', title: '推荐工时', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'prepareHour', title: '', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'orgnameHr', title: '人事单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'source', title: '数据来源', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: "info" } as {},
                        { default: () => sourceMap.get(row.source) }
                    )] as JSX.Element[]
                }
            },
            { field: 'synctime', title: '同步时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            /*例子看完删除它{
                title: '是否启用', showHeaderOverflow: true, width: '100px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.status] } as {},
                        { default: () => statusArray[row.status] }
                    )] as JSX.Element[]
                }
            },*/
            // {
            //     title: '操作',
            //     showHeaderOverflow: true,
            //     align: 'center',
            //     width: '160px',
            //     slots: {
            //         default: ({ row }) => {
            //             let edit = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourHourAllotForm_edit", params: [row] }
            //             );
            //             let del = h(
            //                 NwFunctionPredefine,
            //                 { code: "labourHourAllotForm_del", params: [row] }
            //             );
            //             //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
            //             return [edit, del]
            //         }
            //     },
            // }
        ]
    }, new RequestPaging(
        '/labour/labourHourAllot/page',
        'post'
    )
)

const refresh = () => {
    reset({})
}

// 员工所属单位 选项
let companyOptions = ref<any>([]);
//工时发放单位 选项
let orgnameOptions = ref<any>([]);
// 人员类型 选项
let userTypeOptions = ref<any>([]);

 getlabourHourAllotList().then((d)=>{
    //员工所属单位数据
    let companyDisArr = d.map(d=>{return d.company})
    let companyArr =  Array.from(new Set(companyDisArr))
    companyOptions.value = companyArr.map((d)=>{
        return {'label':d,'value':d}
    })
    //工时发放单位数据
    let orgnameDisArr = d.map(d=>{return d.orgname})
    let orgnameArr =  Array.from(new Set(orgnameDisArr))
    orgnameOptions.value = orgnameArr.map((d)=>{
        return {'label':d,'value':d}
    })
    //人员类型 选项
    let userTypeDisArr = d.map(d=>{return d.userType}) 
    let userTypeArr =  Array.from(new Set(userTypeDisArr))
    userTypeOptions.value = userTypeArr.map((d)=>{
        return {'label':d,'value':d}
    })
})



/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})
const gridSearchRef = ref()
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,companyOptions,orgnameOptions,userTypeOptions,gridSearchRef, gridEvents
}