---
layout: post
title: Vuejs3 - 24 Script Setup
subtitle : Script Setup
tags: [Vue3]
author: Young
comments : False
---

## Script Setup

syntax sugar 

이게 있어서 너무 편함.

```html
<script setup> </script>
```

이렇게 하면 setup() 을 안써도 됨!

```html
<script setup>
const msg = 'Hello World';
const message = ref('');
const sayHello = () => {
  alert('Hello World');
}
</script>
```

위와 같이 사용하면 다 쓸 수 있음

너무 편함

뒤에서 게시판에서 만들 때는 script setup 으로 만들 것임


## props, emmits 사용하기

```
defineProps ([])
defineEmmits([])
```

안에서 사용하면 된다.

## defineExpose

기본적으로 컴포넌트간의 전달이 막혀있음

노출시키고 싶으면 defineExpose를 사용해줘야 함.

이 안에 넣으면 노출이 된다고 했음.

## setup(props, context)

안에서 접근했던 애들...
useslot 등등으로 접근할 수 있다고 함.

inheritAttrs 는 script 태그 안에서 사용할 것.

## await의 사용

axios 설치

script setup 을 사용하면 그안에서 얼마든지 await을 사용할 수 있다.

