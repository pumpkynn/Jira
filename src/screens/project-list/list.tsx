import React from "react"
import { User } from "./search-panel"
import { Table } from "antd"
import dayjs from "dayjs"
interface Project {
    id:string;
    name:string;
    personId:string;
    pin:boolean;
    organization:string;
    created:number;
}
interface ListProps {
    list :Project[],
    users:User[],
}
export const List = ({list,users}:ListProps) =>{
    return <Table rowKey={(p: Project) => p.id} pagination={false} columns={[{
        title: '名称',
        dataIndex: 'name',
        sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
    },
    {
        title: '部门',
        dataIndex: 'organization',
        sorter: (a: Project, b: Project) => a.organization.localeCompare(b.organization),
    },{
        title: '负责人',
        render: (value: string, project: Project) => {
            return <span>{users.find((user: User) => Number(user.id) === Number(project.personId))?.name || ""}</span>
        }
    },{
        title: '创建时间',
        dataIndex: 'created',
        render: (value: boolean,project: Project) => {
            return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}</span>
        }
    },
]} dataSource={list}>
    </Table>
}