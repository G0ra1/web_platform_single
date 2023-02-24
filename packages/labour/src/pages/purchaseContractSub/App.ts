import { RequestPaging, VxeHelper, Page ,NwFunctionPredefine} from '@platform/main'
import { h, ref} from 'vue'
import { NTag } from 'naive-ui'

const { bind, gridRef, filterData, query, reset,gridEvents } = new VxeHelper.VxeGridPaging(
  {
    columns: [
      {
        field: 'contractcode', title: '合同编号', showHeaderOverflow: true, width: '300px', align: 'center',},
      { field: 'purchaseunit', title: '采购单位', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'contractname', title: '合同名称', showHeaderOverflow: true, width: '500px', align: 'center' },
      { 
        field: 'purchasesubtype', title: '合同类型', showHeaderOverflow: true, width: '100px', align: 'center',
        slots: {
          default: ({ row }) => [h(
              NTag,
              { size: "small", type: "success", round:"round"} as {},
              { default: () => contractTypeArray[row.purchasesubtype] }
          )] as JSX.Element[]
        }
      },
      { field: 'contractstatusname', title: '状态', showHeaderOverflow: true, width: '100px', align: 'center' },
      { field: 'purchasetype', title: '采购类型', showHeaderOverflow: true, width: '100px', align: 'center' ,
        slots:{
          default: ({ row }) => {
            let text = "";
            if( row.purchasetype == 1){
                text="物资采购"
            }else if(row.purchasetype == 2){
              text="工程采购"
            }else if(row.purchasetype == 3){
              text="服务采购"
            }else{
              text=row.purchasetype;
            }
            return [
                text
            ]
          }
      } 
    },
      { field: 'estimateinitamount', title: '初始额', showHeaderOverflow: true, width: '200px', align: 'center'},
      { field: 'estimateexecamount', title: '预计履约执行金额', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'alreadypayamount', title: '已支付金额', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'actualexecamount', title: '实际履约执行金额', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'datastatus', title: '数据状态', showHeaderOverflow: true, width: '100px', align: 'center' ,
          slots:{
            default: ({ row }) => {
              let text = "";
              if( row.datastatus == 0){
                  text="未完善"
              }else if(row.datastatus == 1){
                text="部分完善"
              }else if(row.datastatus == 2){
                text="已完善"
              }
              return [
                  text
              ]
            }
        }
      },
      { field: 'changeamout', title: '变更额', showHeaderOverflow: true, width: '200px', align: 'center' },
      { field: 'contractamount', title: '合同总额', showHeaderOverflow: true, width: '200px', align: 'center' },
      {
        title: '操作',
        showHeaderOverflow: true,
        align: 'center',
        width:'250px',
        slots: {
          
            default: ({ row }) => {
                //详情
                let contractId="";
                let PurchaseInfo = h(
                    NwFunctionPredefine,
                    { code: "purchaseInfoFormInfo", params: [row] }
                );
                //发票类型
                let puchaseExtend = h(
                    NwFunctionPredefine,
                    { code: "purchaseExtendFormExtend", params: [row] }
                );
            
                //return row.camundaProcinsId !== "" ? [edit] : [edit, del]
                return [PurchaseInfo, puchaseExtend]
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


let md = Page.getMenuData();
const refresh = () => {
  reset(
    {
      purchasesubtype: "3", //项下订单
      contractid: md.id //框架合同Id
    }
  )
}
const gridSearchRef = ref()
export {
  bind, gridRef, filterData, query, refresh, reset,gridSearchRef, gridEvents
}