import { ref, Ref } from 'vue'

class Cell<T> {
    formNameCh = ''
    formName = ''
}

interface CellInstance {
    [a: string]: string | number
}



export default Cell