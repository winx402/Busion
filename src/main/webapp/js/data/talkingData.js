/**
 * Created by wangwenxiang on 16-1-13.
 */
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax','data/array/talkingArray','view/talkingView','view/menu_bottom_base','view/baseView'],
    function(ajax,talkingArray,talkingView,baseView,base){
        /**
         * 会话面板状态
         * 0-未初始化，无数据
         * 1-正在获取数据
         * 2-数据已经获取，正在绘制面板
         * 3-绘制完成
         */
        window.talkingState = 0;

    /**
     * 当talkingState不等于3时，初始化talking面板
     *
     */
    function initTalking(){
        if (window.talkingState == 0){
            getData();
        }
    }

        /**
         * ajax获取会话面板数据
         */
    function getData(){
        window.talkingState = 1;
        ajax.ajaxFunction('user/getMyUnReadTalking',null,getDataSuccess,getError)
    }

        /**
         * 获取资料成功
         * @param data
         */
    function getDataSuccess(data){
        var r = eval(data);
        if(r.code == 1){
            var message = r.data;
            $.each(message.personalTalking,function(i,item){ //添加个人消息
                talkingArray.addPersonalTalking(item,false); //添加一个未加载聊天
            });
            $.each(message.orgTalking,function(i,item){ //添加组织消息
                talkingArray.addOrgTalking(item);
            });
            $.each(message.sysTalking,function(i,item){ //添加系统消息
                talkingArray.addSysTalking(item);
            });
            window.talkingState = 2;
            talkingView.initTalkingPanel(
                talkingArray.getAllPersonalTalking(),
                talkingArray.getAllOrgTalking(),
                talkingArray.getAllSysTalking(),
                talkingArray.getAllFriendTalking()
            );
            window.talkingState = 3;
            baseView.changePanel(0);
        }else{
            window.talkingState = 0;
            base.setErrorTimer(r.msg);
        }
    }



        /**
         * 获取好友信息错误
         * @param data
         */
        function getError(data){
            window.talkingState = 0;
            base.setErrorTimer("获取会话信息出错");
        }

        var readMessage = function (message_id) {
            var param = {
                messageId : message_id
            };
            ajax.ajaxFunction('message/readMessage',param);
        };

        var readSysMessage = function () {
            talkingArray.setReadSysMessage(0);
            ajax.ajaxFunction('message/readSysMessage');
        };

    return{
        initTalking : initTalking,
        readMessage : readMessage,
        readSysMessage : readSysMessage

    }
});