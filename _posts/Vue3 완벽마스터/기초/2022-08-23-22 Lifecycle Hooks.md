---
layout: post
title: Vuejs3 - 22 Lifecycle Hook
subtitle : Lifecycle Hook
tags: [Vue3]
author: Young
comments : False
---

## Lifecycle Hook 에 대해 알아보자..

다이어그램을 보면서 확인해봐야 한다.

가장 먼저 실행되는 hook이

setup
beforeCreate
created
beforeMount
mounted
beforeUnmount
unmounted

이런 lifecycle hook 은

options api composition api 둘다에서 사용 됨.

생성 -> 장착 -> 수정 -> 소멸 

하나씩 알아보자

## 생성

Component가 DOM에 추가되기 전이기 때문에
접근할 수 없다.

### beforeCraeate
data 안에 선언한 애가 있다고하면

이런 애들을 사용할 수 없음

### created
created 에선 사용할 수 있음

## mounted

#### onbeforeMount

컴포넌트 마운트 되기 전

setup 안에서 사용할 수 있다.



#### onMounted

컴포넌트 마운트 되고 난 후 

그리고 mounted 가 호출 됨.

여기서는 DOM에 접근할 수 있다.

ref 속성을 이용해서 이름을 지어준 후 

해당 DOM 객체를 가져올 수 있음

#### 자식 컴포넌트가 있다고 한다면

setup -> onbeforeMount 
-> 자식 setup -> 자식 onbeforeMount -> 자식 mounted
-> 부모 mounted

이런 식임

mounted 가 호출되었다는 것은 
모든 것들 다 가져왔다는 뜻임.

## Updating

onbeforeUpdate

onUpdated

반응형 상태 변경으로 인해
DOM에 적용시켜야할 때 호출됨.

onbeforeUpdate 에서는 DOM 트리 업데이트 전이기 때문에
DOM 컨텐츠는 바뀌기 전꺼를 가져옴..
Debuging 시에 사용함.

## 소멸 단계

### onBeforeUnmount

### unmounted

붙여넣었다가 뺐다가 하는 경우에
위 단계들이 호출된다.

