/**
 * @Description 资产借用
 * @author 云数网讯 lhy@netwisd.com
 * @date 2022-12-01 12:18:53
 */

import { ref ,h, computed, watch} from 'vue';
import { FormInst, FormRules,NTag } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import { cloneDeep } from "lodash";
import Rule from "./rule";
import purchaseBorrowStorage from './model';

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
        watch(this.dataModel,()=>{
            //监听dataModel数据变化
            if (this.dataModel.value.detailList){
                let sumTotalAmount:number = 0;
                let sumTotalUntaxedAmount:number = 0;
                let sumTotalTaxAmount:number = 0;
                let sumTotalNumber:number = 0;
                this.dataModel.value.detailList.map((item)=>{
                    if (item.storageNumber){
                        sumTotalNumber = sumTotalNumber + item.storageNumber;
                    }
                    if (item.storageAmount && item.storageNumber){
                        item.storageSumAmount = item.storageAmount * item.storageNumber;
                        sumTotalAmount = sumTotalAmount + item.storageSumAmount;
                    }
                    if (item.storageAmount && item.storageTaxRate){
                        item.storageUntaxedAmount = item.storageAmount / (1 + (item.storageTaxRate / 100));
                        item.storageTaxAmount = item.storageAmount - item.storageUntaxedAmount;
                        if (item.storageNumber){
                            item.storageSumUntaxedAmount = item.storageUntaxedAmount * item.storageNumber;
                            item.storageSumTaxAmount = item.storageTaxAmount * item.storageNumber;
                        }
                    }
                    if (item.storageSumTaxAmount){
                        sumTotalTaxAmount = sumTotalTaxAmount + item.storageSumTaxAmount;
                    }
                    if (item.storageSumUntaxedAmount){
                        sumTotalUntaxedAmount = sumTotalUntaxedAmount + item.storageSumUntaxedAmount;
                    }
                })
                this.dataModel.value.sumTotalNumber = sumTotalNumber;
                this.dataModel.value.sumTotalAmount = sumTotalAmount;
                this.dataModel.value.sumTotalTaxAmount = sumTotalTaxAmount;
                this.dataModel.value.sumTotalUntaxedAmount = sumTotalUntaxedAmount;
            }
        },{
            deep: true
        })
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<purchaseBorrowStorage>(new purchaseBorrowStorage());
    
    //删除出库明细的时候会调用
    assetDetailUpdate = (t:any,d:any) => {
        
    }
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

    chooseColumns = [
        { colKey: 'itemName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资名称'), ellipsis: true },
        { colKey: 'itemCode', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资编码'), ellipsis: true },
        { colKey: 'classifyName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资分类'), ellipsis: true },
        { colKey: 'descshort', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资短描述'), ellipsis: true },
        { colKey: 'desclong', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资长描述'), ellipsis: true },
        { colKey: 'unitName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资单位'), ellipsis: true },
    ];

    detailColumns = [
        { field: 'assetsCode', minWidth: 100, title: '资产编号', editRender: { enabled: true }, slots: { edit: 'assetsCode' } },
        { field: 'itemCode', minWidth: 100, title: '物资编码', editRender: { enabled: false }, slots: { edit: 'itemCode' } },
        { field: 'classifyTypeName', minWidth: 100, title: '资产类型', editRender: { enabled: true }, slots: { edit: 'classifyTypeName' } },
        { field: 'itemName', minWidth: 100, title: '物资名称', editRender: { enabled: false }, slots: { edit: 'itemName' } },
        { field: 'descshort', minWidth: 100, title: '物资短描述', editRender: { enabled: false }, slots: { edit: 'descshort' } },
        { field: 'desclong', minWidth: 100, title: '物资长描述', editRender: { enabled: false }, slots: { edit: 'desclong' } },
        { field: 'specs', minWidth: 100, title: '规格', editRender: { enabled: false }, slots: { edit: 'specs' } },
        { field: 'supplierName', minWidth: 100, title: '供应商', editRender: { enabled: true }, slots: { edit: 'supplierName' } },
        { field: 'contractCode', minWidth: 100, title: '合同号', editRender: { enabled: true }, slots: { edit: 'contractCode' } },
        { field: 'billCodes', minWidth: 100, title: '发票号', editRender: { enabled: true }, slots: { edit: 'billCodes' } },
        { field: 'unitName', minWidth: 100, title: '物资单位', editRender: { enabled: false }, slots: { edit: 'unitName' } },
        { field: 'deliveryNumber', minWidth: 100, title: '可入库数量', editRender: { enabled: false }, slots: { edit: 'deliveryNumber' } },
        { field: 'storageNumber', minWidth: 100, title: '入库数量', editRender: { enabled: true }, slots: { edit: 'storageNumber' } },
        { field: 'storageAmount', minWidth: 100, title: '入库单价', editRender: { enabled: true }, slots: { edit: 'storageAmount' } },
        { field: 'storageTaxRate', minWidth: 100, title: '入库税率', editRender: { enabled: true }, slots: { edit: 'storageTaxRate' } },
        { field: 'storageTime', minWidth: 100, title: '入库日期', editRender: { enabled: true }, slots: { edit: 'storageTime' } },
        { field: 'warehouseName', minWidth: 100, title: '仓库', editRender: { enabled: true }, slots: { edit: 'warehouseName' } },
        { field: 'shelfName', minWidth: 100, title: '货架号', editRender: { enabled: true }, slots: { edit: 'shelfName' } },
        { field: 'remark', minWidth: 100, title: '备注', editRender: { enabled: true }, slots: { edit: 'remark' } },
    ];
}

export {
    FormModal
}
