import React from "react"
import * as qs from "qs"
import { cleanObject } from "../../utils/index"

const apiUrl = '/api'
const login = (param:{username:string,password:string}) =>{
        fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(param)
        }).then(async response => {
            if(response.ok){
              
            } else {
                
            }
        }).catch(error => {
            
        })
    }
export const LoginScreen =() =>{
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault()
       const username = (event.currentTarget.elements[0] as HTMLInputElement).value
       const password = (event.currentTarget.elements[1] as HTMLInputElement).value
       login({username,password})
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
    </form>
}