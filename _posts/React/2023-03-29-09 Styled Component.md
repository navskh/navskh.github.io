---
layout: post
title: React Styled Component
subtitle : React 강의 9강
tags: [React]
author: Young
comments : True
---

```
npm install styled-components
```

```jsx
import styled from 'styled-components'

// 스타일이 입혀진 버튼이 만들어짐
let YellowBtn = styled.button`
  background: yellow;
  color: black;
  padding: 10px;
`

let Box = styled.div`
  background: grey;
  padding: 20px;
`

// (하나의 컴포넌트 완성)
<Box>
  <YellowBtn></YellowBtn>
</Box>
```

### 장점
1. css 파일을 따로 만들 필요 없음
2. 스타일이 다른 js 파일로 오염되지 않음
3. 로딩 시간이 짧아짐
(style 태그에 주입이 되는 것이므로)


### 만약에 오렌지색 버튼이 필요하다면?

기본적으로 component 이기에
props 를 가져와서 사용해주면 된다.


```jsx
let YellowBtn = styled.button`
  background: ${props => props.bg};
  color: ${ props => props.bg == 'blue' ? 'white' : 'black'};
  padding: 10px;
`

<YellowBtn bg="blue"> 버튼 </YellowBtn>
```

위와 같이 사용하여 커스터마이징을 할 수 있다.
bg에 따라서 흰색/검은색으로 글자색상 변경도 가능하다.

스타일 복사 방법
```jsx
let NewBtn = styled.button(YellowBtn)`
`
```
위와 같이 쓰면 YellowBtn 의 속성을 가져와서 추가 속성 설정가능


### 단점 
1. JS파일이 매우 복잡해짐
2. css와 다를바 없네..
3. 협업시 css 담당의 숙련도 이슈

도입여부는 잘 생각해보자

