/**
 * @Description 工单信息
 * @author 云数网讯 Panfakun@netwisd.com
 * @date 2022-12-06 15:21:00
 */

import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db } from '@platform/main'
import { NTag } from 'naive-ui'
import { getlabourWorkOrderInfoList } from './api/index'

/**
 * 初始化弹出框组件
 */
let dialogLocal: any;
function initDialog(dialog: any) {
    dialogLocal = dialog;
}

//数据来源枚举
let sourceMap = new Map();
sourceMap.set("self_build", "自建");
sourceMap.set("cnijx_contract", "商法系统");
sourceMap.set("cnijx_portal", "人力管理系统");
sourceMap.set("cnijx_ems", "工时系统");



//  数据是否编辑 
const editDataTpye = ["primary", "info"];
const yesNoArray = ["否", "是"];
//   开启，关闭
const onOffArray = ["开启", "关闭"];

//Adding an Import 新增导入

//-- 例子看完删除它
//const typeArray = ["primary", "info"];
//const statusArray = [ "启用" , "停用"];
/*const statusOptions = ref([
    { label: '请选择', value: '' },
    { label: '启用', value: 1 },
    { label: '停用', value: 3 },
])*/
/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
    {
        columns: [
            { field: 'orgname', title: '所属单位', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'produceUnit', title: '生产单元', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'factNumber', title: '实际工作票', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workNumber', title: '工单号', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'deviceAdress', title: '设备位置', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workContent', title: '工作内容', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'remark', title: '备注', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'dxCount', title: '大修轮次', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workPerson', title: '工作负责人', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'hourType', title: '工时类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'unstandardHour', title: '非标准工时', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'standardHour', title: '标准工时', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'standardCode', title: '标准工时编码', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'ratifyHour', title: '核定工时', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'checkPerson', title: '核定人', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'addHourQuantity', title: '追加工时数量', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'allotHour', title: '分配工时数', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'roomNumber', title: '房间号', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'deviceNormsNumber', title: '设备规格型号', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'ext10', title: '技能专业', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'major', title: '专业', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workNature', title: '工作性质', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workType', title: '工作类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workCategory', title: '工作类别', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planBeginDate', title: '计划开始日期', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'planEndDate', title: '计划结束日期', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'confirmor', title: '开工确认人', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'confirmorId', title: '开工确认人ID', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'confirmTime', title: '开工确认时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'downLinkStatus', title: '下发审批状态', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'downLink', title: '下发审批环节', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'executor', title: '执行人', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'workNumberStatus', title: '工单状态', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'breakWriteStatus', title: '回填审批状态', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'breakWriteLink', title: '回填审批环节', showHeaderOverflow: true, width: '160px', align: 'center' },
            {
                field: 'isCountStatus', title: '结算状态', showHeaderOverflow: true, width: '160px', align: 'center',
                slots: {
                    default: ({ row }) => [h(
                        NTag,
                        { size: "small", type: editDataTpye[row.isCountStatus] } as {},
                        { default: () => yesNoArray[row.isCountStatus] }
                    )] as JSX.Element[]
                }
            },
            { field: 'breakStatus', title: '回填工时状态', showHeaderOverflow: true, width: '160px', align: 'center' },
            { field: 'breakCreateTime', title: '回填工时创建时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'projectname', title: '项目名称', showHeaderOverflow: true, width: '160px', align: 'center' },


            // { field: 'projectType', title: '项目类型', showHeaderOverflow: true, width: '160px', align: 'center' },




            // { field: 'factBeginDate', title: '实际开始日期', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'faceEndDate', title: '实际结束日期', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'archivesNumber', title: '存档流水号', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'vocationalWork', title: '中高端业务', showHeaderOverflow: true, width: '160px', align: 'center' },




            // { field: 'jgCode', title: '技改编号', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'entrustNumber', title: '委托单号', showHeaderOverflow: true, width: '160px', align: 'center' },

            // { field: 'entrustDay', title: '委托工日', showHeaderOverflow: true, width: '160px', align: 'center' },

            // { field: 'newWorkPerson', title: '新工作负责人', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'loadManGrade', title: '工作负载人等级', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'isStandard', title: '是否标准工时', showHeaderOverflow: true, width: '160px', align: 'center' },




            // { field: 'breakWriteDate', title: '回填录入日期', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'breakWriteMan', title: '回填录入人', showHeaderOverflow: true, width: '160px', align: 'center' },




            // { field: 'showNumber', title: '表示号', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'nowDownTotal', title: '目前累计下发工时数', showHeaderOverflow: true, width: '160px', align: 'center' },

            // { field: 'hourCountMonth', title: '工时结算月份', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'totalHour', title: '总工时数量', showHeaderOverflow: true, width: '160px', align: 'center' },

            // { field: 'unit', title: '单元', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'unitGroup', title: '机组', showHeaderOverflow: true, width: '160px', align: 'center' },
            
            // { field: 'isDelete', title: '是否删除', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'relevance', title: '关联表', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'breakSureDate', title: '回填确定时间', showHeaderOverflow: true, width: '160px', align: 'center' },

            // { field: 'phaseNumber', title: '阶段号', showHeaderOverflow: true, width: '160px', align: 'center' },


            // { field: 'sublistProject', title: '子合同/项目', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'sumRatifyHour', title: '总核定工时', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'downTime', title: '下发时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            // {
            //     field: 'mainorderCloseStatus', title: '总单关闭状态', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: editDataTpye[row.mainorderCloseStatus] } as {},
            //             { default: () => onOffArray[row.mainorderCloseStatus] }
            //         )] as JSX.Element[]
            //     }
            // },

           

            // { field: 'ratifyTime', title: '工单核定后时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            // {
            //     field: 'isHold', title: '是否已校验', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: editDataTpye[row.isHold] } as {},
            //             { default: () => yesNoArray[row.isHold] }
            //         )] as JSX.Element[]
            //     }
            // },
            // {
            //     field: 'isUpload', title: '是否导入工单', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: editDataTpye[row.addImportArray] } as {},
            //             { default: () => yesNoArray[row.addImportArray] }
            //         )] as JSX.Element[]
            //     }
            // },
            // { field: 'isOverTime', title: '是否超时', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'newDeviceAddress', title: '处理后的功能位置', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'esWorkcontent', title: '数据清理后的工作内容', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'lastUpdateTime', title: '最后进行数据清理的时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'isMatching', title: '是否样本', showHeaderOverflow: true, width: '160px', align: 'center' },
            // {
            //     field: 'isValid', title: '是否正确', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: editDataTpye[row.isValid] } as {},
            //             { default: () => yesNoArray[row.isValid] }
            //         )] as JSX.Element[]
            //     }
            // },

            // { field: 'minWorkPerson', title: '最少作业人数', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'mainIsolation', title: '主隔离', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'keyWord', title: '关键词', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'checkType', title: '检查类型', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'skillItem', title: '技能项', showHeaderOverflow: true, width: '160px', align: 'center' },
            // {
            //     field: 'source', title: '数据来源', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: "info" } as {},
            //             { default: () => sourceMap.get(row.source) }
            //         )] as JSX.Element[]
            //     }
            // },
            // { field: 'synctime', title: '同步时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'skillMainContent', title: '技能主要内容', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'es', title: '智能匹配精确度结果', showHeaderOverflow: true, width: '160px', align: 'center' },
            // {
            //     field: 'isDevice', title: '是否是设备', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: editDataTpye[row.isDevice] } as {},
            //             { default: () => yesNoArray[row.isDevice] }
            //         )] as JSX.Element[]
            //     }
            // },
            // { field: 'skillCode', title: '技能代码', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'skillSonCode', title: '技能子代码', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'distributeType', title: '分配类型', showHeaderOverflow: true, width: '160px', align: 'center' },

            // { field: 'startWorkDate', title: '开工时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'inviteDate', title: '邀请时间', showHeaderOverflow: true, width: '160px', align: 'center' },
            // {
            //     field: 'isMerge', title: '是否合并', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: editDataTpye[row.isMerge] } as {},
            //             { default: () => yesNoArray[row.isMerge] }
            //         )] as JSX.Element[]
            //     }
            // },
            // {
            //     field: 'isMain', title: '主辅标记', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: editDataTpye[row.isMain] } as {},
            //             { default: () => yesNoArray[row.isMain] }
            //         )] as JSX.Element[]
            //     }
            // },
            // { field: 'prcent', title: '匹配百分比', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'adjustProcessStatus', title: '调整流程状态', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'adjustCurrentLink', title: '调整流程当前环节', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'adjustCurrentApproCode', title: '调整流程当前审批人编码', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'adjustCurrentApprover', title: '调整流程当前审批人', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'isStandardNorm', title: '是否有标准，存放标准的个数', showHeaderOverflow: true, width: '160px', align: 'center' },
            // {
            //     field: 'isStandardOne', title: '每个标准的个数是否为1', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: editDataTpye[row.isStandardOne] } as {},
                        
            //             { default: () => yesNoArray[row.isStandardOne] }
            //         )] as JSX.Element[]
            //     }
            // },
            // { field: 'dxcountIsRepeat', title: '同设备同专业同大修轮次无重复工单', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'minPersonIsnull', title: '最小作业人数是否为空', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'workChargePerson', title: '工作负责人个数', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'workGuardPerson', title: '工作监护人个数', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'eqMajorDeviceNum', title: '同专业同设备上下浮动7天无同期工单', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'mainHourCode', title: '主工时代码', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'allocatedLeaderNum', title: '已分配负责人数', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'allocatedWorkerNum', title: '已分配技术工人数', showHeaderOverflow: true, width: '160px', align: 'center' },
            // { field: 'allocatedPersonNum', title: '已分配总人数', showHeaderOverflow: true, width: '160px', align: 'center' },
            // {
            //     field: 'isPolling', title: '是否轮询', showHeaderOverflow: true, width: '160px', align: 'center',
            //     slots: {
            //         default: ({ row }) => [h(
            //             NTag,
            //             { size: "small", type: editDataTpye[row.isPolling] } as {},
            //             { default: () => yesNoArray[row.isPolling] }
            //         )] as JSX.Element[]
            //     }
            // },
           
        ]
    }, new RequestPaging(
        '/labour/labourWorkOrderInfo/page',
        'post'
    )
)

