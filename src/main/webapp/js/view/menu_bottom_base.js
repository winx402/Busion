/**
 * Created by wangwenxiang on 16-1-11.
 */

define(["jquery"],function($){
    /**
     * 底部按钮被选中状态
     */
    nowBottom : 0


    /**
     * 根据index切换面板和按钮状态
     */
    function changeBottom(index){
        this.nowBottom = index;
        $(".selected").removeClass("selected");
        $(".menu-bottom li").eq(index).addClass("selected")
        $(".my-selected").removeClass("my-selected");
        $(".menu").eq(index).addClass("my-selected");
    }

    return{
        nowBottom : this.nowBottom,
        changeBottom : changeBottom
    }
});