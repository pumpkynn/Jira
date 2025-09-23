import React from "react"
import { User } from "./search-panel"
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
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map((project: Project) => <tr key={project.id}>
                    <td>{project.name}</td>
                    {/* undefine.name */}
                    <td>{users.find((user: User) => Number(user.id) === Number(project.personId))?.name || ""}</td>
                    </tr>)
            }
        </tbody>
    </table>
}