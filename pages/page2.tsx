import type { NextPage } from 'next'
import { useSocket } from '../client/utils/useSocket';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const { connectionStatus } = useSocket();
  console.log(connectionStatus)

  return (
    <div className={styles.container}>
      Hello World 2
    </div>
  )
}

export default Home
