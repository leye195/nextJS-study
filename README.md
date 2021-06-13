## React (SPA) 단점

사이트를 접속할 때 하나의 페이지를 불러오며, 페이지를 불러올때 모든 js 파일을 한 번에 불러옴, 페이지 이동시 받아온 파일을 활용해 UI를 변화 시키고 필요한 데이터를 json 형태로 받아서 UI를 빠르게 변화 시킬수 있다.

이러한 특징은 UX에는 좋아 장점이 되기도 하지만, 단점이 되기도 함.

- js 파일을 모두 받아와야하기 때문에 초기 페이지 진입시 파일을 불러와야 하기 때문에 시간이 오래 걸린다.
- 검색 엔진 봇이 페이지를 방문하였을 때 콘텐츠를 제공하지 못하여 페이지를 파악하는데 어려움이 있어 SEO를 최적화 하는데 좋지 않음 (SSR로 해결 가능)

SSR의 경우 사이트를 접속 할 때 렌더링된 html을 불러오며 필요한 js 파일을 불러올때 까지 반응하지 않지만 빠르게 화면을 보여줄수 있어 속도가 빨라 보인다. 하지만 페이지 이동시 새로운 페이지를 요청하기 때문에 페이지 이동시 깜빡임이 존재하며 템프릿을 중복해서 로딩하고 SSR하는것이 서버에 부담을 줄 수 있기 때문에 성능상 좋지 않다는 단점이 존재함.

NextJS는 SPA와 SSR의 단점을 해결하기 위해 SPA에 SSR 기능을 더하여 SPA와 SSR의 장점을 모두 가질수 있게 됨.

## NextJS 특징

**Prerendering, SSR**

기본적으로 빌드시 만든 모든 페이지를 미리 렌더링 하며 만들어진 html은 처음 페이지를 불러올때 사용자에게 빠르게 보여진다. (SEO에 좋음)

서버의 데이터를 필요로 하는 페이지에 대해서는 요청 시에 SSR을 통헤 html을 생성하게 된다.

**Hot Loading 지원 dev 환경**

개발 환경에서는 코드 변경 사항이 저장되면 응용 프로그램을 자동으로 다시 로드한다.

**자동 코드분할**

자동 코드분할 기능으로 코드의 모든 가져오기가 번들로 묶여 각 페이지와 함께 제공된다. 결과적으로 불필요한 코드가 페이지게 로드되지 않음.

**설정 불필요**

기본적으로 webpack, babel을 사용하고 있하고 webpack과 babel을 통해 SSR 및 개발에 필요한 설정을 이미 하고 있기 때문에 빠르게 개발을 시작 가능하며 필요한 플러그인이 있는 경우 손쉽게 추가해서 사용할 수 있도록 지원함.

**TypeScript 내장**

nextjs는 ts와 함께 사용 할 때 타입 지원을 통해 편리함과 안정성을 얻을 수 있음, next는 ts 설정을 해줄 필요 없이 사용 가능함.

**파일 기반 내비게이션**

next는 파일 시스템 기반 라우팅을 사용하고 있어 파일의 경로에 따라 페이지의 경로가 설정되어 구축이 빠르고 관리하기 편리하다는 장점이 있음.

**styled-jsx 지원**

CSS-in-JS인 styled-jsx를 지원, next에서 기본적으로 기능으로 SSR 하기 위한 설정이 필요 없음.

## CNA 활용 NextJS

```jsx
npx create-next-app //프로젝트 생성
```

package.json에 있는 scripts 명령:

- next dev: 개발 환경 next 실행, hot reloading 지원
- next build: next app 번들 만듦
- next start: 빌드된 next app 실행

### nextJS 수동 설치

```jsx
yarn init -y

yarn add next react react-dom
```

**package.json scripts 추가**

```jsx
scripts: {
  "dev": "next dev",
	"build": "next build",
  "start": "next start"
}
```

**pages 폴더 생성 및 index.js 추가**

```jsx
pages - index.js;

//index.js, nextJS는 암시적으로 react를 import 해줌
//import React from 'react';
const App = () => <div>Hello NextJS</div>;
```

**eslint 설정**

- eslint extension 설치
- .eslint 파일 생성 및 설정

```jsx
eslint --init

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    "@typescript-eslint/quotes": ["error", "double"],
    "no-unuse-def": "off",
    "space-comment": "off",
    "@typescript-eslint/space-comment": "off",
    "jsx-a11y/control-has-associated-label": "off",
    "react/no-array-index-key": "off",
    "comma-dangle": "off",
    "arrow-body-style": "off",
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "object-curly-newline": "off",
    "react-/jsx-one-expression-per-line": "off",
    "implicit-arrow-linebreak": "off",
    "no-shadow": "off",
    "operator-linebreak": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spread": "off",
    "global-require": "off",
    "no-use-before-define": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-invalid-css": "off",
    "no-confusing-arrow": "off",
    "react/jsx-curly-newline": "off",
    indent: "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
        },
      },
    },
  },
};

```

