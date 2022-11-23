// 后台

export default [
    {
        appName: '应用资源管理',
        appCode: 'app',
        appType: 'system',
        menus: [
            {
                label: '业务入口',
                key: 'bizmenu-manage',
                url: '/web-main/pages/bizmenu-manage.html',
                type: 0,
                sonMenus: [
                    {
                        label: '菜单管理',
                        key: 'menu-manage',
                        url: '/web-main/pages/menu-manage.html'
                    }
                ]
            },
            {
                label: '应用管理',
                key: 'app-manage',
                url: '/web-main/pages/app-manage.html',
                type: 0,
                sonMenus: [
                    {
                        label: '页面管理',
                        key: 'page-manage',
                        url: '/web-main/pages/page-manage.html'
                    },
                    {
                        label: '功能管理',
                        key: 'function-manage',
                        url: '/web-main/pages/function-manage.html'
                    }
                ]
            },
            {
                label: 'OpenApi管理',
                key: 'openapi-manage',
                type: 1,
                url: '/web-main/pages/openapi-manage.html'
            },
            {
                label: '角色权限管理',
                key: 'row-manage',
                type: 1,
                url: '/web-main/pages/row-manage.html'
            },
            {
                label: '数据源管理',
                key: 'dbds-manage',
                type: 1,
                url: '/web-old/html/model/dbds.html'
            },
            /*  {
                 label: '实体管理',
                 key: 'entity-manage',
                 url: '/web-old/html/model/entity.html'
             },
             {
                 label: '模型管理',
                 key: 'modeling-manage',
                 url: '/web-old/html/model/modeling.html'
             }, */
            {
                label: '数据建模',
                key: 'model-manage',
                type: 1,
                url: '/web-main/pages/model-manage.html'
            },
            {
                label: '业务权限',
                key: 'businessResource-manage',
                type: 1,
                url: '/web-main/pages/businessResource-manage.html'
            },
            {
                label: '定时任务管理',
                key: 'task-job',
                type: 1,
                url: '/web-main/pages/task-job.html'
            },
            {
                label: '定时任务日志',
                key: 'task-log',
                type: 1,
                url: '/web-main/pages/task-log.html'
            },

        ],
        pages: {
            'app-manage': '/web-main/pages/app-manage.html',
            'bizmenu-manage': '/web-main/pages/bizmenu-manage.html',
            'menu-manage': '/web-main/pages/menu-manage.html',
            'page-manage': '/web-main/pages/page-manage.html',
            'function-manage': '/web-main/pages/function-manage.html',
            'openapi-manage': '/web-main/pages/openapi-manage.html',
            'row-manage': '/web-main/pages/row-manage.html',
            'dbds-manage': '/web-old/html/model/dbds.html',
            /* 'entity-manage': '/web-old/html/model/entity.html',
            'modeling-manage': '/web-old/html/model/modeling.html', */
            'model-manage': '/web-main/pages/model-manage.html',
            'businessResource-manage': '/web-main/pages/businessResource-manage.html',
            'task-job': '/web-main/pages/task-job.html',
            'task-log': '/web-main/pages/task-log.html',
        },
        formListUrl: {
            'app-manage': '/main/mdmApp/page',
            'bizmenu-manage': '/main/mdmBizMenu/page',
        }
    },
    {
        appName: '主数据管理',
        appCode: 'mdm',
        appType: 'system',
        menus: [
            {
                label: '组织管理',
                key: 'organization-manage',
                type: 1,
                url: '/web-old/html/mdm/organization-manage.html'
            },
            {
                label: '用户管理',
                key: 'emp-manage',
                type: 1,
                url: '/web-old/html/mdm/emp-manage.html'
            }
        ],
        pages: {
            'organization-manage': '/web-old/html/mdm/organization-manage.html',
            'emp-manage': '/web-old/html/mdm/emp-manage.html'
        }
    },
    {
        appName: '流程管理',
        appCode: 'wf',
        appType: 'system',
        menus: [
            {
                label: '流程分类',
                key: 'procdeftype',
                type: 1,
                url: '/web-wf/pages/procdeftype.html'
            },
            {
                label: '流程定义',
                key: 'procdef',
                type: 1,
                url: '/web-wf/pages/procdef.html'
            },
            {
                label: '事件维护',
                key: 'event',
                type: 1,
                url: '/web-wf/pages/event.html'
            },
            {
                label: '表达式维护',
                key: 'expre',
                type: 1,
                url: '/web-wf/pages/expre.html'
            },
        ],
        pages: {
            'procdeftype': '/web-wf/pages/procdeftype.html',
            'procdef': '/web-wf/pages/procdef.html',
            'event': '/web-wf/pages/event.html',
            'expre': '/web-wf/pages/expre.html'
        }
    }

]