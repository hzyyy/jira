import * as auth from 'auto-provider';
import { useAuth } from 'context/auth-context';
import qs from "qs"

const baseUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (endpoint: string, { data, token, headers, ...customerConfig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? 'Bearer ' + token : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customerConfig
  }

  if(config?.method?.toUpperCase() === 'GET') {
    endpoint += '?' + qs.stringify(data)
  }else {
    config.body = JSON.stringify(data)
  }

  return window.fetch(baseUrl + '/' + endpoint, config).then( async response => {
    if(response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登陆'})
    }
    const data = await response.json()

    if(response.ok){
      return data
    }else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()

  // Parameters<typeof http>: 操作符，
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token})
}