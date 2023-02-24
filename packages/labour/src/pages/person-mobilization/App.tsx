import { RequestPaging, VxeHelper, Page, NwIcon } from '@platform/main'
import { h, ref } from 'vue'
import { NTag, NSwitch, NDatePicker } from 'naive-ui'
import { auditStatusArray, sexArray } from "../../lib/constant/Constant";
import { getPlanDetail, personMobilizationPUT } from './api/api'
import { VxeTablePropTypes } from 'vxe-table'
import { planTypeArray, yesNoArray } from "../../lib/constant/Constant";

const { bind, gridRef, filterData, query, reset, gridEvents } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      //{ type: 'checkbox', width: '50px', },
      { field: 'banName', title: '班组', showHeaderOverflow: true, showOverflow: true, width: '200px', align: 'center' },
      { field: 'suppOrgName', title: '供应商', showHeaderOverflow: true, showOverflow: true, width: '200px', align: 'center' },
      { field: 'suppUserName', title: '人员姓名', showHeaderOverflow: true, showOverflow: true, width: '200px', align: 'center' },
      {
        field: 'sex', title: '性别', showHeaderOverflow: true, showOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: "success", round: "round" } as {},
            { default: () => sexArray[row.sex] }
          )] as JSX.Element[]
        }
      },
      { field: 'outerDisciplineName', title: '岗位', showHeaderOverflow: true, showOverflow: true, width: '200px', align: 'center' },
      { field: 'postRankName', title: '专业', showHeaderOverflow: true, showOverflow: true, width: '200px', align: 'center' },
      {
        field: 'personStatus', title: '人员状态', showHeaderOverflow: true, showOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: "success", round: "round" } as {},
            {
              default: () => personStatusArray[row.personStatus]
            }
          )] as JSX.Element[]
        }
      },
      {
        field: 'isHour', title: '是否工时制', showHeaderOverflow: true, showOverflow: true, width: '200px', align: 'center', editRender: { enabled: true },
        slots: {
          edit: ({ row }: any) => [h(
            NSwitch,
            {
              onUpdateValue: _ => row.isHour = row.isHour === 1 ? 0 : 1,
            },
            {
              checked: () => yesNoArray[row.isHour],
              unchecked: () => yesNoArray[row.isHour],
            }
          )] as JSX.Element[],
          default: ({ row }: any) => yesNoArray[row.isHour]
        }
      },
      {
        field: 'approachTime', title: '进场时间', showHeaderOverflow: true, showOverflow: true, width: '200px', align: 'center', editRender: { enabled: true },
        slots: {
          edit: 'approachTime_edit',
          default: 'approachTime_view'
        },
        // slots: {
        //   edit: ({ row }: any) => [h(
        //     NDatePicker,
        //     {
        //       type: "date", valueFormat: "yyyy-MM-dd", formattedValue: row.approachTime,
        //       onUpdateFormattedValue: (value: string) => row.approachTime = value,
        //     }
        //   )] as JSX.Element[],
        //   default: ({ row }: any) => row.approachTime
        // },
      },
      {
        field: 'departureTime', title: '离场时间', showHeaderOverflow: true, showOverflow: true, width: '200px', align: 'center', editRender: { enabled: true },
        slots: {
          edit: 'departureTime_edit',
          default: 'departureTime_view'
        },
      },
      // {
      //   title: '操作', fixed:'right',showHeaderOverflow: true,align: 'center',showOverflow:true, width: '200px',
      //   slots:{
      //     default:'contaler'
      //   }
      // },
    ]
  },
  new RequestPaging(
    '/labour/personMobilization/page',
    'post'
  )
)

//人员状态
const personStatusArray = ['进场中', '已进场', '离场中', '已离场'];

let md = Page.getMenuData();

const planDetail: any = ((data) => ({
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


//是否可以勾选
const checkboxConfig = {
  checkField: 'checked',
  trigger: 'row',
  checkMethod: ({ row }) => row.approachAuditStatus === 2 && !row.departureTime && !row.departureAuditStatus
} as VxeTablePropTypes.CheckboxConfig

//新增功能参数
const approachAddParamsArry = ref([planDetail]), departureAddParamsArry = ref([planDetail]);

//选中事件(组装离场的参数信息)
const checkboxChangeEvent = () => {
  departureAddParamsArry.value = [
    {
      ...planDetail,
      departurehPersonList: gridRef.value?.getCheckboxRecords().map((row: any) => {
        const { id, ...newRow } = row
        return newRow
      })
    }
  ]
}

let messageLocal: any;
function initDialog(message: any) {
  messageLocal = message;
}

//编辑结束
const editClose = ({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }: any) => {
  if(row.departureTime != null ){
    if(!(row.departureTime >= row.approachTime)){
      messageLocal.error("离场时间不能小于进场时间");
      refresh()
    }else{
      personMobilizationPUT(row).then(data => {
        messageLocal.success("修改成功");
        refresh()
      });
    }
  }else{
    personMobilizationPUT(row).then(data => {
      messageLocal.success("修改成功");
      refresh()
    });
  }
  
 
}

const refresh = () => {
  reset(
    {
      planId: md.id //需求计划Id
    }
  )
}

const gridSearchRef = ref()

const editRowEvent = (row: any) => {
  const _grid = gridRef.value
  if (_grid) {
    _grid.setEditRow(row)
  }
}
export {
  bind, gridRef, filterData, query, refresh, reset, approachAddParamsArry, departureAddParamsArry, checkboxConfig, checkboxChangeEvent, gridSearchRef, gridEvents, editClose, initDialog,editRowEvent
}