import { useState, useEffect } from 'react'

import Header from '../Header'
import Filter from '../Filter'
import Tabs from '../Tabs'

import styles from './App.module.scss'

const App = () => {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine ? 'Онлайн' : 'Офлайн')

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setOnlineStatus(navigator.onLine ? 'Онлайн' : 'Офлайн')
    }

    window.addEventListener('online', handleOnlineStatusChange)
    window.addEventListener('offline', handleOnlineStatusChange)

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange)
      window.removeEventListener('offline', handleOnlineStatusChange)
    }
  }, [onlineStatus])

  if (onlineStatus === 'Офлайн') {
    return (
      <h2
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'red',
        }}
      >
        Ошибка: Не возможно получить данные, отсутствует подключение к интернету!
      </h2>
    )
  }
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.container}>
          <Filter />
          <Tabs />
        </div>
      </div>
    </main>
  )
}

export default App
