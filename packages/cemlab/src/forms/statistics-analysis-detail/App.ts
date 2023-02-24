/**
 * @Description 统计分析详情
 * @author 云数网讯 wangzehua@netwisd.com@netwisd.com
 * @date 2023-02-16 12:04:05
 */

import { ref } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm, VxeHelper, RequestPaging, Db } from "@platform/main";
import { FormSchema } from "./conf";
import CemlabStatisticsAnalysisDetail from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import VXETable from 'vxe-table'
import XEUtils from 'xe-utils'

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<CemlabStatisticsAnalysisDetail>(new CemlabStatisticsAnalysisDetail());
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
        intQueryData(this.dataModel);
        reset(queryData.value);
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };
}

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { type: 'seq', minWidth: '50px' },
            { field: 'experimentReceiptsCode', title: '任务单号', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'experimentReceiptsOrgName', title: '所属单位', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'resultItem', title: '检测项目', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'resultItemVal', title: '检测结果', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'experimentDate', title: '实验时间', showHeaderOverflow: true, minWidth: '120px', align: 'center', formatter: 'formatDate' },
            { field: 'experimentUserName', title: '实验人员', showHeaderOverflow: true, minWidth: '120px', align: 'center' }
        ]
    }, new RequestPaging(
        '/cemlab/cemlabStatisticsAnalysisDetail/page',
        'post'
    )
)

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})

// 自定义全局的格式化处理函数
VXETable.formats.mixin({
    // 格式化日期，默认 yyyy-MM-dd
    formatDate({ cellValue }, format) {
        return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd')
    }
})

//拼接查询参数
const queryData = ref({ id: null, filterData: null });
function intQueryData(dataModel: any) {
    Object.assign(queryData.value, dataModel.value);
    Object.assign(queryData.value, dataModel.value.filterData);
    queryData.value.id = null;
    queryData.value.filterData = null;
}

export {
    FormModal, bind, gridRef, filterData, query, reset, paramsArray, initDialog, queryData, intQueryData
}
