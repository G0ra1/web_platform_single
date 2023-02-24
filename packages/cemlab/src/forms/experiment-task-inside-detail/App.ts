/**
 * @Description 实验单
 * @author 云数网讯 lihongyu@netwisd.com@netwisd.com
 * @date 2023-01-09 12:09:27
 */

import { ref, reactive } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm, request } from "@platform/main";
import { FormSchema } from "./conf";
import CemlabExperimentReceipts from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { VxeGridProps } from 'vxe-table'
class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<CemlabExperimentReceipts>(new CemlabExperimentReceipts());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    //执行初始化自定义脚本
    initScript = async (params: any) => {
        request({
            url: `/cemlab/cemlabExperimentReceipts/getInDetailByTaskId/` + params[0].id,
            method: 'get',
        }).then((res) => {
            this.dataModel.value = res
        });
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

    processColumns = [
        { type: 'seq', title: '序号', minWidth: '50px', align: 'center'},
        { field: 'experimentName', title: '实验名称', showHeaderOverflow: true, minWidth: '180px', align: 'center' , editRender: { enabled: false }},
        { field: 'experimentDate', title: '实验时间', showHeaderOverflow: true, minWidth: '180px', align: 'center' , editRender: { enabled: false }},
        { title: '操作', showHeaderOverflow: true, minWidth: '100px', align: 'center', slots: { default: 'processDetail',edit:'processDetail'} , editRender: { enabled: false }},
    ]

    processConditionColumns = [
        { field: 'conditionItem', minWidth: 150, title: '条件', align: 'center' },
        { field: 'conditionVal', minWidth: 150, title: '数值', align: 'center'},
    ]

    processResultColumns = [
        { field: 'resultItem', minWidth: 150, title: '检测项目', align: 'center' },
        { field: 'resultVal', minWidth: 150, title: '数值', align: 'center' },
    ]
}

const bind = reactive<VxeGridProps>({
    columns: [
        { field: 'slurryType', title: '浆体类型', showHeaderOverflow: false, minWidth: '160px', align: 'center', slots: { default: 'slurryType_default' } },
        { field: 'density', title: '密度', showHeaderOverflow: false, minWidth: '160px', align: 'center', slots: { edit: 'density_edit' } },
        { field: 'filterLoss', title: '滤失量', showHeaderOverflow: true, minWidth: '160px', align: 'center', slots: { edit: 'filterLoss_edit' } },
        { field: 'freeFluid', title: '游离液', showHeaderOverflow: true, minWidth: '160px', align: 'center', slots: { edit: 'freeFluid_edit' } },
        { field: 'cementConsistency', title: '水泥浆稠度', showHeaderOverflow: true, minWidth: '160px', align: 'center', slots: { edit: 'cementConsistency_edit' } },
        { field: 'thickeningTime', title: '稠化时间', showHeaderOverflow: true, minWidth: '160px', align: 'center', slots: { edit: 'thickeningTime_edit' } },
        { field: 'compressiveStrength', title: '抗压强度', showHeaderOverflow: true, minWidth: '160px', align: 'center', slots: { edit: 'compressiveStrength_edit' } },
        { field: 'compressiveStrengthTime', title: '抗压强度时间', showHeaderOverflow: true, minWidth: '160px', align: 'center', slots: { edit: 'compressiveStrengthTime_edit' } },
        { field: 'fluidity', title: '流动度', showHeaderOverflow: true, minWidth: '160px', align: 'center', slots: { edit: 'fluidity_edit' } },
    ]
})

const cementTypeBind = reactive<VxeGridProps>({
    align: 'center',
    height: 300,
    columns: [
        { type: 'seq', width: 50 },
        { type: 'checkbox', width: 50 },
        { field: 'recipeMaterialsDict', title: '配方材料', slots: { edit: 'recipeMaterialsDict_edit', default: 'recipeMaterialsDict_edit' } },
        { field: 'recipeQuantity', title: '加量', slots: { edit: 'density_edit' } },
    ]
})

export {
    FormModal, bind, cementTypeBind
}
