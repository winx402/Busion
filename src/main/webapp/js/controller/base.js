/**
 * Created by wangwenxiang on 16-1-12.
 */
require(['jquery','network/webSocket','data/myData'],function($,socket,myData){
    $(document).ready(function(){
        //socket.connectSocket(messageHandle);
        myData.initMyInfo();
    })

    function messageHandle(event){
        var json = JSON.parse(event.data);
        alert(json);
    }
});