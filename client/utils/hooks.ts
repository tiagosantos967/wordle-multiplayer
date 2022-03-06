import { useCallback, useState } from "react";
import { IdModel, ListResult } from "../../server/utils/service";
import { generateSocketListeners, useSocket } from "./useSocket";

export enum ServiceCallStatus {
  init,
  inProgress,
  success,
  error
}

export const useCreateService = <T>(serviceUrl: string) => {
  const [result, setResult] = useState<T>();
  const [callStatus, setCallStatus] = useState<ServiceCallStatus>(ServiceCallStatus.init);

  const data = async (data: Partial<T>) => {
    setCallStatus(ServiceCallStatus.inProgress)

    const result = await fetch(
      serviceUrl,
      { method: 'POST', body: JSON.stringify(data)}
    )
    const response = await result.json();

    setResult(response)
    setCallStatus(ServiceCallStatus.success)
  }

  return {
    result,
    data,
    callStatus
  }
}

export const useListService = <T extends IdModel>(serviceUrl: string) => {
  const [result, setResult] = useState<ListResult<T>>();
  const [callStatus, setCallStatus] = useState<ServiceCallStatus>(ServiceCallStatus.init);

  const query = async (query: Partial<T>) => {
    setCallStatus(ServiceCallStatus.inProgress)

    const result = await fetch(
      serviceUrl + '?' + new URLSearchParams(query as any),
      { method: 'GET' }
    )
    const response = await result.json() as ListResult<T>;
    setResult(response)
    setCallStatus(ServiceCallStatus.success)
  }

  return {
    result,
    query,
    callStatus
  }
}

export const useGetService = <T extends IdModel>(serviceUrl: string, eventName?: string) => {
  const [result, setResult] = useState<T>();
  const [callStatus, setCallStatus] = useState<ServiceCallStatus>(ServiceCallStatus.init);

  const updateResult = (data: T) => {
    if(eventName && data._id === result?._id) {
      setResult(data)
    }
  };

  useSocket(
    generateSocketListeners(
      [eventName, updateResult]
    ),
    [result?._id]
  )

  const get = async (_id: string) => {
    setCallStatus(ServiceCallStatus.inProgress)

    const result = await fetch(
      serviceUrl + '/' + _id,
      { method: 'GET' }
    )

    try { // FIX
      const response = await result.json() as T | undefined;
      setResult(response)
    } catch (error) {
      setResult(undefined)
    }
    setCallStatus(ServiceCallStatus.success)
  }

  return {
    result,
    get,
    callStatus
  }
}

export const useUpdateService = <T extends IdModel>(serviceUrl: string) => {
  const [result, setResult] = useState<T>();
  const [callStatus, setCallStatus] = useState<ServiceCallStatus>(ServiceCallStatus.init);

  const update = async (_id: string, data: Partial<T>) => {
    setCallStatus(ServiceCallStatus.inProgress)

    const result = await fetch(
      serviceUrl + '/' + _id,
      { method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) }
    )

    try { // FIX
      const response = await result.json() as T | undefined;
      setResult(response)
    } catch (error) {
      setResult(undefined)
    }
    setCallStatus(ServiceCallStatus.success)
  }

  return {
    result,
    update,
    callStatus
  }
}
