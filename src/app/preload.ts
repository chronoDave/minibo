import { ipcRenderer } from 'electron';

const send = (
  channel: IpcChannel,
  action: IpcRoute
) => (payload?: unknown) => {
  const event: IpcEvent = { action, payload };
  ipcRenderer.send(channel, event);
};
