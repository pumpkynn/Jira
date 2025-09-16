import React from 'react'

export const SearchPanel = ({users,param,setParam}) =>{
    //写一个组件，先写他的状态
// 状态（State） 是组件内部的数据，当状态改变时，组件会重新渲染。
// param 是当前状态值，包含组件的数据
// setParam 是更新状态的函数
// useState 是React提供的Hook来管理状态
// 它们都是 React 的 useState Hook 自动生成的，不是我们手动定义的。
   
    
    
    return <form>
        {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
        <input type="text" 
        value={param.name} 
        onChange={evt => setParam({
            ...param,
            name: evt.target.value
        })}/>
        {/* ...param：展开运算符，复制当前状态的所有属性 */}
        {/* name: evt.target.value：覆盖name属性 */}
        <select value={param.personId || ""}
        onChange={evt => {
            const newPersonId = evt.target.value ? Number(evt.target.value) : ""
            console.log('选择负责人:', evt.target.value, '转换为:', newPersonId)
            setParam({
                ...param,
                personId: newPersonId
            })
        }}>
            <option value="">负责人</option>
           {
            users.map(user => <option key={user.id} value={user.id}>
                {user.name}
            </option>)
           }
        </select>
    </form>
}