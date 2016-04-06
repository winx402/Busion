/**
 * Created by wangwenxiang on 16-1-11.
 */

define(['jquery','data/userData','view/modalView','view/windowView','data/array/talkingArray','data/windowData','view/talkingView','bootstrap'],
    function($,userData,modalView,windowView,talkingArray,windowData,talkingView,bootstrap){

    /**
     * 点击talking面板下用户头像查看用户信息
     */
    $(document).on('click','.user-click',function(){
        var user_id = $(this).attr("_id");
        var user = userData.getUser(user_id);
        if (modalView.initFriendModal(user)){
            userData.getUserInfo(user_id);
        }
    });

    /**
     * 点击所有好友面板的好友进行聊天
     */
    $(document).on('click','.creat-user-talking',function(){
        $(".user-info-modal").modal('hide');
        var id = $(this).attr("_id");
        var user = userData.getUser(id);
        var w = windowView.showWindow("user",id,user.user_name);
        var talking = talkingArray.getTalkingByTypeId("user",id);
        if( talking!=null && talking.count > 0){ //如果有未读消息
            windowData.getUnreadMessage("user",id);
        }else {
            if (talking == null){
                var u = {
                    user_id: id,
                    user_name: user.user_name,
                    user_photo: user.user_photo,
                    user_description: user.user_description,
                    count: 0 //未读消息条数
                };
                talkingArray.addPersonalTalking(u);
                talkingView.addTalkingPanel("user",u);
            }else {
                talkingView.upTalkingPanel("user",id);
            }
        }
    });

        /**
         * 点击添加好友
         */
        $(document).on('click','.add-friend',function(){
            var user_id = $(this).attr("_id");

        });

        $(".update-user-info").click(function(){
            var newValue = $(".my-desc-input").val();
            var params = {
                userDesc : newValue
            };
            userData.updateUserDesc(params);
            $(".user-info-change-modal").modal('hide');
        });

        /**
         * 拒绝添加好友
         */
        $(document).on('click','.reject-friend-request',function(){
            var message_id = $(this).attr("_id");
            var talking = talkingArray.getTalkingByTypeId('sys',message_id);
            if(talking != null){
                talking.message_isRead = 2;
                userData.rejectFriendRequest(talking.user_id);
            }
            $(".add-friend-request").modal('hide');
        });

        /**
         * 同意添加好友
         */
        $(document).on('click','.agree-friend-request',function(){
            var message_id = $(this).attr("_id");
            var talking = talkingArray.getTalkingByTypeId('sys',message_id);
            if(talking != null){
                talking.message_isRead = 3;
                userData.agreeFriendRequest(talking.user_id);
            }
            $(".add-friend-request").modal('hide');
        });
    return{

    }
})