import { ref, reactive, toRaw, computed } from "vue"
import { Designer } from './designer'
// 工具栏对象
class Tools {
    switchType = ref<'design' | 'json' | 'code'>('design')
    DesignerInst: Designer
    downloadJSON () {
        
    }
    constructor (designer: Designer) {
        this.DesignerInst = designer
    }
}

export { Tools }