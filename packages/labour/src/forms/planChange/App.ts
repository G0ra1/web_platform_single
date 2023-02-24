/**
 * @Description 需求计划信息变更
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-24 16:37:10
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm,request } from "@platform/main";
import { FormSchema } from "./conf";
import {LabourPlanChange,LabourPlanPersonChange} from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import { getBandOrg ,getContractList,getOverhaulList} from "../plan/api";

// 引入表格相关类型
import type { VxeGridProps, VxeGridInstance } from "vxe-table";

//承包合同名称选项
const contractNameOptions = ref<any>([]);
//承包合同编号选项
const contractCodeOptions = ref<any>([]);
// 承包合同业主单位
const contractOwnercompanynameOptions = ref<any>([]);
// 承包合同机构名称
const contractOrgannameOptions = ref<any>([]);
// 
const overhaulOrgnameOptions = ref<any>([]);

getContractList().then((d)=>{
  //承包合同名称选项
  let contractNameDisArr = d.map((d:any) =>{return d.contractname})
  let contractArr = Array.from(new Set(contractNameDisArr))
  contractNameOptions.value = contractArr.map((d)=>{
    return {'label':d,'value':d}
  })
  //承包合同编号选项
  let contractCodeDisArr = d.map((d:any) =>{return d.contractcode})
  let contractCodeArr = Array.from(new Set(contractCodeDisArr))
  contractCodeOptions.value = contractCodeArr.map((d)=>{
    return {'label':d,'value':d}
  })
  // 承包合同业主单位
  let contractOwnercompanynameDisArr = d.map((d:any)=>{return d.ownercompanyname})
  let contractOwnercompanynameArr =  Array.from(new Set(contractOwnercompanynameDisArr))
  contractOwnercompanynameOptions.value = contractOwnercompanynameArr.map((d)=>{
    return {'label':d,'value':d}
  })
   // 承包合同机构名称
   let contractOrgannameDisArr = d.map((d:any)=>{return d.organname})
   let contractOrgannameArr =  Array.from(new Set(contractOrgannameDisArr))
   contractOrgannameOptions.value = contractOrgannameArr.map((d)=>{
     return {'label':d,'value':d}
   })


})

getOverhaulList().then((d)=>{
let  overhaulOrgnameDisArr =   d.records.map((d:any)=>{return d.orgname})
let overhaulOrgnameArr = Array.from(new Set(overhaulOrgnameDisArr))
overhaulOrgnameOptions.value = overhaulOrgnameArr.map((d)=>{
  return {'label':d,'value':d}
})


})


class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }
    pGridRef = ref<VxeGridInstance>()
    pGridOption = ref<VxeGridProps<LabourPlanPersonChange>>({})


    getOverhaul =  (overhaulRotation:string)=> {
      //console.log(d)
      return request({
        url: `/syndata/overhaul/getOverhaulSouceList/${overhaulRotation}`,
        method: "get"
      }).then((res)=>{
          console.log(res+"==========res")
          this.dataModel.value.overhaulSourceList=res.overhaulSourceList?[res.overhaulSourceList]:[];
          this.dataModel.value.labourPlanPersonList=res.labourPlanPersonList||[];
      });
    }
    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<LabourPlanChange>(new LabourPlanChange());
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: any) => {
        getBandOrg({ isDefault: 0,parentId:d.planOrgId}).then(d=>{
            this.orgTree.value = d
        })
        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };

    initScript = (params: Array<any>) => {
      this.dataModel.value.isFrameSupp=0
      this.dataModel.value.planType="1"
    };
    //打印----帆软
    printScript=(params: Array<any>) => {
      let planCpt="http://10.72.5.45:9095/webroot/decision/view/report?viewlet=labourPlanChange.cpt";
      const id=this.dataModel.value.id;
      console.log(id)
      window.open(planCpt+'&id='+id);
    };
    buildCode = () => {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth()+1;
      let _d = date.getDate();
      let _m = date.getSeconds();
      return y+""+m+""+_d+""+_m+"";
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
    
    orgTree = ref([]);
}
export { contractNameOptions,contractCodeOptions,contractOwnercompanynameOptions,contractOrgannameOptions,overhaulOrgnameOptions }

export {
    FormModal
}
