import React, { useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useDaumPostcodePopup } from 'react-daum-postcode';

function MyMap3() {
    const [address, setAddress] = useState('');
    const [markerPosition, setMarkerPosition] = useState({ lat: 37.5665, lng: 126.978 }); // 초기 좌표 (서울)

    // Daum 우편번호 API 스크립트 URL
    let scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

    // react-daum-postcode의 useDaumPostcodePopup 훅을 사용하여 API를 팝업으로 실행할 준비
    const open = useDaumPostcodePopup(scriptUrl);

    // 주소-좌표간 변환 서비스 객체 생성
    let geocoder = new window.kakao.maps.services.Geocoder();

    const handleComplete = (data) => {
        let addr = data.address;
        console.log('주소 : ', addr);
        setAddress(addr);

        geocoder.addressSearch(addr, function (results, status) {
            // 정상적으로 검색이 완료되었으면
            if (status === window.kakao.maps.services.Status.OK) {
                let result = results[0];
                console.log(result);
                console.log('좌표 : ', result.x, ', ', result.y);

                // 마커 위치 설정
                setMarkerPosition({ lat: result.y, lng: result.x });
            }
        });
    }

    function handleClick() {
        open({ onComplete: handleComplete });
    }

    return (
        <div>
            <input type='text' value={address} placeholder='주소 ' readOnly />
            <input type='button' onClick={handleClick} value='주소 검색' />
            <Map
                style={{ width: '440px', height: '400px' }} // 지도의 너비와 높이
                center={{ lat: markerPosition.lat, lng: markerPosition.lng }} // 중심 좌표
                level={3} // 지도 확대정도
            >
                <MapMarker position={markerPosition} />
            </Map>
        </div>
    );
}

export default MyMap3;