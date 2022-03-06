import { getConnectedSockets } from "./io";

export const updateSelectedSockets = <T> (
  socketsToUpdate: (result: T) => Promise<Array<string> | undefined>,
  eventName: string,
) => async (result: T) => {
  const selectedSockets = await socketsToUpdate(result);
  getConnectedSockets()
    .filter((socket) => socket._whoami && selectedSockets?.includes(socket._whoami))
    .forEach((socket) => socket.emit(eventName, result))
}
