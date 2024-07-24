import sendMsg from '../utils/sendMsg';
import checkTime from '../utils/checkTime';
import getCurrentUin from '../utils/getCurrentUin';
import { config, IConfig, ISettingConfig } from '../config/config';
import { Group, Client } from '../../LiteLoaderQQNT-Euphony/src';

const onload = () => checkTime();
onload();

const getUserConfig = async (): Promise<[IConfig, ISettingConfig, number]> => {
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

  return [userConfig, currentConfig, currentConfigIndex];
};

export const onSettingWindowCreated = async (view: HTMLElement) => {
  const pluginPath = LiteLoader.plugins.auto_send_messages.path.plugin;
  let [_, currentConfig, currentConfigIndex] = await getUserConfig();

  view.innerHTML = await (await fetch(`local:///${pluginPath}/pages/settings.html`)).text();
  (view.querySelector('#groupsMessageContent') as HTMLInputElement).value = currentConfig.messages.groups;
  (view.querySelector('#groupsPicturePath') as HTMLInputElement).value = currentConfig.pictures.groups;
  (view.querySelector('#groups') as HTMLInputElement).value = currentConfig.groups.join(';');
  (view.querySelector('#chatsMessageContent') as HTMLInputElement).value = currentConfig.messages.chats;
  (view.querySelector('#chatsPicturePath') as HTMLInputElement).value = currentConfig.pictures.chats;
  (view.querySelector('#chats') as HTMLInputElement).value = currentConfig.chats.join(';');
  (view.querySelector('#time') as HTMLInputElement).value = currentConfig.time;
  (view.querySelector('#pluginVersion') as HTMLParagraphElement).innerHTML = LiteLoader.plugins.auto_send_messages.manifest.version;
  if(currentConfig.mode == 'black') (view.querySelector('[data-value=black]') as HTMLOptionElement).click();
  else (view.querySelector('[data-value=white]') as HTMLOptionElement).click();

  (view.querySelector('#actionNow') as HTMLButtonElement).addEventListener('click', async () => {
    let [userConfig, currentConfig, currentConfigIndex] = await getUserConfig();

    let targets: string[] = [];
    if(currentConfig.mode == 'black'){
      const allGroups: Group[] = Client.getGroups();
      allGroups.forEach((g) => {
        if(!currentConfig.groups.includes(g.getId())) targets.push(g.getId());
      });
    }
    else targets = currentConfig.groups;

    if(currentConfig.pictures.groups === '') sendMsg('groups', targets, currentConfig.messages.groups);
    else sendMsg('groups', targets, currentConfig.messages.groups, currentConfig.pictures.groups);
    currentConfig.isTodayAction.groups = true;

    if(currentConfig.pictures.chats === '') sendMsg('chats', currentConfig.chats, currentConfig.messages.chats);
    else sendMsg('chats', currentConfig.chats, currentConfig.messages.chats, currentConfig.pictures.chats);
    currentConfig.isTodayAction.chats = true;

    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#mode') as HTMLSelectElement).addEventListener('selected', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getUserConfig();
    currentConfig.mode = e.detail.value;
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#groupsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getUserConfig();
    currentConfig.messages.groups = (e.target as HTMLInputElement).value;
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#openPictureGroups') as HTMLButtonElement).addEventListener('click', () => {
    LLASM.openFileDialog('groups', currentConfigIndex);
  });

  (view.querySelector('#rmPictureGroups') as HTMLButtonElement).addEventListener('click', async () => {
    let [userConfig, currentConfig, currentConfigIndex] = await getUserConfig();
    currentConfig.pictures.groups = '';
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#groups') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getUserConfig();
    currentConfig.groups = (e.target as HTMLInputElement).value.split(';');
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chats') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getUserConfig();
    currentConfig.chats = (e.target as HTMLInputElement).value.split(';');
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chatsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getUserConfig();
    currentConfig.messages.chats = (e.target as HTMLInputElement).value;
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#openPictureChats') as HTMLButtonElement).addEventListener('click', () => {
    LLASM.openFileDialog('chats', currentConfigIndex);
  });

  (view.querySelector('#rmPictureChats') as HTMLButtonElement).addEventListener('click', async () => {
    let [userConfig, currentConfig, currentConfigIndex] = await getUserConfig();
    currentConfig.pictures.chats = '';
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#time') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getUserConfig();
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