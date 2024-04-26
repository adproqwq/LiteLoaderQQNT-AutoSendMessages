import sendMsg from '../utils/sendMsg';
import config from '../config/config';

const onload = () => {
  console.log('[auto_send_message] 渲染进程工作');
  sendMsg();
};
onload();

export const onSettingWindowCreated = async (view: HTMLElement) => {
  let userConfig = await globalThis.LiteLoader.api.config.get('auto_send_messages', config);

  const domParser = new DOMParser();
  const doms = domParser.parseFromString([
    '<setting-section data-title="常规">',
    '<setting-panel>',
    '<setting-list data-direction="column">',
    '<setting-item>',
    '<div>',
    '<setting-text>消息内容</setting-text>',
    '<setting-text data-type="secondary">要发送的消息内容</setting-text>',
    `<input id="messageContent" type="text" value="${userConfig.message}"></input>`,
    '</div>',
    '</setting-item>',
    '<setting-item>',
    '<div>',
    '<setting-text>发送群聊</setting-text>',
    '<setting-text data-type="secondary">要发送的群聊，填入群号。目前仅支持单个群聊。</setting-text>',
    `<input id="group" type="text" value="${userConfig.group}"></input>`,
    '</div>',
    '</setting-item>',
    '<setting-item>',
    '<div>',
    '<setting-text>定时发送时间</setting-text>',
    '<setting-text data-type="secondary">发送时间，填入 HH:mm 格式的时间。目前仅支持每一天。</setting-text>',
    `<input id="time" type="text" value="${userConfig.time}"></input>`,
    '</div>',
    '</setting-item>',
    '</setting-list>',
    '</setting-panel>',
    '</setting-section>',
    '<setting-section data-title="关于">',
    '<setting-panel>',
    '<setting-list data-direction="column">',
    '<setting-item>',
    '<div>',
    '<setting-text>Github 仓库</setting-text>',
    '<setting-text data-type="secondary">https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages</setting-text>',
    '<setting-button id="github" data-type="secondary">去看看</setting-button>',
    '</div>',
    '</setting-item>',
    '<setting-item>',
    '<div>',
    '<setting-text>作者</setting-text>',
    '<setting-text data-type="secondary">adproqwq(Adpro)</setting-text>',
    '</div>',
    '</setting-item>',
    '<setting-item>',
    '<div>',
    '<setting-text>版本号</setting-text>',
    `<setting-text data-type="secondary">${await globalThis.LiteLoader.plugins.slug.manifest.version}</setting-text>`,
    '</div>',
    '</setting-item>',
    '</setting-list>',
    '</setting-panel>',
    '</setting-section>',
  ].join(''), 'text/html');

  (doms.body.querySelector('#messageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.message = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (doms.body.querySelector('#group') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.group = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (doms.body.querySelector('#time') as HTMLInputElement).addEventListener('change', async (e) => {
    userConfig.time = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', userConfig);
  });

  (doms.body.querySelector('#github') as HTMLButtonElement).addEventListener('click', () => {
    globalThis.LiteLoader.api.openExternal('https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages');
  });

  doms.body.childNodes.forEach((dom) => {
    view.appendChild(dom);
  });
};