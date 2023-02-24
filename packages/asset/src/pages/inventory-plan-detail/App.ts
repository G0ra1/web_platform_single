/**
 * @Description 物资盘点
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-11-28 18:34:31
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'
import { auditStatusArray, auditStatusTypeArray} from '../../lib/constant/Constant';
import { format } from "date-fns";

const inventoryPlanId = Page.getMenuData().id;
/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

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
const { bind, gridRef, filterData, query, reset, gridEvents } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            
            { field: 'classifyCode', title: '物资编码', showHeaderOverflow: true,  align: 'center' },
            { field: 'classifyName', title: '分类名称', showHeaderOverflow: true,  align: 'center' },
            
            { field: 'itemCode', title: '物资编码', showHeaderOverflow: true,  align: 'center' },
            { field: 'itemName', title: '物资名称', showHeaderOverflow: true,  align: 'center' },

            { field: 'assetsCode', title: '资产编码', showHeaderOverflow: true,  align: 'center' },

            { field: 'descshort', title: '物资短描述', showHeaderOverflow: true, showOverflow: true,minWidth : '200px', align: 'center' },
            { field: 'materialQuality', title: '物资材质', showHeaderOverflow: true, showOverflow: true, align: 'center' },
            { field: 'standard', title: '物资标准', showHeaderOverflow: true, showOverflow: true, align: 'center' },
            { field: 'specs', title: '物资规格', showHeaderOverflow: true, showOverflow: true, align: 'center' },
            
            { field: 'paperNumber', title: '计划总数量', showHeaderOverflow: true,  align: 'center' },
            { field: 'finishNumber', title: '已盘点数量', showHeaderOverflow: true,  align: 'center' },
            { field: 'notFinishNumber', title: '未盘点数量', showHeaderOverflow: true,  align: 'center' },
            // { field: 'assetsUserName', title: '资产所属人', showHeaderOverflow: true,  align: 'center' },
        ]
    }, new RequestPaging(
        '/asset/inventoryPlan/detail/page',
        'post'
    )
)

const refresh = () => {
    reset({inventoryPlanId : inventoryPlanId})
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {

})

const gridSearchRef = ref()

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, gridSearchRef, gridEvents, inventoryPlanId
}