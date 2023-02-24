import { ref, h } from 'vue'
import { PageInfo, TableChangeData, TableChangeContext, SelectOptions } from "tdesign-vue-next"
import { getResult, getByIds } from "./api/index"
import Page from '../../lib/page/Page'
import IDto from "../../lib/dto/IDto";
import { NButton } from 'naive-ui'
import { cloneDeep } from 'lodash'

//定义组件接受的类型
interface Porps {
    show: boolean;
    value?: Array<string>;
    columns: Array<any>;
    params: IDto;
    url: string[];
}

const sourceData = ref<Array<any>>([]);
const targetData = ref<Array<any>>([]);
const isLoading = ref(false);
const selectedRowKeys = ref([]);
const rowKey = 'id';
const _params = ref<IDto>(new IDto());
let _requestUrl: string = '';
let _idsUrl: string = '';
const _sourceColumns = ref<Array<object>>([]);
const _targetColumns = ref<Array<object>>([]);

//因为腾讯这个page对象里不能封装size属性，size属性好像是他内置的属性，后台分页需要的是size而不是pageSize,所以这里处理一下
const _pages = ref(new Page<IDto>);

/**
 * 模态框打开时，默认加载的事件
 * @param porps 
 */
const enterEvent = async (porps: Porps) => {
    _requestUrl = porps.url[0];
    _idsUrl = porps.url[1];
    _params.value = porps.params;
    await fetchData(_params.value);
    await bindData(porps.value);
    await initColumns(porps.columns);
    isLoading.value = false;
}

const initColumns = async (columns: Array<any>) => {
    _sourceColumns.value = cloneDeep(columns);
    _targetColumns.value = cloneDeep(columns);
    _sourceColumns.value.push(sourceDefaultCols);
    _targetColumns.value.push(targetDefaultCols);
}

/**
 * 绑定当前目标数据
 * @param data 
 */
const bindData = async (data?: Array<string>) => {
    targetData.value = [];
    if (data && data.length) {
        targetData.value = await getByIds(_idsUrl, data)
        resetSourceData(data);
    }
}

const resetSourceData = (data: Array<string>) => {
    sourceData.value = sourceData.value.map((item) => {
        if (data.includes(item.id)) {
            item.ic = true;
        }
        return item;
    })
}

/**
 * 请求后台，使用基于腾讯的分页类型进行了封装
 * @param params 
 */
const fetchData = async (params: IDto) => {
    try {
        isLoading.value = true;
        const response: Page<any> = await getResult(_requestUrl, params);
        sourceData.value = response.records;
        // 数据加载完成，设置数据总条数
        _params.value.page.total = response.total;
        _pages.value.total = response.total;
    } catch (err) {
        console.log(err);
        sourceData.value = [];
    }
};

/**
 * 点击查询的检索条件
 */
const search = () => {
    fetchData(_params.value);
    isLoading.value = false;
}

// BaseTable 中只有 page-change 事件，没有 change 事件
const onPageChange = async (pageInfo: PageInfo) => {
    _params.value.page.current = pageInfo.current;
    _params.value.page.pageSize = pageInfo.pageSize;
    _params.value.page.size = pageInfo.pageSize;
    _pages.value.current = pageInfo.current;
    _pages.value.pageSize = pageInfo.pageSize;
    await fetchData(_params.value);
    resetSourceData(targetData.value.map((item) => item.id));
    isLoading.value = false;
};

/**
 * 源列表删除时触发的事件
 * @param row 
 */
const sourceClickDelEvent = (row: any) => {
    row.ic = false;
    targetData.value = targetData.value.filter((item) => item.id !== row.id);
};

/**
 * 源列表选择添加时触发的事件
 * @param row 
 */
const sourceClickEvent = (row: any) => {
    row.ic = true;
    const copyRow = cloneDeep(row);
    targetData.value.push(copyRow);
};

/**
 * 目标列表点删除触发的事件
 * @param context 
 */
const targetClickEvent = (context: { text: any, row: any }) => {
    targetData.value = targetData.value.filter((item) => item.id !== context.row.id);
    sourceData.value = sourceData.value.map((item) => {
        if (item.id === context.row.id) {
            item.ic = false;
        }
        return item;
    });
};

// BaseTable 中只有 page-change 事件，没有 change 事件
const rehandleChange = (changeParams: TableChangeData, triggerAndData: TableChangeContext<any>) => {
    //console.log('分页、排序、过滤等发生变化时会触发 change 事件：', changeParams, triggerAndData);
};
/**
 * 单选或多选时触发的事件，暂时没用
 * @param value 
 * @param params 
 */
const onSelectChange = (value: Array<string | number>, params: SelectOptions<any>) => {
    console.log(value, params);
};

const sourceDefaultCols = {
    colKey: 'operation', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '操作'), fixed: 'right', ellipsis: true,
    cell: (h: any, context: { col: any, row: any }) => {
        return context.row.ic ? h(
            NButton,
            { type: "primary", size: "tiny", secondary: true, onClick: () => sourceClickDelEvent(context.row) },
            { default: () => '删除' }
        ) : h(
            NButton,
            { type: "info", size: "tiny", secondary: true, onClick: () => sourceClickEvent(context.row) },
            { default: () => '选择' }
        )
    }
}
const targetDefaultCols = { colKey: 'operation', width: 70, align: 'center', title: () => h('B', { style: 'color: #000' }, '操作'), cell: 'operation', fixed: 'right', ellipsis: true };

export {
    rowKey,
    onSelectChange,
    onPageChange,
    rehandleChange,
    _sourceColumns as sourceColumns,
    _targetColumns as targetColumns,
    _pages as pages,
    sourceData,
    isLoading,
    selectedRowKeys,
    sourceClickEvent,
    targetData,
    bindData,
    sourceClickDelEvent,
    targetClickEvent,
    enterEvent,
    _params as params,
    search,
}