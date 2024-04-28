export default `<setting-section data-title="通用">
  <setting-panel>
    <setting-list data-direction="column">
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

<setting-section data-title="群聊">
  <setting-panel>
    <setting-list data-direction="column">
      <setting-item>
        <div>
          <setting-text>消息内容</setting-text>
          <setting-text data-type="secondary">要发送的消息内容</setting-text>
          <input id="groupsMessageContent" type="text"></input>
        </div>
      </setting-item>
      <setting-item>
        <div>
          <setting-text>发送群聊</setting-text>
          <setting-text data-type="secondary">要发送的群聊，填入群号。多个群聊之间用英文;间隔。</setting-text>
          <input id="groups" type="text"></input>
        </div>
      </setting-item>
    </setting-list>
  </setting-panel>
</setting-section>

<setting-section data-title="私聊">
  <setting-panel>
    <setting-list data-direction="column">
      <setting-item>
        <div>
          <setting-text>消息内容</setting-text>
          <setting-text data-type="secondary">要发送的消息内容</setting-text>
          <input id="chatsMessageContent" type="text"></input>
        </div>
      </setting-item>
      <setting-item>
        <div>
          <setting-text>目标QQ</setting-text>
          <setting-text data-type="secondary">要发送的好友，填入QQ号。多个QQ号之间用英文;间隔。</setting-text>
          <input id="chats" type="text"></input>
        </div>
      </setting-item>
    </setting-list>
  </setting-panel>
</setting-section>

<setting-section data-title="插件修复">
  <setting-panel>
    <setting-list data-direction="column">
      <setting-item>
        <div>
          <setting-text>修复数据格式</setting-text>
          <setting-text data-type="secondary">执行此操作将会清除所有填写的内容，请谨慎使用！</setting-text>
          <setting-button id="fixDataFormat" data-type="secondary">修复</setting-button>
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
          <setting-text>高级语法教程</setting-text>
          <setting-text data-type="secondary">https://github.com/adproqwq/LiteLoaderQQNT-AutoSendMessages/blob/main/tutoril.md</setting-text>
          <setting-button id="tutoril" data-type="secondary">去看看</setting-button>
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