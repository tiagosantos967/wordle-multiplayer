import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { TextField } from "../../components/molecules/Form";
import { SimpleCardPageTemplate } from "../../components/templates/SimpleCardPageTemplate";
import { SimpleFormCardPageTemplate } from "../../components/templates/SimpleFormCardPageTemplate";
import { useCreateGameService, useGameCookie, useGetGameService, useJoinGameService } from "../services/game";
import { useCreatePlayerService, useGetPlayerService, usePlayerCookie } from "../services/player";
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
  const { data, result: createResult, callStatus: createCallStatus } = useCreatePlayerService();
  const { get, result: getResult, callStatus: getCallStatus } = useGetPlayerService();
  const { value: playerCookie, set: setPlayerCookie } = usePlayerCookie();
  const [ playerExists, setPlayerExists] = useState(false);
  const { sendWhoAmI } = useSocket();

  useEffect(() => {
    if(playerCookie){
      get(playerCookie)
    } else {
      setPlayerExists(false)
    }
  }, [])

  useEffect(() => {
    if(getCallStatus == ServiceCallStatus.success && getResult){
      setPlayerCookie(getResult._id)
      setPlayerExists(true)
      sendWhoAmI(getResult._id)
    } else {
      setPlayerExists(false)
    }
  }, [getCallStatus])

  useEffect(() => {
    if(createCallStatus == ServiceCallStatus.success && createResult){
      setPlayerCookie(createResult._id)
      setPlayerExists(true)
      sendWhoAmI(createResult._id)
    }
  }, [createCallStatus])

  if(!playerExists) {
    return (
      <SimpleFormCardPageTemplate<{username: string}>
        title="⚽️ Create a player"
        subTitle="Click here to create a new player account."
        buttonText="Create a new player"
        onSubmit={({username}) => {data({ name: username})}}
        initialValues={{ username: '' }}
      >
        <TextField
          name="username"
          label="Your username"
          fullWidth
        />
      </SimpleFormCardPageTemplate>
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
      <SimpleCardPageTemplate
        title="✖️ Game not found"
        subTitle="You are trying to join a game that does not exist. Or has been deleted. It is time to create a new one"
        buttonText="Create a new one"
        onClick={() => data({})}
      />
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
    return <p>There was an error. Game or Player cookie not set</p>
  }

  if(!playerInGame) {
    return (
      <SimpleCardPageTemplate
        title="🏁 Ready, set, go!"
        subTitle="Click start when you are ready to join the room"
        buttonText="Start"
        onClick={() => joinGame(gameCookie, {_players: [playerCookie]})}
      />
    )
  }

  return React.createElement(Component, props) 
}