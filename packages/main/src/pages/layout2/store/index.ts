import { ref } from 'vue';


type SiderMenuActionType = 'home' | 'app'

// 左菜单切换
export const SiderMenuAction = ref<string>('home')

// 应用入口弹出
export const AppInAction = ref<boolean>(false)