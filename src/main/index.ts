import { BrowserWindow, app, dialog } from 'electron';

app.whenReady().then(async () => {
  const isHaveUpdate = await LiteLoader.api.checkUpdate('auto_send_messages');
  if(isHaveUpdate){
    const updateResult = await LiteLoader.api.downloadUpdate('auto_send_messages');
    if(updateResult){
      dialog.showMessageBox(new BrowserWindow(), {
        title: '插件已更新，需要重启',
        message: '定时消息 插件已更新，需要重启',
        type: 'warning',
        buttons: ['现在重启', '稍后自行重启'],
        cancelId: 1,
        defaultId: 0,
      }).then((c) => {
        if(c.response == 0){
          app.relaunch();
          app.exit();
        }
      });
    }
  }
});

export const onBrowserWindowCreated = (window: BrowserWindow) => {
  console.log('[auto_send_message] 窗口已创建');
  console.log('[auto_send_message] 窗口信息：', window);
};