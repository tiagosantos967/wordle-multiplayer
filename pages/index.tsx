import type { NextPage } from 'next'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useCreateGameService } from '../client/services/game';
import { composeComponents } from '../client/utils/composeComponents';
import { withSocketConnection } from '../client/utils/hocs';
import { ServiceCallStatus } from '../client/utils/hooks';
import { SocketConnectionStatus, useSocket } from '../client/utils/useSocket';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { connectionStatus } = useSocket();

  const { result, data, callStatus } = useCreateGameService();

  useEffect(() => {
    if(connectionStatus == SocketConnectionStatus.Connected && callStatus == ServiceCallStatus.init){
      data({});
    }
  }, [connectionStatus])

  console.log('result', result, callStatus)

  return (
    <div className={styles.container}>
      Hello World
      <Link href="/page2">
        <a>page2</a>
      </Link>
    </div>
  )
}

export default composeComponents(
  withSocketConnection()
)(Home)
