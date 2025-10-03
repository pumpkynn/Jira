import React, { useCallback } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import {useEffect,useState} from "react";
import styled from '@emotion/styled'

import { cleanObject, useMount, useDebounce } from "../../utils/index";
import { useHttp } from "../../utils/http";
//我们希望，在静态代码里面，就能发现其中的错误 -> 强类型
export const ProjectListScreen = () =>{
    const [users,setUsers] = useState([])
    const [param, setParam] = useState({
        name: "",
        personId: ""
    })
    const debouncedParam = useDebounce(param,300)
    const [list,setList] = useState([])  
    const client = useHttp()
    
    // 使用useCallback稳定client函数引用
    const fetchProjects = useCallback(() => {
        const cleanParam = cleanObject(debouncedParam)
        client('projects',{data:cleanParam})
          .then((data) => {
            console.log('projects:', data)
            setList(Array.isArray(data) ? data : [])
          })
          .catch(error => {})
    }, [debouncedParam, client])

    const fetchUsers = useCallback(() => {
        client('users')
          .then((data) => {
            console.log('users:', data)
            setUsers(Array.isArray(data) ? data : [])
          })
          .catch(error => {
            console.error('Failed to fetch users:', error)
          })
    }, [client])

//return返回了一个表单元素，决定了这个组件在页面上显示什么
useEffect(() =>{
    fetchProjects()
},[fetchProjects])

useMount(() =>{
    fetchUsers()
})
    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </Container>
}
const Container = styled.div`
    padding:3.2rem
`