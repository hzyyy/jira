import { User } from 'screens/project-list/search-panel'

const localStorageKey = '__auth_provider_token___'
const baseUrl = process.env.REACT_APP_API_URL

export const getToken = () => localStorage.getItem(localStorageKey)

// 设置用户信息
export const handleUserResponse = ({ user }: { user: User }) => {
  localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return fetch(baseUrl + '/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 
      'Content-Type': 'application/json' 
    },
  }).then(async response => {
    if(response.ok) {
      return handleUserResponse(await response.json())
    }else {
      return Promise.reject(data)
    }
  })
}

export const register = (data: { username: string; password: string }) => {
  return fetch(baseUrl + '/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () => localStorage.removeItem(localStorageKey)