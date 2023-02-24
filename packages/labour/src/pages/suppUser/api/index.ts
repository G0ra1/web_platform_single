import { Request } from '@platform/main'

export function getUserList() {
    return new Request(
        `/labour/labourSuppUser/list`,
        'post',
    ).send()
}