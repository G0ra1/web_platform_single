import { ref, h } from 'vue';
import { getOrgTree, getItemClassifyTree } from "../api/index";
import TreeDto from "../dto/TreeDto";
import TreeVo from "../vo/TreeVo";
import MdmOrgVo from "../vo/MdmOrgVo";
import { TreeNodeModel, Select as TSelect, SelectValue, TreeNodeValue } from "tdesign-vue-next";
import { TreeType } from "../model/Porps";

const map: Map<String, Array<TreeVo>> = new Map();
const selectKey = ref("请输入组织名称查询");
const selectTypeValue = ref('1');
const expandLevelRef = ref(1);
const isDisabled = ref(false);
const isLoading = ref(false);
const _options = ref([
    { label: '组织部门', value: '1' },
    { label: '物资分类', value: '2' },
]);

//定义数据
let items = ref<Array<TreeVo>>([]);

//初始化
const initItems = async (orgType?: number, level?: number, expandLevel?: number, treeType?: TreeType) => {
    const params = new TreeDto(orgType, level);
    if (typeof(expandLevel) == 'number') expandLevelRef.value = expandLevel;
    isLoading.value = true;
    switch (treeType) {
        case 'All':
            await initOrgTree(params, level);
            await initItemClassify(params, false);
            break;
        case 'Org':
            await initOrgTree(params, level);
            _options.value.pop();
            isDisabled.value = true;
            break;
        case 'ItemClassify':
            await initItemClassify(params, true);
            _options.value.shift();
            selectTypeValue.value = '2';
            selectKey.value = "请输入物资分类名称查询";
            isDisabled.value = true;
            break;
        default:
            await initOrgTree(params, level);
            await initItemClassify(params, false);
            break;
    }
    isLoading.value = false;
}

const initOrgTree = async (params: TreeDto, level?: number) => {
    items.value = await getOrgTree(params);
    //如果传的有分层，说明第一次没有加载完，再做一次二次异步加载
    if (level) {
        getOrgTree(new TreeDto(params.orgType)).then((data) => {
            items.value = data;
        });
    }
    map.set('1', items.value);
}

/**
 * 初始化物资分类树
 * @param params 
 * @param changeItemsValue 
 */
const initItemClassify = async (params: TreeDto, changeItemsValue: boolean, level?: number,) => {
    const result = await getItemClassifyTree(params);
    if (changeItemsValue) {
        items.value = result;
    }
    //如果传的有分层，说明第一次没有加载完，再做一次二次异步加载
    if (level) {
        getItemClassifyTree(params).then((data) => {
            if (changeItemsValue) {
                items.value = data;
            }
            map.set('2', data);
        });
    }
    map.set('2', result);
}

/**
 * 选择
 */
const protocolSelect = ref(() => {
    return h(
        TSelect,
        {
            options: _options.value,
            style: "width: 100px",
            value: selectTypeValue.value,
            disabled: isDisabled.value,
            onChange: selectTypeChange
        }
    );
});

const selectTypeChange = (value: SelectValue) => {
    filterText.value = '';
    handleFilterByText.value = null;
    selectTypeValue.value = value.toString();
    if (selectTypeValue.value === '1') {
        //expandLevelRef.value = 1;
        selectKey.value = "请输入组织名称查询";
    } else if (selectTypeValue.value === '2') {
        //expandLevelRef.value = 1;
        selectKey.value = "请输入物资分类名称查询";
    }
    items.value = map.get(selectTypeValue.value) as Array<TreeVo>;
}

//字段的转换慎用，用了之后搜索后会影响树的展现及性能
//const keys = { "value": "id", "label": "orgName", "children": "kids" };

//检索的文本
const filterText = ref('');

//tree组件过滤树的文本
const handleFilterByText = ref(null);

//触发检索的事件
const search = (state: any) => {
    handleFilterByText.value = ((node: TreeNodeModel<TreeVo>) => node.data?.label?.indexOf(filterText.value) >= 0) as any
};

//点击节点的事情
const handleClick = (context: { node: TreeNodeModel<TreeVo>; e: MouseEvent }): MdmOrgVo | string => {
    const value: string = context?.node?.value as string;
    let result = "", key;
    if (selectTypeValue.value === '1') {
        key = JSON.parse(context?.node?.value as string).id;
        if (!tempMap.get(key)) {
            result = JSON.parse(context?.node?.value as string);
        }
    } else if (selectTypeValue.value === '2') {
        if (!tempMap.get(value)) result = value;
    }
    tempMap.delete(key);
    return result;
}

/**
 * 因为tdesing组件（至少当前。0.28这个版本）有bug，在展示事件时，会同时触发点击事件，没办法这样变相处理一下；
 */
const tempMap: Map<string, boolean> = new Map();

const handleExpand = (value: Array<TreeNodeValue>, context: { node: TreeNodeModel<TreeVo>; e: MouseEvent }) => {
    const val: string = context?.node?.value as string;
    if (selectTypeValue.value === '1') {
        const valObj = JSON.parse(val);
        tempMap.set(valObj.id, true);
    } else if (selectTypeValue.value === '2') {
        return tempMap.set(val, true);;
    }
}

export {
    items,
    filterText,
    search,
    handleFilterByText,
    handleClick,
    initItems,
    protocolSelect,
    selectKey,
    expandLevelRef,
    handleExpand,
    isLoading
}