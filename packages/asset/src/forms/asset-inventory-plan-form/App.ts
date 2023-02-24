/**
 * @Description 物资盘点
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2022-11-28 18:34:31
 */

import { ref,h, computed } from 'vue';
import { FormInst, FormRules,NTag, SelectOption } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import AssetInventoryPlan from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { getResult } from '../../components/chooseDetailByAsset/api';

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
    dataModel = ref<AssetInventoryPlan>(new AssetInventoryPlan());
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

    // a = computed(() => {
    //         debugger
    //         let sumTotalNumber = 0;
    //         this.dataModel.value.detailList.map((d: any) => {
    //             sumTotalNumber += d.assetsNumber*1;
    //         })
    //         this.dataModel.value.sumTotalNumber = sumTotalNumber;
    //         return sumTotalNumber;
    //     }
    // )


    assetList = [
        
        { colKey: 'itemCode', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资编码'), ellipsis: true, showOverflow: true },
        { colKey: 'itemName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资名称'), ellipsis: true },
        { colKey: 'desclong', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资长描述'), ellipsis: true, showOverflow: true },
        { colKey: 'assetOrgName', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产所属机构名称'), ellipsis: true, showOverflow: true },
        { colKey: 'assetDeptName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产所属部门名称'), ellipsis: true, showOverflow: true },
        {
            colKey: 'itemType', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产类型'), ellipsis: true,
            cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.itemType]
        },
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
        { field: 'paperNumber', minWidth: 100, title: '账面数量', slots: { edit: 'paperNumber' } },
        { field: 'useUserName', minWidth: 100, title: '使用人/应盘点人', slots: { edit: 'useUserName' } },
        // { field: 'acceptNumber', minWidth: 100, title: '领用数量', slots: { edit: 'acceptNumber' } },
    ];

    inventoryTypeOptions = [
        { label : '固定资产', value : '1' },
        { label : '非固定资产', value : '2' }
    ]

    inventoryTypeChange =async (val : string , option : SelectOption) => {

        
        this.dataModel.value.inventoryTypeCode = val;
        this.dataModel.value.inventoryTypeName = option.label as string;
        
        // this.dataModel.value.assetParams.classifyTypeCode = val;
        // const response = await getResult('/asset/assetAssetsDetail/list', this.dataModel.value.assetParams);
        // const data = cloneDeep(response)
        // this.dataModel.value.detailList = data.map((item) => {
        //     console.log("assetsId => {}",item.assetsId);
        //     item.assetsDetailId = item.id;
        //     item.paperNumber = item.assetsNumber;
        //     if(!item.useUserId){
        //         item.useUserId = dataModel.value.createUserId;
        //         item.useUserName = dataModel.value.createUserName;
        //         item.useUserOrgId = dataModel.value.createUserParentOrgId;
        //         item.useUserOrgName = dataModel.value.createUserParentOrgName;
        //         item.useUserDeptId = dataModel.value.createUserParentDeptId;
        //         item.useUserDeptName = dataModel.value.createUserParentDeptName;
        //     }
        //     delete item.id;
        //     delete item.createUserId;
        //     delete item.createUserName;
        //     delete item.createUserParentOrgId;
        //     delete item.createUserParentOrgName;
        //     delete item.createUserParentDeptId;
        //     delete item.createUserParentDeptName;
        //     return new InventoryPlanDetail(item);
        // }
        //}
    }
    
}

export {
    FormModal
}
