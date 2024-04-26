export const config: ISettingConfig = {
  message: '',
  group: '',
  time: '',
  isTodayAction: false,
};

export interface ISettingConfig {
  message: string;

  group: string;

  time: string;

  isTodayAction: boolean;
};