import React from 'react'
import App from './App'
import Login from './users/Login'
import Signup from './users/Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


function AppRouter(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/main" element={<App />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter;