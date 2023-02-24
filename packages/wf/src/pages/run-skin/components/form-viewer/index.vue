
<script lang='tsx'>

import { h,defineComponent, ref, reactive, getCurrentInstance  } from "vue";
import {
NDrawer,
NDrawerContent,
NLayout,
NLayoutHeader,
NLayoutSider,
NLayoutContent,
NLayoutFooter,
NThemeEditor,
NButton,
NInputGroup,
NInput,
NForm,
NFormItem,
NPopconfirm,
NModal,
NMessageProvider

} from "naive-ui";

import { NwIcon, NwFormViewer } from '@platform/main'

export default defineComponent({
components: {
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NThemeEditor,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NModal,
    NMessageProvider,
    NwIcon,
    NwFormViewer
},
setup(props,context) {
    const FormRef = ref()
    const FormUrl = ref('')

    let loaded: any; // 正常加载
    let catchErr: any; // 错误
    const loadForm = async (url: string) => {
        FormUrl.value = url
        console.log('1====加载表单页面url====', url);
        console.log('2====开始等待表单页面返回====');
        await new Promise((resolve, reject) => {
            //
            loaded = resolve
            catchErr = reject
            FormRef.value.reload(url)
        })
    }
    context.expose({
        loadForm,
        setValue: (d: any) => {
            FormRef.value.setValue(d)

        },
        getValue: () => {
            return FormRef.value.getValue()

        },
        setRules: (d: any) => {
            FormRef.value.setRules(d)
        },
        runScript: (name: string, params: Array<any>) => {
            return FormRef.value.runScript(name, params)
        },
        validate: () => {
            return FormRef.value.validate()
        }
    })
    // return {
    //     formViewerRef,
    //     loadForm (src: string) {

    //     }
    // };
    return () => {
        return <NwFormViewer
            ref={e => FormRef.value = e}
            src={FormUrl.value}
            onInited={(e) => {
                console.log('7========表单页面加载完成=调用Inited=', e)
                if (e) {
                    // 抛出错误
                    catchErr(e)
                } else {
                    loaded && loaded()
                }
            }}
        />
    }
}
});
</script>
<style lang="less">
.form-viewer {
    // display: flex;
    // flex-direction: column;
    // >.header {
    //     flex: 0 0 32px;
    //     border-bottom: 1px solid #ccc;
    // }
    // >.content {

    // }
}
</style>