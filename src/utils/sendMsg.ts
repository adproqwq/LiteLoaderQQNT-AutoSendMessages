import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Group, Friend, Image } from '../../LiteLoaderQQNT-Euphony/src';
import { config, ISettingConfig } from '../config/config';
import parseMsg from './parseMsg';
import getCurrentUin from './getCurrentUin';

export default () => {
  setInterval(async () => {
    let userConfig: ISettingConfig[] = await globalThis.LiteLoader.api.config.get('auto_send_messages', config);
    let currentConfigIndex = 0;
    const uin = getCurrentUin();
    const currentConfig = userConfig.filter((c, i) => {
      if(c.uin == uin){
        currentConfigIndex = i;
        return true;
      }
      return false;
    })[0];

    dayjs.extend(toArray);
    dayjs.extend(customParseFormat);
    const formatedActionTime = dayjs(currentConfig.time, 'HH:mm').toArray();
    if(formatedActionTime[3] == dayjs().get('hour') && formatedActionTime[4] == dayjs().get('minute') && !currentConfig.isTodayAction.groups){
      currentConfig.groups.forEach((g) => {
        const group = Group.make(g);
        const messageChain = parseMsg(currentConfig.messages.groups);
        if(currentConfig.pictures.groups !== '') messageChain.append(new Image(currentConfig.pictures.groups));
        setTimeout(() => group.sendMessage(messageChain), 2000 * Math.random());
      });
      currentConfig.isTodayAction.groups = true;
      userConfig[currentConfigIndex] = currentConfig;
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
    }

    if(formatedActionTime[3] == dayjs().get('hour') && formatedActionTime[4] == dayjs().get('minute') && !currentConfig.isTodayAction.chats){
      currentConfig.chats.forEach((c) => {
        const friend = Friend.fromUin(c);
        const messageChain = parseMsg(currentConfig.messages.chats);
        if(currentConfig.pictures.chats !== '') messageChain.append(new Image(currentConfig.pictures.chats));
        setTimeout(() => friend.sendMessage(messageChain), 2000 * Math.random());
      });
      currentConfig.isTodayAction.chats = true;
      userConfig[currentConfigIndex] = currentConfig;
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
    }

    const currentTime = `${dayjs().get('hour').toString()}:${dayjs().get('minute').toString()}`;
    if(dayjs(currentConfig.time, 'HH:mm').isBefore(dayjs(currentTime, 'HH:mm'))){
      currentConfig.isTodayAction.chats = false;
      currentConfig.isTodayAction.groups = false;
      userConfig[currentConfigIndex] = currentConfig;
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
    }
  }, 60000);
};