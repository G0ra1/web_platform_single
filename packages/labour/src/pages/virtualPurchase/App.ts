/**
 * @Description 虚拟订单
 * @author 云数网讯 XHL@netwisd.com
 * @date 2022-11-22 16:32:32
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db,Page } from '@platform/main'
import { NTag } from 'naive-ui'
import { updateVirtualOrder } from "./api/index"
import Purchase from './data/model/Purchase'
import { nth } from 'lodash'


/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

//-- 例子看完删除它
//const typeArray = ["primary", "info"];
//const statusArray = [ "启用" , "停用"];
/*const statusOptions = ref([
    { label: '请选择', value: '' },
    { label: '启用', value: 1 },
    { label: '停用', value: 3 },
])*/

//数据来源枚举
let sourceMap = new Map();
sourceMap.set("1", "线上");
sourceMap.set("2", "线下");

//采购类型枚举
let purchaseTypeMap = new Map();
purchaseTypeMap.set("1", "物资");
purchaseTypeMap.set("2", "工程");
purchaseTypeMap.set("3", "服务");


//采购子类型
let purchaseSubTypeMap = new Map();
purchaseSubTypeMap.set("1", "框架合同");
purchaseSubTypeMap.set("2", "常规合同");
purchaseSubTypeMap.set("3", "项下订单");

//  数据是否编辑 
const editDataTpye = ["primary", "info"];
const editDataStatus = ["否", "是"];



