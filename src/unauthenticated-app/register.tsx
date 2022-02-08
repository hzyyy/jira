import { useAuth } from 'context/auth-context'
import { FormEvent } from 'react'

const baseUrl = process.env.REACT_APP_API_URL

export const RegisterScreen = () => {
  const { user, register } = useAuth()
  

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  
    let username = (event.currentTarget.elements[0] as HTMLInputElement).value
    let password = (event.currentTarget.elements[1] as HTMLInputElement).value
    
    // 调用auth-context.tsx 内的方法
    register({username, password})
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={'username'} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={'password'} />
      </div>
      <div>
        <button type="submit">注册</button>
      </div>
    </form>
  )
}