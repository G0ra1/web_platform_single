import { request } from '@platform/main'

export function  rightList(params) {
  return request({
      url: `mdm/mdmOrg/list`,
      method: 'post',
      data: params
  })
}

  
