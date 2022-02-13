import { useState } from "react";

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
