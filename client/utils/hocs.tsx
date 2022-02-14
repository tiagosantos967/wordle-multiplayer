import React from "react";
import { HOC } from "./composeComponents";
import { SocketConnectionStatus, useSocket } from "./useSocket";

export const withSocketConnection = ():HOC => (Component) => (props) => {
  const { connectionStatus } = useSocket();

  if(connectionStatus !== SocketConnectionStatus.Connected) {
    return <div>Socket not connected</div>
  }

  return React.createElement(Component, props)
} 