/*
 * @Author: zouliming 
 * @Date: 2022-10-13 14:58:40 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-24 13:02:02
 */

import { ref } from 'vue'
import ModelLeftTree from './ModelLeftTree.vue'
import { initTree } from './ModelLeftTree'
import { initTableData, resetTableData } from "./ModelFieldTable"
import { refresh } from '../App'
import ModelingEntityVo from "../data/vo/ModelingEntityVo"
import { initDs } from "./ModelEntityTable"

/**
 * 左树组件
 */
const modelLeftTreeRef = ref<typeof ModelLeftTree>()

/**
 * 控制右侧字段页面是否显示
 */
const isView = ref<boolean>(false)

/**
 * 控制抽屉开关是否显示
 */
const active = ref<boolean>(false);

/**
 * 控制抽屉开关
 * @param id
 */
const show = (dsId: String, id: string | undefined) => {
    active.value = true
    initTree(id);
    //提前异步调一下，下一步即将要打开的数据源的接口
    initDs(dsId);
}

/**
 * 打开字段列表
 * @param key 
 */
const showFieldTable = (key: string | undefined) => {
    //console.log("key==> ", key);
    if (key !== undefined) {
        let modelingEntityVo: ModelingEntityVo = JSON.parse(key);
        initTableData(modelingEntityVo);
        isView.value = true;
    } else {
        isView.value = false;
    }
}

/**
 * 关闭页面列表
 */
const closeFieldTable = () => {
    isView.value = false;
    resetTableData();
}

/**
 * 关闭方法
 */
const close = () => {
    active.value = false;
    isView.value = false;
    refresh();
}

export {
    modelLeftTreeRef,
    active,
    close,
    show,
    showFieldTable,
    isView,
    closeFieldTable
}