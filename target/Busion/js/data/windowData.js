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
                userId : id
            }
            if (type == "org"){

            }else if(type == "user"){
                ajax.ajaxFunction('message/getUserUnReadTalking',params,getUserTalkingSuccess,getTalkingError);
            }
        }

        function getUserTalkingSuccess(data){
            var r = eval(data);
            if(r.code == 1){
                var d = r.data;
                talkingArray.removeUserCount(d.userId); //将未读消息的条数设置为0
                talkingView.removeUnreadCount("user",d.userId);
                windowView.addUserUnreadTalking(d);
            }else{
                base.setErrorTimer(r.msg);
            }
        }

        function getOrgTalkingSuccess(data){

        }

        function getTalkingError(data){
            base.setErrorTimer("获取消息出错");
        }

    return{
        getUnreadMessage : getUnreadMessage
    }
});