
import generateHtml from '../utils/getHtml.js'
import Config from '../config.js'
const fs = require('fs')

// 删除文件夹
// function removeDir(dir) {
//   let files = fs.readdirSync(dir)
//   for(var i=0;i<files.length;i++){
//     let newPath = path.join(dir,files[i]);
//     let stat = fs.statSync(newPath)
//     if(stat.isDirectory()){
//       removeDir(newPath);
//     }else {
//      //删除文件
//       fs.unlinkSync(newPath);
//     }
//   }
//   fs.rmdirSync(dir)
// }
export default () => {
    
  const pageItems = [
    {
      systemName: 'main',
      fileName: 'index',
      dir: './html',
      file: './html/index.html',
    }
  ]
  // 这里前清除旧的html文件
  // fs.readdirSync("./html").forEach((d) => {
  //   if (d === 'index.html' || d === 'login.html') { return }
  //   console.log("==========\n", d);
  //   fs.readdirSync(`./html/${d}`).forEach((f) => {
  //     if (fs.existsSync(`./html/${d}/${f}`)) {
  //       fs.unlinkSync(`./html/${d}/${f}`)
  //     }
  //   })
  //   // fs.rmdirSync(`./html/${d}`)
  // })

  console.log(
    "\x1b[33m",
    "<系统初始化>",
    "\n",
    "\x1b[36m","-------检测子系统目录----------",
    "\n"
  );

  if (!fs.existsSync(`./html`)) {
    
    fs.mkdirSync(`./html`, function(err) {
      err && console.log(err)
      resolve()
    })
  }
  // 这里生成首页和登录页
  // 生成目录
  // 生成login
  // fs.writeFileSync(
  //   './html/login.html',
  //   generateHtml('登录', '/src-login/main.js'),
  //   function(err) {
  //     err && console.log(err)
  //   }
  // )
  // 生成login
  // fs.writeFileSync(
  //   './html/login-app.html',
  //   `<!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //   </head>
  //   <script type="module" src="/src-login-app/main.js"></script>
  //   </html>`,
  //   function(err) {
  //     err && console.log(err)
  //   }
  // )
  // 生成登录主页
  fs.writeFileSync(
    './html/index.html',
    generateHtml('中核集团', '/src/main.js'),
    function(err) {
      err && console.log(err)
    }
  )
  fs.readdirSync("./").forEach((d) => {
    if (d === "src" || d === "src-login" || d === "src-login-app") {
      return
    };
    if (/^src.*/.test(d)) {
      // 检测到开发目录
      console.log(
        "\x1b[32m",
        "<检测到子系统目录>",
        "\n",
        "\x1b[36m", d,
      );
      // 这里
      const systemName = d.replace('src-', '')

      // 这里根据config检测是否打包
      if (!Config[systemName] || !Config[systemName].isBuild) {
        console.log("\x1b[31m", " >", `${systemName}`,"不进行打包");
        return;
      }
      fs.readdirSync(`./${d}/pages`).forEach((p) => {
        // 这里需要检测文件夹是否合规
        // console.log(`/${d}/pages/${p}/main.js`, fs.existsSync(`./${d}/pages/${p}/main.js`))
        if (!fs.existsSync(`./${d}/pages/${p}/main.js`)) {
          console.log("\x1b[31m", " >", p, `./${d}/pages/${p}`,"检测到不合规的功能目录, 未含有main.js");
          return;
        }
        console.log("\x1b[36m", " >", p);
        pageItems.push({
          systemName,
          fileName: p,
          dir: `./html/${systemName}`,
          file: `./html/${systemName}/${p}.html`,
        })

        if (!fs.existsSync(`./html/${systemName}`)) {
          fs.mkdirSync(`./html/${systemName}`, function(err) {
            err && console.log(err)
          })
        }

        fs.writeFileSync(
          `./html/${systemName}/${p}.html`,
          generateHtml(`${systemName} ${p}`, `/${d}/pages/${p}/main.js`),
          function(err) {
            err && console.log(err)
          }
        )
      })
      console.log("\n");
    }
  })

  return pageItems
}