import { createApp, defineAsyncComponent, defineComponent, h } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

createApp(defineAsyncComponent({
    loader: async () => {
        // 这里加载通用配置
        // if (!window.localStorage.getItem('apiBaseURL')) {
        //     await fetch('/web-main/config.json')
        //     .then(r => r.json())
        //     .then(r => {
        //         window.localStorage.setItem('apiBaseURL', r.apiBaseURL)
        //         window.localStorage.setItem('websocketURL', r.websocketURL)
        //         window.localStorage.setItem('fileServerUrl', r.fileServerUrl)
        //     })
        //     window.location.reload()
        // }
        await fetch('/web-main/config.json')
        .then(r => r.json())
        .then(r => {
            window.localStorage.setItem('apiBaseURL', r.apiBaseURL)
            window.localStorage.setItem('websocketURL', r.websocketURL)
            window.localStorage.setItem('fileServerUrl', r.fileServerUrl)
        })
        
        await fetch(
            `/web-main/login-config/config.json`,
            // `/${baseName}/bpmn/test.bpmn`,
            {
            method: "get"
            }
        ).then(res => {
            return res.text()
        }).then(res => {
            const config = JSON.parse(res)
            window.localStorage.setItem('login-label', config.label)
            window.localStorage.setItem('theme', config.theme)
            window.localStorage.setItem('default-url', config['default-url'] || '/web-main/pages/layout2.html')
            window.localStorage.setItem('logo-img', config['logo-img'] || '')
        })
        return import('./App.vue')
    },
    loadingComponent: defineComponent({
        render: () => {
            return h(
                'div',
                {
                  style: "display:flex;height:100%;justify-content: center;align-items: center;"   
                },
                h('img', {
                    src: '/loading.svg'
                })
            )
        }
    })
})).mount('#app');