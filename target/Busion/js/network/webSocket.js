/**
 * Created by wangwenxiang on 16-1-12.
 */

define(function(){

    //var webSocket;
    //var onmessage;
    //
    //function init(onme){
    //    onmessage = onme;
    //    initWebSocket();
    //}
    //
    //function initWebSocket() {
    //    if (window.WebSocket) {
    //        webSocket = new WebSocket("ws://localhost:8080/userEnpoint");
    //        webSocket.onmessage = onmessage;
    //        webSocket.onopen = function(event) {
    //        };
    //        webSocket.onclose = function(event) {
    //        };
    //        webSocket.onerror = function(event) {
    //        };
    //    } else {
    //        alert("Your browser does not support Web Socket.");
    //    }
    //}
    //function start(msg) {
    //    var data = function() {
    //        webSocket.send(msg);
    //    };
    //    if (webSocket.readyState !== 1) {
    //        webSocket.close();
    //        initWebSocket();
    //        setTimeout(function() {
    //            data();
    //        }, 250);
    //    } else {
    //        data();
    //    };
    //}
    //
    //return{
    //    send: start,
    //    connectSocket: init
    //}
});