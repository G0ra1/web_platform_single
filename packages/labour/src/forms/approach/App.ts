import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm, Page } from "@platform/main";
import { FormSchema } from "./conf";
import { Model, ApproachPerson, Rule } from "./model"
import { cloneDeep } from "lodash";
import { format, parseISO } from "date-fns";
import { getPlan,getPositionInfo,getSuppUser,getBandOrg,isOuterDisciplineMaintain } from './api';

let dialogLocal: any;
let messageLocal: any;
const initDialog = (dialog: any, message: any)=>{
  dialogLocal = dialog;
  messageLocal = message;
}
// 岗位选项
const outerDisciplineOptions = ref<any>([])
//专业选项
const postRankOptions = ref<any>([])

class FormModal extends AbstractForm {
  constructor() {
    console.log('4.1======业务表单构造函数=====')
    super();
    console.log('5.2======业务表单构造函数=====')
    Object.assign(this.rules.value, new Rule())
  }

  //表单引用类
  formRef = ref<FormInst>();
  //表单值
  dataModel = ref<Model>(new Model());
  //验证规则
  rules = ref<FormRules>({});
  //处理页面隐藏、只读等特殊权限的控制数据
  dataPermits = ref<any>({});

  getSchema = async () => {
    // 从表单获取数据
    return FormSchema;
  };

  //承包合同选择
  static contractWorkOptions = ref([])
  initScript = async (params: Array<any>) => {
    // 弹出模态框，后立即显示劳务人员信息
    await getSuppUser({
      isApproach:1,
      planId:params[0].planId,
      userReferralStatus: 'stay_entrance',
      planReferralIds:params[0].approachPersonList?.map((person:any) => person.planReferralId).join(',')
    }).then((d=>{
      this.dataModel.value.approachPersonList = d
    }))
    await getPlan(params[0].planId).then(d => {
      //给承包合同 赋值 选择的形式
      FormModal.contractWorkOptions.value = d.labourPlanContractWorkList.map((dd: any) => {
        return { 'label': dd.workContractName, 'value': dd.workContractId, 'code': dd.workContractCode };
      });
      //去重前的对象
      const labourPlanPersonsDisArr:any = {};
      d.labourPlanPersonList.forEach((d:any)=>{
        labourPlanPersonsDisArr[d.outerDisciplineId] = d
      })
     const labourPlanPersonsArr = Object.values(labourPlanPersonsDisArr)
     outerDisciplineOptions.value = labourPlanPersonsArr.map((d:any)=>{
      return {'label':d.outerDisciplineName,'value':d.outerDisciplineId}
     })
     labourPlanPersonsArr.map((d:any)=>{
      getPositionInfo({planId:params[0].planId,outerDisciplineId:d.outerDisciplineId}).then((d:any)=>{
        postRankOptions.value = d.map((d:any)=>{
          return {'label':d.postRankName,'value':d.postRankId}
        })
      })
     })
    })
  }
  
  // 班组树型的选项
  orgTree = ref([]);
  //这个地方父类定义使用了object，不能直接用我们的类做了形参
  setValue = (d: any) => {
    // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
    Object.assign(this.dataModel.value, d);
        // 给班组赋值选项
        getBandOrg({ isDefault: 0,parentId:d.planOrgId  }).then((d:any)=>{
            this.orgTree.value = d
        })
  };
  //给班组赋值
  updateOrgTree =(row:any,d:any,op:any) =>{
    row.banId=d;
    row.banName=op.orgName
  }

  //提交时会调取这个
  getValue = async () => {
    return cloneDeep(this.dataModel.value);
  };

  // 承包合同ID、code、name赋值
  contractWork = (d: any, p: any) => {
    this.dataModel.value.workcontractid = d
    this.dataModel.value.workcontractcode = p.code
    this.dataModel.value.workcontractname = p.label
    this.dataModel.value.approachPersonList?.forEach((d) => {
      d.workcontractid = this.dataModel.value.workcontractid
      d.workcontractname = this.dataModel.value.workcontractname
      d.workcontractcode = this.dataModel.value.workcontractcode
    })
  }





  //添加劳务人员
  addApproachPerson = (rows: []) => {
    this.dataModel.value.approachPersonList = rows.map((row: any) => {
      const { id, ...newRow } = row
      //处理下进场时间
      newRow.approachTime = format(row.interviewTime ? parseISO(row.interviewTime) : new Date(), "yyyy-MM-dd")
      newRow.planReferralId = id
      newRow.workcontractid = this.dataModel.value.workcontractid
      newRow.workcontractname = this.dataModel.value.workcontractname
      newRow.workcontractcode = this.dataModel.value.workcontractcode
      return newRow
    }) as [];
  }
  // 批量修改承包合同
  changeContractWork = (workcontractid: any, workcontract: any, selectedData: any) => {
    this.dataModel.value.approachPersonList?.forEach((d) => {
      if (~selectedData.indexOf(d.id)) {
        d.workcontractid = workcontractid
        d.workcontractname = workcontract.label
        d.workcontractcode = workcontract.code
      }

    })
  }

  static selectedData = ref([])

//控制模态框开启
  showDelModal = ref<boolean>(false);
  contractCahe = ref();
  //模态框确认按钮
  onPositiveClick = ()=>{
    this.changeContractWork(this.contractCahe.value.value,this.contractCahe.value,FormModal.selectedData.value)
  }
  
  contractWorkOne = (d: any, p: any)=>{
    this.contractCahe.value = p
  }
  updateOuterDiscipline = (row:any,d:any,obj:any)=>{
    isOuterDisciplineMaintain({planId:row.planId,suppOrgId:row.suppOrgId,outerDisciplineId:row.outerDisciplineId}).then((d:any)=>{
      if(!d){
        messageLocal.error("请联系商务维护岗位"+obj.label+"单价信息");
      }
    })
    row.outerDisciplineId = obj.value
    row.outerDisciplineName = obj.label
    //根据岗位ID 获取 专业
    if(obj.value != null && obj.value != undefined){
      getPositionInfo({planId:this.dataModel.value.planId,outerDisciplineId:obj.value}).then((d)=>{
        postRankOptions.value = d.map((d:any)=>{
          return {'label':d.postRankName,'value':d.postRankId}
        })
      })
    }
    
  }


  updatePostRank = (row:any,d:any,obj:any) =>{
    row.postRankId = obj.value
    row.postRankName = obj.label
  } 

}








export { FormModal,outerDisciplineOptions,postRankOptions,initDialog }