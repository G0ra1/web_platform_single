import { ref, h, reactive } from 'vue'
import { getResult, getByIds ,getByAssetsId} from "./api/index"
import Page from '../../lib/page/Page'
import IDto from "../../lib/dto/IDto";
import _, { cloneDeep } from 'lodash'
import { VxeTableEvents } from 'vxe-table'

const detailTable = ref<any>();
const toggleExpandChangeEvent = (params: any) => {
    const vtable = detailTable.value;
    const { row, expanded } = params;
    console.log('节点展开事件', expanded, '获取父节点：', vtable?.getParentRow(row));
}

//定义组件接受的类型
interface Porps {
    show: boolean;
    value?: Array<string>;
    columns: Array<any>;
    params: IDto;
    url: string[];
}

const isLoading = ref(false);
const _params = ref<IDto>(new IDto());
const sourceData = ref<Array<any>>([]);
const sourceColumns = ref<Array<object>>([]);
const checkedData = ref<Array<any>>([]);
const checkedDataIds = ref<Array<any>>([]);
let _requestUrl: string = '';
let _idsUrl: string = '';

/**
 * 模态框打开时，默认加载的事件
 * @param porps 
 */
const enterEvent = async (porps: Porps) => {
    _requestUrl = porps.url[0];
    _idsUrl = porps.url[1];
    _params.value = porps.params;
    initColumns(porps.columns);
    await fetchData(_params.value);
    console.log("enterEvent  sourceData.value  list:{}",sourceData.value)
    // await bindData(porps.value);
}

const initColumns = async (columns: Array<any>) => {
    sourceColumns.value.push(checkCol)
    columns.map(item => {
        sourceColumns.value.push(item)
    })
    // sourceColumns.value = cloneDeep(columns);
    // sourceColumns.value = cloneDeep(columns);
    detailTable.value?.reloadColumn(sourceColumns.value);
}
//<vxe-column type="checkbox" title="" width="80" tree-node></vxe-column>
const checkCol =  { type: 'checkbox', minWidth: 80, align: 'center', title: '', treeNode : true  };

/**
 * 请求后台，使用基于腾讯的分页类型进行了封装
 * @param params 
 */
const fetchData = async (params: IDto) => {
    try {
        sourceData.value = [];
        isLoading.value = true;
        // params.id = '1602172475163578370';
        const response = await getResult('/asset/materialDeploy/getList', params);
        (response).map(item =>{
            (item.detailList).map((detail : any) =>{
                delete detail.detailList;
                sourceData.value.push(detail);
            });
            item.id = item.assetsId;
            delete item.assetsId;
            delete item.detailList;
            sourceData.value.push(item);
        })
        // sourceData.value = response;
        // 数据加载完成，设置数据总条数
        // _params.value.page.total = response.total;
        // _pages.value.total = response.total;
    } catch (err) {
        console.log(err);
        sourceData.value = [];
    }
    detailTable.value?.reloadData(sourceData.value);
    isLoading.value = false;
};

/**
 * 绑定当前目标数据
 * @param data 
 */
// const bindData = async (data?: Array<string>) => {
//     checkedData.value = [];
//     if (data && data.length) {
//         checkedData.value = await getByIds(_idsUrl, data)
//         resetSourceData(data);
//     }
// }

// const formatTreeData = (list : Array<any>) => {
//     // let result = Array<any>;
//     list.map(item =>{
//         if(typeof(item.assetsId) === 'undefined' || item.assetsId === null || item.assetsId ===''){
//             list.map(e=>{
//                 if(e.assetsId && item.id === e.assetsId){
//                     item.detailList.push(e);
//                 }
//             })
//         }
//         return item;
//     })
//     return list;
// }

/**
 * 获取当前目标数据
 * @param data 
 */
// const getData = async (data?: Array<string>) => {
//     if (data && data.length) {
//         const assetList = await getByIds('/asset/assetAssets/getByIds', data);
//         assetList.map((item) => {
//             delete item.assetsId;
//             return item;
//         })
//         const detailList = await getByAssetsId('/asset/assetAssetsDetail/getByAssetsId', '1547923747648835585');
//         (detailList).forEach((val,index,array) =>{
//             (assetList).push(val);
//         })
//         console.log("数据列表------>{}",assetList);
//         return assetList;
//     }
// }

/**
 * 点击查询的检索条件
 */
const search = () => {
    fetchData(_params.value);
}

const selectChangeEvent: VxeTableEvents.CheckboxChange = ({ $table, row, $event }) => {
    checkedDataIds.value = [];
    checkedData.value = [];
    const records = $table.getCheckboxRecords();
    // const isCheck = $table.isCheckedByCheckboxRow(row);
    records.map(item => {
        checkedData.value.push(item);
        checkedDataIds.value.push(item.id);
    })
    // console.info(`勾选${records.length}个树形节点`, records)
  }
  const selectAllEvent: VxeTableEvents.CheckboxAll = ({ $table, $event }) => {
    checkedDataIds.value = [];
    checkedData.value = [];
    const records = $table.getCheckboxRecords();
    records.map(item => {
        checkedData.value.push(item);
        checkedDataIds.value.push(item.id);
    })
  } 

export {
    isLoading,
    detailTable,
    sourceData,
    checkedData,
    checkedDataIds,
    enterEvent,
    search,
    selectChangeEvent,
    selectAllEvent,
    toggleExpandChangeEvent
}