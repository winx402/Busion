/**
 * Created by wangwenxiang on 16-1-11.
 */

define(["jquery"],function($){
    /**
     * 底部按钮被选中状态
     */
    var params={
        nowBottom : 0
    }



    /**
     * 根据index切换面板和按钮状态
     */
    function changeBottom(index,state){
        params.nowBottom = index;
        $(".selected").removeClass("selected");
        $(".menu-bottom li").eq(index).addClass("selected");
        $(".my-selected").removeClass("my-selected");
        if (state != 3){
            $(".menu").eq(4).addClass("my-selected");
        }else {
            $(".menu").eq(index).addClass("my-selected");
        }

    }

    return{
        params : params,
        changeBottom : changeBottom
    }
});