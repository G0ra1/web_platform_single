/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*'

declare interface Window {
  apiBaseURL: string,
  websocketURL: string,
  fileServerUrl: string,
  ueServerUrl: string
}