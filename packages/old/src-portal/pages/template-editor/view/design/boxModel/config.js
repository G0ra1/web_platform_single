// tag类型

const elements = {
    // 布局
    'n-layout': {

    },
    'n-layout-header': {
        
    },
    'n-layout-content': {
        
    },
    'n-layout-footer': {
        
    },
    'n-grid': {

        // 获取样式
        getStyle: ({
            tagName,
            attributes
        }) => {
            const colsAttr = attributes.find(d => d.key === ':cols' || d.key === 'cols')
            attr.style = {
                width: '100%',
                display: 'grid',
                gridTemplateColumns: `repeat(${colsAttr ? colsAttr.value : 24}, minmax(0px, 1fr))`,
                columnGap: '5px',
                rowGap: '5px',
                marginBottom: '5px'
            }
        }
    },
    'n-gi': {

        // 获取样式
        getStyle: () => {

        }
    },
    // -----------
    

}
export default {
    
}