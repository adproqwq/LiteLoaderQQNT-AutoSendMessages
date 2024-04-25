import sendMsg from '../utils/sendMsg';

const onload = () => {
  console.log('[auto_send_message] 渲染进程工作');
  sendMsg();
};
onload();

export const onSettingWindowCreated = async (view: HTMLElement) => {
  let config = {
    message: '',
    group: '',
    time: '',
  };

  config = await globalThis.LiteLoader.api.config.get('auto_send_messages', config);

  const domParser = new DOMParser();
  const doms = domParser.parseFromString([
    '<setting-section data-title="常规">',
    '<setting-panel>',
    '<setting-list data-direction="column">',
    '<setting-item>',
    '<div>',
    '<setting-text>消息内容</setting-text>',
    '<setting-text data-type="secondary">要发送的消息内容</setting-text>',
    `<input id="messageContent" type="text" value="${config.message}"></input>`,
    '</div>',
    '</setting-item>',
    '<setting-item>',
    '<div>',
    '<setting-text>发送群聊</setting-text>',
    '<setting-text data-type="secondary">要发送的群聊，填入群号。目前仅支持单个群聊。</setting-text>',
    `<input id="group" type="text" value="${config.group}"></input>`,
    '</div>',
    '</setting-item>',
    '<setting-item>',
    '<div>',
    '<setting-text>定时发送时间</setting-text>',
    '<setting-text data-type="secondary">发送时间，填入 HH:mm 格式的时间。目前仅支持每一天。</setting-text>',
    `<input id="time" type="text" value="${config.time}"></input>`,
    '</div>',
    '</setting-item>',
    '</setting-item>',
    '</setting-list>',
    '</setting-panel>',
    '</setting-section>',
  ].join(''), 'text/html');

  (doms.body.querySelector('#messageContent') as HTMLInputElement).addEventListener('change', async (e) => {
    config.message = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', config);
  });

  (doms.body.querySelector('#group') as HTMLInputElement).addEventListener('change', async (e) => {
    config.group = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', config);
  });

  (doms.body.querySelector('#time') as HTMLInputElement).addEventListener('change', async (e) => {
    config.time = (e.target as HTMLInputElement).value;
    await globalThis.LiteLoader.api.config.set('auto_send_messages', config);
  });

  doms.body.childNodes.forEach((dom) => {
    view.appendChild(dom);
  });
};