## NextJS 기본 기능

**라우팅 방식**

pages 폴더를 이용해 경로를 설정 해 줄 수 있음

**Link 컴포넌트**

nextJS에서는 주소 이동을 할 때는 주로 Link 컴포넌트를 사용한다.

Link 컴포넌트는 DOM을 가지지는 않지만 자식인 a태그를 클릭하게 되면 클라이언트 측 내비게이션을 실행하여 페이지 전체를 새로 불러오지 않고 주소를 이동 할 수 있다.

페이지 뒤로가기를 실행할 경우 새로운 컴파일 시간을 가지지 않고 이전에 랜더링 된 페이지를 보여준다. Link 컴포넌트를 통해 주소 이동을 하게 되면 브라우저의 history API룰 지원함으로 뒤로가기를 할 때 이전에 렌더링 된 페이지를 가져오게 됨.

a 태그만을 활용하여 페이지를 이동할 경우 페이지 전체를 받아오기 때문에 속도가 느려지고 깜빡임도 발생하게 된다. 즉, 뒤로가기 역시 마찬가지 같은 일이 발생하게 됨.

**동적 라우팅**

파일 이름을 대괄호로 감싸서 만들며 페이지가 정적 페이지가 아닌 동적 페이지임을 의미하게 함.

동적 페이지인 [name].js 에서 name은 임의의 값.

**서버로 부터 데이터 불러오기**

기본적으로 next는 모든 페이지를 미리 렌더링 하며, 미리 렌더링 하며 html을 생성하게 되면 더 나은 성능의 SEO 이점을 얻을 수 있다.

nextJS에느 2가지 형태의 사전 렌더링 (Prerender)가 존재함

- 정적 생성 (static generator): 빌드시 페이지를 html로 만들어 요청시 제공
- 서버 사이드 랜더링 (SSR): 페이지 요청시 SSR을 통해 html을 제공

외부 데이터가 필요 한 경우 SSR을 통해 외부 데이터를 이용해 렌더링을 한 후 html을 제공하게 됨

**getServerSideProps**

nextJS는 getServerSideProps API를 통헤 페이지의 데이터를 서버로 부터 제공받아 초기 데이터를 전달하도록 구성이 되어 있다.

페이지를 요청할 때 마다 실행이 되며 getServerSideProps에서 페이지로 전달해 준 데이터를 서버에서 렌더링하게 된다.

서버에서 실행되기 때문에 콘솔 출력이 터미널에서 진행 된다.

```jsx
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const name = ({ user }) => {
  const { query } = useRouter();

  return (
    <div>
      <h2>Hello {user?.name}</h2>
      <h3></h3>
      <Link href="/">
        <a>Move to /</a>
      </Link>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  try {
    const { name } = query;
    const { data, status } = await axios.get(
      `https://api.github.com/users/${name}`
    );
    if (status === 200) {
      return {
        props: {
          user: data,
        },
      };
    }
    return {
      props: {},
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
};

export default name;
```

**getStaticProps**

빌드 시에 데이터를 불러와 결과를 json으로 저장하여 사용하게 되어 일관된 데이터를 보여주게 된다.

```jsx
const staticPage = ({ time }) => {
  return <div>{time}</div>;
};

export const getStaticProps = async () => {
  return { props: { time: new Date().toISOString() } };
};

export default staticPage;

// 빌드 된 app을 실행하여 page에 접속할 경우 새로고침을 하여도 시간 값이 변경되지 않음
// 빌드 시 만들어진 데이터가 변경되지 않음을 확인 가능
```

- props 데이터가 변경되기를 원하는 경우 revalidate 값을 활용하면 정해진 시간 마다 요청이 들어올 때 데이터를 갱신하여 제공 받을수 있음

```jsx
export const getStaticProps = async () => {
  return { props: { time: new Date().toISOString() }, revalidate: 3 };
};
```

- 동적 페이지에서 사용 방법

getServerSideProps와 다르게 params를 활용하며 getStaticPaths를 통해 params를 미리 지정해줘야 된다.

fallback값은 지정한 경로외의 경로에 대해서 설정을 하게됨.

fallback이 false인 경우 이외의 경로는 404 에러 페이지로 가게된다.

```jsx
export const getStaticProps = async ({ params }) => {
  try {
    const { data, status } = await axios.get(
      `https://api.github.com/users/${params.name}`
    );
    if (status === 200)
      return { props: { user: data, time: new Date().toISOString() } };
    return { props: { time: new Date().toISOString() } };
  } catch (err) {
    console.log(err);
    return { props: { time: new Date().toISOString() } };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { name: "leye" },
      },
    ],
    fallback: true,
  };
};
```

getStaticPaths의 경우 페이지의 경로가 외부 데이터에 의존할 경우 사용하게 된다.

예를 들어 유저를 조회한 결과 ["leye"] 의 값을 얻어, 이 값을 이용해 static/leye 페이지를 getStaticProps를 통해 데이터를 저장하게 되고 해당 경로를 접속할 때 마다 미리 렌더링된 html을 제공한다.

## 공통 페이지 생성

**\_app 파일**

App 컴포넌트는 모든 페이지의 공통 페이지 역할을 함, App 컴포넌트를 이용해 모든 페이지를 초기화하여 다음 과 같은 역할을 수행 할 수 있음

- 페이지들의 공통된 레이아웃
- 페이지를 탐색 할 때 상태 유지
- 추가 데이터를 페이지에 주입
- 글로벌 CSS 추가

```jsx
const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}
      </style>
    </>
  );
};

