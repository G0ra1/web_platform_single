import { ref } from 'vue'
import { getStyleElement as getDefaultStyleElement } from './default/common'
import { getStyleElement as getTheme1StyleElement } from './theme1/common'
import { getStyleElement as getTheme2StyleElement } from './theme2/common'

import Theme_Default from './default'
import Theme_Theme1 from './theme1'
import Theme_Theme2 from './theme2'

export const ThemeClassName = ref('')
export const ThemeConfig = ref({})

let ActiveStyleElement: any

export const Themes = ref([
    {
        themeName: 'default',
        themeLabel: '默认',
        themeClassName: 'theme-default'
    },
    {
        themeName: 'theme1',
        themeLabel: '白色风格',
        themeClassName: 'theme-theme1'
    },
    {
        themeName: 'theme2',
        themeLabel: '红色风格',
        themeClassName: 'theme-theme2'
    },
])

// 获取
export const setTheme = (themeName: string) => {
    window.localStorage.setItem('theme', themeName)
    // 修改公共样式
    ActiveStyleElement && document.head.removeChild(ActiveStyleElement)
    // body class 设置
    if (themeName === 'theme1') {
        // 这里切换getTheme1StyleElement
        ActiveStyleElement = getTheme1StyleElement()
        document.head.appendChild(ActiveStyleElement)
        ThemeClassName.value = 'theme-theme1'
        ThemeConfig.value = Theme_Theme1

    } else if (themeName === 'theme2') {
        ActiveStyleElement = getTheme2StyleElement()
        document.head.appendChild(ActiveStyleElement)
        ThemeClassName.value = 'theme-theme2'
        ThemeConfig.value = Theme_Theme2

    } else if (themeName === 'default') {
        ActiveStyleElement = getDefaultStyleElement()
        document.head.appendChild(ActiveStyleElement)
        ThemeClassName.value = 'theme-default'
        ThemeConfig.value = Theme_Default

    } else {
        ActiveStyleElement = getDefaultStyleElement()
        document.head.appendChild(ActiveStyleElement)
        ThemeClassName.value = 'theme-default'
        ThemeConfig.value = Theme_Default

    }
    // 修改body 样式
    document.body.className = ThemeClassName.value
}