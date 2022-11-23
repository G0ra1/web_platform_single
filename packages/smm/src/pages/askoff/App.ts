/*
 * @Author: zouliming 
 * @Date: 2022-10-27 18:49:41 
 * @Last Modified by:   zouliming 
 * @Last Modified time: 2022-10-27 18:49:41 
 * @Description 请假申请列表
 */


import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import { NTag } from 'naive-ui'

//两个枚举
const typeArray = ["warning", "primary"];
const applyTypeArray = ["普通假", "病假"];

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { field: 'applyUserName', title: '申请人', showHeaderOverflow: true, width: '200px', align: 'center' },
            { field: 'applyDay', title: '请假天数', showHeaderOverflow: true, width: '200px', align: 'center' },
            { field: 'applyReason', title: '请假原因', showHeaderOverflow: true, width: '700px', align: 'center' },
            {
                title: '请假类型', showHeaderOverflow: true, width: '200px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.applyType] } as {},
                        { default: () => applyTypeArray[row.applyType] }
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
                            { code: "askForm_edit", params: [row] }
                        );
                        let del = h(
                            NwFunctionPredefine,
                            { code: "askForm_del", params: [row] }
                        );
                        //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                        return [edit, del]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/platform/platformAskOff/page',
        'post'
    )
)

const refresh = () => {
    reset({})
}

const applyTypeList = ref([
    { label: '普通假', value: 0 },
    { label: '病假', value: 1 },
])

let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ applyUserId: d.id, applyUserName: d.userName }];
})

export {
    bind, gridRef, filterData, query, refresh, applyTypeList, reset, paramsArray
}