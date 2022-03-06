import { useEffect, useState } from "react";
import { socketClient } from "./socket";

export enum SocketConnectionStatus {
  Init = 'INIT',
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
}

type UseSocketListener<T> = [string, (result: T) => void];

export const generateSocketListeners = <T>(...listeners: Array<[string | undefined, (result: T) => void]>): Array<UseSocketListener<T>> => {
  return listeners.filter(([eventName]) => !!eventName) as Array<UseSocketListener<T>>
}

export const useSocket = <T>(listeners?: Array<UseSocketListener<T>>, deps?: Array<any>) => {
  const [connectionStatus, setConnectionStatus] = useState(
    socketClient?.connected ? SocketConnectionStatus.Connected : SocketConnectionStatus.Init
  )

  useEffect(() => {
    console.log('mount socket')
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
      socketClient?.off('connect')
      socketClient?.off('disconnect')
    }
  }, [])

  useEffect(() => {
    listeners?.forEach(([event, callback]) => {
      socketClient?.on(event, callback)
    })

    return () => {
      listeners?.forEach(([event]) => {
        socketClient?.off(event)
      })
    }
  }, [deps])

  return {
    connectionStatus,
    sendWhoAmI: (_id: string) =>  socketClient?.emit('who-am-i', _id)
  }
}