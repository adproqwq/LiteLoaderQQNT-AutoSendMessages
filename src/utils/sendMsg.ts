import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Group, MessageChain, PlainText } from '../../LiteLoaderQQNT-Euphony/src';

export default () => {
  setInterval(async () => {
    let config = {
      message: '',
      group: '',
      time: '',
    };
  
    config = await globalThis.LiteLoader.api.config.get('auto_send_messages', config);
  
    dayjs.extend(toArray);
    dayjs.extend(customParseFormat);
    const formatedTime = dayjs(config.time, 'HH:mm').toArray();
    if(formatedTime[3] == dayjs().get('hour') && formatedTime[4] == dayjs().get('minute')){
      const group = Group.make(config.group);
      group.sendMessage(
        new MessageChain().append(
          new PlainText(config.message)
        )
      );
    }
  }, 60000);
};