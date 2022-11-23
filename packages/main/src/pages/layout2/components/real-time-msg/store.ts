import { ref } from 'vue'

export const MenuList = ref<Array<any>>([
    {
        name: '信息',
        code: 'msg'
    },
    {
        name: '通讯录',
        code: 'users'
    },
    {
        name: '群发',
        code: 'group-msg'
    },
    {
        name: '任务',
        code: 'task'
    },
])