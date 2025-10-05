import { useState } from "react"
    interface State<D> {
    error: Error | null,
    data: D | null,
    status: 'idle' | 'loading' | 'error' | 'success',
}
const defaultInitialState: State<null> = {
    error: null,
    data: null,
    status: 'idle',
}

export const useAsync = <D>(initialState?: State<D>,initialConfig?: typeof defaultConfig) =>{
    const [state, setState] = useState<State<D>>(
        {
            ...defaultInitialState,
            ...initialState,
        }
    )
const setData = (data: D | null) => setState({
    data,
    status: 'success',
    error: null,
})
const setError = (error: Error | null) => setState({
    data: null,
    error,
    status: 'error',
})
const defaultConfig = {
    throwOnError: false,
}
//run函数是用来执行异步操作的
const run = async (promise: Promise<D>,initialConfig?: typeof defaultConfig) => {
    const config = {
        ...defaultConfig,
        initialConfig,
    }
    if(!promise || !promise.then) {
        throw new Error('请传入 Promise 类型数据')
    }
    setState({...state, status: 'loading'})
    return promise
        .then(data => {
            setData(data)
            return data
        })
        .catch(error => {
            if(config.throwOnError) {
                return Promise.reject(error)
            }
            setError(error)
            return Promise.reject(error)
        })
}
return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    ...state,
}
}