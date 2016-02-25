/**
 * Created by wangwenxiang on 16-1-8.
 */
define(["jquery","view/menu_bottom_base",'data/talkingData'],
    function($,menu_bottom_base,talkingData){

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
});