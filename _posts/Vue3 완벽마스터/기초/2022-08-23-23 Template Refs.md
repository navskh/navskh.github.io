---
layout: post
title: Vuejs3 - 23 Template Refs
subtitle : Template Refs
tags: [Vue3]
author: Young
comments : False
---

## Template Refs

DOM 에 직접 접근할 때 사용한다.

```html
  <input ref="input" type="text">
```
이런식의 태그가 있닫고 하면

```js
const input = ref(null);
```

부모/자식 컴포넌트를 만들어서도 접근할 수 있다.
의존도가 생기는 것이므로 반드시 필요한 경우에만 사용할 것!

