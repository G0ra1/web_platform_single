// type 节点类型 2 并集 | 3 交集 | 5 公式节点
export default {
    "id": "1",
    "name": "root1", // 名称
    "type": 3, // 节点类型
    "children": [
        {
            "id": "11",
            "name": "领导", // 
            "type": 2,
            "children": [
                {
                    "id": "111",
                    "name": "机构过滤", // 
                    "type": 5,
                    "children": [
                        {
                            // 括号
                            type: 'group',
                            children: [{
                                type: 'exp',
                                text: 'get'
                            },{
                                // 括号
                                type: 'group',
                                children: [{
                                    type: 'exp',
                                    text: 'get'
                                }]
                            }]
                        },
                        {
                            type: 'logic',
                            text: '>='
                        },
                        {
                            type: 'number',
                            text: '3'
                        }
                    ]
                },
                {
                    "id": "112",
                    "name": "机构过滤2", // 
                    "type": 5,
                    "children": []

                },
                {
                    "id": "113",
                    "name": "机构过滤3", // 
                    "type": 5,
                    "children": []

                },
                {
                    "id": "114",
                    "name": "机构过滤4", // 
                    "type": 5,
                    "children": []

                }
            ]
        },
        {
            "id": "12",
            "name": "职员", // 
            "type": 3,
            "children": [
                {
                    "id": "121",
                    "name": "岗位过滤", // 
                    "type": 5,
                    "children": []
                },
                {
                    "id": "122",
                    "name": "职位过滤", // 
                    "type": 5,
                    "children": []

                }
            ]
        },
        {
            "id": "13",
            "name": "其他人员", // 
            "type": 3,
            "children": [
                {
                    "id": "131",
                    "name": "条件1", // 
                    "type": 5,
                    "children": []
                },
                {
                    "id": "132",
                    "name": "条件2", // 
                    "type": 5,
                    "children": []

                }
            ]

        }
    ]
}
   