import { useEffect, useState } from "react";
import { socketClient } from "./socket";

export enum SocketConnectionStatus {
  Init = 'INIT',
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
}

export const useSocket = () => {
  const [connectionStatus, setConnectionStatus] = useState(SocketConnectionStatus.Init)

  useEffect(() => {
    if(socketClient?.connected) {
      console.log('mount connected')
      setConnectionStatus(SocketConnectionStatus.Connected)
    }
    socketClient?.on("game created", (data) => {
      console.log('game created', data);
    });
  
    socketClient?.on("connect", () => {
      console.log('socket connected', socketClient?.id);
      setConnectionStatus(SocketConnectionStatus.Connected)
    });
  
    socketClient?.on("disconnect", () => {
      console.log('socket disconnected', socketClient?.id);
      setConnectionStatus(SocketConnectionStatus.Disconnected)
    });

    return () => {
      socketClient?.off('game created')
      socketClient?.off('connect')
      socketClient?.off('disconnect')
    }
  }, [])

  return {
    connectionStatus
  }
}