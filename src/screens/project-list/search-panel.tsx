/**@jsx jsx */
import {jsx} from '@emotion/react'
import React from 'react'
import { Select } from 'antd'
import {Form,Input} from 'antd'
interface SearchPanelProps {
    users: User[],
    param: {
        name:string;
        personId:string
    }
    setParam: (param:SearchPanelProps['param']) => void ;
}
export interface User {
    id:string;
    name:string;
    email:string;
    title:string;
    organization:string;
    token:string;
}
export const SearchPanel = ({users,param,setParam}:SearchPanelProps) =>{
    //写一个组件，先写他的状态
// 状态（State） 是组件内部的数据，当状态改变时，组件会重新渲染。
// param 是当前状态值，包含组件的数据
// setParam 是更新状态的函数
// useState 是React提供的Hook来管理状态
// 它们都是 React 的 useState Hook 自动生成的，不是我们手动定义的。
    return <Form layout="inline" css={{marginBottom:'2rem','>*':''}}>
        {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
        <Form.Item>
            <Input type="text" 
            placeholder={'项目名'}
        value={param.name} 
        onChange={evt => setParam({
            ...param,
            name: evt.target.value
        })}/>
        </Form.Item>
        {/* ...param：展开运算符，复制当前状态的所有属性 */}
        {/* name: evt.target.value：覆盖name属性 */}
        <Select
          style={{ width: 200, marginLeft: 8 }}
          placeholder="负责人"
          allowClear
          value={param.personId || undefined}
          onChange={(value) => {
            setParam({
              ...param,
              personId: (value as string) || ""
            })
          }}
          options={users.map((user: User) => ({
            label: user.name,
            value: String(user.id)
          }))}
        />
    </Form>
}