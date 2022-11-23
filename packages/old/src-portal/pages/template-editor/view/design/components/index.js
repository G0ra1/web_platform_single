
const componentFiles = Object.entries(import.meta.globEager('./**.js'))
const components = []
export const componentInstance = {}
componentFiles.forEach(([k , d]) => {
//   const partType = k.split('/')[1]
//   parts.push(v['default'])
//   partInstance[partType] = v.instance
    const v = d['default']
    componentInstance[v.tagName] = v
})

// const usePart = {
//   'PList': usePartPList
// }
export default components