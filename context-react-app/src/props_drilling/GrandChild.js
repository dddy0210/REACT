import React,{useContext} from 'react';
import {UserContext} from  './UserContext'

function GrandChild() {
  //usecontext()함수를 사용해서
  //usercontext로부터 데이터를 가져온다.
  //user상태와 setuser함수를 가져와서 컴포넌트 내에세 사용할 수 있다. 
  const {user,setUser} = useContext(UserContext)

  //Usercontext에 들어있는 내용
  //user : {name : 'john doe', age: 30}
  //setuser() 함수 

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
      <button onClick={() => setUser({ name: 'Jane Doe', age: 28 })}>
      Change User
      </button>
    </div>
  );
}

export default GrandChild;
