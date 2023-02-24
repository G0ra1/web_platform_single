/**
 * @Description 统计分析
 * @author 云数网讯 wangzehua@netwisd.com@netwisd.com
 * @date 2023-02-15 14:50:47
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, NwGridSearch, Db } from '@platform/main'
import { SelectOption } from 'naive-ui'

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
            { field: 'resultItem', title: '检测项目', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            { field: 'resultItemVal', title: '检测结果', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
            {
                title: '操作',
                showHeaderOverflow: true,
                align: 'center',
                minWidth: '110px',
                fixed: 'right',
                slots: {
                    default: ({ row }) => {
                        row.filterData = filterData.value;
                        let detail = h(
                            NwFunctionPredefine,
                            { code: "cemlabStatisticsAnalysisFormDetail", params: [row] }
                        );
                        let chart = h(
                            NwFunctionPredefine,
                            { code: "cemlabStatisticsAnalysisFormChart", params: [row] }
                        );
                        return [detail, chart]
                    }
                },
            }
        ]
    }, new RequestPaging(
        '/cemlab/cemlabStatisticsAnalysis/page',
        'post'
    )
)

const refresh = () => {
    reset({})
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})

const experimentTypeEnum = ref([{ label: "内部通知单", value: 1 }, { label: "委托合同单", value: 2 }]);

const selectData = [
    {
        label: "任务基础信息", value: "1", field: "experiment_receipts_one", disabled: false, children: [
            { label: "化验报告单编码", field: "code", value: "1", disabled: false },
            { label: "队号", field: "duiHao", value: "2", disabled: false },
            { label: "任务来源", field: "taskSource", value: "3", disabled: false },
            { label: "取样人", field: "samplingUserName", value: "4", disabled: false },
            { label: "取样地点", field: "samplingSpot", value: "5", disabled: false },
            { label: "取样日期（灰）", field: "samplingAshDate", value: "6", disabled: false },
            { label: "水样来源", field: "waterSampleSource", value: "7", disabled: false },
            { label: "水样桶号", field: "waterSampleBarrelNumber", value: "8", disabled: false },
            { label: "取样日期（水）", field: "samplingWaterDate", value: "9", disabled: false }
        ]
    },
    {
        label: "井基础信息", value: "2", field: "experiment_receipts_two", disabled: false, children: [
            { label: "构造区块", field: "structuralBlock", value: "1", disabled: false },
            { label: "井号", field: "wellsNumber", value: "2", disabled: false },
            { label: "完成日期", field: "finishDate", value: "3", disabled: false },
            { label: "井深(m)", field: "wellsDepth", value: "4", disabled: false },
            { label: "垂深(m)", field: "verticalDepth", value: "5", disabled: false },
            { label: "套管尺寸(mm)", field: "casingSize", value: "6", disabled: false },
            { label: "固井方式", field: "cementingMode", value: "7", disabled: false }
        ]
    },
    {
        label: "实验条件", value: "3", field: "experiment_condition", disabled: false, children: [
            { label: "样品类型", field: "sampleType", value: "1", disabled: false },
            { label: "浆体类型", field: "slurryType", value: "2", disabled: false },
            { label: "水泥型号", field: "cementType", value: "3", disabled: false },
            { label: "水泥加量", field: "cementQuantity", value: "4", disabled: false },
            { label: "水泥配方", field: "slurryFormulation", value: "5", disabled: false },
            { label: "养护温度", field: "curingTemperature", value: "9", disabled: false },
            { label: "养护压力", field: "curingPressure", value: "10", disabled: false },
            { label: "养护时间", field: "curingTime", value: "11", disabled: false },
            { label: "系数", field: "coefficient", value: "13", disabled: false },
        ]
    },
    {
        label: "水泥浆性能", field: "experiment_slurry_demand", disabled: false, children: [
            { label: "密度", field: "density", value: "1", disabled: false },
            { label: "滤失量", field: "filterLoss", value: "2", disabled: false },
            { label: "游离液", field: "freeFluid", value: "3", disabled: false },
            { label: "水泥浆稠度", field: "cementConsistency", value: "4", disabled: false },
            { label: "稠化时间", field: "thickeningTime", value: "5", disabled: false },
            { label: "抗压强度", field: "compressiveStrength", value: "6", disabled: false },
            { label: "抗压强度时间", field: "compressiveStrengthTime", value: "7", disabled: false },
            { label: "流动度", field: "fluidity", value: "8", disabled: false }
        ]
    }];



//查询联动
const selectDataUpdate = (dataValue: string, option: SelectOption, index: number) => {
    selectData.forEach(function (item) {
        if (item.field == dataValue) {
            let childrenOptions = item.children;
            childrenOptions.forEach(function (childrenItem) {
                outSelectData.value.forEach(function (selectItem) {
                    if (selectItem.fieldTwo == childrenItem.field) {
                        childrenItem.disabled = true
                    }
                });
            });
            gridSearchRef.value[index].searchTwo = childrenOptions;
        }
    });
};
//查询联动
const selectSunDataUpdate = (sunDataValue: string, option: SelectOption) => {

};

const updatefilterDataValue = (value: string, index: number) => {
    let update = outSelectData.value[index];
    filterData.value[update.fieldTwo] = value;
}

const gridSearchRef = ref([{ searchTwo: [{ label: "", field: "", disabled: false }] }]);
gridSearchRef.value.splice(0, 1);
const outSelectData = ref([{ fieldOne: "", fieldTwo: "", operationType: "eq", value: "" }]);
outSelectData.value.splice(0, 1);
// 增加查询条件
const addFilter = () => {
    gridSearchRef.value.push({ searchTwo: [{ label: "", field: "", disabled: false }] });
    outSelectData.value.push({ fieldOne: "", fieldTwo: "", operationType: "eq", value: "" });
}
//删除查询条件
const delFilter = (index: number) => {
    let update = outSelectData.value[index];
    filterData.value[update.fieldTwo] = null;

    gridSearchRef.value.splice(index, 1);
    outSelectData.value.splice(index, 1);
}

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog, selectData, selectDataUpdate, selectSunDataUpdate, updatefilterDataValue, experimentTypeEnum, gridSearchRef, outSelectData, addFilter, delFilter
}