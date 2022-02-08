import { useEffect, useState } from "react"
import { cleanObject, useMount, useDebounce } from "utils/index"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import qs from 'qs'
import { useHttp } from "utils/http"


const baseUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [ param, setParam ] = useState({
    name: '',
    personId: '',
  })

  // 给param 添加debounce 防抖
  const debounceParam = useDebounce(param, 1000)

  // 负责人列表
  const [ users, setUsers ] = useState([])

  // 项目列表
  const [ list, setList ] = useState([])

  const clinet = useHttp()

  // 监听param / debounceParam 的变化，去请求项目数据
  useEffect(() => {
    clinet('projects', { data: cleanObject(debounceParam) }).then(setList)
  }, [debounceParam])

  // 只执行一次
  useMount(() => {
    clinet('users').then(setUsers)
  })
  
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List list={list} users={users} />
  </div>
}