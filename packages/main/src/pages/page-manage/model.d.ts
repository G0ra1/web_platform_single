export type SearchForm = {
    formNameCh?: string
    formName?: string
}

export type FormModel = {
    id?: string,
    pageName?: string,
    pageCode?: string,
    pageType?: string,
    pageUrl?: string,
    targetUrl?: string,
    remark?: string,
    isEnable?: 0 | 1,
    appCode?: string,
    appName?: string,
    jsonSchema?: string,
    isTransform?: 0 | 1,
    interfaceJsonSchema?: string,
    formSaveUrl?: string,
    formSaveMethodType?: string,

    formDeleteUrl?: string,
    formDeleteMethodType?: string,

    formUpdateUrl?: string,
    formUpdateMethodType?: string,

    formGetUrl?: string,
    formGetMethodType?: string,

    procViewUrl?: string,
    procViewMethodType?: string,

    formListUrl?: string,
    formListMethodType?: string,
    // 加入 流程URL /smm/jzNatgasSell/proc/view/{procinsId}
}