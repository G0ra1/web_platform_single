const partFiles = Object.entries(import.meta.globEager('./**/index.js'))
const parts = []
export const partInstance = {}
partFiles.forEach(([ k, v ]) => {
  const partType = k.split('/')[1]
  parts.push(v['default'])
  partInstance[partType] = v.instance
})

// const usePart = {
//   'PList': usePartPList
// }
export default parts

