import jsCookie from 'js-cookie';
import type { CookiesInstance } from './cookies.d'

const cookiesPrefix = 'admin' // cookies名前缀
const cookiesExpires = 1 // cookies过期时间

class Cookies implements CookiesInstance {
    set (name = 'default', value = '', cookieSetting = {}) {
        let currentCookieSetting = {
            expires: cookiesExpires
        };
        Object.assign(currentCookieSetting, cookieSetting);
        jsCookie.set(`${cookiesPrefix}-${name}`, value, currentCookieSetting);
    }
    get (name = 'default') {
        return jsCookie.get(`${cookiesPrefix}-${name}`);
    }
    remove (name = 'default') {
        return jsCookie.remove(`${cookiesPrefix}-${name}`);
    }
}

export default new Cookies();
