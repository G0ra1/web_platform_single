import getHtml from './utils/getHtml'

interface PageItem {
    // systemName: string,
    type: 'form' | 'page',
    fileName: string,
    dir: string,
    file: string
}
interface Fs {
    existsSync: Function,
    readdirSync: Function,
    writeFileSync: Function,
    mkdirSync: Function
}
interface OptionsInput {
    [k: string]: string
}
type GetHtmlPath = (file: string) => string
type BuildHtml = (fs: Fs, ghp: GetHtmlPath, base: string) => OptionsInput

// const generateRollOptionsInput = (pageItem: Array<PageItem>) => {
    
// }
const BuildHtml: BuildHtml = (fs, ghp, base) => {
    const pageItems:Array<PageItem> = []
    if (!fs.existsSync(`./pages`)) {
    
        fs.mkdirSync(`./pages`, function(err) {
          err && console.log(err)
        })
    }

    if (!fs.existsSync(`./forms`)) {
    
        fs.mkdirSync(`./forms`, function(err) {
          err && console.log(err)
        })
    }
    
    // 生成form
    if (fs.existsSync("./src/forms")) {

        fs.readdirSync("./src/forms").forEach((p) => {
            console.log('========', p)
            // 判断src 目录
            // 这里需要检测文件夹是否合规
            if (!fs.existsSync(`./src/forms/${p}/main.ts`)) {
                console.log("\x1b[31m", " >", p, `./forms/${p}`,"检测到不合规的功能目录, 未含有main.ts");
                return;
            }
            // 创建页面对象用于
            pageItems.push({
                // systemName,
                type: 'form',
                fileName: p,
                dir: `./forms`,
                file: `./forms/${p}.html`,
            })
            // 创建页面html
            fs.writeFileSync(
                `./forms/${p}.html`,
                getHtml(`${p}`, `/src/forms/${p}/main.ts`, base),
                function(err) {
                    err && console.log(err)
                }
            )
        })
        
    } else {
        console.log("\x1b[31m", "未检测到Forms表单目录");
    }
    // 生成html page
    if (fs.existsSync("./src/pages")) {
        fs.readdirSync("./src/pages").forEach((p) => {
            console.log('========', p)
            // 判断src 目录
            // 这里需要检测文件夹是否合规
            if (!fs.existsSync(`./src/pages/${p}/main.ts`)) {
                console.log("\x1b[31m", " >", p, `./pages/${p}`,"检测到不合规的功能目录, 未含有main.ts");
                return;
            }
            // 创建页面对象用于
            pageItems.push({
                // systemName,
                type: 'page',
                fileName: p,
                dir: `./pages`,
                file: `./pages/${p}.html`,
            })
            // 创建页面html
            fs.writeFileSync(
                `./pages/${p}.html`,
                getHtml(`${p}`, `/src/pages/${p}/main.ts`, base),
                function(err) {
                    err && console.log(err)
                }
            )
        })
    } else {
        console.log("\x1b[31m", "未检测到Pages页面目录");
    }

    const options: OptionsInput  = {}
    pageItems.forEach(({
      type,
      file,
      fileName
    }) => {
      options[`${type}-${fileName}`] = ghp(file)
    })
    return options
}
export default BuildHtml