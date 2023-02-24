import { ref } from 'vue'
import { Cookies, Db } from '@platform/main'

export const initSocket = () => {}

export class Ws {
    static ws: WebSocket
    state = ref<string>('')
    constructor (dialog: any) {
        const token = Cookies.get("token");
        const tokenType = Cookies.get("tokenType");
        this.state.value = 'loading'
        Db.get('userInfo').then((d: any) => {
            // ws://192.168.0.70:31000/ws/msg
            Ws.ws = new WebSocket(`ws://${window.location.host}${window.apiBaseURL}/socket/ws/msg?token=${token}&userId=${d.id}`); // ${userId}
            // Ws.ws = new WebSocket(`ws://192.168.0.70:31000/ws/msg?token=${token}&userId=${d.id}`); // ${userId}
            // Ws.ws = new WebSocket(`${window.websocketURL}?token=${token}&userId=${d.id}`); // ${userId}
            // Ws.ws = new WebSocket(`ws://192.168.0.70:32222/ws/msg?token=${token}&userId=${d.id}`); // ${userId}
            
            // 触发
            Ws.ws.onopen = () => {
                this.state.value = 'onopen'
                window.dispatchEvent(new CustomEvent('WsOnOpen', {
                }));
            }
            // 监听信息
            Ws.ws.onmessage = (evt) => {
                // alert('msg')
                console.log('-=evt-=', JSON.parse(evt.data))
                window.dispatchEvent(new CustomEvent('WsOnMessage', {
                    detail:  JSON.parse(evt.data)
                }));
            }
            Ws.ws.onclose = () => {
                
                this.state.value = 'onclose'
                window.dispatchEvent(new CustomEvent('WsOnClose', {
                    
                }));
            }
        })
        


    }

}

