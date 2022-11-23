## 构建和运行

安装工具

```sh
# 包管理工具
npm install pnpm -g
```

```sh
# 同步运行工具
npm install concurrently -g
```

安装所有依赖，包含所有子工程依赖，项目根目录下运行:

```sh
pnpm install --frozen-lockfile
```

整体启动工程

```sh
# 启动全部工程
pnpm run all
# 打包全部工程
pnpm run build
```

进入子工程目录

```sh
# xxx 子工程目录名
cd packages/xxx
```

可以在子工程目录下运行以下命令

```sh
# 构建子工程
pnpm run build
# 运行子工程
pnpm run dev
```