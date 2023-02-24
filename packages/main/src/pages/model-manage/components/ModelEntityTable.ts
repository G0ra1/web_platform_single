/*
 * @Author: zouliming 
 * @Date: 2022-10-13 19:34:58 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-24 16:07:15
 * @Description 数据建模表信息维护
 */

import { ref } from 'vue';
import { FormInst } from 'naive-ui';
import TableEntity from '../data/model/TableEntity';
import { getDs, saveEntity, updateEntity } from '../api/index';
import TableEntityRule from '../data/model/TableEntityRule';
import { NsOption } from "../data/model/NsOption";
import ModelingEntityVo from "../data/vo/ModelingEntityVo";
import { initTree } from "./ModelLeftTree"

let dialogLocal: any;
let messageLocal: any;
function initDialog(dialog: any, message: any) {
    dialogLocal = dialog;
    messageLocal = message;
}

/**
 * 表单引用类
 */
const formRef = ref<FormInst | null>(null);
const showModalRef = ref(false);
let showAddRef = ref(true);

/**
 * 表单实体类型引用
 */
const formValueRef = ref<TableEntity>(new TableEntity());

/**
 * 检验规则
 */
const rules = new TableEntityRule();

/**
 * 数据源
 */
//const generalOptions = ref();

/**
 * 表名的集合
 */
const tableNameOptions = ref();

let tableMap = new Map<String, string>();

/**
 * 控制是否显示
 */
const show = (tableEntity: TableEntity) => {
    //因为提前加载了数据源，已经设置了表单的默认数据源值，这里tableEntity会直接负盖，所以先解构一下，再重新赋值；
    const { dbSource, dbSourceId, appId, appCode, appName } = { ...formValueRef.value }
    formValueRef.value = tableEntity;
    formValueRef.value.dbSource = dbSource;
    formValueRef.value.dbSourceId = dbSourceId;
    formValueRef.value.appId = appId;
    formValueRef.value.appCode = appCode;
    formValueRef.value.appName = appName;
    showModalRef.value = true;
}

/**
 * 新加表或添加现有表的开关
 * @param value 
 */
const switchCreateTypeHandle = (value: number) => {
    showAddRef.value = value === 1 ? true : false;
    formValueRef.value?.chanageCreateType(value);
    console.log("switchCreateTypeHandle:", formValueRef.value);
}

/**
 * 提示用户表
 * @param e 
 * @returns 
 */
const tableNameChangeHandle = (value: string, context: { e: MouseEvent | KeyboardEvent }) => {
    if (tableMap.has(formValueRef.value.tableName)) {
        formValueRef.value.tableNameCh = tableMap.get(formValueRef.value.tableName) as string;
        let values = formValueRef.value.tableName.split("_");
        if (values.length >= 3) {
            formValueRef.value.tablePrefix = values[0] + "_" + values[1] + "_";
            formValueRef.value.packageName = "com.netwisd." + values[1];
            formValueRef.value.moduleName = values[2]
        }
    }
}

/**
 * 获取数据源以及对应的表
 */
const initDs = (dsId: String) => getDs(dsId)
    .then((data) => {
        if (data) {
            let value = data.tableEntityList.map(
                (tableEntity: TableEntity) => {
                    tableMap.set(tableEntity.tableName, tableEntity.tableNameCh);
                    return new NsOption.OptionAutoComplete(tableEntity.tableName, tableEntity.tableNameCh)
                }
            );
            tableNameOptions.value = value
            //把默认数据源设置为源的下拉的默认值
            formValueRef.value.dbSource = data.poolName;
            formValueRef.value.dbSourceId = data.id;
            //console.log("默认数据源：", formValueRef.value);
        }
    })
    .catch((err) => {
        new Error("请求获取数据源错误！", err);
    });

/**
 * 通过inject注入的appInfo只能使用到setup中，所以在这里transfer了一下
 * @param appInfo 
 */
const transferAppInfo = (appInfo: any) => {
    //console.log("transferAppInfo===>:", appInfo);
    formValueRef.value.appId = appInfo.value.appId
    formValueRef.value.appCode = appInfo.value.appCode
    formValueRef.value.appName = appInfo.value.appName
    //console.log("transferAppInfo formValueRef.value:", formValueRef.value);
}

/**
 * 表的保存或修改
 * @param e 
 */
const entitySaveEvent = async (e: MouseEvent) => {
    e.preventDefault()
    await checkValid();
    let check = (formValueRef.value.tablePrefix + formValueRef.value.moduleName).replaceAll("_", "-");
    //console.log("check==>", check);
    //如果选的表前缀和模块名跟APP名不同的话，做个友情提示
    if (formValueRef.value.appCode !== check) {
        dialogLocal.error({
            title: "是否确认",
            content: "选择的表与所选的APP不对应，可能影响接口效果，是否继续？",
            positiveText: '确认',
            negativeText: '取消',
            maskClosable: false,
            onPositiveClick: () => {
                submit();
            },
        })
    } else {
        submit();
    }
}

/**
 * 保存或提交
 */
const submit = () => {
    if (formValueRef.value.id === "") {
        //调后台新增接口
        saveEntity(formValueRef.value)
            .then((modelingEntityVo: ModelingEntityVo) => {
                if (modelingEntityVo) {
                    console.log("保存成功！");
                    //当前窗口关掉
                    showModalRef.value = false;
                    //重新初始化一下左树——就是从根重新加载一次
                    initTree(modelingEntityVo.ancestorId);
                }
            }).catch((err) => {
                throw new Error("调用后台新增接口失败！", err);
            });
    } else {
        //调后台修改接口
        updateEntity(formValueRef.value)
            .then((modelingEntityVo: ModelingEntityVo) => {
                if (modelingEntityVo) {
                    console.log("修改成功！");
                    //当前窗口关掉
                    showModalRef.value = false;
                    //重新初始化一下左树——传0，就是从根重新加载一次
                    initTree(modelingEntityVo.ancestorId);
                }
            }).catch((err) => {
                throw new Error("调用后台修改接口失败！", err);
            });
    }
}

/**
 * 做相关的校验以及提醒
 */
const checkValid = async () => {
    await formRef.value?.validate((errors) => {
        console.log("errors:", errors);
        if (errors) {
            messageLocal.error('请输入正确数据！');
        }
    });

}

export {
    showModalRef,
    showAddRef,
    show,
    formRef,
    formValueRef,
    rules,
    //generalOptions,
    tableNameOptions,
    switchCreateTypeHandle,
    //handleUpdateDs,
    tableNameChangeHandle,
    entitySaveEvent,
    initDs,
    transferAppInfo,
    initDialog
}
