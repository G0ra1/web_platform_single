import { RequestPaging, VxeHelper, Page, NwFunctionPredefine ,NwIcon} from '@platform/main'
import { h, ref } from 'vue'
import { NTag,NPopover } from 'naive-ui'
import  Purchase  from './data/Purchase'
import {  Cookies } from '@platform/main'
import { getPurchaseContractList }  from './api/index'


const contractStatus = ["", '执行中', '已关闭', '质保金'];
const datastatusArray=["未完善","部分完善","已完善"];
const datastatsOpention = ref([
  //{ label: '', value: '' },
  { label: '未完善', value: 0 },
  { label: '部分完善', value: 1 },
  { label: '已完善', value: 2 },
])
const { bind, gridRef, filterData, query, reset ,gridEvents} = new VxeHelper.VxeGridPaging(
  {
    columns: [
      { type: 'checkbox', width: '50px', },
      {
        field: 'contractname', title: '合同名称', showHeaderOverflow: true, width: '300px', align: 'center',
        slots: {
          default: ({ row }) => {
            return h(
              "a",
              {
                href: 'javascript:void(0)',
                style: 'text-decoration: none',
                onClick: () => {
                  Page.toLevel2Menu('id', row.id, 'contractname', row.contractname,  JSON.stringify({contractid:row.id,contractcode:row.contractcode,contractname:row.contractname,contractamount:row.contractamount,partaname:row.partaname}),row, (m, r) => {
                    if (r.purchasesubtype !== "1" && m.key === 'purchaseContractSub') {//子合同菜单
                      return false;
                    } else if (r.purchasesubtype === "1" && m.key === 'purchase-price') {//单价管理菜单
                      return false;
                    } else {
                      return true;
                    }
                  })
                }
              },
              { default: () => row.contractname }
            )
          }
        }
      },
      { field: 'contractcode', title: '合同编号', showHeaderOverflow: true, width: '500px', align: 'center' },
      { field: 'purchaseunit', title: '采购单位', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'partaname', title: '甲方', showHeaderOverflow: true, width: '500px', align: 'center' },
      { field: 'partbname', title: '乙方', showHeaderOverflow: true, width: '200px', align: 'center' },

      {
        field: 'purchasesubtype', title: '合同类型', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            { size: "small", type: "success", round: "round" } as {},
            { default: () => contractTypeArray[row.purchasesubtype] }
          )] as JSX.Element[]
        }
      },
      { field: 'contractstatus', title: '合同状态', showHeaderOverflow: true, width: '100px', align: 'center' ,
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
      {
        field: 'purchasetype', title: '采购类型', showHeaderOverflow: true, width: '100px', align: 'center',
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
      {
        field: 'datastatus', title: '数据完善状态', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
            NTag,
            {
                size: "small", type: ["warning", "info", "success",  ''][row.datastatus], round: "round", class: "grid-ntag"
            } as {},
            {
                default: () => datastatusArray[row.datastatus],
                icon: () => h(
                    NwIcon,
                    {
                        name: ["icon-n-n-error", "icon-n-n-mark",  "icon-n-n-check_fill","icon-n-n-warning", ][row.datastatus]
                    }
                )

            }
        )] as JSX.Element[]
          // default: ({ row }) => {
          //   let text = "";
          //   if (row.datastatus == 0) {
          //     text = "未完善"
          //   } else if (row.datastatus == 1) {
          //     text = "部分完善"
          //   } else if (row.datastatus == 2) {
          //     text = "已完善"
          //   }
          //   return [
          //     text
          //   ]
          // }

        }
      },
      { field: 'initamount', title: '初始额', showHeaderOverflow: true, width: '200px', align: 'center',formatter: 'myAmount' },
      { field: 'changeamout', title: '变更额', showHeaderOverflow: true, width: '200px', align: 'center' ,formatter: 'myAmount'},
      { field: 'contractamount', title: '合同总额', showHeaderOverflow: true, width: '200px', align: 'center',formatter: 'myAmount' },
      { field: 'estimateexecamount', title: '预计履约执行金额', showHeaderOverflow: true, width: '200px', align: 'center',formatter: 'myAmount' },
      { field: 'actualexecamount', title: '实际履约执行金额', showHeaderOverflow: true, width: '200px', align: 'center' ,formatter: 'myAmount'},
      { field: 'purchaseExtendVo.taxrateName', title: '税率', showHeaderOverflow: true, width: '160px', align: 'center' },
      { field: 'purchaseExtendVo.invoiceTypeName', title: '发票类型', showHeaderOverflow: true, width: '160px', align: 'center' },
      { field: 'purchaseExtendVo.workHourAmount', title: '工时时薪', showHeaderOverflow: true, width: '160px', align: 'center',formatter: 'myAmount' },
      { field: 'purchaseExtendVo.overtimeHourAmount', title: '加班时薪', showHeaderOverflow: true, width: '160px', align: 'center',formatter: 'myAmount' },
      { field: 'purchaseExtendVo.workdayOvertimeCoefficient', title: '工作日加班倍数', showHeaderOverflow: true, width: '160px', align: 'center' },
      { field: 'purchaseExtendVo.dayOffOvertimeCoefficient', title: '休息日加班倍数', showHeaderOverflow: true, width: '160px', align: 'center' },
      { field: 'purchaseExtendVo.legalDayOffOvertimeCoefficient', title: '法定休假日加班倍数', showHeaderOverflow: true, width: '160px', align: 'center' },
      //{  field: 'initamount', title: '审批状态', showHeaderOverflow: true, width: '200px', align: 'center'},
      {
        field: 'action',
        fixed: 'right',
        title: '操作',
        showHeaderOverflow: true,
        align: 'center',
        width: '200px',
        slots: {
          default: ({ row }) => {
            let PurchaseInfo = h(
              NwFunctionPredefine,
              { code: "purchaseInfoFormInfo", params: [row] }
            );
            //发票类型
            let state = row.purchaseExtendVo.auditStatus == 1;
            if (row.purchasesubtype == "1") {

            } else {
              let puchaseExtend = h('div', { title: state ? "合同正在维护中" : "" }, h(
                NwFunctionPredefine,
                { code: "purchaseExtendFormExtend", params: [{ id: row.id, contractcode: row.contractcode, contractname: row.contractname, contractId: row.id ,partaname:row.partaname}], disabled: state, }
              ))
              return [PurchaseInfo, puchaseExtend]
            }
            //return row.camundaProcinsId !== "" ? [edit] : [edit, del] row.id,row.contractcode,row.contractname
            return [PurchaseInfo]
          }
        },
      }
    ]
  },
  new RequestPaging(
    '/purchasecontract/purchase/contract/page',
    'post'
  )
)

