// auth.js — localStorage helpers for token and user persistence

const TOKEN_KEY = 'edupath_token'
const USER_KEY = 'edupath_user'

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token)
export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user))
export const getUser = () => {
  try {
    const u = localStorage.getItem(USER_KEY)
    return u ? JSON.parse(u) : null
  } catch {
    return null
  }
}
export const removeUser = () => localStorage.removeItem(USER_KEY)

export const isAuthenticated = () => !!getToken()
export const isTeacher = () => {
  const user = getUser()
  return user?.role === 'teacher'
}

export const logout = () => {
  removeToken()
  removeUser()
}
