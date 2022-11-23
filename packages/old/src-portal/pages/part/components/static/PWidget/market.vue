<template>
    <n-drawer
        v-model:show="active"
        :default-width="502"
        placement="top"
        resizable
        :to="props.parentDom"
        :height="500"
    >
    <n-drawer-content
    header-style="padding: 5px;height: auto"
    footer-style="padding: 5px;height: auto"
    
    >
        <template #header>
            <n-space justify="start">
                <n-button
                    type="info"
                    size="tiny"
                    :text="WidgetTypeCode !== ''"
                    @click="WidgetTypeCode = ''"
                >
                        全部
                </n-button>
                <n-button
                    type="info"
                    size="tiny"
                    v-for="item in WidgetTypes"
                    :key="item.widgetTypeCode"
                    :text="WidgetTypeCode !== item.widgetTypeCode"
                    @click="WidgetTypeCode = item.widgetTypeCode"
                >
                        {{item.widgetTypeName}}
                </n-button>
            </n-space>
        </template>
            <n-spin :show="isLoading" style="height: 100%">
                <n-space justify="start">
                    <div v-for="item in ComputedWidgetList" :key="item.id">
                        <div class="widget-card">
                            <div class="preview">
                                <img :src="item.coverUrl" />
                                <div class="active-btn" >
                                    <template v-if="findWidgetIndex(item.id) >= 0">
                                        <nw-icon
                                            class="active-btn-cut"
                                            :size="20"
                                            name="icon-n-n-cut"
                                            color="#CD4246"
                                            @click="removeWidget(item.id)"
                                        />
                                    </template>
                                    <template v-else>
                                        <nw-icon
                                            class="active-btn-add"
                                            :size="20"
                                            name="icon-n-n-add"
                                            color="#238551"
                                            @click="addWidget(item)"
                                        />
                                    </template>
                                    <!-- <n-button text  size="small">
                                        
                                    </n-button> -->
                                </div>
                            </div>
                            <div class="descr">
                                {{item.widgetName}}
                                
                            </div>
                        </div>
                    </div>
                </n-space>
            </n-spin>
        <template #footer>
            <n-button size="small" @click="active = false">关闭</n-button>
        </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="jsx">
// import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
// console.log('===ej2btn===', GridComponent);
import { h, defineComponent, ref, reactive, onMounted, computed } from "vue";
import { request } from "@platform/main";
import {
    NSpin,
    NDrawer,
    NDrawerContent,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NSpace,
    NGrid,
    NGridItem,
    useMessage,
} from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import cookies from "/@/utils/cookies.js";

import {
    queryWidgetMall,
    Widget
} from './store.js'

export default defineComponent({
  props: {
    WidgetInst: {
        type: Object,
        default: () => ({})
    },
    parentDom: {
        type: Object,
        default: () => ({})
    }
  },
  components: {
    NSpin,
    NSpace,
    NDrawer,
    NDrawerContent,
    NButton,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NInputGroup,
    NInput,
    NForm,
    NFormItem,
    NGrid,
    NGridItem,
  },
  setup(props) {
    const active = ref(false)
    const isLoading = ref(false)

    const WidgetTypeCode = ref('')
    return {
        ComputedWidgetList: computed(() => {
            return Widget.WidgetList.value.filter(d => {
                if (WidgetTypeCode.value) {
                    return d.widgetTypeCode === WidgetTypeCode.value
                } else {
                    return 1
                }
            })
        }),
        WidgetList: Widget.WidgetList,
        WidgetTypes: Widget.WidgetTypes,
        WidgetTypeCode,
        active,
        props,
        isLoading,
        show: async () => {
            active.value = true
            isLoading.value = true
            await queryWidgetMall()
            isLoading.value = false
        },
        findWidgetIndex: (...p) => props.WidgetInst.findWidgetIndex(...p),
        addWidget:  (...p) => props.WidgetInst.addWidget(...p),
        removeWidget:  (...p) => props.WidgetInst.removeWidget(...p),
        handleWidget:  (...p) => props.WidgetInst.handleWidget(...p)
    };
  },
});
</script>
<style lang="less">
.widget-container.n-spin-container {
    .n-spin-content {

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
}
.widget-card {
    width: 160px;
    >.preview {
        position: relative;
        box-shadow: -2px 2px 5px 0px #ccc;
        >img {
            width: 100%;
            height: 90px
        }
        >.active-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 4px;
            position: absolute;
            right: 0;
            bottom: 0;
            border-radius: 8px 0 0 0;
            background: rgb(238, 238, 238);
            cursor: pointer;
            &-cut {
                color: #CD4246;   
            }
            &-add {
                color: #238551; 
            }
        }
    }
    >.descr {
        padding: 3px;
        text-align: center;
    }
}

</style>