export default App;

//Component는 불러오는 페이지를 가리키며, props로 pageProps를 받고 있음.
//pageProps는 page안의 파일에서 getServerSideProps, getStaticProps 혹은 getInitialProps
//로 페이지에 전달해주는 props
```

**\_document (공통 문서)**

일반적으로 html 및 body 태그를 보강하는데 사용, document를 이용해 title, description, meta 등 프로젝트 정보를 제공하는 정보를 제공하는 html 코드를 작성 할 수 있으며 font or 외부 api, cdn등을 불러오도록 할 수 있음

```jsx
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="title" content="GitHub Repository" />
          <meta name="description" content="Leye195 Github Repository List" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

**\_error (에러페이지)**

next에서는 빌드된 프로덕션 환경에서 에러가 발생할 경우 에러 페이지로 넘어가게 되며 실행 후 에러가 발생할 경우 `An unexpected error has occured` 문구가 있는 화면을 표출함.

존재 하지 않는 페이지로 이동할 경우 404 내용을 페이지에 표출해줌

여러 사이트는 404 및 에러가 발생할 경우를 대비하여 에러페이지를 만들어두곤 함. nextjs에서 제공하는 error 페이지 기능을 활용해 커스텀 에러 페이지를 만들어줄수 있음

커스텀 404 페이지의 경우 `404.jsx` 파일을 만들어주면 됨

```jsx
const NotFound = () => {
  return <p>404 Not Found</p>;
};

export default NotFound;
```

**Styled Coponents SSR 지원 방법**

```jsx
import Document from 'next/document';
import {ServerStyleSheet} from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
	  const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
	    originalRenderPage({
        enhanceApp: (App) => (props) =>
        sheet.collectStyles(<App {...props}/>),
      });
      const initialProps = await Document.getInitialProps(ctx);

      return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			}
    } finally {
			sheet.seal();
    }
  }

  render() {
    return (
			<Html>
				<Head>
					...
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		)
  }
}

export default MyDocument;

//.babelrc
{
  "presets": ["next/babel"],
	"plugins": [["styled-componnts", {"ssr": true}]]
}
```

## Next API

nextjs는 express 기반으로 만들어져있기 때문에 api를 만들고 사용할 수 있음

`pages/api` 를 만들어 api 폴더 내부에 파일을 생성하여 작성을 하면 됨

```jsx
ex)

import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  return res.send("Next");
};

//or

export default async(req:NextApiRequest, res: NextApiResponse) => {
  try {
    const todos = await new Promise<TodoType[]>((resolve,reject)=>{
      fs.readFile('src/data/todos.json',(err,data) => {
			  if(err) return reject(err.message);

		    const todosData = data.toString();
        if(!todosData) return resolve([]);

        const todos = JSON.parse(todosData);
				return resolve(todos);
		  });
		})

		res.statusCode = 200;
		return res.send(todos);
  }catch(e) {
    res.statusCode = 500;
    res.send(e);
  }

  res.statusCode = 405;
  return res.end();
}

```

**환경변수 설정**

root 경로에 .env.local 생성, nextjs에서는 기본적으로 `.env.local` 을 사용하여 불러온 환경변수에 대해서 브라우저에서는 노출되지 않고 서버에서만 노출되게 설정되어 있음.

브라우저에서도 환경 변수가 노출되도록 하기 위해서는 변수명의 접두어로 NEXT*PUBLIC* 을 붙여줘야 된다.

API_URL → NEXT_PUBLIC_API_URL

**데이터 호출**