//合同类型
const contractTypeArray = ["", "框架合同", "常规合同", "项下订单"];
//采购类型物资2工程3服务
//const contractPurchaseTypeArray=["","物资","工程","服务"];

//合同类型查询
let contractType = ref<string>('');
const contractTypeQuery = (e: string) => {
  contractType.value = e;
  refresh();
}

const refresh = () => {
  filterData.value={datastatus:''};
  reset({ purchasesubtype: contractType,datastatus:'' })
}

// 导出
function exportTemplate (purchaseModelList: any) {
  const token = Cookies.get("token");
  const tokenType = Cookies.get("tokenType");
  return fetch(
    `${window.apiBaseURL}/purchasecontract/purchase/contract/exportExcel`,
      {
        method: "post",
        headers: new Headers({
          Authorization: `${tokenType} ${token}`,
          "Content-Type": `application/json;charset=UTF-8`,
        }),
        body: JSON.stringify(purchaseModelList)
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
        a.download = '采购合同导出.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); 
        document.body.removeChild(a);
        
      }).catch(e=>{
     })
}




const downloadPurchase= ()=>{
  const purchaseArry =  new Array<Purchase>;
  gridRef.value?.getCheckboxRecords().map((row)=>{
    const purchase = new Purchase;
    purchase.contractname= row.contractname
    purchase.contractcode = row.contractcode
    purchase.purchasesubtype = row.purchasesubtype
    purchase.contractstatus = row.contractstatus
    purchase.purchasetype = row.purchasetype
    purchase.datastatus = row.datastatus
    purchase.initamount = row.initamount
    purchase.changeamout = row.changeamout
    purchase.contractamount = row.contractamount
    purchase.estimateexecamount = row.estimateexecamount
    purchase.actualexecamount = row.actualexecamount
    purchase.purchaseunit = row.purchaseunit
    purchase.taxrateName = row.purchaseExtendVo.taxrateName
    purchase.invoiceTypeName = row.purchaseExtendVo.invoiceTypeName
    purchase.workHourAmount = row.purchaseExtendVo.workHourAmount
    purchase.overtimeHourAmount = row.purchaseExtendVo.overtimeHourAmount
    purchase.workdayOvertimeCoefficient = row.purchaseExtendVo.workdayOvertimeCoefficient
    purchase.dayOffOvertimeCoefficient = row.purchaseExtendVo.dayOffOvertimeCoefficient
    purchase.legalDayOffOvertimeCoefficient = row.purchaseExtendVo.legalDayOffOvertimeCoefficient
    purchaseArry.push(purchase)
  })
  exportTemplate( purchaseArry)
}
let partanameOptions = ref<any>([]);
let partbnameOptions = ref<any>([]);

getPurchaseContractList().then((d:any)=>{
     let partanameDisArr = d.map((d:any)=>{return d.partaname})
     let partanameArr =  Array.from(new Set(partanameDisArr))
     partanameArr.unshift('')
     partanameOptions.value = partanameArr.map((d)=>{
         return {'label':d,'value':d}
     })
    let partbnameDisArr = d.map((d:any)=>{return d.partbname})
    let partbnameArr =  Array.from(new Set(partbnameDisArr))
    partbnameArr.unshift('')
    partbnameOptions.value = partbnameArr.map((d)=>{
        return {'label':d,'value':d}
    })
})


const gridSearchRef = ref()
export {
  bind, gridRef, filterData, query, refresh, reset, contractTypeQuery,gridEvents,gridSearchRef,exportTemplate,downloadPurchase,datastatsOpention,partanameOptions,partbnameOptions
}