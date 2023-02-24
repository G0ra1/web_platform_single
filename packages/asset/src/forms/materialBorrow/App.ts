/**
 * @Description 资产借用
 * @author 云数网讯 lhy@netwisd.com
 * @date 2022-12-01 12:18:53
 */

import { ref ,h} from 'vue';
import { FormInst, FormRules,NTag } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import MaterialBorrow from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import MyModel from './model';
const typeArray = ["", "primary", "info", "success", "warning"];
const statusArray = ["", "资产", "低值易耗品", "库存", "原材料"];
class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<MaterialBorrow>(new MaterialBorrow());
    //物资明细
    myModel = ref<MyModel>(new MyModel());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };

    columns = [
        {
            field: 'itemType',minWidth: 80, title: '资产类型', slots: {
                default:({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )],
                edit: ({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )]
            }
        },
        { field: 'itemName', minWidth: 150, title: '物资名称', slots: { edit: 'itemName' } },
        { field: 'itemCode', minWidth: 150, title: '物资编码', slots: { edit: 'itemCode' } },
        { field: 'desclong', minWidth: 150, title: '物资长描述', slots: { edit: 'desclong' } },
        { field: 'assetOrgName', minWidth: 150, title: '资产所属机构名称', slots: { edit: 'assetOrgName' } },
        { field: 'assetDeptName', minWidth: 150, title: '资产所属部门名称', slots: { edit: 'assetDeptName' } },
        { field: 'usableNumber', minWidth: 150, title: '可借用数量', slots: { edit: 'usableNumber' } },
        { field: 'borrowNumber', minWidth: 150, title: '借用数量', slots: { edit: 'borrowNumber' } },
        // {
        //     field: 'itemType', title: '资产类型', slots: {
        //         defalut: ({ row }: any) => [h(
        //             NTag,
        //             { size: "small", type: typeArray[row.itemType] } as {},
        //             { default: () => statusArray[row.itemType] }
        //         )]
        //     }
        // },
    ];

    doubeList = [
        { colKey: 'itemName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资名称'), ellipsis: true },
        { colKey: 'itemCode', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资编码'), ellipsis: true, showOverflow: true },
        { colKey: 'desclong', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资长描述'), ellipsis: true, showOverflow: true },
        { colKey: 'assetOrgName', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产所属机构名称'), ellipsis: true, showOverflow: true },
        { colKey: 'assetDeptName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产所属部门名称'), ellipsis: true, showOverflow: true },
        {
            colKey: 'itemType', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产类型'), ellipsis: true,
            cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.itemType]
        },
    ];
}

export {
    FormModal
}
