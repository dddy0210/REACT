import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 이 부분이 사이드 이펙트 코드입니다.
    document.title = `You clicked ${count} times`;

    // 클린업 함수 (선택적)
    return () => {
      // 컴포넌트가 언마운트되거나 의존성 배열의 값이 변경되기 전에 실행됩니다.
    };
  }, [count]); // 의존성 배열

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
export default MyComponent