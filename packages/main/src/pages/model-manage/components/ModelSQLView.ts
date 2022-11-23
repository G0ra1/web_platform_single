/*
 * @Author: zouliming 
 * @Date: 2022-10-24 13:21:39 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-24 13:22:42
 * @Description SQL预览组件
 */

import { ref } from "vue"
/**
 * 是否显示
 */
const isView = ref(false)

/**
 * sql组件引用
 */
const sqlRef = ref<string>();

/**
 * 控制sql语句显示
 * @param sql 
 */
const viewSql = (sql: string) => {
    isView.value = true;
    sqlRef.value = sql;
}

export {
    isView,
    viewSql,
    sqlRef
}