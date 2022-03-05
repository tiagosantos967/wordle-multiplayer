import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCreateGameService, useGameCookie, useListGameService } from "../services/game";
import { useCreatePlayerService, usePlayerCookie } from "../services/player";
import { HOC } from "./composeComponents";
import { ServiceCallStatus } from "./hooks";
import { SocketConnectionStatus, useSocket } from "./useSocket";

export const withQueryParamsHydrated = ():HOC => (Component) => (props) => {
  const router = useRouter();
  const { _id } = router.query;

  if(!_id) {
    return <></>
  }

  return React.createElement(Component, props)
} 

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

export const withGame = ():HOC => (Component) => (props) => {
  const { data, result: createResult, callStatus: createCallStatus } = useCreateGameService();
  const { query, result: listResult, callStatus: listCallStatus } = useListGameService();
  const { set: setGameCookie } = useGameCookie();
  const [ gameExists, setGameExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    query({_id: router.query._id as string})
  }, [])

  useEffect(() => {
    if(listCallStatus == ServiceCallStatus.success && listResult?.total == 1) {
      setGameExists(true)
    } else {
      setGameExists(false)
    }
  }, [listCallStatus])

  useEffect(() => {
    if(createCallStatus == ServiceCallStatus.success) {
      setGameCookie(createResult?._id as string) // FIX
      router.push(`/game/${createResult?._id}`) // FIX
    }
  }, [createCallStatus])

  if([ServiceCallStatus.init, ServiceCallStatus.inProgress].includes(listCallStatus)) {
    return <p>Finding game...</p>
  }

  if(!gameExists) {
    return (
      <div>
        <p>Game does not exist</p>
        <button onClick={() => data({})}>Create a new one</button>
      </div>
    )
  }

  return React.createElement(Component, props) 
}