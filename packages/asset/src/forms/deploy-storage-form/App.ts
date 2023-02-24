/**
 * @Description 物资调拨入库
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-22 15:30:24
 */

import { ref,h } from 'vue';
import { FormInst, FormRules,NTag } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import AssetPurchaseStorage from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
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
    dataModel = ref<AssetPurchaseStorage>(new AssetPurchaseStorage());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    //执行初始化自定义脚本
    initScript = async (params: any) => {
    }

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
     //回显列
     columns = [
        { field: 'itemName', minWidth: 100, title: '物资名称', editRender: { enabled: false }, slots: { edit: 'itemName' } },
        { field: 'itemCode', minWidth: 100, title: '物资编码', editRender: { enabled: false }, slots: { edit: 'itemCode' } },
        { field: 'assetsCode', minWidth: 100, title: '资产编号', editRender: { enabled: true }, slots: { edit: 'assetsCode' } },
         { field: 'desclong', minWidth: 100, title: '物资长描述', editRender: { enabled: false }, slots: { edit: 'desclong' } },
        /* {
            field: 'itemType', minWidth: 100, title: '资产类型', editRender: { enabled: false }, slots: {
                default: ({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )]
            }
        }, */
        { field: 'classifyTypeName', minWidth: 100, title: '资产类型', editRender: { enabled: true }, slots: { edit: 'classifyTypeName' } },
        { field: 'itemType', minWidth: 100, title: '物资类别', editRender: { enabled: true }, slots: { edit: 'itemType' } },

        { field: 'unitName', minWidth: 100, title: '物资单位名称', editRender: { enabled: false }, slots: { edit: 'unitName' } },
         { field: 'specs', minWidth: 100, title: '规格', editRender: { enabled: false }, slots: { edit: 'specs' } },
         { field: 'supplierName', minWidth: 100, title: '供应商', editRender: { enabled: true }, slots: { edit: 'supplierName' } },
         { field: 'contractCode', minWidth: 100, title: '合同号', editRender: { enabled: true }, slots: { edit: 'contractCode' } },
         { field: 'billCodes', minWidth: 100, title: '发票号', editRender: { enabled: true }, slots: { edit: 'billCodes' } },

         { field: 'notStorageNumber', minWidth: 100, title: '未入库数量', editRender: { enabled: false }, slots: { edit: 'notStorageNumber' } },
        { field: 'storageNumber', minWidth: 100, title: '入库数量', editRender: { enabled: true }, slots: { edit: 'storageNumber' } },
        { field: 'storageAmount', minWidth: 100, title: '入库单价', editRender: { enabled: true }, slots: { edit: 'storageAmount' } , align: 'right', formatter: 'myAmount'},
        { field: 'storageTaxRate', minWidth: 100, title: '税率(%)', editRender: { enabled: true }, slots: { edit: 'storageTaxRate' } },
        { field: 'warehouseName', minWidth: 100, title: '仓库', editRender: { enabled: true }, slots: { edit: 'warehouseName' } },
        { field: 'shelfName', minWidth: 100, title: '货架号', editRender: { enabled: true }, slots: { edit: 'shelfName' } },
        { field: 'storageTime', minWidth: 100, title: '入库日期', editRender: { enabled: true }, slots: { edit: 'storageTime' } },

     ]
    
    //选择框列
    doubleListCols = [
        { colKey: 'itemName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资名称'), ellipsis: true },
        { colKey: 'itemCode', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资编码'), ellipsis: true },
        { colKey: 'desclong', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资长描述'), ellipsis: true },
        {
            colKey: 'itemType', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产类型'), ellipsis: true,
            cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.itemType]
        },
        { colKey: 'unitName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资单位名称'), ellipsis: true },
        { colKey: 'specs', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '规格'), ellipsis: true },
        { colKey: 'notStorageNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '未入库数量'), ellipsis: true },
    ];

}

export {
    FormModal
}
