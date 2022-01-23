import { useEffect, useState } from "react"

// 对传入的Object 进行数据处理
export const cleanObject = (obj) => {
  const result = { ...obj }

  Object.keys(result).forEach( key => {
    const value = result[key]

    if(value === '') {
      delete result[key]
    }
  })

  return result
}

// 封装hook，方法内的代码只执行一次
export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, []);
}

// 封装hook，防抖
// 不直接修改传入的value，而是通过useState 去修改
export const useDebounce = (value, delay) => {
  const [ debounceValue, setDebounceValue ] = useState(value)
  
  // 监听value 值的变化
  useEffect(() => {
    // 通过setDebounceValue，去更新state
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    
    // 每次在上一个useEffect 处理完后清理
    return () => clearTimeout(timeout)
  }, [value, delay]);

  // 最终返回修改后的state 值
  return debounceValue
}
