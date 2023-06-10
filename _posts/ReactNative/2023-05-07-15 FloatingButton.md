---
layout: post
title: Floating Button
subtitle: React Native 강의 15강
tags: [React Native]
author: Young
comments: True
---

## FloatingActionButton

화면위에 떠있는 버튼

FAB 버튼이라고 한다.

아래에 추가하여 버튼형태로 만드는 것임.

거의 커스터마이징을 하나씩 해주는데, 이거 그냥 이미 있는거 쓰면 안되나 하는생각이 강하게 든다.

```jsx
import {
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY, WHITE } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

const InputFAB = () => {
	const [text, setText] = useState('');
	const [isOpened, setIsOpened] = useState(false);
	const inputRef = useRef(null);
	const windowWidth = useWindowDimensions().width;

	const open = () => {
		setIsOpened(true);
		inputRef.current.focus();
	};

	const close = () => {
		setIsOpened(false);
		inputRef.current.blur();
	};

	const onPressButton = () => (isOpened ? close() : open());
	return (
		<>
			<View
				style={[
					styles.container,
					isOpened && { width: windowWidth - 20 },
				]}
			>
				<TextInput
					ref={inputRef}
					value={text}
					onChangeText={setText}
					style={styles.input}
					autoCapitalize="none"
					autoCorrect={false}
					textContentType="none"
					keyboardAppearance="light"
					returnKeyType="done"
					onBlur={close}
				/>
			</View>
			<Pressable
				style={({ pressed }) => [
					styles.container,
					pressed && { backgroundColor: PRIMARY.DARK },
				]}
				onPress={onPressButton}
			>
				<MaterialCommunityIcons name="plus" size={24} color={WHITE} />
			</Pressable>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 30,
		right: 10,
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: PRIMARY.DEFAULT,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		color: WHITE,
		paddingLeft: 2,
		paddingRight: 70,
	},
});
export default InputFAB;
```

## Keyboard Add Listener

다만 위와 같이 했을 때
키보드가 버튼을 가려버림(Ios의 경우만)

```jsx
useEffect(() => {
	Keyboard.addListener('keyboardWillShow', e => {
		console.log(';show:', e);
	});
}, []);
```

위와 같이 사용할 시, 이벤트 리스너를 추가해주는 것이므로
로그아웃 후에 다시 들어온다고 가정하면
그 때마다 이벤트 리스너가 추가되어 반복해서 실행해주는 것을 볼 수 있음.

그렇게 되면 안되기 때문에
정리함수라는 것을 써준다.

이벤트 리스너 마지막에

```js
return () => {};
```

이렇게만 넣어주면 된다.

만약에 useEffect 안에 상태변수가 있을 시,
그 상태변수가 바뀌는 것을 따라서,
정리, 다시 실행 되는 식으로 동작함을 알 수 있다.

```jsx
useEffect(() => {
	const show = Keyboard.addListener('keyboardWillShow', e => {
		console.log(';show:', e);
	});

	return () => {
		show.remove();
	};
}, []);
```

결론적으로 위와 같이 해주면 이벤트를 제거해줄 수 있다.

## 그림자 만들기

그림자 설정하는 방법

-   shadowColor
-   shadowOffset (ios)
-   shadowOpacity (ios)
-   shadowRadius (ios)

플랫폼에 제한이 됨

Android에서는
elevation 이라는 애를 사용해야함.

## 애니메이션 만들기

Animated 를 사용하면 됨
value는 useRef 를 사용해서

```jsx
const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;
```

위와 같이 사용해주면 됨

그 다음 View 컴포넌트를

Animated.View 로 변경해주면 됨.

timing이라는 함숨를 통해서 시간을 정할 수 있음.

open, close 함수 코딩

```jsx
const open = () => {
	setIsOpened(true);
	Animated.timing(inputWidth, {
		toValue: windowWidth - 20,
		useNativeDriver: false,
		duration: 300,
	}).start(() => {
		inputRef.current.focus();
	});
};

const close = () => {
	setIsOpened(false);
	Animated.timing(inputWidth, {
		toValue: BUTTON_WIDTH,
		useNativeDriver: false,
		duration: 300,
	}).start(() => {
		inputRef.current.blur();
	});
};
```

## spring을 써서 버튼 돌리기

-   버튼을 돌려서 X 로 만들어보겠다.

```jsx
const buttonRotation = useRef(new Animated.Value('0deg')).current;
```

그러나 Animated에는 문자가 올수 없음
그러므로 interpolate 를 써야 함.

```jsx
buttonRotation.interpolate({
	inputRange: [0, 1],
	outputRange: [0, 10],
});
```

위와 같이 Value가 0이면 0
Value가 1이면 10으로 매칭 시켜주는 것임.

결국 아래와 같이 작업

```jsx
const buttonRotation = useRef(new Animated.Value(0)).current;
buttonRotation.interpolate({
	inputRange: [0, 1],
	outputRange: ['0deg', '315deg'],
});
```
