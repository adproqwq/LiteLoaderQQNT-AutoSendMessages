import dayjs from 'dayjs';
import toArray from 'dayjs/plugin/toArray';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import getCurrentConfig from './getCurrentConfig';
import timeMode from './timeMode';
import sendMsgEntry from './sendMsgEntry';

export default async () => {
  dayjs.extend(toArray);
  dayjs.extend(customParseFormat);
  let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(false);

  if (timeMode(currentConfig.sendTime) == 'exactly') {
    const formatedActTime = dayjs(currentConfig.sendTime, 'HH:mm').toArray();
    if (formatedActTime[3] == dayjs().get('hour') && formatedActTime[4] == dayjs().get('minute') && !currentConfig.isAct) {
      await sendMsgEntry(userConfig, currentConfig, currentConfigIndex, currentConfig.targets);
    }

    const currentTime = `${dayjs().get('hour').toString()}:${dayjs().get('minute').toString()}`;
    if (dayjs(currentConfig.lastActTime, 'HH:mm').isBefore(dayjs(currentTime, 'HH:mm'))) {
      currentConfig.isAct = false;
      userConfig.data[currentConfigIndex] = currentConfig;
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
    }
  }
  else if (timeMode(currentConfig.sendTime) == 'per') {
    if (currentConfig.lastActTime == '') {
      await sendMsgEntry(userConfig, currentConfig, currentConfigIndex, currentConfig.targets);
    }
    else {
      const perMinute = Number(currentConfig.sendTime);
      const currentTime = `${dayjs().get('hour').toString()}:${dayjs().get('minute').toString()}`;

      if (dayjs(currentConfig.lastActTime, 'HH:mm').isBefore(dayjs(currentTime, 'HH:mm'))) {
        currentConfig.isAct = false;
        userConfig.data[currentConfigIndex] = currentConfig;
        await LiteLoader.api.config.set('auto_send_messages', userConfig);
      }

      const diffMinutes = Math.abs((Number(currentTime.split(':')[0]) - Number(currentConfig.lastActTime.split(':')[0])) * 60) + (Math.abs(Number(currentTime.split(':')[1]) - Number(currentConfig.lastActTime.split(':')[1])));

      if (diffMinutes >= perMinute && !currentConfig.isAct) {
        await sendMsgEntry(userConfig, currentConfig, currentConfigIndex, currentConfig.targets);
      }
    }
  }
};