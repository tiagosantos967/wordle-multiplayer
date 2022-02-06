import { useEffect, useState } from "react";
import { socketClient } from "./socket";

enum SocketConnectionStatus {
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
  }, [])

  socketClient?.on("connect", () => {
    console.log('socket connected', socketClient?.id);
    setConnectionStatus(SocketConnectionStatus.Connected)
  });

  socketClient?.on("disconnect", () => {
    console.log('socket disconnected', socketClient?.id);
    setConnectionStatus(SocketConnectionStatus.Disconnected)
  });

  return {
    connectionStatus
  }
}