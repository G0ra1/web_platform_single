import { number } from 'echarts';
import { values } from 'lodash';
/**
 * @Description 鉴定申请
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2022-11-30 22:08:38
 */

import { ref, h, computed } from 'vue';
import { FormInst, FormRules, NTag, FormItemRule } from 'naive-ui';
import { AbstractForm, Page, Request } from "@platform/main";
import { FormSchema } from "./conf";
import AssetAppraisal from "./model"
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
    dataModel = ref<AssetAppraisal>(new AssetAppraisal());

    //验证规则
    rules = ref<FormRules>({
        dealNum: [
            {
                required: true,
                validator(rule: FormItemRule, value: number) {
                    if (value < 0) {
                        return new Error('请输入处置数量')
                    }
                    return true
                },
                trigger: ['input', 'blur']
            }
        ]
    });
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参.
    setValue = (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；

        Object.assign(this.dataModel.value, d);
        // getById(this.dataModel.value.dealApplyId).then((data) => {
        //     this.dataModel.value.assetsDetailIds = data.assetDealDetailList.map(d => d.assetsDetailId)
        // })

    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
    //计算总数
    totalNum = computed(() => {
        let sum = 0;
        this.dataModel.value.assetDealAppraisalDetailList.map((d: any) => {
            sum += d.appraisalNum;
        });
        this.dataModel.value.sumAppraisalTotal = sum;
        return sum;
    });
    //回显列
    columns = [
        { field: 'itemName', minWidth: 100, title: '物资名称', editRender: { enabled: false }, slots: { edit: 'itemName' } },
        { field: 'itemCode', minWidth: 100, title: '物资编码', editRender: { enabled: false }, slots: { edit: 'itemCode' } },
        { field: 'desclong', minWidth: 180, title: '物资长描述', editRender: { enabled: false }, slots: { edit: 'desclong' } },
        // { field: 'assetOrgName', minWidth: 100, title: '所属机构名称', editRender: { enabled: false }, slots: { edit: 'assetOrgName' } },
        // { field: 'assetDeptName', minWidth: 100, title: '所属部门名称', editRender: { enabled: false }, slots: { edit: 'assetDeptName' } },
        {
            field: 'itemType', minWidth: 80, title: '资产类型', editRender: { enabled: false }, slots: {
                default: ({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )]
            }
        },
        { field: 'unitName', minWidth: 100, title: '单位', editRender: { enabled: false }, slots: { edit: 'unitName' } },
        { field: 'specs', minWidth: 100, title: '规格', editRender: { enabled: false }, slots: { edit: 'specs' } },
        //{ field: 'warehouseName', minWidth: 100, title: '仓库', editRender: { enabled: false }, slots: { edit: 'warehouseName' } },
        // { field: 'shelfId', minWidth: 100, title: '货架号', editRender: { enabled: false }, slots: { edit: 'assetDeptName' } },
        //{ field: 'dealNum', minWidth: 100, title: '待鉴定数量', editRender: { enabled: false }, slots: { edit: 'dealNum' } },
        // { field: 'totalAppraisalNum', minWidth: 100, title: '已鉴定数量', editRender: { enabled: false }, slots: { edit: 'totalAppraisalNum' } },
        { field: 'notAppraisalNum', minWidth: 90, title: '未鉴定数量', editRender: { enabled: false }, slots: { edit: 'notAppraisalNum' } },
        //{ field: 'dealNum', minWidth: 100, title: '处置完成数量', editRender: { enabled: false }, slots: { edit: 'dealNum' } },
        { field: 'appraisalNum', minWidth: 100, title: '鉴定数量', editRender: { enabled: true }, slots: { edit: 'appraisalNum' } },
        { field: 'appraisalResult', minWidth: 100, title: '鉴定结果', editRender: { enabled: true }, slots: { edit: 'appraisalResult' } },
        { field: 'appraisalAmount', minWidth: 100, title: '鉴定金额', editRender: { enabled: true }, slots: { edit: 'appraisalAmount' } },
    ]
    //组装列
    doubleListCols = [
        { colKey: 'itemName', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资名称'), ellipsis: true },
        { colKey: 'itemCode', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资编码'), ellipsis: true },
        { colKey: 'desclong', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资长描述'), ellipsis: true },
        // { colKey: 'assetOrgName', width: 180, align: 'center', title: () => h('B', { style: 'color: #000' }, '所属机构名称'), ellipsis: true },
        // { colKey: 'assetDeptName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '所属部门名称'), ellipsis: true },
        {
            colKey: 'itemType', width: 80, align: 'center', title: () => h('B', { style: 'color: #000' }, '资产类型'), ellipsis: true,
            cell: (h: any, context: { col: any, row: any }) => statusArray[context.row.itemType]
        },
        { colKey: 'unitName', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '物资单位名称'), ellipsis: true },
        { colKey: 'specs', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '规格'), ellipsis: true },
        // { colKey: 'qualityAssuranceLevel', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '质保等级'), ellipsis: true },
        // { colKey: 'warehouseName', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '仓库地点'), ellipsis: true },
        //{ colKey: 'shelfId', width: 150, align: 'center', title: () => h('B', { style: 'color: #000' }, '货架号'), ellipsis: true },
        // { colKey: 'assetsNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '总数量'), ellipsis: true },
        // { colKey: 'stockNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '库存数量'), ellipsis: true },
        //{ colKey: 'scrappedNumber', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '报废数量'), ellipsis: true },

        //{ colKey: 'dealNum', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '待鉴定数量'), ellipsis: true },
        // { colKey: 'totalAppraisalNum', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '已鉴定数量'), ellipsis: true },
        { colKey: 'notAppraisalNum', width: 90, align: 'center', title: () => h('B', { style: 'color: #000' }, '未鉴定数量'), ellipsis: true },
        //{ colKey: 'dealNum', width: 100, align: 'center', title: () => h('B', { style: 'color: #000' }, '处置数量'), ellipsis: true },
    ];

}

export {
    FormModal
}
