/**
 * @Description 任务管理-内部通知单详情
 * @author 云数网讯 lvchengming@netwisd.com
 * @date 2023-02-09 14:09:27
 */

import { ref, reactive } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
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
    sonForms = ref<any>([]);
    //表单值
    dataModel = ref<CemlabExperimentReceipts>(new CemlabExperimentReceipts());
    //验证规则
    rules = ref<FormRules>({});
    sonRules = ref<FormRules>({
        sampleType: {
            required: true,
            message: '请选择样品类型',
            trigger: ['blur', 'change'],
            type: 'number'
        },
        slurryType: {
            required: true,
            message: '请选择浆体类型',
            trigger: ['blur', 'change'],
            type: 'number'
        },
        cementType: {
            required: true,
            message: '请选择水泥型号',
            trigger: ['blur', 'change'],
            type: 'string'
        },
        cementQuantity: {
            required: true,
            message: '请输入加量',
            trigger: ['blur', 'input'],
            type: 'number'
        },
        slurryFormulation: {
            required: true,
            message: '请输入水泥配方',
            trigger: [],
            type: 'string'
        },
        experimentTemperature: {
            required: true,
            message: '请输入实验温度',
            trigger: ['blur', 'input'],
            type: 'string'
        },
        experimentPressure: {
            required: true,
            message: '请输入实验压力',
            trigger: ['blur', 'input'],
            type: 'string'
        },
        heatingTime: {
            required: true,
            message: '请输入升温时间',
            trigger: ['blur', 'input'],
            type: 'string'
        },
        curingTemperature: {
            required: true,
            message: '请输入养护温度(°C)',
            trigger: ['blur', 'input'],
            type: 'string'
        },
        curingPressure: {
            required: true,
            message: '请输入养护压力(MPa)',
            trigger: ['blur', 'input'],
            type: 'string'
        },
        curingTime: {
            required: true,
            message: '请输入养护时间(h)',
            trigger: ['blur', 'input'],
            type: 'string'
        },
        staticTemperature: {
            required: true,
            message: '请输入静止温度(°C)',
            trigger: ['blur', 'input'],
            type: 'string'
        },
        coefficient: {
            required: true,
            message: '请输入',
            trigger: ['blur', 'input'],
            type: 'string'
        },
        cementDensity: {
            required: true,
            message: '请输入',
            trigger: ['blur', 'input'],
            type: 'string'
        },
        waterCementRatio: {
            required: true,
            message: '请输入',
            trigger: ['blur', 'input'],
            type: 'string'
        },
    });
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    async validate() {
        const res = []
        res.push(
            ...await super.validate()
        )
        for (let i = 0; i < this.sonForms.value.length; i++) {
            await this.sonForms.value[i].validate().then(() => {

            }).catch((e: Array<object>) => {
                res.push(...e.map((m: any) => m[0].message))
            })
        }
        return res;
    };

    //执行初始化自定义脚本
    initScript = async (params: any) => {
        if (this.dataModel.value.cemlabExperimentConditionList.length == 0) {
            this.dataModel.value.cemlabExperimentConditionList = [{
                isDel: 0
            }]
        }
        if (this.dataModel.value.cemlabExperimentSlurryDemandList.length == 0) {
            this.dataModel.value.cemlabExperimentSlurryDemandList = [{
                isDel: 0
            }]
        }
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
}

const bind = reactive<VxeGridProps>({
  columns: [
    {
      field: "slurryType",
      title: "浆体类型",
      showHeaderOverflow: false,
      minWidth: "153px",
      align: "center",
      editRender: { enabled: false },
      slots: { default: "slurryType_default" },
    },
    {
      field: "density",
      title: "密度",
      showHeaderOverflow: false,
      minWidth: "153px",
      align: "center",
    },
    {
      field: "filterLoss",
      title: "滤失量",
      showHeaderOverflow: true,
      minWidth: "153px",
      align: "center",
    },
    {
      field: "freeFluid",
      title: "游离液",
      showHeaderOverflow: true,
      minWidth: "153px",
      align: "center",
    },
    {
      field: "cementConsistency",
      title: "水泥浆稠度",
      showHeaderOverflow: true,
      minWidth: "153px",
      align: "center",
    },
    {
      field: "thickeningTime",
      title: "稠化时间",
      showHeaderOverflow: true,
      minWidth: "153px",
      align: "center",
    },
    {
      field: "compressiveStrength",
      title: "抗压强度",
      showHeaderOverflow: true,
      minWidth: "153px",
      align: "center",
    },
    {
      field: "compressiveStrengthTime",
      title: "抗压强度时间",
      showHeaderOverflow: true,
      minWidth: "153px",
      align: "center",
    },
    {
      field: "fluidity",
      title: "流动度",
      showHeaderOverflow: true,
      minWidth: "153px",
      align: "center",
    },
  ],
  editConfig: {
    trigger: "click",
    mode: "cell",
    beforeEditMethod({ columnIndex }) {
      if (columnIndex === 0) {
        return false;
      }
      return true;
    },
  },
});

const cementTypeBind = reactive<VxeGridProps>({
    align: 'center',
    height: 300,
    columns: [
        { type: 'seq', width: 50 },
        { type: 'checkbox', width: 50 },
        { field: 'recipeMaterialsDict', title: '配方材料', editRender: {}, slots: { edit: 'recipeMaterialsDict_edit', default: 'recipeMaterialsDict_edit' } },
        { field: 'recipeQuantity', title: '加量', editRender: {}, slots: { edit: 'density_edit' } },
    ],
    editConfig: {
        trigger: 'click',
        mode: 'cell',
        autoClear: false
    },
})

export {
    FormModal, bind, cementTypeBind
}
