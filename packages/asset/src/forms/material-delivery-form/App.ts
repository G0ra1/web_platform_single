/**
 * @Description 资产出库管理
 * @author 云数网讯 hansongpeng@netwisd.com
 * @date 2022-12-06 13:43:55
 */

import { ref,h,Component, watch,computed } from 'vue';
import { FormInst, FormRules, NTag, NIcon } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import AssetMaterialDelivery from "./model"
import { cloneDeep } from "lodash";
import Rule from "./rule";
import AssetMaterialDeliveryDetail from "./modelDetail";
import { id } from 'date-fns/locale';
const typeArray = ["", "primary", "info", "success", "warning"];
const statusArray = ["", "资产", "低值易耗品", "库存", "原材料"];

export const assetDetailList = ref<Array<any>>([]);

const datailData = ref<Array<AssetMaterialDeliveryDetail>>([]);
class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
        watch(this.dataModel, () => {
            debugger;
            console.log("ssssss");
            this.dataModel.value.detailList.map((item => {
                if (item.detailList){
                    //计算每个库存台账的出库总数
                    let num:number = 0;
                     item.detailList.forEach(detail=>{
                     num = num + detail.deliveryNumber;
                     })
                     item.deliveryNumber = num;
                   }
            }))
        },{
            deep:true
        })
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<AssetMaterialDelivery>(new AssetMaterialDelivery());
    assetDetailList = computed(() => {
        const rrList: any = [];
        this.dataModel.value.detailList.forEach((item) => {
            rrList.push(...item.detailList)
        })
        console.log("rrList", rrList);
        return rrList;
       
    })
    assetDetailUpdate = (t: any, d: any) => {
       //如果出库明细还有剩余的值,就说明出库台账还有子集
       if (this.assetDetailList.value.length > 0){
        //获取到删除的那条资产id,资产明细id 用于删除dataModel中的实际值
        const assetsId = d[0].assetsId
        const assetsDetailId = d[0].assetsDetailId;
        //删除出库明细（assetDetailList）中的数据
        const newDetailFatherList:Array<AssetMaterialDeliveryDetail> = [];
        this.dataModel.value.detailList.map((detail)=>{
            if (detail.assetsId == assetsId){
                const newDetailSonList:Array<AssetMaterialDeliveryDetail> = [];
                detail.detailList.map((detailDetail)=>{
                    if(detailDetail.assetsDetailId != assetsDetailId){
                        newDetailSonList.push(detailDetail);
                    }
                })
                detail.detailList = newDetailSonList;
            }
            if (detail.detailList.length > 0){
                newDetailFatherList.push(detail);
            }
        })
        this.dataModel.value.detailList = newDetailFatherList;
    }else{
        this.dataModel.value.detailList = []
    }
                   
    }
    //验证规则
    rules = ref<FormRules>({});
    //处理页面隐藏、只读等特殊权限的控制数据
    dataPermits = ref<any>({});

    getSchema = async () => {
        // 从表单获取数据
        return FormSchema;
    };

    //这个地方父类定义使用了object，不能直接用我们的类做了形参
    setValue = (d: object) => {

        // 这里使用copy赋值，不能直接把d赋值或强转赋值给dataModel,因为这会使dataModel对应的代理对象发生改变为object；
        Object.assign(this.dataModel.value, d);  

    };

    //提交时会调取这个
    getValue = async () => {
        /* const ccList = this.dataModel.value.detailList;
        this.dataModel.value.detailList.forEach((item) => {
            item.id = null;                        
            ccList.push(...item.detailList)
        })
        this.dataModel.value.detailList = ccList; */
        return cloneDeep(this.dataModel.value);
    };
    renderIcon = (icon: Component) => {
        return h(NIcon, null, {
            default: () => h(icon)
        })
    }
    doubeList = [
        { field: 'itemName', minWidth: 150, title: '物资名称',align: 'center', editRender: {enabled:false},slots: { edit: 'itemName' } },
        { field: 'itemCode', minWidth: 100, title: '物资编码',align: 'center', editRender: {enabled:false},slots: { edit: 'itemCode' } },
        { field: 'desclong', minWidth: 150, title: '物资长描述',align: 'center',editRender: {enabled:false}, slots: { edit: 'desclong' } },
        { field: 'assetOrgName', minWidth: 150, title: '资产所属机构名称',align: 'center', editRender: {enabled:false}, slots: { edit: 'assetOrgName' } },
        { field: 'assetDeptName', minWidth: 120, title: '资产所属部门名称',align: 'center', editRender: {enabled:false}, slots: { edit: 'assetDeptName' } },
        {
            field: 'itemType', minWidth: 100, title: '资产类型', align: 'center', editRender: {enabled:false}, slots: {
                default: ({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )]
            }
        },
        { field: 'materialQuality', minWidth: 100, title: '物资材质', align: 'center', editRender: {enabled:false}, slots: { edit: 'materialQuality' } },
        { field: 'unitName', minWidth: 50, title: '单位', align: 'center',editRender: {enabled:false}, slots: { edit: 'unitName' } },
        { field: 'deployNumber', minWidth: 100, title: '调拨数量', align: 'center', editRender: {enabled:false}, slots: { edit: 'deployNumber' } },
    ];
    columns = [
        { type: "seq",  align: 'center', width: 50, minWidth: 50 },
        { field: 'itemName', minWidth: 150, title: '物资名称',align: 'center', editRender: {enabled:false},slots: { edit: 'itemName' } },
        { field: 'itemCode', minWidth: 100, title: '物资编码',align: 'center', editRender: {enabled:false},slots: { edit: 'itemCode' } },
        { field: 'desclong', minWidth: 150, title: '物资长描述',align: 'center',editRender: {enabled:false}, slots: { edit: 'desclong' } },
        { field: 'assetOrgName', minWidth: 150, title: '资产所属机构名称',align: 'center', editRender: {enabled:false}, slots: { edit: 'assetOrgName' } },
        { field: 'assetDeptName', minWidth: 120, title: '资产所属部门名称',align: 'center', editRender: {enabled:false}, slots: { edit: 'assetDeptName' } },
       /*  {
            field: 'itemType', minWidth: 100, title: '资产类型', align: 'center', editRender: {enabled:false}, slots: {
                default: ({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )]
            }
        }, */
        { field: 'materialQuality', minWidth: 100, title: '物资材质', align: 'center', editRender: {enabled:false}, slots: { edit: 'materialQuality' } },
        { field: 'unitName', minWidth: 50, title: '单位', align: 'center',editRender: {enabled:false}, slots: { edit: 'unitName' } },
        { field: 'deployNumber', minWidth: 100, title: '调拨数量', align: 'center', editRender: { enabled: false }, slots: { edit: 'deployNumber' } },
        { field: 'deliveryNumber', minWidth: 100, title: '出库数量', align: 'center', editRender: {enabled:false}, slots: { edit: 'deliveryNumber' } },

    ];
    details = [
        { type: "seq",  align: 'center', width: 50, minWidth: 50 },
        { field: 'itemName', minWidth: 150, title: '物资名称',align: 'center', editRender: {enabled:false},slots: { edit: 'itemName' } },
        { field: 'itemCode', minWidth: 100, title: '物资编码',align: 'center', editRender: {enabled:false},slots: { edit: 'itemCode' } },
        { field: 'desclong', minWidth: 150, title: '物资长描述',align: 'center',editRender: {enabled:false}, slots: { edit: 'desclong' } },
        { field: 'assetOrgName', minWidth: 150, title: '资产所属机构名称',align: 'center', editRender: {enabled:false}, slots: { edit: 'assetOrgName' } },
        { field: 'assetDeptName', minWidth: 120, title: '资产所属部门名称',align: 'center', editRender: {enabled:false}, slots: { edit: 'assetDeptName' } },
       /*  {
            field: 'itemType', minWidth: 100, title: '资产类型', align: 'center', editRender: {enabled:false}, slots: {
                default: ({ row }: any) => [h(
                    NTag,
                    { size: "small", type: typeArray[row.itemType] } as {},
                    { default: () => statusArray[row.itemType] }
                )]
            }
        }, */
        { field: 'materialQuality', minWidth: 100, title: '物资材质', align: 'center', editRender: {enabled:false}, slots: { edit: 'materialQuality' } },
        { field: 'unitName', minWidth: 50, title: '单位', align: 'center',editRender: {enabled:false}, slots: { edit: 'unitName' } },
/*         { field: 'deployNumber', minWidth: 100, title: '调拨数量', align: 'center', editRender: { enabled: false }, slots: { edit: 'deployNumber' } },
 */        { field: 'deliveryNumber', minWidth: 100, title: '出库数量', align: 'center', editRender: {enabled:true}, slots: { edit: 'deliveryNumber' } },

    ];
}

export {
    FormModal
}
