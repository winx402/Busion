/**
 * Created by wangwenxiang on 16-1-12.
 */
require(['jquery','network/webSocket','data/friendArray'],function($,socket,friendArray){
    //$(document).ready(function(){
    //    socket.connectSocket(messageHandle);
    //})

    function messageHandle(event){
        var json = JSON.parse(event.data);
        alert(json);
    }
});