const refresh = () => {
    reset({})
}

// 所属单位  选项 orgnameOptions
let orgnameOptions = ref<any>([]);
//专业 选项 majorOptions
let majorOptions = ref<any>([]);
//技能专业 选项 ext10Options
let ext10Options = ref<any>([]);
// 下发审批状态  选项 downLinkStatusOptions
let downLinkStatusOptions = ref<any>([]);
// 回填审批状态 选项   breakWriteStatusOptions
let breakWriteStatusOptions = ref<any>([]);
// 大修轮次 选项 dxCountOptions
let dxCountOptions = ref<any>([]);
// 工作性质 选项 workNatureOptions
let workNatureOptions = ref<any>([]);

getlabourWorkOrderInfoList().then((d)=>{
    //所属单位
    let orgnameDisArr = d.map((d:any)=>{return d.orgname})
    let orgnameArr =  Array.from(new Set(orgnameDisArr))
    orgnameOptions.value = orgnameArr.map((d)=>{
        return {'label':d,'value':d}
    })
     //专业
     let majorDisArr = d.map((d:any)=>{return d.major})
     let majorArr =  Array.from(new Set(majorDisArr))
     majorOptions.value = majorArr.map((d)=>{
         return {'label':d,'value':d}
     })
      //专业
      let ext10DisArr = d.map((d:any)=>{return d.ext10})
      let ext10Arr =  Array.from(new Set(ext10DisArr))
      ext10Options.value = ext10Arr.map((d)=>{
          return {'label':d,'value':d}
      })
      //下发审批状态 downLinkStatusOptions
      let downLinkStatusDisArr = d.map((d:any)=>{return d.downLinkStatus})
      let downLinkStatusArr =  Array.from(new Set(downLinkStatusDisArr))
      downLinkStatusOptions.value = downLinkStatusArr.map((d)=>{
          return {'label':d,'value':d}
      })
      //回填审批状态 downLinkStatusOptions
      let breakWriteStatusDisArr = d.map((d:any)=>{return d.breakWriteStatus})
      let breakWriteStatusArr =  Array.from(new Set(breakWriteStatusDisArr))
      breakWriteStatusOptions.value = breakWriteStatusArr.map((d)=>{
          return {'label':d,'value':d}
      })
       //大修轮次 dxCountOptions
       let dxCountDisArr = d.map((d:any)=>{return d.dxCount})
       let dxCountArr =  Array.from(new Set(dxCountDisArr))
       dxCountOptions.value = dxCountArr.map((d)=>{
           return {'label':d,'value':d}
       })
       //工作性质 dxCountOptions
       let workNatureDisArr = d.map((d:any)=>{return d.workNature})
       let workNatureArr =  Array.from(new Set(workNatureDisArr))
       workNatureOptions.value = workNatureArr.map((d)=>{
           return {'label':d,'value':d}
       })
})


/**
 * 传递用户参数例子
 */
let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
    paramsArray.value = [{ createUserName: d.userName }];
})

export {
    bind, gridRef, filterData, query, refresh, reset, paramsArray, initDialog,orgnameOptions,majorOptions,ext10Options,downLinkStatusOptions,breakWriteStatusOptions,dxCountOptions,workNatureOptions,
}