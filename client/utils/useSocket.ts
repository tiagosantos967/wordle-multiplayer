import { useEffect, useState } from "react";
import { socketClient } from "./socket";

export enum SocketConnectionStatus {
  Init = 'INIT',
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
}

type UseSocketListener<T> = [string, (result: T) => void];

export const useSocket = <T>(...listeners: Array<UseSocketListener<T>>) => {
  const [connectionStatus, setConnectionStatus] = useState(
    socketClient?.connected ? SocketConnectionStatus.Connected : SocketConnectionStatus.Init
  )

  useEffect(() => {
    console.log('mount socket')
    listeners.forEach(([event, callback]) => {
      socketClient?.on(event, callback)
    })
  
    socketClient?.on("connect", () => {
      console.log('socket connected', socketClient?.id);
      setConnectionStatus(SocketConnectionStatus.Connected)
    });
  
    socketClient?.on("disconnect", () => {
      console.log('socket disconnected', socketClient?.id);
      setConnectionStatus(SocketConnectionStatus.Disconnected)
    });

    return () => {
      console.log('unmounting useSocket')
      listeners.forEach(([event]) => {
        socketClient?.off(event)
      })
      socketClient?.off('connect')
      socketClient?.off('disconnect')
    }
  }, [])

  return {
    connectionStatus,
    sendWhoAmI: (_id: string) =>  socketClient?.emit('who-am-i', _id)
  }
}