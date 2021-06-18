## 모달 컴포넌트 작성

모달을 만드는 가장 간단한 방법은 모달을 띄울 boolean 값과 모달 엘리먼트의 position을 fixed로 주어 표시하는 것.

**구현 방법1**

- 장점: 간단하게 만들수 있음
- 단점: 매번 새롭게 만들어 줘야됨

```jsx
//style
.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
	position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

	.modal-background {
    width: 100%;
    height: 100%;
    position: absolute;
		background-color: rgba(0,0,0,0.65);
		z-index: 10;
  }

	.modal-contents {
    width: 400px;
		height: 400px;
		background-color: white;
		z-index: 11;
	}
}

<div className="modal-wrapper>
  <div className="modal-background" role="presentation" onClick={}/>
	<div className="modal-contents"/>
</div>

```

**구현 방법2 (React Portal)**

**react portal을 용하여 모달을 만드는 방법**

portal은 부모 컴포넌트의 DOM 계층 외부에 있는 DOM 노드로 자식을 랜더링하는 방법으로 쉽게 말하자면 엘리먼트를 다른 엘리먼트에서 랜더링하게 하는 방법.

```jsx
//React.createPortal 활용

//_app.tsx

<>
  ...
  <div id="root-modal"/>
</>

//ModalPortal.tsx

interface Props {
  children: React.ReactNode;
  closePortal: ()=>void;
}

const ModalPortal: React.FC<Props> = ({children}) => {
  const ref = useRef<Element|null>();
  const [mounted, setMounted] = useState(false);


  useEffect(()=>{
    setMounted(true);
    if(document) {
      const dom = document.querySelector("#root-modal");
			ref.current = dom;
    }
  },[]);

  if(ref.current&&mounted){
    return createPortal(<Container>
			{children}
		</Container>, ref.current);
  }

	return null;
}
```

구현 방법3 (hook 구현)

```jsx
interface Props {
  children: React.ReactNode
};

const useModal = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  }

  const closeModal = () => {
    setModalOpened(false);
  }

  const ModalPortal: React.FC<Props> = ({children}) => {
    const [mounted, setMounted] = useState(false);
    const ref = useRef<Element|null>();

    const useEffect(()=>{
      setMounted(true);

      if(document) {
        const dom = document.querySelector('#root-modal');
        ref.current = dom;
      }
    },[]);
    if(ref.current&&mounted&&modalOpened) {
      return createPortal(<Container></Container>,ref.current);
    }
    return null;
  }

  return {
    openModal,
    closeModal,
    ModalPortal
  };
}

export default useModal;

```

## 가입 구현

`api/auth/signup.ts` 구현

```jsx
import {NextResponse, NextRequest} from 'next';

export default async(req: NextRequestm res: NextResponse) => {
  if (req.method === 'POST') {
		const {email,password, firstName,lastName, birthday} = req.body;
	  if(!email||!password||!firstName||!lastName||!birthday) {
	    res.statusCode = 400;
			return res.send('');
	  }

    const userExist = data.user.exist({email});

		if(userExist) {
      res.statusCode = 409;
			return res.send('');
    }

    const users = data.user.gerUserList();
    const hashedPassowrd = bcrypo.hashSync(password,8);
    let userId;

		if(users.length === 0) userId = 1;
		else userId = users.lenght + 1;



		const newUser: StoredUserType = {
      id: userId,
			email,
			firstName,
			lastName,
			birthday,
		  password: hashedPassword
    };

	  const token = bcrypto.sign(String(newUser.id),process.env.NEXT_PUBLIC_JWT_SECRET);

		data.user.write([...users,newUser]);
		res.setHeader('Set-Cookie',
		`access_token=${encodeURI(token)}; path=/; expires=${encodeURI(
     new Data(Data.now()+60*60*24*1000*3).toString()
		 )}; httponly
		`)

		const newUserWithoutPassword: Partial<Pick<StoredUserType,'password'>> = newUser;
    delete newUserWithoutPassword.password;

		res.statusCode = 200;
		return res.send(newUserWithoutPassword);
  }

	res.statusCode = 405;
	return res.end();
}
```

## 로그인 구현

```jsx
export default async(req:NextAPIRequest, res: NextAPIResponse) => {
  if (req.method === "POST") {
    try{
      const {email,password} = req.body;

      if (!email || !password) {
        res.statusCode = 400;
        return res.send("필수 데이터가 없습니다.");
      }

			const user = data.user.find({email});

      if(!user) {
        res.statusCode = 404;
        return res.send("해당 이메일의 유저가 존재하지 않습니다");
      }

      const passwordMatched = bcrypto.compareSync(password,user.password);

      if(!passwordMatched) {
        res.statusCode = 403;
        return res.send("비밀번호가 일치하지 않습니다.");
      }

      const token = jwt.sign(String(user.id), process.env.NEXT_PUBLIC_JWT_SECRET!);
      res.setHeader(
        "Set-Cookie",
        `access_token=${encodeURI(token)}; path=/; expires=${encodeURI(
          new Date(Date.now() + 60 * 60 * 24 * 1000 * 3).toString(),
        )}; httponly`,
      );

      const userWithoutPassword: Omit<StoredUserType, 'password'> = user;

      res.statusCode = 200;
		  return res.send(userWithoutPassword);
	  } catch(e){
      console.log(e);
			res.statusCode = 500;
			return res.end();
    }
  }

  res.statusCode = 405;
	return res.end();
}
```

## 로그인 유지

```jsx
//pages/api/me

export default async(req:NextAPIRequest, res: NextAPIResponse)=>{
  if(req.method === "GET") {
    try {
      const accessToken = req.headers.cookie;

      if(!accessToken) {
        res.statusCode = 400;
        return res.send("access token이 존재하지 않습니다.");
      }

      const userId = jwt.verify(accessToken,env.process.NEXT_PUBLIC_JWT_TOKEN!);

      const user = data.user.find({id:userId});
			const userWithoutPassword: Omit<StoredUserType,'password'> = user;

      res.statusCode = 200;
      return res.send(userWithoutPassword);
    } catch(err) {
      console.error(err);
      res.statusCode = 500;
      return res.end();
    }
  }

  res.statusCode = 405;
  return res.end();
}

//lib/api/auth

export const meAPI = () => api.get<UserType>('/api/auth/me');

//_app.tsx

...

app.getInitialProps = wrapper.getInitialAppProps((store)=>async(context: AppContext)=>{
  const appInitialProps = await App.getInitialProps(context);

  const {access_token: accessToken} = context.ctx.req?.headers.cookie;

  const {isLoggedIn} = store.getState().user;

  try {
    if (!isLoggedIn&&accessToken) {
      api.defaults.headers.cookie = accessToken;
      const {data} = await meAPI();

      store.dispatch(userActions.setLoggedIn(data));
    }
  } catch(e){
    console.error(e);
  }

  return {
    ...appInitialProps,
  };
});

export default wrapper.withRedux(app);
```
