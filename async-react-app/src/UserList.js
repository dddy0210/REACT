import React,{useState, useEffect} from "react";

function UserList(){
    //유저 정보를 담기위한 state
    const [users, setUsers] = useState([])
    //로딩 상태를 관리하기 위한 state
    const [loading, setLoading] = useState(true) 
    //에러 상태를 관리하기 위한 state
    const [error, setError] = useState(null) 
    
    //fetch를 사용하기 위해 useeffect를 사용
    useEffect(() => {
            //비동기 함수 정의 
    const fetchUsers = async ()=>{
        try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
            throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        const data = await response.json();
                setUsers(data);  // 상태에 데이터를 저장
              } catch (err) {
                setError(err.message);  // 에러 처리
              } finally {
                setLoading(false);  // 로딩 상태를 완료로 설정
              }
            };
              //useEffect 안에서 fetchUsers()를 호출하는 이유는 useEffect 훅이 비동기 함수를 직접적으로 지원하지 않기 때문이다.
    //
          fetchUsers(); // API 호출
                  }, []);

            // 로딩 중일 때 표시할 UI
           if (loading) {
  return <p>로딩 중...</p>;
           }

            // 에러가 발생했을 때 표시할 UI
           if (error) {
           return <p>에러 발생: {error}</p>;
           }

           // 데이터를 성공적으로 불러왔을 때 표시할 UI
           return (
            <div>
              <h1>사용자 목록</h1>
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    {user.name} - {user.email}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        export default UserList;
