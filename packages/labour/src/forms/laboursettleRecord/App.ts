/**
 * @Description 需求计划信息
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-19 20:21:13
 */

import { defineComponent,ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import { getByVirtualPurchaseId,settleReverse } from "./api";
import { LabourVirtualPurchaseSettle } from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";

// 引入表格相关类型
import type { VxeGridProps, VxeGridInstance } from "vxe-table";

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }
    pGridRef = ref<VxeGridInstance>()
    pGridOption = ref<VxeGridProps<LabourVirtualPurchaseSettle>>({})

    //表单引用类
    formRef = ref<FormInst>();
    labourPlanPersonList = ref<Array<LabourVirtualPurchaseSettle>>();
    //表单值
    dataModel = ref<Array<LabourVirtualPurchaseSettle>>(new Array<LabourVirtualPurchaseSettle>);
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };
    //虚拟订单id
    virtualPurchaseId = ref("");
    initScript = (params: Array<any>) => {
      this.virtualPurchaseId.value = params[0].id;
      getByVirtualPurchaseId(this.virtualPurchaseId.value).then(d=>{
        this.labourPlanPersonList.value = d
      })
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: any) => {
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);
    };

    buildCode = () => {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth()+1;
      let _d = date.getDate();
      let _m = date.getSeconds();
      return y+""+m+""+_d+""+_m+"";
    }

    show= ref(false)

    reverse = (id :any) => {
      this.show.value = true;
      settleReverse(id).then(d=>{
        getByVirtualPurchaseId(this.virtualPurchaseId.value).then(dd=>{
          this.labourPlanPersonList.value = dd
        })
        this.show.value = false;
      }).finally(()=>{
        this.show.value = false;
      })
    }
    

    planTypeOptions = ref([
        {
          label: '大修',
          value: '1',
        },
        {
          label: '日常',
          value: '2'
        },
        {
          label: '专项',
          value: '3'
        }
      ]);

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };

    orgTree = ref([]);
}

export {
    FormModal
}

