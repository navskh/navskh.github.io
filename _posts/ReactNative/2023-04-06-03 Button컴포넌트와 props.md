---
layout: post
title: Button, props
subtitle: React Native 강의 03강
tags: [React Native]
author: Young
comments: True
---

{%raw%}

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

-   타이틀 : 대문자
-   백그라운드 컬러 : 파란색

ios

-   타이틀 : 그대로
-   백그라운드 컬러 : 없음

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

커스텀 컴포넌트를 만들때 구조분해 할당을 해주기 위해서
PropTypes라는 라이브러리를 설치해주고

```
npm i prop-types
```

아래와 같이 설정해주면 된다.

```jsx
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const Button = ({ title }) => {
	return (
		<>
			<Text>{title}</Text>
		</>
	);
};

Button.PropTypes = {
	title: PropTypes.string,
};

export default Button;
```

prop Types 에서 전달해주는 변수의
필수 값인지 여부를 세팅해줄 수 있다.

```jsx
Button.defaultProps = {
	title: 'Button',
};

Button.propTypes = {
	title: propTypes.string.isRequired,
};
```

위와 같이 작업해주면, isRequired 정보를 통해 필수값 체크를 해주고

값이 없으면 defaultProps.에 설정한 값을 넘기게 된다.

## Button 컴포넌트

Touch에 대한 메서드

#### TouchableOpacity

```jsx
<TouchableOpacity
	onPress={() => console.log('click')}
	style={{ backgroundColor: 'red' }}
>
	<Text>{title}</Text>
```

위와 같이하면 클릭시 투명해졌다가 다시 돌아온다.

#### TouchableHighlight

```jsx
<TouchableHighlight
	onPress={() => console.log('click')}
	style={{ backgroundColor: 'red' }}
	underlayColor={'orange'}
>
	<Text>{title}</Text>
</TouchableHighlight>
```

위와 같이하면 클릭시 오렌지색으로 바뀌었다가 다시 돌아온다.

#### 추가적으로 Pressable 컴포넌트도 있음

차이점은 효과를 지정할 수 있다.

```jsx
const Button = ({ title }) => {
	return (
		<>
			<Pressable
				onPress={() => console.log('click')}
				style={({ pressed }) => {
					return [
						{ backgroundColor: 'red' },
						pressed && { backgroundColor: 'orange', opacity: 0.3 },
					];
				}}
			>
				<Text>{title}</Text>
			</Pressable>
		</>
	);
};
```

위와 같이 작업하면,

초기 색상 : 빨간색
클릭 시 : 오렌지 색
으로 동작한다.

추가적으로

-   onPressIn (손 찍으면)
-   onPressOut (손 떼면)
-   onPress (손 찍었다가 떼면)
-   onLongPress (꾹 누르면)

```jsx
<Pressable
	onPress={() => console.log('click')}
	onPressIn={() => console.log('in')}
	onPressOut={() => console.log('out')}
	onLongPress={() => console.log('Long')}
	delayLongPress={2000}
	style={({ pressed }) => {
		return [
			{ backgroundColor: 'red' },
			pressed && { backgroundColor: 'orange', opacity: 0.3 },
		];
	}}
>
	<Text>{title}</Text>
</Pressable>
```

## 계산기 버튼 만들기

색상에 대해서는
Material Design Color Tool

-   https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=2196F3

Tailwind CSS Colors

-   https://tailwindcss.com/docs/customizing-colors

아래 링크를 참고하자.

아래 컴포넌트를 만들면 버튼 컴포넌트를 만들 수 있다.

```jsx
import {
	Pressable,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native';
import propTypes from 'prop-types';

export const ButtonTypes = {
	NUMBER: 'NUMBER',
	OPERATOR: 'OPERATOR',
};

const Colors = {
	NUMBER: ['#71717a', '#3f3f46'],
	OPERATOR: ['#f59e0b', '#b45309'],
};

const Button = ({ title, onPress, buttonStyle, buttonType }) => {
	return (
		<>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => {
					return [
						styles.button,
						{
							backgroundColor: Colors[buttonType][0],
						},
						pressed && {
							backgroundColor: Colors[buttonType][1],
						},
						buttonStyle,
					];
				}}
			>
				<Text style={styles.title}>{title}</Text>
			</Pressable>
		</>
	);
};

Button.defaultProps = {
	buttonType: ButtonTypes.NUMBER,
};

Button.propTypes = {
	title: propTypes.string.isRequired,
	onPress: propTypes.func.isRequired,
	buttonStyle: propTypes.object,
	buttonType: propTypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 50,
		color: '#ffffff',
	},
});

export default Button;
```

버튼을 위와 같이 내가 커스터마이징을 할 수 있다는 점이
참 신선한것 같다.

{%endraw%}
