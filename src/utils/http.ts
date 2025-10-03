import * as qs from "qs";
import * as auth from "../auth_provider";
import { useAuth } from "../context/auth_context";
import { useCallback } from "react";
const apiUrl = process.env.REACT_APP_API_URL?.replace(/\/+$/, "");
interface Config extends RequestInit {
    token?:string;
    data?:object;
}
export const http = async (endpoint:string,{data,token,headers,...customConfig}:Config ={}) =>{
    const isGet = (customConfig.method || 'GET').toUpperCase() === 'GET'
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    const queryString = isGet && data ? `?${qs.stringify(data)}` : ''
    const url = apiUrl ? `${apiUrl}/${normalizedEndpoint}${queryString}` : `/${normalizedEndpoint}${queryString}`

    const config: RequestInit = {
        method:'GET',
        headers:{
            Authorization: token ? `Bearer ${token}` : '',
            ...(data && !isGet ? {'Content-Type':'application/json'} : {}),
            ...headers,
        },
        ...customConfig
    }

    if(!isGet && data){
        config.body = JSON.stringify(data)
    }

return window.fetch(url, config)
.then(async response => {
    if(response.status === 401){
        await auth.logout()
        window.location.reload()//刷新页面
        return Promise.reject({message:'请重新登录'})
    }
    const data = await response.json().catch(() => ({}))
    if(response.ok){
        return data
    }else{
        return Promise.reject(data)
    }
})
}
export const useHttp = () =>{
    const {user} = useAuth()
    return useCallback((...[endpoint,config]:Parameters<typeof http>) => {
        return http(endpoint,{...config,token:user?.token})
    }, [user?.token])
}