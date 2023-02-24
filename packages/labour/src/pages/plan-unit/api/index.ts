import { Request } from '@platform/main'
import LabourPlanVo from '../vo/LabourPlanVo'

export function getlabourPlanList():Promise<Array<LabourPlanVo>>{
    return new Request(
        `/labour/labourPlan/list`,
        'post',
    ).send()
}