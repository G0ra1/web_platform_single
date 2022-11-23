/*
 * @Author: zouliming 
 * @Date: 2022-10-13 14:39:08 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-11-13 11:57:33
 * @Description 供应商左树
 */

import { ref, h, VNodeChild, Component } from 'vue';
import { NIcon, TreeOption, NButton } from 'naive-ui';
import { SwapVertical, AddCircleOutline, TrashOutline, SyncOutline } from '@vicons/ionicons5';
import OrgVo from '../data/vo/OrgVo';
import { ButtonEnum } from "../../../lib/constant/ButtonEnum";
import { getOrgTree, delOrgTree, syncOrgTree } from "../api/index"
import OrgModel from '../data/model/OrgModel';
import { supplierFormInstance } from "./SupplierForm"
const { showOrgFrom, showAdd } = supplierFormInstance;

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
        getOrgTree()
            .then((data) => {
                console.log("data =>", data);
                this.data.value = [{
                    label: '外协公司',
                    key: JSON.stringify(OrgModel.init(true)),
                    children: this.loopTree(data),
                    suffix: this.suffix(undefined)
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
    loopTree(orgVo: OrgVo[]): TreeOption[] | undefined {
        if (orgVo) {
            let list = new Array<TreeOption>();
            for (let item of orgVo) {
                list.push({
                    label: item.orgShortName,
                    //key: JSON.stringify(item),
                    key: JSON.stringify(new OrgModel(item, false)),
                    children: this.loopTree(item.kids),
                    suffix: this.suffix(item)
                });
            }
            return list;
        }
    }


    /**
     * 树形节点的操作按钮
     * @param parentId 
     * @returns 
     */
    suffix(orgVo: OrgVo | undefined): () => VNodeChild | undefined {
        const that = this;
        const renderIcon = (icon: Component) => {
            return h(NIcon, null, {
                default: () => h(icon)
            })
        }

        const getBtn = (key: ButtonEnum, icon: Component) => {
            return h(
                NButton,
                {
                    quaternary: true,
                    style: "font-size: 18px",
                    onClick(e) {
                        e.stopPropagation();
                        that.handleSelect(key, orgVo);
                    },
                },
                { default: () => renderIcon(icon) }
            );
        }

        let add = getBtn(ButtonEnum.ADD, AddCircleOutline);
        let del = getBtn(ButtonEnum.DEL, TrashOutline);
        let sync = getBtn(ButtonEnum.SYNC, SyncOutline);

        return () => orgVo === undefined ? [add, sync] : [add, del];
    }

    /**
     * 处理选择节点的逻辑
     * @param key 
     * @param parentId 
     */
    handleSelect = (key: ButtonEnum | number, orgVo: OrgVo | undefined) => {
        console.log("handleSelect", key, orgVo);
        //先关闭右侧字段维护页面
        showOrgFrom(false, undefined);
        if (key === ButtonEnum.DEL) {
            if (orgVo !== undefined) {
                this.delEvent(orgVo?.id);
            }
        } else if (key === ButtonEnum.SYNC) {
            this.syncEvent();
        } else {
            let model;
            if (orgVo !== undefined) {
                model = new OrgModel(orgVo, true);
            } else {
                model = OrgModel.init(false);
            }
            showAdd(true, model);
        }
    }

    /**
     * 同步供应商组织
     */
    syncEvent = () => {
        dialogLocal.error({
            title: '从客户方同步供应商数据',
            content: '确定同步吗？需要花费些时间？',
            positiveText: '确认',
            negativeText: '取消',
            maskClosable: false,
            onPositiveClick: async () => {
                const result = await syncOrgTree()
                if (result) {
                    console.log("同步供应商机构成功！");
                    //重新加载下左树
                    this.init();
                }
            },
        })
    }

    /**
     * 删除树上节点
     * @param id 
     */
    delEvent = (id: string) => {
        dialogLocal.error({
            title: '删除',
            content: '确定删除？',
            positiveText: '确认',
            negativeText: '取消',
            maskClosable: false,
            onPositiveClick: async () => {
                const result = await delOrgTree(id)
                if (result) {
                    console.log("删除节点成功，节点id为：", id);
                    //重新加载下左树
                    this.init();
                }
            },
        })
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
                    showOrgFrom(true, new OrgModel(JSON.parse(option.key as string), false));
                } else {
                    showOrgFrom(false, undefined);
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