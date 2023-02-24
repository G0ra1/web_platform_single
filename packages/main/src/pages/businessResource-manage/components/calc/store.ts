
import { ref, reactive, defineComponent, nextTick, h } from 'vue'
import { cloneDeep } from 'lodash'
import expMap from './exp'

export const editingExp = ref<Array<any>>([])

// 数据结构

const demoExp = [
    {
        type: '',

    }
]

// 元素类型
type ExpType = 'string' | 'number' | 'logic' | 'field' | 'operation' | 'field' | 'user' | 'org' | 'dict' | 'treeDict'

// 
export type Exp = {
    type: ExpType,
    text: string,
    code: string,
}
type ExpPamars = {
    key: string,
    text?: string,
    code?: string,
}

// 可编辑元素类型
export const editableExpType: Array<String> = ['string', 'number']
export const refPickField = ref()
export const refNwEmployeePick = ref()
export const refchooseDept2 = ref()
export const refDictPick = ref()
export const refDictTreePick = ref()
class Calc {
    // 获取元素
    static getExp(expKey: string): Exp {
        return cloneDeep<Exp>(expMap[expKey].Node)
    }

    // 表达式对象
    ExpData = ref<Array<any>>([])
    // 光标位置
    CursorIndex = ref<number>(-1)
    // 当前编辑元素的位置
    editKey = ref<number>(-1)
    // 设定光标位置
    setCursorIndex(n: number) {
        this.CursorIndex.value = n
    }
    // 插入表达式
    pushExp(d: ExpPamars) {
        let _Exp = Calc.getExp(d.key)
        if (d.text) _Exp.text = d.text
        if (d.code) _Exp.code = d.code
        if (this.editKey.value != -1) {
            this.ExpData.value.splice(this.editKey.value, 1, _Exp)
            this.editKey.value = -1;
        } else {
            this.ExpData.value.splice(this.CursorIndex.value + 1, 0, _Exp)
            if (d.key == ')') {

            } else {
                this.setCursorIndex(this.CursorIndex.value + 1)

            }
        }




        console.log(this.ExpData.value)
    }
    // 删除
    removeExp() {
        console.log(this.CursorIndex.value, 'this.CursorIndex.value')
        if (this.CursorIndex.value >= 0) {
            this.ExpData.value.splice(this.CursorIndex.value, 1)
            this.setCursorIndex(this.CursorIndex.value - 1)
        }

    }
    // 重置
    resetExp() {

    }
    setExp(d: Array<Exp>) {
        this.ExpData.value = d
    }
}

export const calcInst = new Calc()

export const clickHandel = (item: Exp, key: number) => {
    const refMap: any = {
        'field': refPickField.value,
        'user': refNwEmployeePick.value,
        'org': refchooseDept2.value,
        'dict': refDictPick.value,
        'treeDict': refDictTreePick.value
    }
    if (!item.type.indexOf('@')) return
    calcInst.editKey.value = key
    if (item.type == 'number' || item.type == 'string') {

    }
    else if (item.type == 'dict') {
        refMap[item.type].show({ dictItemCode: item.code, dictItemName: item.text })
    } else {
        refMap[item.type].show(item.code)
    }
}
