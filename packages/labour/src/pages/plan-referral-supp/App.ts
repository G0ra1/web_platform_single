/*
 * @Author: zouliming 
 * @Date: 2022-10-27 18:49:41 
 * @Last Modified by:   zouliming 
 * @Last Modified time: 2022-10-27 18:49:41 
 * @Description 请假申请列表
 */


import { ref, h, nextTick } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'
import LabourPlanReferral from "./data/model/LabourPlanReferral"
import { create } from 'lodash';
import { savePlanReferralList, getPlanByPlanId, getPersionByPlan,getPositionInfo} from "./api/index";
import { LabourPlanVo, LabourPlanPersonVo } from './data/vo/LabourPlanVo';


const typeArray = ["error", "success", "info"];
const sexArray = ["未知", "男", "女"];
const sexOptions = ref([
  { label: '请选择', value: '' },
  { label: '男', value: 1 },
  { label: '女', value: 2 },
])

//数据来源枚举
let referralStatusMap = new Map();
referralStatusMap.set("none", "无");
referralStatusMap.set("not_hired", "未录用");
referralStatusMap.set("interview", "待面试");
referralStatusMap.set("stay_entrance", "待入场");
referralStatusMap.set("middle_entrance", "办理入场中");
referralStatusMap.set("successes_entrance", "已入场");
referralStatusMap.set("departure_entrance", "已离场");

const isHourArray = ["primary", "info"];
const isHourStatusArray = ["否", "是"];

/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset ,gridEvents } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { field: 'suppUserName', title: '姓名', showHeaderOverflow: true, width: '270px', align: 'center' },
      { field: 'phoneNum', title: '手机号', showHeaderOverflow: true, width: '300px', align: 'center' },
      { field: 'outerDisciplineName', title: '岗位', showHeaderOverflow: true, width: '240px', align: 'center' },
      { field: 'postRankName', title: '专业名称', showHeaderOverflow: true, width: '260px', align: 'center' },
      { field: 'idCard', title: '身份证', showHeaderOverflow: true, width: '300px', align: 'center' },
      {
        field: 'referralStatus', title: '推荐人员状态', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: "info" } as {},
            { default: () => referralStatusMap.get(row.referralStatus) }
          )] as JSX.Element[]
        }
      },
      {
        title: '性别', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: typeArray[row.sex] } as {},
            { default: () => sexArray[row.sex] }
          )] as JSX.Element[]
        }
      },
      {
        title: '是否工时制', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: isHourArray[row.isHour] } as {},
            { default: () => isHourStatusArray[row.isHour] }
          )] as JSX.Element[]
        }
      },
      //{ field: 'isHour', title: '是否工时制', showHeaderOverflow: true, width: '100px', align: 'center' },
      {
        title: '操作',
        fixed: 'right',
        showHeaderOverflow: true,
        align: 'center',
        width: '250px',
        slots: {
          default: ({ row }) => {
            // let referralPersonChange = h(
            //   NwFunctionPredefine,
            //   { code: "referral_person_change", params: [row] }
            // )
            let del = h(
                NwFunctionPredefine,
                { code: "labourSuppUserForm_del", params: [row] }
            );
            return [ del]
            // return [referralPersonChange]
          }
        },
      }
    ]
  }, new RequestPaging(
    '/labour/labourPlanReferral/getByPlanIdAndSuppId/page',
    'post'
  )
)

