import { Request } from '@platform/main'
import TreeVo from "../vo/TreeVo"
import TreeDto from "../dto/TreeDto"
export function getOrgTree(TreeDto: TreeDto): Promise<Array<TreeVo>> {
    return new Request<object, Array<TreeVo>>(
        `/main/mdmOrg/treeList`,
        'post',
        TreeDto
    ).send()
}

export function getItemClassifyTree(TreeDto: TreeDto): Promise<Array<TreeVo>> {
    return new Request<object, Array<TreeVo>>(
        `/mdm/itemClassify/treeList`,
        'post',
        TreeDto
    ).send()
}