import type { NextPage } from 'next'
import Link from 'next/link';
import React from 'react';
import { useSocket } from '../client/utils/useSocket';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { connectionStatus } = useSocket();
  console.log(connectionStatus)

  return (
    <div className={styles.container}>
      Hello World
      <Link href="/page2">
        <a>page2</a>
      </Link>
    </div>
  )
}

export default Home
