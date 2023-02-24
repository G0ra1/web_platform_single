import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { cloneDeep } from "lodash";
import { AbstractForm } from "@platform/main";
import { WidgetNS } from '../low-code-designer/model/widget.d'

export const loadPage = async () => {

}

class ComputedStore {
    dataModel: Ref<any>
    computedMap: any
    constructor (c: any, dm: Ref<any>) {
        this.dataModel = dm
        c.forEach((d: any) => {
            try {
                this.computedMap[d.name] = {
                    name: d.name,
                    desc: d.desc,
                    computed: computed(() => {
                        return new Function(d.script)()
                    })
                }
            } catch (err) {
                throw(err)
            }
        })
    }
}

class FormRender extends AbstractForm {
    // 页面模型
    pageConfig = ref<WidgetNS.Config>()

    // 变量模型
    TestComputed = computed((...p) => {
        console.log('=====ppp=====', p)
        return 1
    })

    // 表单数据
    dataModel = ref<any>({});
    getSchema = async () => {
        // 从表单获取数据
        return {};
    };
    setValue = (d: any) => {
        // 给表单设定数据
        this.dataModel.value = d;
      };
    
    getValue = async () => {
    // 从表单获取数据
    return cloneDeep(this.dataModel.value);
    };

    setRules = (v: any) => {
    super.setRules(v)
    };

    ComputedStore: ComputedStore
    constructor (pageConfig: WidgetNS.Config, computeditems: any) {
        super()
        this.pageConfig.value = pageConfig
        // 这里生成计算属性
        this.ComputedStore = new ComputedStore(computeditems, this.dataModel)
        
    }
    
}

export {
    FormRender
}