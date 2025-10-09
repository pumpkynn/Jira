import React from "react"
import { User } from "./search-panel"
import { Table, TableProps } from "antd"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
export interface Project {
    id:string;
    name:string;
    personId:string;
    pin:boolean;
    organization:string;
    created:number;
}
interface ListProps extends TableProps<Project> {
   
    users: User[];
   
}
export const List = ({users,...props}:ListProps) =>{
    return <Table rowKey={(p: Project) => p.id} pagination={false} loading={props.loading} columns={[{
        title: '名称',
        sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
        render: (value: string, project: Project) => {
            return <Link to={String(project.id)}>{project.name}</Link>
        }
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
]} {...props}>
    </Table>
}