import { useState } from "react";
import { useRouter } from "next/router";

const App = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  return (
    <div>
      <h2>Hello NextJS</h2>
      <p>이름</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="button" onClick={() => router.push(`/users/${name}`)}>
        {name}으로 이동
      </button>
    </div>
  );
};

export default App;
