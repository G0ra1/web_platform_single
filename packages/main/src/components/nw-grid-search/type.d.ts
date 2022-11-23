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
    export type option = {
        name: string,
        field: string,
        vtype: VType,
        dictCode?: string,
        dictUrl?: string,
        codeFiled?: string,
        nameFiled?: string
    }
    export type SelectOption = {
        label: string,
        value: string | number,
        disabled: boolean,
    }
}


