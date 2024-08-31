import { readConfig, writeConfig } from './config';
import getGroupTargets from './getGroupTargets';

export default async () => {
  let currentConfig = await readConfig(await LLASM.getUid());

  const targets = getGroupTargets(currentConfig);
  currentConfig.targets = targets;
  writeConfig(await LLASM.getUid(), currentConfig);
};