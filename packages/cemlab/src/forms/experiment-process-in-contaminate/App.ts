/**
 * @Description 实验过程
 * @author 云数网讯 lihongyu@netwisd.com@netwisd.com
 * @date 2023-01-30 15:18:07
 */

import { ref, reactive } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm, request } from "@platform/main";
import { FormSchema } from "./conf";
import CemlabExperimentProcess from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { VxeGridProps } from 'vxe-table';

export const cementSlurryBind = ref<VxeGridProps>({
    align: 'center',
    border: true,
    editConfig: {
        trigger: 'click',
        mode: 'row',
        beforeEditMethod({ rowIndex }) {
            if (rowIndex != 0) {
                return false
            }
            return true
        }
    },
    columns: [
        {
            title: '类型',
            children: [
                { field: 'six', title: '六转速(r/min)' },
            ]
        },
        {
            title: '混合液体',
            children: [
                { field: 'cementSlurrySpeed3', title: '3', editRender: {}, slots: { edit: 'cementSlurrySpeed3_edit', default: 'cementSlurrySpeed3_defalut' } },
                { field: 'cementSlurrySpeed6', title: '6', editRender: {}, slots: { edit: 'cementSlurrySpeed6_edit', default: 'cementSlurrySpeed6_defalut' } },
                { field: 'cementSlurrySpeed100', title: '100', editRender: {}, slots: { edit: 'cementSlurrySpeed100_edit', default: 'cementSlurrySpeed100_defalut' } },
                { field: 'cementSlurrySpeed200', title: '200', editRender: {}, slots: { edit: 'cementSlurrySpeed200_edit', default: 'cementSlurrySpeed200_defalut' } },
                { field: 'cementSlurrySpeed300', title: '300', editRender: {}, slots: { edit: 'cementSlurrySpeed300_edit', default: 'cementSlurrySpeed300_defalut' } },
                { field: 'cementSlurrySpeed600', title: '600', editRender: {}, slots: { edit: 'cementSlurrySpeed600_edit', default: 'cementSlurrySpeed600_defalut' } },
            ]
        }
    ],
    data: [],
    mergeCells: [
        { row: 1, col: 1, rowspan: 1, colspan: 6 },
        { row: 2, col: 1, rowspan: 1, colspan: 6 },
    ]
})
class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<CemlabExperimentProcess>(new CemlabExperimentProcess());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});
    //水泥配方
    slurryFormulation = ref<string>();
    //执行初始化自定义脚本
    initScript = async (params: any) => {
        //过程类型
        if (!this.dataModel.value.experimentType){
            this.dataModel.value.experimentType = 2;
        }
        //根据条件id查询条件详情
       request({
            url: `/cemlab/cemlabExperimentCondition/`+params[0].experimentConditionId,
            method: 'get'
        }).then((res) => {
            this.slurryFormulation.value = res.slurryFormulation
            this.dataModel.value.slurryType = res.slurryType
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
        cementSlurryBind.value.data = [
            {
                six: '平均转速(r/min)',
                cementSlurrySpeed3: this.dataModel.value.cementSlurrySpeed3,
                cementSlurrySpeed6: this.dataModel.value.cementSlurrySpeed6,
                cementSlurrySpeed100: this.dataModel.value.cementSlurrySpeed100,
                cementSlurrySpeed200: this.dataModel.value.cementSlurrySpeed200,
                cementSlurrySpeed300: this.dataModel.value.cementSlurrySpeed300,
                cementSlurrySpeed600: this.dataModel.value.cementSlurrySpeed600
            },
            { six: '流性指数n', cementSlurrySpeed3: this.dataModel.value.cementSlurryLiquidity },
            { six: '稠度系数k(Pa·sn)', cementSlurrySpeed3: this.dataModel.value.cementSlurryConsistencyCoefficient },
        ]
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
}

const cementTypeBind = reactive<VxeGridProps>({
    align: 'center',
    height: 300,
    columns: [
        { type: 'seq', width: 50 },
        { type: 'checkbox', width: 50 },
        { field: 'recipeMaterialsDict', title: '配方材料', editRender: {}, slots: { edit: 'recipeMaterialsDict_edit',default:'recipeMaterialsDict_edit' } },
        { field: 'recipeQuantity', title: '加量', editRender: {}, slots: { edit: 'density_edit' }},
    ],
    editConfig: {
        trigger: 'click',
        mode: 'cell',
        autoClear:false
    },
})

export {
    FormModal , cementTypeBind
}
