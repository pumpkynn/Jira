import { useEffect, useState } from "react"
// 判断值是否为假值（需要删除的值）
export const isFalsy = (value: unknown): boolean => {
    // 0 不是假值，应该保留
    if (value === 0) return false
    // 其他假值：null, undefined, "", false
    return !value
}

//在一个函数里面，改变传入的对象是不好的
export const cleanObject = <T extends Record<string, unknown>>(object: T): Partial<T> => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result
}

// 组件挂载时执行一次的自定义 Hook
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 
}
export const useDebounce = <T>(value: T, delay: number): T => {
    //每次在value变化后，设置一个定时器,说明用户在操作，不希望频繁的请求
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        //每次在value变化后，清除定时器,说明用户停止操作，可以请求了
        return () =>clearTimeout(timeout)
    },[value,delay])
    return debouncedValue
}