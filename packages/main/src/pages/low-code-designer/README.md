# 目录描述

components 组件目录
    page-panel 页面面板 编辑器面板
    setting-panel 组件右侧属性面板
    toolbar-panel 头部工具栏
    widget-panel 左侧组件待选列表
    widget-shell 组件外壳 含有拖拽组件

model 类型和抽象设计 d.ts

style 样式目录

widget-source 组件资源目录 所有可拖拽的组件都在此配置
    container 容器类型组件
        [WIDGETNAME]   组件名称
            config json描述
            designer 设计模式
            render 渲染模式
            setting 属性设置

    data 数据类型组件

    field 表单字段组件

# 