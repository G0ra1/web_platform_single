const { resolve } = require('path')
export default (pageItem) => {
  const options = {}
  pageItem.forEach(({
    systemName,
    file,
    fileName
  }) => {
    options[`${systemName}-${fileName}`] = resolve(__dirname, `../../${file}`)
  })
  return options
}