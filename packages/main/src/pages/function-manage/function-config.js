export const deleteConfig = {
    
    basic: {
        fullName: '删除功能模块', // 功能全称
        shortName: '删除', //
        width: '280px',
        height: '170px'
    },
    // 程序脚本
    script: [
        {
            key: 'init',
            isAsync: false,
            code: `
                console.log('=Params==', Params)
                Utils.SetDialogText(\`是否删除该功能模块：\${Params.fullName}\`)
                return true
            `
        },

        {
            key: 'deleteScript',
            isAsync: true,
            code: `
                Utils.SetSpin(true, '正在删除...')
                const r = await Request({
                    url: \`/main/mdmCpts/\${Params.id}\`,
                    method: 'delete'
                })
                .then(r => {
                    window.$message.success('功能模块删除成功')
                    return true
                })
                .catch(error => {
                    window.$message.error('功能模块删除失败')
                    return false
                })
                Utils.SetSpin(false)
                Utils.DispatchEvent('complete')
                return r
            `
        }
    ],
    content: {
        type: 'dialog'
    },
    buttons: [
        {
            align: 'right', // 左显示或右显示
            disabled: false,
            text: '删除',   // 按钮文字
            type: 'error',   // 按钮类型
            id: 'delete',     // 按钮唯一Code
            script: 'deleteScript' // 按钮对应的脚本
        }
    ]
}
