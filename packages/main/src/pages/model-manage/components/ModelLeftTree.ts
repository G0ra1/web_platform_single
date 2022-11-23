/*
 * @Author: zouliming 
 * @Date: 2022-10-13 14:39:08 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-24 12:52:34
 * @Description 数据建模表左树
 */

import { ref, h, VNodeChild, Component } from 'vue';
import { NIcon, TreeOption, NButton, NDropdown } from 'naive-ui';
import { SwapVertical, AddCircleOutline, CreateOutline, EllipsisHorizontalOutline, TrashOutline } from '@vicons/ionicons5';
import { getTableTree, delEntity } from '../api/index';
import ModelingEntityVo from '../data/vo/ModelingEntityVo';
import { show } from "./ModelEntityTable";
import { NsOption } from "../data/model/NsOption";
import { ButtonEnum } from "../data/constant/ButtonEnum";
import TableEntity from '../data/model/TableEntity';
import { showFieldTable, closeFieldTable } from "./ModelContent";

/**
 * 定义树形上的变量
 */
let data = ref<TreeOption[] | undefined>();

/**
 * 定义加载的过度
 */
let isLoadingRef = ref<boolean>(true);

/**
 * 树上的图标
 */
const renderSwitcherIcon = () => h(NIcon, null, { default: () => h(SwapVertical) });
/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}
/**
 * 点击树节点时，需要触发的事件
 * @param param0 
 * @returns 
 */
let nodeProps = ({ option }: { option: TreeOption }) => {
    return {
        onClick() {
            showFieldTable(option?.key as string | undefined);
        }
    }
}

/**
 * 请求后台，获取树形
 */
const initTree = (id: string | undefined) => {
    if (id) {
        console.log("修改或重新加载", id);
        //修改或重新加载
        getTableTree(id)
            .then((entityTree) => {
                console.log("entityTree =>", entityTree);
                if (entityTree) {
                    data.value = [{
                        label: 'root',
                        key: undefined,
                        children: loopTree(entityTree),
                        suffix: suffix(undefined)
                    }]
                }
            })
            .catch((err) => {
                new Error("请求获取模型错误！", err);
            })
            .finally(() => isLoadingRef.value = false);
    } else {
        console.log("新建", id);
        //新建
        data.value = [{
            label: 'root',
            key: undefined,
            children: undefined,
            suffix: suffix(undefined)
        }]
        isLoadingRef.value = false
    }
}


/**
 * 初始化树形递归调用
 * @param modelingEntityVo 
 * @returns 
 */
function loopTree(modelingEntityVo: ModelingEntityVo[]): TreeOption[] | undefined {
    if (modelingEntityVo) {
        let list = new Array<TreeOption>();
        for (let item of modelingEntityVo) {
            list.push({
                label: item.tableNameCh,
                key: JSON.stringify(item),
                children: loopTree(item.kids),
                suffix: suffix(item)
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
const suffix = (modelingEntityVo: ModelingEntityVo | undefined): () => VNodeChild | undefined => {
    const renderIcon = (icon: Component) => {
        return () => {
            return h(NIcon, null, {
                default: () => h(icon)
            })
        }
    }
    let add = new NsOption.OptionDropDown("添加", "add", renderIcon(AddCircleOutline));
    let edit = new NsOption.OptionDropDown("修改", "edit", renderIcon(CreateOutline));
    let del = new NsOption.OptionDropDown("删除", "del", renderIcon(TrashOutline));

    return () => h(
        NDropdown,
        {
            trigger: "hover",
            style: "font-size: 25px",
            options: modelingEntityVo === undefined ? [add] : [add, edit, del] as any,
            onSelect: (key: string | number) => {
                handleSelect(key, modelingEntityVo);
            },
        },
        {
            default: () => h(
                NButton,
                { quaternary: true, style: "font-size: 20px" },
                {
                    default: () => h(
                        NIcon,
                        null,
                        { default: () => h(EllipsisHorizontalOutline) }
                    )
                }
            )
        }
    );
}

/**
 * 删除树上节点
 * @param id 
 * @param ancestorId 
 */
const delEvent = (id: string, ancestorId: string) => {
    console.log("del.......", id)
    console.log("ancestorId.......", ancestorId)
    dialogLocal.error({
        title: '删除',
        content: '确定删除？',
        positiveText: '确认',
        negativeText: '取消',
        maskClosable: false,
        onPositiveClick: async () => {
            const result = await delEntity(id)
            if (result) {
                console.log("删除节点成功，节点id为：", id);
                //重新加载下左树
                if (id === ancestorId) {
                    initTree(undefined);
                } else {
                    initTree(ancestorId);
                }
            }
        },
    })
}

/**
 * 处理选择节点的逻辑
 * @param key 
 * @param parentId 
 */
const handleSelect = (key: string | number, modelingEntityVo: ModelingEntityVo | undefined) => {
    //先关闭右侧字段维护页面
    closeFieldTable();
    if (key === ButtonEnum.DEL) {
        if (modelingEntityVo !== undefined) {
            delEvent(modelingEntityVo?.id, modelingEntityVo?.ancestorId);
        }
    } else {
        let tableEntity = new TableEntity();
        if (modelingEntityVo !== undefined) {
            if (key === ButtonEnum.EDIT) {
                //直接改成对应的属性复制；
                Object.assign(tableEntity, modelingEntityVo);
                tableEntity.createTypeView = tableEntity.createType === 1 ? "选择现有表" : "创建表";
            } else {
                tableEntity.parentId = modelingEntityVo?.id;
                tableEntity.parentTableName = modelingEntityVo?.tableName;
            }
        }
        show(tableEntity);
    }
}

/**
 * 导出相应变量
 */
export {
    data,
    isLoadingRef,
    nodeProps,
    renderSwitcherIcon,
    initTree,
    initDialog
}