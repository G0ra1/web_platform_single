/*
 * @Author: zouliming 
 * @Date: 2022-10-18 09:22:48 
 * @Last Modified by: zouliming
 * @Last Modified time: 2022-10-24 13:20:13
 */

import { ref } from 'vue'
import FieldEntity from "../data/model/FieldEntity"
import ModelingEntityDto from "../data/dto/ModelingEntityDto"
import { getFieldByEntityId, saveField, sync, ddl } from '../api/index';
import ModelingEntityVo from "../data/vo/ModelingEntityVo"
import ModelingFieldVo from "../data/vo/ModelingFieldVo"
import { NsOption } from '../data/model/NsOption';
import { viewSql } from "./ModelSQLView.ts"
import { format } from 'sql-formatter';

let dialogLocal: any;
let messageLocal: any;
function initDialog(dialog: any, message: any) {
    dialogLocal = dialog;
    messageLocal = message;
}

/**
 * vxe-table这个组件实例的引用,使用这个实例可以直接操作vxe-table的各种属性及方法
 */
const vxeTableRef = ref<any>();

/**
 * 初始化字段
 */
let tableData: FieldEntity[];

/**
 * 当前页面被选中的模型实体的id
 */
let currentEntityId = "";

let currentEntity: ModelingEntityVo;

/**
 * 关联父表的字段列
 */
let fkFieldNameList = ref<NsOption.OptionSelect[]>();

/**
 * 初始化表格数据
 * @param modelingEntityVo 
 */
const initTableData = async (modelingEntityVo: ModelingEntityVo) => {
    currentEntity = modelingEntityVo;
    currentEntityId = modelingEntityVo.id;
    //获取当前实体表的所有列
    tableData = await getFieldByEntityId(modelingEntityVo.id)
    //map一下字段集合，把当前实体列field对象中记录的fkTableId和fkTableName都赋值上；
    tableData = tableData.map((modelingFieldVo: ModelingFieldVo) => {
        //修复一些错误数据
        if (modelingFieldVo.fkFieldId || modelingFieldVo.fkFieldName) {
            modelingFieldVo.fkTableId = modelingEntityVo.parentId;
            modelingFieldVo.fkTableName = modelingEntityVo.parentTableName;
        }
        //修复一些错误数据
        if (modelingFieldVo.fkTableId || modelingFieldVo.fkTableName) {
            if (!modelingFieldVo.fkFieldId || !modelingFieldVo.fkFieldName) {
                modelingFieldVo.fkTableId = "";
                modelingFieldVo.fkTableName = "";
                modelingFieldVo.fkFieldId = "";
                modelingFieldVo.fkFieldName = "";
            }
        }
        return modelingFieldVo;
    });
    //获取一下父节点对象
    let parentNodeCol = await getFieldByEntityId(modelingEntityVo.parentId)
    //初始化一下所有关联键对应的父表field
    fkFieldNameList.value = parentNodeCol.map((modelingFieldVo: ModelingFieldVo) =>
        new NsOption.OptionSelect(modelingFieldVo.fieldName, modelingFieldVo.id));
    //最后在集合头插入一条请选择
    fkFieldNameList.value.unshift(new NsOption.OptionSelect("请选择", "0"));
    /* console.log("tableData:", tableData);
    console.log("parentNodeCol:", fkFieldNameList); */
    //vxeTableRef引用，reload一下
    vxeTableRef.value.reloadData(tableData);
}

//重置一下页面，可能在删除左边树节点后，再点其他节点会有数据加载问题
const resetTableData = () => {
    tableData = [];
}

/**
 * 选择外键后，处理外键值和名
 * @param row 
 */
const handleFkField = (row: FieldEntity, select: any) => {
    if (select.value !== "0") {
        row.fkFieldId = select.value;
        row.fkFieldName = select.$select.reactData.currentOption.label;
        row.fkTableId = currentEntity.parentId;
        row.fkTableName = currentEntity.parentTableName;
    } else {
        row.fkFieldId = "";
        row.fkFieldName = "";
        row.fkTableId = "";
        row.fkTableName = "";
    }
    vxeTableRef.value.reloadData(tableData);
}

