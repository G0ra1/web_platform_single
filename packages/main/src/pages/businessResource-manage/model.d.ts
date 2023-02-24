export type SearchForm = {
    formNameCh?: string
    formName?: string
}
type TargetList = {
    targetName?: string
    targetValue?: string
    targetType?: string
    text?: string
    code?: string
    type?: string
}
export type FormModel = {
    id?: string,
    pageName?: string,
    pageCode?: string,
    pageId?: string,
    roleId?: string,
    roleCode?: string,
    roleName?: string,
    isEnable?: 0 | 1,
    appCode?: string,
    appName?: string,
    appId?: string,
    formListMethodType?: string,
    formListUrl?: string,
    conditionalExpression?: string,
    targetList?: Array<TargetList>
    // 加入 流程URL /smm/jzNatgasSell/proc/view/{procinsId}
}

export type o = {
    [a: string]: any
}