import { ref } from 'vue';
import { getOrgTree } from "../api/index";
import TreeDto from "../dto/TreeDto";
import TreeVo from "../vo/TreeVo";
import OrgVo from "../vo/OrgVo";
import { TreeNodeModel, TreeNodeValue } from "tdesign-vue-next";

let selectKey = ref("请输入组织名称查询");
const isLoading = ref(false);
let expandLevelRef = ref(0);

//初始化
let items = ref<Array<TreeVo>>([]);

//异步加载
const initItems = async (orgType: number | undefined, level: number | undefined, expandLevel: number | undefined) => {
    if (!items.value.length) {
        isLoading.value = true;
        if (expandLevel) expandLevelRef.value = expandLevel;
        items.value = await getOrgTree(new TreeDto(orgType, level));
        isLoading.value = false;
        //如果传的有分层，说明第一次没有加载完，再做一次二次异步加载
        if (level) {
            getOrgTree(new TreeDto(orgType)).then((data) => {
                items.value = data;
            });
        }
    }
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
const handleClick = (context: { node: TreeNodeModel<TreeVo>; e: MouseEvent }): OrgVo => {
    let result, key;
    key = JSON.parse(context?.node?.value as string).id;
    if (!tempMap.get(key)) {
        result = JSON.parse(context?.node?.value as string);
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
    const valObj = JSON.parse(val);
    tempMap.set(valObj.id, true);
}

export {
    items,
    filterText,
    search,
    handleFilterByText,
    handleClick,
    initItems,
    selectKey,
    expandLevelRef,
    handleExpand,
    isLoading
}