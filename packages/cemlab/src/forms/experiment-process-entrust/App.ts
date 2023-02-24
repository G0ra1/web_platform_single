/**
 * @Description 委托实验过程录入
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-01-30 10:05:17
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm, Page, request } from "@platform/main";
import { FormSchema } from "./conf";
import CemlabExperimentProcess from "./model"
import { getExperimentItems, getDeviceNameList } from "./api";
import { cloneDeep } from "lodash";
import { VxeGridProps } from 'vxe-table';
import Rule from "./rule";
//水泥浆列表
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
            title: '水泥浆',
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
        { row: 3, col: 1, rowspan: 1, colspan: 6 },
        { row: 4, col: 1, rowspan: 1, colspan: 6 },
    ]
})
//泥浆列表
export const slurryBind = ref<VxeGridProps>({
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
            title: '泥浆',
            children: [
                { field: 'slurrySpeed3', title: '3', editRender: {}, slots: { edit: 'slurrySpeed3_edit', default: 'slurrySpeed3_defalut' } },
                { field: 'slurrySpeed6', title: '6', editRender: {}, slots: { edit: 'slurrySpeed6_edit', default: 'slurrySpeed6_defalut' } },
                { field: 'slurrySpeed100', title: '100', editRender: {}, slots: { edit: 'slurrySpeed100_edit', default: 'slurrySpeed100_defalut' } },
                { field: 'slurrySpeed200', title: '200', editRender: {}, slots: { edit: 'slurrySpeed200_edit', default: 'slurrySpeed200_defalut' } },
                { field: 'slurrySpeed300', title: '300', editRender: {}, slots: { edit: 'slurrySpeed300_edit', default: 'slurrySpeed300_defalut' } },
                { field: 'slurrySpeed600', title: '600', editRender: {}, slots: { edit: 'slurrySpeed600_edit', default: 'slurrySpeed600_defalut' } },
            ]
        }
    ],
    data: [],
    mergeCells: [
        { row: 1, col: 1, rowspan: 1, colspan: 6 },
        { row: 2, col: 1, rowspan: 1, colspan: 6 },
        { row: 3, col: 1, rowspan: 1, colspan: 6 },
        { row: 4, col: 1, rowspan: 1, colspan: 6 },
    ]
})
//前置液列表
export const prepadBind = ref<VxeGridProps>({
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
            title: '前置液',
            children: [
                { field: 'prepadSpeed3', title: '3', editRender: {}, slots: { edit: 'prepadSpeed3_edit', default: 'prepadSpeed3_defalut' } },
                { field: 'prepadSpeed6', title: '6', editRender: {}, slots: { edit: 'prepadSpeed6_edit', default: 'prepadSpeed6_defalut' } },
                { field: 'prepadSpeed100', title: '100', editRender: {}, slots: { edit: 'prepadSpeed100_edit', default: 'prepadSpeed100_defalut' } },
                { field: 'prepadSpeed200', title: '200', editRender: {}, slots: { edit: 'prepadSpeed200_edit', default: 'prepadSpeed200_defalut' } },
                { field: 'prepadSpeed300', title: '300', editRender: {}, slots: { edit: 'prepadSpeed300_edit', default: 'prepadSpeed300_defalut' } },
                { field: 'prepadSpeed600', title: '600', editRender: {}, slots: { edit: 'prepadSpeed600_edit', default: 'prepadSpeed600_defalut' } },
            ]
        }
    ],
    data: [],
    mergeCells: [
        { row: 1, col: 1, rowspan: 1, colspan: 6 },
        { row: 2, col: 1, rowspan: 1, colspan: 6 },
        { row: 3, col: 1, rowspan: 1, colspan: 6 },
        { row: 4, col: 1, rowspan: 1, colspan: 6 },
    ]
})
//实验结果 自动填入 表单
export const actualBind = ref<VxeGridProps>({
    align: 'center',
    border: true,
    editConfig: {
        trigger: 'click',
        mode: 'row'
    },
    columns: [
        { field: 'actualExperimentTemperature', title: '实际实验温度(°C)', editRender: {}, slots: { edit: 'actualExperimentTemperature_edit', default: 'actualExperimentTemperature_defalut' } },
        { field: 'actualExperimentPressure', title: '实际实验压力(MPa)', editRender: {}, slots: { edit: 'actualExperimentPressure_edit', default: 'actualExperimentPressure_defalut' } },
        { field: 'actualHeatingTime', title: '实际升温时间(min)', editRender: {}, slots: { edit: 'actualHeatingTime_edit', default: 'actualHeatingTime_defalut' } },
    ],
    data: [],
})
let deviceNameList: any = ref([]);
//加载设备
request({
    url: `/cemlab/cemlabDevice/list`,
    method: 'post',
    data: {}
}).then((res) => {
    if (res) {
        deviceNameList.value = res
    }
});
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

    //执行初始化自定义脚本
    initScript = async (params: any) => {
        if (!this.dataModel.value.experimentType) {
            this.dataModel.value.experimentType = 1;
        }
        //回显检测项目数据
        getExperimentItems({ experimentReceiptsId: this.dataModel.value.experimentReceiptsId }).then(d => {
            this.dataModel.value.cemlabExperimentItemsList = d
        })
    }

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: object) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);
        //实际条件信息
        actualBind.value.data = [
            {
                actualExperimentTemperature: this.dataModel.value.actualExperimentTemperature,
                actualExperimentPressure: this.dataModel.value.actualExperimentPressure,
                actualHeatingTime: this.dataModel.value.actualHeatingTime,
            }
        ]
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
            { six: '塑性粘度(Pa·s)', cementSlurrySpeed3: this.dataModel.value.cementSlurryPlasticViscosity },
            { six: '动切力(Pa)', cementSlurrySpeed3: this.dataModel.value.cementSlurryYieldVal },
            { six: '流性指数n', cementSlurrySpeed3: this.dataModel.value.cementSlurryLiquidity },
            { six: '稠度系数k(Pa·sn)', cementSlurrySpeed3: this.dataModel.value.cementSlurryConsistencyCoefficient },
        ]
        slurryBind.value.data = [
            {
                six: '平均转速(r/min)',
                slurrySpeed3: this.dataModel.value.slurrySpeed3,
                slurrySpeed6: this.dataModel.value.slurrySpeed6,
                slurrySpeed100: this.dataModel.value.slurrySpeed100,
                slurrySpeed200: this.dataModel.value.slurrySpeed200,
                slurrySpeed300: this.dataModel.value.slurrySpeed300,
                slurrySpeed600: this.dataModel.value.slurrySpeed600
            },
            { six: '塑性粘度(Pa·s)', slurrySpeed3: this.dataModel.value.slurryPlasticViscosity },
            { six: '动切力(Pa)', slurrySpeed3: this.dataModel.value.slurryYieldVal },
            { six: '流性指数n', slurrySpeed3: this.dataModel.value.slurryLiquidity },
            { six: '稠度系数k(Pa·sn)', slurrySpeed3: this.dataModel.value.slurryConsistencyCoefficient },
        ]
        prepadBind.value.data = [
            {
                six: '平均转速(r/min)',
                prepadSpeed3: this.dataModel.value.prepadSpeed3,
                prepadSpeed6: this.dataModel.value.prepadSpeed6,
                prepadSpeed100: this.dataModel.value.prepadSpeed100,
                prepadSpeed200: this.dataModel.value.prepadSpeed200,
                prepadSpeed300: this.dataModel.value.prepadSpeed300,
                prepadSpeed600: this.dataModel.value.prepadSpeed600
            },
            { six: '塑性粘度(Pa·s)', prepadSpeed3: this.dataModel.value.prepadPlasticViscosity },
            { six: '动切力(Pa)', prepadSpeed3: this.dataModel.value.prepadYieldVal },
            { six: '流性指数n', prepadSpeed3: this.dataModel.value.prepadLiquidity },
            { six: '稠度系数k(Pa·sn)', prepadSpeed3: this.dataModel.value.prepadConsistencyCoefficient },
        ]

    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
    //实验条件列
    conditionColumns = [
        { field: 'conditionItem', title: '条件', editRender: { enabled: true }, slots: { edit: 'conditionItem', default: 'conditionItemDefault' }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
        { field: 'conditionVal', title: '数值', editRender: { enabled: true }, slots: { edit: 'conditionVal', default: 'conditionValDefault' }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
    ]
    //实际条件字段
    experimentConditionColumns = [
        { field: 'actualExperimentTemperature', title: '实际实验温度(℃)', editRender: { enabled: false }, slots: { edit: 'actualExperimentTemperature', default: 'actualExperimentTemperature' }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
        { field: 'actualExperimentPressure', title: '实际实验压力(MPa)', editRender: { enabled: false }, slots: { edit: 'actualExperimentPressure', default: 'actualExperimentPressure' }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
        { field: 'actualHeatingTime', title: '实际升温时间(min)', editRender: { enabled: false }, slots: { edit: 'actualHeatingTime', default: 'actualHeatingTime' }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
    ]
    //检测项目列
    testItemColumns = [
        { field: 'detectionItem', title: '检测项目', editRender: { enabled: true }, slots: { edit: 'detectionItem', default: 'detectionItemDefault' }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
        { field: 'detectionVal', title: '数值', editRender: { enabled: true }, slots: { edit: 'detectionVal', default: 'detectionValDefault' }, showHeaderOverflow: true, minWidth: '180px', align: 'center' },
    ]
    cementPasteColumns = [
        { title: '类型', key: '类型' },
        { title: '水泥浆', key: '水泥浆' }
    ]

}

export {
    FormModal, deviceNameList
}
