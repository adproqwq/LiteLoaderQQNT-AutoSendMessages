import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import { normalize } from 'node:path';
import fs from 'node:fs/promises';
import { config, ISettingConfig } from '../config/config';

let uid: string;

const readConfig = async (uid: string): Promise<ISettingConfig> => {
  const config: ISettingConfig = JSON.parse(await fs.readFile(`${LiteLoader.plugins.auto_send_messages.path.data}/${uid}.json`, 'utf-8'));

  return config;
};

const writeConfig = async (uid: string, newConfig: ISettingConfig) => {
  await fs.writeFile(`${LiteLoader.plugins.auto_send_messages.path.data}/${uid}.json`, JSON.stringify(newConfig, undefined, 2));
};

ipcMain.on('LLASM.openFileDialog', (_, type: 'chats' | 'groups', uid: string) => {
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
      let userConfig: ISettingConfig = await readConfig(uid);
      userConfig.pictures[type] = normalize(r.filePaths[0]);
      await writeConfig(uid, userConfig);
    }
  });
});

ipcMain.on('LLASM.writeConfig', async (_, uid: string, newConfig: ISettingConfig) => {
  await writeConfig(uid, newConfig);
});

ipcMain.handle('LLASM.getUid', () => {
  return uid;
});

export const onLogin = async (uid: string) => {
  // data 目录检测
  try{
    await fs.access(LiteLoader.plugins.auto_send_messages.path.data, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK);
  } catch{
    await fs.mkdir(LiteLoader.plugins.auto_send_messages.path.data);
  }

  // 数据文件检测
  try{
    await fs.access(`${LiteLoader.plugins.auto_send_messages.path.data}/${uid}.json`, fs.constants.F_OK);
  } catch{
    await writeConfig(uid, config);
  }

  const windows = BrowserWindow.getAllWindows();
  windows[0].webContents.send('LLASM.onLogin' ,uid);
};

export const onBrowserWindowCreated = (window: BrowserWindow) => {
  window.webContents.send = new Proxy(window.webContents.send, {
    apply(target, thisArg, args){
      if(args[0] == 'LLASM.onLogin') uid = args[1];

      Reflect.apply(target, thisArg, args);
    },
  });
};

app.whenReady().then(async () => {
  LiteLoader.api.setMinLoaderVer('auto_send_messages', '1.2.0');

  if(await LiteLoader.api.checkUpdate('auto_send_messages')){
    if(await LiteLoader.api.downloadUpdate('auto_send_messages')) await LiteLoader.api.showRelaunchDialog('auto_send_messages', true);
  }
});