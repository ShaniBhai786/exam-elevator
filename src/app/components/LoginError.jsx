"use client"
import React from 'react'
import Link from 'next/link'
import styles from '../utills.module.css'

function LoginError() {
  return (
    <div className={styles.loginErrorContainer}>
      <h1>Please Login</h1>
      <Link href="/">
        <button>Login</button>
      </Link>
    </div>
  )
}

export default LoginError