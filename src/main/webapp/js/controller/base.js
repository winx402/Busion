/**
 * Created by wangwenxiang on 16-1-12.
 */
require(['jquery','network/webSocket','data/myData','data/talkingData','view/baseView','data/array/talkingArray','view/talkingView'],
    function($,socket,myData,talkingData,baseView,talkingArray,talkingView){
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
                if(message.message_type == 2){
                    sysMessage(message);
                }else if (message.message_type == 3){

                }
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

        function sysMessage(message){
            talkingArray.addSysTalking(message);
            if (talkingView.addSysMessage(message)){ //如果消息直接展示,则设置为已读消息
                talkingData.readMessage(message.message_id);
            }
        }
});