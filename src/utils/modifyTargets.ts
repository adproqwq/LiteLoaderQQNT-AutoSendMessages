import getCurrentConfig from './getCurrentConfig';
import getGroupTargets from './getGroupTargets';

export default () => {
  setInterval(async () => {
    let [userConfig, currentConfig, currentConfigIndex] = await getCurrentConfig(false);

    const targets = getGroupTargets(currentConfig);
    currentConfig.targets = targets;
    userConfig.data[currentConfigIndex] = currentConfig;
    await LiteLoader.api.config.set('auto_send_messages', userConfig);
  }, 1000);
};