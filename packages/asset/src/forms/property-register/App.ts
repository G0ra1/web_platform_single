/**
 * @Description 知识产权登记
 * @author 云数网讯 chaixinkai@netwisd.com@netwisd.com
 * @date 2023-01-10 18:08:35
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import { cloneDeep } from "lodash";
// import { Rule } from "rule";
import { OrgVo } from '@platform/mdm';
import AssetPropertyRegister from './model';


class FormModal extends AbstractForm {

    constructor() {
        super();
        // Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<AssetPropertyRegister>(new AssetPropertyRegister());
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
    orgShow = ref<boolean>(false);
    chooseOrg = () => {
        this.orgShow.value = !this.orgShow.value;
    };

    // handleChooseOrg = (node: OrgVo) => {
    //     this.dataModel.value.propertyUserId = node.id;
    //     this.dataModel.value.propertyUserName = node.orgName;
    // };
    handleChooseOrg = (e : any) => {
        this.dataModel.value.propertyUserId = e.map((d: any) => d.id).join(',')
        this.dataModel.value.propertyUserName = e.map((d: any) => d.orgName).join(',')
    };

    deptShow = ref<boolean>(false);
    chooseDept = () => {
        this.deptShow.value = !this.deptShow.value;
    };
    handleChooseDept = (e : any) => {
        this.dataModel.value.applyUnitId = e.map((d: any) => d.id).join(',')
        this.dataModel.value.applyUnitName = e.map((d: any) => d.orgName).join(',')
    };

    validPeriodPick = ref<any>({
        长期 : () => new Date('2099-12-31 23:59:59').getTime()
        // 长期 : () => ref('2099-12-31 23:59:59')
    })
}

export {
    FormModal
}
