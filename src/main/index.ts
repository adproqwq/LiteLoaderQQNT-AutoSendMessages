import { app, dialog, ipcMain } from 'electron';
import { config, ISettingConfig } from '../config/config';
import { normalize } from 'node:path';

ipcMain.on('LLASM.openFileDialog', (_, type: 'chats' | 'groups') => {
  dialog.showOpenDialog({
    title: '请选择图片',
    buttonLabel: '使用该图片',
    filters: [
      {
        name: 'Images',
        extensions: ['jpg', 'png', 'gif']
      },
    ],
    properties: ['openFile', 'showHiddenFiles'],
  }).then(async (r) => {
    if(!r.canceled){
      let userConfig: ISettingConfig = await LiteLoader.api.config.get('auto_send_messages', config);
      userConfig.pictures[type] = normalize(r.filePaths[0]);
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
    }
  });
});

app.whenReady().then(async () => {
  if(await LiteLoader.api.checkUpdate('auto_send_messages')){
    if(await LiteLoader.api.downloadUpdate('auto_send_messages')) LiteLoader.api.showRelaunchDialog('auto_send_messages', true);
  }
});