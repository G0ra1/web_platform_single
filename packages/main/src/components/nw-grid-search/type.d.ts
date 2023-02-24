export namespace SearchNS {
    // 运算
    export type OperationEmu = 'eq' | 'neq' | 'in' | 'notin' | 'gte' | 'lte' | 'range'
    // 数据类型
    export type VType = 'string' | 'number' | 'date' | 'dateRange' | 'dept' | 'user' | 'dic'
    export type operation = {
        code: OperationEmu,
        name: string
    }
    export type condition = ''
    // 
    export type basicOption = {
        name: string,
        field: string,
        vtype: VType,
    }
    export type dictOption = {
        dictCode?: string,
        dictUrl?: string,
        dictMethod?: 'get' | 'post',
        codeFiled?: string,
        nameFiled?: string
    }
    export type option = basicOption & dictOption
    export type SelectOption = {
        label: string,
        value: string | number,
        disabled?: boolean,
    }
    export type searchFilter = {
        keyWord: string,
        operationType: OperationEmu,
        value: string | number,
        isIncludeRang: boolean,
        isRang: boolean,
        vType: VType,

    }
    export type searchGroup = Array<searchFilter>
    export type obj = {
        [a: string]: dictOption
    }
}


