# 计算属性、Class与Style绑定

## 计算属性

使用模板语法显示内容时，有时可能会包含复杂的逻辑，这是可以将逻辑提炼到计算属性当中

```html
<template>
  <p v-if="is_show">{{ my_content }}</p>
<template>

<script>
  export default {
    data() {
      return {
        my_list: ["a", "b", "c"]
      }
    },
    computed: {
      my_content() {
        return this.my_list.length > 0 ? "yes" : "no";
      },
      is_show() {
        return this.my_list.length > 0;
      }
    }
  }
</script>
```

这里将`my_content`写在`computed`中，在模板语法中可以直接引用它（**_无需添加括号_**）。

- 计算属性与method的区别：

  上面的代码也可以使用method实现（**_注意引用时要添加括号_**）

  ```html
  <template>
    <p v-if="is_show()">{{ my_content() }}</p>
  <template>

  <script>
    export default {
      data() {
        return {
          my_list: ["a", "b", "c"]
        }
      },
      method: {
        my_content() {
          return this.my_list.length > 0 ? "yes" : "no";
        },
        is_show() {
          return this.my_list.length > 0;
        }
      }
    }
  </script>
  ```

  **_区别：计算属性会缓存已经计算的数据，如果与计算属性相关的值没有变，就不会重新计算。而method方法会在每次定义时都被调用。_**

## Class绑定

标签的`Class`作为一个属性，可以用模板语法为其绑定值，而使用模板语法拼接字符串时较为麻烦，因此可以使用特殊的Class绑定语法

```html
<template>
  <!--使用普通的模板语法，注意 :class="" 中的表达式返回的是一个字符串，且需要考虑字符串拼接时中间留有空格-->
  <p :class="my_class_1+' active'">Some content 1</p>


  <!--使用对象绑定class，表达式最终返回一个对象，对象的key表示class名称（可以是字符串，也可以直接写）-->
  <!--value为bool型，其真假决定了该class最后是否被添加-->
  <p :class="{ 'class_2': true, active: is_active_2 }">Some content 2</p>
  <!--也可以使用计算属性、data()的返回值，只要表达式返回对象即可-->
  <p :class="my_class_3">Some content 3</p>


  <!--使用列表绑定，列表中所有元素都被添加到class中-->
  <p :class="my_class_4">Some content 4</p>

  <!--两者混用-->
  <p :class="['my_class_5', {active: is_active_5}]">Some content 5</p>
<template>

<script>
  export default {
    data() {
      return {
        my_class_1: "class_1",
        is_active_2: true,
        is_active_3: false,
        my_class_4: ["class_4", "active"],
        is_active_5: true,
      }
    },
    computed: {
      my_class_3() {
        return {
          class_3: true,
          active: this.is_active_3，
        }
      }
    }
  }
</script>
```

## Style绑定

与Class绑定类似，Style绑定时，表达式可以返回一个对象，或者一个元素为对象的列表

注意写对象时不要像写CSS一样用分号`;`结尾，**必要时也可以使用计算属性**

```html
<template>
  <p :style="style_1">Some content 1</p>

  <!--使用列表时，其元素为对象，Vue会将各个对象的属性合并后应用于这个标签-->
  <p :style="[style_1, style_2]">Some content 2</p>
<template>

<script>
  export default {
    data() {
      return {
        style_1: {
          color: "yellow",
          backgroud_color: "blue",
        },
        style_2: {
          border-radius: 5px,
          border: 3px solid green,
        }
      }
    },
  }
</script>
```