const majorOptions = ref<any>({})
const postRank = ref<any>({})
const majorRank = ref<any>({})
// 表格专业岗位临时
const postMajorTableTmp = ref<any>({})
const updatePostRankName = (value :any,obj :any )=>{
  postRank.value = obj;
  majorRank.value.value = "";
  postMajorTableTmp.value = {}
  if(obj.value != null && obj.value != undefined){
    getPositionInfo({planId : Page.getMenuData().id,outerDisciplineId: obj.value}).then((d:any)=>{
      majorOptions.value = d.map((d:any)=>{
        return {'label':d.postRankName,'value':d.postRankId}
      })
    })
  }
}
const updateMajor = (value :any ,obj :any)=>{
  majorRank.value = obj
}
let refeFerrals = new Array<LabourPlanReferral>();
const createReferral = async (d: any) => {
  refeFerrals = []
  d.forEach((row: any) => {
  let refeFerral = new LabourPlanReferral();
  refeFerral.planId = Page.getMenuData().id;
  if (postMajorTableTmp.value[row.idCard] != undefined){
    if(!postMajorTableTmp.value[row.idCard].outerDisciplineId){
      refeFerral.outerDisciplineId = postRank.value.value
      refeFerral.outerDisciplineName = postRank.value.label
      refeFerral.planPersonId = postRank.value.planPersonId
      refeFerral.isHour = postRank.value.isHour
      refeFerral.banId = postRank.value.banId
      refeFerral.banName =postRank.value.banName
    }else{
      refeFerral.outerDisciplineId = postMajorTableTmp.value[row.idCard].outerDisciplineId
      refeFerral.outerDisciplineName = postMajorTableTmp.value[row.idCard].outerDisciplineName
      refeFerral.planPersonId = postMajorTableTmp.value[row.idCard].planPersonId
      refeFerral.isHour = postMajorTableTmp.value[row.idCard].isHour
      refeFerral.banId = postMajorTableTmp.value[row.idCard].banId
      refeFerral.banName =  postMajorTableTmp.value[row.idCard].banName
    }

    refeFerral.postRankId = postMajorTableTmp.value[row.idCard].postRankId
    refeFerral.postRankName = postMajorTableTmp.value[row.idCard].postRankName
  }else{
    refeFerral.outerDisciplineId = postRank.value.value
    refeFerral.outerDisciplineName = postRank.value.label
    refeFerral.planPersonId = postRank.value.planPersonId
    refeFerral.isHour = postRank.value.isHour
    refeFerral.banId = postRank.value.banId
    refeFerral.banName =postRank.value.banName
    refeFerral.postRankId = majorRank.value.value
    refeFerral.postRankName = majorRank.value.label
  }
    refeFerral.suppOrgId = row.parentOrgId
    refeFerral.suppOrgCode = row.parentOrgId
    refeFerral.suppOrgName = row.parentOrgName
    refeFerral.suppUserId = row.id
    refeFerral.suppUserName = row.userNameCh
    refeFerral.idCard = row.idCard
    refeFerral.phoneNum = row.phoneNum
    refeFerral.sex = row.sex
    refeFerrals.push(refeFerral);
  });
  
  const result = await savePlanReferralList(refeFerrals);
  if (result) {
    refresh();
    getPersionByPlan({ planId: Page.getMenuData().id }).then((d: any) => {
      labourPlanPersons.value = d;
    })
  }
}

// const nameRef = ref(1)
// getPlanByPlanId(Page.getMenuData().id).then((d:any)=>{
//     labourPlanPersons.value=d.labourPlanPersonList;
// })
//获取需求计划对应的人员岗位信息
const labourPlanPersons = ref<any>([]);
const referraOptions = ref<any>([])
getPersionByPlan({ planId: Page.getMenuData().id }).then((d: any) => {
  labourPlanPersons.value = d;
  //去重 后的对象
  const ObjectDisArr:any = {};
  d.forEach((d:any)=>{
    ObjectDisArr[d.outerDisciplineId] = d 
  })
 const ObjectArr =  Object.values(ObjectDisArr)
   referraOptions.value = ObjectArr.map((d:any)=>{
    return {'label':d.outerDisciplineName, 'value':d.outerDisciplineId, 'planPersonId':d.id,'isHour':d.isHour,'banId':d.banId,'banName':d.banName}
  })
})


//按照专业查询
let outerDisciplineId = ref<string>('');
let banId = ref<string>('');
let banName = ref<string>('');
//按照专业查询
// let planPersonId = ref<string>('');
// let labourPlanPersonVo = ref<any>({});
// const disciplineQuery = (e: string) => {
//   if (e == 'all') {
//     outerDisciplineId.value = ''
//     banId.value = ''
//     banName.value = ''
//   } else {
//     planPersonId.value = e
//     //根据e（id） 获取专业信息
//     let resutPersons = labourPlanPersons.value.filter((d: any) => {
//       if (d.id == e) {
//         return d
//       }
//     })
//     labourPlanPersonVo = resutPersons[0];
//     outerDisciplineId.value = labourPlanPersonVo.outerDisciplineId;
//     banId.value = labourPlanPersonVo.banId;
//     banName.value = labourPlanPersonVo.banName;
//   }
//   refresh();
// }



let showModal = ref(false)
//
const refresh = () => {
  reset({ "planId": Page.getMenuData().id, suppOrgId: paramsSuupOrgId, outerDisciplineId: outerDisciplineId })
}

let paramsSuupOrgId = ref("");

let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
  console.log("userInfo:", d);
  paramsArray.value = [{ createUserName: d.userName, createUserParentOrgName: d.parentOrgName }];
  paramsSuupOrgId.value = d.parentDeptId;
})
const gridSearchRef = ref()
export {
  bind, gridRef, filterData, query, refresh, reset, paramsArray, showModal, createReferral, labourPlanPersons, outerDisciplineId,gridSearchRef, gridEvents,referraOptions,postRank,updatePostRankName,majorOptions,updateMajor,majorRank,postMajorTableTmp
}