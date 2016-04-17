/**
 * Created by wangwenxiang on 16-1-12.
 */

define(['jquery'],function($){

    var webSocket;
    var onmessage;

    var num = 0;

    function connectSocket(onme){
        onmessage = onme;
        initWebSocket();
    }

    var closeSocket = function(){
        webSocket.close();
    };

    function initWebSocket() {
        if (window.WebSocket) {
            webSocket = new WebSocket("ws://localhost:8080/userEnpoint");
            webSocket.onmessage = onmessage;
            webSocket.onopen = function(event) {
                num = 0;
            };
            webSocket.onclose = function(event) {
            };
            webSocket.onerror = function(event) {
                if(num < 2){
                    initWebSocket();
                    num++;
                }
            };
        } else {
            alert("Your browser does not support Web Socket.");
        }
    }
    function sendMessage(code,id,type,msg) {
        var params = messageForm(code,id,type,msg).toString();
        if (webSocket.readyState !== 1) {
            webSocket.close();
            initWebSocket();
            setTimeout(function() {
                sendMessage(code,id,type,msg);
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
    function messageForm(code,id,type,msg){
        return JSON.stringify({
            code : code,
            id : id,
            type : type,
            data : msg
        });
    }

    return{
        sendMessage: sendMessage,
        connectSocket: connectSocket,
        closeSocket : closeSocket
    }
});