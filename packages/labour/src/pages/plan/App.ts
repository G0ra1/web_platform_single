/**
 * @Description 需求计划信息
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-19 20:21:13
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

//-- 例子看完删除它
const typeArray = ["primary", "info"];
const statusArray = [ "否" , "是"];
/*const statusOptions = ref([
    { label: '请选择', value: '' },
    { label: '启用', value: 1 },
    { label: '停用', value: 3 },
])*/
/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { 
                field: 'planName', 
                title: '需求计划名称', 
                showHeaderOverflow: true, 
                width: '160px', 
                align: 'center' ,
                slots: {
                    default: ({ row }) => {
                      return h(
                        "a",
                        {
                          href: 'javascript:void(0)',
                          style: 'text-decoration: none',
                          onClick: () => {
                            //第一个业务需要的字段。第二个显示的中文名称。
                            Page.toLevel2Menu('id', row.id, 'planName', row.planName, row)
                          }
                        },
                        { default: () => row.planName }
                      )
                    }
                }
            },
            { field: 'planNo', title: '需求计划编号', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planOrgId', title: '所属机构id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planOrgName', title: '所属机构名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planDeptId', title: '所属部门id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planDeptName', title: '所属部门名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planType', title: '需求类别（大修、日常、专项）', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'overhaulId', title: '大修id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'estimateAmount', title: '预估金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'budgetAmount', title: '预算金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planStartTime', title: '计划开始时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planEndTime', title: '计划结束时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            {   
                field: 'isGenOrder', 
                title: '是否生成订单', 
                showHeaderOverflow: true, 
                width: '160px', 
                align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.isGenOrder] } as {},
                        { default: () => statusArray[row.isGenOrder] }
                    )] as JSX.Element[]
                }
            },
            { field: 'pushOffTime', title: '推送截止时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "labourPlanForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "labourPlanForm_del", params: [row] }
                        );
                        //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                        return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourPlan/page',
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
    paramsArray.value = [{planOrgId: d.parentOrgId, planOrgName: d.parentOrgName,planDeptId: d.parentDeptId, planDeptName: d.parentDeptName }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}