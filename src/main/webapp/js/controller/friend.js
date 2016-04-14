/**
 * Created by wangwenxiang on 16-1-8.
 */
define(['jquery','view/menu_bottom_base','data/friendData','data/array/friendArray','data/windowData','view/windowView','data/array/talkingArray',
        'view/talkingView'],
    function($,menu_bottom_base,friendData,friendArray,windowData,windowView,talkingArray,talkingView){
        /**
        * 点击底部按钮切换面板
        */
        $(".menu-bottom li").eq(1).click(function(){
            var index = 1;
            if(window.nowBottom != index){
                $(".menu-top").text("好友");
                menu_bottom_base.changeBottom(index,window.friendState);
                if (window.friendState != 3){
                    friendData.initFriend();
                }
            }
        });

        /**
         * 点击所有好友面板的好友进行聊天
         */
        $(document).on('click','.friend-list',function(){
            var id = $(this).attr("_id");
            var user = friendArray.getUserById(id);
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
                        count: 0, //未读消息条数
                        unread_message: []
                    };
                    talkingArray.addPersonalTalking(u);
                    talkingView.addTalkingPanel("user",u);
                }else {
                    talkingView.upTalkingPanel("user",id);
                }
            }
        });
});