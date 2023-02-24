/*
 * @Author: zouliming 
 * @Date: 2022-10-27 18:49:41 
 * @Last Modified by:   zouliming 
 * @Last Modified time: 2022-10-27 18:49:41 
 * @Description 请假申请列表
 */


import { ref, h } from 'vue'
import { RequestPaging, VxeHelper, NwFunctionPredefine, Db, Page } from '@platform/main'
import { NTag } from 'naive-ui'
import { getPlanByPlanId, getPersionByPlan } from "./api/index";

const typeArray = ["error", "success", "info"];
const sexArray = ["未知", "男", "女"];

const isHourArray = ["primary", "info"];
const isHourStatusArray = ["否", "是"];

//数据来源枚举
let referralStatusMap = new Map();
referralStatusMap.set("none", "无");
referralStatusMap.set("not_hired", "未录用");
referralStatusMap.set("interview", "待面试");
referralStatusMap.set("stay_entrance", "待入场");
referralStatusMap.set("middle_entrance", "办理入场中");
referralStatusMap.set("successes_entrance", "已入场");
referralStatusMap.set("departure_entrance", "已离场");
/**
 * 列表的请求和组装，也可以直接在页面用使用vxe-grid形式
 */
const { bind, gridRef, filterData, query, reset,gridEvents } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { field: 'suppUserName', title: '姓名', showHeaderOverflow: true, width: '160px', align: 'center' },
      {
        title: '是否工时制', showHeaderOverflow: true, width: '240px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: isHourArray[row.isHour] } as {},
            { default: () => isHourStatusArray[row.isHour] }
          )] as JSX.Element[]
        }
      },
      { field: 'phoneNum', title: '手机号', showHeaderOverflow: true, width: '240px', align: 'center' },
      { field: 'outerDisciplineName', title: '岗位', showHeaderOverflow: true, width: '240px', align: 'center' },
      { field: 'postRankName', title: '专业名称', showHeaderOverflow: true, width: '160px', align: 'center' },
      { field: 'idCard', title: '身份证', showHeaderOverflow: true, width: '240px', align: 'center' },
      {
        field: 'referralStatus', title: '推荐人员状态', showHeaderOverflow: true, width: '160px', align: 'center',
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
        title: '操作',
        fixed: 'right',
        showHeaderOverflow: true,
        align: 'center',
        width: '250px',
        slots: {
          default: ({ row }) => {
            if(row.referralStatus == 'stay_entrance' || row.referralStatus =='successes_entrance' || row.referralStatus =='departure_entrance' || row.referralStatus =='middle_entrance'){
             
              return []
            }
            if(row.referralStatus == 'interview'){
              let referralStayEntrance = h(
                NwFunctionPredefine,
                { code: "referral_stay_entrance", params: [row] }
              );
              let referralNotHired = h(
                NwFunctionPredefine,
                { code: "referral_not_hired", params: [row] }
              );
              return [referralStayEntrance, referralNotHired]
            }

            if(row.referralStatus == 'not_hired'){
              let referralInterview = h(
                NwFunctionPredefine,
                { code: "referral_interview", params: [row] }
              );
              let referralStayEntrance = h(
                NwFunctionPredefine,
                { code: "referral_stay_entrance", params: [row] }
              );
              return [referralInterview,referralStayEntrance ]
            }

            let referralInterview = h(
              NwFunctionPredefine,
              { code: "referral_interview", params: [row] }
            );
            let referralStayEntrance = h(
              NwFunctionPredefine,
              { code: "referral_stay_entrance", params: [row] }
            );
            let referralNotHired = h(
              NwFunctionPredefine,
              { code: "referral_not_hired", params: [row] }
            );
            // let del = h(
            //     NwFunctionPredefine,
            //     { code: "labourSuppUserForm_del", params: [row] }
            // );
            //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
            return [referralInterview, referralStayEntrance, referralNotHired]
          }
        },
      }
    ]
  }, new RequestPaging(
    '/labour/labourPlanReferral/getByPlanIdAndSuppId/page',
    'post'
  )
)


//获取需求计划对应的人员专业信息
const labourPlanPersons = ref<any>([]);
getPersionByPlan({ planId: Page.getMenuData().id }).then((d: any) => {
  labourPlanPersons.value = d;
})
// getPlanByPlanId(Page.getMenuData().id).then((d:any)=>{
//     labourPlanPersons.value=d.labourPlanPersonList;
// })


//按照专业查询
let outerDisciplineId = ref<string>('');
let labourPlanPersonVo = ref<any>({});
const disciplineQuery = (e: string) => {
  if (e == 'all') {
    outerDisciplineId.value = ''
  } else {
    //根据e（id） 获取专业信息
    let resutPersons = labourPlanPersons.value.filter((d: any) => {
      if (d.id == e) {
        return d
      }
    })
    labourPlanPersonVo = resutPersons[0];
    outerDisciplineId.value = labourPlanPersonVo.outerDisciplineId;
  }
  refresh();
}


const refresh = () => {
  reset({ "planId": Page.getMenuData().id, suppOrgId: suppOrgVal.value, outerDisciplineId: outerDisciplineId })
}

const suppOrgVal = ref("");


let paramsArray = ref([{}]);
Db.get('userInfo').then((d: any) => {
  console.log("userInfo:", d);
  paramsArray.value = [{ createUserName: d.userName, createUserParentOrgName: d.parentOrgName }];
})
const gridSearchRef = ref()
export {
  bind, gridRef, filterData, query, refresh, reset, paramsArray, suppOrgVal, outerDisciplineId, disciplineQuery, labourPlanPersons,gridSearchRef, gridEvents
}