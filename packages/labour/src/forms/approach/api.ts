import { Request,request } from '@platform/main'


//调用获取需求计划
export function getPlan (key: string) {
    return request({
        url: `/labour/labourPlan/${key}`,
        method: 'get',
    })
}

//根据需求计划id 查询专业信息 以及推荐人数
export function getPositionInfo(date:any){
    return new Request(
         `/labour/labourPlanPerson/getPositionInfo`,
        'post',
        date
    ).send()
}


//获取班组的机构信息
export async function getBandOrg(data:any) {
    return request({
        url: `/main/mdmOrg/list`,
        method: 'post',
        data
    })
}




// 获取劳务人员信息
export function getSuppUser(data:any){
    return new Request(
        `/labour/labourPlanReferral/list`,
        `post`,
        data
    ).send()
}


// 获取劳务人员信息
export function isOuterDisciplineMaintain(data:any){ 
    return new Request(
        `/labour/labourVirtualPurchase/isOuterDisciplineMaintain`,
        `post`,
        data
    ).send()
}