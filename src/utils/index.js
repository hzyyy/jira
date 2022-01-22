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