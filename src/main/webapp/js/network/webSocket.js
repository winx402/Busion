/**
 * Created by wangwenxiang on 16-1-12.
 */

define(['jquery'],function($){

    var webSocket;
    var onmessage;

    function init(onme){
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
            };
            webSocket.onerror = function(event) {
            };
        } else {
            alert("Your browser does not support Web Socket.");
        }
    }
    function sendMessage(type,id,msg) {
        var params = messageForm(type,id,msg).toString();
        var data = function() {
            alert(params);
            webSocket.send(params);
        };
        if (webSocket.readyState !== 1) {
            webSocket.close();
            initWebSocket();
            setTimeout(function() {
                data();
            }, 250);
        } else {
            data();
        }
    }

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
        connectSocket: init
    }
});