import { useEffect, useState } from "react"
import { cleanObject } from "utils/index"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import qs from 'qs'


const baseUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [ param, setParam ] = useState({
    name: '',
    personId: '',
  })

  // 负责人
  const [ users, setUsers ] = useState([])

  // 项目列表
  const [ list, setList ] = useState([])

  // 监听param 的变化，去请求项目数据
  useEffect(() => {
    fetch(baseUrl + '/projects?' + qs.stringify(cleanObject(param))).then(async response => {
      if(response.ok) {
        setList(await response.json())
      }
    })
  }, [param])

  // 只执行一次
  useEffect(() => {
    fetch(baseUrl + '/users').then(async response => {
      if(response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List list={list} users={users} />
  </div>
}