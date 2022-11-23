import { Request, Aes, Cookies, Db } from '@platform/main'

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