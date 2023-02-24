/**
 * @Description 资产台账
 * @author 云数网讯 zouliming@netwisd.com
 * @date 2022-12-06 16:56:35
 */

import { ref } from 'vue';
import AssetsDetailVo from '../../lib/vo/AssetsDetailVo'
const data = ref<Array<AssetsDetailVo>>([]);
import { AbstractForm } from "@platform/main";

const vxeTableRef = ref<any>();

class FormModal extends AbstractForm {
    //执行初始化自定义脚本
    initScript = async (params: any) => {
    }
    getSchema = async () => {
        return {};
    };

    setValue = async (d: object) => {
        // await init(d as any);
        Object.assign(data.value, d);
        vxeTableRef.value.reloadData(data.value);
    };
    getValue = async () => {
        return {};
    };
}


const columns = [
    { field: 'itemName', title: '物资名称', showHeaderOverflow: true, minWidth: '180px', align: 'center' },
    { field: 'itemCode', title: '物资编码', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'assetsCode', title: '资产编码', showHeaderOverflow: true, minWidth: '180px', align: 'center', showOverflow: true },
    { field: 'assetSelfCode', title: '资产自编码', showHeaderOverflow: true, minWidth: '180px', align: 'center', showOverflow: true },
    { field: 'assetFinanceCode', title: '财务编码', showHeaderOverflow: true, minWidth: '140px', align: 'center', showOverflow: true },
    { field: 'useUserName', title: '资产使用人', showHeaderOverflow: true, minWidth: '100px', align: 'center', showOverflow: true },
    //{ field: 'desclong', title: '备注', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
    { field: 'descshort', title: '物资短描述', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
    { field: 'assetOrgName', title: '所属机构', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
    { field: 'assetDeptName', title: '所属部门', showHeaderOverflow: true, minWidth: '180px', align: 'center', showOverflow: true },
    { field: 'classifyCode', title: '分类编码', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'classifyName', title: '分类名称', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
    { field: 'unitName', title: '物资单位', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
    { field: 'materialQuality', title: '物资材质', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'standard', title: '物资标准', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'specs', title: '物资规格', showHeaderOverflow: true, minWidth: '200px', align: 'center', showOverflow: true },
    { field: 'qualityAssuranceLevel', title: '质保等级', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'manufacturer', title: '生产厂家', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'productionDate', title: '生产日期', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'batchNumber', title: '批次/炉号', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'factoryCode', title: '出厂编号', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'serviceLife', title: '使用年限', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'warehouseName', title: '仓库地点', showHeaderOverflow: true, minWidth: '120px', align: 'center' },
    { field: 'shelfName', title: '货架号', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
    { field: 'status', title: '物资状态', showHeaderOverflow: true, minWidth: '100px', align: 'center' },
]

export {
    columns, data, FormModal, vxeTableRef
}