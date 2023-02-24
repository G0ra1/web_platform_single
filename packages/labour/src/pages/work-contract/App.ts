import { RequestPaging, VxeHelper, Page, NwFunctionPredefine, NwIcon } from '@platform/main'
import { h, ref } from 'vue'
import { NTag } from 'naive-ui'
import  WorkContract  from './data/WorkContract'
import { request, Cookies } from '@platform/main'
import { getWorkContractList } from './api/index'
const contractStatus = ["", '执行中', '已关闭', '质保金'];
const { bind, gridRef, filterData, query, reset, gridEvents } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { type: 'checkbox', width: '50px', },
      {
        field: 'contractname', title: '合同名称', showHeaderOverflow: true, width: '500px', align: 'center',
        slots: {
          default: ({ row }) => {
            return h(
              "a",
              {
                href: 'javascript:void(0)',
                style: 'text-decoration: none',
                onClick: () => {
                  Page.toLevel2Menu('id', row.id, 'contractname', row.contractname, '', row, (m, r) => {
                    return r.type !== 1 && m.key === 'work-contract-sub' ? false : true;
                  })
                }
              },
              { default: () => row.contractname }
            )
          }
        }
      },
      { field: 'contractcode', title: '合同编号', showHeaderOverflow: true, width: '300px', align: 'center', },
      { field: 'organname', title: '机构', showHeaderOverflow: true, width: '200px', align: 'center' },
      {
        field: 'type', title: '合同类型', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: "success", round: "round" } as {},
            { default: () => contractTypeArray[row.type] }
          )] as JSX.Element[]
        }
      },
      {
        field: 'contractstatus', title: '状态', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            {
              size: "small", type: ['', "info", "warning", "success"][row.contractstatus], round: "round", class: "grid-ntag"
            } as {},
            {
              default: () => contractStatus[row.contractstatus],
              icon: () => h(
                NwIcon,
                {
                  name: ["icon-n-n-warning", "icon-n-n-mark", "icon-n-n-error", "icon-n-n-check_fill"][row.contractstatus]
                }
              )

            }
          )] as JSX.Element[]

        }

      },
      { field: 'contracttypename', title: '类型', showHeaderOverflow: true, width: '100px', align: 'center' },
      { field: 'ownercompanyname', title: '业主单位', showHeaderOverflow: true, width: '300px', align: 'center' },
      { field: 'signdate', title: '签订日期', showHeaderOverflow: true, width: '120px', align: 'center' },
      { field: 'startdate', title: '开始日期', showHeaderOverflow: true, width: '120px', align: 'center' },
      { field: 'finishdate', title: '完成日期', showHeaderOverflow: true, width: '120px', align: 'center' },
      { field: 'closedate', title: '关闭日期', showHeaderOverflow: true, width: '120px', align: 'center' },
      { field: 'estimateinitamount', title: '初始额(含税)', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
      { field: 'estimateinitamountnotax', title: '初始额(不含税)', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
      { field: 'changeamout', title: '变更额(含税)', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
      { field: 'changeamoutnotax', title: '变更额(不含税)', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
      { field: 'contractamount', title: '合同总额(含税)', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
      { field: 'contractamountnotax', title: '合同总额(不含税)', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
      { field: 'exectotalamount', title: '子合同/子订单累计金额(含税)', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
      { field: 'exectotalamountnotax', title: '子合同/子订单累计金额(不含税)', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
      { field: 'estimatesettlementamount', title: '预计计算成本', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
      { field: 'actualsettlementamount', title: '实际计算成本', showHeaderOverflow: true, width: '200px', align: 'right', formatter: 'myAmount' },
    ]
  },
  new RequestPaging(
    '/workcontract/page',
    'post'
  )
)

//合同类型
const contractTypeArray = ["", "框架合同", "非框架合同", "子合同", "子订单"];

//合同类型查询
let contractType = ref<string>('');
const contractTypeQuery = (e: string) => {
  contractType.value = e;
  refresh();
}

const refresh = () => {
  reset({ type: contractType })
}
const gridSearchRef = ref()


// 导出
function exportTemplate (workDtoList: any) {
  const token = Cookies.get("token");
  const tokenType = Cookies.get("tokenType");
  return fetch(
    `${window.apiBaseURL}/workcontract/work/exportExcel`,
      {
        method: "post",
        headers: new Headers({
          Authorization: `${tokenType} ${token}`,
          "Content-Type": `application/json;charset=UTF-8`,
        }),
        body: JSON.stringify(workDtoList)
      }
    )
      .then(response => response.arrayBuffer())
      .then(res => {
        const  a = document.createElement("a");
        a.style.display = "none";
        const  url = URL.createObjectURL(
          new Blob([res], {
            type:
              "application/zip;charset=UTF-8"
          })
        );
        a.href = url;
        a.download = '承包合同导出.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
        
      }).catch(e=>{
     })
}

const downloadWorkContract= ()=>{
  const WorkContractArry = new Array<WorkContract>;
  gridRef.value?.getCheckboxRecords().map((d)=>{
    const workContract = new WorkContract;
    workContract.contractname = d.contractname
    workContract.contractcode = d.contractcode
    workContract.organname =d.organname
    workContract.type = d.type
    workContract.contractstatus = d.contractstatus
    workContract.contracttypename = d.contracttypename
    workContract.ownercompanyname = d.ownercompanyname
    workContract.signdate = d.signdate
    workContract.startdate = d.startdate
    workContract.exectotalamountnotax = d.exectotalamountnotax
    workContract.finishdate = d.finishdate
    workContract.closedate = d.closedate
    workContract.estimateinitamount = d.estimateinitamount
    workContract.estimateinitamountnotax = d.estimateinitamountnotax
    workContract.changeamout = d.changeamout
    workContract.changeamoutnotax = d.changeamoutnotax
    workContract.contractamount = d.contractamount
    workContract.contractamountnotax = d.contractamountnotax
    workContract.exectotalamount = d.exectotalamount
    workContract.estimatesettlementamount = d.estimatesettlementamount
    workContract.actualsettlementamount = d.actualsettlementamount
    WorkContractArry.push(workContract)
  })
   exportTemplate(WorkContractArry)
}

let organnameOptions = ref<any>([]);
let ownercompanynameOptions = ref<any>([]);
getWorkContractList().then((d)=>{
   let organnameDisArr = d.map(d=>{return d.organname})
   let organnameArr =  Array.from(new Set(organnameDisArr))
   organnameOptions.value = organnameArr.map((d)=>{
       return {'label':d,'value':d}
   })

  let ownercompanynameDisArr = d.map(d=>{return d.ownercompanyname})
  let ownercompanynameArr =  Array.from(new Set(ownercompanynameDisArr))
  ownercompanynameOptions.value = ownercompanynameArr.map((d)=>{
      return {'label':d,'value':d}
  })
})



export {
  bind, gridRef, filterData, query, refresh, reset, contractTypeQuery, gridEvents, gridSearchRef,downloadWorkContract,organnameOptions,ownercompanynameOptions
}