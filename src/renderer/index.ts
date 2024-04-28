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
  (view.querySelector('#groupsMessageContent') as HTMLInputElement).value = userConfig.messages.groups;
  (view.querySelector('#groups') as HTMLInputElement).value = userConfig.groups.join(';');
  (view.querySelector('#chatsMessageContent') as HTMLInputElement).value = userConfig.messages.chats;
  (view.querySelector('#chats') as HTMLInputElement).value = userConfig.chats.join(';');
  (view.querySelector('#time') as HTMLInputElement).value = userConfig.time;
  (view.querySelector('#pluginVersion') as HTMLParagraphElement).innerHTML = globalThis.LiteLoader.plugins.auto_send_messages.manifest.version;

  (view.querySelector('#groupsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.messages.groups = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#groups') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.groups = (e.target as HTMLInputElement).value.split(';');
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chats') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.chats = (e.target as HTMLInputElement).value.split(';');
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chatsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.messages.chats = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#time') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.time = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#github') as HTMLButtonElement).addEventListener('click', () => {
    globalThis.LiteLoader.api.openExternal('https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages');
  });

  (view.querySelector('#tutoril') as HTMLButtonElement).addEventListener('click', () => {
    globalThis.LiteLoader.api.openExternal('https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages/blob/main/tutoril.md');
  });

  (view.querySelector('#fixDataFormat') as HTMLButtonElement).addEventListener('click', async () => {
    await globalThis.LiteLoader.api.config.set('auto_send_messages', config);
  });
};