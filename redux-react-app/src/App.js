import logo from './logo.svg';
import './App.css';
//Redux와 React를 연결하는데 필요한 provider, useDispatch, useSelector를 import 
import { Provider, useDispatch,useSelector } from 'react-redux';
//Redux 스토어를 import
import store from './redux/store'
//액션 생성 함수를 import
//아래 함수들은 상태를 변경하는 액션을 dispatch하기 위해 사용된다.
import { increment,decrement } from './redux/action';

import React,{useState} from 'react';
import {addTodo,removeTodo} from './todo/actions'

import {login,logout} from './login/actions'

import { addToCart, removeFromCart } from './CART/actions'; // 액션 생성 함수 불러오기


function App() {
  const products = [
    {id : 1, name:'Apple'},
    {id : 2, name:'Banana'},
    {id : 3, name:'Orange'}
  ]

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  //제품을 카트에 추가
  const handleAddToCart = (id,name) => {
    dispatch(addToCart(id,name));
  }

  //제품을 카트에서 제거
  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  }

  return(
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleAddToCart(product.id,product.name)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Shopping cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>{item.name}(x{item.quantity})
            <button onClick={()=> handleRemoveFromCart(item.id)}>
              Remove
            </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
  export default App;
