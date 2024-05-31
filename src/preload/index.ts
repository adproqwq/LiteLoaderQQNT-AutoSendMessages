import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('LLASM', {
  openFileDialog: (type: 'chats' | 'groups') => {
    ipcRenderer.send('LLASM.openFileDialog', type);
  }
});