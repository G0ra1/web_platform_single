import { Request } from '@platform/main'
import DictItem from "../../../forms/dict-form/model"
/**
 * 请求字典表 根据字典类型查询字典id
 * @param 字典类型type 
 * @returns 
 */
export function getByType(type: string): Promise<DictItem> {
  return new Request<string, DictItem>(
    `main/dictType/detailCode/${type}`,
    'get',
  ).send()
}