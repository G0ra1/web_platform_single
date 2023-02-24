/**
 * @Description 统计分析图表
 * @author 云数网讯 wangzehua@netwisd.com@netwisd.com
 * @date 2023-02-17 10:47:55
 */

import { ref, reactive } from 'vue';
import { FormInst, FormRules } from 'naive-ui';
import { AbstractForm, VxeHelper, RequestPaging, Db, request } from "@platform/main";
import { FormSchema } from "./conf";
import CemlabStatisticsAnalysisChart from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import * as echarts from 'echarts';
import { getChartList } from "./api";

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<CemlabStatisticsAnalysisChart>(new CemlabStatisticsAnalysisChart());
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
        const resultChartList = getChartList(queryData.value);
        resultChartList.then((resultList) => {
            const jsonObj = JSON.parse(JSON.stringify(resultList, null, 2));
            jsonObj.forEach((result: { resultItemVal: string, resultItemCount: string; }) => {
                let chart: number[] = [];
                chart.push(Number(result.resultItemCount));
                chart.push(Number(result.resultItemVal));
                this.chartList.push(chart);
            });
            setOption(this.chartList);
        });
    };

    //提交时会调取这个
    getValue = async () => {
        return cloneDeep(this.dataModel.value);
    };

    chartList: number[][] = reactive([]);
}

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

let dom;
let myChart: echarts.ECharts;
function buildChart() {
    dom = document.getElementById("chart") as HTMLElement;
    myChart = echarts.init(dom);
    window.onresize = function () {
        myChart.resize();
    };
}

function setOption(chartList: number[][]) {
    const COLOR_ALL = [
        '#37A2DA',
        '#e06343',
        '#37a354',
        '#b5bd48',
        '#8378EA',
    ];
    // 绘制图表
    myChart.setOption({
        title: {
            text: '数值 / 次数',
            left: 80,
            bottom: 20,
            textStyle: {
                fontStyle: 'normal',
                fontWeight: 500,
                color: 'rgb(201, 16, 25)'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (_params: [], ticket: any, callback: any) {
                let tooltipStr: string = "<div>";
                _params.forEach((paramsData: { value: number[], color: string }) => {
                    let x: number = paramsData.value[0];
                    let y: number = paramsData.value[1];
                    tooltipStr += `<p style='color:${paramsData.color}'>数值 ${y}，出现${x}次</p>`;
                });
                tooltipStr += "<div>";
                return tooltipStr;
            }
        },
        xAxis: {
        },
        yAxis: {
        },
        visualMap: {
            type: 'piecewise',
            top: 'middle',
            min: 0,
            max: 100,
            color: COLOR_ALL
        },
        series:
        {
            type: "scatter",
            data: chartList
        }

    });
}

//拼接查询参数
const queryData = ref({ id: null, filterData: null });
function intQueryData(dataModel: any) {
    Object.assign(queryData.value, dataModel.value);
    Object.assign(queryData.value, dataModel.value.filterData);
    queryData.value.id = null;
    queryData.value.filterData = null;
}

export {
    FormModal, initDialog, buildChart, queryData
}
