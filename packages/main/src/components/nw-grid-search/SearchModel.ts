import type { SearchNS } from './type'




export default class SearchModel {
    options: Array<SearchNS.option>
    filedOptions: Array<SearchNS.SelectOption> = []
    dictOptions: SearchNS.obj = {}

    constructor(optons: Array<SearchNS.option>) {
        this.options = optons
        this.init()
    }

    setFiledOptions() {
        this.options.forEach((d: SearchNS.option) => {
            this.filedOptions.push({
                label: d.name,
                value: d.field,
                disabled: false
            })
            if (d.vtype == 'dic') {
                this.dictOptions[d.field] = {
                    dictCode: d.dictCode,
                    dictUrl: d.dictUrl,
                    dictMethod: d.dictMethod,
                    codeFiled: d.codeFiled,
                    nameFiled: d.nameFiled
                }
            }
        })
    }
    getFiledOptions() {
        return this.filedOptions
    }




    private init() {
        this.setFiledOptions()
    }


}