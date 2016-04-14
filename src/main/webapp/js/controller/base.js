/**
 * Created by wangwenxiang on 16-1-12.
 */
require(['jquery','network/webSocket','data/myData','data/talkingData','view/baseView','data/array/talkingArray','view/talkingView','data/friendData'],
    function($,socket,myData,talkingData,baseView,talkingArray,talkingView,friendData){
        /**
         * 页面载入时所做的事情
         */
        $(document).ready(function(){
            myData.initMyInfo(); //ajax初始化我的基本数据
            talkingData.initTalking(); //页面载入时获取我的未读消息
            socket.connectSocket(messageHandle);
        });

        /**
         * 将接收到的消息进行处理
         * 消息类型分为:用户聊天消息(文字,图片,文件),组织聊天消息(文字,图片,文件),系统消息(系统通知,添加好友),错误信息
         * 消息处理流程:1,将消息添加进本地数据,2,页面渲染(是否展示,是否设置未读等)
         * @param event
         */
        function messageHandle(event){
            var message = JSON.parse(event.data);
            var messageCode = message.message_code;
            switch (messageCode){
                case 10: //用户消息
                    break;
                case 20:  //组织消息
                    break;
                case 30:  //系统消息
                    talkingArray.addSysTalking(message);
                    if(message.message_type == 2){
                        sysMessage(message);
                    }else if (message.message_type == 3){
                        addFriendMessage(message);
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
            if (talkingView.addSysMessage(message)){ //如果消息直接展示,则设置为已读消息
                talkingData.readMessage(message.message_id);
            }
            if (message.message_content.indexOf("已经添加你为好友") > 0){
                friendData.getUserAndAddFriend(message.user_id);
            }
        }

        function addFriendMessage(message){
            talkingView.addFriendMessage(message);
        }
});