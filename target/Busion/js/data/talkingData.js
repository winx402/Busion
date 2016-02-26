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

    function getData(){
        window.talkingState = 1;
        ajax.ajaxFunction('user/getMyUnReadTalking',null,getDataSuccess,getError)
    }

    function getDataSuccess(data){
        var r = eval(data);
        if(r.code == 1){
            var message = r.data;
            $.each(message.personalTalking,function(i,item){ //添加个人消息
                talkingArray.addPersonalTalking(item);
            });
            $.each(message.orgTalking,function(i,item){ //添加个人消息
                talkingArray.addOrgTalking(item);
            });
            window.talkingState = 2;
            talkingView.initTalkingPanel(talkingArray.getAllPersonalTalking(),talkingArray.getAllOrgTalking());
            window.talkingState = 3;
            baseView.changePanel(0);
        }else{
            window.talkingState = 0;
            base.setErrorTimer(r.msg);
        }
    }

    function getError(data){
        window.talkingState = 0;
        base.setErrorTimer("获取好友信息出错");
    }

        /**
         * 获取未读消息
         * @param type
         * @param id
         */
        var getUnreadMessage = function (type,id) {

        }

    return{
        initTalking : initTalking
    }
});