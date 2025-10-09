import React, { useState } from "react"
export const Test = () => {
    const [num,setNum] = useState(0)
    return <div>Test{num}
        <button onClick={()=>setNum(num+1)}>+</button>
        <button onClick={()=>setNum(num-1)}>-</button>
    </div>
}