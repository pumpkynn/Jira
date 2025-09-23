import { SearchPanel } from "./search-panel";
import { List } from "./list";
import {useEffect,useState} from "react";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "../../utils/index";
//我们希望，在静态代码里面，就能发现其中的错误 -> 强类型
const apiUrl = 'http://localhost:3001'
export const ProjectListScreen = () =>{
    const [users,setUsers] = useState([])
    const [param, setParam] = useState({
        name: "",
        personId: ""
    })
    const debouncedParam = useDebounce(param,2000)
    const [list,setList] = useState([])
//return返回了一个表单元素，决定了这个组件在页面上显示什么
useEffect(() =>{
    const cleanParam = cleanObject(debouncedParam)
    const queryString = qs.stringify(cleanParam)
    fetch(`${apiUrl}/projects?${queryString}`).then(async response => {
        if(response.ok){
            const data = await response.json()
            setList(data)
        }
    }).catch(error => {
        console.error('Failed to fetch projects:', error)
    })
},[debouncedParam])

useMount(() =>{
    fetch(`${apiUrl}/users`).then(async response => {
        if(response.ok){
            setUsers(await response.json())
        }
    }).catch(error => {
        console.error('Failed to fetch users:', error)
    })
})
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}