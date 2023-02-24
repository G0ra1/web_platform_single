import { Request, Aes, Cookies, Db, request } from '@platform/main'

export const AccountLogout = () => {
    // 这里需要加入登出请求
    return new Promise((resolve, reject) => {
        // 清除cookies中的token信息
        Cookies.remove("token");
        Cookies.remove("tokenType");
        Db.clear();
        resolve(1);
    });
};
// 获取所有收藏类型
export function favoritesTypeList(data: any) {
    return request({
        url: `/portal/favoritesType/list`,
        method: 'post',
        data: {}
    })
}


// 获取待办数量
export function wftodotaskCount() {
    return request({
        url: `/wf/wftodotask/count`,
        method: 'get',
    })
}
// 获取消息数量
export function unreadNumber() {
    return request({
        url: `/main/unreadNumber`,
        method: 'get',
    })
}