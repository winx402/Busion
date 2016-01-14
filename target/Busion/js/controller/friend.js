/**
 * Created by wangwenxiang on 16-1-8.
 */
define(['jquery','view/menu_bottom_base','data/friendArray'],
    function($,menu_bottom_base,friendArray){
        /**
        * 点击底部按钮切换面板
        */
        $(".menu-bottom li").eq(1).click(function(){
            var index = 1;
            if(menu_bottom_base.params.nowBottom != index){
                $(".menu-top").text("好友");
                menu_bottom_base.changeBottom(index,friendArray.params.friendState);
                if (friendArray.params.friendState != 3){
                    friendArray.initFriend();
                }
            }
        });
});