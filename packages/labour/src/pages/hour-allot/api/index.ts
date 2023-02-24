import { Request } from '@platform/main'
import  HourAllotVo  from '../vo/HourAllotVo';

export function getlabourHourAllotList():Promise<Array<HourAllotVo>> {
    return new Request(
        `/labour/labourHourAllot/list`,
        'post',
    ).send()
}