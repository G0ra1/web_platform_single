/**
 * @Description 资产调配
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-11-24 16:30:16
 */

import { ref,h,Component } from 'vue';
import { FormInst, FormRules, NTag, NIcon } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import AssetMaterialDeploy from "./model"
import { cloneDeep } from "lodash";
import { dataModel } from "./store.js";
import Rule from "./rule";
let dialogLocal: any;
let messageLocal: any;
function initDialog(dialog: any, message: any) {
    dialogLocal = dialog;
    messageLocal = message;
}
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
    dataModel = ref<AssetMaterialDeploy>(new AssetMaterialDeploy());
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
    renderIcon = (icon: Component) => {
        return h(NIcon, null, {
            default: () => h(icon)
        })
    };
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

    columns = [
        { type: "seq",  align: 'center', width: 50, minWidth: 50 },
        { field: 'itemName', minWidth: 150, title: '物资名称',align: 'center', editRender: {enabled:false},slots: { edit: 'itemName' } },
        { field: 'itemCode', minWidth: 100, title: '物资编码',align: 'center', editRender: {enabled:false},slots: { edit: 'itemCode' } },
        { field: 'desclong', minWidth: 150, title: '物资长描述',align: 'center',editRender: {enabled:false}, slots: { edit: 'desclong' } },
        { field: 'assetOrgName', minWidth: 150, title: '资产所属机构名称',align: 'center', editRender: {enabled:false}, slots: { edit: 'assetOrgName' } },
        { field: 'assetDeptName', minWidth: 120, title: '资产所属部门名称',align: 'center', editRender: {enabled:false}, slots: { edit: 'assetDeptName' } },
        {
            field: 'itemType', minWidth: 100, title: '资产类型', align: 'center', editRender: {enabled:false}, slots: {
                default: ({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )]
            }
        },
        { field: 'materialQuality', minWidth: 100, title: '物资材质', align: 'center', editRender: {enabled:false}, slots: { edit: 'materialQuality' } },
        { field: 'unitName', minWidth: 50, title: '单位', align: 'center',editRender: {enabled:false}, slots: { edit: 'unitName' } },
        { field: 'usableNumber', minWidth: 100, title: '可调拨数量', align: 'center', editRender: {enabled:false}, slots: { edit: 'usableNumber' } },
        { field: 'deployNumber', minWidth: 100, title: '调拨数量', align: 'center', editRender: {enabled:true}, slots: { edit: 'deployNumber' } },

    ];
}

export {
    FormModal
}

