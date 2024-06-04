import { cookies } from "next/headers"

export async function saveString(key: string, value: string) {
  const appCookie = cookies()
  appCookie.set(key, value)
}

export async function loadString(key: string) {
  const appCookie = cookies()
  return appCookie.get(key)?.value
}

export async function getAllCookies() {
  const appCookie = cookies()
  appCookie.getAll()
}

export async function deleteCookies(key: string) {
  const appCookie = cookies()
  appCookie.delete(key)
}

export async function clearAll() {
  const appCookie = cookies()
  const data = appCookie.getAll()
  data.forEach((item) => {
    deleteCookies(item.name)
  })
}