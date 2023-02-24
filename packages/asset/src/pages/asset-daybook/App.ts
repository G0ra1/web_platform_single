/**
 * @Description 资产流水表
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-27 10:53:55
 */

import { ref, h } from 'vue';
import { FormInst, FormRules, NTag } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import AssetDaybook from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
const data = ref<Array<AssetDaybook>>([]);
const vxeTableRef = ref<any>();

const dayBookTypeArr = ['购置登记', '购置验收', '购置入库', '财务入账', '领用申请', '领用退还', '出库申请', '退库申请', '借用申请', '借用归还', '信息变更', '任务派发', '派发签收', '明细账修改']

class FormModal extends AbstractForm {

    //执行初始化自定义脚本
    initScript = async (params: any) => {
    }
    getSchema = async () => {
        return {};
    };

    setValue = async (d: object) => {
        // debugger
        // await init(d as any);
        Object.assign(data.value, d);
        vxeTableRef.value.reloadData(data.value);
    };
    getValue = async () => {
        return {};
    };

    columns = [
        { field: 'itemCode', title: '物资编码', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
        { field: 'itemName', title: '物资名称', showHeaderOverflow: true, minWidth: '180px', align: 'center' },
        { field: 'type', title: '类型', showHeaderOverflow: true, minWidth: '100px', align: 'center',
            slots: {
                default:({ row }: any) => [h(
                    NTag,
                    { size: "small", type: 'primary' } as {},
                    { default: () => dayBookTypeArr[row.type]}
                )],
            }
        },
        { field: 'createTime', title: '时间', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
        { field: 'createUserName', title: '人员', showHeaderOverflow: true, minWidth: '100px', align: 'center' },  
    ]

}


export {
    FormModal,
    vxeTableRef,
    data
}
