import React, { useState } from "react"
import { useAuth } from "../context/auth_context"
import { Form, Input, Button } from "antd"
import { LongButton } from "./index"
export const RegisterScreen =() =>{
    const {register} = useAuth()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    
    const handleSubmit = (values:{username:string, password:string}) => {
      
       const username = values.username
       const password = values.password
       
       if(!username || !password){
           setErrorMessage('用户名和密码不能为空')
           setSuccessMessage("")
           return
       }
       
       register(values)
           .then(() => {
               setSuccessMessage('注册成功')
               setErrorMessage("")
               
           })
           .catch((error: Error) => {
               setErrorMessage(error.message || '注册失败')
               setSuccessMessage("")
               
           })
    }
    
    return <Form onFinish={handleSubmit}>
      
        <Form.Item  name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
            <Input type="text" id="username" placeholder="用户名"/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
            <Input type="password" id="password" placeholder="密码"/>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
            <LongButton type={'primary'} htmlType={'submit'}>注册</LongButton>
        </Form.Item>
        {errorMessage && <div style={{color: 'red', marginTop: 8}}>{errorMessage}</div>}
        {successMessage && <div style={{color: 'green', marginTop: 8}}>{successMessage}</div>}
    </Form>
}