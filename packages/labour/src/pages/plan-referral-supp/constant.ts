import { NDatePicker, NTag, NInputNumber, NInput,NSelect } from "naive-ui"
import { postRank,referraOptions,majorRank,majorOptions,postMajorTableTmp } from "./App"
import { Page } from '@platform/main' 
import { h } from 'vue'
import { get } from 'lodash'
import { getPositionInfo } from "./api/index";
const ReferralColumn = [
    { field: 'userNameCh', title: '姓名', align: 'center' },
    { field: 'phoneNum', title: '电话号码', align: 'center' },
    { field: 'idCard', title: '身份证号', align: 'center' },
    { field: 'outerDisciplineName', title: '岗位', align: 'center',
      slots: {default :({row}:any)=>{
        return h(
            NSelect,
            {
                options: referraOptions.value, 
                value: get(postMajorTableTmp.value, `${row.idCard}.outerDisciplineId`, postRank.value.value), 
                placeholder: "选择岗位",
                onUpdateValue: (d,obj:any) =>{
                  postMajorTableTmp.value[row.idCard] = {
                    outerDisciplineId: obj.value,
                    outerDisciplineName :obj.label,
                    isHour:obj.isHour,
                    planPersonId:obj.planPersonId,
                    banId:obj.banId,
                    banName:obj.banName
                  }
                  // 获取行内二级下拉
                  getPositionInfo({planId : Page.getMenuData().id,outerDisciplineId: obj.value}).then((d:any)=>{
                    postMajorTableTmp.value[row.idCard].__majorOptions =  d.map((d:any)=>{
                      return {'label':d.postRankName,'value':d.postRankId}
                    })
                  })
                }
            }
        )
      }}
    },
    { field: 'postRankName', title: '专业名称',align: 'center',
      slots: {default :({row}:any)=>{ 
        // get(postMajorTableTmp.value, `${row.idCard}`, majorRank.value.value)
        const gv = () => {
          if (postMajorTableTmp.value[row.idCard]) {
            return postMajorTableTmp.value[row.idCard].postRankId || ''
          } else {
            return majorRank.value.value
          }
        }
        return h(
          NSelect,
          {
            // options: majorOptions.value ,
            options: get(postMajorTableTmp.value, `${row.idCard}.__majorOptions`, majorOptions.value),
            // value : row.postRankId || majorRank.value.value, 
            // value: get(postMajorTableTmp.value, `${row.idCard}.postRankId`, majorRank.value.value), 
            value: gv(),
            // disabled: !get(postMajorTableTmp.value, `${row.idCard}`, false),
            placeholder: "选择专业", 
            onUpdateValue:(d,obj:any) =>{
                // postMajorTableTmp.value[row.idCard] = {}
                postMajorTableTmp.value[row.idCard].postRankId = obj.value
                postMajorTableTmp.value[row.idCard].postRankName = obj.label
              // row.postRankId = obj.value
              // row.postRankName = obj.label
            }
          }
        )
      }}
    },
]


export { ReferralColumn }