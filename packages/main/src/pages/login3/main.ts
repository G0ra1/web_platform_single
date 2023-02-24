import { createApp, defineAsyncComponent, defineComponent, h } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

createApp(defineAsyncComponent({
    loader: async () => {
        // 这里加载通用配置
        if (!window.localStorage.getItem('apiBaseURL')) {
            await fetch('/web-main/config.json')
            .then(r => r.json())
            .then(r => {
                window.localStorage.setItem('apiBaseURL', r.apiBaseURL)
                window.localStorage.setItem('websocketURL', r.websocketURL)
                window.localStorage.setItem('fileServerUrl', r.fileServerUrl)
            })
            window.location.reload()
        }
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