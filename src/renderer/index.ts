import checkTime from '../utils/checkTime';
import getCurrentConfig from '../utils/getCurrentConfig';
import sendMsgEntry from '../utils/sendMsgEntry';
import modifyTargets from '../utils/modifyTargets';
import { config } from '../config/config';

const onload = () => {
  modifyTargets();
  checkTime();
}
onload();

export const onSettingWindowCreated = async (view: HTMLElement) => {
  const pluginPath = LiteLoader.plugins.auto_send_messages.path.plugin;
  let [_, currentConfig, currentConfigIndex] = await getCurrentConfig(true);

  view.innerHTML = await (await fetch(`local:///${pluginPath}/pages/settings.html`)).text();
  (view.querySelector('#groupsMessageContent') as HTMLInputElement).value = currentConfig.messages.groups;
  (view.querySelector('#groupsPicturePath') as HTMLInputElement).value = currentConfig.pictures.groups;
  (view.querySelector('#groups') as HTMLInputElement).value = currentConfig.groups.join(';');
  (view.querySelector('#chatsMessageContent') as HTMLInputElement).value = currentConfig.messages.chats;
  (view.querySelector('#chatsPicturePath') as HTMLInputElement).value = currentConfig.pictures.chats;
  (view.querySelector('#chats') as HTMLInputElement).value = currentConfig.chats.join(';');
  (view.querySelector('#time') as HTMLInputElement).value = currentConfig.sendTime;
  (view.querySelector('#pluginVersion') as HTMLParagraphElement).innerHTML = LiteLoader.plugins.auto_send_messages.manifest.version;
  if(currentConfig.mode == 'black') (view.querySelector('[data-value=black]') as HTMLOptionElement).click();
  else (view.querySelector('[data-value=white]') as HTMLOptionElement).click();

  (view.querySelector('#actionNow') as HTMLButtonElement).addEventListener('click', async () => {
    const [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(true);

    await sendMsgEntry(userConfig, currentConfig, currentConfigIndex, currentConfig.targets);
  });

  (view.querySelector('#mode') as HTMLSelectElement).addEventListener('selected', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(true);
    currentConfig.mode = e.detail.value;
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#groupsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(true);
    currentConfig.messages.groups = (e.target as HTMLInputElement).value;
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#openPictureGroups') as HTMLButtonElement).addEventListener('click', () => {
    LLASM.openFileDialog('groups', currentConfigIndex);
  });

  (view.querySelector('#rmPictureGroups') as HTMLButtonElement).addEventListener('click', async () => {
    let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(true);
    currentConfig.pictures.groups = '';
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#groups') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(true);
    currentConfig.groups = (e.target as HTMLInputElement).value.split(';');
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chats') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(true);
    currentConfig.chats = (e.target as HTMLInputElement).value.split(';');
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#chatsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(true);
    currentConfig.messages.chats = (e.target as HTMLInputElement).value;
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#openPictureChats') as HTMLButtonElement).addEventListener('click', () => {
    LLASM.openFileDialog('chats', currentConfigIndex);
  });

  (view.querySelector('#rmPictureChats') as HTMLButtonElement).addEventListener('click', async () => {
    let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(true);
    currentConfig.pictures.chats = '';
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (view.querySelector('#time') as HTMLInputElement).addEventListener('change', async (e) => {
    let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(true);
    currentConfig.sendTime = (e.target as HTMLInputElement).value;
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