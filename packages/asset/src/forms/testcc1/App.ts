/**
 * @Description 盘点任务
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-12-06 17:59:32
 */

import { ref,h } from 'vue';
import { FormInst, FormRules,NTag } from 'naive-ui';
import { AbstractForm,request } from "@platform/main";
import { FormSchema } from "./conf";
import AssetInventoryTask from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import InventoryPlanDetail from '../asset-inventory-plan-form/detailModel';

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
    dataModel = ref<AssetInventoryTask>(new AssetInventoryTask());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };
    
    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue =  (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);
    };  


    setDetailValue =async (inventoryId:string) => {
        const detailList =  request({
            url : '/asset/inventoryPlan/getDetailByIdAndUser/'+inventoryId,
            method : 'get'
        });
        //this.emit('callback', await cloneDeep(detailList));
    }

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };

    assetList = [
        
        { field: 'itemCode', minWidth: 120, align: 'center', title: '物资编码' },
        { field: 'itemName', minWidth: 120, align: 'center', title: '物资名称' },
        { field: 'desclong', minWidth: 180, align: 'center', title:  '物资长描述', resizable: true},
        { field: 'assetOrgName', minWidth: 180, align: 'center', title: '资产所属机构名称' },
        { field: 'assetDeptName', minWidth: 180, align: 'center', title: '资产所属部门名称' },
        // {
        //     colKey: 'itemType', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产类型'), ellipsis: true,
        //     cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.itemType]
        // },
    ];

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
        { field: 'itemCode', minWidth: 80, title: '物资编码', slots: { edit: 'itemCode' } },
        { field: 'itemName', minWidth: 100, title: '物资名称', slots: { edit: 'itemName' } },
        { field: 'desclong', minWidth: 100, title: '物资长描述', slots: { edit: 'desclong' } },
        // { field: 'assetOrgName', minWidth: 100, title: '资产所属机构名称', slots: { edit: 'assetOrgName' } },
        // { field: 'assetDeptName', minWidth: 100, title: '资产所属部门名称', slots: { edit: 'assetDeptName' } },
        { field: 'unitCode', minWidth: 100, title: '物资单位编码', slots: { edit: 'unitCode' } },
        { field: 'unitName', minWidth: 100, title: '物资单位名称', slots: { edit: 'unitName' } },
        { field: 'materialQuality', minWidth: 100, title: '物资材质', slots: { edit: 'materialQuality' } },
        { field: 'standard', minWidth: 100, title: '物资标准', slots: { edit: 'standard' } },
        { field: 'specs', minWidth: 100, title: '物资规格', slots: { edit: 'specs' } },
        { field: 'stockNumber', minWidth: 100, title: '库存数量', slots: { edit: 'stockNumber' } },
        { field: 'acceptNumber', minWidth: 100, title: '领用数量', slots: { edit: 'acceptNumber' } },
        
    ];
}



export {
    FormModal
}
