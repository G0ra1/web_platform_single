/**
 * @Description 字典
 * @author 云数网讯 Panfakun@netwisd.com
 * @date 2022-11-24 10:44:32
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db,Utils } from '@platform/main'
import { NTag } from 'naive-ui'

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

//-- 例子看完删除它
const typeArray = [ "primary","info"];
const statusArray = [  "停用","启用" ];
/*const statusOptions = ref([
    { label: '请选择', value: '' },
    { label: '启用', value: 1 },
    { label: '停用', value: 3 },
])*/

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
            
            { field: 'dicttypeid', title: '字典类型id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'dictid', title: '字典值', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'dictname', title: '字典名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'status', title: '状态', showHeaderOverflow: true, width: '160px', align: 'center',
            slots: {
                default: ({ row }) => [h(
                    NTag,
                    { size: "small", type:typeArray[row.status] } as {},
                    { default: () => statusArray[row.status] }
                )] as JSX.Element[]
            }
            },
            { field: 'sortno', title: '排序序号', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'ranks', title: '排序', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'seqno', title: '排序层级编码', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'synctime', title: '同步时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'source', title: '数据来源', showHeaderOverflow: true, width: '160px', align: 'center',
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
                                { code: "labourEosDictForm_edit", params: [row] }
                            );
                            let del = h(
                                NwFunctionPredefine,
                                { code: "labourEosDictForm_del", params: [row] }
                            );
                            //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                            return [edit, del]
                        }
                    },
                }
        ]
    }, new RequestPaging(
        '/labour/labourEosDict/page',
        'post'
    )
)

const refresh = () => {
    reset({dicttypeid:Utils.parseQuery(window.location.search.substring(1)).dicttypeid})
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog
}