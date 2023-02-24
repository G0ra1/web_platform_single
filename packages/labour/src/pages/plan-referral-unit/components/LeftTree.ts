/*
 * @Author: zouliming 
 * @Date: 2022-10-13 14:39:08 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-13 11:57:33
 * @Description 供应商左树
 */

import { ref} from 'vue';
import { suppOrgVal,refresh} from '../App';
import { NIcon, TreeOption, NButton } from 'naive-ui';
import OrgVo from '../data/vo/OrgVo';
import { getOrgTree,getByPlanIdAndSuppId} from "../api/index"
import LabourPlanSuppOrg from '../data/model/LabourPlanSuppOrg';
import LabourPlanSuppOrgVo from '../data/vo/LabourPlanSuppOrgVo';
import { Page } from '@platform/main'
import { supplierFormInstance } from "./SupplierForm"

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

class LeftTree {
    /**
     * 定义树形上的变量
     */
    public data = ref<TreeOption[] | undefined>();

    /**
     * 定义加载的过度
     */
    public isLoadingRef = ref<boolean>(true);

    /**
     * 树上的图标
     */
    //public renderSwitcherIcon = () => h(NIcon, null, { default: () => h(SwapVertical) });

    public static instance: LeftTree;

    private constructor() {
        this.init()
    }

    /**
     * 使用单例模式
     * @returns 
     */
    public static getInstance() {
        if (!this.instance) {
            return new LeftTree();
        }
        return this.instance;
    }

    /**
     * 请求后台初始化供应商组织树，以及刷新
     */
    init() {
        getOrgTree(Page.getMenuData().id)
            .then((data) => {
                console.log("data =>", data);
                this.data.value = [{
                    label: '外协公司',
                    key: JSON.stringify(LabourPlanSuppOrg.init(true)),
                    children: this.loopTree(data)
                }]
            })
            .catch((err) => {
                new Error("请求获取模型错误！", err);
            })
            .finally(() => this.isLoadingRef.value = false);
    }

    /**
     * 初始化树形递归调用
     * @param modelingEntityVo 
     * @returns 
     */
    loopTree(labourPlanSuppOrgVo: LabourPlanSuppOrgVo[]): TreeOption[] | undefined {
        if (labourPlanSuppOrgVo) {
            let list = new Array<TreeOption>();
            for (let item of labourPlanSuppOrgVo) {
                list.push({
                    label: item.suppOrgShortName,
                    //key: JSON.stringify(item),
                    key: JSON.stringify(new LabourPlanSuppOrg(item, false)),
                    children: this.loopTree(item.kids)
                });
            }
            return list;
        }
    }


    /**
     * 点击树节点时，需要触发的事件
     * @param param0 
     * @returns 
     */
    public nodeProps = ({ option }: { option: TreeOption }) => {
        return {
            onClick() {
                if (option.label !== '外协公司') {
                    let obj=eval("("+option.key+")"); 
                    suppOrgVal.value=obj.suppOrgId;
                    refresh();
                } else {
                    suppOrgVal.value='';
                    refresh();
                }
            }
        }
    }
}

const leftTreeInstance = LeftTree.getInstance();

const reflush = () => {
    leftTreeInstance.init();
}

/**
 * 导出相应变量
 */
export {
    leftTreeInstance,
    reflush,
    initDialog
}