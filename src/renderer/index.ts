import sendMsg from '../utils/sendMsg';
import { config, ISettingConfig } from '../config/config';

const onload = () => sendMsg();
onload();

export const onSettingWindowCreated = async (view: HTMLElement) => {
  let userConfig: ISettingConfig = await LiteLoader.api.config.get('auto_send_messages', config);
  const pluginPath = LiteLoader.plugins.auto_send_messages.path.plugin;
  const settingsPage = await (await fetch(`local:///${pluginPath}/pages/settings.html`)).text();

  view.innerHTML = settingsPage;
  (view.querySelector('#groupsMessageContent') as HTMLInputElement).value = userConfig.messages.groups;
  (view.querySelector('#groupsPicturePath') as HTMLInputElement).value = userConfig.pictures.groups;
  (view.querySelector('#groups') as HTMLInputElement).value = userConfig.groups.join(';');
  (view.querySelector('#chatsMessageContent') as HTMLInputElement).value = userConfig.messages.chats;
  (view.querySelector('#chatsPicturePath') as HTMLInputElement).value = userConfig.pictures.chats;
  (view.querySelector('#chats') as HTMLInputElement).value = userConfig.chats.join(';');
  (view.querySelector('#time') as HTMLInputElement).value = userConfig.time;
  (view.querySelector('#pluginVersion') as HTMLParagraphElement).innerHTML = LiteLoader.plugins.auto_send_messages.manifest.version;

  (view.querySelector('#groupsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.messages.groups = (e.target as HTMLInputElement).value;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#openPictureGroups') as HTMLButtonElement).addEventListener('click', () => {
    LLASM.openFileDialog('groups');
  });

  (view.querySelector('#rmPictureGroups') as HTMLButtonElement).addEventListener('click', async () => {
    userConfig.pictures.groups = '';
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#groups') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.groups = (e.target as HTMLInputElement).value.split(';');
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chats') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.chats = (e.target as HTMLInputElement).value.split(';');
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chatsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.messages.chats = (e.target as HTMLInputElement).value;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#openPictureChats') as HTMLButtonElement).addEventListener('click', () => {
    LLASM.openFileDialog('chats');
  });

  (view.querySelector('#rmPictureChats') as HTMLButtonElement).addEventListener('click', async () => {
    userConfig.pictures.chats = '';
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#time') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.time = (e.target as HTMLInputElement).value;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#github') as HTMLButtonElement).addEventListener('click', () => {
    LiteLoader.api.openExternal('https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages');
  });

  (view.querySelector('#tutoril') as HTMLButtonElement).addEventListener('click', () => {
    LiteLoader.api.openExternal('https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages/blob/main/tutoril.md');
  });

  (view.querySelector('#fixDataFormat') as HTMLButtonElement).addEventListener('click', async () => {
    await LiteLoader.api.config.set('auto_send_messages', config);
  });
};