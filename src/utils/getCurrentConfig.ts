import { config, IConfig, ISettingConfig } from '../config/config';
import getCurrentUin from './getCurrentUin';

export default async (init: boolean): Promise<[IConfig, ISettingConfig, number]> => {
  let userConfig: IConfig = await LiteLoader.api.config.get('auto_send_messages', config);
  let currentConfigIndex = -1;
  const uin = getCurrentUin();
  userConfig.data.forEach((c, i) => {
    if(c.uin == uin) currentConfigIndex = i;
  });
  let currentConfig: ISettingConfig;
  if(init){
    if(currentConfigIndex == -1){
      let newUserConfig = config.data[0];
      newUserConfig.uin = uin;
      userConfig.data.push(newUserConfig);
      await LiteLoader.api.config.set('auto_send_messages', userConfig);
      currentConfig = newUserConfig;
      currentConfigIndex = userConfig.data.length - 1;
    }
    else currentConfig = userConfig.data[currentConfigIndex];
  }
  else currentConfig = userConfig.data[currentConfigIndex];

  return [userConfig, currentConfig, currentConfigIndex];
};