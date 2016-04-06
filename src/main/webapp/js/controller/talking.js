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
            var talking = talkingArray.getTalkingByTypeId(type,id);
            if (type != "sys"){
                var w = windowView.showWindow(type,id,talking.name);
                talkingView.upTalkingPanel(type,id);
                var count = talking.count;
                if(count > 0){ //如果有未读消息
                    windowData.getUnreadMessage(type,id);
                }
            }else {
                if(talking.message_type == 3){
                    modalView.initAddFriendModal(talking);
                }else if(talking.message_type == 2){
                    modalView.initSysMessageModal(talking);
                }
                talkingView.removeMessageCount($(this));
                if(talking.message_isRead == 0){
                    talkingData.readMessage(talking.message_id);
                    talking.message_isRead = 1;
                }
            }
        });
});