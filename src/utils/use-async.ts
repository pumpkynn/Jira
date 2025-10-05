import { useState, useEffect } from "react";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {   
    error: null,
    data: null,
    stat: 'idle',
}

export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState<State<D>>(
        {
            ...defaultInitialState,
            ...initialState,
        }
    )
    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null,
    })
    const setError = (error: Error) => setState({
        error,
        stat: 'error',
        data: null,
    })
    //run 用来触发异步请求
    const run = (promise: Promise<D>) => {
        if(!promise || !promise.then){
            throw new Error('请传入 Promise 类型数据')
        }
        setState(prev => ({...prev, stat: 'loading'}))
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            throw error
        })
    }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state,
    }
}