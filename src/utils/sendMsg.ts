import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Group, Friend, Image } from '../../LiteLoaderQQNT-Euphony/src';
import { config, ISettingConfig } from '../config/config';
import parseMsg from './parseMsg';

export default () => {
  setInterval(async () => {
    let userConfig: ISettingConfig = await globalThis.LiteLoader.api.config.get('auto_send_messages', config);

    dayjs.extend(toArray);
    dayjs.extend(customParseFormat);
    const formatedActionTime = dayjs(userConfig.time, 'HH:mm').toArray();
    if(formatedActionTime[3] == dayjs().get('hour') && formatedActionTime[4] == dayjs().get('minute') && !userConfig.isTodayAction.groups){
      userConfig.groups.forEach((g) => {
        const group = Group.make(g);
        const messageChain = parseMsg(userConfig.messages.groups);
        if(userConfig.pictures.groups !== '') messageChain.append(new Image(userConfig.pictures.groups));
        group.sendMessage(messageChain);
      });
      userConfig.isTodayAction.groups = true;
      await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
    }

    if(formatedActionTime[3] == dayjs().get('hour') && formatedActionTime[4] == dayjs().get('minute') && !userConfig.isTodayAction.chats){
      userConfig.chats.forEach((c) => {
        const friend = Friend.fromUin(c);
        const messageChain = parseMsg(userConfig.messages.chats);
        if(userConfig.pictures.chats !== '') messageChain.append(new Image(userConfig.pictures.chats));
        friend.sendMessage(messageChain);
      });
      userConfig.isTodayAction.chats = true;
      await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
    }

    const currentTime = `${dayjs().get('hour').toString()}:${dayjs().get('minute').toString()}`;
    if(dayjs(userConfig.time, 'HH:mm').isBefore(dayjs(currentTime, 'HH:mm'))){
      userConfig.isTodayAction.chats = false;
      userConfig.isTodayAction.groups = false;
      await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
    }
  }, 60000);
};