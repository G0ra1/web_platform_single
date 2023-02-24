import { RequestPaging, VxeHelper, Page,NwIcon } from '@platform/main'
import { h, ref } from 'vue'
import { NTag } from 'naive-ui'
import { auditStatusArray, sexArray } from "../../lib/constant/Constant";
import { getPlanDetail } from './api/api'
import { planTypeArray, yesNoArray } from "../../lib/constant/Constant";

const { bind, gridRef, filterData, query, reset } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { field: 'planCode', title: '需求计划编号', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'planName', title: '需求计划名称', showHeaderOverflow: true, width: '200px', align: 'center', },
      {
        field: 'planType', title: '需求类别', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: "success", round: "round" } as {},
            { default: () => planTypeArray[row.planType] }
          )] as JSX.Element[]
        }
      },
      { field: 'planOrgName', title: '需求单位', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'overhaulCode', title: '大修计划编号', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'overhaulName', title: '大修计划名称', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'banName', title: '班组', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'suppOrgName', title: '供应商', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'suppUserName', title: '人员姓名', showHeaderOverflow: true, width: '200px', align: 'center' },
      {
        field: 'sex', title: '性别', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: "success", round: "round" } as {},
            { default: () => sexArray[row.sex] }
          )] as JSX.Element[]
        }
      },
      {
        field: 'isHour', title: '是否工时制', showHeaderOverflow: true, width: '200px', align: 'center',
        slots: {
          default: ({ row }: any) => [h(
            NTag,
            { size: "small", type: "success", round: "round" } as {},
            { default: () => yesNoArray[row.isHour] },
          )] as JSX.Element[]
        }
      },
      { field: 'postRankName', title: '专业', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'outerDisciplineName', title: '岗位', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'approachTime', title: '进场时间', showHeaderOverflow: true, width: '200px', align: 'center' },
      {
        field: 'auditStatus', title: '审批状态', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
              NTag,
              {
                  size: "small", type: ["warning", "info", "success", "error", ''][row.auditStatus], round: "round", class: "grid-ntag"
              } as {},
              {
                  default: () =>auditStatusArray[row.auditStatus] ,
                  icon: () => h(
                      NwIcon,
                      {
                          name: ["icon-n-n-warning", "icon-n-n-mark", "icon-n-n-check_fill", "icon-n-n-error", "icon-n-n-mark"][row.auditStatus]
                      }
                  )

              }
          )] as JSX.Element[]
        }
      }
    ]
  },
  new RequestPaging(
    '/labour/approachPlan/page',
    'post'
  )
)

let md = Page.getMenuData();





//需求计划详情
const planDetail = ((data) => ({
  planId: data.id,
  planCode: data.planNo,
  planName: data.planName,
  planType: data.planType,
  planOrgId: data.planOrgId,
  planOrgName: data.planOrgName,
  overhaulId: data.overhaulId,
  overhaulCode: data.overhaulCode,
  overhaulName: data.overhaulName,
}))(JSON.parse(Page.getMenuCache()))
const addParamsArry = ref([planDetail]);


const refresh = () => {
  reset(
    {
      planId: md.id //需求计划Id
    }
  )
}

export {
  bind, gridRef, filterData, query, refresh, reset, addParamsArry
}