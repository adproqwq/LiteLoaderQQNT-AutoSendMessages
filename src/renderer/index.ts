import sendMsg from '../utils/sendMsg';
import getCurrentUin from '../utils/getCurrentUin';
import { config, IConfig, ISettingConfig } from '../config/config';

const onload = () => sendMsg();
onload();

export const onSettingWindowCreated = async (view: HTMLElement) => {
  let userConfig: IConfig = await LiteLoader.api.config.get('auto_send_messages', config);
  let currentConfigIndex = -1;
  const uin = getCurrentUin();
  userConfig.data.forEach((c, i) => {
    if(c.uin == uin) currentConfigIndex = i;
  });
  let currentConfig: ISettingConfig;
  if(currentConfigIndex == -1){
    let newUserConfig = config.data[0];
    newUserConfig.uin = uin;
    userConfig.data.push(newUserConfig);
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
    currentConfig = newUserConfig;
    currentConfigIndex = userConfig.data.length - 1;
  }
  else currentConfig = userConfig.data[currentConfigIndex];

  const pluginPath = LiteLoader.plugins.auto_send_messages.path.plugin;
  const settingsPage = await (await fetch(`local:///${pluginPath}/pages/settings.html`)).text();

  view.innerHTML = settingsPage;
  (view.querySelector('#groupsMessageContent') as HTMLInputElement).value = currentConfig.messages.groups;
  (view.querySelector('#groupsPicturePath') as HTMLInputElement).value = currentConfig.pictures.groups;
  (view.querySelector('#groups') as HTMLInputElement).value = currentConfig.groups.join(';');
  (view.querySelector('#chatsMessageContent') as HTMLInputElement).value = currentConfig.messages.chats;
  (view.querySelector('#chatsPicturePath') as HTMLInputElement).value = currentConfig.pictures.chats;
  (view.querySelector('#chats') as HTMLInputElement).value = currentConfig.chats.join(';');
  (view.querySelector('#time') as HTMLInputElement).value = currentConfig.time;
  (view.querySelector('#pluginVersion') as HTMLParagraphElement).innerHTML = LiteLoader.plugins.auto_send_messages.manifest.version;

  (view.querySelector('#groupsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    currentConfig.messages.groups = (e.target as HTMLInputElement).value;
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#openPictureGroups') as HTMLButtonElement).addEventListener('click', () => {
    LLASM.openFileDialog('groups', currentConfigIndex);
  });

  (view.querySelector('#rmPictureGroups') as HTMLButtonElement).addEventListener('click', async () => {
    currentConfig.pictures.groups = '';
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#groups') as HTMLInputElement).addEventListener('change', async (e) => {
    currentConfig.groups = (e.target as HTMLInputElement).value.split(';');
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chats') as HTMLInputElement).addEventListener('change', async (e) => {
    currentConfig.chats = (e.target as HTMLInputElement).value.split(';');
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chatsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    currentConfig.messages.chats = (e.target as HTMLInputElement).value;
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#openPictureChats') as HTMLButtonElement).addEventListener('click', () => {
    LLASM.openFileDialog('chats', currentConfigIndex);
  });

  (view.querySelector('#rmPictureChats') as HTMLButtonElement).addEventListener('click', async () => {
    currentConfig.pictures.chats = '';
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#time') as HTMLInputElement).addEventListener('change', async (e) => {
    currentConfig.time = (e.target as HTMLInputElement).value;
    userConfig.data[currentConfigIndex] = currentConfig;
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