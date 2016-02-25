/**
 * Created by wangwenxiang on 16-1-12.
 */
require(['jquery','network/webSocket','data/myData','data/talkingData'],function($,socket,myData,talkingData){
    $(document).ready(function(){
        //socket.connectSocket(messageHandle);
        myData.initMyInfo(); //ajax初始化我的基本数据
        talkingData.initTalking(); //页面载入时获取我的未读消息
    })

    function messageHandle(event){
        var json = JSON.parse(event.data);
        alert(json);
    }
});