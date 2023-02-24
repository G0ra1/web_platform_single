/**
 * @Description 资产借用
 * @author 云数网讯 lhy@netwisd.com
 * @date 2022-12-01 12:18:53
 */

import { ref ,h, computed, watch} from 'vue';
import { FormInst, FormRules,NTag } from 'naive-ui';
import { AbstractForm } from "@platform/main";
import { FormSchema } from "./conf";
import { cloneDeep } from "lodash";
import Rule from "./rule";
import materialBorrowDelivery from './model';
import AssetBorrowDeliveryDetail from './detailModel';

const typeArray = ["", "primary", "info", "success", "warning"];
const statusArray = ["", "资产", "低值易耗品", "库存", "原材料"];

class FormModal extends AbstractForm {

    constructor() {
        super();
        Object.assign(this.rules.value, new Rule())
        watch(this.dataModel,()=>{
            this.dataModel.value.detailList.map((item =>{
                let allNum:number = 0;
                if (item.detailList){
                    //计算每个库存台账的出库总数
                    let num:number = 0;
                    item.detailList.forEach(detail=>{
                        num = num + detail.deliveryNumber;
                    })
                    item.deliveryNumber = num;
                    allNum = allNum + num;
                }
                this.dataModel.value.deliveryNumber = allNum;
            }))
        },{
            deep: true
        })
    }

    //表单引用类
    formRef = ref<FormInst>();
    //表单值
    dataModel = ref<materialBorrowDelivery>(new materialBorrowDelivery());
    //出库选择的明细账
    assetDetailList = computed(()=>{
        const rrList:any = []
        this.dataModel.value.detailList.forEach((item)=>{
            rrList.push(...item.detailList)
        })
        return rrList;
    })
    //删除出库明细的时候会调用
    assetDetailUpdate = (t:any,d:any) => {
        //如果出库明细还有剩余的值,就说明出库台账还有子集
        if (this.assetDetailList.value.length > 0){
            //获取到删除的那条资产id,资产明细id 用于删除dataModel中的实际值
            const assetsId = d[0].assetsId
            const assetsDetailId = d[0].assetsDetailId;
            //删除出库明细（assetDetailList）中的数据
            const newDetailFatherList:Array<AssetBorrowDeliveryDetail> = [];
            this.dataModel.value.detailList.map((detail)=>{
                if (detail.assetsId == assetsId){
                    const newDetailSonList:Array<AssetBorrowDeliveryDetail> = [];
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
        return cloneDeep(this.dataModel.value);
    };

    assetList = [
        { field: 'itemCode', minWidth: 120, align: 'center', title: '物资编码' },
        { field: 'itemName', minWidth: 120, align: 'center', title: '物资名称' },
        { field: 'desclong', minWidth: 180, align: 'center', title:  '物资长描述', resizable: true},
        { field: 'assetOrgName', minWidth: 180, align: 'center', title: '资产所属机构名称' },
        { field: 'assetDeptName', minWidth: 180, align: 'center', title: '资产所属部门名称' },
    ];

    columns = [
        { field: 'itemCode', minWidth: 80, title: '物资编码', slots: { edit: 'itemCode' } },
        { field: 'itemName', minWidth: 100, title: '物资名称', slots: { edit: 'itemName' } },
        { field: 'desclong', minWidth: 100, title: '物资长描述', slots: { edit: 'desclong' } },
        { field: 'unitCode', minWidth: 100, title: '物资单位编码', slots: { edit: 'unitCode' } },
        { field: 'unitName', minWidth: 100, title: '物资单位名称', slots: { edit: 'unitName' } },
        { field: 'deployNumber', minWidth: 100, title: '借用数量', slots: { edit: 'deployNumber' } },
        { field: 'deliveryNumber', minWidth: 100, title: '出库数量', slots: { edit: 'deliveryNumber' } },
    ];

    assetDetailColumns = [
        { field: 'itemCode', minWidth: 80, title: '物资编码', slots: { edit: 'itemCode' } },
        { field: 'itemName', minWidth: 100, title: '物资名称', slots: { edit: 'itemName' } },
        { field: 'desclong', minWidth: 100, title: '物资长描述', slots: { edit: 'desclong' } },
        { field: 'unitCode', minWidth: 100, title: '物资单位编码', slots: { edit: 'unitCode' } },
        { field: 'unitName', minWidth: 100, title: '物资单位名称', slots: { edit: 'unitName' } },
        { field: 'assetsNumber', minWidth: 100, title: '当前库存数量', slots: { edit: 'assetsNumber' } },
        { field: 'deliveryNumber', minWidth: 100, title: '出库数量', slots: { edit: 'deliveryNumber' } },
    ];
}

export {
    FormModal
}
