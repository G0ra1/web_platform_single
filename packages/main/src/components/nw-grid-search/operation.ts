import { operationType } from './operation.d'
const rangOperation = [
    {
        label: '等于',
        value: 'eq'
    },
    {
        label: '不等于',
        value: 'neq'
    },
    {
        label: '大于等于',
        value: 'gte'
    },
    {
        label: '小于等于',
        value: 'lte'
    },
    {
        label: '介于',
        value: 'range'
    },

]
const normalOperation = [
    {
        label: '等于',
        value: 'eq'
    },
    {
        label: '不等于',
        value: 'neq'
    },
    {
        label: '包含',
        value: 'in'
    },
    {
        label: '包含于',
        value: 'bein'
    },
]

const operation: operationType = {
    rang: rangOperation,
    normal: normalOperation
}
export default operation
