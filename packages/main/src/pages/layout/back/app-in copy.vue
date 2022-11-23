
<template>
    <div
        :class="{
            box: true,
            action: AppInAction
        }"
    >
        <div class="box-header">
            <div class="title">
                <span style="margin-right: 20px;">应用系统</span>
            </div>
            <div class="extra">
                <nw-icon
                    name="icon-n-y-close"
                    color="#5F6B7C"
                    @click="AppInAction = false"
                />
            </div>
        </div>
        <div class="box-content">
            <div class="app-search">
                
                <n-input-group style="width: 300px">
                    <n-input-group-label>
                        搜索应用
                    </n-input-group-label>
                    <n-input placeholder="输入查询关键字" />
                </n-input-group>
            </div>
            <div  class="app-groups">
                <n-scrollbar class="app-groups-scroll" >
                    <n-divider title-placement="left">
                        预探评价
                    </n-divider> 
                    <div class="app-group">
                        <div class="app-card">     
                            <nw-icon
                                name="icon-n-y-3box"
                                :size="46"
                                color="#5F6B7C"
                                @click="AppInAction = false"
                            />
                            <div class="text">
                                评价管理系统
                            </div>
                        </div>
                        <div class="app-card">     
                            <nw-icon
                                name="icon-n-y-3box"
                                :size="46"
                                color="#5F6B7C"
                                @click="AppInAction = false"
                            />
                            <div class="text">
                                评价管理系统
                            </div>
                        </div>
                        <div class="app-card">     
                            <nw-icon
                                name="icon-n-y-3box"
                                :size="46"
                                color="#5F6B7C"
                                @click="AppInAction = false"
                            />
                            <div class="text">
                                评价管理系统
                            </div>
                        </div>
                        <div class="app-card">     
                            <nw-icon
                                name="icon-n-y-3box"
                                :size="46"
                                color="#5F6B7C"
                                @click="AppInAction = false"
                            />
                            <div class="text">
                                评价管理系统
                            </div>
                        </div>
                        <div class="app-card">     
                            <nw-icon
                                name="icon-n-y-3box"
                                :size="46"
                                color="#5F6B7C"
                                @click="AppInAction = false"
                            />
                            <div class="text">
                                评价管理系统
                            </div>
                        </div>
                        <div class="app-card">     
                            <nw-icon
                                name="icon-n-y-3box"
                                :size="46"
                                color="#5F6B7C"
                                @click="AppInAction = false"
                            />
                            <div class="text">
                                评价管理系统
                            </div>
                        </div>
                    </div>
                    <n-divider title-placement="left">
                        预探评价
                    </n-divider> 
                    <div class="app-group">
                        <div class="app-card">     
                            <nw-icon
                                name="icon-n-y-3box"
                                :size="46"
                                color="#5F6B7C"
                                @click="AppInAction = false"
                            />
                            <div class="text">
                                评价管理系统
                            </div>
                        </div>
                    </div>
                    <n-divider title-placement="left">
                        预探评价
                    </n-divider> 
                    <div class="app-group">
                        <div class="app-card">     
                            <nw-icon
                                name="icon-n-y-3box"
                                :size="46"
                                color="#5F6B7C"
                                @click="AppInAction = false"
                            />
                            <div class="text">
                                评价管理系统
                            </div>
                        </div>
                    </div>
                </n-scrollbar>
            </div>
        </div>
    </div>
</template>
<script lang="ts">

import { h, ref, toRefs, reactive, defineComponent, watch, nextTick } from 'vue'
import {
    NConfigProvider,
    NSpace,
    NTag,
    NDivider,
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
    NInputGroupLabel,
    NInput,
    NForm,
    NFormItem,
    NPopconfirm,
    NScrollbar,
    useMessage,
} from "naive-ui";

import { NwIcon, RequestPaging, VxeHelper } from '@platform/main'

import { AppInAction } from '../store'

export default defineComponent({
    props: {
    },
    components: {
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NDivider,
        NButton,
        NSpace,
        NwIcon,
        NInput,
        NInputGroup,
        NInputGroupLabel,
        NDrawer,
        NScrollbar,
        NDrawerContent
    },
    setup (props) {
        return {
            AppInAction
        }
    }
})

</script>

<style scoped lang="less">
.box {
    position: absolute;
    flex-direction: column;
    display: flex;
    top: 108px;
    left: -600px;
    border: 0px solid #999;
    background-color: #F6F7F9; // F6F7F9
    width: 600px;
    height: 400px;
    box-shadow: 1px 1px 4px 1px #999;
    transition: .2s;
    &-header {
        display: flex;
        justify-content: space-between;
        height: 36px;
        // border-bottom: 1px solid #000;
        align-items: center;
        padding: 0 10px;
        >.title {
            font-size: 16px;
            font-weight: bold;
        }
        >.extra {
            >.icon {
                cursor: pointer;
            }
        }
    }
    &.action {
        left: 48px;
    }
    &-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        >.app-search {
            padding: 10px;
        }
        >.app-groups {
            height: 310px;
            display: flex;
            margin: 2px;
            background-color: #fff;

            box-shadow: inset 1px 1px 4px 1px #999;
            // &-scroll {
            //     height: 200px;
            // }
            .n-divider {
                margin-top: 24px;
                margin-bottom: 0px;
            }
            .app-group {
                display: flex;
                padding: 0 20px 10px 20px;
                flex-wrap: wrap;
                .app-card {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;
                    font-size: 14px;
                    position: relative;
                    overflow: hidden;
                    width: 120px;
                    height: 40px;
                    // border: 1px solid #ccc;
                    // box-shadow: 0 0 3px 3px #607d8b;
                    box-shadow: 1px 1px 4px 1px #607d8b;
                    background-color: #fff;
                    cursor: pointer;
                    margin-right: 15px;
                    margin-top: 15px;
                    >.icon {
                        position: absolute;
                        left: -5px;
                        top: -5px;
                        
                        z-index: 1;
                        opacity: .2;
                    }
                    &:hover {
                        box-shadow: 0 0 3px 3px #607d8b;
                        // background-color: red;
                    }
                }
            }
        }
    }
}
</style>
