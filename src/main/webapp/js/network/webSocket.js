/**
 * Created by wangwenxiang on 16-1-12.
 */

define(['jquery'],function($){

    var webSocket;
    var onmessage;

    function connectSocket(onme){
        onmessage = onme;
        initWebSocket();
    }

    function initWebSocket() {
        if (window.WebSocket) {
            webSocket = new WebSocket("ws://localhost:8080/userEnpoint");
            webSocket.onmessage = onmessage;
            webSocket.onopen = function(event) {
            };
            webSocket.onclose = function(event) {
                initWebSocket();
            };
            webSocket.onerror = function(event) {
                initWebSocket();
            };
        } else {
            alert("Your browser does not support Web Socket.");
        }
    }
    function sendMessage(type,id,msg) {
        var params = messageForm(type,id,msg).toString();
        if (webSocket.readyState !== 1) {
            webSocket.close();
            initWebSocket();
            setTimeout(function() {
                sendMessage(type,id,msg);
            }, 250);
        } else {
            data(params);
        }
    }

    var data = function(params) {
        alert(params);
        webSocket.send(params);
    };
    /**
     * 消息类型和消息内容
     * @param type 1-好友聊天,2-组织消息
     * @param id 消息接受对象的id
     * @param msg 包含的内容
     */
    function messageForm(type,id,msg){
        return JSON.stringify({
            type : type,
            id : id,
            msg : msg
        });
    }

    return{
        sendMessage: sendMessage,
        connectSocket: connectSocket
    }
});