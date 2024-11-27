import React from "react";
import "../App.css";

function MainScreen() {
  return (
    <div className="main-screen">
      <header className="main-header">
        <div className="logo">Main_로고</div>
        <div className="icon-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="icon">
              아이콘 {i + 1}
            </div>
          ))}
        </div>
      </header>
      <div className="content">
        <h1>(닉네임)님 환영합니다.</h1>
        <div className="button-row">
          <button className="main-button">기록 시작하기</button>
          <button className="main-button">내 기록 보기</button>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;