/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset, gridEvents } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { field: 'planName', title: '需求计划名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'virtualPurchaseName', title: '订单名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'contractcode', title: '合同编号', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => {
                        return h(
                            "a",
                            {
                                href: 'javascript:void(0)',
                                style: 'text-decoration: none',
                                onClick: () => {
                                    //第一个业务需要的字段。第二个显示的中文名称。
                                    //Page.toLevel2Menu('id', row.id, 'virtualPurchaseName', row.virtualPurchaseName, '', row)
                                }
                            },
                            { default: () => row.contractcode }
                        )
                    }
                } 
            },
            { field: 'purchaseunit', title: '采购单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'contractname', title: '合同名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'purchasesubtype', title: '合同类型', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: "success" } as {},
                        { default: () => purchaseSubTypeMap.get(row.purchasesubtype) }
                    )] as JSX.Element[]
                }
            },
            { field: 'contractstatusname', title: '合同状态', showHeaderOverflow: true, width: '160px', align: 'center' },
            { 
                field: 'purchasetype', title: '采购类型', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => {
                      let text = "";
                      if (row.purchasetype == 1) {
                        text = "物资采购"
                      } else if (row.purchasetype == 2) {
                        text = "工程采购"
                      } else if (row.purchasetype == 3) {
                        text = "服务采购"
                      } else {
                        text = row.purchasetype;
                      }
                      return [
                        text
                      ]
                    }
                  }
            },
            // { field: 'virtualPurchaseCode', title: '虚拟订单code', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'contractPurchaseId', title: '关联采购合同id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'initamount', title: '合同初始金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'changeamout', title: '变更金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'contractamount', title: '合同总额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'exectotalamount', title: '订单执行总额含税', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'requirementunit', title: '需求单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'partaname', title: '甲方单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'partbname', title: '乙方单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'signdate', title: '签订时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'purchasemethodname', title: '采购方式', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'projecttypename', title: '项目类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'organ', title: '单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'isLinkPurchase', title: '是否关联采购合同', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: editDataTpye[row.isSettlement] } as {},
                        { default: () => editDataStatus[row.ableedit] }
                    )] as JSX.Element[]
                }
            },
            { field: 'remark', title: '备注', showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'isvalidate', title: '删除标记', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: editDataTpye[row.isvalidate] } as {},
                        { default: () => editDataStatus[row.isvalidate] }
                    )] as JSX.Element[]
                }
            },
            {
                field: 'ableedit', title: '数据是否允许编辑', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: editDataTpye[row.ableedit] } as {},
                        { default: () => editDataStatus[row.ableedit] }
                    )] as JSX.Element[]
                }
            },
            { field: 'purchaseformname', title: '采购形式', showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'isSettlement', title: "是否结算", showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: editDataTpye[row.isSettlement] } as {},
                        { default: () => editDataStatus[row.ableedit] }
                    )] as JSX.Element[]
                }
            },
            { field: 'paycontracttype', title: '付款合同合同类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'datatype', title: '数据类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'datascope', title: '数据范围', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'framecode', title: '框架编号', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'alreadypayamount', title: '已支付金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'finalamount', title: '最终金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'estimateexecamount', title: '预计履约执行金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'actualexecamount', title: '实际履约执行金额', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'requirementunitid', title: '需求部门Id', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'purchaseunitid', title: '采购单位Id', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'purchasemethod', title: '采购方式;字典编码zhjx_pcpmethod', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'purchaseform', title: '采购形式;字典编码zhjx_pcpform', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'contractstatus', title: '合同状态;字典编码zhjx_contractstatus', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'projecttype', title: '项目类型;字典编码zhjx_pctype', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'closedate', title: '合同关闭时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'projectname', title: '项目名称;字典编码zhjx_purchasename', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'workcontractid', title: '关联承包合同id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workcontractname', title: '关联承包合同名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workcontractcode', title: '承包合同编号', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'agreenebtcide', title: 'agreenebtcide', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'organname', title: '机构名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'childorgan', title: '部门Id', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'childorganname', title: '部门名称', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'ledgerid', title: '台账Id', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'attachmentid1', title: 'attachmentid1', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'targetcost', title: '目标成本', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'qualityscore', title: '质量得分', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'organizescore', title: '供应/施工/组织得分', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'supportscore', title: '支持配合得分', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'sumscore', title: '合计得分', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'contractid', title: '框架合同id', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'attachmentid2', title: 'attachmentid2', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'needtypename', title: '需求类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'needtype', title: '需求类型;字典编码zhjx_needtype', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'needsubtypename', title: '需求子类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'needsubtype', title: '需求子类型;字典编码zhjx_needsubtype', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'agreementcode', title: '协议编码', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'transittime', title: '审批通过时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'centralbuying', title: 'centralbuying', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'iscontract', title: 'iscontract', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'paycontractunit', title: '付款合同实施单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'validdate', title: '合同有效时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            /*例子看完删除它{
                title: '是否启用', showHeaderOverflow: true, width: '100px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: typeArray[row.status] } as {},
                        { default: () => statusArray[row.status] }
                    )] as JSX.Element[]
                }
            },*/
            {
                title: '操作',
                fixed:  'right',
                showHeaderOverflow: true,
                align: 'center',
                width: '350px',
                slots: {
                    default: 'contaler'
                    // default: ({ row }) => {
                    //     let edit = h({}
                    //     //     <NwPickAny
                    //     // rowKey="contractcode"
                    //     // button-label="选择承包合同"
                    //     // modal-title="选择承包合同"
                    //     // :value="
                    //     // (dataModel.labourPlanContractWorkList || []).map((d) => ({
                    //     //     id: d.workContractId,
                    //     //     contractcode: d.workContractCode,
                    //     //     contractname: d.workContractName,
                    //     // }))
                    //     // "
                    //     // @update:value="(d) => {dataModel.labourPlanContractWorkList = d.map((m: any) => ({ workContractCode: m.contractcode, workContractName: m.contractname, workContractId:m.id }))}"
                    //     // :gridColumns="[
                    //     // { field: 'contractcode', title: '合同编码' },
                    //     // { field: 'contractname', title: '合同名称' },
                    //     // ]"
                    //     // requestUrl="/workcontract/page"
                    //     // :requestParam="{
                    //     // //appCode: dataModel.labourPlanContractWorkList,
                    //     // }"
                    //     );
                    //     let del = h(
                    //         NwFunctionPredefine,
                    //         { code: "ewqrewr", params: [row] }
                    //     );
                    //     //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                    //     return [ del]
                    // }
                },
            }
        ]
    }, new RequestPaging(
        '/labour/labourVirtualPurchase/page',
        'post'
    )
)
Page.getMenuData().id
const createReferral = async (c: any, d: any) => {
    let refePurchase = new Purchase();
    refePurchase.id = d.id
    refePurchase.datatype = d.datatype
    refePurchase.datascope = d.datascope
    refePurchase.framecode = d.framecode
    refePurchase.contractcode = d.contractcode
    refePurchase.initamount = d.initamount
    refePurchase.alreadypayamount = d.alreadypayamount
    refePurchase.finalamount = d.finalamount
    refePurchase.changeamout = d.changeamout
    refePurchase.contractamount = d.contractamount
    refePurchase.exectotalamount = d.exectotalamount
    refePurchase.estimateexecamount = d.estimateexecamount
    refePurchase.actualexecamount = d.actualexecamount
    refePurchase.requirementunitid = d.requirementunitid
    refePurchase.requirementunit = d.requirementunit
    refePurchase.partaname = d.partaname
    refePurchase.partbname = d.partbname
    refePurchase.signdate = d.signdate
    refePurchase.purchaseunitid = d.purchaseunitid
    refePurchase.purchaseunit = d.purchaseunit
    refePurchase.purchasemethodname = d.purchasemethodname
    refePurchase.purchasemethod = d.purchasemethod
    refePurchase.purchaseformname = d.purchaseformname
    refePurchase.purchaseform = d.purchaseform
    refePurchase.contractstatusname = d.contractstatusname
    refePurchase.contractstatus = d.contractstatus
    refePurchase.projecttypename = d.projecttypename
    refePurchase.projecttype = d.projecttype
    refePurchase.contractname = d.contractname
    refePurchase.closedate = d.closedate
    refePurchase.projectname = d.projectname
    refePurchase.workcontractid = d.workcontractid
    refePurchase.workcontractname = d.workcontractname
    refePurchase.workcontractcode = d.workcontractcode
    refePurchase.datasource = d.datasource
    refePurchase.agreenebtcide = d.agreenebtcide
    refePurchase.organ = d.organ
    refePurchase.organname = d.organname
    refePurchase.childorgan = d.childorgan
    refePurchase.childorganname = d.childorganname
    refePurchase.ledgerid = d.ledgerid
    refePurchase.purchasetype = d.purchasetype
    refePurchase.purchasesubtype = d.purchasesubtype
    refePurchase.remark = d.remark
    refePurchase.attachmentid1 = d.attachmentid1
    refePurchase.isvalidate = d.isvalidate
    refePurchase.ableedit = d.ableedit
    refePurchase.targetcost = d.targetcost
    refePurchase.qualityscore = d.qualityscore
    refePurchase.organizescore = d.organizescore
    refePurchase.supportscore = d.supportscore
    refePurchase.sumscore = d.sumscore
    refePurchase.contractid = d.contractid
    refePurchase.attachmentid2 = d.attachmentid2
    refePurchase.needtypename = d.needtypename
    refePurchase.needtype = d.needtype
    refePurchase.needsubtypename = d.needsubtypename
    refePurchase.needsubtype = d.needsubtype
    refePurchase.agreementcode = d.agreementcode
    refePurchase.transittime = d.transittime
    refePurchase.centralbuying = d.centralbuying
    refePurchase.iscontract = d.iscontract
    refePurchase.paycontracttype = d.paycontracttype
    refePurchase.paycontractunit = d.paycontractunit
    refePurchase.validdate = d.validdate
    refePurchase.virtualPurchaseId = c
    const result = await updateVirtualOrder(refePurchase);
    if (result) {
        refresh();
    }
}

const refresh = () => {
    reset({planId: Page.getMenuData().id})
}

/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})

const  showDelModal = ref<boolean>(false);
//确认事件
const  virtualPurchaseid = ref([{}]);
const  purchaseContract  = ref([{}])

const onPositiveClick = () =>{
    createReferral(virtualPurchaseid.value,purchaseContract.value)
}

const onNegativeClick = ()=>{

}



export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,showDelModal,onPositiveClick,onNegativeClick,virtualPurchaseid,purchaseContract,gridEvents
}