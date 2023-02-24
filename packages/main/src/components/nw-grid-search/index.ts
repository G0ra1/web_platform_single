import { ref } from "vue";
import type { SearchNS } from './type'
import SearchModel from './SearchModel.ts'
import { format } from "date-fns";




export const searchGroup = ref<Array<SearchNS.searchGroup>>([])
export const filedOptions = ref<Array<SearchNS.SelectOption>>([])
export const dictOptions = ref<SearchNS.obj>({})

let options: Array<SearchNS.option>

export const test = () => {
    console.log(searchGroup.value)
}


// 查询字段变更 
export const keyWordChange = (value: string, index: number, i: number) => {

    options.forEach((d: any) => {
        if (d.field === value) {
            searchGroup.value[index][i].vType = d.vtype
            if (d.vtype == "date") {
                searchGroup.value[index][i].value = format(new Date(), 'yyyy-MM-dd')
                searchGroup.value[index][i].isIncludeRang = true
            }
            if (d.vtype == "number") {
                searchGroup.value[index][i].value = 0
                searchGroup.value[index][i].isIncludeRang = true
            }

        }
    })

}
// 查询范围发生改变
export const operationTypeChange = (value: string, index: number, i: number) => {
    if (value === 'range') {
        searchGroup.value[index][i].vType = "dateRange"
    } else {
        if (searchGroup.value[index][i].vType == "dateRange") {
            searchGroup.value[index][i].vType = "date"
        }
    }
}
// 增加查询组
export const addGroup = () => {
    searchGroup.value.push([
        {
            keyWord: options[0].field,
            operationType: 'eq',
            value: '',
            isIncludeRang: false,
            isRang: false,
            vType: options[0].vtype
        }
    ])
}
// 增加查询条件
export const addFilter = (index: number) => {
    searchGroup.value[index].push(
        {
            keyWord: options[searchGroup.value[index].length].field,
            operationType: 'eq',
            value: options[searchGroup.value[index].length].vtype == 'date' ? format(new Date(), 'yyyy-MM-dd') : '',
            isIncludeRang: false,
            isRang: false,
            vType: options[searchGroup.value[index].length].vtype
        }
    )
}
export const delFilter = (index: number, i: number) => {
    searchGroup.value[index].splice(i, 1)
    if (searchGroup.value[index].length == 0) {
        searchGroup.value.splice(index, 1)
    }
}


export const newSearchModel = (o: Array<SearchNS.option>) => {
    const { filedOptions: _filedOptions, options: _options, dictOptions: _dictOptions } = new SearchModel(o)
    filedOptions.value = _filedOptions
    dictOptions.value = _dictOptions
    options = _options
}