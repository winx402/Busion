/**
 * Created by wangwenxiang on 16-1-8.
 */
define(['jquery','network/webSocket','view/windowView'],
    function($,socket,windowView){
        /**
         * 点击所有好友面板的好友进行聊天
         */
        $(document).on('click','.right-send',function(){
            messageParse($(this));
        });

        $(document).on('keydown','.right-input',function(e){
            var ev = document.all ? window.event : e;
            if(ev.keyCode==13) {
                messageParse($(this).siblings(".right-send"));
            }
        });

        $(document).on('keyup','.right-input',function(e){
            var ev = document.all ? window.event : e;
            if(ev.keyCode==13) {
                var button = $(this).siblings(".right-send");
                var textarea = button.siblings(".right-input");
                var content = textarea.val();
                if (content != null && content != ""){
                    textarea.val("");
                }
            }
        });

        function messageParse(button){
            var type = button.attr("_type");
            var id = button.attr("_id");
            var textarea = button.siblings(".right-input");
            var content = textarea.val();
            if (content == null || content == ""){
                return;
            }else {
                textarea.val("");
            }
            windowView.addMyTalking(type,id,content);
            socket.sendMessage(type=="user"?10:20,id,1,content);
        }
    });