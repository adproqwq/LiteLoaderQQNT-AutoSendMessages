import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Group, MessageChain, PlainText } from '../../LiteLoaderQQNT-Euphony/src';
import config from '../config/config';

export default () => {
  setInterval(async () => {
    let userConfig = await globalThis.LiteLoader.api.config.get('auto_send_messages', config);
  
    dayjs.extend(toArray);
    dayjs.extend(customParseFormat);
    const formatedActionTime = dayjs(userConfig.time, 'HH:mm').toArray();
    if(formatedActionTime[3] == dayjs().get('hour') && formatedActionTime[4] == dayjs().get('minute') && !userConfig.isTodayAction){
      const group = Group.make(userConfig.group);
      group.sendMessage(
        new MessageChain().append(
          new PlainText(userConfig.message)
        )
      );
      userConfig.isTodayAction = true;
      await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
    }
  }, 60000);
};