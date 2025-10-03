import React from "react"
import { User } from "./search-panel"
import { Table } from "antd"
interface Project {
    id:string;
    name:string;
    personId:string;
    pin:boolean;
    organization:string;
}
interface ListProps {
    list :Project[],
    users:User[],
}
export const List = ({list,users}:ListProps) =>{
    return <Table rowKey={(p: Project) => p.id} pagination={false} columns={[{
        title: '名称',
        render: (value: string, project: Project) => {
            const ownerName = users.find((user: User) => Number(user.id) === Number(project.personId))?.name || ''
            return <span>{`${project.name} ${ownerName}`.trim()}</span>
        },
        sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
    }]} dataSource={list}>
    </Table>
}