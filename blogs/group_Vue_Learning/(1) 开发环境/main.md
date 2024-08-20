# Vue3 开发环境

## 环境

- node.js 15.0+

## 项目创建

- 命令行运行：
  
  ```bash
  npm init vue@latest
  ```

- 此命令会创建一个基于`Vite`（构建工具）的 Vue3 项目，并有命令行输出：
  
  ```bash
  > npx
  > create-vue
  
  Vue.js - The Progressive JavaScript Framework
  
  √ 请输入项目名称： ... vue-project
  √ 是否使用 TypeScript 语法？ ... 否 / 是
  √ 是否启用 JSX 支持？ ... 否 / 是
  √ 是否引入 Vue Router 进行单页面应用开发？ ... 否 / 是
  √ 是否引入 Pinia 用于状态管理？ ... 否 / 是
  √ 是否引入 Vitest 用于单元测试？ ... 否 / 是
  √ 是否要引入一款端到端（End to End）测试工具？ » 不需要
  √ 是否引入 ESLint 用于代码质量检测？ ... 否 / 是
  √ 是否引入 Prettier 用于代码格式化？ ... 否 / 是
  √ 是否引入 Vue DevTools 7 扩展用于调试? (试验阶段) ... 否 / 是
  
  正在初始化项目 E:\Code\Projects\vue-project...
  
  项目初始化完成，可执行以下命令：
  
  cd vue-project
  npm install
  npm run format
  npm run dev
  ```

- 进入项目并安装依赖：
  
  ```bash
  cd <project-name>
  npm install
  ```

- 运行项目：
  
  ```bash
  npm run dev
  ```

- 项目结构：
  
  ```bash
  ---project dir
   |- node_modules/        node模块
   |- public/              全局的资源文件夹，一般使用绝对路径/...访问
   |- src/
   |   |- assets           资源文件夹，不仅存储图片资源，还有css等
   |   |- components/      存放组件
   |   |   |- *.vue        各类组件的源代码(.vue文件)
   |   |- router/          存放路由配置文件(项目刚创建时没有)
   |   |- views/           存放各个页面(项目刚创建时没有)
   |   |- App.vue          根组件
   |   |- main.js          vue项目入口文件
   |- index.html           html框架
   |- package.json         包配置文件
   |- vite.config.js       vite配置文件
   |- jsconfig.json
  ```
