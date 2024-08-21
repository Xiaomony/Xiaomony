# 项目构成

Vue项目的基本结构：

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

其中的 **_网页_** 的“根”为`index.html`，项目的 **_入口文件_** 为`main.js`

## Vue应用实例

项目刚创建时的`index.html`：

```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
    <head>
      ……
    </head>
    <body>
        <div id="app"></div>
        <script type="module" src="src/main.js"></script>
    </body>
</html>
```

`<body>`中有一个id为app的`<div>`标签，并且将`main.js`作为一个模块引入

此时`main.js`中：

```javascript
//main.js
import "@/assets/main.css";
import { createApp } from "vue";
import App from "@/App.vue";

const app = createApp(App);
app.mount("#app");
```

- `import App from "@/App.vue";`从App.vue中导入一个App组件，而这个组件在后面被用于创建Vue应用程序实例，称为 **_根组件_**

- `createApp()`函数用于创建一个Vue应用程序实例，这里传入组件App

- `app.mount()`用于将Vue应用程序挂载到一个标签上，参数为一个CSS选择器，而`#app`选择了`index.html`中的`<div id="app"></div>`

至此，Vue应用程序已经被创建，并且被挂载到`index.html`中的`<div id="app"></div>`上，此后Vue应用程序中的所有内容最终都被渲染到这个`<div>`标签中

## 组件与根组件

项目刚创建时的`App.vue`类似以下结构

```html
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template>

<style scoped>
……
</style>
```

- `import HelloWorld from './components/HelloWorld.vue'`：

  从`HelloWorld.vue`中导入`HelloWorld`子组件

- `<HelloWorld />`： 呈现子组件

而子组件中就是使用Vue基本语法搭建的页面
