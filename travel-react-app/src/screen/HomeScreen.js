import React, { useState } from "react";

function HomeScreen({ onStart }) {
  const [logo, setLogo] = useState(null);
  const [background, setBackground] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackground(URL.createObjectURL(file));
    }
  };

  return (
    <div
      className="home-screen"
      style={{
        backgroundImage: background ? `url(${background})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="home-header">
        <div className="logo-container">
          {logo ? (
            <img src={logo} alt="Logo" className="logo" />
          ) : (
            <label className="file-input">
              로고 선택
              <input type="file" accept="image/*" onChange={handleLogoChange} />
            </label>
          )}
        </div>
        <div className="icon-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="icon">
              아이콘 {i + 1}
            </div>
          ))}
        </div>
      </header>
      <div className="content">
        {!background && (
          <label className="file-input">
            배경 선택
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundChange}
            />
          </label>
        )}
        <button className="start-button" onClick={onStart}>
          시작하기
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;