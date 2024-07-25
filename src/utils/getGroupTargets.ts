import { ISettingConfig } from '../config/config';
import { Client, Group } from '../../LiteLoaderQQNT-Euphony/src';

export default (currentConfig: ISettingConfig): string[] => {
  let targets: string[] = [];
  if(currentConfig.mode == 'black'){
    const allGroups: Group[] = Client.getGroups();
    for(const g of allGroups){
      if(!currentConfig.groups.includes(g.getId())) targets.push(g.getId());
    }
  }
  else targets = currentConfig.groups;

  return targets;
};