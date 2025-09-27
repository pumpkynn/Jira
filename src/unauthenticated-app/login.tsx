import React, { useState } from "react"
import { useAuth } from "../context/auth_context"

export const LoginScreen =() =>{
    const {login} = useAuth()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault()
       const username = (event.currentTarget.elements[0] as HTMLInputElement).value
       const password = (event.currentTarget.elements[1] as HTMLInputElement).value
       
       if(!username || !password){
           setErrorMessage('用户名和密码不能为空')
           setSuccessMessage("")
           return
       }
       
       login({username, password})
           .then(() => {
               setSuccessMessage('登录成功')
               setErrorMessage("")
               console.log('登录成功')
           })
           .catch((error: Error) => {
               setErrorMessage(error.message || '登录失败')
               setSuccessMessage("")
               console.error('登录失败:', error)
           })
    }
    
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id="username" />
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id="password" />
        </div>
        <button type="submit">登录</button>
        {errorMessage && <div style={{color: 'red', marginTop: 8}}>{errorMessage}</div>}
        {successMessage && <div style={{color: 'green', marginTop: 8}}>{successMessage}</div>}
    </form>
}