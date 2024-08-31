import { contextBridge, ipcRenderer } from 'electron';
import { ISettingConfig } from '../config/config';

contextBridge.exposeInMainWorld('LLASM', {
  openFileDialog: (type: 'chats' | 'groups', uid: string) => {
    ipcRenderer.send('LLASM.openFileDialog', type, uid);
  },
  onLogin: (callback: () => void) => {
    ipcRenderer.on('LLASM.onLogin', callback);
  },
  writeConfig: (uid: string, config: ISettingConfig) => {
    ipcRenderer.send('LLASM.writeConfig', uid, config);
  },
  getUid: (): Promise<string> => ipcRenderer.invoke('LLASM.getUid'),
});