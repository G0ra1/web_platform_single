const partFiles = Object.entries(import.meta.globEager('./**/index.js'))
const parts = []
partFiles.forEach(([ k, v ]) => {
  const partType = k.split('/')[1]
  parts.push(v['default'])
})

// const usePart = {
//   'PList': usePartPList
// }
export default parts

