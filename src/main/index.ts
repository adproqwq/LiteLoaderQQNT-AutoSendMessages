import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { config, IConfig } from '../config/config';
import { normalize } from 'node:path';

ipcMain.on('LLASM.openFileDialog', (_, type: 'chats' | 'groups', index: number) => {
  dialog.showOpenDialog({
    title: '请选择图片',
    buttonLabel: '使用该图片',
    filters: [
      {
        name: 'Images',
        extensions: ['jpg', 'png', 'gif'],
      },
    ],
    properties: ['openFile', 'showHiddenFiles'],
  }).then(async (r) => {
    if(!r.canceled){
      let userConfig: IConfig= await LiteLoader.api.config.get('auto_send_messages', config);
      userConfig.data[index].pictures[type] = normalize(r.filePaths[0]);
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
    }
  });
});

export const onLogin = () => {
  const windows = BrowserWindow.getAllWindows();
  windows[0].webContents.send('LLASM.onLogin');
};

app.whenReady().then(async () => {
  LiteLoader.api.setMinLoaderVer('auto_send_messages', '1.2.0');

  if(await LiteLoader.api.checkUpdate('auto_send_messages')){
    if(await LiteLoader.api.downloadUpdate('auto_send_messages')) await LiteLoader.api.showRelaunchDialog('auto_send_messages', true);
  }
});