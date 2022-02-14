import { useState } from "react"
import Cookies from 'js-cookie';

const getCookieValue = (cookieName: string) => Cookies.get(cookieName);
const setCookieValue = (cookieName: string, cookieValue: string) => Cookies.set(cookieName, cookieValue);

export const useCookie = (cookieName: string, defaultValue?: string) => {
  const [value, setValue] = useState(getCookieValue(cookieName) || defaultValue)

  const set = (newValue: string) => {
    setCookieValue(cookieName, newValue)
    setValue(newValue)
  }

  return {
    value,
    set
  }
}