import { ref, reactive, shallowReactive, nextTick, computed } from 'vue'
import { get } from 'lodash'

import { queryAPP } from '../api/index.js'
// 左数数据
export const treeData = ref([{
    id: 'root',
    name: '全部',
    hasChild: true,
    // children: [{
        
    //     id: 'type1',
    //     name: 'type1',
    //     hasChild: true
    // },{
        
    //     id: 'type2',
    //     name: 'type2',
    //     hasChild: true
    // },{
        
    //     id: 'type3',
    //     name: 'type3',
    //     hasChild: true
    // }]
}])

// 左树过滤条件
export const StaticFilter = ref({})

// query
export const query = () => {

}