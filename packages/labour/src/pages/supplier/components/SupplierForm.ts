/*
 * @Author: zouliming 
 * @Date: 2022-11-13 11:56:53 
 * @Last Modified by:   zouliming 
 * @Last Modified time: 2022-11-13 11:56:53 
 * @Description 供应商表单
 */

import { ref } from 'vue';
import { FormInst } from 'naive-ui';
import OrgModel from "../data/model/OrgModel";
import OrgRule from "../data/model/OrgRule";
import { saveOrgTree, updateOrgTree } from "../api/index";
import { reflush } from './LeftTree'

let messageLocal: any;
function initDialog(message: any) {
    messageLocal = message;
}
/**
     * 编辑时的控制
     */
const showOrgFromRef = ref(false);
/**
 * 新增时的模态弹出控制
 */
const showAddRef = ref(false);

class SupplierForm {

    /**
     * 表单实体类型引用
     */
    orgModelRef = ref<OrgModel>(new OrgModel());
    /**
     * 表单引用类
     */
    formRef = ref<FormInst | null>(null);

    /**
     * 检验规则
     */
    rules = new OrgRule();

    public static supplierForm: SupplierForm;

    private constructor() {

    }

    /**
     * 使用单例模式
     * @returns 
     */
    public static getInstance() {
        if (!this.supplierForm) {
            return new SupplierForm();
        }
        return this.supplierForm;
    }

    /**
     * 开启和关闭，说一下为什么已经有showAddRef了，为什么还要加个方法，
     * 加方法的目的是为了除了控制showAddRef开关外，可能还要处理其他逻辑，这里封装到一个方法里，达到高内聚
     * @param onOff 
     */
    showAdd = (onOff: boolean, orgModel: OrgModel | undefined) => {
        if (onOff) {
            if (orgModel !== undefined) {
                this.orgModelRef.value = orgModel;
            }
            showAddRef.value = true;
        } else {
            showAddRef.value = false;
        }
    }

    /**
     * 开启和关闭，加个方法的目的同上
     * @param onOff 
     * @param orgModel 
     */
    showOrgFrom = (onOff: boolean, orgModel: OrgModel | undefined) => {
        if (onOff) {
            if (orgModel !== undefined) {
                this.orgModelRef.value = orgModel;
            }
            showOrgFromRef.value = true;
        } else {
            showOrgFromRef.value = false;
        }
    }

    /**
     * 提交前的数据检验
     */
    checkValid = async () => {
        await this.formRef.value?.validate((errors) => {
            console.log("errors:", errors);
            if (errors) {
                messageLocal.error('请输入正确数据！');
            }
        });
    }

    /**
     * 提交
     */
    submit = async (e: MouseEvent) => {
        e.preventDefault()
        await this.checkValid();
        //新建
        if (this.orgModelRef.value.id === undefined) {
            //todo 调用后台保存接口
            const result = await saveOrgTree(this.orgModelRef.value);
            if (result) {
                this.showAdd(false, undefined);
            }
        } else {
            updateOrgTree(this.orgModelRef.value);
            messageLocal.success("更新成功！");
        }
        reflush();
    }
}

const supplierFormInstance = SupplierForm.getInstance();

export {
    supplierFormInstance,
    showAddRef,
    showOrgFromRef,
    initDialog,
}
