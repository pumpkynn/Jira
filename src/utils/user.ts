import { User } from "../screens/project-list/search-panel"
import { useAsync } from "./use-async"
import { useEffect } from "react"
import { cleanObject } from "./index"
import { useHttp } from "./http"
export const useUsers = (param ?:Partial<User>) => {
    const client = useHttp()
    const {run,...result} = useAsync<User[]>()
    useEffect(() => {
        // 添加条件检查，避免无效请求
        if (Object.keys(cleanObject(param)).length > 0) {
            run(client('users',{data:cleanObject(param)}))
        }
    }, [param,run,client])
    return result
}