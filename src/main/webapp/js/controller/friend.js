/**
 * Created by wangwenxiang on 16-1-8.
 */
define(['jquery','view/menu_bottom_base','data/friendData'],
    function($,menu_bottom_base,friendData){
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
});