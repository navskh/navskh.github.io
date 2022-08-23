---
layout: post
title: Vuejs3 - 21 Provide, Inject
subtitle : Provide, Inject
tags: [Vue3]
author: Young
comments : False
---

## 컴포넌트간의 데이터 전달

만약에 깊이 있는 컴포넌트에 데이터 전달 해야할 때는

props로는 너무 어려움..

Provide/Inject 를 그래서 사용한다


자식 컴포넌트에 데이터를 전달하려면 

provide 함수를 사용한다.

## Provide 함수

provide(문자열, 문자열)

root 컴포넌트 
 ㄴ ProvideInject
  ㄴ child
   ㄴ DeepChild

이렇게 되어있는 구조에서 
ProvideInject 를 사용하여 DeepChild로 데이터를 전달할 것이다.

## 사용법

```js
// ProvideInject.vue
setup() {
		const staticMessage = 'static message';
		const message = ref('message');
		const count = ref(10);
		provide('static-message', staticMessage);
		provide('message', message);
		provide('count', count);
		return {};
},
```

위와 같이 provider에 등록

```js
// DeepChild.vue
setup() {
		const staticMessage = inject('static-message');
		const message = inject('message');
		const count = inject('count');

		return { staticMessage, message, count };
},
```
위와 같이 Inject 함수를 사용해서 가져올 수 있다

값을 입력하지 않았을 때, default value를 정의할 수도 있고

또 child에서 값을 바꿀 수도 있다

그러나 child에서 Provider 값을 바꿀 때는
그냥 막 바꾸기 보단, 
provider에서 update 함수를 만들어서 제공해주는 것이 좋다.

```js
const message = ref('message');
const updateMessage = () => {
  message.value = message.value + '!';
};
provide('message', { message, updateMessage });
```

위와 같이 사용하며

```js
const { message, updateMessage } = inject('message');
// message.value = message.value + '!';
// 이렇게하지말고, provider에서 업데이트 함수 제공하라!
updateMessage();
```

사용할 때는 구조분해 할당으로 가져와서 사용한다.

message.value = message.value + '!';

그러나 이렇게 사용한다 해도 수정은 된다

기능은 열려있음

수정을 막으려면 readonly를 사용할 것.

```js
provide('message', { message: readonly(message), updateMessage });
```

이렇게 사용하면 수정을 막아줄 수 있다.

## Symbol

대규모 애플리케이션에서 다른 개발자와 함께 작업하는 경우 잠재적 충돌을 피하기 위해
Symbol 주입 키를 사용하는 것이 좋다.

Symbol()을 씀으로써 얘는 Provider에 저장할 애야 

뭐 이런 느낌인가보다..

## App-level Provide 

vue dev tools에서

모든 컴포넌트는 App의 자식 컴포넌트임.

그러므로 main.js에서

```js
app.provide('app-message', 'app message 입니다.');
```

이렇게 사용하면
```js
const appMessage = inject('app-message');
```

어디서든 이렇게 가져와서 사용할 수 있다.

## 실무에서..
Provide/Inject를 실무에서 어떻게 사용할 것이냐

vue 2 의 경험이 있다면 알 것임
app 인스턴스에는 config.globlaProperty라는 애가 있음

```js
mounted(){
  console.log(this.msg)
}
```

뭐 이렇게 사용할 수 있음.

그러나 vue 2의 경우에는 mounted라는 life cycle hook이 있어서 사용할 수 있었으나

vue3 에서는 setup에다가 위와 같이 사용할 수없으므로

provide를 쓴다...

