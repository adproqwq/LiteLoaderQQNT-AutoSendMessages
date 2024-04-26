import sendMsg from '../utils/sendMsg';
import { config, ISettingConfig } from '../config/config';
import settingsPage from '../pages/settings';

const onload = () => {
  console.log('[auto_send_message] 渲染进程工作');
  sendMsg();
};
onload();

export const onSettingWindowCreated = async (view: HTMLElement) => {
  let userConfig: ISettingConfig = await globalThis.LiteLoader.api.config.get('auto_send_messages', config);

  view.innerHTML = settingsPage;
  (view.querySelector('#messageContent') as HTMLInputElement).value = userConfig.message;
  (view.querySelector('#group') as HTMLInputElement).value = userConfig.group;
  (view.querySelector('#time') as HTMLInputElement).value = userConfig.time;
  (view.querySelector('#pluginVersion') as HTMLParagraphElement).innerHTML = globalThis.LiteLoader.plugins.auto_send_messages.manifest.version;

  (view.querySelector('#messageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.message = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#group') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.group = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#time') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.time = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#github') as HTMLButtonElement).addEventListener('click', () => {
    globalThis.LiteLoader.api.openExternal('https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages');
  });
};