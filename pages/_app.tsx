import '../styles/globals.css'
import type { AppProps } from 'next/app'
import io from "socket.io-client";


const MyApp = ({ Component, pageProps }: AppProps) => {
  const socket = io('http://localhost:8080');

  console.log('here')

  // client-side
  socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });

  return <Component {...pageProps} />
}

export default MyApp
