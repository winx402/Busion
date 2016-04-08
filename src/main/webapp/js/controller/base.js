/**
 * Created by wangwenxiang on 16-1-12.
 */
require(['jquery','network/webSocket','data/myData','data/talkingData','view/baseView','data/array/talkingArray'],
    function($,socket,myData,talkingData,baseView,talkingArray){
    /**
     * 页面载入时所做的事情
     */
    $(document).ready(function(){
        myData.initMyInfo(); //ajax初始化我的基本数据
        talkingData.initTalking(); //页面载入时获取我的未读消息
        socket.connectSocket(messageHandle);
    });

    function messageHandle(event){
        var message = JSON.parse(event.data);
        var messageCode = message.message_code;
        switch (messageCode){
            case 10: //用户消息
                break;
            case 20:  //组织消息
                break;
            case 30:  //系统消息

                break;
            case 40: //错误信息
                errorMessage(message);
                break;
        }
    }

    function errorMessage(message){
        switch (message.message_type){
            case 401:
                socket.closeSocket();
                break;
        }
        baseView.setErrorTimer(message.message_content);
    }
});