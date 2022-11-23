import { h } from 'vue'
class Drag {
    static cache; // 缓存 data
    static tagetCache; // 鼠标抬起捕获目标缓存
    static dragEnabled = false; // 是否处于拖拽状态
    static targetEnabled = false; // 拖拽目标
    static zIndex = 1;
    constructor( el, option={} ){
        this.el = el;
        this.x=0;
        this.y=0;
        this.option = option;
        this.init();
    }
    init(){
        // this.setEleStyle(this.option || {});
        // 这里需要判断是否可接收对象
        const {
            mode, // 模式 
            placeCallBack = () => {}, // 放置回调
            captureCallBack = () => true, // 捕获回调
        } = this.option
        // 1 可触发拖拽 2 可拾取拖拽 3 整体移动
        if (mode === 1 || mode === 3) {
            // 鼠标按下时出发拖拽
            this.el.onmousedown = (e) => {
                Drag.dragEnabled = true
                this.onMouseDown(e) // 
                this.el.setCapture && this.el.setCapture() //全局捕获 将所有鼠标事件定向到这个元素
                return false
            }
        }
        if (mode === 2) {
            // 鼠标抬起时触发放置
            this.el.onmouseup = (e) => {
                if (!Drag.dragEnabled) {
                    return false
                }
                // 这里 记录 捕获目标
                Drag.tagetCache = this.option.data
                Drag.targetEnabled = captureCallBack(Drag.cache)
                Drag.dragEnabled = false
                return false
            }
        }

    }
    //样式设置
    setEleStyle (option) {
        const {
            el: Nel
        } = this.option
        let el = Nel ? (Nel.value || this.el) : this.el
        for (const key in option) {
            el.style[key] = option[key]
        }
    }

    //按下ele
    onMouseDown (e) {
        console.log('=====this.option.data=====', this.option.data)
        // 记录数据
        Drag.cache = this.option.data

        const {
            mode,
            dragStart = () => {},
            el: Nel
        } = this.option
        console.log('=======onMouseDown==start===', Drag.cache)
        // 这里创建浮动元素
        dragStart(e)
        // Drag.followDom = this.option.followDom
        // console.log('===getComputedStyle===', h(Drag.followDom))
        if (mode === 3) {
            let el = Nel.value || this.el
            const width = el.offsetWidth
            console.log('Nel.value==', Nel.value)
            let zIndex = getComputedStyle(el).getPropertyValue('z-index');
            zIndex = isNaN(zIndex) ? 1 : zIndex
            Drag.zIndex = Drag.zIndex > zIndex ? Number(Drag.zIndex) + 1 : Number(zIndex) + 1
            this.setEleStyle({
                'zIndex': Drag.zIndex,
                'cursor': 'move',
            })
            this.x = e.clientX + 10 //-el.offsetLeft;
            this.y= e.clientY + 10 //-el.offsetTop;
        }
        
        document.onmousemove = (e) => this.onMouseMove(e);
        document.onmouseup = (e)=>this.onMouseUp(e)
    }
    //移动move
    onMouseMove (e) {
        
        const {
            mode,
            dragMove = () => {},
            el: Nel
        } = this.option

        dragMove(e)

        if (mode === 3) {
            let el = Nel.value || this.el
            let X = e.clientX + 10 //-this.x
            let Y = e.clientY + 10 //-this.y;
            if(X<10-el.offsetWidth){
                X=10-el.offsetWidth
            }else if(X>document.documentElement.clientWidth-10){
                X =document.documentElement.clientWidth-10
            }
            if(Y<10-el.clientHeight){
                Y=10-el.clientHeight
            }else if(Y>document.documentElement.clientHeight-10){
                Y =document.documentElement.clientHeight-10
            }
            el.style.left = X+'px'
            el.style.top = Y+'px'
        }
        
    }
    //释放
    onMouseUp (e) {
        const {
            dragEnd = () => {}
        } = this.option
        console.log('end this.option==', this.option)
        // 拖拽结束, 如果结束在某个目标中则传入目标数据
        dragEnd(e, Drag.targetEnabled, Drag.tagetCache)
        Drag.targetEnabled = false // 重置目标标记
        document.onmousemove = null  // 重置全局事件
        document.onmouseup = null
        Drag.dragEnabled = false // 重置拖拽状态
        Drag.cache = null  // 重置缓存数据
        Drag.tagetCache = null // 重置目标缓存
        this.setEleStyle({
            'cursor': 'pointer',
            'left': 'unset',
            'top': 'unset',
            'width': 'unset'
        })
        this.el.setCapture && this.el.setCapture() //释放全局捕获

    }
}
export const drag = {
    mounted(el, binding) {
        new Drag(el, binding.value || {})
    }
}