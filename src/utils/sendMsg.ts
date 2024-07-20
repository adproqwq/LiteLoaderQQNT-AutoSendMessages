import { Group, Friend, Image } from '../../LiteLoaderQQNT-Euphony/src';
import parseMsg from './parseMsg';

export default (type: 'groups' | 'chats', targets: string[], msg: string, picture?: string) => {
  if(type == 'groups'){
    targets.forEach((g) => {
      const group = Group.make(g);
      const messageChain = parseMsg(msg);
      if(picture) messageChain.append(new Image(picture));
      setTimeout(() => group.sendMessage(messageChain), 2000 * Math.random());
    });
  }
  else{
    targets.forEach((c) => {
      const friend = Friend.fromUin(c);
      const messageChain = parseMsg(msg);
      if(picture) messageChain.append(new Image(picture));
      setTimeout(() => friend.sendMessage(messageChain), 2000 * Math.random());
    });
  }
};