import type { SearchNS } from './type'

export default class SearchModel {
    options: Array<SearchNS.option>
    filedOptions: Array<SearchNS.SelectOption> = []

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
        })
    }
    getFiledOptions() {
        return this.filedOptions
    }


    private init() {
        this.setFiledOptions()
    }


}