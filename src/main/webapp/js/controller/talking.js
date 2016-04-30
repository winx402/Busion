/**
 * Created by wangwenxiang on 16-1-8.
 */
define(["jquery","view/menu_bottom_base",'data/array/talkingArray','view/windowView','data/windowData','view/talkingView','view/modalView','data/talkingData'],
    function($,menu_bottom_base,talkingArray,windowView,windowData,talkingView,modalView,talkingData){

    /**
     * 点击底部按钮切换面板
     */
    $(".menu-bottom li").eq(0).click(function(){
        var index = 0;
        if(window.nowBottom != index){
            $(".menu-top").text("会话");
            menu_bottom_base.changeBottom(index,window.talkingState);
        }
    });


        /**
         * 点击talking面板下的消息
         */
        $(document).on('click','.talking-li',function(){
            var type = $(this).attr("_type");
            var id = $(this).attr("_id");
            if (type == 'sys' && id == 0){
                windowView.showWindow('sys',0);
                talkingData.readSysMessage();
                talkingView.removeMessageCount($(this));
                return;
            }
            var talking = talkingArray.getTalkingByTypeId(type,id);
            if (type != "sys"){
                var newWindow = windowView.showWindow(type,id,$(this).find(".talking-name").text());
                if(newWindow){ //如果有未读消息
                    if(talking.count > 0){
                        windowData.getUnreadMessage(type,id);
                        talking.count = 0;
                    }else if(talking.unread_message.length > 0){
                        windowView.addUserUnreadTalking({
                            userId : talking.user_id,
                            rows : talking.unread_message
                        });
                        var messageIds = [];
                        $.each(talking.unread_message,function(i,item){
                            messageIds.push(item.message_id);
                        });
                        talkingData.readMessage(messageIds.join(","));
                        talking.unread_message = [];
                    }
                    talkingView.removeUnreadCount(type,id);
                    talkingData.readMessageHaveView(type,id);
                }
            }else {
                if(talking.message_type == 3){
                    modalView.initAddFriendModal(talking);
                }
                talkingView.removeMessageCount($(this));
                if(talking.message_isRead == 0){
                    talkingData.readMessage(talking.message_id);
                    talking.message_isRead = 1;
                }
            }
        });
});