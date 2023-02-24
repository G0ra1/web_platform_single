import { Request } from '@platform/main'
import WorkContract from '../data/WorkContract'

export function getWorkContractList():Promise<Array<WorkContract>> {
    return new Request(
        '/workcontract/list',
        'post',
    ).send()
}