/**
 * 实时格式化JAVA字段名为驼峰
 * @param row 
 * @param input 
 */
const handleFieldName = (row: FieldEntity, input: any) => {
    console.log("row.fieldName:", row.fieldName);
    row.javaName = formatConversion(input.value, 1);
    vxeTableRef.value.reloadData(tableData);
}

/**
 * 字段类型列表
 */
const typeList = ref([
    { label: 'int', value: 'int' },
    { label: 'varchar', value: 'varchar' },
    { label: 'text', value: 'text' },
    { label: 'longtext', value: 'longtext' },
    { label: 'datetime', value: 'datetime' },
    { label: 'date', value: 'date' },
    { label: 'decimal', value: 'decimal' },
    { label: 'double', value: 'double' },
    { label: 'char', value: 'char' },
    { label: 'bigint', value: 'bigint' },
    { label: 'mediumtext', value: 'mediumtext' },
])

/**
 * 是否字典
 * @param value 
 * @returns 
 */
const formatConfirm = (value: number) => {
    if (value === 1) {
        return '是'
    }
    if (value === 0) {
        return '否'
    }
    return '否'
}

/**
 * 添加行方法
 */
const addRow = () => {
    tableData.push(
        new FieldEntity('', '', '', 'varchar', 0, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', '')
    );
    vxeTableRef.value.reloadData(tableData);
}

/**
 * 从后台同步列到页面
 */
const syncField = async () => {
    tableData = await sync(currentEntityId);
    vxeTableRef.value.reloadData(tableData);
}

/**
 * 增加工作流表字段
 */
const addWfRow = () => {
    tableData.push(new FieldEntity('camunda_procdef_key', 'camundaProcdefKey', 'camunda流程定义key', 'varchar', 50, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('procdef_name', 'procdefName', '流程定义名称', 'varchar', 50, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('camunda_procdef_id', 'camundaProcdefId', '流程定义id', 'varchar', 64, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('procdef_version', 'procdefVersion', '流程版本', 'int', 2, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('camunda_procins_id', 'camundaProcinsId', '流程实例id', 'varchar', 64, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('process_name', 'processName', '流程实例名称', 'varchar', 255, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('reason', 'reason', '事由', 'varchar', 255, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('apply_time', 'applyTime', '申请日期', 'datetime', 0, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('biz_key', 'bizKey', 'bizKey', 'varchar', 255, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('procdef_type_id', 'procdefTypeId', '流程分类ID', 'bigint', 20, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('procdef_type_name', 'procdefTypeName', '流程分类名称', 'varchar', 50, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('biz_priority', 'bizPriority', '任务优先级', 'varchar', 32, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    tableData.push(new FieldEntity('audit_status', 'auditStatus', '审批状态', 'int', 1, 0, 0, 0, 0, '', '', tableData.length, currentEntityId, '', '', ''));
    vxeTableRef.value.reloadData(tableData);
}

/**
 * 提交
 */
const submitField = async () => {
    const modelingEntityDto = submitParams();
    saveSync(modelingEntityDto);
}

/**
 * 获取当前要提交的参数
 * @returns 
 */
const submitParams = (): ModelingEntityDto => {
    //console.log(tableData)
    const modelingEntityDto = new ModelingEntityDto();
    modelingEntityDto.fieldList = [...tableData]
    modelingEntityDto.id = currentEntityId;
    //console.log("modelingEntityDto:", modelingEntityDto)
    return modelingEntityDto;
}

/**
 * sql预览
 */
const viewSqlEvent = async () => {
    const modelingEntityDto = submitParams();
    let sql = await ddl(modelingEntityDto);
    if (sql === "") {
        //messageLocal.success('数据未发生改变或后台未获取sql语句');
        sql = "只有表结构发生改变,才会生成sql的ddl语句";
    }
    viewSql(format(sql));
}



/**
 * 保存字段
 * @param modelingEntityDto 
 */
const saveSync = async (modelingEntityDto: ModelingEntityDto) => {
    console.log("saveSync:", modelingEntityDto);
    const res = await saveField(modelingEntityDto);
    if (res) {
        messageLocal.success('提交成功!')
    }
}

/**
 * 删除行
 * @param row 
 */
const removeRowEvent = (row: FieldEntity) => {
    //console.log("row", row);
    let srcSort = row.sort;
    //先把自己干掉
    tableData.splice(srcSort, 1);
    //把自己原来后面的重新排序都往前-1，自己原来前面的不处理
    tableData.map((fieldEntity) => {
        if (fieldEntity.sort > srcSort) {
            fieldEntity.sort--;
        }
    });
    vxeTableRef.value.reloadData(tableData);
}

/**
 * 置顶
 * @param row 
 */
const toTop = (row: FieldEntity) => {
    let srcSort = row.sort;
    //先把自己干掉
    tableData.splice(srcSort, 1);
    //把原来自己前面的sort都往后+1，自己原来后面的不处理
    tableData.map((fieldEntity) => {
        if (fieldEntity.sort < srcSort) {
            fieldEntity.sort++;
        }
    });
    //把自己的sort提长到0到top去；
    row.sort = 0;
    //最后把自己加到数组头去
    tableData.unshift(row);
    vxeTableRef.value.reloadData(tableData);
}

/**
 * 置底
 * @param row 
 */
const toButtom = (row: FieldEntity) => {
    //先删掉自己并重新排序
    removeRowEvent(row);
    //把自己排序字段加到当前集合的长度——即新加的位置（sort以0开头）
    row.sort = tableData.length;
    //再把自己插入尾部
    tableData.push(row);
    vxeTableRef.value.reloadData(tableData);
}

/**
 * 上移下移
 * @param row 
 * @param action 
 */
const moveRowEvent = (row: FieldEntity, action: string) => {
    //console.log("row", row);
    let srcSort = row.sort;
    if (action === "up") {
        if (srcSort > 0) {
            //先互换对象里的sort值
            [tableData[row.sort - 1].sort, tableData[row.sort].sort] = [tableData[row.sort].sort, tableData[row.sort - 1].sort];
            //再互换对象本身
            [tableData[srcSort - 1], tableData[srcSort]] = [tableData[srcSort], tableData[srcSort - 1]];
        }
    } else if (action === "down") {
        if (row.sort < tableData.length - 1) {
            //先互换对象里的sort值
            [tableData[row.sort + 1].sort, tableData[row.sort].sort] = [tableData[row.sort].sort, tableData[row.sort + 1].sort];
            //再互换对象本身
            [tableData[srcSort + 1], tableData[srcSort]] = [tableData[srcSort], tableData[srcSort + 1]];
        }
    } else {
        console.error("错误的操作！");
    }
    vxeTableRef.value.reloadData(tableData);
}

/**
 * 下划线转驼峰
 * @param str 
 * @param num 
 * @returns 
 */
function formatConversion(str: string, num: number = 0) {
    const arr = str.split('_');
    for (let i = 0; i < arr.length; i += 1) {
        if (i === 0 && num === 1) {
            arr[i] = arr[i].charAt(0).toLowerCase() + arr[i].substring(1).toLowerCase();
        } else {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substring(1).toLowerCase();
        }
    }
    return arr.join('');
}

export {
    tableData, formatConfirm, addRow, vxeTableRef, typeList, submitField, resetTableData, addWfRow, syncField,
    removeRowEvent, moveRowEvent, initTableData, toTop, toButtom, initDialog, fkFieldNameList, handleFkField, handleFieldName, viewSqlEvent
}