import { MessageChain, PlainText, At } from '../../LiteLoaderQQNT-Euphony/src';

export default (msg: string): MessageChain => {
  const parseRegex = new RegExp(/%At%{[0-9]+}/g);
  const getUin = new RegExp(/[0-9]+/g);
  const searchResult = msg.matchAll(parseRegex);
  const messagesSplitedArray = msg.split(parseRegex);
  let messageChain: MessageChain = new MessageChain();

  messageChain.append(new PlainText(messagesSplitedArray[0]));
  let index = 1;
  for(const eachResult of searchResult){
    const uin = eachResult[0].match(getUin);
    messageChain.append(At.fromUin(uin![0])).append(new PlainText(messagesSplitedArray[index]));
    index++;
  }

  return messageChain;
};