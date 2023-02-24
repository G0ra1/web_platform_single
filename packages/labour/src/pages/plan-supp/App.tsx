/**
 * @Description 需求计划信息
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-19 20:21:13
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page,NwIcon } from '@platform/main'
import { NTag } from 'naive-ui'
import { getlabourPlanList } from './api/index'

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

//-- 例子看完删除它
const typeArray = ["primary", "info"];
const statusArray = [ "否" , "是"];

//审批状态
const _statusArray = [ "草稿" , "审批中","审批通过","审批未通过"];


//需求类别枚举
let planTypeMap = new Map();
planTypeMap.set("1", "大修");
planTypeMap.set("2", "日常");
planTypeMap.set("3", "专项");

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
            { 
                field: 'planName', 
                title: '需求计划名称', 
                showHeaderOverflow: true, 
                align: 'center' ,
                width: '160px',
                showOverflow:true,
                slots: {
                    default: ({ row }) => {
                      return h(
                        "a",
                        {
                          href: 'javascript:void(0)',
                          style: 'text-decoration: none',
                          onClick: () => {
                            //第一个业务需要的字段。第二个显示的中文名称。
                            Page.toLevel2Menu('id', row.id, 'planName', row.planName, '', row)
                          }
                        },
                        { default: () => row.planName }
                      )
                    }
                }
            },
            { field: 'planNo', title: '需求计划编号', showHeaderOverflow: true, showOverflow:true, width: '160px', align: 'center' },
            { field: 'planOrgName', title: '所属机构名称', showHeaderOverflow: true, showOverflow:true, width: '160px', align: 'center' },
            { field: 'planDeptName', title: '所属部门名称', showHeaderOverflow: true, showOverflow:true,  width: '160px',align: 'center' },
            { field: 'createUserName', title: '需求发起人', showHeaderOverflow: true, showOverflow:true,  width: '160px',align: 'center' },
            { 
                field: 'planType', title: '需求类别', showHeaderOverflow: true, showOverflow:true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: "info" } as {},
                        { default: () => planTypeMap.get(row.planType) }
                    )] as JSX.Element[]
                }
            },
            {   
                field: 'auditStatus',title: '审批状态',showHeaderOverflow: true,width: '160px', showOverflow:true,align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        {
                            size: "small", type: ["error", "info", "success", "warning", ''][row.auditStatus], round: "round", class: "grid-ntag"
                        } as {},
                        {
                            default: () =>_statusArray[row.auditStatus] ,
                            icon: () => h(
                                NwIcon,
                                {
                                    name: ["icon-n-n-error", "icon-n-n-mark", "icon-n-n-check_fill", "icon-n-n-warning", "icon-n-n-mark"][row.auditStatus]
                                }
                            )

                        }
                    )] as JSX.Element[]
                }
            },
            { field: 'overhaulCode', title: '大修轮次', showHeaderOverflow: true, showOverflow:true, width: '160px', align: 'center' },
            { field: 'overhaulName', title: '大修名称', showHeaderOverflow: true, showOverflow:true, width: '160px', align: 'center' },
            { field: 'planStartTime', title: '计划开始时间', showHeaderOverflow: true, showOverflow:true, width: '160px',align: 'center' },
            { field: 'planEndTime', title: '计划结束时间', showHeaderOverflow: true, showOverflow:true, width: '160px', align: 'center' },
            {   
                field: 'isGenOrder', 
                title: '是否生成订单', 
                showHeaderOverflow: true, 
                width: '160px', 
                align: 'center',
                showOverflow:true,
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.isGenOrder] } as {},
                        { default: () => statusArray[row.isGenOrder] }
                    )] as JSX.Element[]
                }
            },
            { field: 'pushOffTime', title: '推送截止时间', showHeaderOverflow: true, showOverflow:true, width: '160px', align: 'center' },
           
        ]
    }, new RequestPaging(
        '/labour/labourPlan/suppPage',
        'post'
    )
)

const refresh = () => {
reset({})
}

//所属机构名称 选项
let planOrgNameOptions = ref<any>([]);
// 审核状态 选项
const auditStatusOptions = ref([
    { label: '', value:''},
    { label: '草稿', value: 0},
    { label: '审批中', value: 1},
    { label: '审批通过', value: 2},
    { label: '审批未通过', value: 3}
])
//需求类别 选项
const planTypeOptions = ref([
    { label: '', value:''},
    { label: '大修', value:'1'},
    { label: '日常', value:'2'},
    { label: '专项', value:'3'},
])
// 是否生成正式数据
const isGenOrderOptions = ref([
    { label: '', value:''},
    { label: '否', value: 0},
    { label: '是', value: 1},
])
getlabourPlanList().then((d)=>{
    //所属机构名称
    let planOrgNameDisArr =  d.map(d=>{return d.planOrgName})
    let planOrgNameArr =  Array.from(new Set(planOrgNameDisArr))
    planOrgNameArr.unshift('')
    planOrgNameOptions.value = planOrgNameArr.map(d=> { return {'label':d,'value':d}})
})

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{planOrgId: d.parentOrgId, planOrgName: d.parentOrgName,planDeptId: d.parentDeptId, planDeptName: d.parentDeptName }];
})
const gridSearchRef = ref()
export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,gridSearchRef, gridEvents,planOrgNameOptions,auditStatusOptions,planTypeOptions,isGenOrderOptions
}