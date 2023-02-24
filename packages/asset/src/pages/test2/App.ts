/**
 * @Description 测试
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-11-17 10:15:00
 */

import { ref, h, Component } from 'vue';
import { FormInst, FormRules, NTag } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import MyModel from "./model"
import { cloneDeep } from "lodash";
import { NIcon } from 'naive-ui';
const typeArray = ["", "primary", "info", "success", "warning"];
const statusArray = ["", "资产", "低值易耗品", "库存", "原材料"];
class FormModal extends AbstractForm {

    constructor() {
        super();
        //Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref(new MyModel());
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
        console.log("setValue", d);
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
    }
    columns = [
        { field: 'itemName', minWidth: 100, title: '物资名称', slots: { edit: 'itemName' } },
        { field: 'itemCode', minWidth: 100, title: '物资编码', slots: { edit: 'itemCode' } },
        { field: 'desclong', minWidth: 100, title: '物资长描述', slots: { edit: 'desclong' } },
        { field: 'assetOrgName', minWidth: 100, title: '资产所属机构名称', slots: { edit: 'assetOrgName' } },
        { field: 'assetDeptName', minWidth: 100, title: '资产所属部门名称', slots: { edit: 'assetDeptName' } },
        {
            field: 'itemType', title: '资产类型', slots: {
                edit: ({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )]
            }
        },
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

    colDetails = [
        { colKey: 'itemName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资名称'), ellipsis: true },
        { colKey: 'itemCode', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资编码'), ellipsis: true },
        { colKey: 'desclong', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资长描述'), ellipsis: true },
        { colKey: 'assetOrgName', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产所属机构名称'), ellipsis: true },
        { colKey: 'assetDeptName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产所属部门名称'), ellipsis: true },
        { colKey: 'unitName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资单位名称'), ellipsis: true },
        { colKey: 'supplierName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '供应商'), ellipsis: true },
        { colKey: 'qualityAssuranceLevel', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '质保等级'), ellipsis: true },
        { colKey: 'warehouseName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '仓库地点'), ellipsis: true },
        { colKey: 'assetsNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '总数量'), ellipsis: true },
        { colKey: 'deliveryNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '出库数量'), ellipsis: true },
        { colKey: 'acceptNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '领用数量'), ellipsis: true },
        { colKey: 'stockNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '库存数量'), ellipsis: true },
        { colKey: 'repairNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '维修数量'), ellipsis: true },
        { colKey: 'scrappedNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '报废数量'), ellipsis: true },
        { colKey: 'transferNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '调拨数量'), ellipsis: true },
        {
            colKey: 'itemType', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产类型'), ellipsis: true,
            cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.itemType]
        },
        {
            colKey: 'warehouseState', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产入库状态'), ellipsis: true,
            cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.warehouseState]
        },
        { colKey: 'operation', align: 'center', title: () => h('B', { style: 'color: #000' }, '操作'), cell: 'operation', fixed: 'right', ellipsis: true },
    ];

    doubleListCols = [
        { colKey: 'itemName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资名称'), ellipsis: true },
        { colKey: 'itemCode', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资编码'), ellipsis: true },
        { colKey: 'desclong', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资长描述'), ellipsis: true },
        { colKey: 'assetOrgName', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产所属机构名称'), ellipsis: true },
        { colKey: 'assetDeptName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产所属部门名称'), ellipsis: true },
        { colKey: 'unitName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资单位名称'), ellipsis: true },
        { colKey: 'supplierName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '供应商'), ellipsis: true },
        { colKey: 'qualityAssuranceLevel', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '质保等级'), ellipsis: true },
        { colKey: 'warehouseName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '仓库地点'), ellipsis: true },
        { colKey: 'assetsNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '总数量'), ellipsis: true },
        { colKey: 'deliveryNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '出库数量'), ellipsis: true },
        { colKey: 'acceptNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '领用数量'), ellipsis: true },
        { colKey: 'stockNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '库存数量'), ellipsis: true },
        { colKey: 'repairNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '维修数量'), ellipsis: true },
        { colKey: 'scrappedNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '报废数量'), ellipsis: true },
        { colKey: 'transferNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '调拨数量'), ellipsis: true },
        {
            colKey: 'itemType', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产类型'), ellipsis: true,
            cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.itemType]
        },
        {
            colKey: 'warehouseState', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产入库状态'), ellipsis: true,
            cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.warehouseState]
        },
    ];

    userClos = [
        { colKey: 'userName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '用户账号'), ellipsis: true },
        { colKey: 'userNameCh', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '用户姓名'), ellipsis: true },
        { colKey: 'idCard', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '证件号'), ellipsis: true },
        { colKey: 'parentOrgName', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '所属组织'), ellipsis: true },
    ];
}

export {
    FormModal,
}
