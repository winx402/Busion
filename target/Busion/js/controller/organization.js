/**
 * Created by wangwenxiang on 16-1-8.
 */
define(["jquery","view/menu_bottom_base",'data/organizationData'],
    function($,menu_bottom_base,orgData){
    /**
     * 点击底部按钮切换面板
     */
    $(".menu-bottom li").eq(2).click(function(){
        var index = 2;
        if(menu_bottom_base.params.nowBottom != index){
            $(".menu-top").text("组织");
            menu_bottom_base.changeBottom(index,orgData.params.organizationState);
            //menu_bottom_base.changeBottom(index,3);
        }
    });
});