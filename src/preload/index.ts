import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('LLASM', {
  openFileDialog: (type: 'chats' | 'groups', index: number) => {
    ipcRenderer.send('LLASM.openFileDialog', type, index);
  },
  onLogin: (callback: () => void) => {
    ipcRenderer.on('LLASM.onLogin', callback);
  },
});