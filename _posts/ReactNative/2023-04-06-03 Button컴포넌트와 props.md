---
layout: post
title: Button, props
subtitle: React Native 강의 03강
tags: [React Native]
author: Young
comments: True
---

## Button 컴포넌트

```jsx
<Button></Button>
```

그냥 위와 같이 사용하면
에러난다.

버튼 컴포넌트에는 필수적으로 title이라는 값이
문자열로 주어져야하기 때문이다.

```jsx
<Button title="button"></Button>
```

위와 같이 만들어주면
안드로이드는

- 타이틀 : 대문자
- 백그라운드 컬러 : 파란색

ios

- 타이틀 : 그대로
- 백그라운드 컬러 : 없음

위와 같이 만들어진다.

onPress 라는 함수도 만들어줘야한다.

```jsx
<Button
	title="button"
	onPress={() => {
		console.log('click');
	}}
></Button>
```

button은 플랫폼에 상관없이 일관되게 만들어야 하므로
디자인을 통일시키는것이 좋다
=> 커스텀 컴포넌트

### 커스텀 컴포넌트
