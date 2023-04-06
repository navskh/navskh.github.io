---
layout: post
title: React Native의 시작
subtitle : React Native 강의 01강
tags: [React Native]
author: Young
comments : True
---

## 개발환경 준비하기

환경설정은 항상 공식문서를 확인할 것.


Expo
CLI

우리는 Expo를 사용하여 할 것임

Expo의 장점
- 다양한 기능들
- 복잡한 설정 필요 없음


#### 테스트 기기

- iOS
- Android


#### 환경설정

Node js 설치

안드로이드 가상기기를 만들어야 함.
(윈도우에서는 ios 가상기기를 만들 수 있는 방법이 없음)

chocolatey 라는 걸 통해서
오픈 jdk를 설치할 수 있따.

https://chocolatey.org/

홈페이지 가서 install 부분 확인하면 되겠지만
```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

아래와 같이 입력하면 됨

에러가 안나면 문제없이 설치 된 것임.

```shell
choco
```

명령어를 입력해보면 해당 버전이 나오는 것을 확인할 수 있다.

```shell
choco install -y openjdk11
```

위와 같이 해주면 openjdk11 을 깔 수 있다.


Android Studio 를 설치

SDK tools => 31.0.0 설치

SDK Platforms 
=> Androdi SDK Platform 31
=> Intel x86_64 Atom System Image

설치

환경 변수 추가하기
- 변수 이름 : ANDROID_HOME
- 변수 값: %LOCALAPPDATA%\Android\Sdk

환경 변수 Path 편집하기
%LOCALAPPDATA%\Android\Sdk\platform-tools

Device 만들기

- Pixel 4 31 로 설정 해준다.


#### Expo 설치

```
npm i -g expo-cli
```

`expo`  라는 명령어를 통해 expo 에대한 명령어를 확인해볼 수 있다.

```
expo init my-first-rn 
> blank 선택
```

처음 프로젝트를 만들고 blank를 선택하여 빈 프로젝트를 만들어준다.

`npm start` 를 입력하여 실행한다.

이를 에뮬레이터에서 보고 싶다면
a 키를 입력

혹은 

나의 모바일 기기에서
해당 앱을 expo go 프로그램을 깔아서

qr코드 스캔 혹은

expo 에 로그인하여
(이때에는 내 핸드폰과 터미널에 모두 로그인이 되어있어야 함.)


그렇게하여 접속할 수가 있다.


#### ESLint, Prettier 

일단 두면 그냥 쓸 수 있음





일단 준비는 끝
다음부턴 실제적으로 코딩을 진행해보자.
