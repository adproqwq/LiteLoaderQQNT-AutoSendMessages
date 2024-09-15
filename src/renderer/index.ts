import checkTime from '../utils/checkTime';
import { readConfig, writeConfig } from '../utils/config';
import sendMsgEntry from '../utils/sendMsgEntry';
import modifyTargets from '../utils/modifyTargets';
import { config } from '../config/config';

LLASM.onLogin(() => {
  const pluginPath = LiteLoader.plugins.auto_send_messages.path.plugin;
  const intervelWorker = new Worker(`local:///${pluginPath}/workers/interval.js`);
  intervelWorker.postMessage('');
  intervelWorker.onmessage = async (e) => {
    if(e.data == 'checkTime') await checkTime();
  };
});

export const onSettingWindowCreated = async (view: HTMLElement) => {
  const uid = await LLASM.getUid();
  const pluginPath = LiteLoader.plugins.auto_send_messages.path.plugin;
  let currentConfig = await readConfig(uid);

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

  (view.querySelector('#actNow') as HTMLButtonElement).addEventListener('click', async () => {
    const currentConfig = await readConfig(uid);

    await sendMsgEntry(currentConfig, currentConfig.targets);
  });

  (view.querySelector('#mode') as HTMLSelectElement).addEventListener('selected', async (e) => {
    let currentConfig = await readConfig(uid);
    currentConfig.mode = e.detail.value;
    writeConfig(uid, currentConfig);
    await modifyTargets();
  });

  (view.querySelector('#groupsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    let currentConfig = await readConfig(uid);
    currentConfig.messages.groups = (e.target as HTMLInputElement).value;
    writeConfig(uid, currentConfig);
  });

  (view.querySelector('#openPictureGroups') as HTMLButtonElement).addEventListener('click', async () => {
    LLASM.openFileDialog('groups', uid);
  });

  (view.querySelector('#rmPictureGroups') as HTMLButtonElement).addEventListener('click', async () => {
    let currentConfig = await readConfig(uid);
    currentConfig.pictures.groups = '';
    writeConfig(uid, currentConfig);
  });

  (view.querySelector('#groups') as HTMLInputElement).addEventListener('change', async (e) => {
    let currentConfig = await readConfig(uid);
    currentConfig.groups = (e.target as HTMLInputElement).value.split(';');
    writeConfig(uid, currentConfig);
    await modifyTargets();
  });

  (view.querySelector('#chats') as HTMLInputElement).addEventListener('change', async (e) => {
    let currentConfig = await readConfig(uid);
    currentConfig.chats = (e.target as HTMLInputElement).value.split(';');
    writeConfig(uid, currentConfig);
  });

  (view.querySelector('#chatsMessageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    let currentConfig = await readConfig(uid);
    currentConfig.messages.chats = (e.target as HTMLInputElement).value;
    writeConfig(uid, currentConfig);
  });

  (view.querySelector('#openPictureChats') as HTMLButtonElement).addEventListener('click', async () => {
    LLASM.openFileDialog('chats', uid);
  });

  (view.querySelector('#rmPictureChats') as HTMLButtonElement).addEventListener('click', async () => {
    let currentConfig = await readConfig(uid);
    currentConfig.pictures.chats = '';
    writeConfig(uid, currentConfig);
  });

  (view.querySelector('#time') as HTMLInputElement).addEventListener('change', async (e) => {
    let currentConfig = await readConfig(uid);
    currentConfig.sendTime = (e.target as HTMLInputElement).value;
    writeConfig(uid, currentConfig);
  });

  (view.querySelector('#github') as HTMLButtonElement).addEventListener('click', () => {
    LiteLoader.api.openExternal('https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages');
  });

  (view.querySelector('#tutoril') as HTMLButtonElement).addEventListener('click', () => {
    LiteLoader.api.openExternal('https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages/blob/main/tutoril.md');
  });

  (view.querySelector('#fixDataFormat') as HTMLButtonElement).addEventListener('click', async () => {
    writeConfig(uid, config);
  });
};