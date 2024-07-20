import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { config, IConfig, ISettingConfig } from '../config/config';
import getCurrentUin from './getCurrentUin';
import sendMsg from './sendMsg';

export default () => {
  setInterval(async () => {
    let userConfig: IConfig = await globalThis.LiteLoader.api.config.get('auto_send_messages', config);
    let currentConfigIndex = -1;
    const uin = getCurrentUin();
    userConfig.data.forEach((c, i) => {
      if(c.uin == uin) currentConfigIndex = i;
    });
    let currentConfig: ISettingConfig = userConfig.data[currentConfigIndex];

    dayjs.extend(toArray);
    dayjs.extend(customParseFormat);
    const formatedActionTime = dayjs(currentConfig.time, 'HH:mm').toArray();
    if(formatedActionTime[3] == dayjs().get('hour') && formatedActionTime[4] == dayjs().get('minute') && !currentConfig.isTodayAction.groups){
      if(currentConfig.pictures.groups === '') sendMsg('groups', currentConfig.groups, currentConfig.messages.groups);
      else sendMsg('groups', currentConfig.groups, currentConfig.messages.groups, currentConfig.pictures.groups);
      currentConfig.isTodayAction.groups = true;
      userConfig.data[currentConfigIndex] = currentConfig;
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
    }

    if(formatedActionTime[3] == dayjs().get('hour') && formatedActionTime[4] == dayjs().get('minute') && !currentConfig.isTodayAction.chats){
      if(currentConfig.pictures.chats === '') sendMsg('chats', currentConfig.chats, currentConfig.messages.chats);
      else sendMsg('chats', currentConfig.chats, currentConfig.messages.chats, currentConfig.pictures.chats);
      currentConfig.isTodayAction.chats = true;
      userConfig.data[currentConfigIndex] = currentConfig;
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
    }

    const currentTime = `${dayjs().get('hour').toString()}:${dayjs().get('minute').toString()}`;
    if(dayjs(currentConfig.time, 'HH:mm').isBefore(dayjs(currentTime, 'HH:mm'))){
      currentConfig.isTodayAction.chats = false;
      currentConfig.isTodayAction.groups = false;
      userConfig.data[currentConfigIndex] = currentConfig;
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
    }
  }, 60000);
};