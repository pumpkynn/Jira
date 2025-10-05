import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import {useState} from "react";
import styled from '@emotion/styled'
import { Typography } from "antd"
import {useDebounce } from "../../utils/index";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
//我们希望，在静态代码里面，就能发现其中的错误 -> 强类型
export const ProjectListScreen = () =>{
    const [param, setParam] = useState({
        name: "",
        personId: ""
    }) 
    const debouncedParam = useDebounce(param,300)
    const{isLoading,error,data:list} = useProjects(debouncedParam)
    const {data:users} = useUsers()
    // 使用useCallback稳定client函数引用
//return返回了一个表单元素，决定了这个组件在页面上显示什么
    return <Container>
        <h1>项目列表</h1>
       <div style={{ marginBottom: 16 }}>
         <SearchPanel users={users || []} param={param} setParam={setParam}/>
         {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
       </div>
       <List users={users || []} dataSource={list}  loading={isLoading}/>
</Container>}

const Container = styled.div`
    padding:3.2rem
`