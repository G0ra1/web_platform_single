/**
 * @Description 处置登记申请
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-12-13 18:02:08
 */

import { ref, h, computed } from 'vue';
import { FormInst, FormRules, NTag } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import AssetDealRegister from "./model"
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
    dataModel = ref<AssetDealRegister>(new AssetDealRegister());
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
    totalNum = computed(() => {
        let sum = 0;
        this.dataModel.value.assetDealRegisterDetailList.map((d: any) => {
            sum += d.registerNum;
        });
        this.dataModel.value.registerNumber = sum;
        return sum;
    });
    //回显列
    columns = [
        { field: 'itemName', minWidth: 100, title: '物资名称', editRender: { enabled: false }, slots: { edit: 'itemName' } },
        { field: 'itemCode', minWidth: 100, title: '物资编码', editRender: { enabled: false }, slots: { edit: 'itemCode' } },
        { field: 'desclong', minWidth: 100, title: '物资长描述', editRender: { enabled: false }, slots: { edit: 'desclong' } },
        // { field: 'assetOrgName', minWidth: 100, title: '所属机构名称', editRender: { enabled: false }, slots: { edit: 'assetOrgName' } },
        // { field: 'assetDeptName', minWidth: 100, title: '所属部门名称', editRender: { enabled: false }, slots: { edit: 'assetDeptName' } },
        {
            field: 'itemType', minWidth: 100, title: '资产类型', editRender: { enabled: false }, slots: {
                default: ({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )]
            }
        },
        { field: 'unitName', minWidth: 100, title: '单位', editRender: { enabled: false }, slots: { edit: 'unitName' } },
        //{ field: 'qualityAssuranceLevel', minWidth: 100, title: '质保等级', editRender: { enabled: false }, slots: { edit: 'qualityAssuranceLevel' } },
        { field: 'specs', minWidth: 100, title: '规格', editRender: { enabled: false }, slots: { edit: 'specs' } },
        //{ field: 'warehouseName', minWidth: 100, title: '仓库', editRender: { enabled: false }, slots: { edit: 'warehouseName' } },
        //{ field: 'shelfId', minWidth: 100, title: '货架号', editRender: { enabled: false }, slots: { edit: 'assetDeptName' } },
        // { field: 'totalAppraisalNum', minWidth: 100, title: '已鉴定数量', editRender: { enabled: false }, slots: { edit: 'totalAppraisalNum' } },
        { field: 'appraisalResult', minWidth: 100, title: '鉴定结果', editRender: { enabled: false }, slots: { edit: 'appraisalResult' } },
        { field: 'appraisalAmount', minWidth: 100, title: '鉴定金额', editRender: { enabled: false }, slots: { edit: 'appraisalAmount' } },
        { field: 'appraisalExplain', minWidth: 100, title: '鉴定说明', editRender: { enabled: false }, slots: { edit: 'appraisalExplain' } },
        { field: 'notRegisterNum', minWidth: 100, title: '未登记数量', editRender: { enabled: false }, slots: { edit: 'notRegisterNum' } },
        { field: 'registerNum', minWidth: 100, title: '登记数量', editRender: { enabled: true }, slots: { edit: 'registerNum' } },

        //{ field: 'isRegisterNum', minWidth: 100, title: '已登记数量', editRender: { enabled: false }, slots: { edit: 'isRegisterNum' } },
    ]
    //选择框列
    doubleListCols = [
        { colKey: 'itemName', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资名称'), ellipsis: true },
        { colKey: 'itemCode', width: 120, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资编码'), ellipsis: true },
        { colKey: 'desclong', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资长描述'), ellipsis: true },
        // { colKey: 'assetOrgName', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '所属机构名称'), ellipsis: true },
        // { colKey: 'assetDeptName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '所属部门名称'), ellipsis: true },
        {
            colKey: 'itemType', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产类型'), ellipsis: true,
            cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.itemType]
        },
        { colKey: 'unitName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '单位'), ellipsis: true },
        // { colKey: 'qualityAssuranceLevel', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '质保等级'), ellipsis: true },
        { colKey: 'specs', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '规格'), ellipsis: true },
        //  { colKey: 'warehouseName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '仓库地点'), ellipsis: true },
        //{ colKey: 'assetsNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '总数量'), ellipsis: true },
        //{ colKey: 'totalAppraisalNum', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '已鉴定数量'), ellipsis: true },
        // { colKey: 'notRegisterNum', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '未登记数量'), ellipsis: true },
        { colKey: 'notRegisterNum', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '未登记数量'), ellipsis: true },
    ];
}

export {
    FormModal
}
