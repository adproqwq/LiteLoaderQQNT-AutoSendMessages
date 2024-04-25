import { BrowserWindow } from 'electron';

export const onBrowserWindowCreated = (window: BrowserWindow) => {
  console.log('[auto_send_message] 窗口已创建');
};