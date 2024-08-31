import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ISettingConfig } from '../config/config';
import sendMsg from './sendMsg';
import { writeConfig } from './config';

export default async (currentConfig: ISettingConfig, targets: string[]) => {
  dayjs.extend(customParseFormat);

  sendMsg('groups', targets, currentConfig.messages.groups, currentConfig.pictures.groups);

  sendMsg('chats', currentConfig.chats, currentConfig.messages.chats, currentConfig.pictures.chats);

  currentConfig.isAct = true;
  currentConfig.lastActTime = `${dayjs().get('hour').toString()}:${dayjs().get('minute').toString()}`;
  writeConfig(await LLASM.getUid(), currentConfig);
};