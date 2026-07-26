# Core Frontend UI

책의 장별 예제 코드를 모아두는 저장소입니다.

## Tech Stack

- React 19
- TypeScript 7
- Vite 8
- TanStack Router
- classnames
- Sass Modules
- Vitest

## Package Manager

이 프로젝트는 npm을 사용합니다. `package-lock.json`을 기준으로 의존성을 관리합니다.

## Getting Started

```bash
npm install
npm run dev
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## Deployment

GitHub Pages로 배포합니다. `main` 브랜치에 push되면 GitHub Actions가 빌드 후 Pages에 배포합니다.

처음 한 번만 GitHub 저장소에서 아래 설정을 켭니다.

```text
Settings > Pages > Build and deployment > Source > GitHub Actions
```

배포 주소:

```text
https://dev-study-club.github.io/core-frontend-ui/
```

Vite는 GitHub Pages 빌드에서 `/core-frontend-ui/` base path를 사용합니다. SPA 라우팅 새로고침 대응을 위해 workflow에서 `dist/index.html`을 `dist/404.html`로 복사합니다.

## Folder Structure

```text
src/
ch01/
ch02/
...
ch17/
```

주차별 폴더보다 책의 장을 기준으로 나누면 예제 코드와 학습 흐름을 다시 찾아보기 쉽습니다. 장별 폴더를 루트에 두어 저장소에 들어왔을 때 바로 원하는 장으로 이동할 수 있게 했습니다.

각 장은 아래처럼 구성합니다.

```text
ch01/
  README.md
  예지.md
  지현.md
  주혜.md
  준태.md
  창준.md
```

스터디 회차나 날짜 정보처럼 장 전체에 해당하는 내용은 각 장의 `README.md`에 기록합니다. 개인별 예제 코드와 정리는 각자 이름의 Markdown 파일에 기록합니다.

## Example Runner

브라우저에서 실행되는 예제 코드는 `src/examples` 아래에 둡니다.

```text
src/examples/
  ch01/
    yeji/
      Example.tsx
```

예제를 화면에 연결하려면 `src/examples/registry.ts`에 등록합니다.

```ts
import YejiChapter01Example from "@/examples/ch01/yeji/Example";

export const exampleEntries = [
  {
    chapterId: "ch01",
    memberId: "yeji",
    title: "Chapter 01 예제",
    description: "예제 설명",
    Component: YejiChapter01Example,
  },
];
```

팀원 ID는 아래 값을 사용합니다.

- `jihyun`: 지현
- `yeji`: 예지
- `juhye`: 주혜
- `juntae`: 준태
- `changjun`: 창준

## Chapter README

각 장의 `README.md`에는 장 전체 진행 정보를 기록합니다.

```md
# Chapter 01

## 진행 정보

- 날짜: 
- 진행: 

## 함께 볼 내용

- 
```

## Member Note Template

각 이름의 Markdown 파일에는 아래 내용을 채워 넣습니다.

````md
# Chapter 01 - 예지

## 핵심 내용

- 

## 예제 코드

- 

## 실행 방법

```bash

```

## 메모

- 
````
