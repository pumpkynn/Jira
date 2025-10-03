import { User } from './screens/project-list/search-panel'
const apiUrl = process.env.REACT_APP_API_URL?.replace(/\/+$/, '')
const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = (user: User) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
}
export const login = (data: { username: string, password: string }) => {
    const url = apiUrl ? `${apiUrl}/login` : `login`
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            const result = await response.json()
            const user = (result as any)?.user
            handleUserResponse(user)
            return user as User
        }
        const errBody = await response.json().catch(() => ({}))
        const message = (errBody as any)?.message || '登录失败'
        return Promise.reject(new Error(message))
    })
}
export const register = (data: { username: string, password: string }) => {
  const url = apiUrl ? `${apiUrl}/register` : `register`
  return fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
   }).then(async response => {
    if(response.ok){
        const result = await response.json()
        const user = (result as any)?.user
        handleUserResponse(user)
        return user as User
    }
    const errBody = await response.json().catch(() => ({}))
    const message = (errBody as any)?.message || '注册失败'
    return Promise.reject(new Error(message))
   })
}
export const logout = async () => {
    window.localStorage.removeItem(localStorageKey)
}