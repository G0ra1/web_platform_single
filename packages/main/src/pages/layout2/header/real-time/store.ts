import { ref } from 'vue'
import { Cookies } from '@platform/main'

export const initSocket = () => {}

export class Ws {
    static ws: WebSocket
    state = ref<string>('')
    constructor (dialog: any) {
        const token = Cookies.get("token");
        const tokenType = Cookies.get("tokenType");
        // Ws.ws = new WebSocket(`ws://192.168.1.195:8010/ws/msg?token=${tokenType} ${token}&userId=${userId}`);

        // // 触发
        // Ws.ws.onopen = () => {
        //     window.dispatchEvent(new CustomEvent('WsOnOpen', {
                
        //     }));
        // }
        // // 监听信息
        // Ws.ws.onmessage = (evt) => {
        //     console.log('-=evt-=', evt)
        //     window.dispatchEvent(new CustomEvent('WsOnMessage', {
                
        //     }));
        // }
        // Ws.ws.onclose = () => {
            
        //     window.dispatchEvent(new CustomEvent('WsOnClose', {
                
        //     }));
        // }
    }

}

