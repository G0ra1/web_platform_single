
const modelFiles = import.meta.globEager('./*/config.js')

const paletteList = []
Object.keys(modelFiles).forEach(key => {
    const model = modelFiles[key]
    paletteList.push({
        key: model.paletteKey,
        palette: model.palette
    })
})

export const palette = paletteList
export const contextPad = []