import React from 'react';
import { useState,useEffect } from 'react';
import '../css/styles.css'
import { call } from '../service/ApiService';
import AddProduct from './AddProduct';
import OrderInfo from '../order/order_info';


export default function P_info(){
    const [items,setItems] = useState([]);
    const [open, setOpen] = useState(true);
    const[selectedIndex, setSelectedIndex] = useState(null);
    const [orderCount, setOrderCount] = useState(''); 
    const [showOrderInfo, setShowOrderInfo] = useState(false);
    //조회
    useEffect(()=>{
        call("/products","GET")
        .then(result => {
            setItems(result.data);
        })
    },[])

    const addItem = (newProduct) => {
        // 상품 추가 로직 (예: 기존 아이템에 추가)
        call("/products","POST",newProduct)
        .then(result => {
            setItems(result.data);
        })
    };

    //onButtonClick함수 작성
    const onButtonClick = ()=>{
        setOpen(false);
    }
    //클릭한 라디오버튼의 index
    const handleRadioChange = (index) => {
        setSelectedIndex(index);
        setOrderCount(''); 
    };    
    // 주문 개수 변경 시 호출되는 함수
    const handleOrderCountChange = (event) => {
        setOrderCount(event.target.value);
    };
    //주문하기
    const orderProduct = () => {
        if (selectedIndex && orderCount > 0 && items[selectedIndex - 1]) {
            const orderData = {
              productId: items[selectedIndex- 1].id,
              productCount: parseInt(orderCount)
            };
        call("/orders", "POST", orderData)
        .then(result => {setItems(result.data)})
        }else {
            alert("상품을 선택하고 주문 개수를 입력하세요.");
        }
    }
    
    
    const showOrderDetails = () => {
        setShowOrderInfo(!showOrderInfo);
    };

    let productItems = items.length > 0 && (
        <div>
            <table border="1">
                <tr>
                    <th>단일 선택</th>
                    <th>주문 개수</th>
                    <th>상품 번호</th>
                    <th>상품 이름</th>
                    <th>상품 재고</th>
                    <th>상품 가격</th>
                    <th>등록 날짜</th>
                    <th>수정 날짜</th>
                </tr>
                <tbody>
                {items.map((item,index) => (
                    <tr key={item.productId}>
                        <td><input type="radio" name="productId" onChange={() => handleRadioChange(index+1)}
                    checked={selectedIndex === index+1}/></td>
                    <td><input 
                        type="number"
                        value={selectedIndex === index + 1 ? orderCount : ''}
                        onChange={handleOrderCountChange}
                        readOnly={selectedIndex !== index + 1} /></td>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.inventory}</td>
                        <td>{item.price}</td>
                        <td>{item.adddate}</td>
                        <td>{item.editdate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button type="button" id="order-done" onClick={orderProduct}>주문 완료</button>
            <button type="button" onClick={showOrderDetails}>주문내역</button>
        </div>
    );
    //버튼
    let addProductbtn = <button type="button" onClick={onButtonClick}>상품추가</button>
    //추가창
    let addProductScreen = <AddProduct addItem={addItem} setOpen={setOpen} />;
    let addButton = addProductbtn;

    //open이 false가 되면 상품추가 창을 연다.
    if(!open){
    addButton = addProductScreen;
    }
    return(
        <div className='container'>
            {addButton}
            {productItems}
            {showOrderInfo && <OrderInfo/>}
        </div>
    );
}