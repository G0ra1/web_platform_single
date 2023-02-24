import { ref } from 'vue'

type SchemaInstance = {
    [a: string]: {
        name: string,
        type: 'string' | 'number' | 'integer' | 'array' | 'object',
        description?: string,
        format?: string,
        exampleSetFlag?: boolean
    }
}
class Schema {
    
    schemaData = ref<SchemaInstance>({})

    constructor (d: SchemaInstance) {
        this.schemaData.value = d
    }
}