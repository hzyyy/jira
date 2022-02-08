/**
 * 全局状态
 */

import React, { ReactNode, useState } from 'react';
import * as auth from 'auto-provider'
import { User } from 'screens/project-list/search-panel'
import { http } from 'utils/http';
import { useMount } from 'utils';

// 创建context
const AuthContext = React.createContext< {
  user: User | null,
  register: ( from: AuthForm ) => Promise<void>
  login: ( from: AuthForm ) => Promise<void>,
  logout: () => Promise<void>
} | undefined >(undefined);
AuthContext.displayName = 'AuthContext'

interface AuthForm {
  username: string;
  password: string;
}

// 页面刷新时，通过token，重新获取user info
const bootstrapUser = async () => {
  let user = null
  let token = auth.getToken()

  if(token) {
    const data = await http('me', { token })
    user = data.user
  }

  return user
}

// 刷新页面时，执行此方法；被context/index 调用
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const  [ user, setUser ] = useState<User | null>(null)

  const login = ( form: AuthForm ) => auth.login(form).then(setUser)        // 相当于 .then( result => setUser(result))
  const register = ( form: AuthForm ) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  // 初始化User
  useMount(() => {
    bootstrapUser().then(setUser)
  })

  return <AuthContext.Provider children={children} value={{ user, login, register, logout }} />
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)

  if(!context) {
    throw new Error('useAuth 必须在AuthProvider中使用')
  }
  return context
}