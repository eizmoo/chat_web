/**
 * WebSocket客户端
 *
 * 使用说明：
 * 1、WebSocket客户端通过回调函数来接收服务端消息。例如：webSocket.onmessage
 * 2、WebSocket客户端通过send方法来发送消息给服务端。例如：webSocket.send();
 */
function getWebSocket(user_token) {
  /**
   * WebSocket客户端 PS：URL开头表示WebSocket协议 中间是域名端口 结尾是服务端映射地址
   */
  var webSocket = new WebSocket(/*[[${webSocketUrl}]]*/ 'ws://localhost:10000/chat/chatSocket/' + user_token);
  /**
   * 当服务端打开连接
   */
  webSocket.onopen = function (event) {
    console.log('WebSocket打开连接');
  };

  /**
   * 当服务端发来消息：1.广播消息 2.更新在线人数
   */
  webSocket.onmessage = function (event) {
    console.log('WebSocket收到消息：%c' + event.data, 'color:green');
  };

  /**
   * 关闭连接
   */
  webSocket.onclose = function (event) {
    console.log('WebSocket关闭连接');
  };

  /**
   * 通信失败
   */
  webSocket.onerror = function (event) {
    console.log('WebSocket发生异常');

  };
  return webSocket;
}

export {
  getWebSocket
}
