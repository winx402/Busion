/**
 * Created by wangwenxiang on 16-1-8.
 */
define(['jquery','view/menu_bottom_base'],function($,menu_bottom_base){
    /**
     * 点击底部按钮切换面板
     */
    $(".menu-bottom li").eq(1).click(function(){
        var index = 1;
        if(menu_bottom_base.nowBottom != index){
            $(".menu-top").text("好友");
            menu_bottom_base.changeBottom(index);
        }
    });
});