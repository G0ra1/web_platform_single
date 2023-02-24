import { ref, h, watch } from 'vue';
import { FormInst, FormRules, NTooltip, UploadFileInfo } from 'naive-ui';
import { AbstractForm, Db, Cookies } from "@platform/main";
import { FormSchema } from "./conf";
import { ExpensesSupp, Rule } from "./model"
import { cloneDeep } from "lodash";
import { getPlanDetail, getVirtualPurchase } from './api/api';

class FormModal extends AbstractForm {

  constructor() {
    super();
    Object.assign(this.rules.value, new Rule())
  }

  //表单引用类
  formRef = ref<FormInst>();
  //表单值
  dataModel = ref<ExpensesSupp>(new ExpensesSupp());
  //验证规则
  rules = ref<FormRules>({});
  //处理页面隐藏、只读等特殊权限的控制数据
  dataPermits = ref<any>({});
  //承包合同信息
  contractWorkArray = ref([]);

  //执行初始化自定义脚本
  initScript = async (params: any) => {
    //基础信息
    let planObj: object = await getPlanDetail(params[0].planId).then(data => {
      let { planName, planType, planOrgId, planOrgName, overhaulId, overhaulCode, overhaulName } = data
      return {
        planName, planType, planOrgId, planOrgName, overhaulId, overhaulCode, overhaulName,
        planId: data.id,
        planCode: data.planNo
      }
    });
    Object.assign(this.dataModel.value, planObj)

    //虚拟订单信息
    let parentDeptId = await Db.get('userInfo').then((d: any) => {
      return d.parentDeptId
    })
    let virtualPurchase: object = await getVirtualPurchase({
      planId: this.dataModel.value.planId,
      suppOrgId: parentDeptId
    }).then(data => {
      let { suppOrgId, suppOrgCode, suppOrgName, virtualPurchaseCode, virtualPurchaseName } = data
      return {
        suppOrgId, suppOrgCode, suppOrgName, virtualPurchaseCode, virtualPurchaseName,
        virtualPurchaseId: data.id,
      }
    });
    Object.assign(this.dataModel.value, virtualPurchase)
  }

  // 帆软打印(供应商)
  printScript=(params: Array<any>) => {
    let planCpt="http://10.72.5.45:9095/webroot/decision/view/report?viewlet=expensesSupp.cpt";
    const id=this.dataModel.value.id;
    console.log(id)
    window.open(planCpt+'&id='+id);
  };
  getSchema = async () => {
    // 从表单获取数据
    return FormSchema;
  };

  //这个地方父类定义使用了object，不能直接用我们的类做了形参
  setValue = (d: object) => {

    // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
    Object.assign(this.dataModel.value, d);

    //承包合同信息下拉框附值
    getPlanDetail(this.dataModel.value.planId).then(data => {
      this.contractWorkArray.value = data.labourPlanContractWorkList.map((contract: any) => {
        let { workContractId, workContractCode, workContractName } = contract;
        return { workContractId, workContractCode, workContractName };
      })
    });

  };


  //提交时会调取这个
  getValue = async () => {
    let renDataModel = cloneDeep(this.dataModel.value);
    return renDataModel;
  };

  //承包合同选项的渲染函数	
  contractWorkRender = ({ node, option }: any) => {
    return h(NTooltip, null, {
      trigger: () => node,
      default: () => option.workContractName
    })
  }

  //承包合同选中信息
  upContractWorkMeth = (value: string, option: any) => {
    this.dataModel.value.contractWorkId = option.workContractId;
    this.dataModel.value.contractWorkName = option.workContractName;
    this.dataModel.value.contractWorkCode = option.workContractCode;
  }

  //选择人员
  addPerson = (rows: any, type: string) => {
    let data = rows.map((row: any) => {
      const { id, ...newRow } = row
      return newRow
    }) as [];
    switch (type) {
      case 'travel': //差旅费
        this.dataModel.value.travelList = data
        break
      case 'nucleicacid': //核酸检测费用
        this.dataModel.value.nucleicacidList = data
        break
      case 'examination': //体检费
        this.dataModel.value.examinationList = data
        break
      default:
    }
  }

  uploadSuccess = (data: any, row: any) => {
    row.attachment = data.attachment
    row.attachmentids = data.attachmentids
  }

}


export { FormModal }