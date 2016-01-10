/**
 * Created by wangwenxiang on 16-1-8.
 */
define(["jquery"],function($){
    /**
     * 底部按钮被选中状态
     */
    var nowBottom=0;

    /**
     * 点击底部按钮切换面板
     */
    $(".menu-bottom li").click(function(){
        var toBottom = $(this).index();
        if(toBottom != nowBottom){
            nowBottom = toBottom;
            changeBottom(nowBottom);
            switch(nowBottom){
                case 0:
                    $(".menu-top").text("会话");
                    break;
                case 1:
                    $(".menu-top").text("好友");
                    break;
                case 2:
                    $(".menu-top").text("组织");
                    break;
                case 3:
                    $(".menu-top").text("设置");
                    break;
            }
        }
    });

    /**
     * 根据index切换面板和按钮状态
     */
    function changeBottom(index){
        $(".selected").removeClass("selected");
        $(".menu-bottom li").eq(index).addClass("selected")
        $(".my-selected").removeClass("my-selected");
        $(".menu").eq(index).addClass("my-selected");
    }
});