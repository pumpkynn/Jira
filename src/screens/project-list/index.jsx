import { SearchPanel } from "./search-panel";
import { List } from "./list";
import {useEffect,useState} from "react";
import * as qs from "qs";
import { cleanObject } from "../../utils/index";
const apiUrl = 'http://localhost:3001'
export const ProjectListScreen = () =>{
    const [users,setUsers] = useState([])
    const [param, setParam] = useState({
        name: "",
        personId: ""
    })
    const [list,setList] = useState([])
//return返回了一个表单元素，决定了这个组件在页面上显示什么
useEffect(() =>{
const cleanParam = cleanObject(param)
const queryString = qs.stringify(cleanParam)
console.log('搜索参数:', param)
console.log('清理后参数:', cleanParam)
console.log('查询字符串:', queryString)
console.log('请求URL:', `${apiUrl}/projects?${queryString}`)

fetch(`${apiUrl}/projects?${queryString}`).then(async response => {
//     response.ok：检查HTTP状态码是否成功（200-299）
// response.json()：将响应解析为JSON格式
// setList()：将获取的数据更新到 list 状态中
    if(response.ok){
const data = await response.json()
console.log('获取到的项目数据:', data)
setList(data)
    }
}).catch(error => {
    console.error('Failed to fetch projects:', error)
})
},[param])
useEffect(() =>{
fetch(`${apiUrl}/users`).then(async response => {
//     response.ok：检查HTTP状态码是否成功（200-299）
// response.json()：将响应解析为JSON格式
// setList()：将获取的数据更新到 list 状态中
    if(response.ok){
setUsers(await response.json())
    }
}).catch(error => {
    console.error('Failed to fetch users:', error)
})
},[])
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}