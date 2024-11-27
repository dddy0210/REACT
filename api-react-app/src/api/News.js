import React, { useState } from "react";
import axios from 'axios';
import '../css/News.css'

function News() {
    const [query, setQuery] = useState(''); // 검색어 state
    const [result, setResult] = useState([]); // 검색 결과 state
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [error, setError] = useState(null);

    const newsSearch = async () => {
        try {
            const response = await axios.get('http://localhost:9090/api/news', {
                params: { query }
            });
            setResult(response.data.items); // 응답 데이터를 result에 저장
        } catch (err) {
            setError('뉴스 검색에 실패했습니다.');
            console.error(err); // 에러 로그 출력
        }
    }

    const handleSearch = (e) => {
        e.preventDefault(); // 새로고침 방지
        if (!query) {
            alert("검색어를 입력하세요");
            return;
        }
        newsSearch(); // 뉴스 검색 함수 호출
    }

    return (
        <div>
            <h1>네이버 뉴스 검색</h1>
            <form onSubmit={handleSearch}>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="뉴스 이름을 입력하세요."
                />
                <button type="submit" style={{ marginTop: '10px' }}>검색</button>
            </form>

            {loading && <p>로딩 중...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul>
                {result.map((news) => (
                    <li key={news.link}> {/* 링크를 고유 키로 사용 */}
                        <p>제목 : {news.title}</p>
                        <p>설명 : {news.description}</p>
                        <p>발행일 : {news.pubDate}</p>
                        <a href={news.originallink} target="_blank" rel="noopener noreferrer">원문 보기</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default News;