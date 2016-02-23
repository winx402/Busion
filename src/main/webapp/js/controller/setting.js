/**
 * Created by wangwenxiang on 16-1-8.
 */
define(["jquery","view/menu_bottom_base"],function($,menu_bottom_base){
    /**
     * 点击底部按钮切换面板
     */
    $(".menu-bottom li").eq(3).click(function(){
        var index = 3;
        if(window.nowBottom != index){
            $(".menu-top").text("设置");
            menu_bottom_base.changeBottom(index,3);
        }
    });

    /**
     * 退出按钮
     */
    $('.btn-danger').click(function(){
        window.location.href="signout";
    });
});