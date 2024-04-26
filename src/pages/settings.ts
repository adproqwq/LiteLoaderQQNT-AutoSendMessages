export default `<setting-section data-title="常规">
  <setting-panel>
    <setting-list data-direction="column">
      <setting-item>
        <div>
          <setting-text>消息内容</setting-text>
          <setting-text data-type="secondary">要发送的消息内容</setting-text>
          <input id="messageContent" type="text"></input>
        </div>
      </setting-item>
      <setting-item>
        <div>
          <setting-text>发送群聊</setting-text>
          <setting-text data-type="secondary">要发送的群聊，填入群号。目前仅支持单个群聊。</setting-text>
          <input id="group" type="text"></input>
        </div>
      </setting-item>
      <setting-item>
        <div>
          <setting-text>定时发送时间</setting-text>
          <setting-text data-type="secondary">发送时间，填入 HH:mm 格式的时间。目前仅支持每一天。</setting-text>
          <input id="time" type="text"></input>
        </div>
      </setting-item>
    </setting-list>
  </setting-panel>
</setting-section>

<setting-section data-title="关于">
  <setting-panel>
    <setting-list data-direction="column">
      <setting-item>
        <div>
          <setting-text>Github 仓库</setting-text>
          <setting-text data-type="secondary">https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages</setting-text>
          <setting-button id="github" data-type="secondary">去看看</setting-button>
        </div>
      </setting-item>
      <setting-item>
        <div>
          <setting-text>作者</setting-text>
          <setting-text data-type="secondary">adproqwq(Adpro)</setting-text>
        </div>
      </setting-item>
      <setting-item>
        <div>
          <setting-text>版本号</setting-text>
          <setting-text id="pluginVersion" data-type="secondary"></setting-text>
        </div>
      </setting-item>
    </setting-list>
  </setting-panel>
</setting-section>`