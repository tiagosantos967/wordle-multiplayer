import React, { useEffect } from "react";
import { useCreatePlayerService, usePlayerCookie } from "../services/player";
import { HOC } from "./composeComponents";
import { ServiceCallStatus } from "./hooks";
import { SocketConnectionStatus, useSocket } from "./useSocket";

export const withSocketConnection = ():HOC => (Component) => (props) => {
  const { connectionStatus } = useSocket();

  if(connectionStatus !== SocketConnectionStatus.Connected) {
    return <div>Socket not connected</div>
  }

  return React.createElement(Component, props)
} 

export const withPlayer = ():HOC => (Component) => (props) => {
  const { data, result, callStatus } = useCreatePlayerService();
  const { value: playerCookie, set: setPlayerCookie } = usePlayerCookie();

  useEffect(() => {
    if(callStatus === ServiceCallStatus.success) {
      setPlayerCookie(result?._id as string) // FIX!
    }
  }, [callStatus])

  if(!playerCookie) {
    return (
      <div>
        <p>Create a player account:</p>
        <button onClick={() => data({})}>Create an acount</button>
      </div>
    )
  }

  return React.createElement(Component, props) 
}