```jsx
ex)

const index: NextPage<Props> = ({todos}) => {
  const checkTodo = async(id:number) => {
    try{
      awati checkTodiAPI(id);
      const newTodos = todos.map((todo)=>todo.id===id?({...todo,checked: !todo.checked}):todo);
      setLocalTodos(newTodos);
    }catch(e){
      console.log(e);
    }
	}
}

export const getServerSideProps = async() => {
  try {
    const res = await getTodoAPI();

		if(res.status === 200) return {props: {todos:res.data}};

		return {
		  props:{todos:[]}
		};
  } catch(e) {
	  return { props:{todos:[]} };
  }
}

export default index;

```

## NextJS with Redux

nextJS에서 redux를 활용하기 위해서 next-redux-wrapper를 설치해줘야 됨

```
yarn add redux react-redux next-redux-wrapper redux-devtools-extension
yarn add @types/react-redux -D
```

- [https://github.com/kirill-konshin/next-redux-wrapper/blob/a16c1d5a96e3fd8dcd9d375ae28b356d2e2f4b8c/packages/wrapper/src/index.tsx#L132](https://github.com/kirill-konshin/next-redux-wrapper/blob/a16c1d5a96e3fd8dcd9d375ae28b356d2e2f4b8c/packages/wrapper/src/index.tsx#L132) (참고)

```jsx
//store/index.ts

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createwrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({

});

const reducer = (state: any, action: any) => {
  it(action.type === HYDRATE) {
    const newState = {
			...state,
			...action.payload
    };
		return newState;
  }

	return rootReducer(state,action);
};

export type RootState = ReturnType<typeof rootReducer>;

const bindMiddlewares = (middleware: any) => {
  if(process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
}

const initStore = () => createStore(reducer, bindMiddleware([]));

export const wrapper = createWrapper(initStore);

//pages/index.ts

const App = () => {

};

export const getServerSideProps = wrapper.getServerSideProps((
	{dispatch,getState}
) => async() => {
  const data = await getData();

  return {props:{}};
});

```

**Redux ToolKit**

RTK는 Redux 앱을 만들기에 필수적이라고 생각되는 패키지와 함수들을 포함하고 있음.

대부분의 작업을 단순화하고 , 흔한 실수를 방지하여 Redux 앱을 쉽게 만들수 있게 해주며

아래 문제들을 해결해줌

- 리덕스 저장소 구성 복잡
- 리덕스가 유용한 작업을 수행할 수 있도록 많은 패키지 추가 필요
- 리덕스 상용구 코드가 너무많이 필요

```jsx
yarn add @reduxjs/toolkit

//적용 전 코드
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "types/todo";

const PREFIX = "todo";

export const INIT_TODO_LIST = `${PREFIX}/INIT_TODO_LIST`;
export const SET_TODO_LIST = `${PREFIX}/SET_TODO_LIST`;

export const setToDo = (payload: TodoType[]) => {
  return {
    type: SET_TODO_LIST,
    payload,
  };
};

export const todoActions = { setToDo };

interface ToDoReduxState {
  todos: TodoType[];
}

const initialState: ToDoReduxState = {
  todos: [],
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_TODO_LIST:
      const newState = { ...state, todos: action.payload };
      return newState;
    default:
      return state;
  }
}

import {
  createStore,
  applyMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import todo from "./todo";

const rootReducer = combineReducers({
  todo: todo.reducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

// store 타입
export type RootState = ReturnType<typeof rootReducer>;

// middleware 적용 store enhancer
const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([]));
};

//app 컴포넌트에서 wrapper로 활용하기 위한 선언
export const wrapper = createWrapper(initStore);

-------------------------------------------------------------------------------

//적용 후

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TodoType} from 'types/todo';

interface ToDoReduxState {
  todos: TodoType[];
};

const initialState: ToDoReduxState = {
  todos: [],
};

const todo = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setToDo(state,action: PayloadAction<TodoType[]>) {
      state.todos = action.payload;
    }
  }
});

export const todoActions = {...todo.action};

export default todo;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import todo from "./todo";

const rootReducer = combineReducers({
  todo: todo.reducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  }
  return rootReducer(state, action);
};

// store 타입
export type RootState = ReturnType<typeof rootReducer>;

const initStore = () => {
  return configureStore({
    reducer,
    devTools: true,
  });
};

//app 컴포넌트에서 wrapper로 활용하기 위한 선언
export const wrapper = createWrapper(initStore);

```

**useSelector 타입 지원**

useSelector를 홣용하기 위해서는 state를 RootState를 타입으로 지정해줘야 됨

RootState를 매번 불러와서 state의 타입으로 지정해주는일은 매우 번거로운 일이기 때문에

커스텀으로 타입을 지정해주면 매우 편하게 사용할 수 있음

```jsx
import {
  TypedUseSelectorHook,
  useSelecor as useReduxSelector,
} from "react-redux";

export const useSelector: TypedUseSelector<RootState> = useReduxSelector;
```
