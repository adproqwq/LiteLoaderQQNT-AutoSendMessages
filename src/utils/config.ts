import { ISettingConfig } from '../config/config';

export const readConfig = async (uid: string): Promise<ISettingConfig> => {
  const dataPath = LiteLoader.plugins.auto_send_messages.path.data;

  const config: ISettingConfig = await (await fetch(`local:///${dataPath}/${uid}.json`)).json();

  return config;
};

export const writeConfig = (uid: string, config: ISettingConfig) => {
  LLASM.writeConfig(uid, config);
};