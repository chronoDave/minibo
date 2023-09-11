import { BrowserWindow, app } from 'electron';

app.whenReady()
  .then(() => {
    const window = new BrowserWindow();
    return window.show();
  })
  .catch(console.error);
