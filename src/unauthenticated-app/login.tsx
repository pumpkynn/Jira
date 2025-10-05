import React, { useState } from "react"
import { useAuth } from "../context/auth_context"
import { Form, Input } from "antd"
import { LongButton } from "./index"
import { useAsync } from "../utils/use-async"
import { Typography } from "antd"
export const LoginScreen =({onError}:{onError?: (error:Error) => void}) =>{
    const {login} = useAuth()
    const {run,isLoading} =useAsync(undefined,{throwOnError: true})
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    
    const handleSubmit = async (values:{username:string, password:string}) => {
      try{
       await run (login(values))
      }catch(e){
        onError?.(e as Error)
      }
       
          
    }
    
    return <Form onFinish={handleSubmit}>
        
        
        <Form.Item  name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
            <Input type="text" id="username" placeholder="用户名"/>
        </Form.Item>
        <Form.Item  name={'password'} rules={[{required: true, message: '请输入密码'}]}>
            <Input type="password" id="password" placeholder="密码" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
                <LongButton type={'primary'} htmlType={'submit'} loading={isLoading}>登录</LongButton>
        </Form.Item>
    
        {errorMessage && <div style={{color: 'red', marginTop: 8}}>{errorMessage}</div>}
        {successMessage && <div style={{color: 'green', marginTop: 8}}>{successMessage}</div>}
    </Form>
}