"use client"
import React, { useEffect, useState } from 'react'
import Login from "./components/Login"
import Loading from "./components/Loading"
import Home from "./components/Home"

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  if (isLoggedIn === null) {
    return <Loading />
  }

  return (
    <div>
      {isLoggedIn ? <Home /> : <Login onLogin = {() => setIsLoggedIn(true)}/>}
    </div>
  )
}


export default Main