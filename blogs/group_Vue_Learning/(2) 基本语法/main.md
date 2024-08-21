# Vue基础语法

## 模板语法

  Vue使用模板语法使页面中的内容可根据变量动态地决定

  语法：`{{ 表达式 }}`
  
  ```html
  <template>
    <h4>{{ msg }}</h4>
    <p>{{ ok? "ok" : "no"}}</p>
  <template>

  <script>
    export default {
      data() {
        return {
          msg: "My message",
          ok: true,
        }
      }
    }
  </script>
  ```

  页面中的`<h4>`标签中的内容会根据程序逻辑返回的msg变量决定

  而`<p>`标签中的内容有`ok`决定

## 属性绑定

  Vue中变量还可以用于绑定标签的属性

  语法:`v-bind:属性="表达式"`

  或者简写:`:属性="表达式"`

  **_表达式必须返回一个字符串_**

  ```html
  <template>
    <h4 v-bind:id="dynamicId">Content1</h4>
    <h4 :class="dynamicClass">Content2</h4>
  <template>

  <script>
    export default {
      data() {
        return {
          dynamicId: "my_id",
          dynamicClass: "my_class",
        }
      }
    }
  </script>
  ```

## 条件渲染

  条件性地渲染一块内容，根据表达式返回的bool值决定是否渲染

  语法:

- `v-if="表达式"`
- `v-else-if="表达式"`
- `v-else`
- `v-show="表达式"`

```html
<template>
  <p v-if="a">Content1</p>
  <p v-else-if="b">Content2</p>
  <p v-else>Content3</p>

  <p v-show="c">Content4</p>
<template>

<script>
  export default {
    data() {
      return {
        a: false,
        b: true,
        c: true,
      }
    }
  }
</script>
```
  
  `v-if` `v-else-if`与`v-else`就如同字面意思
  
  **关于`v-show`与`v-if`:**
  
- `v-show`在其中的表达式的值变化时，只会改变对象的`style`属性中的`display`来实现显示和隐藏，但在页面加载时就渲染
  
    **_初始开销大，变化时开销较小，适用于频繁切换的对象_**
- `v-if`在其中的值变化时，会销毁或重新渲染对象，，但在表达式变为true之前不会渲染
  
    **_初始开销小，变化时开销大，使用与不频繁切换的对象_**

## 列表渲染

  渲染一个列表或一个对象中的内容

  语法: `v-for="item in/of 列表/对象"`(使用`in`或`of`均可)

  ```html
  <template>
    <ul>
      <li v-for="item in list">{{ item }}</li>
      <li v-for="(item, index) of list">{{ index }} {{ item }}</li>
    </ul>

    <ul>
      <li v-for="value in myObject">
        {{ value }}
      </li>
      <li v-for="(value, key) in dict">
        {{ key }}: {{ value }}
      </li>
      <li v-for="(value, key, index) in dict">
        [{{ index }}] {{ key }}: {{ value }}
      </li>
    </ul>
  <template>

  <script>
    export default {
      data() {
        return {
          list: [1, 2, 3, 4],
          dict: {
            key1: "value1",
            key2: "value2",
            key3: "value3"
          }
        }
      }
    }
  </script>
  ```

  可以使用结构语法获得`item`、`index`、`value`、`key`，如上

## 列表渲染中使用key属性

  使用`v-for`渲染列表或对象时，如果列表或对象中数据的顺序变了，而值没有变，Vue不会修改DOM元素的顺序，而是直接重新渲染，这样的开销较大

  为了解决这个问题，可以在渲染时给每个元素加上`key`属性，使Vue能够跟新DOM元素的顺序而不是重新渲染

  ```html
  <template>
    <ul>
      <li v-for="item in list" :key="item.key">{{ item.value }}</li>
    </ul>
  <template>

  <script>
    export default {
      data() {
        return {
          list: [
            {
              value: 1,
              key: "AEVCDUE",
            },
            {
              value: 2,
              key: "CVUASDN",
            },
            {
              value: 3,
              key: "XICUBND",
            },
          ]
        }
      }
    }
  </script>
  ```

  其中的`key`应该只与数据有关，实际开发中应该是从后端返回的表示这段数据的唯一的`key`
