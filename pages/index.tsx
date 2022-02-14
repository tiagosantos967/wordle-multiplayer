import type { NextPage } from 'next'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useCreateGameService, useGameCookie } from '../client/services/game';
import { composeComponents } from '../client/utils/composeComponents';
import { ServiceCallStatus } from '../client/utils/hooks';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { result, data, callStatus } = useCreateGameService();
  const { value: gameCookie, set: setGameCookie } = useGameCookie();

  useEffect(() => {
    if(callStatus === ServiceCallStatus.success) {
      setGameCookie(result?._id as string) // FIX!
    }
  }, [callStatus])

  console.log('result', result, callStatus)
  console.log('gameCookie', gameCookie)

  return (
    <div className={styles.container}>
      <p>Hello World</p>
      <p><Link href="/page2"><a>Go to page2</a></Link></p>
      {gameCookie 
        ? <p><Link href={`/game/${gameCookie}`}><a>Go to game {gameCookie}</a></Link></p>
        : <button onClick={() => data({})}>Generate game</button>
      }
    </div>
  )
}

export default composeComponents(
)(Home)
