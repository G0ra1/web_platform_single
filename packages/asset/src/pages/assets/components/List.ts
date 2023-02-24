/**
 * @Description 资产台账
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-11-28 11:38:24
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, Db, NwFunctionPredefine } from '@platform/main'
import { NTag } from 'naive-ui'
import { MdmOrgVo } from '@platform/mdm'

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

const isViewDetail = ref<boolean>(false)
const hrefClick = () => {
    isViewDetail.value = true
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
                { field: 'itemCode', title: '物资编码', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true ,
                    slots: {
                        default: ({ row }) => [h(
                            NwFunctionPredefine,
                            { code: "assetDetailView", descr: "库存台账详情", params: [row.id] },
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
                        )]
                }
            },
            { field: 'itemName', title: '物资名称', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true, },
            { field: 'desclong', title: '物资长描述', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
            { field: 'descshort', title: '物资短描述', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
            { field: 'assetOrgName', title: '资产所属机构名称', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
            { field: 'assetDeptName', title: '资产所属部门名称', showHeaderOverflow: true, minWidth: '140px', align: 'center', showOverflow: true },
            { field: 'assetsNumber', title: '总数量', showHeaderOverflow: true, minWidth: '60px', align: 'center' },
            { field: 'deliveryNumber', title: '出库数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'acceptNumber', title: '领用数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'stockNumber', title: '库存数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'repairNumber', title: '维修数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'scrappedNumber', title: '报废数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'transferNumber', title: '调拨数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'borrowNumber', title: '借入数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'storageNumber', title: '入库数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'acceptanceNumber', title: '验收数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'usableNumber', title: '可用数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'entryNumber', title: '入账数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            { field: 'lendNumber', title: '借出数量', showHeaderOverflow: true, minWidth: '70px', align: 'center' },
            /* {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '75px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        let edit = h(
                            NwFunctionPredefine,
                            { code: "assetAssetsForm_edit", params: [row] }
                        );
                        return [edit]
                    }
                },
            } */
        ]
    }, new RequestPaging(
        '/asset/assetAssets/list',
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
        filterData.value.classifyId = value;
    } else {
        if (value.orgType === 1) {
            filterData.value.assetDeptId = value.id;
        } else {
            filterData.value.assetOrgId = value.id;
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
    isViewDetail, 
    searchStatusOptions
}