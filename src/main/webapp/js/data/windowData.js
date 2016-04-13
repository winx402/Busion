/**
 * Created by wangwenxiang on 16-1-13.
 */
/**
 * Created by wangwenxiang on 16-1-11.
 */
define(['network/ajax','view/baseView','view/windowView','data/array/talkingArray','view/talkingView'],
    function(ajax,base,windowView,talkingArray,talkingView){

        /**
         * 获取未读消息
         * @param type
         * @param id
         */
        var getUnreadMessage = function (type,id) {
            var params = {
                id : id
            };
            if (type == "org"){
                ajax.ajaxFunction('orgMessage/getOrgUnReadTalking',params,getOrgTalkingSuccess,getTalkingError);
            }else if(type == "user"){
                ajax.ajaxFunction('message/getUserUnReadTalking',params,getUserTalkingSuccess,getTalkingError);
            }
        };

        /**
         * ajax获取用户未读取消息内容成功
         * @param data
         */
        function getUserTalkingSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                var d = r.data;
                talkingArray.removeCount("user",d.userId); //将未读消息的条数设置为0
                talkingView.removeUnreadCount("user",d.userId);
                windowView.addUserUnreadTalking(d);
            }else{
                base.setErrorTimer(r.msg);
            }
        }

        /**
         * ajax获取组织未读取消息内容成功
         * @param data
         */
        function getOrgTalkingSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                var d = r.data;
                talkingArray.removeCount("org",d.orgId); //将未读消息的条数设置为0
                talkingView.removeUnreadCount("org",d.orgId);
                windowView.addOrgUnreadTalking(d)
            }else{
                base.setErrorTimer(r.msg);
            }
        }

        /**
         * ajax获取消息错误
         * @param data
         */
        function getTalkingError(data){
            base.setErrorTimer("获取消息出错");
        }

    return{
        getUnreadMessage : getUnreadMessage
    }
});