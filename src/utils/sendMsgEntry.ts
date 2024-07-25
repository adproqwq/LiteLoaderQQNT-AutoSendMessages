import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { IConfig, ISettingConfig } from '../config/config';
import sendMsg from './sendMsg';

export default async (userConfig: IConfig, currentConfig: ISettingConfig, currentConfigIndex: number, targets: string[]) => {
  dayjs.extend(customParseFormat);

  if(currentConfig.pictures.groups === '') sendMsg('groups', targets, currentConfig.messages.groups);
  else sendMsg('groups', targets, currentConfig.messages.groups, currentConfig.pictures.groups);

  if(currentConfig.pictures.chats === '') sendMsg('chats', currentConfig.chats, currentConfig.messages.chats);
  else sendMsg('chats', currentConfig.chats, currentConfig.messages.chats, currentConfig.pictures.chats);

  currentConfig.isAct = true;
  currentConfig.lastActTime = `${dayjs().get('hour').toString()}:${dayjs().get('minute').toString()}`;
  userConfig.data[currentConfigIndex] = currentConfig;
  await LiteLoader.api.config.set('auto_send_messages', userConfig);
};