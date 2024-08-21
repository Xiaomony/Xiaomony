# 事件处理

## 添加事件响应

Vue中可以给组件添加事件响应函数

语法：`v-on:事件="语句"`

或简写为：`@事件="语句"`

>其中的语句可以是一段js语句，也是一个响应函数，**响应函数无需使用括号调用，但需要声明在`export default`中的`method`对象里**

```html
<template>
  <p>{{ count }}</p>
  <button v-on:click="count++">Add</button>
  <button @click="AddCount">Add</button>
<template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    method: {
      AddCount() {
        this.count+=1;
      }
    }
  }
</script>
```

## 事件参数

Vue中可以直接将事件触发时的event对象传递给响应函数，也可以在`v-on`中传递一些参数

- 只传递event对象：在响应函数中添加一个参数即可（`v-on`中无需添加参数）
- 只传递自定义的参数：在`v-on`中添加参数，响应事件添加对应参数
- 两者都添加：  
  调用：`@click="buttonClick(..., $event)"`  
  响应函数：`buttonClick(..., event)`

```html
<template>
  <p>{{ count }}</p>
  <button @click="AddCount1">Add</button>
  <button @click="AddCount2(4)">Add</button>
  <button @click="AddCount3($event, 6)">Add</button>
<template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    method: {
      // 只添加event对象
      AddCount1(event) {
        // Vue中的event对象就是原生Javascript中的event对象
        console.log(event);
        this.count+=1;
      }
      // 只传递自定义的参数
      AddCount2(num) {
        this.count+=num;
      }
      // 都添加
      AddCount2(num, event) {
        console.log(event);
        this.count+=num;
      }
    }
  }
</script>
```

## 事件修饰符

在处理事件时调用 `event.preventDefault()`（阻止默认事件） 或 `event.stopPropagation()`（阻止事件冒泡）是很常见的。虽然可以直接在方法内调用，但Vue提供了事件修饰符简化这一过程

>关于所有的事件修饰符的[官方文档](https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers)

示例：

```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>
```

此外的 **_[按键修饰符](https://cn.vuejs.org/guide/essentials/event-handling.html#key-modifiers)_** 和 **_[鼠标按键修饰符](https://cn.vuejs.org/guide/essentials/event-handling.html#mouse-button-modifiers)_** 参阅官方文档
