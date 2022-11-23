interface CookiesInstance {
    set: (name: string, value: string, cookieSetting: object) => void,
    get: (name: string) => string | undefined,
    remove: (name: string) => void
}

export {
    CookiesInstance
}