/**
 * @Description 资产台账
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-11-28 11:38:24
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import { NTag } from 'naive-ui'
import { MdmOrgVo } from '@platform/mdm'
import { format } from "date-fns";

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;

function initDialog(dialog: any) {
    dialogLocal = dialog;
}

//-- 例子看完删除它
const typeArray = ["", "primary", "info", "success", "warning"];
const statusArray = ["", "资产", "低值易耗品", "库存", "原材料"];
const searchStatusOptions = [
    { label : '出库', value : '1' },
    { label : '领用', value : '2' },
    { label : '库存', value : '3' },
    // { label : '维修', value : '4' },
    // { label : '报废', value : '5' },
    // { label : '调出', value : '6' },
    { label : '借用', value : '7' }
]

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            {
                title: '物资类型', showHeaderOverflow: true, minWidth: '100px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.itemType] } as {},
                        { default: () => statusArray[row.itemType] }
                    )] as JSX.Element[]
                }
            },
            { field: 'classifyCode', title: '物资分类编码', showHeaderOverflow: true, minWidth: '100px', align: 'center'},
            { field: 'classifyName', title: '物资分类名称', showHeaderOverflow: true, minWidth: '180px', align: 'center' },
            { field: 'itemCode', title: '物资编码', showHeaderOverflow: true, minWidth: '100px', align: 'center',
                slots: {
                    default: ({ row }) => [
                        h(
                            NwFunctionPredefine,
                            { code: "assetDayBookView", descr: "资产明细概况", params: [row.id] },
                            {
                                auth: (fn: any) => {
                                    return h(
                                        'a',
                                        { href: "javascript:void", textDecoration: 'none', onClick: fn },
                                        row.itemCode
                                    )
                                },
                                unauth: () => row.itemCode
                            }
                        )
                    ]
                } 
            },
            { field: 'itemName', title: '物资名称', showHeaderOverflow: true, minWidth: '180px', align: 'center' },
            { field: 'assetsCode', title: '资产编码', showHeaderOverflow: true, minWidth: '180px', align: 'center', showOverflow: true },
            { field: 'assetSelfCode', title: '资产自编码', showHeaderOverflow: true, minWidth: '180px', align: 'center', showOverflow: true },
            { field: 'assetFinanceCode', title: '财务编码', showHeaderOverflow: true, minWidth: '140px', align: 'center', showOverflow: true },
            //{ field: 'desclong', title: '备注', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
            { field: 'descshort', title: '物资短描述', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
            { field: 'assetOrgName', title: '所属机构', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
            { field: 'assetDeptName', title: '所属部门', showHeaderOverflow: true, minWidth: '180px', align: 'center', showOverflow: true },
            { field: 'classifyCode', title: '分类编码', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'classifyName', title: '分类名称', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
            { field: 'unitName', title: '物资单位', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
            { field: 'materialQuality', title: '物资材质', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'standard', title: '物资标准', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'specs', title: '物资规格', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
            { field: 'qualityAssuranceLevel', title: '质保等级', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'manufacturer', title: '生产厂家', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'productionDate', title: '生产日期', showHeaderOverflow: true, minWidth: '100px', align: 'center' ,
                slots: {
                    default: ({ row }) => {
                        if(typeof(row.productionDate)=='undefined' || row.productionDate==null || row.productionDate==''){
                            return row.productionDate; 
                        }
                        return format(new Date(row.productionDate),"yyyy-MM-dd");
                        
                    }
                }
            },
            { field: 'batchNumber', title: '批次/炉号', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'factoryCode', title: '出厂编号', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'serviceLife', title: '使用年限', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'warehouseName', title: '仓库地点', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'shelfName', title: '货架号', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            { field: 'useUserName', title: '资产使用人', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
            { field: 'status', title: '物资状态', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '75px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetAssetsDetailFormEdit", params: [row] }
                        );
                        /* let del = h(
                            NwFunctionPredefine,
                            { code: "assetAssetsDetailForm_del", params: [row] }
                        ); */
                        //return row.camundaProcinsId ? row.auditStatus ? [] : [del] : [edit, del]
                        return [edit]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/asset/assetAssetsDetail/list',
        'post',
    )
)

const refresh = (params: object) => {
    reset(params)
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})




const handleClick = (value: string | MdmOrgVo) => {
    filterData.value = {};
    if (typeof value === "string") {
        filterData.value.classifyCode = value;
    } else {
        if (value.orgType === 1) {
            filterData.value.assetOrgId = value.id;
        } else {
            filterData.value.assetDeptId = value.id;
        }
    }
    refresh(filterData.value);
}

export {
    bind, 
    gridRef, 
    filterData, 
    query, 
    refresh, 
    reset, 
    paramsArray, 
    initDialog, 
    handleClick,
    searchStatusOptions
}