// 后台

export default [
    {
        appName: '门户管理',
        appCode: 'portal',
        appType: 'service',
        icon: 'icon-n-y-app',
        menus: [
            {
                label: '模板管理',
                key: 'template-manage',
                url: '/web-old/html/portal/template.html'
            },
            {
                label: '门户维护',
                key: 'portal-manage',
                url: '/web-old/html/portal/portal-manage.html'
            },
            {
                label: '栏目管理',
                key: 'part-manage',
                url: '/web-old/html/portal/part.html'
            },
            {
                label: '新闻管理',
                key: 'news-manage',
                url: '/web-old/html/portal/news-manage.html'
            },
            {
                label: '系统集成',
                key: 'systemx',
                url: '/web-old/html/portal/systemx.html'
            },
            {
                label: '文件下载',
                key: 'file-manage',
                url: '/web-old/html/portal/file-manage.html'
            }
        ],

        pages: {
            'template-manage': '/web-old/html/portal/template.html',
            'portal-manage': '/web-old/html/portal/portal-manage.html',
            'part-manage': '/web-old/html/portal/part.html',
            'news-manage': '/web-old/html/portal/news-manage.html',
            'systemx': '/web-old/html/portal/systemx.html',
            'file-manage': '/web-old/html/portal/file-manage.html',
        }
    },
    {
        appCode: 'smm',
        appName: '石油管理',
        appType: 'service', // app分类
        icon: 'icon-y-wfeditor',
        defaultMenu: '',
        menus: [
            {
                label: '冀中天燃气运销日报',
                key: 'jzNatgasSell-manage',
                url: '/web-smm/pages/jzNatgasSell.html'
            }
        ],
        pages: {
            'jzNatgasSell-manage': '/web-smm/pages/jzNatgasSell.html'
        }
    },

]
