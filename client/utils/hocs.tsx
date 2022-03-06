import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCreateGameService, useGameCookie, useGetGameService, useJoinGameService } from "../services/game";
import { useCreatePlayerService, usePlayerCookie } from "../services/player";
import { HOC } from "./composeComponents";
import { ServiceCallStatus, useGetService } from "./hooks";
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
  const { sendWhoAmI } = useSocket();

  useEffect(() => {
    if(callStatus === ServiceCallStatus.success) {
      setPlayerCookie(result?._id as string) // FIX!
    }
  }, [callStatus])

  useEffect(() => {
    if(playerCookie) {
      sendWhoAmI(playerCookie)
    }
  }, [playerCookie])

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
  const { get, result: getResult, callStatus: getCallStatus } = useGetGameService();
  const { set: setGameCookie } = useGameCookie();
  const [ gameExists, setGameExists] = useState(false);
  const router = useRouter();

  useEffect(() => {
    get(router.query._id as string)
  }, [])

  useEffect(() => {
    if(getCallStatus == ServiceCallStatus.success && getResult) {
      setGameExists(true)
      setGameCookie(getResult._id as string) // FIX
    } else {
      setGameExists(false)
    }
  }, [getCallStatus])

  useEffect(() => {
    if(createCallStatus == ServiceCallStatus.success) {
      setGameCookie(createResult?._id as string) // FIX
      router.push(`/game/${createResult?._id}`) // FIX
    }
  }, [createCallStatus])

  if([ServiceCallStatus.init, ServiceCallStatus.inProgress].includes(getCallStatus)) {
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

export const withPlayerInGame = ():HOC => (Component) => (props) => {
  const { get: getGame, result: getGameResult, callStatus: getGameCallStatus } = useGetGameService();
  const { update: joinGame, result: joinGameResult, callStatus: joinGameCallStatus } = useJoinGameService();
  const { value: playerCookie } = usePlayerCookie();
  const { value: gameCookie } = useGameCookie();
  const [playerInGame, setPlayerInGame] = useState(false);

  useEffect(() => {
    if(gameCookie){
      getGame(gameCookie)
    }
  }, [gameCookie])

  useEffect(() => {
    if(getGameCallStatus == ServiceCallStatus.success) {
      if(getGameResult && playerCookie && getGameResult._players?.includes(playerCookie)){
        setPlayerInGame(true)
      }
    } else {
      setPlayerInGame(false)
    }
  }, [getGameCallStatus])

  useEffect(() => {
    if(joinGameCallStatus == ServiceCallStatus.success) {
      setPlayerInGame(true)
    } else {
      setPlayerInGame(false)
    }
  }, [joinGameCallStatus])

  if([ServiceCallStatus.init, ServiceCallStatus.inProgress].includes(getGameCallStatus)) {
    return <p>Checking game status...</p>
  }

  if(!gameCookie || !playerCookie) {
    return <p>There was an error. Game or Player cookie not ser</p>
  }

  if(!playerInGame) {
    return (
      <div>
        <p>Would you like to join this session?</p>
        <button onClick={() => joinGame(gameCookie, {_players: [playerCookie]})}>Join</button>
      </div>
    )
  }

  return React.createElement(Component, props) 
}