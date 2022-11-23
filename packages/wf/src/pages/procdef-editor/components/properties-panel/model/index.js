
const modelFiles = import.meta.globEager('./*.vue')
const modelMap = {}
Object.keys(modelFiles).forEach(key => {
    const m = modelFiles[key].default
    modelMap[m.name] = m
})
export default modelMap