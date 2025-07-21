// src/store/auth.ts
import { createStore } from "solid-js/store"

type User = {
  id: string
  name: string
  token: string
}

const [auth, setAuth] = createStore<{
  user: User | null
  isLoggedIn: boolean
}>({
  user: null,
  isLoggedIn: false
})

function login(user: User) {
  setAuth({
    user,
    isLoggedIn: true
  })
  localStorage.setItem("token", user.token)
}

function logout() {
  setAuth({
    user: null,
    isLoggedIn: false
  })
  localStorage.removeItem("token")
}

export { auth, login, logout }
