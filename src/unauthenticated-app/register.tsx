import React, { useState } from "react"
import { useAuth } from "../context/auth_context"
import { Form, Input, Button } from "antd"
import { LongButton } from "./index"
import { useAsync } from "../utils/use-async"
export const RegisterScreen =({onError}:{onError?: (error:Error) => void}) =>{
    const {register} = useAuth()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
     const {run,isLoading} =useAsync(undefined,{throwOnError: true})
    const handleSubmit = async ({passwordConfirm, ...values}:{passwordConfirm:string, username:string, password:string }) => {
      
       const username = values.username
       const password = values.password
       
       if(!username || !password){
           setErrorMessage('用户名和密码不能为空')
           setSuccessMessage("")
           return
       }
       if(passwordConfirm!==values.password){
          onError?.(new Error('密码和确认密码不一致'))
          return
       }
       try{
        await run(register({username, password}),{throwOnError: true})
       }catch(e){
       onError?.(e as Error)
       }
    }
    
    return <Form onFinish={handleSubmit}>
      
        <Form.Item  name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
            <Input type="text" id="username" placeholder="用户名"/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
            <Input type="password" id="password" placeholder="密码"/>
        </Form.Item>
         <Form.Item name={'passwordConfirm'} rules={[{required: true, message: '请确认密码'}]}>
            <Input type="password" id="passwordConfirm" placeholder="确认密码"/>
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
            <LongButton type={'primary'} htmlType={'submit'} loading={isLoading}>注册</LongButton>
        </Form.Item>
        {errorMessage && <div style={{color: 'red', marginTop: 8}}>{errorMessage}</div>}
        {successMessage && <div style={{color: 'green', marginTop: 8}}>{successMessage}</div>}
    </Form>
}