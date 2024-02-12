var roomId = 4;
// '/websocket' 엔드포인트로 SockJS 웹소켓 객체를 생성합니다.
var socket = new SockJS(`/websocket`);

// SockJS 객체를 이용하여 STOMP 클라이언트 객체를 생성합니다.
var stompClient = Stomp.over(socket);

// 웹소켓에 연결합니다. 연결이 성공하면 콜백 함수를 실행합니다.
stompClient.connect({}, function (frame) {

  // '/topic/public' 대상을 구독하고, 메시지가 도착하면 콜백 함수를 실행합니다.
  stompClient.subscribe('/topic/public/' + roomId, function (messageOutput) {

    // 새로운 'div' 요소를 생성하고, 메시지 본문을 텍스트로 설정합니다.
    var messageElement = document.createElement('div');
    messageElement.className = 'chat-message';
    messageElement.innerText = messageOutput.body;

    // 감싸는 'div' 요소를 생성하고, 메시지 요소를 추가합니다.
    var wrapperElement = document.createElement('div');
    wrapperElement.appendChild(messageElement);

    // 감싸는 요소를 메시지 리스트에 추가합니다.
    var chatMessageList = document.getElementById('chatMessageList');
    chatMessageList.appendChild(wrapperElement);

    chatMessageList.scrollTop = chatMessageList.scrollHeight;
  });
});

// 'Send' 버튼에 클릭 이벤트 리스너를 추가합니다.
document.getElementById('chatSendMessageButton').addEventListener('click', function() {

  // 입력 필드의 값을 가져옵니다.
  var messageInput = document.getElementById('chatMessageInput');
  var messageContent = messageInput.value;

  // 메시지가 비어있지 않다면, 메시지를 '/app/chat.sendMessage' 대상으로 전송하고 입력 필드를 비웁니다.
  if(messageContent) {
    stompClient.send('/app/chat.sendMessage/' + roomId, {}, messageContent);
    messageInput.value = '';
  }
});

document.getElementById('chatMessageInput').addEventListener('keypress', function(event) {
  // Enter 키의 키 코드는 13입니다.
  if (event.keyCode === 13) {
    // 입력 필드의 값이 비어있지 않다면, 메시지를 전송합니다.
    var messageContent = this.value;
    if (messageContent) {
      stompClient.send('/app/chat.sendMessage/' + roomId , {}, messageContent);
      this.value = '';
    }
    // 기본 Enter 키 동작을 막습니다.
    event.preventDefault();
  }
});