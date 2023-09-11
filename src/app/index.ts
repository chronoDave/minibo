import { BrowserWindow, app } from 'electron';

app.whenReady()
  .then(() => {
    const window = new BrowserWindow();
    window.loadFile('renderer/index.html');
    return window.show();
  })
  .catch(console.error);
