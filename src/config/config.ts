export const config: ISettingConfig = {
  message: '',
  groups: [],
  time: '',
  isTodayAction: false,
};

export interface ISettingConfig {
  message: string;

  groups: string[];

  time: string;

  isTodayAction: boolean;
};