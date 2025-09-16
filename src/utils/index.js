// 判断值是否为假值（需要删除的值）
export const isFalsy = (value) => {
    // 0 不是假值，应该保留
    if (value === 0) return false
    // 其他假值：null, undefined, "", false
    return !value
}

//在一个函数里面，改变传入的对象是不好的
export const cleanObject = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        const value = result[key]
        if(isFalsy(value)){
            delete result[key]
        }
    })
    return result
}